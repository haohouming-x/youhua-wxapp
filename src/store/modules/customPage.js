import Vue from 'vue'
import {SET_CURRENT_CUSTOM_PAGE} from '../types'

const state = {
  current: {}
}

const mutations = {
  [SET_CURRENT_CUSTOM_PAGE] (state, payload) {
    state.current = payload.data;
  }
}

const getters = {
  current: state => state.current
}

const actions = {
  getCurrent ({commit, state}, data = {}) {
    const {id, ...other} = data;
    return Vue.$http(`globalUrl.getCustomPage@{id:${id}}`, {data: other, method: 'get'})
      .then(v => {
        commit(SET_CURRENT_CUSTOM_PAGE, {data: v});

        return state.current;
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
