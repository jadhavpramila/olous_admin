import axios from 'axios'
import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import appConstants from '../../../appConstants'

Vue.use(Loading)

const defaultState = () => {
  return {
    resourcesData: '',
    showResourcesModal: '',
    modalResourcesMessage: ''
  }
}

const state = defaultState()

const getters = {
  getResourcesData: (state) => state.resourcesData,
  showResourcesModal: (state) => state.showResourcesModal,
  modalResourcesMessage: (state) => state.modalResourcesMessage
}
const mutations = {
  setResourcesData: (state, experienceValue) => {
    state.resourcesData = experienceValue
  },
  updateResourcesModalData: (state, [value, message]) => {
    state.showResourcesModal = value
    if (value == false) {
      state.modalResourcesMessage = ''
    } else {
      state.modalResourcesMessage = message
      setTimeout(() => {
        state.showResourcesModal = false
        state.modalResourcesMessage = ''
      }, 2500)
    }
  },
  resourcesResetState(state) {
    Object.assign(state, defaultState())
  },
  reset(state) {
    Object.assign(state, defaultState())
  }
}

const actions = {
  fetchResourcesData({ commit }, companyId) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .get(`/vendors/company/infowithpqq/${companyId}`)
        .then(function (response) {
          commit('setResourcesData', response.data.data)
          loader.hide()
          resolve(response.data.data)
        })
        .catch(function (error) {
          console.log('fetchResourcesData : ' + error)
          if (error.response) {
            commit('updateResourcesModalData', [
              true,
              error.response.data.message
            ])
          } else {
            commit('updateResourcesModalData', [true, 'Something went wrong'])
          }
          loader.hide()
          reject()
        })
    })
  },

  SaveResourcesData({ commit }, data) {
    let loader = Vue.$loading.show({})
    var add_equipments = data.add_equipments
    delete data.add_equipments

    var del_equipments = data.del_equipments
    delete data.del_equipments

    return new Promise((resolve, reject) => {
      return axios
        .all([
          axios.post(`/vendors/company/pqq/resources`, data),
          axios.post(`/vendors/company/pqq/equipment`, add_equipments),
          axios.delete(`/vendors/company/pqq/deleteequipment`, {
            data: del_equipments
          })
        ])
        .then((responseArr) => {
          let tab_data = {
            company_id: data.company_id,
            company_tab: appConstants.companyTabs.RESOURCES,
            tab_completed_status: true
          }

          axios
            .post(`/vendors/company/tabstatus`, tab_data)
            .then(function (response) {
              commit('companyData/setCurrentCompanyData', response.data.data, {
                root: true
              })
              commit('setResourcesData', response.data.data)
              loader.hide()
              resolve(response.data.data)
            })
            .catch(() => {
              loader.hide()
              commit('updateResourcesModalData', [
                true,
                'Something went wrong while updating Resources tab status'
              ])
              reject()
            })

          commit('updateResourcesModalData', [
            true,
            responseArr[0].data.message
          ])
        })
        .catch(function (error) {
          console.log('SaveResourcesData : ' + error)
          if (error.response) {
            commit('updateResourcesModalData', [
              true,
              error.response.data.message
            ])
          } else {
            commit('updateResourcesModalData', [true, 'Something went wrong'])
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
