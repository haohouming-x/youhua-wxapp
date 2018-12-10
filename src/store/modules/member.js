import Vue from 'vue'
import {SET_MARKETINGS} from '../types'
const state = {
  list: []
}
const mutations = {
  [SET_MARKETINGS] (state, payload) {
    state.list = payload.data;
  }
}
const getters = {
  list: state => state.list,
}
const actions = {
  getmarketings({commit, state}, data = {}) {
    return Vue.$http('member.marketings', {data, method: 'get'})
      .then(v => {
        commit(SET_MARKETINGS, {data: v})
        return state.list
        console.log(state)
      })
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}