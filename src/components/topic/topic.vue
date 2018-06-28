<template>
  <div class="topic-wrap">
    <scroll-view scroll-y="true" style="height:100%;" v-if="list.length">
          <div class="item" v-for="(item,index) in list" :key="index" @click="goTo(item.id)">
              <avatar-v :user="item.author"></avatar-v>
              <div class="content">
                  <h3 class="title">{{item.title}}</h3>
                  <div class="info">
                      <div class="name">{{item.author.loginname}}</div>
                      <div class="replay-time">{{item.lastReplyTime}}</div>
                  </div>
              </div>
          </div>
      </scroll-view>
      <div v-if="!list.length">暂无数据</div>
  </div>
    
</template>

<script>
import AvatarV from "../avatar/avatar";
import { getTimeInfo } from "@/common/js/common";
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  components: {
    AvatarV
  },
  methods: {
    goTo(id) {
      wx.showLoading({
        mask: true,
        title: "加载中"
      });
      const url = "../article/main?id=" + id;
      wx.navigateTo({ url });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/style/mixin.scss";

.topic-wrap{
  width: 100%;
}

.item {
  margin-top: 0;
  display: flex;
  padding: 10px;
  align-items: center;
  @include border-bottom-1px();
  .content {
    flex: 1;
    position: relative;
    min-width: 0px;
    margin-left: 10px;
    font-size: 14px;
    margin-top: -2px;
    .title {
      line-height: 24px;
      @include text-overflow();
    }
    .info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      .name {
        // margin-right: l;
      }
    }
  }
}
</style>

