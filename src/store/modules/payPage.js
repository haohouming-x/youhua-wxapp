import Vue from 'vue'
import { GET_PAY_INFO } from '../types'

const state = {
    userAddress: {}
}

const mutations = {
    [GET_PAY_INFO] (state,payload) {
        state.userAddress = payload.data;
    }
}

const getters = {
    userAddress: state => state.userAddress
}

const actions = {
    getAddress({commit, state}, data={}) {
        return Vue.$http(`payUrl.getAddress@{id:${data.id}}`, {method: 'get'})
            .then(v => {
                if (!!v) {
                    let address = v;
                    commit(GET_PAY_INFO, {data: address})
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