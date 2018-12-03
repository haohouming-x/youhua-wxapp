import Vue from 'vue'
import plugins from '@/plugins'

import App from '@/App'
import store from '@/store'

Vue.config.productionTip = false

import MpvueRouterPatch from 'mpvue-router-patch'
Vue.use(MpvueRouterPatch)


const app = new Vue({
  store,
  ...App
})

app.$mount()
