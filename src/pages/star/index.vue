<template>
  <div class="container">
    <topic-v :list="star"></topic-v>
  </div>
</template>

<script>
import TopicV from "@/components/topic/topic.vue";
import { request } from "@/common/js/request.js";
import { getTimeInfo } from "@/common/js/common";
import { mapGetters } from "vuex";

export default {
  components: {
    TopicV
  },
  data() {
    return {
      star: []
    };
  },
  methods: {
    async _getTopics() {
      let res = await request("topic_collect/" + this.loginname);
      this.star = this._normalizeTopics(res);
    },
    _normalizeTopics(json) {
      return json.map(item => {
        return Object.assign(item, {
          lastReplyTime: getTimeInfo(item.last_reply_at)
        });
      });
    }
  },
  computed: {
    ...mapGetters(["loginname"])
  },
  async onLoad() {
    this._getTopics();
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
}
</style>
