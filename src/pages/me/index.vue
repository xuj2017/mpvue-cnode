<template>
    <div class="container">
        <div class="user-wrap" v-if="user">
            <div class="user">
                <div class="avatar">
                    <img :src="user.avatar_url" alt="用户头像">
                </div>
                <div class="info">
                    <div class="name">{{user.loginname}}</div>
                    <div class="more">
                        <div class="time">注册时间:{{time}}</div>
                        <div class="score">{{user.score}}积分</div>
                    </div>
                </div>
            </div>

            <ul class="type-list">
                <li class="item" @click="toPage('../participate/main')" >
                    <div class="item-left">最近参与的话题</div>
                    <div class="item-right"></div>
                </li>
                <li class="item" @click="toPage('../create/main')">
                    <div class="item-left">最近创建的话题</div>
                    <div class="item-right"></div>
                </li>
                <li class="item"  @click="toPage('../star/main')">
                    <div class="item-left">收藏的话题</div>
                    <div class="item-right"></div>
                </li>
                <li class="item" @click="toPage('../message/main')">
                     <div class="item-left">消息</div>
                     <div class="item-right"></div>
                </li>
            </ul>

            <ul class="type-list">
                <li class="item" @click="logOff">
                    <div class="item-center">退出登录</div>
                </li>
            </ul>
        </div>

        <div class="login-wrap" v-if="!user">
            <button type="primary" @click="login">扫码登录</button>
        </div>
        
    </div>
</template>

<script>
import {request} from '@/common/js/request.js';
import {getTimeInfo} from '@/common/js/common';
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      logined: null,
      user: null,
      time:'-'
    };
  },
  methods: {
    login() {
      let vue = this;
      wx.showModal({
        content:
          "请先在 PC 版 CNodeJS 社区登录，Access Token 的二维码位于“设置”页面左下角",
        showCancel: false,
        confirmText: "确定",
        complete() {
            wx.scanCode({
                success(res) {
                    const accesstoken = res.result;
                    vue.getData(accesstoken,vue);
                }
            });
        }
      });
    },
    getData(accesstoken,vue = this){
        request('/accesstoken',{accesstoken},'POST').then( data=>{
            vue.logined = data.data
            wx.setStorage({
                key: 'token',
                data: accesstoken,
            })
        }).catch(error=>{
            wx.showToast({
                title:'扫码失败'
            })
            setTimeout( ()=>{
                wx.hideToast();
            },1500)
            wx.removeStorage({
                key: 'token',
            })
        })
    },
    logOff(){
        let vue = this;
        wx.showModal({
            content:'是否退出登录？',
            success(){
                vue.user = null
                vue.time = '-'
                wx.removeStorage({
                    key: 'token',
                    complete: function() {
                        wx.reLaunch({
                            url: '../index/main'
                        })
                    },
                })
            }
        })
    },
    toPage(url){
        wx.navigateTo({
            url: url
        })
    },
    ...mapMutations({
        setParticipate:'SET_PARTICIPATE',
        setCreate:'SET_CREATE',
        setLoginname:'SET_LOFINNAME'
    }),
    _normalizeTopics(json){
            return json.map(item=>{
                return Object.assign(item, {
                    lastReplyTime: getTimeInfo(item.last_reply_at),
                })
            })
        },
  },
  created(){
      let accesstoken = wx.getStorageSync('token');
      if(!!accesstoken){
          this.getData(accesstoken)
      }
  },
  watch:{
        async logined(data){
          if(!data.loginname){
              return
          }
          let json = await request('/user/'+data.loginname);
          if(!!json){
              this.time =getTimeInfo(json.create_at);
              this.user = json;
              this.setParticipate(this._normalizeTopics(json.recent_replies))
              this.setCreate(this._normalizeTopics(json.recent_topics))
              this.setLoginname(json.loginname)
          }
      }
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/style/mixin.scss";
.login-wrap {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  position: fixed;
  button {
    padding-left: 80px;
    padding-right: 80px;
  }
}
.user-wrap{
    position: fixed;
    width: 100%;
    height: 100%;
    margin: 0;
    background: #f9f9f9;
}
.user{
    padding: 10px;
    background: #fff;
    margin-bottom: 20px;
    display: flex;
    @include border-bottom-1px();
    .avatar{
        width: 56px;
        height: 56px;
        border-radius: 3px; 
        vertical-align: center;
        border:1px solid $border-color;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .info{
        flex: 1;
        display: flex;
        font-size: 18px;
        margin-left: 12px;
        flex-direction:column;
        justify-content: space-between;
        .name{
            line-height: 32px;
        }
        .more{
            line-height: 24px;
            color: #778087;
            font-size: 14px;
            display: flex;
            justify-content: space-between;
        }
    }
}
.type-list{
        margin-top: 20px;
        position: relative;
        background: #fff;
        overflow: hidden;
        @include border-1px();
        .item{
            position: relative;
            padding: 12px 15px;
            display: flex;
            align-items: center;
            line-height: 1.4;
            font-size: 14px;
            // border-top:1px solid $border-color;
            &+.item{
               @include border-top-1px();
            }
        }
        .item-left{
            flex: 1
        }
        .item-center{
            flex: 1;
            text-align: center;
        }
        .item-right{
            position: relative;
            text-align: right;
            color: #666;
            padding-right: 13px;
            &:after{
                position: absolute;
                top: 50%;
                right: 2px;
                content: " ";
                display: inline-block;
                height: 6px;
                width: 6px;
                border-width: 2px 2px 0 0;
                border-color: #c8c8c8;
                border-style: solid;
                transform: translateY(-50%) matrix(.71, .71, -.71, .71, 0, 0)
            }
        }
    }


</style>



