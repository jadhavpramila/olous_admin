import axios from 'axios'
import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
Vue.use(Loading)

const defaultState = () => {
  return {
    newUserAnalytics: {},
    activeUserAnalytics: {},
    vendorCatagoryAnalytics: {},
    userProfessionAnalytics: {},
    userSectorAnalytics: {}
  }
}

const state = defaultState()

const getters = {
  getter_newUserAnalytics: (state) => state.newUserAnalytics,
  getter_activeUserAnalytics: (state) => state.activeUserAnalytics,
  getter_vendorCatagoryAnalytics: (state) => state.vendorCatagoryAnalytics,
  getter_userProfessionAnalytics: (state) => state.userProfessionAnalytics,
  getter_userSectorAnalytics: (state) => state.userSectorAnalytics
}
const mutations = {
  reset(state) {
    Object.assign(state, defaultState())
  },
  commit_newUserAnalytics: (state, data) => {
    state.newUserAnalytics = data
  },
  commit_activeUserAnalytics: (state, data) => {
    state.activeUserAnalytics = data
  },
  commit_vendorCatagoryAnalytics: (state, data) => {
    state.vendorCatagoryAnalytics = data
  },
  commit_userProfessionAnalytics: (state, data) => {
    state.userProfessionAnalytics = data
  },
  commit_userSectorAnalytics: (state, data) => {
    state.userSectorAnalytics = data
  }
}

const actions = {
  action_fetchNewUserAnalytics({ commit }, data) {
    //console.log('data', data)
    let obj = {
      end_date: data.end_date,
      start_date: data.start_date
    }
    return new Promise((resolve, reject) => {
      axios
        .post(
          `https://content.olous.app/api/v1/search/analytics/alluserscount/`,
          obj
        )
        .then(function (response) {
          //console.log('response', response)
          commit('commit_newUserAnalytics', response.data.data)
          resolve(response.data.data)
        })
        .catch(function (error) {
          console.log(error)
          reject(error)
        })
    })
  },
  action_fetchActiveUserAnalytics({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `https://content.olous.app/api/v1/search/analytics/userslocationperdaycount/`,
          data
        )
        .then(function (response) {
          //console.log('response', response)
          commit('commit_activeUserAnalytics', response.data.data)
          resolve(response.data.data)
        })
        .catch(function (error) {
          console.log(error)
          reject(error)
        })
    })
  },
  action_fetchVendorCatagoryAnalytics({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `https://content.olous.app/api/v1/search/analytics/vendorcategoriescount/`,
          data
        )
        .then(function (response) {
          commit(
            'commit_vendorCatagoryAnalytics',
            response.data.data.vendor_categories
          )
          resolve(response.data.data)
        })
        .catch(function (error) {
          console.log(error)
          reject(error)
        })
    })
  },
  action_fetchUserProfessionAnalytics({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `https://content.olous.app/api/v1/search/analytics/usersprofcategoriescount/`,
          data
        )
        .then(function (response) {
          //console.log('response', response)
          commit('commit_userProfessionAnalytics', response.data.data)
          resolve(response.data.data)
        })
        .catch(function (error) {
          console.log(error)
          reject(error)
        })
    })
  },
  action_fetchUserSectorAnalytics({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `https://content.olous.app/api/v1/search/analytics/userssectorcategoriescount/`,
          data
        )
        .then(function (response) {
          //console.log('response', response)
          commit('commit_userSectorAnalytics', response.data.data)
          resolve(response.data.data)
        })
        .catch(function (error) {
          console.log(error)
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
