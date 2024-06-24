/* eslint-disable no-unused-vars */
import axios from 'axios'
import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import router from '../../../router/index'
import 'vue-loading-overlay/dist/vue-loading.css'
import appConstants from '../../../appConstants.js'
import { Reports } from '../../modelClasses/reportModel.js'
import { JobPricingPlan } from '../../modelClasses/pricingModel'

Vue.use(Loading)

const defaultState = () => {
  return {
    jobDetails: [],
    allJobList: [],
    professionOptions: [],
    levelOptions: [],
    employmentOptions: [],
    sectorOptions: [],
    interestOptions: [],
    jobToEdit: [],
    allApplicants: [],
    singleJobDetails: [],
    alerts: {
      showJobSaveModal: false,
      showJobPublishModal: false
    },
    allCompanyData: [],
    allCompaniesListData: [],
    fieldOfStudyList: [],
    allFieldOfStudyList: [],
    externalJobListData: [],
    expiredJobListData: [],
    draftJobListData: [],
    liveJobListData: [],
    currentJobListButtonValue: '',
    currentJobDetailsButtonValue: '',
    singleApplicantData: '',
    CvImages: [],
    getApplicationStatusResponse: '',
    userContactDetails: '',
    singleJobData: '',
    resumeUrl: '',
    selectedCompany: '',
    applicationReportDetails: '',
    JobPricingPlanData: '',
    ActiveJobPlanData: '',
    JobPricingPlanDataById: '',
    JobPricingPlanBuyNowResponse: '',
    jobExpiryAlerts: {
      showErrorModalUser: false,
      userErrorMessage: ''
    }
  }
}

const state = defaultState()

