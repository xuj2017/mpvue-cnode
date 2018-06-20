<template>
  <div>
  </div>
</template>

<script>

import {request} from '@/common/js/request.js';

export default {
  components: {
  },

  data () {
    return {
        id:null,
        data:{}
    }
  },
  methods:{
      _getArticleInfo (id) {
          request('topic/'+id).then( res=>{
              this.data = res
          })
      }
  },
  onLoad(option){
      this.id = option.id;
      this._getArticleInfo(this.id)
  }
}
</script>

<style>
.log-list {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}

.log-item {
  margin: 10rpx;
}
</style>
