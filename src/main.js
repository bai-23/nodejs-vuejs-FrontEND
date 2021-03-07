import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

import './assets/scss/style.scss'
import './assets/iconfont/iconfont.css'   // 字体图标
import VueAwesomeSwiper from "vue-awesome-swiper";
import 'swiper/dist/css/swiper.css'

Vue.config.productionTip = false

Vue.prototype.$http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/web/api',
  // baseURL: 'http://localhost:3000/web/api'
})

Vue.use(VueAwesomeSwiper)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
