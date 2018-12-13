import Vue from 'vue'
import {SET_ORDER, SET_LOGISTICS, SET_HISTORY_ORDER, SET_SHOW_LOGISTICS} from '../types'

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
  showLogistics: false,
  total: 0
}

const mutations = {
  [SET_ORDER] (state, payload) {
    state.orderList = payload.data
  },
  [SET_LOGISTICS] (state, payload) {
    state.logistics = payload.data
  },
  [SET_SHOW_LOGISTICS] (state, showLogistics) {
    state.showLogistics = showLogistics;
  },
  [SET_HISTORY_ORDER] (state, payload) {
    state.completedOrderList = payload.data
  }
}

const getOrderTotal = (orders) => {
  return orders.reduce((acc, v) => {
    // if(v.status && v.status==='AE'){
    //   acc += v['depositPrice']
    // }
    // if (v.status && v.status ==='RT') {
    acc -= v['depositPrice']
    // }
    return acc
  }, 0)
}

const getters = {
  showLogistics: state => state.showLogistics,
  orderId: state => state.orderList[0] ? state.orderList[0].id : null,
  orderList: state => mapApiDataToView(state.orderList),
  completedOrderList: state => mapApiDataToView(state.completedOrderList),
  logisticsInfo: state => {
    const flow = ['tookAt', 'sentAt', 'paidAt', 'createdAt'];
    const status = ['4', '3', '2', '1']
    const flowTips = ['已收货', '发货中', '待发货', '广东省深圳市福田区新安街道']

    const {logistics} = state;

    const data = flow.map((v, i) => {
      return logistics[v] ? {
        datetime: logistics[v].replace(/(T|\+.*)/g, ' '),
        status: status[i],
        label: flowTips[i]
      } : null
    }).filter(v => !!v);

    return flow.length === data.length ? [
      ...({
        label: logistics.consigneeAddress,
        status: '5'
      }),
      ...data
    ] : data
  },
  orderTotal: (_, getters, ___, rootGetters) => {
    let total = rootGetters['goods/waitPayList'].reduce((acc, v) =>  acc + v['depositPrice'], 0);
    total += getOrderTotal(getters.orderList);

    return total;
  }
}

const actions = {
  getUserOrderList ({commit, state, rootState}, data ={}) {
    const id = rootState.userInfo.userInfo.id;

    return Vue.$http(`mygallery.order@{id: ${id}}`, {data, method: 'get'})
  },

  getUserOrderListWithState ({commit, dispatch, state}, data = {}) {
    return dispatch('getUserOrderList', data)
      .then(v => {
        commit(SET_ORDER, {data: v});

        return state.orderList;
      })
  },
  getOrderLogistics ({commit, state}, data={}) {
    const {id} = data;
    return Vue.$http(`mygallery.orderlogistics@{id: ${id}}`, {method: 'get'})
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
  getCurrentOrders ({dispatch, commit, state, getters}, data = {}) {
    return dispatch('getUserOrderListWithState', {status: ['WS','AS']})
      .then(v => {
        commit(SET_SHOW_LOGISTICS, v.length > 0 ? true : false);

        if(state.showLogistics) return;

        return dispatch('getUserOrderListWithState', {status: 'AT', 'orderBill.status': 'AE'})
      })
      .then(v => getters.orderList)
  },
  postUserOrder({commit, state, rootState}, data={}) {
    const id = rootState.userInfo.userInfo.id;

    return Vue.$http(`mygallery.order@{id: ${id}}`, {data, method: 'post'})
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
