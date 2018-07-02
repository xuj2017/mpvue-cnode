<template>
    <div class="list-wrap">
        <div class="header" :hidden="hideHeader">
            刷新中....
        </div>
        <scroll-view scroll-y="true" style="height:100%;" @scrolltoupper="refresh" @scrolltolower="loadMore">
            <div class="li" v-for="(item,index) in list" :key="index" @click="goTo(item.id)">
                <div class="title">
                    <type-mark :item="item"></type-mark>
                    <p>{{item.title}}</p>
                </div>
                <div class="content">
                    <div class="avater">
                        <img :src="item.author.avatar_url" alt="用户头像">
                    </div>
                    <div class="info">
                        <div class="left-item">
                            <div class="name">{{item.author.loginname}}</div>
                            <div class="creat-time">{{item.createTime}}</div>
                            
                        </div>
                        <div class="right-item">
                            <div class="count"><span class="reply_count">{{item.reply_count}}</span>&nbsp;/&nbsp;<span class="visit_count">{{item.visit_count}}</span></div>
                            <div class="replay-time">{{item.lastReplyTime}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </scroll-view>
    </div>
</template>

<script>
import { navList, formatTime, getTimeInfo } from "@/common/js/common";
import { request } from "@/common/js/request.js";
import TypeMark from "../type-mark/type-mark";
const pageNumber = 20;
export default {
  data() {
    return {
      hideHeader: true,
      pageIndex: 1,
      list: []
    };
  },
  props: {
    type: {
      type: Object,
      default: {}
    }
  },
  components: {
    TypeMark
  },
  methods: {
    _getTopics() {
      wx.showLoading({
        mask: true,
        title: "加载中"
      });
      request(
        "topics",
        {
          page: this.pageIndex,
          tab: this.type.type,
          limit: pageNumber
        },
        "GET",
        false
      ).then(res => {
        if (this.pageIndex === 1) {
          this.list = this._normalizeTopics(res);
        } else {
          this.list = this.list.concat(this._normalizeTopics(res));
        }
        this.$nextTick(() => {
          wx.hideLoading();
        });
        this.hideHeader = true;
      });
    },
    _normalizeTopics(json) {
      return json.map(item => {
        return Object.assign(item, {
          createTime: formatTime(item.create_at),
          lastReplyTime: getTimeInfo(item.last_reply_at)
        });
      });
    },
    refresh(val) {
      this.hideHeader = false;
      this.pageIndex = 1;
      this._getTopics();
    },
    loadMore(val) {
      this.hideBottom = false;
      this.pageIndex++;
      this._getTopics();
    },
    goTo(id) {
      this.$emit("goTo", id);
    }
  },
  computed: {},
  created() {
    this._getTopics();
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/style/mixin.scss";
.list-wrap {
  height: 100%;
  .header,
  .bottom {
    text-align: center;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    color: $grey;
  }
  .li {
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid $border-color;
    .title {
      display: flex;
      align-items: center;
      min-width: 1px;
      p {
        margin-left: 8px;
        font-size: 14px;
        line-height: 24px;
        flex: 1;
        min-width: 1px;
        @include text-overflow();
      }
    }
    .content {
      display: flex;
      position: relative;
      font-size: 13px;
      margin-top: 8px;
      .avater {
        width: 36px;
        height: 36px;
        border-radius: 5px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .info {
        flex: 1;
        margin-left: 10px;
        display: flex;
        justify-content: space-between;
        > div {
          margin-top: -3px;
        }
      }
      .creat-time,
      .replay-time {
        margin-top: 5px;
        color: #778087;
      }
      .reply_count {
        color: #9e78c0;
      }
      .visit_count {
        color: #b4b4b4;
      }
      .right-item {
        text-align: right;
        margin-right: 20px;
      }
    }
  }
}
</style>
