import axios from 'axios'
import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import appConstants from '../../../appConstants'

Vue.use(Loading)

const defaultState = () => {
  return {
    financialInfoData: '',
    showFinancialInfoModal: '',
    modalFinancialInfoMessage: ''
  }
}

const state = defaultState()

const getters = {
  getFinancialInfoData: (state) => state.financialInfoData,
  showFinancialInfoModal: (state) => state.showFinancialInfoModal,
  modalFinancialInfoMessage: (state) => state.modalFinancialInfoMessage
}
const mutations = {
  setFinancialInfoData: (state, value) => {
    state.financialInfoData = value
  },
  updateFinanceInfoModalData: (state, [value, message]) => {
    state.showFinancialInfoModal = value
    if (value == false) {
      state.modalFinancialInfoMessage = ''
    } else {
      state.modalFinancialInfoMessage = message
      setTimeout(() => {
        state.showFinancialInfoModal = false
        state.modalFinancialInfoMessage = ''
      }, 2500)
    }
  },
  financialInfoResetState(state) {
    Object.assign(state, defaultState())
  },
  reset(state) {
    Object.assign(state, defaultState())
  }
}

const actions = {
  fetchFinancialInfoData({ commit }, companyId) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .get(`/vendors/company/infowithpqq/${companyId}`)
        .then(function (response) {
          commit('setFinancialInfoData', response.data.data)
          loader.hide()
          resolve(response.data.data)
        })
        .catch(function (error) {
          console.log('fetchfinancialInfoData : ' + error)
          if (error.response) {
            commit('updateFinanceInfoModalData', [
              true,
              error.response.data.message
            ])
          } else {
            commit('updateFinanceInfoModalData', [true, 'Something went wrong'])
          }
          loader.hide()
          reject()
        })
    })
  },

  SaveFinancialInfoData({ commit }, data) {
    let loader = Vue.$loading.show({})
    var add_turnover = data.add_turnover
    delete data.add_turnover

    var update_turnover = data.update_turnover
    delete data.update_turnover

    return new Promise((resolve, reject) => {
      return axios
        .all([
          axios.post(`/vendors/company/pqq/financialinformation`, data),
          axios.post(`/vendors/company/pqq/turnover`, add_turnover),
          axios.patch(`/vendors/company/pqq/upadateturnover`, update_turnover)
        ])
        .then((responseArr) => {
          let tab_data = {
            company_id: data.company_id,
            company_tab: appConstants.companyTabs.FINANCIAL_INFO,
            tab_completed_status: true
          }

          axios
            .post(`/vendors/company/tabstatus`, tab_data)
            .then(function (response) {
              commit('companyData/setCurrentCompanyData', response.data.data, {
                root: true
              })
              commit('setFinancialInfoData', response.data.data)
              loader.hide()
              resolve(response.data.data)
            })
            .catch(() => {
              loader.hide()
              commit('updateFinanceInfoModalData', [
                true,
                'Something went wrong while updating Financial info tab status'
              ])
              reject()
            })

          commit('updateFinanceInfoModalData', [
            true,
            responseArr[0].data.message
          ])
        })
        .catch(function (error) {
          console.log('SaveFinancialInfoData : ' + error)
          if (error.response) {
            commit('updateFinanceInfoModalData', [
              true,
              error.response.data.message
            ])
          } else {
            commit('updateFinanceInfoModalData', [true, 'Something went wrong'])
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
