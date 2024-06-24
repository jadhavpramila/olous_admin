import axios from 'axios'
import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import appConstants from '../../../appConstants'

Vue.use(Loading)

const defaultState = () => {
  return {
    companyStructureData: '',
    showCompanyStructureModal: '',
    modalCompanyStructureMessage: ''
  }
}

const state = defaultState()

const getters = {
  getCompanyStructureData: (state) => state.companyStructureData,
  showCompanyStructureModal: (state) => state.showCompanyStructureModal,
  modalCompanyStructureMessage: (state) => state.modalCompanyStructureMessage
}
const mutations = {
  setCompanyStructureData: (state, companyStructureValue) => {
    state.companyStructureData = companyStructureValue
  },
  updateCompanyStructureValues: (state, [value, message]) => {
    state.showCompanyStructureModal = value
    if (value == false) {
      state.modalCompanyStructureMessage = ''
    } else {
      state.modalCompanyStructureMessage = message
      setTimeout(() => {
        state.showCompanyStructureModal = false
        state.modalCompanyStructureMessage = ''
      }, 2500)
    }
  },
  companyStructureResetState(state) {
    Object.assign(state, defaultState())
  },
  reset(state) {
    Object.assign(state, defaultState())
  }
}

const actions = {
  fetchCompanyStructureData({ commit }, companyId) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .get(`/vendors/company/infowithpqq/${companyId}`)
        .then(function (response) {
          commit('setCompanyStructureData', response.data.data)
          loader.hide()
          resolve(response.data.data)
        })
        .catch(function (error) {
          console.log('fetchCompanyStructureData : ' + error)
          if (error.response) {
            commit('updateCompanyStructureValues', [
              true,
              error.response.data.message
            ])
          } else {
            commit('updateCompanyStructureValues', [
              true,
              'Something went wrong'
            ])
          }
          loader.hide()
          reject()
        })
    })
  },

  SaveCompanyStructureData({ commit }, data) {
    let loader = Vue.$loading.show({})

    let id = data.company_id
    let gst_card_no = data.gst_card_no

    return new Promise((resolve, reject) => {
      return axios
        .all([
          axios.post(`/vendors/company/pqq/companystructure`, data),
          axios.patch(`/vendors/company/update/${id}`, {
            gst_number: gst_card_no
          })
        ])
        .then(function (responseArr) {
          commit('setCompanyStructureData', responseArr[0].data.data)
          let tab_data = {
            company_id: id,
            company_tab: appConstants.companyTabs.COMPANY_STRUCTURE,
            tab_completed_status: true
          }
          axios
            .post(`/vendors/company/tabstatus`, tab_data)
            .then(function (companyResponse) {
              commit(
                'companyData/setCurrentCompanyData',
                companyResponse.data.data,
                {
                  root: true
                }
              )
              commit('updateCompanyStructureValues', [
                true,
                responseArr[0].data.message
              ])
              loader.hide()
              resolve()
            })
            .catch(function (error) {
              console.log('SaveCompanyStructureData : ' + error)
              commit('updateCompanyStructureValues', [
                true,
                'Error while updating Company Structure tab status'
              ])
              loader.hide()
              resolve()
            })
        })
        .catch(function (error) {
          console.log('SaveCompanyStructureData : ' + error)
          if (error.response) {
            commit('updateCompanyStructureValues', [
              true,
              error.response.data.message
            ])
          } else {
            commit('updateCompanyStructureValues', [
              true,
              'Something went wrong'
            ])
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
