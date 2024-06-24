import axios from 'axios'
import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import appConstants from '../../../appConstants'

Vue.use(Loading)

const defaultState = () => {
  return {
    referenceData: '',
    showReferenceModal: '',
    modalReferenceMessage: ''
  }
}

const state = defaultState()

const getters = {
  getReferenceData: (state) => state.referenceData,
  showReferenceModal: (state) => state.showReferenceModal,
  modalReferenceMessage: (state) => state.modalReferenceMessage
}
const mutations = {
  setReferenceData: (state, experienceValue) => {
    state.referenceData = experienceValue
  },
  updateReferenceModalData: (state, [value, message]) => {
    state.showReferenceModal = value
    if (value == false) {
      state.modalReferenceMessage = ''
    } else {
      state.modalReferenceMessage = message
      setTimeout(() => {
        state.showReferenceModal = false
        state.modalReferenceMessage = ''
      }, 2500)
    }
  },
  referenceResetState(state) {
    Object.assign(state, defaultState())
  },
  reset(state) {
    Object.assign(state, defaultState())
  }
}

const actions = {
  fetchReferenceData({ commit }, companyId) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .get(`/vendors/company/infowithpqq/${companyId}`)
        .then(function (response) {
          commit('setReferenceData', response.data.data)
          loader.hide()
          resolve(response.data.data)
        })
        .catch(function (error) {
          console.log('fetchReferenceData : ' + error)
          if (error.response) {
            commit('updateReferenceModalData', [
              true,
              error.response.data.message
            ])
          } else {
            commit('updateReferenceModalData', [true, 'Something went wrong'])
          }
          loader.hide()
          reject()
        })
    })
  },

  saveReferenceData({ commit }, data) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .post(`/vendors/company/pqq/reference`, data)
        .then(function (refResponse) {
          let tab_data = {
            company_id: data.company_id,
            company_tab: appConstants.companyTabs.REFERENCES,
            tab_completed_status: true
          }

          axios
            .post(`/vendors/company/tabstatus`, tab_data)
            .then(function (response) {
              commit('companyData/setCurrentCompanyData', response.data.data, {
                root: true
              })
              commit('setReferenceData', refResponse.data.data)
              loader.hide()
              resolve(response.data.data)
            })
            .catch(() => {
              loader.hide()
              commit('updateReferenceModalData', [
                true,
                'Something went wrong while updating Reference tab status'
              ])
              reject()
            })

          commit('updateReferenceModalData', [true, refResponse.data.message])
        })
        .catch(function (error) {
          console.log('saveReferenceData : ' + error)
          if (error.response) {
            commit('updateReferenceModalData', [
              true,
              error.response.data.message
            ])
          } else {
            commit('updateReferenceModalData', [true, 'Something went wrong'])
          }
          loader.hide()
          reject()
        })
    })
  },

  updateReferenceData({ commit }, data) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .patch(`/vendors/company/pqq/updatereference`, data)
        .then(function (refResponse) {
          let tab_data = {
            company_id: data.company_id,
            company_tab: appConstants.companyTabs.REFERENCES,
            tab_completed_status: true
          }

          axios
            .post(`/vendors/company/tabstatus`, tab_data)
            .then(function (response) {
              commit('companyData/setCurrentCompanyData', response.data.data, {
                root: true
              })
              commit('setReferenceData', refResponse.data.data)
              loader.hide()
              resolve(response.data.data)
            })
            .catch(() => {
              loader.hide()
              commit('updateReferenceModalData', [
                true,
                'Something went wrong while updating Reference tab status'
              ])
              reject()
            })

          commit('updateReferenceModalData', [true, refResponse.data.message])
        })
        .catch(function (error) {
          console.log('updateReferenceData : ' + error)
          if (error.response) {
            commit('updateReferenceModalData', [
              true,
              error.response.data.message
            ])
          } else {
            commit('updateReferenceModalData', [true, 'Something went wrong'])
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
