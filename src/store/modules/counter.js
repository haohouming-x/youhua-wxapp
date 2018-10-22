import Vue from 'vue'
const state = {
  count: 0
}

const mutations = {
  INCREMENT: (state) => {
    const obj = state
    obj.count += 1
  },
  DECREMENT: (state) => {
    const obj = state
    obj.count -= 1
  }
}

const actions = {
  increment ({commit}) {
    commit('INCREMENT')
  },
  decrement ({commit}) {
    commit('DECREMENT')
  },
  getProvince ({commit}, data = {}) {
    return Vue.$http('globalUrl.getProvince', {data, method: 'get'})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
