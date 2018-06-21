<template>
  <div class="article-wrap" v-if="article">
      <div class="head-box">
          <h3 class="article-title">
              {{article.title}}
          </h3>
          <div class="head-info">
               <div class="avater">
                 <img :src="article.author.avatar_url">
               </div>
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
                   <div class="right-item" v-if="logined">
                       <button class="like" v-if="article.is_collect">收藏</button>
                       <button class="liked" v-else="article.is_collect">已收藏</button>
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
              <li class="comment-item" v-for="(item,index) in article.replies" :key="index">
                  <div class="item-head">
                      <div class="avater"><img :src="item.author.avatar_url" ></div>
                      <div class="info">
                        <span class="name">{{item.author.loginname}}</span>
                        <span class="lou">{{index+1}}楼</span> • 
                        <span class="time">{{item.createTime}}</span>
                    </div>
                    <div class="zan-wrap" v-if="logined"></div>
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

import {request} from '@/common/js/request.js';
import {getTimeInfo} from '@/common/js/common';
import TypeMark from '@/components/type-mark.vue';
import WxParse from 'mpvue-wxparse';

export default {
  data () {
    return {
        id:null,
        article:null,
        logined:false
    }
  },
  components: {
      TypeMark,WxParse
  },
  methods:{
    _normalizeComment(json){
        json = Object.assign(json, {
            createTime: getTimeInfo(json.create_at)
        })
        if(json.replies && json.replies.length){
            json.replies =json.replies.map(reply=>{
               return Object.assign(reply, {
                    createTime: getTimeInfo(reply.create_at)
                })
            })
        }
        return json;
    },
  },
  async onLoad(option){
      this.id = option.id;
      let res = await request('topic/'+ this.id);
      if(!!res){
        this.article =this._normalizeComment(res) 
      }
      console.log(this.article)
  }
}
</script>

<style lang="scss" scoped>
    @import "@/common/style/mixin.scss";
    // @import "/wxParse/wxParse.wxss";
    .article-wrap{
        font-size: 14px;
        .head-box{
            border-bottom: 1px solid $border-color;
            padding: 10px;
            .article-title{
                font-size: 18px;
                font-weight: 700;
                margin: 8px 0;
                display: inline-block;
                vertical-align: bottom;
                width: 75%;
                line-height: 130%;
            }
        }
        .head-info{
            display:flex;
            align-items: center;
            .avater{
                width: 36px;
                height: 36px;
                border-radius: 5px;
                overflow: hidden;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .info{
                flex: 1;
                display: flex;
                margin-left: 10px;
                .left-item{
                    flex: 1;
                    .detail{
                        display: flex;
                    }
                    .name{
                        margin-left:10px; 
                        flex: 1;
                    }
                    .visit{
                        font-size: 12px;
                        margin-top: 4px;
                        color: #666;
                    }
                }
            }
        }
        .content-box{
            padding: 0 14px;
            background: #fff;
            // box-shadow: 0 2px 2px #cecece;
        }
        .comment-box{
            margin-top: 8px;
            .comment-count{
                padding: 10px;
                background-color: #f6f6f6;
                border-radius: 3px 3px 0 0;
            }
            .comment-item{
                padding: 10px;
                background: #fff;
                border-top: 1px solid $border-color;
                .item-head{
                    display: flex;
                    align-items: center;
                }
                .avater{
                    width: 30px;
                    height: 30px;
                    border-radius: 3px; 
                    vertical-align: center;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .info{
                    flex: 1;
                    .name{
                        color: #666;
                        margin:0 10px;
                    }
                    .lou,.time{
                        color: #08c;
                    }
                }
            }
        }
    }
</style>

