import handleRequest from '@/plugins/http/flyio/request'


export default {

  install (Vue) {
    Vue.$http = handleRequest;
    Vue.prototype.$http = handleRequest;
  }

}
