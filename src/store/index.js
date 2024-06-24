import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import login from './modules/login/login'
import user from './modules/user'
import assignTags from './modules/assignTags/assignTags'
import company from './modules/company/company'
import job from './modules/job/job'
import search from './modules/common/search'

import lead from './modules/lead/lead'
import news from './modules/news/news'
import dropdownValues from './modules/common/dropdownValues'
import marketing from './modules/marketing/marketing'
import registration from './modules/pqq/registration'
import companyData from './modules/pqq/companyData'
import description from './modules/pqq/description'
import catalogue from './modules/pqq/catalogue'
import product from './modules/pqq/product'
import testiomonial from './modules/pqq/testiomonial'
import enquery from './modules/enquery/enquery'
import pricing from './modules/pricing/pricing'
import companyPricing from './modules/pricing/companyPricing'
import report from './modules/report/report'
import companyStructure from './modules/pqq/companyStructure'
import experience from './modules/pqq/experience'
import reference from './modules/pqq/reference'
import resources from './modules/pqq/resources'
import compliance from './modules/pqq/compliance'
import financialInfo from './modules/pqq/financialInfo'
import ads from './modules/ads/ads'
import headlines from './modules/news/headlines'
import analytics from './modules/Analytics/analytics'
import createCompany from './modules/createCompany/createCompany.js'
import employee from './modules/employee/employee.js'
import otp from './modules/otp/otp.js'
import uploadresume from './modules/uploadResume/uploadResume.js'
import businessdashboard from './modules/businessdashboard/businessdashboard.js'

import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'
import { readUserTokenCookie } from '../common/js/UserToken'
const ls = new SecureLS({ isCompression: false })

Vue.use(Vuex)
Vue.use(Loading)

axios.interceptors.request.use(
  function (config) {
    const token = readUserTokenCookie()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    if (
      error.response &&
      (error.response.status == 401 || error.response.status == 403)
    ) {
      // session timed out | not authenticated
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response && error.response.status == 401) {
      // session timed out | not authenticated
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'olous_admin_vuexdata', //This key is referred on logout
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key)
      }
    })
  ],
  actions: {
    resetStoreState({ commit }) {
      for (const currentModule in this._modules.root._children) {
        if (
          this._modules.root._children[
            currentModule
            // eslint-disable-next-line no-prototype-builtins
          ]._rawModule.mutations.hasOwnProperty('reset')
        ) {
          if (
            this._modules.root._children[
              currentModule
              // eslint-disable-next-line no-prototype-builtins
            ].namespaced
          ) {
            commit(`${currentModule}/reset`)
          }
        } else {
          if (
            this._modules.root._children[
              currentModule
              // eslint-disable-next-line no-prototype-builtins
            ]._rawModule.mutations.hasOwnProperty(`reset_${currentModule}`)
          ) {
            if (
              this._modules.root._children[
                currentModule
                // eslint-disable-next-line no-prototype-builtins
              ].namespaced
            ) {
              commit(`${currentModule}/reset_${currentModule}`)
            } else {
              commit(`reset_${currentModule}`)
            }
          }
        }
      }
    }
  },

  modules: {
    login,
    user,
    assignTags,
    company,
    job,
    search,
    lead,
    news,
    headlines,
    dropdownValues,
    marketing,
    registration,
    companyData,
    description,
    catalogue,
    product,
    enquery,
    pricing,
    companyPricing,
    report,
    companyStructure,
    experience,
    reference,
    resources,
    compliance,
    financialInfo,
    ads,
    testiomonial,
    analytics,
    createCompany,
    employee,
    otp,
    uploadresume,
    businessdashboard
  }
})
