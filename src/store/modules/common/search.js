/* eslint-disable no-unused-vars */
import axios from 'axios'
import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

Vue.use(Loading)

const defaultState = () => {
  return {
    country: [
      {
        data: []
      }
    ],
    states: [
      {
        data: []
      }
    ],
    cities: [
      {
        data: []
      }
    ]
  }
}

const state = defaultState()
const getters = {
  filteredCountry: (state) => state.country,
  filteredState: (state) => state.states,
  filteredCities: (state) => state.cities
}

const actions = {
  searchContry({ commit }, data) {
    axios
      .get(
        // `https://content.olous.app/api/v1/vendors/search/country/?q=${data}`
        // `http://15.207.209.15/api/v1/vendors/search/country/?q=${data}`
        `/search/vendors/country/?q=${data}`
      )
      .then(function (response) {
        console.log(response)
        const result = response.data.data.hits.hits
        console.log(result)
        let con = result.map((res) => {
          return res._source
        })
        console.log(con)
        commit('getCountry', con)
      })
      .catch(function (error) {
        console.log(error)
      })
  },

  searchState({ commit }, payload) {
    console.log(payload)
    axios
      .get(
        // `https://content.olous.app/api/v1/vendors/search/state/?q=${payload.state}&country=${payload.country}`
        // `http://15.207.209.15/api/v1/vendors/search/state/?q=${payload.state}&country=${payload.country}`
        `/search/vendors/state/?q=${payload.state}&country=${payload.country}`
      )
      .then(function (response) {
        console.log(response)
        const result = response.data.data.hits.hits
        console.log(result)
        let st = result.map((res) => {
          return res._source
        })
        console.log(st)
        commit('getState', st)
      })
      .catch(function (error) {
        console.log(error)
      })
  },

  searchCity({ commit }, payload) {
    console.log(payload)
    axios
      .get(
        // `https://content.olous.app/api/v1/vendors/search/city/?q=${payload.city}&country=${payload.country}&state=${payload.state}`
        // `http://15.207.209.15/api/v1/vendors/search/city/?q=${payload.city}&country=${payload.country}&state=${payload.state}`
        `/search/vendors/city/?q=${payload.city}&country=${payload.country}&state=${payload.state}`
      )
      .then(function (response) {
        console.log(response)
        const result = response.data.data.hits.hits
        console.log(result)
        let st = result.map((res) => {
          return res._source
        })
        console.log(st)
        commit('getCity', st)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

const mutations = {
  getCountry(state, con) {
    state.country[0].data = con
  },
  getState: (state, st) => (state.states[0].data = st),
  getCity: (state, st) => (state.cities[0].data = st),
  setStateEmpty: (state, st) => (state.states[0].data = []),
  setCityEmpty: (state, st) => (state.cities[0].data = []),
  reset_search(state) {
    Object.assign(state, defaultState())
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
