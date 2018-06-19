<template>
    <div class="mark mark-green" v-if="item.top">置顶</div>
    <div class="mark mark-green" v-else-if="item.good">精华</div>
    <div class="mark mark-grey" v-else="item.top">{{type}}</div>
</template>

<script>
import {getTopicType} from '@/common/js/common';
export default {
    props:{
        item:{
            type:Object,
            default:{}
        }
    },
    computed:{
        type(){
            return getTopicType(this.item.tab)
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/common/style/mixin.scss";
    .mark{
        font-size: 12px;
        border-radius: 4px;
        padding: 0 5px;
        height:20px;
        line-height: 20px;
        text-align: center;
        box-sizing:border-box;
        &.mark-green{
            background: $brand;
            color: #fff;
        }
        &.mark-grey{
            background:$grey;
            color: #333;
        }
    }
</style>

