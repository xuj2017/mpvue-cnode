<template>
    <div class="container">
        <scroll-view class="swiper-tab" scroll-x="true">
            <view :style="menuStyle" v-for="(item,index) in navList" :key="index" :class="{'active':currentIndex ===index}"  class="swiper-tab-item">{{item.title}}</view>
        </scroll-view>
        <swiper class="swiper-box" duration="300" :style="'height:'+contentHeight">
            <swiper-item >
                <list-v :list="list"></list-v>
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
import {navList,formatTime,getTimeInfo} from '@/common/js/common';
import List from '@/components/list.vue';
import {request} from '@/common/js/request.js';

const pageNumber = 20;

export default {
    data(){
        return{
            winWidth:null,
            winHeight:null,
            navList:navList,
            menuStyle:null,
            currentIndex:0,
            pageIndex:1,
            list:[]
        }
    },
    components:{
        listV:List
    },
    async created(){
        let info = await wx.getSystemInfoSync();
        this.winWidth = info.windowWidth;
        this.winHeight = info.windowHeight;
        if(!this.menuStyle){
            this.menuStyle =`width:${this.winWidth / this.navList.length}px`
        }
        
        this._getTopics();
        
    },
    computed: {
        contentHeight() {
            return this.winHeight - 42 + 'px'
        }
    },
    methods:{
        _getTopics(){
            request('topics',{
                page:this.pageIndex,
                limit:pageNumber
            }).then( res=>{
                this.list = this._normalizeTopics(res);
            })
        },
        _normalizeTopics(json){
            return json.map(item=>{
                return Object.assign(item, {
                    createTime: formatTime(item.create_at),
                    lastReplyTime: getTimeInfo(item.last_reply_at),
                })
            })
        }
    }
};
</script>


<style lang="scss" scoped>
    @import "@/common/style/mixin.scss";

    .container{
        height: 100%;
        .swiper-box{
            display: block;
            width: 100%;
            overflow: hidden;
            .swiper-item {
                height: 100%;
                text-align: center;
            }
        }
    }
    .swiper-tab{
        width:100%;
        text-align: center;
        line-height: 42px;
        white-space: nowrap;
        position: relative;
        .swiper-tab-item{
            font-size: 18px;
            height: 42px;
            display: inline-block;
            color: #777777;
            position: relative;
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
</style>


