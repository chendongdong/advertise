import Vue from 'vue'

import 'normalize.css/normalize.css'
// import 'vux/src/styles/index.less'

import '@/styles/index.scss' // global css
import '@/styles/fonts/font.scss'
import * as filters from './filters' // global filters

import App from './App'
// import router from './router'

import VueVideoPlayer from 'vue-video-player'
// import VueAwesomeSwiper from 'vue-awesome-swiper'
// Vue.use(VueAwesomeSwiper)

import AlloyFinger from 'alloyfinger/alloy_finger' // 手势库
import AlloyFingerVue from 'alloyfinger/vue/alloy_finger.vue'
Vue.use(AlloyFingerVue, {
  AlloyFinger
});
Vue.use(AlloyFingerVue);
Vue.use(VueVideoPlayer)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.config.productionTip = false

import eruda from 'eruda'
eruda.init()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  components: { App },
  template: '<App/>'
})
