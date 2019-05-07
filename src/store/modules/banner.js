import Vue from 'vue'
import {SET_LIST_BANNER} from '../types'

const state = {
  list: []
}

const mutations = {
  [SET_LIST_BANNER] (state, payload) {
    state.list = payload.data;
  }
}

const getters = {
  list: state => state.list,
  count: (state, {list}) => list.length
}

const actions = {
  getBannerList ({commit, state}, data = {}) {
    return Vue.$http('home.getBanner', {data, method: 'get'})
      .then(v => {
        commit(SET_LIST_BANNER, {data: v});

        return state.list;
      });
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
