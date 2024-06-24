/* eslint-disable no-unused-vars */
import axios from 'axios'
import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import router from '../../router/index'
import appConstants from '../../appConstants'

Vue.use(Loading)

const defaultState = () => {
  return {
    userTypeOptions: [],
    allUsersList: [],
    editUser: '',
    newUserAlerts: {
      showUserSaveModal: false,
      showErrorModalUser: false,
      userErrorMessage: ''
    }
  }
}

const state = defaultState()

const getters = {
  getUserTypeOptions: (state) => state.userTypeOptions,
  showUserSaveModal: (state) => state.newUserAlerts.showUserSaveModal,
  showErrorModalUser: (state) => state.newUserAlerts.showErrorModalUser,
  apiUserErrorMessage: (state) => state.newUserAlerts.userErrorMessage,
  getAllUsersList: (state) => state.allUsersList,
  getEditUser: (state) => state.editUser
}
const mutations = {
  reset(state) {
    Object.assign(state, defaultState())
  },
  setUserTypeOptions: (state, userTypeData) => {
    state.userTypeOptions = userTypeData
  },
  setShowUserSaveModal: (state, showUserSaveModalValue) => {
    state.newUserAlerts.showUserSaveModal = showUserSaveModalValue
  },
  setAllUsersList: (state, allUsersDataValue) => {
    state.allUsersList = allUsersDataValue
  },
  setEditUser: (state, editUserData) => {
    state.editUser = editUserData
  },

  addRecordInUsersList: (state, job) => {
    state.allUsersList.push(job)
  },

  setShowErrorModalUser: (state, showErrorModalUserValue) => {
    state.newUserAlerts.showErrorModalUser = showErrorModalUserValue
    if (showErrorModalUserValue == false) {
      state.newUserAlerts.userErrorMessage = ''
    }
  },

  updateShowUserSaveModal: (state, value) => {
    state.newUserAlerts.showUserSaveModal = value
  },

  updateShowErrorModalUser: (state, data) => {
    state.newUserAlerts.showErrorModalUser = data.showModal
    state.newUserAlerts.userErrorMessage = data.userErrorMessage
  }
}

const actions = {
  fetchUserTypeData({ commit }) {
    let loader = Vue.$loading.show({})
    var instance = axios.create()
    delete instance.defaults.headers.common['Authorization']

    return new Promise((resolve, reject) => {
      return instance
        .get(`/olous_emp_users/emp_types/`)
        .then((response) => {
          commit('setUserTypeOptions', response.data.data.user_types)
          loader.hide()
          resolve()
        })
        .catch(function (error) {
          console.log(error)
          loader.hide()
          reject(error)
        })
    })
  },
  saveUserData({ commit }, data) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .post(`/olous_emp_users/register/`, data)
        .then(function (response) {
          console.log(response)
          commit('updateShowUserSaveModal', true)
          setTimeout(() => {
            commit('updateShowUserSaveModal', false)
            router.push({
              name: appConstants.routes.USER
            })
          }, 2800)
          loader.hide()
          resolve()
        })
        .catch(function (error) {
          console.log(error)
          commit('updateShowErrorModalUser', {
            showModal: true,
            userErrorMessage: error.response.data.message
          })
          setTimeout(() => {
            commit('updateShowErrorModalUser', {
              showModal: false,
              userErrorMessage: ''
            })
          }, 2800)
          loader.hide()
          reject(error)
        })
    })
  },
  updateUserData({ commit }, data) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .post(`/olous_emp_users/register/`, data) //TODO
        .then(function (response) {
          console.log(response)
          commit('updateShowUserSaveModal', true)
          setTimeout(() => {
            commit('updateShowUserSaveModal', false)
            router.push({
              name: appConstants.routes.USER
            })
          }, 2800)
          loader.hide()
          resolve()
        })
        .catch(function (error) {
          console.log(error)
          commit('updateShowErrorModalUser', {
            showModal: true,
            userErrorMessage: error.response.data.message
          })
          setTimeout(() => {
            commit('updateShowErrorModalUser', {
              showModal: false,
              userErrorMessage: ''
            })
          }, 2800)
          loader.hide()
          reject(error)
        })
    })
  },
  fetchAllUsersData({ commit }, data) {
    let pageNumber = data.pageNumber
    let userPerPage = data.userPerPage
    let offset = data.offset
    let loader = Vue.$loading.show({})
    //`/vendors/jobs/all/?page=${pageNumber}&limit=${userPerPage}&offset=${offset}`
    var instance = axios.create()
    delete instance.defaults.headers.common['Authorization']
    return new Promise((resolve, reject) => {
      return instance
        .get(`/olous_emp_users/emp_types/`) //TODO
        .then((response) => {
          var userList = [] //TODO
          for (let index = offset + 1; index <= pageNumber * 10; index++) {
            userList.push({
              id: index,
              first_name: `${index}_firstName`,
              last_name: `${index}_LastName`,
              user_type: '0',
              emp_id: `${index}_employeeID`,
              password: `${index}_password`
            })
          }
          if (pageNumber == 1) {
            commit('setAllUsersList', userList)
          } else {
            for (let index = 0; index < userList.length; index++) {
              commit('addRecordInUsersList', userList[index])
            }
          }
          loader.hide()
          resolve()
        })
        .catch(function (error) {
          console.log(error)
          loader.hide()
          reject(error)
        })
    })
  },
  fetchOneOlousUserData({ commit }, user_id) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .get(`/users/fetch_one_user/${user_id}/`)
        .then((response) => {
          loader.hide()
          resolve(response.data)
        })
        .catch(function (error) {
          Vue.notify({
            group: 'error',
            type: 'error',
            text: appConstants.API_CATCH_MESSAGE
          })
          loader.hide()
          reject(error)
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
