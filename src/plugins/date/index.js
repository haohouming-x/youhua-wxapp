import EchanedDayjs from './echaned'

export default {
  install(Vue) {
    Vue.$date = EchanedDayjs;
    Vue.prototype.$date = EchanedDayjs;
  }
}
