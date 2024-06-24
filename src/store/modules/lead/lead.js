/* eslint-disable no-unused-vars */
import axios from 'axios'
import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import appConstants from '../../../appConstants'
import { Lead, CreateApplicationList } from '../../modelClasses/leadModel.js'
import { company } from '../../modelClasses/companyModel.js'

Vue.use(Loading)

const defaultState = () => {
  return {
    leadDetails: '',
    allLeadsList: [],
    leadToEdit: '',
    statusOfEditingLead: '',
    allocatedCompanyDetails: [],
    companiesToAllocate: [],
    leadAllApplicants: [],
    idOfnewlyCreatedLead: '',
    currentLeadFilterType: appConstants.lead_filter_type.OPEN,
    alerts: {
      showLeadModal: false,
      LeadModalMessage: ''
    },
    leadSuggestions: []
  }
}

const state = defaultState()
const getters = {
  getLeadDetails: (state) => state.leadDetails,
  getAllLeadsList: (state) => state.allLeadsList,
  getLeadToEdit: (state) => state.leadToEdit,
  showLeadModal: (state) => state.alerts.showLeadModal,
  LeadModalMessage: (state) => state.alerts.LeadModalMessage,
  getStatusOfEditingLead: (state) => state.statusOfEditingLead,
  getAllocatedCompanyDetails: (state) => state.allocatedCompanyDetails,
  getCompaniesToAllocate: (state) => state.companiesToAllocate,
  getIdOfnewlyCreatedLead: (state) => state.idOfnewlyCreatedLead,
  getCurrentLeadFilterType: (state) => state.currentLeadFilterType,
  getLeadAllApplicants: (state) => state.leadAllApplicants,
  getLeadSuggestions: (state) => state.leadSuggestions
}
const mutations = {
  setLeadDetails: (state, leadDetailsData) => {
    state.leadDetails = leadDetailsData
  },
  setAllLeadsList: (state, allLeadsListData) => {
    state.allLeadsList = allLeadsListData
  },

  setLeadAllApplicants: (state, allApplicants) => {
    state.leadAllApplicants = allApplicants
  },

  setStatusOfLeadApplication: (state, [application_id, status]) => {
    for (let index = 0; index < state.leadAllApplicants.length; index++) {
      if (state.leadAllApplicants[index].id == application_id) {
        state.leadAllApplicants[index].application_status = status
      }
    }
  },

  addLeadToLeadsList: (state, Lead) => {
    state.allLeadsList.push(Lead)
  },

  addLeadApplicationToApplicantsList: (state, application) => {
    state.leadAllApplicants.push(application)
  },
  setEditLead: (state, editLead) => {
    state.leadToEdit = editLead
  },
  setStatusOfEditingLead: (state, status) => {
    state.statusOfEditingLead = status
  },
  setIdOfnewlyCreatedLead: (state, leadId) => {
    state.idOfnewlyCreatedLead = leadId
  },
  setCurrentLeadFilterType: (state, current_lead_filter_id) => {
    state.currentLeadFilterType = current_lead_filter_id
  },

  removeLeadFromList: (state, removeLead) => {
    let index = -1
    for (let i = 0; i < state.allLeadsList.length; i++) {
      let lead = state.allLeadsList[i]
      if (lead['id'] == removeLead) {
        index = i
        break
      }
    }

    if (index > -1) {
      state.allLeadsList.splice(index, 1)
    }
    // state.allLeadsList = state.allLeadsList.filter(
    //   (item) => item.id !== removeLead.id
    // )
  },

  setAllocatedCompanyDetails: (state, data) => {
    if (data == '') {
      state.allocatedCompanyDetails = []
    }
    state.allocatedCompanyDetails = data
  },

  addCompanyToAllocatedCompanyList: (state, company) => {
    if (state.allocatedCompanyDetails == '') {
      state.allocatedCompanyDetails = [company]
    } else {
      state.allocatedCompanyDetails.push(company)
    }
  },

  removeFromAllocatedCompanyList: (state, removeCompanyId) => {
    state.allocatedCompanyDetails = state.allocatedCompanyDetails.filter(
      (item) => item.id !== removeCompanyId
    )
  },

  setCompaniesToAllocate: (state, data) => {
    if (data == '') {
      state.companiesToAllocate = []
    }
    state.companiesToAllocate = data
  },

  updateShowLeadModal(state, [value, message]) {
    state.alerts.showLeadModal = value
    if (value == false) {
      state.alerts.LeadModalMessage = ''
    } else {
      state.alerts.LeadModalMessage = message
      setTimeout(() => {
        state.alerts.showLeadModal = false
        state.alerts.LeadModalMessage = ''
      }, 3000)
    }
  },

  setLeadSuggestions(state, suggestionData) {
    if (suggestionData == '') {
      state.leadSuggestions = []
    } else {
      state.leadSuggestions = suggestionData
    }
  },
  addLeadSuggestionsToList: (state, suggestion) => {
    state.leadSuggestions.push(suggestion)
  },

  clearAllPreviousLeadData(state) {
    state.alerts.showLeadModal = false
    state.alerts.LeadModalMessage = ''

    state.leadToEdit = ''

    state.statusOfEditingLead = ''

    state.allocatedCompanyDetails = []

    state.companiesToAllocate = []

    state.idOfnewlyCreatedLead = ''
  }
}

