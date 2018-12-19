import Vue from 'vue'
import {
  SET_ORDER, SET_HISTORY_ORDER,
  SET_LOGISTICS, SET_SHOW_LOGISTICS,
  SET_CANCEL_PAYIDS, SET_APPEND_PAYIDS
} from '../types'

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


const state = {
  completedOrderList: [],
  orderList: [],
  cancelPayOrderIds: [],
  logistics: {},
  showLogistics: false,
  total: 0
}

const mutations = {
  [SET_ORDER] (state, payload) {
    state.orderList = payload.data;
  },
  [SET_LOGISTICS] (state, payload) {
    state.logistics = payload.data
  },
  [SET_SHOW_LOGISTICS] (state, showLogistics) {
    state.showLogistics = showLogistics;
  },
  [SET_HISTORY_ORDER] (state, payload) {
    state.completedOrderList = payload.data
  },
  [SET_CANCEL_PAYIDS] (state, id) {
    state.cancelPayOrderIds.push(id)
  },
  [SET_APPEND_PAYIDS] (state, id) {
    state.cancelPayOrderIds.splice(state.cancelPayOrderIds.indexOf(id), 1)
  }
}

const getters = {
  showLogistics: state => state.showLogistics,
  orderId: state => state.orderList[0] ? state.orderList[0].id : null,
  payOrderIds: (state, getters) => state.showLogistics ? [] :
      getters.orderList.filter(v => state.cancelPayOrderIds.indexOf(v.id) < 0).map(v => v.id),
  orderList: state => mapApiDataToView(state.orderList),
  completedOrderList: state => mapApiDataToView(state.completedOrderList),
  logisticsInfo: state => {
    const flow = ['tookAt', 'sentAt', 'paidAt', 'createdAt'];
    const status = ['4', '3', '2', '1']
    const flowTips = ['已收货', '发货中', '待发货', '广东省深圳市福田区新安街道']

    const {logistics} = state;

    const data = flow.map((v, i) => {
      return logistics[v] ? {
        datetime: logistics[v],
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

    return Vue.$math(total).toFixed(2);
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

        if(state.showLogistics) return false;

        return dispatch('getUserOrderList', {status: 'AT', 'orderBill.status': ['AE', 'RT']})
      })
      .then(res => {
        if(res === false) return;

        let arr = [];

        const newMeta = res.reduce((acc, v) => {
          v.orderBill = v.orderBill.reduce((billAcc, bill) => {
            if(bill.status === 'RT') arr.push(bill);
            else if(bill.status === "AE") billAcc.push(bill);

            return billAcc;
          }, []);

          if(v.orderBill.length > 0) acc.push(v);

          return acc;
        }, []).filter(v => {
          v.orderBill = v.orderBill.filter(bill => {
            const mLength = arr.length;

            arr = arr.filter(a => a.goods.id !== bill.goods.id && a.depositPrice !== bill.depositPrice);

            return mLength === arr.length;
          });

          return v.orderBill.length > 0;
        })

        commit(SET_ORDER, {data: newMeta});
      })
      .then(v => getters.orderList)
  },
  postUserOrder({commit, state, rootState}, data={}) {
    const id = rootState.userInfo.userInfo.id;

    return Vue.$http(`mygallery.order@{id: ${id}}`, {data, method: 'post'})
  },
  setCancelIds({commit, state}, data={}) {
    const {isCancel, id} = data;

    if(isCancel) {
      commit(SET_CANCEL_PAYIDS, id)
    }else {
      commit(SET_APPEND_PAYIDS, id)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
