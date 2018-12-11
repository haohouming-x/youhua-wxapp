import Vue from 'vue'
import {SET_PAY_GOODS, SET_LIST_GOODS, SET_CURRENT_GOODS} from '../types'


const state = {
  list: [],
  current: {},
  waitPayList: [],
  // 随机选取数量
  randomCount: 6
}

const mutations = {
  [SET_PAY_GOODS] (state, payload) {
    state.waitPayList = payload.data
  },
  [SET_LIST_GOODS] (state, payload) {
    if(payload.isConcat)
      state.list.concat(payload.data)
    else
      state.list = payload.data;
  },
  [SET_CURRENT_GOODS] (state, payload) {
    state.current = payload.data;
  }
}

const getters = {
  // 当前列表
  currentList: (state) => state.list,
  // 详情
  currentData: (state) => state.current,
  // 同类列表
  similarList: (state) => (randomCount) => {
    let arr = state.list,
        result = [],
        m = arr.length,
        t, i;

    while (m && result.length < randomCount) {
      // 随机选取一个元素…
      i = Math.floor(Math.random() * m--);
      t = arr[m];
      arr[m] = arr[i];
      arr[i] = t;
      result.push(arr[m]);
    }

    return result;
  },
  waitPayList: (state) => state.waitPayList
}

const actions = {
  getGoodsListByClassifyId ({commit, state}, data={page: 1}) {
    // getGoodsByClassifyId ({commit, state}, data={page: 1}) {
    const {id, ...other} = data;

    return Vue.$http(`home.getClassGoods@{id: ${id}}`, {data: other, method: 'get'})
      .then(v => {
        commit(SET_LIST_GOODS, {data: v, isConcat: other.page !== 1});

        return state.list;
      });
  },
  getPayGoods ({commit, state}, data = {}) {
    if(!(data.id && data.id.length > 0)) return Promise.resolve([]);

    return Vue.$http('mygallery.goods', {data, method: 'get'})
      .then(v => {
        commit(SET_PAY_GOODS,{data: v})

        return state.waitPayList
      })
  },
  getGoodsById({commit, state}, data={}) {
    const {id} = data;

    return Vue.$http(`gooddetail.goods@{id: ${id}}`, {method: 'get'})
      .then(v => {
        commit(SET_CURRENT_GOODS, {data: v});

        return state.current;
      });
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
