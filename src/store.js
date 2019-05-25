/* eslint-disable no-undef */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    initView: true,
    loading: false,
    users: [],
    errormsg: ''
  },
  mutations: {
    //写出三种状态，1、请求中；2、请求成功；3、请求失败
    REQUESTING: (state) => {
      state.initView = false,
        state.loading = true,
        state.users = [],
        state.errormsg = ''
    },

    REQUEST_SUCCESS: (state, { users }) => {
      state.users = users,
        state.loading = false
    },

    REQUEST_ERROR: (state, { errormsg }) => {
      state.errormsg = errormsg,
        state.loading = false
    }
  },
  actions: {
    //这里写的是Search.vue组件中调用的this.$store.dispatch("search", searchName)
    search({ commit }, searchName) {
      //先提交请求，更新请求中的状态
      commit('REQUESTING')

      const url = `https://api.github.com/search/users?q=${searchName}`

      axios.get(url)
        .then(response => {
          const users = response.data.items.map(item => ({
            url: item.html_url,
            avatarUrl: item.avatar_url,
            username: item.login
          }))
          //返回数据成功后，更新数据成功的状态
          commit('REQUEST_SUCCESS', {
            users
          })
        })
        //返回数据失败后，更新数据失败的状态
        // eslint-disable-next-line no-unused-vars
        .catch(error => {
          commit('REQUEST_ERROR', { errormsg: 'REQUEST_ERROR' })
        })
    }
  }
})