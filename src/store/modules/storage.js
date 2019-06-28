import Vue from 'vue'
import {SET_STORE_UP} from '../types'

const storageKeys = {
  // 购物车
  cartIds: 'cartIds',
  // 收藏
  storeUpIds: 'storeUpIds'
}

const state = {
  storeUpIds: wx.getStorageSync(storageKeys.storeUpIds) || []
}

const getters = {
  isStoreUp: (state) => (goodsId) => state.storeUpIds.indexOf(goodsId) !== -1
}

const mutations = {
  [SET_STORE_UP] (state, payload) {
    state.storeUpIds = payload.data
  }
}

const actions = {
  getWxStorage({}, key) {
    // const newKey = `${key}@@${rootState.userInfo.userInfo.id}`;
    try {
       const value = wx.getStorageSync(key);

      if(value) {
        return Promise.resolve(value);
      }
    } catch(errMsg)  {
      // Do something when catch error
      if (errMsg === 'getStorage:fail data not found' || errMsg === 'getStorage:fail:data not found') {
        return Promise.resolve(null);
      }
    }
  },
  addToArrayStorage({dispatch}, data={}) {
    const {key, id} = data;

    return dispatch('getWxStorage', key)
      .then(res => {
        let value = res || [];

        if(value.indexOf(id) !== -1 ) {
          return Promise.reject(res);
        }

        value.push(id);
        wx.setStorage({
          key, data: value
        })

        return value;
      })
  },
  delectToArrayStorage({dispatch}, data={}) {
    const {key, id} = data;

    return dispatch('getWxStorage', key)
      .then(value => {
        if(value) {
          const newIds = value.filter(v => v != id);

          wx.setStorage({
            key, data: newIds
          })

          return newIds;
        }else {
          return Promise.reject('don\'t have something');
        }
      })
  },
  removeStorage({}, key) {
    try {
      wx.removeStorageSync(key);

      return Promise.resolve();
    } catch (e) {
      // Do something when catch error
      return Promise.reject();
    }
  },

  getCartIds({dispatch}) {
    return dispatch('getWxStorage', storageKeys.cartIds)
  },
  addCartId({dispatch}, id) {
    return dispatch('addToArrayStorage', {key: storageKeys.cartIds, id})
  },
  delectCartId({dispatch}, id) {
    return dispatch('delectToArrayStorage', {key: storageKeys.cartIds, id})
  },
  removeCartIds({dispatch}) {
    return dispatch('removeStorage', storageKeys.cartIds)
  },

  getStoreUpIds({dispatch}) {
    return dispatch('getWxStorage', storageKeys.storeUpIds)
  },
  addStoreUpIds({dispatch, commit, state}, id) {
    return dispatch('addToArrayStorage', {key: storageKeys.storeUpIds, id})
      .then(v => {
        commit(SET_STORE_UP, {data: v});
        return state.storeUpIds;
      })
  },
  delectStoreUpIds({dispatch, commit, state}, id) {
    return dispatch('delectToArrayStorage', {key: storageKeys.storeUpIds, id})
      .then(v => {
        commit(SET_STORE_UP, {data: v});
        return state.storeUpIds;
      })
  },
  removeStoreUpIds({dispatch, commit, state}) {
    return dispatch('removeStorage', storageKeys.storeUpIds)
      .then(v => {
        commit(SET_STORE_UP, {data: []});
        return state.storeUpIds;
      })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
