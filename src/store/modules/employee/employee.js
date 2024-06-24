import axios from 'axios'
import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import appConstants from '../../../appConstants'

Vue.use(Loading)

const defaultState = () => {
  return {
    allEmployeeList: [],
    editEmployeeData: {},
    alerts: {
      showEmployeeModal: false,
      showAddEmployeeErrorModal: false,
      EmployeeModalMessage: '',
      AddEmployeeErrorModalMessage: ''
    }
  }
}

const state = defaultState()

const getters = {
  getAllEmployeeList: (state) => state.allEmployeeList,
  getEditEmployeeData: (state) => state.editEmployeeData,
  showEmployeeModal: (state) => state.alerts.showEmployeeModal,
  EmployeeModalMessage: (state) => state.alerts.EmployeeModalMessage,
  AddEmployeeErrorModalMessage: (state) =>
    state.alerts.AddEmployeeErrorModalMessage,
  showAddEmployeeErrorModal: (state) => state.alerts.showAddEmployeeErrorModal
}
const mutations = {
  reset(state) {
    Object.assign(state, defaultState())
  },
  setAllEmployeeList: (state, allEmployeeListData) => {
    state.allEmployeeList = allEmployeeListData
  },
  setEditEmployee: (state, data) => {
    state.editEmployeeData = data
  },
  updateShowEmployeeModal(state, [value, message]) {
    state.alerts.showEmployeeModal = value
    if (value == false) {
      state.alerts.EmployeeModalMessage = ''
    } else {
      state.alerts.EmployeeModalMessage = message
      // setTimeout(() => {
      //   state.alerts.showEmployeeModal = false
      //   state.alerts.EmployeeModalMessage = ''
      // }, 3000)
    }
  },
  updateShowAddEmployeeErrorModal(state, [value, message]) {
    state.alerts.showAddEmployeeErrorModal = value
    if (value == false) {
      state.alerts.AddEmployeeErrorModalMessage = ''
    } else {
      state.alerts.AddEmployeeErrorModalMessage = message
      // setTimeout(() => {
      //   state.alerts.showEmployeeModal = false
      //   state.alerts.EmployeeModalMessage = ''
      // }, 3000)
    }
  }
}

