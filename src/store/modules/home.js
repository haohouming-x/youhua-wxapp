import Vue from 'vue'
const state = {
  count: 0
}
const mutations = {

}
const actions = {
  getbanner ({commit}, data = {}) {
    return Vue.$http('home.getBanner', {data,method: 'get'})
  },
  getClassifies ({commit}, data = {}) {
    return Vue.$http('home.getClassifies', {data, method: 'get'})
  },
  getClassGoods ({commit}, data = {}) {
    const {id, ...other} = data
    console.log(id)
    return Vue.$http(`home.getClassGoods@{id: ${id}}`, {other, method: 'get'})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}