import Vue from 'vue'
import { SET_ADDRESS } from '../types'

const state = {
    userAddress: {
        name: '',
        contact: '',
        province: '',
        city: '',
        district: '',
        remark: '',
        detailAddress: '',
    }
}

const mutations = {
  [SET_ADDRESS] (state, payload) {
    if(payload.data) state.userAddress = payload.data;
    }
}

const getters = {
  userAddress: state => state.userAddress,
  hasUserAddress: state => !!state.userAddress.name
}

const actions = {
  getUserAddress({commit, state, rootState}, data={}) {
    const id = rootState.userInfo.userInfo.id;

    return Vue.$http(`user.getAddress@{id:${id}}`, {data, method: 'get'})
      .then(v => {
        if (!!v) {
          let address = v;

          commit(SET_ADDRESS, {data: address[0]});
          return state.userAddress;
        }
      })
  },
  newAddress({commit, state}, data={}) {
    const {id, ...other} = data;
    return Vue.$http(`user.getAddress@{id:${data.id}}`, {data: other, method: 'post'})
            .then(v => {
                if (!!v) {
                    let address = v;
                    commit(SET_ADDRESS, {data: address});
                    return state.userAddress;
                }
            })
    },
    changeAddress({commit, state}, data={}) {
        const {id, ...other} = data;
        return Vue.$http(`address.info@{id:${id}}`, {data: other, method: 'put'})
            .then(v => {
                if (!!v) {
                    console.log(v);
                    let address = v;
                    commit(SET_ADDRESS, {data: address});
                    return state.userAddress;
                }
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
