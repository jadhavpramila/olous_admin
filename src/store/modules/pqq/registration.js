import axios from 'axios'
import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

Vue.use(Loading)

const defaultState = () => {
  return {
    slug: true,
    registrationData: '',
    showRegistrationModal: '',
    modalRegistrationMessage: ''
  }
}

const state = defaultState()
const getters = {
  getSlug: (state) => state.slug,
  getRegistrationData: (state) => state.registrationData,
  showRegistrationModal: (state) => state.showRegistrationModal,
  modalRegistrationMessage: (state) => state.modalRegistrationMessage
}
const mutations = {
  reset(state) {
    Object.assign(state, defaultState())
  },
  setSlug: (state, slugValue) => {
    state.slug = slugValue
  },
  setRegistrationData: (state, registrationValue) => {
    state.registrationData = registrationValue
  },
  updateRegistrationModalValues: (state, [value, message]) => {
    state.showRegistrationModal = value
    if (value == false) {
      state.modalRegistrationMessage = ''
    } else {
      state.modalRegistrationMessage = message
      setTimeout(() => {
        state.showRegistrationModal = false
        state.modalRegistrationMessage = ''
      }, 2500)
    }
  },
  // commitCompanyAddress: (state, res) => {
  //   state.registrationData = res
  // },
  // updateCompnayAddress: (state, res) => {
  //   state.registrationData = res
  // },
  commitDeleteCompnayAddress: (state, res) => {
    let result = state.registrationData.contacts.findIndex(
      (x) => x.id === res.id
    )
    state.registrationData.contacts.splice(result, 1)
    // state.showRegistrationModal = true
    // state.modalRegistrationMessage = 'Primary address cannot be deleted'
  },
  updateUserContacts: (state, res) => {
    state.registrationData.contacts.map((x) => {
      if (x.id == res.id) {
        x = res.data
      }
    })
  }
}

const actions = {
  searchSlug({ commit }, payload) {
    console.log(payload)
    return axios
      .get(`/vendors/checkslug/?slug=${payload}`)
      .then(function (response) {
        const result = response.data.data.is_slug_available
        console.log(result)
        commit('setSlug', result)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  fetchRegistrationData({ commit }, companyId) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .get(`/vendors/company/infowithcontact/${companyId}`)
        .then(function (response) {
          commit('setRegistrationData', response.data.data)
          loader.hide()
          resolve(response.data.data)
        })
        .catch(function (error) {
          console.log('fetchRegistrationData : ' + error)
          if (error.response) {
            commit('updateRegistrationModalValues', [
              true,
              error.response.data.message
            ])
          } else {
            commit('updateRegistrationModalValues', [
              true,
              'Something went wrong'
            ])
          }
          loader.hide()
          reject()
        })
    })
  },

  updateRegistrationData({ commit }, payload) {
    console.log('data in store =>', payload)
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .patch(`/vendors/company/update/${payload.id}`, payload.companyData)
        .then(function (response) {
          commit('setRegistrationData', response.data.data)
          commit('updateRegistrationModalValues', [
            true,
            'Details saved successfully'
          ])
          loader.hide()
          commit('companyData/setCurrentCompanyData', response.data.data, {
            root: true
          })
          commit('removeCompanyFromList', response.data.data, {
            root: true
          })
          commit('companyDetails', response.data.data, {
            root: true
          })
          resolve()
        })
        .catch(function (error) {
          console.log(error)
          loader.hide()
          reject()
        })
    })
  },
  // company address api call
  saveCompnayAddress({ commit }, data) {
    // https://api.dev.olous.app/api/v1/vendors/contact/company/
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .post(`/vendors/contact/company/`, data)
        .then(function (response) {
          console.log(response.data)
          commit('setRegistrationData', response.data.data[0])
          commit('companyData/setCurrentCompanyData', response.data.data[0], {
            root: true
          })
          loader.hide()
          resolve(response.data)
        })
        .catch(function (error) {
          console.log('saveCompnayAddress : ' + error)
          loader.hide()
          reject()
        })
    })
  },
  updateCompnayAddress({ commit }, data) {
    // https://api.dev.olous.app/api/v1/vendors/contact/company/update/compnay id
    // let obj = data.data.contacts[0]
    // if (obj.is_primary == false) {
    //   delete obj.is_primary
    //   data.data.contacts[0] = obj
    // }
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .patch(`/vendors/contact/company/update/${data.company_id}`, data.data)
        .then(function (response) {
          console.log(response.data)
          commit('setRegistrationData', response.data.data[0])
          commit('companyData/setCurrentCompanyData', response.data.data[0], {
            root: true
          })
          loader.hide()
          resolve(response.data)
        })
        .catch(function (error) {
          console.log('updateCompnayAddress : ' + error)
          loader.hide()
          reject()
        })
    })
  },
  deleteCompnayAddress({ commit }, data) {
    console.log('objcet in store delete address =>', data)
    // https://api.dev.olous.app/api/v1/vendors/contact/company/delete/
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .delete(`/vendors/contact/company/delete/`, { data: data })
        .then(function (response) {
          console.log(response.data)
          let obj = {
            id: data.contact_ids[0],
            data: response.data
          }
          commit('commitDeleteCompnayAddress', obj)
          loader.hide()
          resolve(response.data)
        })
        .catch(function (error) {
          console.log('deleteCompnayAddress : ' + error)
          commit('updateRegistrationModalValues', [
            true,
            'Primary address cannot be deleted'
          ])
          loader.hide()
          reject()
        })
    })
  },
  // user contact api call
  saveContact({ commit }, data) {
    console.log('object in store =>', data)
    // https://api.dev.olous.app/api/v1/vendors/contact/user/
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .post(`/vendors/contact/user/`, data)
        .then(function (response) {
          console.log(response.data)
          commit('setRegistrationData', response.data.data[0])
          loader.hide()
          resolve(response.data)
        })
        .catch(function (error) {
          console.log('deleteCompnayAddress : ' + error)
          loader.hide()
          reject()
        })
    })
  },
  updateContact({ commit }, data) {
    console.log('object in store =>', data)
    // https://api.dev.olous.app/api/v1/vendors/contact/user/update/id_of_contact
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .patch(`/vendors/contact/user/update/${data.company_id}`, data.data)
        .then(function (response) {
          console.log(response.data)
          commit('setRegistrationData', response.data.data[0])
          loader.hide()
          resolve(response.data)
        })
        .catch(function (error) {
          console.log('deleteCompnayAddress : ' + error)
          loader.hide()
          reject()
        })
    })
  },
  deleteContactUserContact({ commit }, data) {
    console.log('objcet in store delete contact =>', data)
    // https://api.dev.olous.app/api/v1/vendors/contact/user/delete/
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .delete(`/vendors/contact/user/delete/`, { data: data })
        .then(function (response) {
          let obj = {
            id: data.contact_ids[0],
            data: response.data
          }
          commit('commitDeleteCompnayAddress', obj)
          loader.hide()
          resolve(response.data)
        })
        .catch(function (error) {
          console.log('deleteCompnayAddress : ' + error)
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