const actions = {
  fetchAllLeads({ commit }, data) {
    let loader = Vue.$loading.show({})
    let pageNumber = data.pageNumber
    let leadPerPage = data.leadPerPage
    let offset = data.offset
    let type = data.type
    return axios
      .get(
        `/vendors/lead/all/?page=${pageNumber}&limit=${leadPerPage}&offset=${offset}&type=${type}`
      )
      .then((response) => {
        if (pageNumber == 1) {
          let leadModel_obj_list = []
          for (
            let index = 0;
            index < response.data.data.leads.length;
            index++
          ) {
            let lead_obj = new Lead(response.data.data.leads[index])
            leadModel_obj_list.push(lead_obj)
          }
          commit('setAllLeadsList', leadModel_obj_list)
        } else {
          for (
            let index = 0;
            index < response.data.data.leads.length;
            index++
          ) {
            let lead_obj = new Lead(response.data.data.leads[index])
            commit('addLeadToLeadsList', lead_obj)
          }
        }

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
      })
  },

  fetchLeadsDetails({ commit }, lead_id) {
    let loader = Vue.$loading.show({})
    return axios
      .get(`/vendors/lead/${lead_id}/`)
      .then((response) => {
        let leadDetails_obj = new Lead(response.data.data)
        commit('setLeadDetails', leadDetails_obj)
        loader.hide()
      })
      .catch(function (error) {
        Vue.notify({
          group: 'error',
          type: 'error',
          text: appConstants.API_CATCH_MESSAGE
        })
        loader.hide()
      })
  },
  fetchLeadsDetailsFromEncryptedID({ commit }, lead_id) {
    let loader = Vue.$loading.show({})
    return axios
      .get(`/vendors/lead/details/${lead_id}/`)
      .then((response) => {
        let leadDetails_obj = new Lead(response.data.data)
        commit('setLeadDetails', leadDetails_obj)
        loader.hide()
      })
      .catch(function (error) {
        Vue.notify({
          group: 'error',
          type: 'error',
          text: appConstants.API_CATCH_MESSAGE
        })
        loader.hide()
      })
  },
  fetchLeadsApplicantsDetails({ commit }, data) {
    let loader = Vue.$loading.show({})
    let lead_id = data['lead_id']
    let page = data['page']
    let limit = data['limit']
    let sort_order = data['sort_order']

    return axios
      .get(
        `/vendors/lead/${lead_id}/applicants/?page=${page}&limit=${limit}&sort=${sort_order}`
      )
      .then((response) => {
        if (page == 1) {
          let leadModel_application_list = new CreateApplicationList().getListOfApplicants(
            response.data.data
          )
          commit('setLeadAllApplicants', leadModel_application_list)
        } else {
          let leadModel_application_list = new CreateApplicationList().getListOfApplicants(
            response.data.data
          )

          for (
            let index = 0;
            index < leadModel_application_list.length;
            index++
          ) {
            commit(
              'addLeadApplicationToApplicantsList',
              leadModel_application_list[index]
            )
          }
        }

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
      })
  },
  updateLeadDetails({ commit }, data) {
    let loader = Vue.$loading.show({})
    let id = data.id
    return axios
      .patch(`/vendors/lead/update/${id}/`, data)
      .then((response) => {
        //Not getting status in response so direct set to OPEN
        commit('setStatusOfEditingLead', appConstants.leadStatus.OPEN)
        commit('updateShowLeadModal', [true, response.data.message])
        loader.hide()
      })
      .catch(function (error) {
        commit('updateShowLeadModal', [true, error.response.data.message])
        console.log(error)
        loader.hide()
      })
  },
  createLead({ commit }, data) {
    let loader = Vue.$loading.show({})
    return axios
      .post(`/vendors/lead/`, data)
      .then((response) => {
        //Not getting status in response so direct set to OPEN
        commit('setIdOfnewlyCreatedLead', response.data.data.lead_id)
        commit('setStatusOfEditingLead', appConstants.leadStatus.OPEN)
        commit('updateShowLeadModal', [true, response.data.message])
        loader.hide()
      })
      .catch(function (error) {
        commit('updateShowLeadModal', [true, error.response.data.message])
        console.log(error)
        loader.hide()
      })
  },
  rejectLead({ commit }, data) {
    let loader = Vue.$loading.show({})
    let id = data.id

    return axios
      .patch(`/vendors/lead/reject/${id}/`, data)
      .then(() => {
        //Not getting status in response so direct set to REJECTED
        commit('setStatusOfEditingLead', appConstants.leadStatus.REJECTED)
        commit('updateShowLeadModal', [true, 'Lead Rejected'])

        loader.hide()
        return true
      })
      .catch(function (error) {
        commit('updateShowLeadModal', [true, error.response.data.message])
        console.log(error)
        loader.hide()
        return false
      })
  },
  updateAndApproveLead({ commit }, data) {
    let loader = Vue.$loading.show({})
    let id = data.id
    return axios
      .patch(`/vendors/lead/update/${id}/`, data)
      .then(() => {
        return axios
          .patch(`/vendors/lead/approve/${id}/`)
          .then(() => {
            //Not getting status in response so direct set to APPROVED
            commit('setStatusOfEditingLead', appConstants.leadStatus.APPROVED)
            commit('updateShowLeadModal', [true, 'Lead Approved'])
            loader.hide()
            return true
          })
          .catch(function (error) {
            commit('updateShowLeadModal', [true, error.response.data.message])
            console.log(error)
            loader.hide()
            return false
          })
      })
      .catch(function (error) {
        commit('updateShowLeadModal', [true, error.response.data.message])
        console.log(error)
        loader.hide()
        return false
      })
  },
  fetchAllocatedCompanyDetails({ commit }, data) {
    let loader = Vue.$loading.show({})
    return axios
      .post(`/vendors/companies/`, data)
      .then((response) => {
        commit('setAllocatedCompanyDetails', response.data.data.companies)
        loader.hide()
        return true
      })
      .catch(function (error) {
        commit('setAllocatedCompanyDetails', '')
        commit('updateShowLeadModal', [true, error.response.data.message])
        console.log(error)
        loader.hide()
        return false
      })
  },
  fetchCompaniesToAllocate({ commit }, searchBy) {
    let loader = Vue.$loading.show({})
    return axios
      .get(`/search/vendors/?q=${searchBy}`)
      .then((response) => {
        commit('setCompaniesToAllocate', response.data.data.hits.hits)
        loader.hide()
        return true
      })
      .catch(function (error) {
        commit('setCompaniesToAllocate', '')
        commit('updateShowLeadModal', [true, error.response.data.message])
        console.log(error)
        Vue.notify({
          group: 'error',
          type: 'error',
          text: appConstants.API_CATCH_MESSAGE
        })
        loader.hide()
        return false
      })
  },

  deleteLead({ commit }, data) {
    let loader = Vue.$loading.show({})
    let id = data.id
    return axios
      .delete(`/vendors/lead/${id}/`, data)
      .then(() => {
        commit('removeLeadFromList', data)
        loader.hide()
        return true
      })
      .catch(function (error) {
        Vue.notify({
          group: 'error',
          type: 'error',
          text: appConstants.API_CATCH_MESSAGE
        })
        loader.hide()
        return false
      })
  },
  // lead application API's
  changeLeadApplicationStatus({ commit }, payload) {
    let loader = Vue.$loading.show({})
    let application_id = payload.application_id
    let status = payload.status

    return axios
      .post(`/vendors/lead/application/status/${application_id}/`, payload)
      .then((response) => {
        commit('setStatusOfLeadApplication', [application_id, status])
        // commit('updateShowLeadModal', [true, response.data.message])
        loader.hide()
        return true
      })
      .catch(function (error) {
        commit('updateShowLeadModal', [true, error.response.data.message])
        console.log(error)
        loader.hide()
        return false
      })
  },

  fetchLeadSuggestions({ commit }, data) {
    let loader = Vue.$loading.show({})
    let pageNumber = data.pageNumber
    let limit = data.limit
    let offset = data.offset
    let lead_id = data.lead_id
    // /vendors/lead/recomended/companies/${lead_id}/?page=${pageNumber}&limit=${leadPerPage}&offset=${offset}
    return axios
      .get(
        `/vendors/lead/recomended/companies/${lead_id}/?page=${pageNumber}&limit=${limit}&offset=${offset}`
      )
      .then((response) => {
        if (pageNumber == 1) {
          let lead_comp_suggestions = []
          for (
            let index = 0;
            index < response.data.data.companies.length;
            index++
          ) {
            let comp_obj = new company(response.data.data.companies[index])
            lead_comp_suggestions.push(comp_obj)
          }
          commit('setLeadSuggestions', lead_comp_suggestions)
        } else {
          for (
            let index = 0;
            index < response.data.data.companies.length;
            index++
          ) {
            let comp_obj = new company(response.data.data.companies[index])
            commit('addLeadSuggestionsToList', comp_obj)
          }
        }

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
      })
  },

  editLead({ commit }, EditLeadData) {
    {
      commit('setEditLead', EditLeadData)
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
