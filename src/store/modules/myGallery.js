import Vue from 'vue'
import {SET_PAY_GOODS, SET_ORDER} from '../types'
const state = {
  list: [],
  orderlist: []
}
const mutations = {
  [SET_PAY_GOODS] (state, payload) {
    state.list = payload.data
  },
  [SET_ORDER] (state, payload) {
    state.orderlist = payload.data
  }
}
const getters = {
  list:state => state.list,
  count: (state, {list}) => list.length,
  orderlist: state => {
    let datalist = [];    
    state.orderlist && state.orderlist.forEach((value,index,arr)=> {
      value.orderBill && value.orderBill.forEach((value,index,arr)=> {
        datalist.push(value)
      })
    })
    console.log(datalist)
    return datalist;
  }
}
const actions = {
  getgoods ({commit, state}, data = {}) {
    return Vue.$http('mygallery.goods', {data, method: 'get'})
    .then(v => {
      commit(SET_PAY_GOODS,{data: v})
      return state.list
    })
  },
  getorderlist ({commit, state}, data ={}) {
    const {id, ...other} = data
    return Vue.$http(`mygallery.order@{id: ${id}}`, {data :other,method: 'get'})
    .then(v => {
      commit(SET_ORDER, {data: v})
      console.log(state.orderlist)
      return state.orderlist
    })
    console.log(data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}