import axios from 'axios'
import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
Vue.use(Loading)

const defaultState = () => {
  return {
    businessDashboardData: {}
  }
}

const state = defaultState()

const getters = {
  getter_businessDashboardData: (state) => state.businessDashboardData
}
const mutations = {
  reset(state) {
    Object.assign(state, defaultState())
  },
  commit_businessDashboardData: (state, data) => {
    state.businessDashboardData = data
  }
}

const actions = {
  action_fetchBusinessDashboardData({ commit }, company_id) {
    //console.log('data', data)

    return new Promise((resolve, reject) => {
      axios
        .get(`/vendors/dashboard/${company_id}`)
        .then(function (response) {
          //console.log('response', response)
          commit('commit_businessDashboardData', response.data.data)
          resolve(response.data.data)
        })
        .catch(function (error) {
          console.log(error)
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
