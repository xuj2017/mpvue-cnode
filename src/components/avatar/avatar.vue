<template>
    <div class="avatar" :style="style" @click.stop="goUser(user.loginname)">
        <img :src="user.avatar_url" alt="">
    </div>
</template>

<script>
export default {
    props:{
        user:{
            type:Object,
            default:{avatar_url:''}
        },
        size:{
            type:Number,
            defaule:36
        }
    },
    methods:{
        goUser(loginname){
            wx.navigateTo({
                url:`/pages/user/main?id=${loginname}`
            })
        }
    },
    computed:{
        style(){
            if(!this.size){
                return ;
            }
            let style = {};
            let css = [];
            style['width'] = this.size + 'px';
            style['height'] = this.size + 'px';

            Object.keys(style).forEach( key=>{
                css.push(`${key}:${style[key]}`)
            })

            return css.join(';');
        }
    }
}
</script>

<style lang="scss" scoped>
    .avatar{
        width: 36px;
        height: 36px;
        border-radius: 3px;
        overflow: hidden;
         flex-shrink: 0;
         font-size: 0;
         line-height: 0;
        img{
            width: 100%;
            height: 100%;
        }
    }
</style>

