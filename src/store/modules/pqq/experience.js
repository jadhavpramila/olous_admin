import axios from 'axios'
import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import appConstants from '../../../appConstants'

Vue.use(Loading)

const defaultState = () => {
  return {
    experienceData: '',
    showExperienceModal: '',
    modalExperienceMessage: ''
  }
}

const state = defaultState()

const getters = {
  getExperienceData: (state) => state.experienceData,
  showExperienceModal: (state) => state.showExperienceModal,
  modalExperienceMessage: (state) => state.modalExperienceMessage
}
const mutations = {
  setExperienceData: (state, experienceValue) => {
    state.experienceData = experienceValue
  },
  updateExperienceModalData: (state, [value, message]) => {
    state.showExperienceModal = value
    if (value == false) {
      state.modalExperienceMessage = ''
    } else {
      state.modalExperienceMessage = message
      setTimeout(() => {
        state.showExperienceModal = false
        state.modalExperienceMessage = ''
      }, 2500)
    }
  },
  experienceResetState(state) {
    Object.assign(state, defaultState())
  },
  reset(state) {
    Object.assign(state, defaultState())
  }
}

const actions = {
  fetchExperienceData({ commit }, companyId) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .get(`/vendors/company/infowithpqq/${companyId}`)
        .then(function (response) {
          commit('setExperienceData', response.data.data)
          loader.hide()
          resolve(response.data.data)
        })
        .catch(function (error) {
          console.log('fetchExperienceData : ' + error)
          if (error.response) {
            commit('updateExperienceModalData', [
              true,
              error.response.data.message
            ])
          } else {
            commit('updateExperienceModalData', [true, 'Something went wrong'])
          }
          loader.hide()
          reject()
        })
    })
  },

  SaveExperienceData({ commit }, data) {
    let loader = Vue.$loading.show({})
    let companyId = data.company_id

    var add_experience = data.add_experience_count
    delete data.add_experience

    var update_experience = data.update_experience_count
    delete data.add_experience

    return new Promise((resolve, reject) => {
      return axios
        .all([
          axios.post(`/vendors/company/pqq/experience`, data),
          axios.post(`/vendors/company/pqq/experiencecount`, add_experience),
          axios.patch(
            `/vendors/company/pqq/updateexperiencecount`,
            update_experience
          )
        ])
        .then(function (responseArr) {
          let tab_data = {
            company_id: companyId,
            company_tab: appConstants.companyTabs.EXPERIENCE,
            tab_completed_status: true
          }

          axios
            .post(`/vendors/company/tabstatus`, tab_data)
            .then((response) => {
              commit('companyData/setCurrentCompanyData', response.data.data, {
                root: true
              })
              commit('setExperienceData', response.data.data)
              loader.hide()
              resolve(responseArr[0].data.data)
            })
            .catch(() => {
              commit('updateExperienceModalData', [
                true,
                'Something went wrong while updating Experience tab status'
              ])
              loader.hide()
              reject()
            })

          commit('updateExperienceModalData', [
            true,
            responseArr[0].data.message
          ])
        })
        .catch(function (error) {
          console.log('SaveExperienceData : ' + error)
          if (error.response) {
            commit('updateExperienceModalData', [
              true,
              error.response.data.message
            ])
          } else {
            commit('updateExperienceModalData', [true, 'Something went wrong'])
          }
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