const getters = {
  getJobDetails: (state) => state.jobDetails,
  getAllJobList: (state) => state.allJobList,
  getProfessionOptions: (state) => state.professionOptions,
  getLevelOptions: (state) => state.levelOptions,
  getEmploymentOptions: (state) => state.employmentOptions,
  getSectorOptions: (state) => state.sectorOptions,
  getInterestOptions: (state) => state.interestOptions,
  getJobToEdit: (state) => state.jobToEdit,
  showJobSaveModal: (state) => state.alerts.showJobSaveModal,
  showJobPublishModal: (state) => state.alerts.showJobPublishModal,
  getApplicants: (state) => state.allApplicants,
  getSingleJobDetails: (state) => state.singleJobDetails,
  allCompaniesJob: (state) => state.allCompanyData,
  allCompaniesList: (state) => state.allCompaniesListData,
  getFieldOfStudy: (state) => state.fieldOfStudyList,
  getAllFieldOfStudy: (state) => state.allFieldOfStudyList,
  getLiveJobList: (state) => state.liveJobListData,
  getDraftJobList: (state) => state.draftJobListData,
  getExpiredJobList: (state) => state.expiredJobListData,
  getExternalJobList: (state) => state.externalJobListData,
  getCurrentJobListButtonValue: (state) => state.currentJobListButtonValue,
  getCurrentJobDetailsButtonValue: (state) =>
    state.currentJobDetailsButtonValue,
  getSingleApplicantData: (state) => state.singleApplicantData,
  getCVImageList: (state) => state.CvImages,
  getApplicationStatus: (state) => state.getApplicationStatusResponse,
  getUserContactDetails: (state) => state.userContactDetails,
  getter_singleJobDetails: (state) => state.singleJobDetails,
  getResumeUrl: (state) => state.resumeUrl,
  getSelectedCompany: (state) => state.selectedCompany,
  getApplicationReportDetails: (state) => state.applicationReportDetails,
  getJobPricingPlanData: (state) => state.JobPricingPlanData,
  getActiveJobPlanData: (state) => state.ActiveJobPlanData,
  getJobPricingPlanDataById: (state) => state.JobPricingPlanDataById,
  getJobPricingPlanBuyNowResponse: (state) =>
    state.JobPricingPlanBuyNowResponse,
  showJobErrorModalUser: (state) => state.jobExpiryAlerts.showErrorModalUser,
  jobapiUserErrorMessage: (state) => state.jobExpiryAlerts.userErrorMessage
}
const mutations = {
  setJobDetails: (state, jobDetailsData) => {
    state.jobDetails = jobDetailsData
  },
  setAllJobList: (state, allJobListData) => {
    state.allJobList = allJobListData
  },
  setExternalJobList: (state, externalJobsData) => {
    state.externalJobListData = externalJobsData
  },
  setExpiredJobList: (state, expiredJobsData) => {
    state.expiredJobListData = expiredJobsData
  },
  setDraftJobList: (state, draftJobsData) => {
    state.draftJobListData = draftJobsData
  },
  setLiveJobList: (state, liveJobsData) => {
    state.liveJobListData = liveJobsData
  },
  setProfessionOptions: (state, professionOptionsData) => {
    state.professionOptions = professionOptionsData
  },
  setLevelOptions: (state, levelOptionsData) => {
    state.levelOptions = levelOptionsData
  },
  setEmploymentOptions: (state, employmentOptionsData) => {
    state.employmentOptions = employmentOptionsData
  },
  setSectorOptions: (state, sectorOptionsData) => {
    state.sectorOptions = sectorOptionsData
  },
  setInterestOptions: (state, interestOptionsData) => {
    state.interestOptions = interestOptionsData
  },
  addJobToJobList: (state, job) => {
    state.allJobList.push(job)
  },
  addJobToExternalJobList: (state, job) => {
    state.externalJobListData.push(job)
  },
  addJobToLiveJobList: (state, job) => {
    state.liveJobListData.push(job)
  },
  addJobToDraftJobList: (state, job) => {
    state.draftJobListData.push(job)
  },
  addJobToExpiredJobList: (state, job) => {
    state.expiredJobListData.push(job)
  },
  removeJobFromList: (state, removeJobId) => {
    state.allJobList = state.allJobList.filter(
      (item) => item.id !== removeJobId.id
    )
  },
  setEditJob: (state, editJob) => {
    state.jobToEdit = editJob
  },
  setShowJobSaveModal: (state, showJobSaveModalValue) => {
    state.alerts.showJobSaveModal = showJobSaveModalValue
  },
  setShowJobPublishModal: (state, ShowJobPublishModalValue) => {
    state.alerts.showJobPublishModal = ShowJobPublishModalValue
  },
  updateShowJobSaveModal: (state) => {
    state.alerts.showJobSaveModal = true
    setTimeout(() => {
      state.alerts.showJobSaveModal = false
    }, 3000)
  },
  updateShowJobPublishModal: (state) => {
    state.alerts.showJobPublishModal = true
    setTimeout(() => {
      state.alerts.showJobPublishModal = false
    }, 2000)
  },
  setClosedJob: (state, data) => {
    state.jobToEdit = data
  },
  setApplicants: (state, applicants) => {
    //console.log('applicants', applicants)
    if (applicants.length == 0) {
      state.allApplicants = []
      return
    }
    state.allApplicants = []
    for (let app of applicants.applicants) {
      let applicantsArray = {
        applicant_details: [],
        user_details: []
      }
      let res = applicants.users.filter((u) => u.id == app.applicant)

      applicantsArray.applicant_details = app
      applicantsArray.user_details = res
      state.allApplicants.push(applicantsArray)
    }
    // console.log('res', state.allApplicants)
  },
  addApplicantToList: (state, applicant) => {
    //console.log('applicant', applicant)
    state.allApplicants.push(applicant)
    // console.log('state.allApplicants', state.allApplicants)
  },
  setSingleJobDetails: (state, singleJob) => {
    state.singleJobDetails = []
    state.singleJobDetails = singleJob
  },
  setCompanies: (state, companies) => {
    state.allCompanyData = []
    state.allCompanyData = companies
  },
  setCompaniesList: (state, companies) => {
    state.allCompaniesListData = []
    state.allCompaniesListData = companies
  },
  setFieldOfStudyList: (state, data) => {
    let objArray = []
    if (data) {
      for (let i = 0; i < data.length; i++) {
        let obj = {
          id: data[i]._id,
          name: data[i]._source.field_of_study,
          is_verified: data[i]._source.is_verified
        }
        objArray.push(obj)
      }
    }
    state.fieldOfStudyList = objArray
  },
  setAllFieldOfStudyList: (state, data) => {
    let objArray = []
    if (data) {
      for (let i = 0; i < data.length; i++) {
        let obj = {
          id: data[i]._source.id,
          display_string: data[i]._source.field_of_study,
          is_listed: data[i]._source.is_listed,
          is_denied: data[i]._source.is_denied
        }
        objArray.push(obj)
      }
    }
    state.allFieldOfStudyList = objArray
  },
  setCurrentJobListButtonValue: (state, data) => {
    state.currentJobListButtonValue = data
  },
  setCurrentJobDetailsButtonValue: (state, data) => {
    state.currentJobDetailsButtonValue = data
  },
  setSingleApplicantData: (state, data) => {
    state.singleApplicantData = ''
    state.singleApplicantData = data
  },
  setCvImages: (state, data) => {
    state.CvImages = []
    state.CvImages = data
  },
  setApplicationStatus: (state, data) => {
    // state.allApplicants.find((option) => {
    //   if (option.applicant_details.id == data.id) {
    //     option.applicant_details.application_status = data.application_status
    //     //console.log('option', option)
    //   }
    // })
    state.singleApplicantData.applicant_details.application_status =
      data.application_status
    state.getApplicationStatusResponse = data
  },
  setUserContactDetails: (state, data) => {
    state.userContactDetails = data
  },
  commit_singleJobDetails: (state, data) => {
    state.singleJobDetails = data
  },
  commit_resumeUrl: (state, data) => {
    state.resumeUrl = data
  },
  setSelectedCompany: (state, company) => {
    state.selectedCompany = company
  },
  setApplcationReportOfJob: (state, data) => {
    if (data.length == 0) {
      state.applicationReportDetails = []
      return
    }
    state.applicationReportDetails = []

    for (let app of data) {
      let app_object = new Reports(app)
      state.applicationReportDetails.push(app_object)
    }
  },
  setJobPricingPlanData: (state, data) => {
    if (data.length == 0) {
      state.JobPricingPlanData = []
      return
    }
    state.JobPricingPlanData = []
    let newArr = []
    var arr = data.find(
      (x) => x.plan_code == appConstants.pricing_plan_job.FREE
    )
    for (let newData of data) {
      let new_obj = new JobPricingPlan(newData)
      newArr.push(new_obj)
    }
    state.JobPricingPlanData = newArr.reverse()
  },
  setActiveJobPlanData: (state, data) => {
    state.ActiveJobPlanData = data
  },
  setJobPricingPlanDataById: (state, data) => {
    state.JobPricingPlanDataById = data
  },
  setJobPricingPlanBuyNowResponse: (state, data) => {
    state.JobPricingPlanBuyNowResponse = data
  },
  setJobPostingBalanceExpire: (state, data) => {
    state.jobExpiryAlerts.showErrorModalUser = data.showModal
    state.jobExpiryAlerts.userErrorMessage = data.userErrorMessage
  },
  setJobErrorMsgToFalse: (state, errorMessage) => {
    state.jobExpiryAlerts.showErrorModalUser = errorMessage
    if (errorMessage == false) {
      state.jobExpiryAlerts.userErrorMessage = ''
    }
  },
  reset_job(state) {
    Object.assign(state, defaultState())
  }
}

