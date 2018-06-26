<template>
  <div class="container">
    参与的话题
    <!-- <topic-v :list="list"></topic-v> -->
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
      'participate'
    ])
  },
  watch:{
    participate(newVal){
      console.log(newVal)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
