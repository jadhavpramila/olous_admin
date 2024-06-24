import axios from 'axios'
import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import appConstants from '../../../appConstants'

Vue.use(Loading)

const defaultState = () => {
  return {
    allCompanyData: [],
    current_company_data: '',
    companyDetailsData: '',
    company_info: [],
    publish_alert: {
      isShow: false,
      message: ''
    }
  }
}

const state = defaultState()

const getters = {
  allCompanies: (state) => state.allCompanyData,
  getCurrentCompanyData: (state) => state.current_company_data,
  publish_alert_isShow: (state) => state.publish_alert.isShow,
  publish_alert_message: (state) => state.publish_alert.message,
  getCompanyDetailsData: (state) => state.companyDetailsData,
  getCompanyTabStatus: (state) => (tabIndex) => {
    if (state.current_company_data == '') {
      return false
    }

    switch (tabIndex) {
      case appConstants.companyTabs.REGISTRATION:
        return state.current_company_data.is_registration_completed
      case appConstants.companyTabs.DESCRIPTION:
        return state.current_company_data.is_description_completed
      case appConstants.companyTabs.SERVICEANDPRODUCT:
        return state.current_company_data.is_products_completed
      case appConstants.companyTabs.CATALOGUE:
        return state.current_company_data.is_catalogue_completed
      case appConstants.companyTabs.COMPANY_STRUCTURE:
        return state.current_company_data.is_company_stru_completed
      case appConstants.companyTabs.FINANCIAL_INFO:
        return state.current_company_data.is_financial_info_completed
      case appConstants.companyTabs.EXPERIENCE:
        return state.current_company_data.is_experience_completed
      case appConstants.companyTabs.RESOURCES:
        return state.current_company_data.is_resources_completed
      case appConstants.companyTabs.COMPLIANCE:
        return state.current_company_data.is_compliance_completed
      case appConstants.companyTabs.REFERENCES:
        return state.current_company_data.is_references_completed
      default:
        return false
    }
  }
}
const mutations = {
  reset(state) {
    Object.assign(state, defaultState())
  },
  setCompanies: (state, companies) => {
    state.allCompanyData = []
    state.allCompanyData = companies
  },
  setCurrentCompanyData: (state, companyData) => {
    if (companyData == '' || companyData == null) {
      state.current_company_data = ''
    } else {
      var comp = {
        id: companyData.id,
        name: companyData.name,
        category: companyData.category,
        no_of_catalogs: companyData.no_of_catalogs,
        no_of_products: companyData.no_of_products,
        slug: companyData.slug,
        company_type: companyData.company_type,
        sub_categories: companyData.sub_categories,
        status: companyData.status,
        country: companyData.country,
        country_iso: companyData.country_iso,

        is_registration_completed: companyData.is_registration_completed,
        is_description_completed: companyData.is_description_completed,
        is_products_completed: companyData.is_products_completed,
        is_catalogue_completed: companyData.is_catalogue_completed,
        is_company_stru_completed: companyData.is_company_stru_completed,
        is_financial_info_completed: companyData.is_financial_info_completed,
        is_experience_completed: companyData.is_experience_completed,
        is_resources_completed: companyData.is_resources_completed,
        is_compliance_completed: companyData.is_compliance_completed,
        is_references_completed: companyData.is_references_completed
      }
      state.current_company_data = comp
    }
  },
  updatePublishModalValues: (state, [value, message]) => {
    state.publish_alert.isShow = value
    if (value == false) {
      state.publish_alert.message = ''
    } else {
      state.publish_alert.message = message
      setTimeout(() => {
        state.publish_alert.isShow = false
        state.publish_alert.message = ''
      }, 3500)
    }
  },
  setCompanyDetailsData: (state, data) => {
    state.companyDetailsData = data.data
  }
}

