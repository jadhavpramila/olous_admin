/* eslint-disable no-unused-vars */
import axios from 'axios'
import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

Vue.use(Loading)

const defaultState = () => {
  return {
    // catalogueData: '',
    showCatalogueModal: '',
    modalCatalogueMessage: ''
  }
}

const state = defaultState()

const getters = {
  // getCatalogueData: (state) => state.descriptionData,
  showCatalogueModal: (state) => state.showCatalogueModal,
  modalCatalogueMessage: (state) => state.modalCatalogueMessage
}
const mutations = {
  // setCatalogueData: (state, descriptionValue) => {
  //   state.descriptionData = descriptionValue
  // },
  reset(state) {
    Object.assign(state, defaultState())
  },
  updateCatalogueModalValues: (state, [value, message]) => {
    state.showCatalogueModal = value
    if (value == false) {
      state.modalCatalogueMessage = ''
    } else {
      state.modalCatalogueMessage = message
      setTimeout(() => {
        state.showCatalogueModal = false
        state.modalCatalogueMessage = ''
      }, 2500)
    }
  }
}

const actions = {
  getAllCatalogueData({ commit }, id) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .get(`/vendors/company/catalogs/${id}`)
        .then((response) => {
          // commit('setCatalogueData', response.data.data)
          loader.hide()
          resolve(response)
        })
        .catch((error) => {
          console.log('getAllCatalogueData : ' + error)
          if (error.response) {
            commit('updateCatalogueModalValues', [
              true,
              error.response.data.message
            ])
          } else {
            commit('updateCatalogueModalValues', [true, 'Something went wrong'])
          }
          loader.hide()
          reject()
        })
    })
  },

  deleteCatalogue({ commit }, data) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .delete(`/vendors/catalog/delete/`, { data: data })
        .then(function (response) {
          loader.hide()
          resolve()
        })
        .catch(function (error) {
          console.log('deleteCatalogue : ' + error)
          if (error.response) {
            commit('updateCatalogueModalValues', [
              true,
              error.response.data.message
            ])
          } else {
            commit('updateCatalogueModalValues', [true, 'Something went wrong'])
          }
          loader.hide()
          reject()
        })
    })
  },

  addNewCatalogue({ commit }, data) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .post(`/vendors/catalog/`, data)
        .then(function (response) {
          loader.hide()
          resolve(response)
        })
        .catch(function (error) {
          console.log('addNewCatalogue : ' + error)
          if (error.response) {
            commit('updateCatalogueModalValues', [
              true,
              error.response.data.message
            ])
          } else {
            commit('updateCatalogueModalValues', [true, 'Something went wrong'])
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
