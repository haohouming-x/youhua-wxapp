import Vue from 'vue'
import {SET_MARKETINGS, SET_MEMBER_INFO, SET_USER_INFO} from '../types'

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
      })
  },
  getmemberinfo({commit, state, rootState}, data = {}) {
    const consumerid = rootState.userInfo.userInfo.id;

    return Vue.$http(`member.userinfo@{id: ${consumerid}}`,{data, method: 'get'})
     .then(v => {
       commit(SET_MEMBER_INFO,{data: v})

       commit(`userInfo/${SET_USER_INFO}`, {data: {
         ...rootState.userInfo.userInfo,
         member: v
       }}, {root: true})

       return state.detail
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
