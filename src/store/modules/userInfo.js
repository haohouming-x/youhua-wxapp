import Vue from 'vue'
import { SET_USER_INFO } from '../types'

const state = {
    userInfo: {},
    isNew: false
}

const mutations = {
    [SET_USER_INFO] (state , payload) {
        state.userInfo = payload.data;
    }
}

const getters = {
    userInfo: state => state.userInfo,
    isNew: state => !state.userInfo.lastLoginAt
}

const actions = {
    wxLogin() {
        return new Promise((resovle, reject) => {
            wx.login({
                success (res) {
                    if (res.code) {
                    //发起网络请求
                        resovle(res.code);
                    } else {
                        reject(res.errMsg);
                    }
                }
            });
        })
    },
    changeUserInfo({commit, state}, data={}) {
        return Vue.$http(`globalUrl.getConsumer@{id:${data.id}}`, {data, method: 'put'})
            .then(v => {
                // console.log(v);
                let {image, sex, nickName} = v;

                commit(SET_USER_INFO, {data: {
                    ...state.userInfo,
                    image, sex, nickName
                }});

                return state.userInfo;
            })
    },
    userLogin ({dispatch, commit, state}, data = {}) {
        return dispatch('wxLogin')
            // 用户后台登录
            .then(v => {
                let data = {
                    code: v
                };
                return Vue.$http('globalUrl.login', {data, method: 'post'})
            })
            // 保存用户信息
            .then(v => {
                commit(SET_USER_INFO, {data: v});
                // console.log()
                return state.userInfo;
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