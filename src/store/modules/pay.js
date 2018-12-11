import Vue from 'vue'
import {SET_TOTAL} from '../types'
import {SET_MEMBER} from '../types'

const state = {

}

const getters = {
  canPay: (_, __, ___, rootGetters) => rootGetters['goods/waitPayList'].length > 0 || rootGetters['myGallery/orderList'].length > 0
}

const mutations = {

}

const actions = {
  order(context, orderId) {
    return Vue.$http(`pay.order@{id: ${orderId}}`, {method: 'post'})
  },
  paymember({rootState}, marketId) {
    const consumerId = rootState.userInfo.userInfo.id;

    return Vue.$http(`member.paymoney@{id: ${marketId}, consumer_id: ${consumerId}}`, {method: 'post'})
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
