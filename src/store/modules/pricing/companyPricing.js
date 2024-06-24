import axios from 'axios'
import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import appConstants from '../../../appConstants'

Vue.use(Loading)

const defaultState = () => {
  return {
    pricingPlansForCompany: [],
    companyPaymentStatus: '',

    alerts: {
      showCompanyPricingModal: false,
      companyPricingModalMessage: ''
    }
  }
}

const state = defaultState()

const getters = {
  getAllPricingPlansForCompany: (state) => state.pricingPlansForCompany,
  getCompanyPaymentStatus: (state) => state.companyPaymentStatus,
  showCompanyPricingModal: (state) => state.alerts.showCompanyPricingModal,
  companyPricingModalMessage: (state) => state.alerts.companyPricingModalMessage
}
const mutations = {
  setCompanyPricingPlansList: (state, data) => {
    state.pricingPlansForCompany = data
  },
  setCompanyPaymentStatus: (state, data) => {
    state.companyPaymentStatus = data
  },
  addPricingToPricingList: (state, Lead) => {
    state.pricingPlansForCompany.push(Lead)
  },
  companyPricingResetState(state) {
    Object.assign(state, defaultState())
  },
  updateShowCompanyPricingModal(state, [value, message]) {
    state.alerts.showCompanyPricingModal = value
    if (value == false) {
      state.alerts.companyPricingModalMessage = ''
    } else {
      state.alerts.companyPricingModalMessage = message
      setTimeout(() => {
        state.alerts.showCompanyPricingModal = false
        state.alerts.companyPricingModalMessage = ''
      }, 3000)
    }
  },

  clearAllCompanyPricingData(state) {
    state.alerts.showCompanyPricingModal = false
    state.alerts.companyPricingModalMessage = ''

    state.pricingPlanDetails = {}
  }
}

const actions = {
  fetchCompanyPricingPlanslist({ commit }, company_id) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .get(`/vendors/pricingforcompany/${company_id}/`)
        .then((response) => {
          commit('setCompanyPricingPlansList', response.data.data.plans)
          loader.hide()
          resolve()
        })
        .catch(function (error) {
          console.log('fetchCompanyPricingPlanslist : ' + error)
          if (error.response) {
            commit('updateShowCompanyPricingModal', [
              true,
              error.response.data.message
            ])
          } else {
            loader.hide()
            Vue.notify({
              group: 'error',
              type: 'error',
              text: appConstants.API_CATCH_MESSAGE
            })
          }

          loader.hide()
          reject()
        })
    })
  },

  fetchCurrentPaymentStatus({ commit }, company_id) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .get(`/vendors/company/paymentstatus/${company_id}/`)
        .then((response) => {
          commit('setCompanyPaymentStatus', response.data.data)
          loader.hide()
          resolve()
        })
        .catch(function (error) {
          console.log('fetchCurrentPaymentStatus : ' + error)
          if (error.response) {
            commit('updateShowCompanyPricingModal', [
              true,
              error.response.data.message
            ])
          } else {
            loader.hide()
            Vue.notify({
              group: 'error',
              type: 'error',
              text: appConstants.API_CATCH_MESSAGE
            })
          }

          loader.hide()
          reject()
        })
    })
  },

  sendPaymentLinkToUser({ commit }, data) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .post(`/vendors/company/addpaymentlink/`, data)
        .then((response) => {
          commit('updateShowCompanyPricingModal', [true, response.data.message])
          loader.hide()
          resolve()
        })
        .catch(function (error) {
          console.log('sendPaymentLinkToUser : ' + error)
          if (error.response) {
            commit('updateShowCompanyPricingModal', [
              true,
              error.response.data.message
            ])
          } else {
            loader.hide()
            Vue.notify({
              group: 'error',
              type: 'error',
              text: appConstants.API_CATCH_MESSAGE
            })
          }

          loader.hide()
          reject()
        })
    })
  },

  // eslint-disable-next-line no-unused-vars
  calculateFinalpricefromDiscount({ commit }, data) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .post(`/vendors/company/calfinalprice/`, data)
        .then((response) => {
          loader.hide()
          resolve(response.data.data.final_price)
        })
        .catch(function (error) {
          console.log('calculateFinalpricefromDiscount : ' + error)
          if (error.response) {
            // commit('updateShowCompanyPricingModal', [
            //   true,
            //   error.response.data.message
            // ])
            reject(error.response.data.message)
          } else {
            loader.hide()
            Vue.notify({
              group: 'error',
              type: 'error',
              text: appConstants.API_CATCH_MESSAGE
            })
          }

          loader.hide()
          reject()
        })
    })
  },

  cancelPaymentLinkOfUser({ commit }, company_id) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .post(`/vendors/company/cancelpaymentlink/${company_id}`)
        .then((response) => {
          commit('updateShowCompanyPricingModal', [true, response.data.message])
          loader.hide()
          resolve()
        })
        .catch(function (error) {
          console.log('CancelPaymentLinkOfUser : ' + error)
          if (error.response) {
            commit('updateShowCompanyPricingModal', [
              true,
              error.response.data.message
            ])
          } else {
            loader.hide()
            Vue.notify({
              group: 'error',
              type: 'error',
              text: appConstants.API_CATCH_MESSAGE
            })
          }

          loader.hide()
          reject()
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
