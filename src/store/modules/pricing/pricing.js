import axios from 'axios'
import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import appConstants from '../../../appConstants'

Vue.use(Loading)

const defaultState = () => {
  return {
    pricingPlansList: [],
    pricingPlanDetails: {},
    pricingPlansOptionsList: [],
    alerts: {
      showPricingModal: false,
      pricingModalMessage: ''
    }
  }
}

const state = defaultState()

const getters = {
  getAllPricingPlansList: (state) => state.pricingPlansList,
  getPricingPlanDetails: (state) => state.pricingPlanDetails,
  getPricingPlansOptionsList: (state) => state.pricingPlansOptionsList,
  showPricingModal: (state) => state.alerts.showPricingModal,
  pricingModalMessage: (state) => state.alerts.pricingModalMessage
}
const mutations = {
  setPricingPlansList: (state, data) => {
    state.pricingPlansList = data
  },
  setPricingPlanDetails: (state, details) => {
    state.pricingPlanDetails = details
  },
  setPricingPlansOptionsList: (state, options) => {
    state.pricingPlansOptionsList = options
  },

  addPricingToPricingList: (state, Lead) => {
    state.pricingPlansList.push(Lead)
  },
  pricingResetState(state) {
    Object.assign(state, defaultState())
  },
  updateShowPricingModal(state, [value, message]) {
    state.alerts.showPricingModal = value
    if (value == false) {
      state.alerts.pricingModalMessage = ''
    } else {
      state.alerts.pricingModalMessage = message
      setTimeout(() => {
        state.alerts.showPricingModal = false
        state.alerts.pricingModalMessage = ''
      }, 3000)
    }
  },

  clearAllPricingData(state) {
    state.alerts.showPricingModal = false
    state.alerts.pricingModalMessage = ''

    state.pricingPlanDetails = {}
  },
  reset(state) {
    Object.assign(state, defaultState())
  }
}

const actions = {
  fetchPricingPlanslist({ commit }) {
    let loader = Vue.$loading.show({})
    return axios
      .get(`/vendors/pricingplan/`)
      .then((response) => {
        commit('setPricingPlansList', response.data.data.plans)

        loader.hide()
        return response.data.data.next
      })
      .catch(function () {
        Vue.notify({
          group: 'error',
          type: 'error',
          text: appConstants.API_CATCH_MESSAGE
        })
        loader.hide()
      })
  },

  createPricingPlan({ commit }, pricingData) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .post(`/vendors/createpricingplan/`, pricingData)
        .then((response) => {
          var new_created_pricingPlan_id = response.data.data.id

          var optionsData = {
            pricingplans_id: new_created_pricingPlan_id,
            options_list: pricingData.options
          }

          axios
            .post(`/vendors/pricingplan/association/add/`, optionsData)
            .then(() => {
              loader.hide()
              commit('updateShowPricingModal', [
                true,
                'Pricing plan created successfully'
              ])
            })
            .catch(function () {
              Vue.notify({
                group: 'error',
                type: 'error',
                text: appConstants.API_CATCH_MESSAGE
              })
              loader.hide()
            })
          resolve(response.data.data.id)
        })
        .catch(function () {
          Vue.notify({
            group: 'error',
            type: 'error',
            text: appConstants.API_CATCH_MESSAGE
          })
          loader.hide()
          reject()
        })
    })
  },

  updatePricingPlan({ commit }, pricingData) {
    let loader = Vue.$loading.show({})
    var id = pricingData.id
    delete pricingData.id
    return new Promise((resolve, reject) => {
      return axios
        .patch(`/vendors/updatepricing/${id}/`, pricingData)
        .then(() => {
          var optionsData = {
            pricingplans_id: id,
            options_list: pricingData.options
          }

          axios
            .post(`/vendors/pricingplan/association/add/`, optionsData)
            .then(() => {
              loader.hide()
              commit('updateShowPricingModal', [
                true,
                'Pricing plan updated successfully'
              ])
            })
            .catch(function () {
              Vue.notify({
                group: 'error',
                type: 'error',
                text: appConstants.API_CATCH_MESSAGE
              })
              loader.hide()
            })
        })
        .catch(function () {
          Vue.notify({
            group: 'error',
            type: 'error',
            text: appConstants.API_CATCH_MESSAGE
          })
          loader.hide()
          reject(appConstants.API_CATCH_MESSAGE)
        })
    })
  },

  fetchAllPricingPlanOptions({ commit }) {
    let loader = Vue.$loading.show({})

    return new Promise((resolve, reject) => {
      return axios
        .get(`/vendors/pricingplan/options/all/`)
        .then((response) => {
          commit('setPricingPlansOptionsList', response.data.data)
          loader.hide()
          resolve()
        })
        .catch(function () {
          Vue.notify({
            group: 'error',
            type: 'error',
            text: appConstants.API_CATCH_MESSAGE
          })
          loader.hide()
          reject(appConstants.API_CATCH_MESSAGE)
        })
    })
  },

  editPricingplan({ commit }, pricingPlan) {
    {
      commit('setPricingPlanDetails', pricingPlan)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
