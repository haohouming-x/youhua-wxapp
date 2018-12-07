import Vue from 'vue'
import {SET_TOTAL} from '../types'


const state = {

}

const getters = {

}

const mutations = {

}

const actions = {
  order(context, orderId) {
    return Vue.$http(`pay.order@{id: ${orderId}}`, {method: 'post'})
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
