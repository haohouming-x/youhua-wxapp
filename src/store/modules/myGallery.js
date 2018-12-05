import Vue from 'vue'
import {SET_ORDER, SET_PAY_STATE, SET_LOGISTICS, SET_HISTORY_ORDER} from '../types'

const mapApiDataToView = (orderList) => {
  let dataList = [];
  orderList && orderList.forEach((value,index,arr)=> {
    value.orderBill && value.orderBill.forEach((value,index,arr)=> {
      dataList.push(value)
    })
  })
  // console.log(datalist)
  return dataList;
}

const state = {
  completedOrderList: [],
  orderList: [],
  logistics: {},
  canPay: false
}

const mutations = {
  [SET_ORDER] (state, payload) {
    state.orderList = payload.data
  },
  [SET_PAY_STATE] (state, canPay) {
    state.canPay = canPay
  },
  [SET_LOGISTICS] (state, payload) {
    state.logistics = payload.data
  },
  [SET_HISTORY_ORDER] (state, payload) {
    state.completedOrderList = payload.data
  }
}

const getters = {
  payGoodsList: state => state.payGoodsList,
  canPay: state => state.canPay,
  orderId: state => state.orderList[0] ? state.orderList[0].id : null,
  orderList: state => mapApiDataToView(state.orderList),
  completedOrderList: state => mapApiDataToView(state.completedOrderList),
  logisticsInfo: state => {
    const flow = ['tookAt', 'sentAt', 'paidAt', 'createdAt'];
    const status = ['4', '3', '2', '1']
    const flowTips = ['已收货', '发货中', '待发货', '广东省深圳市福田区新安街道']

    const {logistice={}} = state;

    const data = flow.map((v, i) => {
      return logistice[v] ? {
        datetime: logistice[v],
        status: status[i],
        label: flowTips[i]
      } : null
    }).filter(v => !!v);

    return flow.length === data.length ? [
      ...({
        label: logistice.consigneeAddress,
        status: '5'
      }),
      ...data
    ] : data
  }
}

const actions = {
  getUserOrderList ({commit, state, rootState}, data ={}) {
    const id = rootState.userInfo.userInfo.id;

    return Vue.$http(`mygallery.order@{id: ${id}}`, {data, method: 'get'})
  },

  getOrderLogistics ({commit, state}, data={}) {
    const {id} = data;
    return Vue.$http(`mygallery.orderlogistics@{id: id}`, {method: 'get'})
      .then(v =>{
        commit(SET_LOGISTICS, {data: v})

        return state.logistics
      })
  },
  getCompletedOrders ({dispatch, commit, state}) {
    return dispatch('getUserOrderList', {status: 'AT', 'orderBill.status': 'RT'})
      .then(v => {
        commit(SET_HISTORY_ORDER, {data: v});

        return state.completedOrders
      });
  },
  getCurrentOrders ({dispatch, commit, state}, data = {}) {
    return dispatch('getUserOrderList', {status: ['WS','AS']})
      .then(v => {
        commit(SET_ORDER, {data: v});
        commit(SET_PAY_STATE, v.length > 0 ? false : true);

        if(!state.canPay) return;

        return dispatch('getUserOrderList', {status: 'AT', 'orderBill.status': 'AE'});
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
