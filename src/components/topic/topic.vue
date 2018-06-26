<template>
    <div class="topic-wrap">
        <ul class="topic-list" v-if="list">
            <li class="item"  v-for="(item,index) in list" :key="index" @click="goTo(item.id)">
                <div class="title">
                    <type-mark :item="item"></type-mark>
                    <p>{{item.title}}</p>
                </div>
                <div class="content">
                    <avatar-v></avatar-v>
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
            </li>
        </ul>
    </div>
</template>

<script>
import AvatarV from "../avatar/avatar";
import TypeMark from "../type-mark/type-mark";
export default {
  props: {
    list: {
      type: Object,
      default: null
    }
  },
  components: {
    AvatarV,
    TypeMark
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/style/mixin.scss";
.topic-wrap {
  width: 100%;
  overflow: hidden;
}
.topic-list {
  width: 100%;
  .item {
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

