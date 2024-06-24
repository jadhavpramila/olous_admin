/* eslint-disable no-unused-vars */
import axios from 'axios'
import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import appConstants from '../../../appConstants'

Vue.use(Loading)

const state = {}

const getters = {}
const mutations = {}

const actions = {
  action_requestForOTP({ commit }, payload) {
    let loader = Vue.$loading.show({})

    return new Promise((resolve, reject) => {
      return axios
        .post(`/olous_user/otp/create/`, payload)
        .then((response) => {
          var order_object = response['data']['data']
          loader.hide()
          resolve(order_object)
        })
        .catch(function (error) {
          loader.hide()

          try {
            let msg = error.response.data.message
            reject(msg)
          } catch (error) {
            Vue.notify({
              group: 'error',
              type: 'error',
              text: appConstants.API_CATCH_MESSAGE
            })

            reject('')
          }
        })
    })
  },

  action_checkIsOTPCorrect({ commit }, [payload, update_in_user_account]) {
    //update_in_user_account if set to true it will update email/phone
    // in user account so be careful while setting it true
    payload['update_in_user_account'] = update_in_user_account
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .post(`/olous_user/otp/match/`, payload)
        .then((response) => {
          loader.hide()
          resolve(response['data']['data'])
        })
        .catch(function (error) {
          loader.hide()
          try {
            let msg = error.response.data.message
            reject(msg)
          } catch (error) {
            Vue.notify({
              group: 'error',
              type: 'error',
              text: appConstants.API_CATCH_MESSAGE
            })

            reject('')
          }
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
