import Vue from 'vue'
const state = {
  count: 0
}
const mutations = {

}
const actions = {
  getGoods ({commit},data = {}) {
    const {id, ...other} = data

    return Vue.$http(`gooddetail.goods@{id: ${id}}`,{other, method: 'get'})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
