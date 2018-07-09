<template>
    <div class="user-wrap" v-if="data">
        <div class="user-head-wrap">
            <div class="avatar">
                <avatar v-if="user" :user="user" :size="90"></avatar>
            </div>
            <div class="info-wrap">
                <div class="name">{{data.loginname}}</div>
                <div class="github">{{data.githubUsername}}@github.com</div>
            </div>
            <div class="detail">
                <div class="time">注册时间：{{data.create_at}}</div>
                <div class="score">积分：{{data.score}}</div>
            </div>
        </div>
        <scroll-view class="swiper-tab" scroll-x="true" >
            <view v-for="(item,index) in navList" :key="index"  @click="select(index)" :class="{'active':currentIndex ===index}"  class="swiper-tab-item">{{item.title}}</view>
        </scroll-view>
        <swiper :current="currentIndex" class="swiper-box" @change="swiperChange" duration="300"  :style="'height:'+contentHeight">
             <swiper-item v-for="(item,index) in navList" :key="index" >
                <scroll-view scroll-y style="height:100%;" >
                    <topic-v :list="articleList"></topic-v>
                </scroll-view>
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
import {getUser,getStar} from '@/common/js/api'
import {getSystemInfo} from '@/common/js/common'
import Avatar from '@/components/avatar/avatar';
import NoData from '@/components/no-data/no-data';
import TopicV from '@/components/topic/topic'
import _ from 'lodash'

const navList = [{
    title: '最近回复',
    type: 'reply',
}, {
    title: '最新发布',
    type: 'topic',
}, {
    title: '话题收藏',
    type: 'collect',
}, ]

export default {
    data(){
        return{
            id:null,
            data:null,
            user:null,
            navList:navList,
            articleList:[],
            starTopic:null,
            currentIndex:0
        }
    },
    components:{
        Avatar,NoData,TopicV
    },
    methods:{
        async getStartopic(){
            if(!this.starTopic){
                this.starTopic = await getStar(this.id);
            }
            this.articleList = this.starTopic;
        },
        swiperChange(e){
            this.currentIndex = e.target.current
        },
        select(index){
             this.currentIndex = index;
        }
    },
    computed:{
        contentHeight(){
           return (getSystemInfo().windowHeight-45-220)+'px'
        }
    },
    watch:{
        currentIndex(val){
            switch(val){
                case 0:
                    this.articleList = this.data.recent_replies;
                    break;
                case 1:
                    this.articleList = this.data.recent_topics;
                    break;
                case 2:
                    this.getStartopic();
            }
        }
    },
    async onLoad(option){
        this.id = option.id;
        this.data = await getUser(this.id);
        this.user = _.pick(this.data,['avatar_url','loginname'])
        this.articleList = this.data.recent_replies;
    }
}
</script>

<style lang="scss" scoped>
    @import "@/common/style/mixin.scss";
    .user-wrap{
        width: 100%;
        height: 100%;
        .user-head-wrap{
            transition: height 0.3s;
            overflow: hidden;
            position: relative;
            text-align: center;
            padding: 0 10px;
            height: 220px;
            background: #11998e;  /* fallback for old browsers */
            background: -webkit-linear-gradient(to right, #38ef7d, #11998e);  /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(to right, #38ef7d, #11998e); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            .avatar {
                margin: 20px auto 0;
                width: 90px;
            }
            .info-wrap{
                text-align: center;
                color: #fff;
                .name{
                    font-size: 18px;
                    margin-top: 5px;
                }
                .github{
                    text-decoration: underline;
                }
            }
            .detail{
                margin-top: 30px;
                width: 100%;
                display: flex;
                font-size: 12px;
                justify-content: space-between;
                align-items: center;
                color: #fff;
            }
        }

        .swiper-tab{
            width:100%;
            text-align: center;
            line-height: 42px;
            white-space: nowrap;
            position: relative;
            .swiper-tab-item{
                font-size: 14px;
                height: 42px;
                display: inline-block;
                color: #777777;
                width: 33.3%;
                position: relative;
                &.active{
                    color: $brand;
                    font-size: 16px;
                }
            }
        }
    }
</style>

