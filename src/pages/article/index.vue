<template>
  <div class="article-wrap" v-if="article">
      <div class="head-box">
          <h3 class="article-title">
              {{article.title}}
          </h3>
          <div class="head-info">
               <avatar :user="article.author"></avatar>
               <div class="info">
                   <div class="left-item">
                       <div class="detail">
                           <type-mark :item="article"></type-mark>
                           <span class="name">{{article.author.loginname}}</span>
                       </div>
                       <div class="visit">
                           <span>{{article.visit_count}}次浏览</span> •
                           <span>发布于{{article.createTime}}</span>
                       </div>
                   </div>
                   <div class="right-item" v-if="accesstoken">
                       <button  v-if="!article.is_collect" type="primary"  size="mini" @click="collect(article.id)">收藏</button>
                       <button  v-else  size="mini" @click="uncollect(article.id)">已收藏</button>
                   </div>
               </div>
          </div>
      </div>
      <div class="content-box" >
          <wx-parse :content="article.content"></wx-parse>
      </div>

      <div class="comment-box">
          <div class="comment-count">
              {{article.reply_count}}回复
          </div>
          <ul class="comment-list">
              <li class="comment-item" v-for="(item,index) in article.replies" :key="index" :id="item.id">
                  <div class="item-head">
                       <avatar :user="item.author" :size="30"></avatar>
                      <div class="info">
                        <span class="name">{{item.author.loginname}}</span>
                        <span class="lou">{{index+1}}楼</span> • 
                        <span class="time">{{item.createTime}}</span>
                    </div>
                    <div class="zan-wrap" v-if="accesstoken" @click="dianzan(item.id,item.is_uped,index)">
                      <i class="iconfont icon-dianzan" :class="{'parised':item.is_uped}"></i>
                    </div>
                  </div>
                  <div class="comment-content">
                      <wxParse :content="item.content"></wxParse>
                  </div>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
import { request } from "@/common/js/request.js";
import { getTimeInfo } from "@/common/js/common";
import TypeMark from "@/components/type-mark/type-mark";
import Avatar from "@/components/avatar/avatar"

import WxParse from "mpvue-wxparse";

export default {
  data() {
    return {
      id: null,
      article: null,
      accesstoken: ""
    };
  },
  components: {
    TypeMark,
    WxParse,
    Avatar
  },
  methods: {
    _normalizeComment(json) {
      json = Object.assign(json, {
        createTime: getTimeInfo(json.create_at)
      });
      if (json.replies && json.replies.length) {
        json.replies = json.replies.map(reply => {
          return Object.assign(reply, {
            createTime: getTimeInfo(reply.create_at)
          });
        });
      }
      return json;
    },
    collect(id) {
      request(
        "topic_collect/collect",
        { accesstoken: this.accesstoken, topic_id: id },
        "POST"
      ).then(res => {
        if (res.data.success === true) {
          this.article.is_collect = true;
          wx.showToast({
              title: '已收藏',
              icon: 'success',
              duration: 1000
            })
        }
      });
    },
    uncollect(id) {
      request(
        "topic_collect/de_collect",
        { accesstoken: this.accesstoken, topic_id: id },
        "POST"
      ).then(res => {
        if (res.data.success === true) {
          this.article.is_collect = false;
           wx.showToast({
              title: '已取消收藏',
              icon: 'success',
              duration: 1000
            })
        }
      });
    },
    dianzan(id, type, index) {
      request(`reply/${id}/ups`,{accesstoken: this.accesstoken},'POST',false).then(res =>{
        if(res.data.success === true){
          this.article.replies[index].is_uped = !!type ? false : true;
          if(!type){
            wx.showToast({
              title: '已赞',
              icon: 'success',
              duration: 500
            })
          }
        }
      })
    }
  },
  async onLoad(option) {
    wx.showLoading({
      mask: true,
      title: "加载中"
    });
    this.article = null;
    this.id = option.id;
    this.accesstoken = wx.getStorageSync("token");
    let res = await request(
      "topic/" + this.id,
      { accesstoken: this.accesstoken },
      "GET",
      false
    );
    if (!!res) {
      this.article = this._normalizeComment(res);
    }
    this.$nextTick(() => {
      wx.hideLoading();
    });
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/style/mixin.scss";
@import "@/common/style/iconfont.scss";
.article-wrap {
  font-size: 14px;
  .head-box {
    border-bottom: 1px solid $border-color;
    padding: 10px;
    .article-title {
      font-size: 18px;
      font-weight: 700;
      margin: 8px 0;
      display: inline-block;
      vertical-align: bottom;
      line-height: 130%;
    }
  }
  .head-info {
    display: flex;
    align-items: center;
    .info {
      flex: 1;
      display: flex;
      margin-left: 10px;
      .left-item {
        flex: 1;
        .detail {
          display: flex;
        }
        .name {
          margin-left: 10px;
          flex: 1;
        }
        .visit {
          font-size: 12px;
          margin-top: 4px;
          color: #666;
        }
      }
    }
  }
  .content-box {
    padding: 0 14px;
    background: #fff;
    // box-shadow: 0 2px 2px #cecece;
  }
  .comment-box {
    margin-top: 8px;
    .comment-count {
      padding: 10px;
      background-color: #f6f6f6;
      border-radius: 3px 3px 0 0;
    }
    .comment-item {
      padding: 10px;
      background: #fff;
      border-top: 1px solid $border-color;
      .item-head {
        display: flex;
        align-items: center;
      }
      .info {
        flex: 1;
        .name {
          color: #666;
          margin: 0 10px;
        }
        .lou,
        .time {
          color: #08c;
        }
      }
      .zan-wrap {
        width: 40px;
        text-align: right;
        .parised {
          color: $brand;
        }
      }
    }
  }
}
</style>

