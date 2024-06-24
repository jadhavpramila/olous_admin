import axios from 'axios'
import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import appConstants from '../../../appConstants'
import router from '../../../router/index'

Vue.use(Loading)

const defaultState = () => {
  return {
    newsDetails: '',
    allNewsList: [],
    newsToEdit: '',
    imageScrapingResult: '',
    alerts: {
      showNewsModal: false,
      newsMessage: ''
    }
  }
}

const state = defaultState()

const getters = {
  getNewsDetails: (state) => state.newsDetails,
  getAllNewsList: (state) => state.allNewsList,
  getNewsToEdit: (state) => state.newsToEdit,
  getImageScrapingResult: (state) => state.imageScrapingResult,
  showNewsModal: (state) => state.alerts.showNewsModal,
  newsMessage: (state) => state.alerts.newsMessage
}
const mutations = {
  reset(state) {
    Object.assign(state, defaultState())
  },
  setNewsDetails: (state, newsData) => {
    state.newsDetails = newsData
  },
  setAllNewsList: (state, postData) => {
    state.allNewsList = postData
  },
  setEditNews: (state, editJob) => {
    state.newsToEdit = editJob
  },
  setImageScrapingResult: (state, result) => {
    state.imageScrapingResult = result
  },
  addRecordInNewsList: (state, newRecord) => {
    state.allNewsList.push(newRecord)
  },
  removeNewsFromList: (state, removeNewsId) => {
    state.allNewsList = state.allNewsList.filter(
      (item) => item.id !== removeNewsId
    )
  },
  updateShowNewsModal(state, [value, message]) {
    state.alerts.showNewsModal = value
    if (value == false) {
      state.alerts.newsMessage = ''
    } else {
      state.alerts.newsMessage = message
      setTimeout(() => {
        state.alerts.showNewsModal = false
        state.alerts.newsMessage = ''
      }, 2500)
    }
  },

  clearAllPreviousNewsData(state) {
    state.alerts.showNewsModal = false
    state.alerts.newsMessage = ''
    state.newsDetails = ''
    state.newsToEdit = ''
    state.imageScrapingResult = ''
  }
}

const actions = {
  createNews({ commit }, data) {
    let loader = Vue.$loading.show({})
    return axios
      .post(`/headline/`, data)
      .then((response) => {
        commit('setNewsDetails', response.data.data)
        commit('updateShowNewsModal', [true, 'News added successfully'])
        setTimeout(() => {
          router.push({
            name: appConstants.routes.NEWS
          })
        }, 2500)
        loader.hide()
      })
      .catch(function (error) {
        console.log(`createNews : ${error}`)
        commit('updateShowNewsModal', [true, error.response.data.message])

        loader.hide()
      })
  },

  fetchAllNewsList({ commit }, data) {
    let pageNumber = data.pageNumber
    let newsPerPage = data.newsPerPage
    let offset = data.offset

    let loader = Vue.$loading.show({})
    var newsList = []
    return new Promise((resolve, reject) => {
      axios
        .get(
          `/headline/list/?page=${pageNumber}&limit=${newsPerPage}&offset=${offset}`
        )
        .then((response) => {
          newsList = response.data.results.data
          // console.log(' response.results', response.data.results.data)
          if (pageNumber == 1) {
            commit('setAllNewsList', newsList)
          } else {
            for (let index = 0; index < newsList.length; index++) {
              commit('addRecordInNewsList', newsList[index])
            }
          }
          loader.hide()
          resolve(response.data.next)
        })
        .catch(function (error) {
          console.log(`fetchAllNewsList : ${error}`)
          commit('updateShowNewsModal', [true, error.response.data.message])
          reject(error.response.data.message)
          loader.hide()
        })
    })
  },
  fetchNewsByFilter({ commit }, data) {
    let pageNumber = data.pageNumber
    let newsPerPage = data.newsPerPage
    let offset = data.offset
    let filterby = data.filterby

    let loader = Vue.$loading.show({})
    var newsList = []
    return new Promise((resolve, reject) => {
      axios
        .get(
          `/headline/list/?limit=${newsPerPage}&offset=${offset}&page=${pageNumber}`,
          {
            params: {
              q: filterby
            }
          }
        )
        .then((response) => {
          newsList = response.data.results.data
          if (pageNumber == 1) {
            commit('setAllNewsList', newsList)
          } else {
            for (let index = 0; index < newsList.length; index++) {
              commit('addRecordInNewsList', newsList[index])
            }
          }
          loader.hide()
          resolve(response.data.next)
        })
        .catch(function (error) {
          console.log(`fetchNewsByFilter : ${error}`)
          commit('updateAssignTagModal', [true, error.response.data.message])
          loader.hide()
          reject(error.response.data.message)
        })
    })
  },
  fetchImagesFromURL({ commit }, data) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .post(`/scrape_site/`, data)
        .then((response) => {
          commit('setImageScrapingResult', response.data.data)
          loader.hide()
          resolve()
        })
        .catch(function (error) {
          commit('setImageScrapingResult', '')
          reject()
          console.log(`fetchImagesFromURL : ${error}`)
          loader.hide()
          commit('fetchImagesFromURL', [true, error.response.data.message])
        })
    })
  },
  updateNewsInterest({ commit }, data) {
    let loader = Vue.$loading.show({})
    let id = data.id
    return axios
      .patch(`/headline/${id}/update_interests/`, data)
      .then(() => {
        commit('updateShowNewsModal', [true, 'Updated successfully'])
        loader.hide()
      })
      .catch(function (error) {
        console.log(`savePostTags : ${error}`)
        commit('updateShowNewsModal', [true, error.response.data.message])
        loader.hide()
      })
  },
  deleteNews({ commit }, id) {
    let loader = Vue.$loading.show({})
    return axios
      .delete(`/headline/${id}/`)
      .then(() => {
        commit('removeNewsFromList', id)
        loader.hide()
        return true
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
        return false
      })
  },
  updateRegion({ commit }, data) {
    let loader = Vue.$loading.show({})
    let id = data.id
    delete data.id
    return axios
      .patch(`/headline/${id}/international/`, data)
      .then(() => {
        commit('updateShowNewsModal', [true, 'Updated successfully'])
        loader.hide()
      })
      .catch(function (error) {
        console.log(`updateRegion : ${error}`)
        commit('updateShowNewsModal', [true, error.response.data.message])
        loader.hide()
      })
  },
  editNews({ commit }, EditNews) {
    commit('setEditNews', EditNews)
  },

  clearNewsList({ commit }) {
    commit('setAllNewsList', [])
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