const actions = {
  fetchCompanies({ commit }) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .get('/vendors/business/preview/')
        .then(function (response) {
          const result = response.data
          commit('setCompanies', result.data)
          loader.hide()
          resolve()
        })
        .catch(function (error) {
          console.log('fetchCompanies : ' + error)
          if (error.response) {
            reject(error.response.data.message)
          } else {
            reject('Something went wrong')
          }
          loader.hide()
          reject()
        })
    })
  },

  // eslint-disable-next-line no-unused-vars
  fetchCompanyDetailsById({ commit }, companyId) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .get(`/vendors/company/info/${companyId}`)
        .then(function (response) {
          // eslint-disable-next-line no-unused-vars
          const result = response.data
          // commit('setCompanyInfo', result.data)
          loader.hide()
          resolve()
        })
        .catch(function (error) {
          console.log('fetchCompanyDetailsById : ' + error)
          if (error.response) {
            reject(error.response.data.message)
          } else {
            reject('Something went wrong')
          }
          loader.hide()
          reject()
        })
    })
  },

  publishCompany({ commit }, payload) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .post(`/vendors/company/publish/${payload}`)
        .then(function (response) {
          const result = response.data.message
          commit('updatePublishModalValues', [true, result])
          loader.hide()
          resolve(response.data.data)
        })
        .catch(function (error) {
          console.log(error)
          loader.hide()
          console.log('publishCompany : ' + error)
          if (error.response) {
            commit('updatePublishModalValues', [
              true,
              error.response.data.message
            ])
          } else {
            commit('updatePublishModalValues', [true, 'Something went wrong'])
          }

          loader.hide()
          reject()
        })
    })
  },
  unpublishCompany({ commit }, companyId) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .post(`/vendors/company/unpublish/${companyId}`)
        .then(function (response) {
          const result = response.data.message
          commit('updatePublishModalValues', [true, result])
          loader.hide()
          resolve(response.data.data)
        })
        .catch(function (error) {
          console.log(error)
          loader.hide()
          console.log('publishCompany : ' + error)
          if (error.response) {
            commit('updatePublishModalValues', [
              true,
              error.response.data.message
            ])
          } else {
            commit('updatePublishModalValues', [true, 'Something went wrong'])
          }

          loader.hide()
          reject()
        })
    })
  },

  // eslint-disable-next-line no-unused-vars
  getCompanyTabStatus({ commit }, tabIndex) {
    if (state.current_company_data == '') {
      return false
    }

    switch (tabIndex) {
      case appConstants.companyTabs.REGISTRATION:
        return state.current_company_data.is_registration_completed
      case appConstants.companyTabs.DESCRIPTION:
        return state.current_company_data.is_description_completed
      case appConstants.companyTabs.SERVICEANDPRODUCT:
        return state.current_company_data.is_products_completed
      case appConstants.companyTabs.CATALOGUE:
        return state.current_company_data.is_catalogue_completed
      case appConstants.companyTabs.COMPANY_STRUCTURE:
        return state.current_company_data.is_company_stru_completed
      case appConstants.companyTabs.FINANCIAL_INFO:
        return state.current_company_data.is_financial_info_completed
      case appConstants.companyTabs.EXPERIENCE:
        return state.current_company_data.is_experience_completed
      case appConstants.companyTabs.RESOURCES:
        return state.current_company_data.is_resources_completed
      case appConstants.companyTabs.COMPLIANCE:
        return state.current_company_data.is_compliance_completed
      case appConstants.companyTabs.REFERENCES:
        return state.current_company_data.is_references_completed
      default:
        return false
    }
  },

  fetchUpdatedCompanyDataSetToCurrentCompanyState({ commit }, companyId) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .get(`/vendors/company/infowithcontact/${companyId}`)
        .then(function (response) {
          commit('setCurrentCompanyData', response.data.data)
          loader.hide()
          resolve(response.data.data)
        })
        .catch(function (error) {
          console.log('fetchCompanyDataAssignToCurrentCompanyState : ' + error)
          loader.hide()
          reject()
        })
    })
  },
  // fetch company detaila data
  fetchCompanyDetailsData({ commit }, companyId) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .get(`/vendors/company/extradata/${companyId}`)
        .then(function (response) {
          commit('setCompanyDetailsData', response.data)
          loader.hide()
          resolve(response.data.data)
        })
        .catch(function (error) {
          console.log('fetchRegistrationData : ' + error)

          loader.hide()
          reject()
        })
    })
  },
  // update compnaydetails APi call
  updateCompanyDetailsData({ commit }, data) {
    console.log('data in api call =', data)
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .patch(`/vendors/company/extraupdate/${data.id}`, data.data)
        .then(function (response) {
          commit('setCompanyDetailsData', response.data)
          loader.hide()
          resolve(response.data.data)
        })
        .catch(function (error) {
          console.log('updateCompanyDetailsData : ' + error)
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
