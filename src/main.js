import Vue from 'vue'
import App from '@/App'
import store from '@/store'
import plugins from '@/plugins'

Vue.config.productionTip = false

import MpvueRouterPatch from 'mpvue-router-patch'
Vue.use(MpvueRouterPatch)


Vue.mixin({
  onUnload () {
    if (this.$options.data) {
      Object.assign(this.$data, this.$options.data()) // 重置组件数据状态
    }
  }
})

const app = new Vue({
  store,
  ...App
})

app.$mount()
