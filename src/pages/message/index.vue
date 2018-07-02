<template>
    <div class="message-wrap">
        <scroll-view class="swiper-tab" scroll-x="true">
            <view v-for="(item,index) in navList" :key="index"  @tap="select(index)" :class="{'active':currentIndex ===index}"  class="swiper-tab-item">{{item.name}}</view>
        </scroll-view>
        <swiper :current="currentIndex" class="swiper-box" duration="300" :style="'height:'+contentHeight" @change="swiperChange">
            <swiper-item v-for="(item,index) in navList" :key="index">
                <scroll-view scroll-y style="height:100%" >
                    <ul class="message-list" >
                        <li class="item" v-for="(v,i) in messageList[index]" :key="i" @click="goTo(v.topic.id,v.has_read,v.id)">
                            <div class="user">
                                <avatar :user="v.author"></avatar>
                                <div class="info">
                                    <div class="top">
                                        <div class="name">{{v.author.loginname}}</div>
                                        <div class="time">{{v.createTime}}</div>
                                    </div>
                                    <div class="bottom">
                                        在回复中@了您
                                    </div>
                                </div>
                            </div>
                            <div class="content">
                                <wxParse :content="v.reply.content"></wxParse>
                            </div>
                            <div class="title">
                                话题：{{v.topic.title}}
                            </div>
                        </li>
                    </ul>
                </scroll-view>
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
import { getTimeInfo } from "@/common/js/common";
import { request } from "@/common/js/request.js";
import Avatar from "@/components/avatar/avatar";
import WxParse from "mpvue-wxparse";
const navList = [
  {
    name: "已读数据",
    data: "hasReadMessage"
  },
  {
    name: "未读数据",
    data: "hasNotReadMessage"
  }
];
export default {
  data() {
    return {
      accesstoken: "",
      navList: navList,
      currentIndex: 0,
      messageList: [],
      hasReadMessage: null,
      hasNotReadMessage: null
    };
  },
  components: {
    Avatar,
    WxParse
  },
  methods: {
    async _getMessage(token) {
      let res = await request("messages?accesstoken=" + token);
    },
    swiperChange(e) {
      this.currentIndex = e.target.current;
    },
    select(index) {
      this.currentIndex = index;
    },
    async goTo(id,has_read,msg_id){
      if(!has_read){
        await request('message/mark_one/'+msg_id,{accesstoken:this.accesstoken},'POST')
      }

      const url = '../article/main?id='+id
      wx.navigateTo({ url })
    },
    _normalizeMessage(json) {
      return json.map(item => {
        return Object.assign(item, {
          createTime: getTimeInfo(item.create_at)
        });
      });
    }
  },
  computed: {
    contentHeight() {
      let info = wx.getSystemInfoSync();
      let winHeight = info.windowHeight;
      return winHeight - 42 + "px";
    }
  },
  async onShow() {
    wx.showLoading({
      mask: true,
      title: "加载中"
    });
    if (!this.accesstoken) {
      wx.reLaunch({
        url: "../me/main"
      });
    } else {
      wx.hideLoading();
    }
  },
  async onLoad() {
    this.accesstoken = wx.getStorageSync("token");
    if (this.accesstoken !== "") {
      this._getMessage(this.accesstoken);
    }
    request("messages", { accesstoken: this.accesstoken }).then(res => {
      this.hasReadMessage =this._normalizeMessage(res.has_read_messages);
      this.hasNotReadMessage =this._normalizeMessage(res.hasnot_read_messages);
      this.messageList.push(this.hasReadMessage,this.hasNotReadMessage)
    });
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/style/mixin.scss";
.message-wrap {
  width: 100%;
  .swiper-box {
    padding-top: 1px;
    background: $grey;
  }
  .swiper-tab {
    width: 100%;
    text-align: center;
    line-height: 42px;
    white-space: nowrap;
    position: relative;
    .swiper-tab-item {
      font-size: 14px;
      height: 42px;
      width: 50%;
      display: inline-block;
      color: #777777;
      position: relative;
      // &.active{
      //     color: $brand;
      //     font-size: 16px;
      // }
      &.active:after {
        content: "";
        height: 2px;
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        background: $brand;
      }
    }
  }
}

.message-list {
  width: 100%;
  overflow: hidden;
  .item {
    // margin-bottom: 5px;
    padding: 10px;
    background: #fff;
    @include border-bottom-1px()
  }
  .user {
    display: flex;
    position: relative;
    min-width: 0px;

    font-size: 14px;
    align-items: center;
    .info {
      flex: 1;
      margin-left: 10px;
    }
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .time {
      color: $brand;
      font-size: 13px;
    }
    .bottom {
      font-size: 13px;
      color: #777777;
    }
  }
  .content {
    margin-top: -5px;
  }
  .title {
    margin-top: -5px;
    background: $grey;
    padding: 10px;
    font-size: 12px;
    border-radius: 3px;
  }
}
</style>

