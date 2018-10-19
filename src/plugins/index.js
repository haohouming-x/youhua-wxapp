import Vue from 'vue'

const pluginsContext = require.context('@/plugins', true, /^.\/\w+\/index\.js$/)

pluginsContext.keys().forEach((plguin) => {
  Vue.use(pluginsContext(plguin).default)
})
