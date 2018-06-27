<template>
  <div class="container">
    <topic-v :list="participate"></topic-v>
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
  mounted(){
    console.log(123)
    console.log(this.participate)
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
