const math = function(number) {
  return {
    toFixed(n) {
      return Math.round(number*Math.pow(10,n))/Math.pow(10,n).toFixed(n);
    },
    toInt() {
      return parseInt(number)
    },
    toCeil() {
      return Math.ceil(number)
    },
    toFloor() {
      return Math.floor(number)
    }
  }
}

export default {
  install(Vue) {
    Vue.$math = math;
    Vue.prototype.$math = math;
  }
}
