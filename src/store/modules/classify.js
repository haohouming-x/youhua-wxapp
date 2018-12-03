import Vue from 'vue'
import {SET_CURRENT_CLASSIFY, SET_LIST_CLASSIFY} from '../types'


const state = {
  list: [],
  // 没用噶（例子）
  // currentId: null
}

const mutations = {
  // 没用噶（例子）
  // [SET_CURRENT_CLASSIFY] (state, payload) {
  //   state.currentId = payload.data;
  // },
  [SET_LIST_CLASSIFY] (state, payload) {
    state.list = payload.data;
  }
}

const getters = {
  list: state => state.list,
  // 没用噶（例子）
  // currentId: (state) => state.currentId,
  // 没用噶（例子）
  // currentData: (state) => state.list.find(v => v.id === state.currentId),
}

const actions = {
  getClassifyList ({commit, state}, data = {}) {
    return Vue.$http('home.getClassifies', {data, method: 'get'})
      .then(v => {
        commit(SET_LIST_CLASSIFY, {data: v});

        return state.list;
      });
  },
  getClassifyListAndGoods ({commit, dispatch}, data = {}, index = 0) {
    return dispatch('getClassifyList', data)
      // .then(v => dispatch('goods/getGoodsListByClassifyId', {id: 1, page: 1}, {root: true}));
      .then(v => v.length > 0 && dispatch('goods/getGoodsListByClassifyId', {id: v[index].id, page: 1}, {root: true}));
  },
  // 没用噶（例子）
  // getCurrentGoodsList ({commit, dispatch}, data={}) {
  //   const {id} = data;
  //   commit(SET_CURRENT_CLASSIFY, id);
  //   dispatch('goods/getGoodsListByClassifyId', data, {root: true});
  // }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
