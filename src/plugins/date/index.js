import EchanedDayjs from './echaned'

export default {
  install(Vue) {
    Vue.prototype.$date = EchanedDayjs;
  }
}
