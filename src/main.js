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
    const isCheckPath = notCheckLoginPaths.indexOf(path) < 0;

    if(isCheckPath) {
      // FRAME: 符合规则的路由，进行是否登录或者授权的后续操作
      // 建议不要写异步操作，由于mpvue暂没办法拦截某个pages组件的渲染
      // ...
    }
  }
})

const app = new Vue({
  store,
  ...App
})

app.$mount()
