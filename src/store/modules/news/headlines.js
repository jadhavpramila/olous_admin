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
  createHeadline({ commit }, data) {
    let loader = Vue.$loading.show({})
    return axios
      .post(`/article/create/`, data)
      .then((response) => {
        commit('setNewsDetails', response.data.data)
        commit('updateShowNewsModal', [true, 'Headline added successfully'])
        setTimeout(() => {
          router.push({
            name: appConstants.routes.HEADLINES
          })
        }, 2500)
        loader.hide()
      })
      .catch(function (error) {
        console.log(`createHeadline : ${error}`)
        commit('updateShowNewsModal', [true, error.response.data.message])

        loader.hide()
      })
  },

  fetchAllHeadlines({ commit }, data) {
    let pageNumber = data.pageNumber
    let newsPerPage = data.newsPerPage
    let offset = data.offset

    let loader = Vue.$loading.show({})
    var newsList = []
    return new Promise((resolve, reject) => {
      axios
        .get(
          `/article/list/?page=${pageNumber}&limit=${newsPerPage}&offset=${offset}`
        )
        .then((response) => {
          newsList = response.data.data.articles
          if (pageNumber == 1) {
            commit('setAllNewsList', newsList)
          } else {
            for (let index = 0; index < newsList.length; index++) {
              commit('addRecordInNewsList', newsList[index])
            }
          }
          loader.hide()
          resolve(response.data.data.next)
        })
        .catch(function (error) {
          console.log(`fetchAllHeadlines : ${error}`)
          commit('updateShowNewsModal', [true, error.response.data.message])
          reject(error.response.data.message)
          loader.hide()
        })
    })
  },
  fetchHeadlinesByFilter({ commit }, data) {
    let pageNumber = data.pageNumber
    let newsPerPage = data.newsPerPage
    let offset = data.offset
    let filterby = data.filterby

    let loader = Vue.$loading.show({})
    var newsList = []
    return new Promise((resolve, reject) => {
      axios
        .get(
          `/article/list/?page=${pageNumber}&limit=${newsPerPage}&offset=${offset}`,
          {
            params: {
              interest: filterby
            }
          }
        )
        .then((response) => {
          newsList = response.data.data.articles
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
          console.log(`fetchHeadlinesByFilter : ${error}`)
          commit('updateAssignTagModal', [true, error.response.data.message])
          loader.hide()
          reject(error.response.data.message)
        })
    })
  },

  updateHeadline({ commit }, data) {
    let loader = Vue.$loading.show({})
    let id = data.id
    delete data.id

    return axios
      .patch(`/article/${id}/`, data)
      .then(() => {
        commit('updateShowNewsModal', [true, 'Updated successfully'])
        loader.hide()
      })
      .catch(function (error) {
        console.log(`updateHeadline : ${error}`)
        commit('updateShowNewsModal', [true, error.response.data.message])
        loader.hide()
      })
  },
  deleteHeadline({ commit }, id) {
    let loader = Vue.$loading.show({})
    return axios
      .delete(`/article/${id}/`)
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
