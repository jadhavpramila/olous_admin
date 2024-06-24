import axios from 'axios'
import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import {
  createUserTokenCookie,
  deleteUserTokenCookie
} from '../../../common/js/UserToken.js'
import store from '../../index.js'

Vue.use(Loading)

const defaultState = () => {
  return {
    status: '',
    token: '',
    user: '',
    error: '',
    employeeAccessPermission: {},
    accessPermission: '',
    verifyPhoneOTP: '',
    verifyEmailOTP: '',
    optVerified: ''
  }
}

const state = defaultState()

const getters = {
  //isLoggedIn: (state) => !!state.token,
  authStatus: (state) => state.status,
  authError: (state) => state.error,
  userData: (state) => state.user,
  userToken: (state) => state.token,
  // eslint-disable-next-line no-unused-vars
  isAdmin: (state) => state.user.is_admin,
  getter_employeeAccessPermission: (state) => state.employeeAccessPermission,
  getter_error: (state) => state.error,
  getter_userAccessPermission: (state) => state.accessPermission,
  getter_token: (state) => state.token,
  getter_user: (state) => state.user,
  getter_verifyPhoneOTP: (state) => state.verifyPhoneOTP,
  getter_verifyEmailOTP: (state) => state.verifyEmailOTP,
  getter_optVerified: (state) => state.optVerified
}
const mutations = {
  auth_request(state) {
    state.status = 'loading'
  },
  auth_success: (state, token) => {
    ;(state.status = 'success'), (state.token = token)
  },
  set_user(state, userData) {
    //console.log(userData)
    state.user = userData
    state.user.company_data = []
  },
  set_token(state, tokenValue) {
    state.token = tokenValue
  },
  auth_register(state) {
    state.status = 'success'
  },
  auth_error(state, err) {
    state.error = err
  },
  logout(state) {
    state.status = ''
    state.token = ''
    state.user = ''
    state.error = ''
    state.isUserLoggedIn = false
  },
  commit_employeeAccessPermission: (state, data) => {
    state.employeeAccessPermission = data.access_permission
  },
  commit_error(state, errorData) {
    state.error = errorData
  },
  set_accessPermission(state, data) {
    state.accessPermission = data.access_permission
  },
  commit_verifyEmailOTP(state, data) {
    state.verifyEmailOTP = data
  },
  commit_verifyPhoneOTP(state, data) {
    state.verifyPhoneOTP = data
  },
  commit_optVerified(state, data) {
    state.optVerified = data
  },
  commit_user(state, userData) {
    state.user = userData

    if (userData == '') {
      state.isUserLoggedIn = false
    } else {
      state.isUserLoggedIn = true
    }
  },
  commit_token(state, TokenData) {
    state.token = TokenData
  },
  reset_login(state) {
    Object.assign(state, defaultState())
  }
}

