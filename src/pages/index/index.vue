<template>
    <div>
        <scroll-view class="swiper-tab" scroll-x="true">
            <view :style="menuStyle" v-for="(item,index) in navList" :key="index" :class="{'active':currentIndex ===index}"  class="swiper-tab-item">{{item.title}}</view>
        </scroll-view>
        <swiper class="swiper-box" duration="300">
            <swiper-item>
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
import {navList} from '@/common/js/common';

export default {
    data(){
        return{
            winWidth:null,
            winHeight:null,
            navList:navList,
            menuStyle:null,
            currentIndex:0,
        }
    },
    async created(){
        let info = await wx.getSystemInfoSync();
        this.winWidth = info.windowWidth;
        this.winHeight = info.windowHeight;
        if(!this.menuStyle){
            this.menuStyle =`width:${this.winWidth / this.navList.length}px`
        }
    }
};
</script>


<style lang="scss" scoped>
    @import "@/common/style/mixin.scss";
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


