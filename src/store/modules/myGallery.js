import Vue from 'vue'
const state = {
  count: 0
}
const mutations = {

}
const actions = {
  getgoods ({commit}, data = {}) {
    return Vue.$http('mygallery.goods', {data, method: 'get'})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}