const actions = {
  login({ commit }, authData) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .post('/olous_emp_users/login/', authData)
        .then(function (res) {
          const result = res.data
          const token = result.data.token.access
          const user = result.data.user
          if (user) {
            //localStorage.setItem('olous_admin_token', token)
            createUserTokenCookie(token)
            commit('auth_success', token)
            commit('set_user', user)
            commit('set_accessPermission', user)
            loader.hide()
            resolve(res)
          } else {
            //localStorage.removeItem('olous_admin_token')
            deleteUserTokenCookie()
            reject('you are not authorized to use this application')
            loader.hide()
            resolve(res)
          }
        })
        .catch(function (error) {
          commit('auth_error', error)
          localStorage.removeItem('olous_admin_token')
          loader.hide()
          reject(error.response.data.message)
        })
    })
  },
  logout({ commit }) {
    // eslint-disable-next-line no-unused-vars
    let loader = Vue.$loading.show({})
    return new Promise((resolve) => {
      commit('logout')
      //ocalStorage.removeItem('olous_admin_token')
      this.dispatch('resetStoreState', { root: true })
      localStorage.removeItem('olous_admin_vuexdata')
      deleteUserTokenCookie()
      loader.hide()
      resolve()
    })
  },
  action_getEmployeeAccessPermission({ commit }) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .get('/olous_emp_users/access_permission/')
        .then(function (res) {
          //const result = res.data.data
          //console.log('result', result)
          commit('set_accessPermission', res.data.data)
          loader.hide()
          resolve(res.data.data)
        })
        .catch(function (error) {
          //commit('auth_error', error)
          loader.hide()
          reject(error.response.data.message)
        })
    })
  },
  sendOTP({ commit }, authData) {
    var axios_instance = axios.create()
    delete axios_instance.defaults.headers.common['Authorization']
    let loader = Vue.$loading.show()
    return new Promise((resolve, reject) => {
      axios_instance
        .post('/users/get_login_otp/', { username: authData })
        .then((res) => {
          resolve(res)
          loader.hide()
        })
        .catch((error) => {
          commit('commit_error', error.response)
          reject(error.response)
          loader.hide()
        })
    })
  },
  action_verifyPhoneOTP({ commit }, data) {
    // console.log(data);
    //const $loading = useLoading()
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .post('/users/get_phone_otp/', data)
        .then((response) => {
          commit('commit_verifyPhoneOTP', response)
          resolve()
          loader.hide()
        })
        .catch((error) => {
          loader.hide()
          if (error.response) {
            reject(error.response.data.message)
          } else {
            reject('Something went wrong.')
          }
        })
    })
  },
  action_verifyEmailOTP({ commit }, data) {
    // console.log(data);
    //const $loading = useLoading()
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .post('/users/send_signup_email_for_verification/', data)
        .then((response) => {
          commit('commit_verifyEmailOTP', response)
          resolve()
          loader.hide()
        })
        .catch((error) => {
          loader.hide()
          if (error.response) {
            reject(error.response.data.message)
          } else {
            reject('Something went wrong.')
          }
        })
    })
  },
  action_phoneOTP({ commit }, data) {
    // console.log("data in action_phoneOTP", data);
    //const $loading = useLoading()
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .post('/users/verify_phone_otp/', data.verifyOTP)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          axios
            .post('/accounts/registration/', data.phone_data)
            .then((res) => {
              const result = res.data
              const token = result.data.token.access
              const user = result.data.user
              createUserTokenCookie(token)
              localStorage.setItem('olous_admin_token', token)
              commit('auth_success', token)
              commit('set_user', user)
              commit('set_accessPermission', user)
              resolve()
              loader.hide()
            })
            .catch((error) => {
              deleteUserTokenCookie()
              localStorage.removeItem('olous_admin_token')
              if (error.response) {
                reject(error.response.data.message)
              } else {
                reject('Something went wrong.')
              }
              loader.hide()
            })
        })
        .catch((error) => {
          loader.hide()
          if (error.response) {
            reject(error.response.data.message)
          } else {
            reject('Something went wrong.')
          }
        })
    })
  },
  action_emailOTP({ commit }, data) {
    // console.log("action email  otp in store =>",data);
    //const $loading = useLoading()
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .post('/users/verify_signup_email_otp/', data.verifyOTP)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          // console.log(response);
          axios
            .post('/accounts/registration/', data.email_data)
            .then((res) => {
              commit('commit_optVerified', res.data.data.status)
              const result = res.data
              const token = result.data.token.access
              const user = result.data.user
              createUserTokenCookie(token)
              localStorage.setItem('olous_admin_token', token)
              commit('auth_success', token)
              commit('set_user', user)
              commit('set_accessPermission', user)
              resolve()
              loader.hide()
            })
            .catch((error) => {
              deleteUserTokenCookie()
              // commit("commit_error", error.response.data.message);
              localStorage.removeItem('olous_admin_token')
              if (error.response) {
                reject(error.response.data.message)
              } else {
                reject('Something went wrong.')
              }
              loader.hide()
            })
        })
        .catch((error) => {
          if (error.response) {
            reject(error.response.data.message)
          } else {
            reject('Something went wrong.')
          }
          loader.hide()
        })
    })
  },
  getUserDataFromToken({ commit }, currentToken) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      commit('logout')
      this.dispatch('resetStoreState', { root: true })
      localStorage.removeItem('olous_admin_token')
      localStorage.removeItem('olous_admin_vuexdata')

      axios
        .get('/users/current_user/')
        .then((res) => {
          const user = res.data.data
          commit('set_user', user)
          commit('set_token', currentToken)
          resolve(res.data.data)

          return axios
            .get(`/olous_emp_users/access_permission/`)
            .then((secondResponse) => {
              commit('set_accessPermission', secondResponse.data.data)
              store.dispatch('fetchCompanies')
              loader.hide()
              return true
            })
            .catch(function (error) {
              if (!error.response.data.data.canPostJob) {
                commit('setJobPostingBalanceExpire', {
                  showModal: true,
                  userErrorMessage: error.response.data.message
                })
              } else {
                console.log(error)
              }
              //console.log(error)
            })
        })
        .catch((err) => {
          commit('auth_error', err)
          loader.hide()
          reject()
        })
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
