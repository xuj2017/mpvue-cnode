<template>
    <div class="topic-wrap">
        <ul class="topic-list" v-if="list">
            <li class="item"  v-for="(item,index) in list" :key="index" @click="goTo(item.id)">
                <avatar-v :user="item.author"></avatar-v>
                <div class="content">
                    <h3 class="title">{{item.title}}</h3>
                    <div class="info">
                        <div class="name">{{item.author.loginname}}</div>
                        <div class="replay-time">{{item.last_reply_at}}</div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import AvatarV from "../avatar/avatar";
import {getTimeInfo} from '@/common/js/common';
export default {
  props: {
    list: {
      type: Array,
      default: null
    }
  },
  components: {
    AvatarV
  },
  methods: {
    goTo() {}
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/style/mixin.scss";
.topic-wrap {
  width: 100%;
  overflow: hidden;
}
.topic-list {
  width: 100%;
  .item {
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid $border-color;
    display: flex;
    align-items: center;
    .content {
      margin-left: 10px;
      flex: 1;
      position: relative;
      font-size: 13px;
      margin-top: 8px;
      .title{
        width: 100%;
        @include text-overflow();
      }
      .info {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>