const actions = {
  saveJobDetails({ commit }, data) {
    let loader = Vue.$loading.show({})
    //console.log('Data to save saveJobDetails')
    //console.log(data)
    return new Promise((resolve, reject) => {
      axios
        .post(`/vendors/jobs/`, data)
        .then(function (response) {
          console.log(response)
          commit('setJobDetails', response.data.data)
          // commit('updateShowJobSaveModal')
          loader.hide()
          resolve(response.data.data)
          return true
        })
        .catch(function (error) {
          // if (!error.response.data.data.canPostJob) {
          //   commit('setJobPostingBalanceExpire', {
          //     showModal: true,
          //     userErrorMessage: error.response.data.message
          //   })
          // } else {
          //   console.log(error)
          // }
          console.log(error)
          loader.hide()
          reject()
          return false
        })
    })
  },
  publishJob({ commit }, id) {
    let loader = Vue.$loading.show({})
    //  let id = data.id
    return axios
      .post(`/vendors/jobs/${id}/mark_published/`)

      .then((response) => {
        // console.log(response.data)
        commit('setJobDetails', response.data.data)
        commit('updateShowJobPublishModal')
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
        loader.hide()
        return false
      })
  },
  // saveAndPublishJob({ commit }, data) {
  //   let loader = Vue.$loading.show({})
  //   return axios
  //     .post(`/vendors/jobs/`, data)
  //     .then((firstResponse) => {
  //       console.log('firstResponse.data.data', firstResponse.data.data)
  //       let id = firstResponse.data.data.id
  //       return axios
  //         .post(`/vendors/jobs/${id}/mark_published/`)

  //         .then((secondResponse) => {
  //           console.log(secondResponse.data)
  //           commit('setJobDetails', secondResponse.data.data)
  //           commit('updateShowJobPublishModal')
  //           setTimeout(() => {
  //             router.push({
  //               //name: 'jobList'
  //               name: appConstants.routes.JOB
  //             })
  //           }, 2500)
  //           loader.hide()
  //           return true
  //         })
  //         .catch(function (error) {
  //           if (!error.response.data.data.canPostJob) {
  //             commit('setJobPostingBalanceExpire', {
  //               showModal: true,
  //               userErrorMessage: error.response.data.message
  //             })
  //           } else {
  //             console.log(error)
  //           }
  //           //console.log(error)
  //           loader.hide()
  //           return false
  //         })
  //     })
  //     .catch(function (error) {
  //       console.log(error.response)

  //       loader.hide()
  //       return false
  //     })
  // },

  getJobData({ commit }, id) {
    let loader = Vue.$loading.show({})
    return axios
      .get(`/vendors/jobs/${id}/`)
      .then((response) => {
        commit('setJobDetails', response.data.data)
        loader.hide()
        return true
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
        return false
      })
  },

  updateJobDetails({ commit }, data) {
    let loader = Vue.$loading.show({})
    // console.log('Data to update  updateJobDetails')
    // console.log(data)
    let id = data.id
    delete data.id
    return axios
      .patch(`/vendors/jobs/${id}/update/`, data)
      .then((secondResponse) => {
        commit('setJobDetails', secondResponse.data.data)
        commit('updateShowJobSaveModal')
        //console.log('responce on Data updates')
        //console.log(secondResponse.data.data)
        loader.hide()
        return true
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
        return false
      })
  },

  updateAndPublishJob({ commit }, data) {
    let loader = Vue.$loading.show({})
    let id = data.id
    delete data.id
    return axios
      .patch(`/vendors/jobs/${id}/update/`, data)
      .then((firstResponse) => {
        return axios
          .post(`/vendors/jobs/${id}/mark_published/`)
          .then((secondResponse) => {
            commit('setJobDetails', secondResponse.data.data)
            commit('updateShowJobPublishModal')
            setTimeout(() => {
              router.push({
                // name: 'jobList'
                name: appConstants.routes.JOB
              })
            }, 2500)
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
            console.log(error)
            loader.hide()
            return false
          })
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
        return false
      })
  },

  getAllJobs({ commit }, data) {
    let loader = Vue.$loading.show({})
    let pageNumber = data.pageNumber
    let jobPerPage = data.jobPerPage
    let offset = data.offset
    let type = data.type
    let company = data.companyId
    return axios
      .get(
        `/vendors/jobs/all/?page=${pageNumber}&limit=${jobPerPage}&offset=${offset}&type=${type}&company_id=${company}`
      )
      .then((response) => {
        if (pageNumber == 1) {
          //console.log('job list', response.data.data.jobs)
          commit('setAllJobList', response.data.data.jobs)
        } else {
          for (let index = 0; index < response.data.data.jobs.length; index++) {
            commit('addJobToJobList', response.data.data.jobs[index])
          }
        }
        loader.hide()
        return response.data.data.next
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
      })
  },

  fetchJobBySearchText({ commit }, searchText) {
    let loader = Vue.$loading.show({})
    return axios
      .get(`/vendors/jobs/search/?q=${searchText}`)
      .then((response) => {
        commit('setAllJobList', response.data.data)
        loader.hide()
        return response.data.data.next
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
      })
  },

  deleteJob({ commit }, data) {
    let loader = Vue.$loading.show({})
    let id = data.id
    return axios
      .delete(`/vendors/jobs/${id}/`, data)
      .then((response) => {
        commit('removeJobFromList', data)
        loader.hide()
        return true
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
        return false
      })
  },

  fetchProfessionData({ commit }) {
    let loader = Vue.$loading.show({})
    return axios
      .get(`/search/newprofessions/`)
      .then((response) => {
        let data = response.data.data.hits.hits
        let objArray = []
        if (data) {
          for (let i = 0; i < data.length; i++) {
            let obj = {
              id: data[i]._id,
              display_string: data[i]._source.profession_name
            }
            objArray.push(obj)
          }
        }
        commit('setProfessionOptions', objArray)
        loader.hide()
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
      })
  },

  fetchLevelData({ commit }) {
    //let loader = Vue.$loading.show({})
    return axios
      .get(`/vendors/jobs/levels/`)
      .then((response) => {
        commit('setLevelOptions', response.data.data)
        // loader.hide()
      })
      .catch(function (error) {
        console.log(error)
        //  loader.hide()
      })
  },

  fetchEmploymentData({ commit }) {
    //let loader = Vue.$loading.show({})
    return axios
      .get(`/vendors/jobs/emp_types/`)
      .then((response) => {
        commit('setEmploymentOptions', response.data.data)
        // loader.hide()
      })
      .catch(function (error) {
        console.log(error)
        // loader.hide()
      })
  },
  fetchSectorData({ commit }) {
    let loader = Vue.$loading.show({})
    return axios
      .get(`/search/sectors/`)
      .then((response) => {
        let data = response.data.data.hits.hits
        let objArray = []
        if (data) {
          for (let i = 0; i < data.length; i++) {
            let obj = {
              id: data[i]._id,
              display_string: data[i]._source.display_string
            }
            objArray.push(obj)
          }
        }
        commit('setSectorOptions', objArray)
        loader.hide()
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
      })
  },
  fetchInterestsData({ commit }) {
    //let loader = Vue.$loading.show({})
    return axios
      .get(`/users/interests/`)
      .then((response) => {
        commit('setInterestOptions', response.data)
        // loader.hide()
      })
      .catch(function (error) {
        console.log(error)
        // loader.hide()
      })
  },
  editJob({ commit }, EditJobData) {
    {
      //console.log('EditJobData', EditJobData)
      commit('setEditJob', EditJobData)
    }
  },
  closeJob({ commit }, jobId) {
    let loader = Vue.$loading.show({})
    // let id = data.id
    return axios
      .post(`/vendors/jobs/${jobId}/expire/`)
      .then((response) => {
        commit('setClosedJob', response.data.data)
        setTimeout(() => {
          router.push({
            // name: 'jobList'
            name: appConstants.routes.JOB
          })
        }, 2500)
        loader.hide()
        return true
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
        return false
      })
  },
  fetchApplicants({ commit }, data) {
    let loader = Vue.$loading.show({})
    let pageNumber = data.pageNumber
    let jobPerPage = data.jobPerPage
    let offset = data.offset
    let sort = data.sort
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      await axios
        .get(
          `/vendors/jobs/${data.jobId}/applicants/?page=${pageNumber}&limit=${jobPerPage}&offset=${offset}&sort=${sort}`
        )
        .then((response) => {
          if (pageNumber == 1) {
            let obj = {
              applicants: response.data.data.applicants,
              users: response.data.data.users.users
            }
            commit('setApplicants', obj)
          } else {
            for (
              let index = 0;
              index < response.data.data.applicants.length;
              index++
            ) {
              let applicantsArray = {
                applicant_details: [],
                user_details: []
              }
              let res = response.data.data.users.users.filter(
                (u) => u.id == response.data.data.applicants[index].applicant
              )

              applicantsArray.applicant_details =
                response.data.data.applicants[index]
              applicantsArray.user_details = res
              // }
              commit('addApplicantToList', applicantsArray)
            }
          }
          //commit('setApplicants', response.data.data)
          resolve(response.data.data.next)
          loader.hide()

          //return response.data.data.next
        })
        .catch(function (error) {
          console.log(error)

          loader.hide()
          reject(error)
        })
    })
  },
  saveSingleJobDetails({ commit }, jobData) {
    {
      commit('setSingleJobDetails', jobData)
    }
  },
  fetchPDFFile({ commit }, urldata) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios({
        method: 'POST',
        url: '/vendors/jobs/download_cv/',
        data: urldata,
        responseType: 'blob'
      })
        .then((response) => {
          loader.hide()
          resolve(response.data)
        })
        .catch(function (error) {
          console.log(error)
          loader.hide()
          reject()
        })
    })
  },
  fetchOnlyusersCompanies({ commit }) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .get('/vendors/company/all/') //only user companies
        //.get('/vendors/company/all/')
        .then(function (response) {
          const result = response.data
          commit('setCompanies', result.data)
          loader.hide()
          resolve()
        })
        .catch(function (error) {
          // console.log('fetchOnlyusersCompanies : ' + error)
          // if (error.response) {
          //   reject(error.response.data.message)
          // } else {
          //   reject('Something went wrong')
          // }
          loader.hide()
          reject()
        })
    })
  },
  searchCompanies({ commit }, searchText) {
    //console.log('Showing the searchtext here again: ' + searchText)
    // let loader = Vue.$loading.show({})
    axios
      .get(`/vendors/adminsearch/?q=${searchText}`)
      .then(function (response) {
        const result = response.data
        // console.log('Result data: ' + result.data)
        commit('setCompaniesList', result.data)

        // loader.hide()
      })
      .catch(function (error) {
        console.log(error.response.data)
        commit('setError', error)
        //loader.hide()
      })
  },
  fetchFieldOfStudyList({ commit }, searchText) {
    //console.log('Showing the searchtext here again: ' + searchText)
    // let loader = Vue.$loading.show({})
    axios
      .get(`/search/fieldofstudy/?q=${searchText}`)
      .then(function (response) {
        const result = response.data
        // console.log('Result data: ' + result.data)
        commit('setFieldOfStudyList', result.data.hits.hits)

        // loader.hide()
      })
      .catch(function (error) {
        console.log(error.response.data)
        commit('setError', error)
        //loader.hide()
      })
  },
  fetchAllFieldOfStudyList({ commit }, searchText) {
    //console.log('Showing the searchtext here again: ' + searchText)
    // let loader = Vue.$loading.show({})
    axios
      .get(`/search/fieldofstudy/`)
      .then(function (response) {
        const result = response.data
        // console.log('Result data: ' + result.data)
        commit('setAllFieldOfStudyList', result.data.hits.hits)

        // loader.hide()
      })
      .catch(function (error) {
        console.log(error.response.data)
        commit('setError', error)
        //loader.hide()
      })
  },

  saveCurrentJobListButtonValue({ commit }, data) {
    {
      commit('setCurrentJobListButtonValue', data)
    }
  },
  saveCurrentJobDetailsButtonValue({ commit }, data) {
    {
      commit('setCurrentJobDetailsButtonValue', data)
    }
  },
  saveSingleApplicantData({ commit }, data) {
    commit('setSingleApplicantData', data)
  },
  fetchCvImages({ commit }, data) {
    //console.log('Showing the searchtext here again: ' + searchText)
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .get(
          `/users/create_resume_image/?resume_file=${data.cvFile}&application_id=${data.application_id}`
        )
        .then(function (response) {
          const result = response.data
          commit('setCvImages', result.data)
          loader.hide()
          resolve()
        })
        .catch(function (error) {
          console.log(error.response.data)
          commit('setError', error)
          loader.hide()
          reject(error)
        })
    })
  },
  saveApplicationStatus({ commit }, data) {
    let obj = {
      status: data.status
    }
    let loader = Vue.$loading.show({})
    axios
      .post(
        `/vendors/jobs/application/updatestatus/${data.application_id}/`,
        obj
      )
      .then(function (response) {
        const result = response.data
        // console.log('Result data: ' + result.data)
        commit('setApplicationStatus', result.data)

        loader.hide()
      })
      .catch(function (error) {
        console.log(error.response.data)
        commit('setError', error)
        loader.hide()
      })
  },
  fetchUserContactDetails({ commit }, userid) {
    let loader = Vue.$loading.show({})
    axios
      .get(`/olous_user/cv_contact_info/${userid}/`)
      .then(function (response) {
        const result = response.data
        // console.log('Result data: ' + result.data)
        commit('setUserContactDetails', result.data)

        loader.hide()
      })
      .catch(function (error) {
        console.log(error.response.data)
        commit('setError', error)
        loader.hide()
      })
  },
  fetchSingleJobDetails({ commit }, jobid) {
    let loader = Vue.$loading.show({})
    axios
      .get(`/vendors/jobs/${jobid}/`)
      .then(function (response) {
        const result = response.data
        // console.log('Result data: ' + result.data)
        commit('commit_singleJobDetails', result.data)

        loader.hide()
      })
      .catch(function (error) {
        console.log(error.response.data)
        commit('setError', error)
        loader.hide()
      })
  },
  fetchUserResumeUrl({ commit }, jobid) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .get(`/vendors/jobs/application/share/${jobid}/`)
        .then(function (response) {
          const result = response.data
          // console.log('Result data: ' + result.data)
          commit('commit_resumeUrl', result.data)

          loader.hide()
          resolve()
        })
        .catch(function (error) {
          console.log(error.response.data)
          //commit('setError', error)
          loader.hide()
          reject()
        })
    })
  },
  saveSelectedCompany({ commit }, company) {
    {
      commit('setSelectedCompany', company)
    }
  },
  getAllJobsByCompany({ commit }, data) {
    // console.log('data', data)
    let loader = Vue.$loading.show({})
    let pageNumber = data.pageNumber
    let jobPerPage = data.jobPerPage
    let offset = data.offset
    let companyId = data.companyId
    let jobFilter = data.type
    return axios
      .get(
        `vendors/jobs/company/list/?filter=${jobFilter}&page=${pageNumber}&limit=${jobPerPage}&offset=${offset}&company_id=${companyId}`
      )

      .then((response) => {
        if (pageNumber == 1) {
          commit('setAllJobList', response.data.data.jobs)
        } else {
          for (let index = 0; index < response.data.data.jobs.length; index++) {
            commit('addJobToJobList', response.data.data.jobs[index])
          }
        }
        loader.hide()
        return response.data.data.next
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
      })
  },
  fetchCVReportDetails({ commit }, data) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .get(`/vendors/jobs/applicationreport/${data}/`)

        .then((response) => {
          commit('setApplcationReportOfJob', response.data.data)
          resolve()
          loader.hide()
        })
        .catch(function (error) {
          console.log(error)
          reject()
          loader.hide()
        })
    })
  },
  fetchJobPricingPlanData({ commit }) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .get(`/vendors/business/jobplans/`)

        .then((response) => {
          commit('setJobPricingPlanData', response.data.data)
          resolve()
          loader.hide()
        })
        .catch(function (error) {
          console.log(error)
          reject()
          loader.hide()
        })
    })
  },
  fetchActiveJobPlanData({ commit }, companyid) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .get(`/vendors/business/activejobplan/${companyid}/`)

        .then((response) => {
          commit('setActiveJobPlanData', response.data.data)
          resolve()
          loader.hide()
        })
        .catch(function (error) {
          console.log(error)
          reject()
          loader.hide()
        })
    })
  },
  fetchJobPricingPlanById({ commit }, planId) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .get(`/vendors/business/jobplan/plan_id/${planId}`)
        .then((response) => {
          commit('setJobPricingPlanDataById', response.data.data)
          resolve()
          loader.hide()
        })
        .catch(function (error) {
          console.log(error)
          reject()
          loader.hide()
        })
    })
  },
  jobPricingPlanBuyNow({ commit }, data) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .post(`/vendors/order_new/jobplan/`, data)
        .then((response) => {
          commit('setJobPricingPlanBuyNowResponse', response.data.data)
          resolve(response.data.data)
          loader.hide()
        })
        .catch(function (error) {
          console.log(error)
          reject()
          loader.hide()
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
