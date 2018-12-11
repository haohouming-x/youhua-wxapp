import Vue from 'vue'
import {SET_MARKETINGS} from '../types'
import {SET_MEMBER_INFO} from '../types'
const state = {
  list: [],
  detail: {}
}
const mutations = {
  [SET_MARKETINGS] (state, payload) {
    state.list = payload.data;
  },
  [SET_MEMBER_INFO] (state, payload) {
    state.detail = payload.data
  }
}
const getters = {
  list: state => state.list,
  detail: state => state.detail
}
const actions = {
  getmarketings({commit, state}, data = {}) {
    return Vue.$http('member.marketings', {data, method: 'get'})
      .then(v => {
        commit(SET_MARKETINGS, {data: v})
        return state.list
        console.log(state)
      })
  },
  getmemberinfo({commit, state, id}, data = {}) {
    return Vue.$http(`member.userinfo@{id: ${id}}`,{data, method: 'get'})
     .then(v => {
       commit(SET_MEMBER_INFO,{data: v})
       return state.detail
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