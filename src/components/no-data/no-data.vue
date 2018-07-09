<template>
    <div class="no-data">
        {{content}}
    </div>
</template>

<script>
export default {
    props:{
        content:{
            type:String,
            default:'暂无数据'
        }
    }
}
</script>
<style lang="scss" scoped>
.no-data{
    font-size: 14px;
    margin: 20px 0;
    text-align: center;
}
</style>
