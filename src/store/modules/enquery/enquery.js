import axios from 'axios'
import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import appConstants from '../../../appConstants'

Vue.use(Loading)

const defaultState = () => {
  return {
    enqueryList: [],
    enqueryDetails: {}
  }
}

const state = defaultState()

const getters = {
  getAllEnqueryList: (state) => state.enqueryList,
  getEnqueryDetails: (state) => state.enqueryDetails
}
const mutations = {
  setEnqueryList: (state, data) => {
    state.enqueryList = data
  },
  setEnqueryDetails: (state, details) => {
    state.enqueryDetails = details
  },
  addEnqueryToEnqueriesList: (state, Lead) => {
    state.enqueryList.push(Lead)
  },
  enqueryResetState(state) {
    Object.assign(state, defaultState())
  },
  reset(state) {
    Object.assign(state, defaultState())
  }
}

const actions = {
  fetchEnqueries({ commit }, data) {
    let loader = Vue.$loading.show({})
    let pageNumber = data.pageNumber
    let enqueriesPerPage = data.enqueriesPerPage
    let offset = data.offset
    return axios
      .get(
        `/vendors/enquiries/?page=${pageNumber}&limit=${enqueriesPerPage}&offset=${offset}`
      )
      .then((response) => {
        if (pageNumber == 1) {
          commit('setEnqueryList', response.data.data.leads)
        } else {
          for (
            let index = 0;
            index < response.data.data.leads.length;
            index++
          ) {
            commit('addEnqueryToEnqueriesList', response.data.data.leads[index])
          }
        }

        loader.hide()
        return response.data.data.next
      })
      .catch(function () {
        Vue.notify({
          group: 'error',
          type: 'error',
          text: appConstants.API_CATCH_MESSAGE
        })
        loader.hide()
      })
  },

  editEnquery({ commit }, EditEnqueryData) {
    {
      commit('setEnqueryDetails', EditEnqueryData)
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
