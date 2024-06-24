import axios from 'axios'
import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

Vue.use(Loading)

const defaultState = () => {
  return {
    descriptionData: '',
    showDescriptionModal: '',
    modalDescriptionMessage: ''
  }
}

const state = defaultState()

const getters = {
  getDescriptionData: (state) => state.descriptionData,
  showDescriptionModal: (state) => state.showDescriptionModal,
  modalDescriptionMessage: (state) => state.modalDescriptionMessage
}
const mutations = {
  reset(state) {
    Object.assign(state, defaultState())
  },
  setDescriptionData: (state, descriptionValue) => {
    state.descriptionData = descriptionValue
  },
  updateDescriptionModalValues: (state, [value, message]) => {
    state.showDescriptionModal = value
    if (value == false) {
      state.modalDescriptionMessage = ''
    } else {
      state.modalDescriptionMessage = message
      setTimeout(() => {
        state.showDescriptionModal = false
        state.modalDescriptionMessage = ''
      }, 2500)
    }
  }
}

const actions = {
  fetchDescriptionData({ commit }, companyId) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .get(`/vendors/company/infowithcontact/${companyId}`)
        .then(function (response) {
          commit('setDescriptionData', response.data.data)
          loader.hide()
          resolve(response.data.data)
        })
        .catch(function (error) {
          console.log('fetchDescriptionData : ' + error)
          if (error.response) {
            commit('updateDescriptionModalValues', [
              true,
              error.response.data.message
            ])
          } else {
            commit('updateDescriptionModalValues', [
              true,
              'Something went wrong'
            ])
          }
          loader.hide()
          reject()
        })
    })
  },

  updateDescriptionData({ commit }, data) {
    let loader = Vue.$loading.show({})
    let id = data.id
    delete data.id
    return axios
      .patch(`/vendors/company/update/${id}`, data)
      .then(function (response) {
        commit('updateDescriptionModalValues', [
          true,
          'Details saved successfully'
        ])

        commit('companyData/setCurrentCompanyData', response.data.data, {
          root: true
        })
        commit('removeCompanyFromList', response.data.data, {
          root: true
        })
        commit('companyDetails', response.data.data, {
          root: true
        })

        loader.hide()
      })
      .catch(function (error) {
        console.log('updateDescriptionData : ' + error)
        if (error.response) {
          commit('updateDescriptionModalValues', [
            true,
            error.response.data.message
          ])
        } else {
          commit('updateDescriptionModalValues', [true, 'Something went wrong'])
        }
        loader.hide()
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
