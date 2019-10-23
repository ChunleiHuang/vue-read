import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false
//引入并挂在到vue实例 上
import axios from "axios"
Vue.prototype.$http = axios
//引入根字体大小设置
import "./utils/rem.js"
//加载通用样式main.scss文件  webpack all in js
import "./stylesheets/main.scss"
//mint-ui
import {InfiniteScroll} from 'mint-ui';
//下拉刷新
Vue.use(InfiniteScroll);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
