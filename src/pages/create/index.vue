<template>
  <div class="container">
    <topic-v :list="create"></topic-v>
  </div>
</template>

<script>
import TopicV from '@/components/topic/topic.vue';

import {mapGetters} from 'vuex';

export default {
  components: {
    TopicV
  },
  data () {
    return {
      list:{}
    }
  },
  computed:{
    ...mapGetters([
      'create'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .container{
    width: 100%;
  }
</style>
