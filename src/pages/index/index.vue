<template>
    <div class="container">
        <scroll-view class="swiper-tab" scroll-x="true">
            <view :style="'width:'+menuWidth+'px'" v-for="(item,index) in navList" :key="index"  @tap="select(index)" :class="{'active':currentIndex ===index}"  class="swiper-tab-item">{{item.title}}</view>
        </scroll-view>
        <swiper :current="currentIndex" class="swiper-box" duration="300" :style="'height:'+contentHeight" @change="swiperChange">
            <swiper-item v-for="(item,index) in navList" :key="index">
                <list-v  v-if="index === currentIndex" @refresh="refresh" @loadMore="loadMore" :hideHeader="hideHeader" :type="item" @goTo="goTo"></list-v>
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
import {navList} from '@/common/js/common';
import List from '@/components/list/list.vue';
export default {
    data(){
        return{
            winWidth:null,
            winHeight:null,
            navList:navList,
            menuWidth:null,
            currentIndex:0,
        }
    },
    components:{
        listV:List
    },
    async created(){
        let info = await wx.getSystemInfoSync();
        this.winWidth = info.windowWidth;
        this.winHeight = info.windowHeight;
        if(!this.menuWidth){
            this.menuWidth =this.winWidth / this.navList.length;
        }
    },
    computed: {
        contentHeight() {
            return this.winHeight - 42 + 'px'
        }
    },
    methods:{
        swiperChange(e){
            this.currentIndex = e.target.current;
        },
        select(index){
             this.currentIndex = index;
        },
        goTo(id){
            wx.showLoading({
                mask:true,
                title:'加载中'
            })
            const url = '../article/main?id='+id
            wx.navigateTo({ url })
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
            font-size: 14px;
            height: 42px;
            display: inline-block;
            color: #777777;
            position: relative;
            &.active{
                color: $brand;
                font-size: 16px;
            }
        }
    }
</style>


