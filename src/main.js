import Vue from 'vue'
import plugins from '@/plugins'

import App from '@/App'
import store from '@/store'

Vue.config.productionTip = false

import MpvueRouterPatch from 'mpvue-router-patch'
import routeConfig from '@/router'
Vue.use(MpvueRouterPatch)


const notCheckLoginPaths = routeConfig
      .filter(v => v.isCheckLogin === false)
      .map(v => v.path);

Vue.mixin({
  onShow() {
    if(!this.$route) return;

    const path = this.$route.path;

    if(notCheckLoginPaths.indexOf(path) < 0) {
      const id = this.$store.getters['userInfo/userInfo'].id;

      if(!id) {
        this.$router.push({path: '/pages/home/index', reLaunch: true});
      }
    }
  }
})

const app = new Vue({
  store,
  ...App
})

app.$mount()
