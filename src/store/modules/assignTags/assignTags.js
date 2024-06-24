import axios from 'axios'
import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import appConstants from '../../../appConstants'

Vue.use(Loading)

const defaultState = () => {
  return {
    allPostsList: [],
    interestOptions: [],
    alerts: {
      showAssignTagModal: false,
      assignTagMessage: ''
    }
  }
}

const state = defaultState()
const getters = {
  getAllPostsList: (state) => state.allPostsList,
  getInterestOptions: (state) => state.interestOptions,
  showAssignTagModal: (state) => state.alerts.showAssignTagModal,
  assignTagMessage: (state) => state.alerts.assignTagMessage
}
const mutations = {
  reset(state) {
    Object.assign(state, defaultState())
  },
  setAllPostsList: (state, postData) => {
    state.allPostsList = postData
  },
  addRecordInPostList: (state, newRecord) => {
    state.allPostsList.push(newRecord)
  },
  setInterestOptions: (state, interestOptionsData) => {
    state.interestOptions = interestOptionsData
  },

  updateAssignTagModal(state, [value, message]) {
    state.alerts.showAssignTagModal = value
    if (value == false) {
      state.alerts.assignTagMessage = ''
    } else {
      state.alerts.assignTagMessage = message
      setTimeout(() => {
        state.alerts.showAssignTagModal = false
        state.alerts.assignTagMessage = ''
      }, 2000)
    }
  },

  clearAllPreviousAssignTagData(state) {
    state.alerts.showAssignTagModal = false
    state.alerts.assignTagMessage = ''
  }
}

const actions = {
  fetchAllPostList({ commit }, data) {
    let pageNumber = data.pageNumber
    let postPerPage = data.postPerPage
    let untaggedRecords = data.untaggedRecords
    // let offset = data.offset
    let loader = Vue.$loading.show({})
    console.log(process.env.VUE_APP_ADMINBASEURL)
    var postList = []
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${process.env.VUE_APP_ADMINBASEURL}/posts/?page=${pageNumber}&limit=${postPerPage}&untaggedRecords=${untaggedRecords}`
        )
        .then((response) => {
          postList = response.data.data.posts
          // console.log(response)
          if (pageNumber == 1) {
            commit('setAllPostsList', postList)
          } else {
            for (let index = 0; index < postList.length; index++) {
              commit('addRecordInPostList', postList[index])
            }
          }
          loader.hide()
          resolve(response.data.data.next)
        })
        .catch(function (error) {
          console.log(`fetchAllPostList : ${error}`)
          commit('updateAssignTagModal', [true, error.response.data.message])
          loader.hide()
          reject(error)
        })
    })
  },
  savePostTags({ commit }, data) {
    let loader = Vue.$loading.show({})
    return axios
      .put(`${process.env.VUE_APP_ADMINBASEURL}/posts/assigntag/`, data)
      .then((response) => {
        if (response.data.status == appConstants.API_status.SUCCESS) {
          commit('updateAssignTagModal', [true, 'Tags assigned successfully'])
        } else {
          commit('updateAssignTagModal', [true, response.data.message])
        }
        loader.hide()
      })
      .catch(function (error) {
        console.log(`savePostTags : ${error}`)
        commit('updateAssignTagModal', [true, error.response.data.message])
        loader.hide()
      })
  },
  fetchInterestsData({ commit }) {
    let loader = Vue.$loading.show({})
    var instance = axios.create()
    delete instance.defaults.headers.common['Authorization']
    return instance
      .get(`/users/interests/`)
      .then((response) => {
        commit('setInterestOptions', response.data)
        loader.hide()
      })
      .catch(function (error) {
        console.log(`fetchInterestsData : ${error}`)
        commit('updateAssignTagModal', [true, error.response.data.message])
        loader.hide()
      })
  },
  clearPostList({ commit }) {
    commit('setAllPostsList', [])
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
