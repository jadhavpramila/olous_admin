import axios from 'axios'
import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

Vue.use(Loading)

const defaultState = () => {
  return {
    mediaData: '',
    clientData: '',
    showTestimonialModal: '',
    modalTestimonialMessage: '',
    TestimonialData: ''
  }
}

const state = defaultState()

const getters = {
  getMediaData: (state) => state.mediaData,
  getClientData: (state) => state.clientData,
  getTestiomonialData: (state) => state.TestimonialData,
  showTestimonialModal: (state) => state.showTestimonialModal,
  modalTestimonialMessage: (state) => state.modalTestimonialMessage
}
const mutations = {
  reset(state) {
    Object.assign(state, defaultState())
  },
  updateTestimonialModalValues: (state, [value, message]) => {
    state.showTestimonialModal = value
    if (value == false) {
      state.modalTestimonialMessage = ''
    } else {
      state.modalTestimonialMessage = message
      setTimeout(() => {
        state.showTestimonialModal = false
        state.modalTestimonialMessage = ''
      }, 2500)
    }
  },
  // media data mutation
  setMediaData: (state, data) => {
    state.mediaData = data.value
    state.showTestimonialModal = data.show
    state.modalTestimonialMessage = data.message
  },
  updateMediaStore: (state, data) => {
    // // console.log(data)
    state.mediaData = data.value
    state.showTestimonialModal = data.show
    state.modalTestimonialMessage = data.message

    state.mediaData = data
  },
  // client mutations
  setClientData: (state, value) => {
    state.clientData = value
  },
  saveClientData: (state, data) => {
    state.clientData.push(data.value)
    state.showTestimonialModal = data.show
    state.modalTestimonialMessage = data.message
  },
  updateClientStore: (state, data) => {
    state.clientData.map((a) => {
      if (a.id == data.id) {
        a = data.value
      }
    })
    state.showTestimonialModal = data.show
    state.modalTestimonialMessage = data.message
  },
  deletedRecordFromClient: (state, data) => {
    const index = state.clientData.map((object) => object.id).indexOf(data.id)
    if (index >= 0) {
      state.clientData.splice(index, 1)
      state.showTestimonialModal = data.show
      state.modalTestimonialMessage = data.message
    }
  },
  // testimonial media mutations
  setTestimonialData: (state, value) => {
    state.TestimonialData = value
  },
  commitTestimonialData: (state, data) => {
    state.TestimonialData.push(data.value)
    state.showTestimonialModal = data.show
    state.modalTestimonialMessage = data.message
  },
  deletedRecordFromTestimonial: (state, data) => {
    // state.TestimonialData.map((a) => {
    //   if (a.id == data.id) {
    //     a = data.value
    //     state.TestimonialData.splice(a, 1)
    //   }
    // })
    const index = state.TestimonialData.map((object) => object.id).indexOf(
      data.id
    )
    if (index >= 0) {
      state.TestimonialData.splice(index, 1)
      state.showTestimonialModal = data.show
      state.modalTestimonialMessage = data.message
    }
  }
}

