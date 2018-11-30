import Vue from 'vue'
import { ADD_ADDRESS } from '../types'

const state = {
    userAddress: {
        name: '',
        contact: '',
        province: '',
        city: '',
        district: '',
        remark: '',
        detailAddress: '',
        id: 1
    }
}

const mutations = {
    [ADD_ADDRESS] (state, payload) {
        state.userAddress = payload.data;
    }
}

const getters = {
    userAddress: state => state.userAddress
}

const actions = {
    newAddress() {
        return Vue.$http(`globalUrl.newConsumer@{id:${data.id}}`, {data, method: 'post'})
            .then(v => {
                console.log(v);
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