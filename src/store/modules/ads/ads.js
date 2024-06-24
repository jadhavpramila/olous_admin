import axios from 'axios'
import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

Vue.use(Loading)

const defaultState = () => {
  return {
    adsDetails: [],
    allAdsList: [],
    adToEdit: [],
    alerts: {
      showAdsModal: false,
      showAdsModalMessage: ''
    }
  }
}

const state = defaultState()

const getters = {
  getAdsDetails: (state) => state.adsDetails,
  getAllAdsList: (state) => state.allAdsList,
  getadToEdit: (state) => state.adToEdit,
  showAdsModal: (state) => state.alerts.showAdsModal,
  showAdsModalMessage: (state) => state.alerts.showAdsModalMessage
}

const mutations = {
  reset(state) {
    Object.assign(state, defaultState())
  },
  setAdsDetails: (state, AdsDetailsData) => {
    state.adsDetails = AdsDetailsData
  },
  setAllAdsList: (state, allAdsListData) => {
    state.allAdsList = allAdsListData
  },
  addAdToAdsList: (state, ad) => {
    state.allAdsList.push(ad)
  },
  removeAdFromList: (state, removeAdId) => {
    state.allAdsList = state.allAdsList.filter(
      (item) => item.id !== removeAdId.id
    )
  },
  setEditAd: (state, editAd) => {
    state.adToEdit = editAd
  },

  updateAdsModalValues: (state, [value, message]) => {
    state.alerts.showAdsModal = value
    if (value == false) {
      state.alerts.showAdsModalMessage = ''
    } else {
      state.alerts.showAdsModalMessage = message
      setTimeout(() => {
        state.alerts.showAdsModal = false
        state.alerts.showAdsModalMessage = ''
      }, 2500)
    }
  }
}

const actions = {
  saveAdDetails({ commit }, data) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .post(`/ad_service/ad/create`, data)
        .then(function (response) {
          console.log(response)
          commit('setAdsDetails', response.data.data)
          commit('updateAdsModalValues', [true, 'Ad posted successfully'])
          loader.hide()

          resolve()
        })
        .catch(function (error) {
          console.log(error)
          loader.hide()
          reject()
        })
    })
  },

  getAdData({ commit }, id) {
    let loader = Vue.$loading.show({})
    return axios
      .get(`ad_service/ad/${id}/`)
      .then((response) => {
        commit('setAdsDetails', response.data.data)
        loader.hide()
        return true
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
        return false
      })
  },

  updateAdDetails({ commit }, data) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      let id = data.uid
      delete data.uid
      return axios
        .patch(`/ad_service/ad/update/${id}`, data)
        .then((secondResponse) => {
          commit('setAdsDetails', secondResponse.data.data)
          commit('updateAdsModalValues', [true, 'Ad updated successfully'])
          loader.hide()
          resolve()
        })
        .catch(function (error) {
          console.log(error)
          loader.hide()
          reject()
        })
    })
  },

  fetchAllAds({ commit }, data) {
    let loader = Vue.$loading.show({})
    let pageNumber = data.pageNumber
    let adsPerPage = data.adsPerPage
    return new Promise((resolve, reject) => {
      return axios
        .get(`/ad_service/ad/fetchall?page=${pageNumber}&limit=${adsPerPage}`)
        .then((response) => {
          if (pageNumber == 1) {
            commit('setAllAdsList', response.data.data.data)
          } else {
            for (
              let index = 0;
              index < response.data.data.data.length;
              index++
            ) {
              commit('addAdToAdsList', response.data.data.data[index])
            }
          }
          loader.hide()
          resolve(response.data.data.next)
        })
        .catch(function (error) {
          console.log(error)
          loader.hide()
          reject()
        })

      // commit('setAllAdsList', obj1)
      // resolve(null)
      // loader.hide()
    })
  },

  fetchAdBySearchText({ commit }, searchText) {
    let loader = Vue.$loading.show({})
    return axios
      .get(`ad_service/ad/search?q=${searchText}`)
      .then((response) => {
        commit('setAllAdsList', response.data.data)
        loader.hide()
        return response.data.data.next
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
      })
  },
  // publishAd({ commit }, data) {
  //   let loader = Vue.$loading.show({})
  //   let id = data.id
  //   return axios
  //     .post(`/vendors/jobs/${id}/mark_published/`)

  //     .then((response) => {
  //       console.log(response.data)
  //       commit('setAdsDetails', response.data.data)
  //       loader.hide()
  //       return true
  //     })
  //     .catch(function (error) {
  //       console.log(error)
  //       loader.hide()
  //       return false
  //     })
  // },

  deleteAd({ commit }, data) {
    let loader = Vue.$loading.show({})
    let id = data.id
    return axios
      .delete(`ad_service/ad/delete/${id}`, data)
      .then(() => {
        commit('removeAdFromList', data)
        loader.hide()
        return true
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
        return false
      })
  },

  editAd({ commit }, EditAdData) {
    {
      commit('setAdsDetails', EditAdData)
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