const actions = {
  fetchAllEmployeeList({ commit }) {
    let loader = Vue.$loading.show({})
    return axios
      .get(`/olous_emp_users/emp/`)
      .then((response) => {
        commit('setAllEmployeeList', response.data.data)

        loader.hide()
        return response.data.data.next
      })
      .catch(function (error) {
        Vue.notify({
          group: 'error',
          type: 'error',
          text: appConstants.API_CATCH_MESSAGE
        })
        loader.hide()
        return error
      })
  },
  updateEmployeeDetails({ commit }, data) {
    let loader = Vue.$loading.show({})
    let id = data.id
    return new Promise((resolve, reject) => {
      return axios
        .patch(`/olous_emp_users/${id}/`, data)
        .then((response) => {
          //Not getting status in response so direct set to OPEN
          //commit('setStatusOfEditingLead', appConstants.leadStatus.OPEN)
          commit('updateShowEmployeeModal', [true, response.data.message])
          resolve(response.data)
          loader.hide()
        })
        .catch(function (error) {
          commit('updateShowEmployeeModal', [true, error.response.data.message])
          console.log(error)
          reject(error)
          loader.hide()
        })
    })
  },
  action_setAccessPermission({ commit }, obj) {
    return axios
      .post(`/olous_emp_users/update_permission/ `, obj)
      .then((response) => {
        //Not getting status in response so direct set to OPEN
        //commit('setStatusOfEditingLead', appConstants.leadStatus.OPEN)
        commit('updateShowEmployeeModal', [true, response.data.message])
      })
      .catch(function (error) {
        commit('updateShowEmployeeModal', [true, error.response.data.message])
        console.log(error)
      })
  },
  addEmployee({ commit }, data) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios
        .post(`/olous_emp_users/register/`, data)
        .then((response) => {
          //Not getting status in response so direct set to OPEN

          commit('updateShowEmployeeModal', [true, response.data.message])
          resolve(response)
          loader.hide()
        })
        .catch(function (error) {
          commit('updateShowAddEmployeeErrorModal', [
            true,
            error.response.data.message
          ])
          console.log(error)
          reject(error)
          loader.hide()
        })
    })
  },
  // createLead({ commit }, data) {
  //   let loader = Vue.$loading.show({})
  //   return axios
  //     .post(`/vendors/lead/`, data)
  //     .then((response) => {
  //       //Not getting status in response so direct set to OPEN
  //       commit('setIdOfnewlyCreatedLead', response.data.data.lead_id)
  //       commit('setStatusOfEditingLead', appConstants.leadStatus.OPEN)
  //       commit('updateShowLeadModal', [true, response.data.message])
  //       loader.hide()
  //     })
  //     .catch(function (error) {
  //       commit('updateShowLeadModal', [true, error.response.data.message])
  //       console.log(error)
  //       loader.hide()
  //     })
  // }
  // rejectLead({ commit }, data) {
  //   let loader = Vue.$loading.show({})
  //   let id = data.id
  //   let statusTobeUpdate = data.statusTobeUpdate
  //   return axios
  //     .post(`/vendors/lead/updatestatus/${id}/`, {
  //       status: appConstants.leadStatus.REJECTED
  //     })
  //     .then(() => {
  //       //Not getting status in response so direct set to REJECTED
  //       commit('setStatusOfEditingLead', appConstants.leadStatus.REJECTED)
  //       commit('updateShowLeadModal', [true, 'Lead Rejected'])

  //       loader.hide()
  //       return true
  //     })
  //     .catch(function (error) {
  //       commit('updateShowLeadModal', [true, error.response.data.message])
  //       console.log(error)
  //       loader.hide()
  //       return false
  //     })
  // },
  // updateAndApproveLead({ commit }, data) {
  //   let loader = Vue.$loading.show({})
  //   let id = data.id
  //   return axios
  //     .patch(`/vendors/lead/update/${id}/`, data)
  //     .then(() => {
  //       return axios
  //         .post(`/vendors/lead/updatestatus/${id}/`, {
  //           status: appConstants.leadStatus.APPROVED
  //         })
  //         .then(() => {
  //           //Not getting status in response so direct set to APPROVED
  //           commit('setStatusOfEditingLead', appConstants.leadStatus.APPROVED)
  //           commit('updateShowLeadModal', [true, 'Lead Approved'])
  //           loader.hide()
  //           return true
  //         })
  //         .catch(function (error) {
  //           commit('updateShowLeadModal', [true, error.response.data.message])
  //           console.log(error)
  //           loader.hide()
  //           return false
  //         })
  //     })
  //     .catch(function (error) {
  //       commit('updateShowLeadModal', [true, error.response.data.message])
  //       console.log(error)
  //       loader.hide()
  //       return false
  //     })
  // },
  // fetchAllocatedCompanyDetails({ commit }, data) {
  //   let loader = Vue.$loading.show({})
  //   return axios
  //     .post(`/vendors/companies/`, data)
  //     .then((response) => {
  //       commit('setAllocatedCompanyDetails', response.data.data.companies)
  //       loader.hide()
  //       return true
  //     })
  //     .catch(function (error) {
  //       commit('setAllocatedCompanyDetails', '')
  //       commit('updateShowLeadModal', [true, error.response.data.message])
  //       console.log(error)
  //       loader.hide()
  //       return false
  //     })
  // },
  // fetchCompaniesToAllocate({ commit }, searchBy) {
  //   let loader = Vue.$loading.show({})
  //   return axios
  //     .get(`/search/vendors/?q=${searchBy}`)
  //     .then((response) => {
  //       commit('setCompaniesToAllocate', response.data.data.hits.hits)
  //       loader.hide()
  //       return true
  //     })
  //     .catch(function (error) {
  //       commit('setCompaniesToAllocate', '')
  //       commit('updateShowLeadModal', [true, error.response.data.message])
  //       console.log(error)
  //       loader.hide()
  //       return false
  //     })
  // },

  // deleteLead({ commit }, data) {
  //   let loader = Vue.$loading.show({})
  //   let id = data.id
  //   return axios
  //     .delete(`/vendors/lead/${id}/`, data)
  //     .then(() => {
  //       commit('removeLeadFromList', data)
  //       loader.hide()
  //       return true
  //     })
  //     .catch(function (error) {
  //       console.log(error)
  //       loader.hide()
  //       return false
  //     })
  // },

  editEmployee({ commit }, EditEmployeeData) {
    {
      commit('setEditEmployee', EditEmployeeData)
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