const actions = {
  // media actions
  fetchMediaData({ commit }, companyId) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .get(`/vendors/company/socialmedia/${companyId}`)
        .then(function (response) {
          // console.log(response.data)
          let obj = {
            show: false,
            message: '',
            value: response.data.data
          }
          commit('setMediaData', obj)
          loader.hide()
          resolve(response.data.data)
        })
        .catch(function (error) {
          console.log(error)
          loader.hide()
          reject()
        })
    })
  },
  saveMediaData({ commit }, data) {
    // console.log('client logo data in store =>', data)
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .post(`/vendors/company/socialmedia`, data)
        .then(function (response) {
          // console.log(response.data)
          let obj = {
            show: true,
            message: 'Details saved successfully',
            value: response.data.data
          }
          commit('setMediaData', obj)
          loader.hide()
          resolve(response.data.data)
        })
        .catch(function (error) {
          console.log(error)
          loader.hide()
          reject()
        })
    })
  },
  updateMediaData({ commit }, data) {
    // console.log('data in store =>', data)
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .post(`/vendors/company/socialmedia/${data.company_id}`, data)
        .then(function (response) {
          // console.log(response.data)
          let obj = {
            show: true,
            message: 'Details Updated successfully',
            value: response.data.data
          }
          commit('updateMediaStore', obj)
          loader.hide()
          resolve(response.data.data)
        })
        .catch(function (error) {
          console.log(error)
          loader.hide()
          reject()
        })
    })
  },
  // client actions
  fetchClientData({ commit }, companyId) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .get(`/vendors/company/client/${companyId}`)
        .then(function (response) {
          // // console.log(response.data)
          commit('setClientData', response.data.data)
          loader.hide()
          resolve(response.data.data)
        })
        .catch(function (error) {
          console.log(error)
          loader.hide()
          reject()
        })
    })
  },
  saveClientData({ commit }, data) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .post(`/vendors/company/client`, data)
        .then(function (response) {
          // console.log(response.data)
          let obj = {
            show: true,
            message: 'Details saved successfully',
            value: response.data.data
          }
          commit('saveClientData', obj)
          loader.hide()
          resolve(response.data.data)
        })
        .catch(function (error) {
          console.log(error)
          loader.hide()
          reject()
        })
    })
  },
  updateClientData({ commit }, data) {
    // console.log('data in store =>', data)
    let loader = Vue.$loading.show({})
    // /vendors/company/socialmedia/{id}
    return new Promise((resolve, reject) => {
      return axios
        .post(`/vendors/company/client/${data.id}`, data)
        .then(function (response) {
          // console.log(response.data)
          let obj = {
            id: data.id,
            show: true,
            message: 'Details Updated successfully',
            value: response.data.data
          }
          commit('updateClientStore', obj)
          loader.hide()
          resolve(response.data.data)
        })
        .catch(function (error) {
          console.log(error)
          loader.hide()
          reject()
        })
    })
  },
  deleteClientRecord({ commit }, data) {
    // console.log('data in store =>', data)
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .delete(`/vendors/company/client/${data.id}`, data)
        .then(function (response) {
          // console.log(response.data)
          let obj = {
            id: data.id,
            show: true,
            message: 'Record deleted successfully'
          }
          commit('deletedRecordFromClient', obj)
          loader.hide()
          resolve(response.data.data)
        })
        .catch(function (error) {
          console.log(error)
          loader.hide()
          reject()
        })
    })
  },
  // testtimonial and media actions
  fetchTestimonialData({ commit }, companyId) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .get(`/vendors/company/testimonial/${companyId}`)
        .then(function (response) {
          // // console.log(response.data)
          commit('setTestimonialData', response.data.data)
          loader.hide()
          resolve(response.data.data)
        })
        .catch(function (error) {
          console.log(error)
          loader.hide()
          reject()
        })
    })
  },
  saveTestimonialData({ commit }, data) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .post(`/vendors/company/testimonial`, data)
        .then(function (response) {
          // console.log(response.data)
          let obj = {
            show: true,
            message: 'Details saved successfully',
            value: response.data.data
          }
          commit('commitTestimonialData', obj)
          loader.hide()
          resolve(response.data.data)
        })
        .catch(function (error) {
          console.log(error)
          loader.hide()
          reject()
        })
    })
  },
  deleteTestimonialRecord({ commit }, data) {
    // console.log('data in store =>', data)
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .delete(`/vendors/company/testimonial/${data.id}`, data)
        .then(function (response) {
          // console.log(response.data)
          let obj = {
            id: data.id,
            show: true,
            message: 'Record deleted successfully'
          }
          commit('deletedRecordFromTestimonial', obj)
          loader.hide()
          resolve(response.data.data)
        })
        .catch(function (error) {
          console.log(error)
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
