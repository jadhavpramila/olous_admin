import axios from 'axios'
import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import appConstants from '../../../appConstants'

Vue.use(Loading)

const defaultState = () => {
  return {
    complianceData: '',
    showComplianceModal: '',
    modalComplianceMessage: ''
  }
}

const state = defaultState()

const getters = {
  getComplianceData: (state) => state.complianceData,
  showComplianceModal: (state) => state.showComplianceModal,
  modalComplianceMessage: (state) => state.modalComplianceMessage
}
const mutations = {
  setComplianceData: (state, experienceValue) => {
    state.complianceData = experienceValue
  },
  updateComplianceModalData: (state, [value, message]) => {
    state.showComplianceModal = value
    if (value == false) {
      state.modalComplianceMessage = ''
    } else {
      state.modalComplianceMessage = message
      setTimeout(() => {
        state.showComplianceModal = false
        state.modalComplianceMessage = ''
      }, 2500)
    }
  },
  complianceResetState(state) {
    Object.assign(state, defaultState())
  },
  reset(state) {
    Object.assign(state, defaultState())
  }
}

const actions = {
  fetchComplianceData({ commit }, companyId) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .get(`/vendors/company/infowithpqq/${companyId}`)
        .then(function (response) {
          commit('setComplianceData', response.data.data)
          loader.hide()
          resolve(response.data.data)
        })
        .catch(function (error) {
          console.log('fetchComplianceData : ' + error)
          if (error.response) {
            commit('updateComplianceModalData', [
              true,
              error.response.data.message
            ])
          } else {
            commit('updateComplianceModalData', [true, 'Something went wrong'])
          }
          loader.hide()
          reject()
        })
    })
  },

  saveComplianceData({ commit }, data) {
    let loader = Vue.$loading.show({})

    var add_document = data.add_document
    delete data.add_document

    var del_document = data.del_document
    delete data.del_document

    var add_license = data.add_license
    delete data.add_license

    var del_license = data.del_license
    delete data.del_license

    var add_insurance = data.add_insurance
    delete data.add_insurance

    var del_insurance = data.del_insurance
    delete data.del_insurance

    return new Promise((resolve, reject) => {
      axios
        .all([
          axios.post(`/vendors/company/pqq/compliance`, data),
          axios.post(`/vendors/company/pqq/document`, add_document),
          axios.delete(`/vendors/company/pqq/deletedocument`, {
            data: del_document
          }),
          axios.post(`/vendors/company/pqq/license`, add_license),
          axios.delete(`/vendors/company/pqq/deletelicense`, {
            data: del_license
          }),
          axios.post(`/vendors/company/pqq/insurance`, add_insurance),
          axios.delete(`/vendors/company/pqq/deleteinsurance`, {
            data: del_insurance
          })
        ])
        .then(function (responseArr) {
          let tab_data = {
            company_id: data.company_id,
            company_tab: appConstants.companyTabs.COMPLIANCE,
            tab_completed_status: true
          }

          axios
            .post(`/vendors/company/tabstatus`, tab_data)
            .then(function (response) {
              commit('companyData/setCurrentCompanyData', response.data.data, {
                root: true
              })
              loader.hide()
              commit('setComplianceData', response.data.data)
              resolve(response.data.data)
            })
            .catch(() => {
              loader.hide()
              commit('updateResourcesModalData', [
                true,
                'Something went wrong while updating Compliance tab status'
              ])
              reject()
            })

          commit('updateComplianceModalData', [
            true,
            responseArr[0].data.message
          ])
        })
        .catch(function (error) {
          console.log('saveComplianceData : ' + error)
          if (error.response) {
            commit('updateComplianceModalData', [
              true,
              error.response.data.message
            ])
          } else {
            commit('updateComplianceModalData', [true, 'Something went wrong'])
          }
          loader.hide()
          reject()
        })
    })
  },

  saveDocument({ commit }, data) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .post(`/vendors/company/pqq/document`, data)
        .then(function (response) {
          loader.hide()
          resolve(response.data.data)
        })
        .catch(function (error) {
          console.log('saveDocument : ' + error)
          if (error.response) {
            commit('updateComplianceModalData', [
              true,
              error.response.data.message
            ])
          } else {
            commit('updateComplianceModalData', [true, 'Something went wrong'])
          }
          loader.hide()
          reject()
        })
    })
  },

  deleteDocument({ commit }, payload) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .delete(`/vendors/company/pqq/deletedocument`, { data: payload })
        .then(function () {
          loader.hide()
          resolve()
        })
        .catch(function (error) {
          console.log('deleteDocument : ' + error)
          if (error.response) {
            commit('updateComplianceModalData', [
              true,
              error.response.data.message
            ])
          } else {
            commit('updateComplianceModalData', [true, 'Something went wrong'])
          }
          loader.hide()
          reject()
        })
    })
  },

  saveLicense({ commit }, data) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .post(`/vendors/company/pqq/license`, data)
        .then(function (response) {
          loader.hide()
          resolve(response.data.data)
        })
        .catch(function (error) {
          console.log('saveLicense : ' + error)
          if (error.response) {
            commit('updateComplianceModalData', [
              true,
              error.response.data.message
            ])
          } else {
            commit('updateComplianceModalData', [true, 'Something went wrong'])
          }
          loader.hide()
          reject()
        })
    })
  },

  deleteLicense({ commit }, payload) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .delete(`/vendors/company/pqq/deletelicense`, { data: payload })
        .then(function () {
          loader.hide()
          resolve()
        })
        .catch(function (error) {
          console.log('deleteLicense : ' + error)
          if (error.response) {
            commit('updateComplianceModalData', [
              true,
              error.response.data.message
            ])
          } else {
            commit('updateComplianceModalData', [true, 'Something went wrong'])
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
