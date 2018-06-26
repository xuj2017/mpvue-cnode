import Vue from 'vue'
import App from './App'
import store from './store/index';

Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.$store = store;

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['pages/message/main', '^pages/index/main','pages/me/main'],
    window: {
      backgroundTextStyle: "dark",
      navigationBarBackgroundColor: "#444",
      navigationBarTitleText: "vNode 社区",
      navigationBarTextStyle: "#fff"
    },
    tabBar:{
      color:'#7a7e83',
      selectedColor:'#444',
      backgroundColor:'#fff',
      borderStyle:'black',
      position:'bottom',
      list:[{
        text:'首页',
        iconPath:'static/images/index.png',
        selectedIconPath:'static/images/index-active.png',
        pagePath:'pages/index/main'
      },{
        text:'消息',
        iconPath:'static/images/message.png',
        selectedIconPath:'static/images/message-active.png',
        pagePath:'pages/message/main'
      },{
        text:'我的',
        iconPath:'static/images/me.png',
        selectedIconPath:'static/images/me-active.png',
        pagePath:'pages/me/main'
      }]
    }
  }
}
