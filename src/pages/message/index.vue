<template>
    <div class="message-wrap">
        <scroll-view class="swiper-tab" scroll-x="true">
            <view v-for="(item,index) in navList" :key="index"  @tap="select(index)" :class="{'active':currentIndex ===index}"  class="swiper-tab-item">{{item}}</view>
        </scroll-view>
        <swiper :current="currentIndex" class="swiper-box" duration="300" :style="'height:'+contentHeight" @change="swiperChange">
            <swiper-item v-for="(item,index) in navList" :key="index">
                消息
                <!-- <list-v :list="list" v-if="index === currentIndex" @refresh="refresh" @loadMore="loadMore" :hideHeader="hideHeader" :type="item" @goTo="goTo"></list-v> -->
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
import { request } from "@/common/js/request.js";
const navList = ['已读消息','未读消息']
export default {
  data() {
    return {
      accesstoken: '',
      navList:navList,
      currentIndex:0
    };
  },
  methods: {
    async _getMessage(token) {
      let res = await request("messages?accesstoken=" + token);
    },
    swiperChange(e){
        this.currentIndex = e.target.current;
    },
    select(){

    }
  },
   computed: {
        contentHeight() {
            let info =  wx.getSystemInfoSync();
            let winHeight = info.windowHeight;
            return winHeight - 42 + 'px'
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
    }else{
        wx.hideLoading();
    }
  },
  async onLoad() {
    this.accesstoken = wx.getStorageSync("token");
    if (this.accesstoken !== '') {
      this._getMessage(this.accesstoken);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/style/mixin.scss";
.message-wrap{
    width: 100%;
    .swiper-tab{
         width:100%;
        text-align: center;
        line-height: 42px;
        white-space: nowrap;
        position: relative;
        .swiper-tab-item{
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
            &.active:after{
                content:'';
                height: 2px;
                width: 100%;
                position:absolute;
                left: 0;
                bottom: 0;
                background: $brand;
            }
        }
    }
}
</style>

