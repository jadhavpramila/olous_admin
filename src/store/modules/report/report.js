/* eslint-disable no-unused-vars */
import axios from 'axios'
import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

Vue.use(Loading)

const state = {}

const getters = {}
const mutations = {}

const actions = {
  fetchSalesReport({ commit }, data) {
    let loader = Vue.$loading.show({})
    var from_date = data.from_date
    var to_date = data.to_date
    return new Promise((resolve, reject) => {
      axios
        .get(
          `/olous_emp_users/vendor_creation_info/?start_date=${from_date}&end_date=${to_date}`
        )
        .then((response) => {
          loader.hide()
          resolve(response.data.data)
        })
        .catch(function (error) {
          console.log('fetchSalesReport : ' + error)
          loader.hide()
          if (error.response) {
            reject(error.response.data.message)
          } else {
            reject('Something went wrong')
          }
        })
    })
  },

  fetchPaymentReport({ commit }, data) {
    let loader = Vue.$loading.show({})
    var from_date = data.from_date
    var to_date = data.to_date
    return new Promise((resolve, reject) => {
      axios
        .post(`/vendors/paymentreport`, data)
        .then((response) => {
          loader.hide()
          resolve(response.data.data)
        })
        .catch(function (error) {
          console.log('fetchPaymentReport : ' + error)
          loader.hide()
          if (error.response) {
            reject(error.response.data.message)
          } else {
            reject('Something went wrong')
          }
        })
    })
  }
}

export default {
  namespaced: true,
  actions,
  state,
  getters,
  mutations
}
