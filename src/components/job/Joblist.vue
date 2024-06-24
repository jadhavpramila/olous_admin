<template>
  <div class="">
    <div class="form-conatiner cls-joblist">
      <!-- <div class="row page-header highlight-text">
        <div class="btn-wrapper col-12 text-right">

          <button
            type="button"
            class="btn btn-dark"
              @click="goToHomePage">Back
          </button>
        </div>
      </div> -->
      <div
        class="joblist-container"
        v-if="!(allCompanies.length == 0 && !userData.is_admin)"
      >
        <div class="joblist-item joblist-first-item">
          <!-- <div class="d-flex flex-column" v-if="!userData.is_admin">
             <div class="mb-3 d-flex row">
             <div class="col-12 col-md-9 search-bar" v-if="userData.is_admin">
                <div class="d-flex w-100 justify-content-end">
                  <input
                    type="text"
                    class="bg-white input-lg w-100"
                    v-model="searchFor"
                  />
                  <button
                    type=""
                    class="d-flex justify-content-center align-items-center"
                    @click="searchClick"
                  >
                    <i
                      class="fa fa-search"
                      aria-hidden="true"
                      style="color: #000"
                    ></i>
                  </button>
                  <div class="job-filter" @click="showFilter()">
                     <img src="../../assets/img/">
                    <i class="fa fa-filter" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
              <div class="col-md-9">
                <div class="form-group">
                  <v-select
                    v-model="selectedCompany"
                    label="name"
                    :options="companyList"
                    @input="getCompany"
                    :reduce="(company) => company.id"
                    placeholder="Select Company"
                    class="form-control single-value cursor-pointer show-dropdown-icon"
                    :clearable="false"
                  >
                  </v-select>
                </div>
              </div>
            </div>

          </div>-->

          <div class="">
            <div class="d-flex align-items-center job-list-titles">
              <div class="col-md-7 d-flex p-0">
                <div class="align-items-end d-flex">
                  <ul
                    class="d-flex pl-0 mb-0 align-items-center"
                    style="list-style: none"
                  >
                    <li class="mr-3 cursor-pointer">
                      <span
                        class="company-tab"
                        @click="clickLive"
                        :class="{
                          'company-tab-active':
                            getCurrentJobListButtonValue.isLive
                        }"
                      >
                        Live
                      </span>
                    </li>
                    <li class="ml-1 mr-3 cursor-pointer">
                      <span
                        class="company-tab"
                        @click="clickDraft"
                        :class="{
                          'company-tab-active':
                            getCurrentJobListButtonValue.isDraft
                        }"
                      >
                        Draft
                      </span>
                    </li>
                    <li class="ml-1 mr-3 cursor-pointer">
                      <span
                        class="company-tab"
                        @click="clickExpired"
                        :class="{
                          'company-tab-active':
                            getCurrentJobListButtonValue.isExpired
                        }"
                      >
                        Expired
                      </span>
                    </li>
                    <li
                      class="ml-1 mr-3 cursor-pointer"
                      v-if="userData.is_admin"
                    >
                      <span
                        class="company-tab"
                        @click="clickExternal"
                        :class="{
                          'company-tab-active':
                            getCurrentJobListButtonValue.isExternal
                        }"
                      >
                        External
                      </span>
                    </li>
                    <li
                      class="ml-1 mr-3 cursor-pointer"
                      v-if="userData.is_admin"
                    >
                      <span
                        class="company-tab"
                        @click="clickCompanyJobs"
                        :class="{
                          'company-tab-active':
                            getCurrentJobListButtonValue.isCompanyJobs
                        }"
                      >
                        Companies
                      </span>
                    </li>
                  </ul>
                </div>
                <!-- <div class="col-md-4 mt-1 pr-0">
                <span
                  class="cursor-pointer align-items-center btn-dark d-flex float-right font-weight-bold fontSize14 justify-content-center mt-1 py-1 px-2 rounded-lg"
                  @click="createNewJob"
                >
                  <img
                    src="../../assets/img/Job-Plus-Icon.svg"
                    alt="JobAdd"
                    class="mr-2 w-25"
                  />
                  Add Job
                </span>
              </div> -->
              </div>
              <div
                class="col-md-5 pr-1 d-flex h-100 justify-content-end"
                v-if="!userData.is_admin && getActiveJobPlanData"
              >
                <!-- <div
                  class="d-flex flex-column justify-content-center align-items-end"
                  v-if="getActiveJobPlanData.is_plan_active"
                >
                  <span class="text-white fontSize12"
                    >Job Posting Balance : &nbsp; Posted
                    {{ getActiveJobPlanData.jobs_posted }} | Balance
                    {{ getJobBalance(getActiveJobPlanData) }}
                  </span>
                  {{ getActiveJobPlanData.plan_code }}
                  <span
                    v-if="getActiveJobPlanData.plan_code != jobPricingPlan.FREE"
                    class="fontSize12 font-weight-600 text-orange"
                    >Expiry:
                    {{
                      getPlanExpiryDate(getActiveJobPlanData.expires_at)
                    }}</span
                  >
                </div>
                <div v-else class="align-items-center d-flex">
                  <span class="fontSize12 text-white"
                    >Your plan is expired</span
                  >
                  <span class="premium-button ml-2" @click="goToPricingPage">
                    <img
                      src="../../assets/img/Upgrade.svg"
                      alt="premium"
                      class="mr-1"
                    />
                    Buy Now</span
                  >
                </div> -->

                <!-- <div class="premium-card" v-if="isShowPremiumPopup">
                  <div class="d-flex flex-column">
                    <span class="premium-title">{{
                      getActiveJobPlanData.plan_name
                    }}</span>
                    <span class="premium-text pt-2">Job Posting Balance:</span>
                    <span class="premium-text"
                      >Posted {{ getActiveJobPlanData.jobs_posted }} | Balance
                      {{ getJobBalance(getActiveJobPlanData) }}</span
                    >
                    <span class="hr-line mt-2 mb-2"></span>
                    <span class="premium-text">Status: Subscribed</span>
                    <span class="premium-text text-danger"
                      >Expiry:
                      {{
                        getPlanExpiryDate(getActiveJobPlanData.expires_at)
                      }}</span
                    >
                    <span class="hr-line mt-2 mb-3"></span>
                    <div class="d-flex">
                      <span class="premium-button"> Buy Now </span>
                    </div>
                  </div>
                </div> -->
              </div>
            </div>

            <div
              v-infinite-scroll="getAllJobsList"
              infinite-scroll-disabled="busy"
              infinite-scroll-distance="80"
              class=""
            >
              <div
                class="row ml-0 mt-4"
                style="
                  column-width: 264.5px !important;
                  column-gap: 20px !important;
                "
              >
                <div class="p-0" v-if="getCurrentJobListButtonValue.isLive">
                  <JobCardComponentVue
                    :jobData="null"
                    :jobPlanDetails="jobPlanDetails"
                    :type="componentDataType.JOB"
                  ></JobCardComponentVue>
                </div>
                <div
                  class="p-0"
                  v-for="(job, counter) in getAllJobList"
                  :key="counter"
                >
                  <JobCardComponentVue
                    :jobData="job"
                    :type="componentDataType.JOB"
                  ></JobCardComponentVue>
                </div>
              </div>
            </div>
          </div>
          <div v-if="getAllJobList.length == 0">No record found</div>
        </div>
      </div>
      <div v-else>You dont have company, please create company first</div>
      <!-- <template>
        <b-modal ref="filter-modal" hide-footer hide-header>
          <div class="">
            <div class="job-filter-container">
              <div class="d-flex p-3">
                <div class="client-logo">
                  <span class="circle">PJ </span>
                </div>
                <div class="d-flex flex-column ml-2">
                  <span class="fontSize14 font-weight-700">Pramila Jadhav</span>
                  <span class="fontSize12 font-weight-400"
                    >Front End Developer</span
                  >
                </div>
              </div>
              <div class="d-flex flex-column p-3">
                <span class="fontSize15 w-100 font-weight-600 border-bottom"
                  >Filter</span
                >

                <b-dropdown
                  size="sm"
                  variant="link"
                  toggle-class="text-decoration-none"
                  class="filter-dropdown mt-3 border-bottom"
                  style="color: #000 !important"
                >
                  <template #button-content> Select Employment </template>
                  <b-dropdown-item
                    href="#"
                    v-for="item in getEmploymentOptions"
                    :value="item.id"
                    :key="item.id"
                    >{{ item.employment_type }}</b-dropdown-item
                  >
                </b-dropdown>
              </div>
            </div>
          </div>

          <b-button
            class="mt-3 ml-3"
            variant="outline-dark"
            @click="hideFilterModal"
            >Apply</b-button
          >
        </b-modal>
      </template> -->
    </div>
    <modal v-if="showDeleteModal" @closeModal="hideDeleteConfirmationModal">
      <div slot="body">Do you really want to delete this job?</div>
      <div slot="footer">
        <b-button
          class="btn"
          variant="outline-dark"
          @click="hideDeleteConfirmationModal"
        >
          Cancel
        </b-button>
        <b-button class="ml-2 btn" variant="outline-dark" @click="jobdelete">
          OK
        </b-button>
      </div>
    </modal>

    <template>
      <b-modal
        :visible="isShowEditJob"
        size="sm"
        ref="image-modal"
        hide-footer
        @close="closeEditJob"
        :centered="true"
      >
        <div class="d-block">
          <p>You are not allowed to Edit this Job</p>
        </div>
        <b-button
          class="mt-3 ml-3 btn"
          variant="outline-dark"
          @click="closeEditJob"
          >OK</b-button
        >
      </b-modal>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import moment from 'moment'
import appConstants from '../../appConstants.js'
import modal from '../../common/Modal'
import JobCardComponentVue from './JobComponent/JobCardComponent.vue'
import '../../assets/css/appcolor.css'
export default {
  name: 'Joblist',
  components: {
    modal,
    JobCardComponentVue
  },
  data() {
    return {
      jobs: [],
      currentPage: 0,
      hasMoreJobs: 1,
      deleteJobId: '',
      busy: false,
      showDeleteModal: false,
      isShowEditJob: false,
      jobType: appConstants.job_type,
      job_type: 1,
      isAll: false,
      isLive: true,
      isDraft: false,
      isExpired: false,
      isExternal: false,
      isCompanyJobs: false,
      searchFor: '',
      employment: '',
      isShowFilter: false,
      companyList: [],
      selectedCompany: '',
      componentDataType: appConstants.component_data_type,
      isShowPremiumPopup: false,
      jobPricingPlan: appConstants.pricing_plan_job,
      jobPlanDetails: ''
    }
  },

  computed: {
    ...mapGetters([
      'getAllJobList',
      'getEmploymentOptions',
      'getLiveJobList',
      'getDraftJobList',
      'getExpiredJobList',
      'getExternalJobList',
      'getCurrentJobListButtonValue',
      'userData',
      'getter_userAccessPermission',
      'allCompanies',
      'getSelectedCompany',
      'getActiveJobPlanData',
      'getJobPricingPlanData'
    ])
  },
  methods: {
    ...mapMutations('dropdownValues', ['setSoftwareListwithId']),
    ...mapActions([
      'getAllJobs',
      'deleteJob',
      'editJob',
      'fetchJobBySearchText',
      'saveSingleJobDetails',
      'getLiveJobs',
      'getDraftJobs',
      'getExpiredJobs',
      'getExternalJobs',
      'saveCurrentJobListButtonValue',
      'fetchCompanies',
      'saveSelectedCompany',
      'getAllJobsByCompany',
      'fetchActiveJobPlanData',
      'fetchJobPricingPlanData'
    ]),
    ...mapActions('dropdownValues', [
      'fetchLanguages',
      'fetchSoftwareList',
      'fetchProfessionData',
      'fetchSectorData',
      'fetchLevelOfStudyForJob'
    ]),
    ...mapActions([
      'fetchLevelData',
      'fetchEmploymentData',
      'fetchInterestsData',
      'fetchAllFieldOfStudyList'
    ]),
    goToHomePage() {
      // this.$router.push({ name: 'home' })
      this.$router.push({ name: appConstants.routes.HOME })
    },
    createNewJob() {
      // this.$router.push({ name: 'createJob' })
      this.$router.push({ name: appConstants.routes.CREATE_JOB })
    },
    showFilter() {
      this.$refs['filter-modal'].show()
    },
    hideFilterModal() {
      this.$refs['filter-modal'].hide()
    },
    clickLive() {
      this.currentPage = 0
      this.hasMoreJobs = 1
      this.getCurrentJobListButtonValue.job_type = this.jobType.LIVE
      this.getCurrentJobListButtonValue.isDraft = false
      this.getCurrentJobListButtonValue.isLive = true
      this.getCurrentJobListButtonValue.isExpired = false
      this.getCurrentJobListButtonValue.isAll = false
      this.getCurrentJobListButtonValue.isExternal = false
      this.getCurrentJobListButtonValue.isCompanyJobs = false
      this.getAllJobsList()
    },
    clickDraft() {
      this.currentPage = 0
      this.hasMoreJobs = 1
      this.getCurrentJobListButtonValue.job_type = this.jobType.DRAFT
      this.getCurrentJobListButtonValue.isDraft = true
      this.getCurrentJobListButtonValue.isLive = false
      this.getCurrentJobListButtonValue.isExpired = false
      this.getCurrentJobListButtonValue.isAll = false
      this.getCurrentJobListButtonValue.isExternal = false
      this.getCurrentJobListButtonValue.isCompanyJobs = false
      this.getAllJobsList()
    },
    clickExpired() {
      this.currentPage = 0
      this.hasMoreJobs = 1
      this.getCurrentJobListButtonValue.job_type = this.jobType.EXPIRED
      this.getCurrentJobListButtonValue.isDraft = false
      this.getCurrentJobListButtonValue.isLive = false
      this.getCurrentJobListButtonValue.isExpired = true
      this.getCurrentJobListButtonValue.isAll = false
      this.getCurrentJobListButtonValue.isExternal = false
      this.getCurrentJobListButtonValue.isCompanyJobs = false
      this.getAllJobsList()
    },
    clickExternal() {
      this.currentPage = 0
      this.hasMoreJobs = 1
      this.getCurrentJobListButtonValue.job_type = this.jobType.EXTERNAL
      this.getCurrentJobListButtonValue.isDraft = false
      this.getCurrentJobListButtonValue.isLive = false
      this.getCurrentJobListButtonValue.isExpired = false
      this.getCurrentJobListButtonValue.isAll = false
      this.getCurrentJobListButtonValue.isCompanyJobs = false
      this.getCurrentJobListButtonValue.isExternal = true
      this.getAllJobsList()
    },
    clickCompanyJobs() {
      this.currentPage = 0
      this.hasMoreJobs = 1
      this.getCurrentJobListButtonValue.job_type = this.jobType.OTHER_COMPANIES
      this.getCurrentJobListButtonValue.isDraft = false
      this.getCurrentJobListButtonValue.isLive = false
      this.getCurrentJobListButtonValue.isExpired = false
      this.getCurrentJobListButtonValue.isAll = false
      this.getCurrentJobListButtonValue.isExternal = false
      this.getCurrentJobListButtonValue.isCompanyJobs = true
      this.getAllJobsList()
    },
    setProfileImage(profileImage) {
      let profileImageUrl = ''
      if (profileImage) {
        //profileImageUrl = `${process.env.VUE_APP_MEDIA_IMGURL}${profileImage}`
        profileImageUrl = profileImage
      }
      return profileImageUrl
    },
    setUsernameInitial(userData) {
      let initialLetters =
        userData.first_name.trim().charAt(0).toUpperCase() +
        userData.last_name.trim().charAt(0).toUpperCase()
      return initialLetters
    },

    getLocation(job) {
      let loc = ''
      if (job.city) {
        loc = `${job.city}, `
      }
      if (job.state) {
        loc = `${loc}${job.state}, `
      }
      if (job.country) {
        loc = `${loc}${job.country}`
      }

      let lastCha = loc.slice(loc.length - 1, loc.length)
      if (lastCha == ',') {
        loc = loc.slice(0, loc.length - 1)
      }

      return loc
    },
    viewApplications(job) {
      if (job.no_of_applicants > 0) {
        this.saveSingleJobDetails(job)
        this.$router.push({
          name: appConstants.routes.APPLICANTS
        })
      }
    },
    setCursor(job) {
      if (job.no_of_applicants > 0) {
        return 'cursor-pointer'
      } else {
        return 'cursor-context-menu'
      }
    },
    setDataOneditJob(job) {
      this.setSoftwareListwithId([])
      this.editJob(job)
      this.goToUpdate()
    },
    goToUpdate() {
      this.$router.push({ name: appConstants.routes.UPDATE_JOB })
    },
    viewJob(job) {
      this.saveSingleJobDetails(job)
      let encoded_id = btoa(job.id)
      this.$router.push({
        name: appConstants.routes.JOBDETAILS,
        params: { job_id: encoded_id }
      })
    },
    clickedTab(e) {
      this.job_type = e
      this.getAllJobsList()
    },
    closeEditJob() {
      this.isShowEditJob = false
    },
    jobdelete() {
      this.deleteJob(this.deleteJobId)
      this.hideDeleteConfirmationModal()
    },
    getPageDetails() {
      let pageNumber = this.currentPage + 1
      let jobPerPage = 10
      let offset = (pageNumber - 1) * jobPerPage
      let data = {
        pageNumber: pageNumber,
        jobPerPage: jobPerPage,
        offset: offset,
        type: this.getCurrentJobListButtonValue.job_type,
        companyId: this.selectedCompany
      }
      return data
    },
    getAllJobsList() {
      this.setCurrentJobList()
      if (
        this.currentPage == 0 ||
        (this.currentPage > 0 && this.hasMoreJobs != null)
      ) {
        let data = this.getPageDetails()
        this.busy = true
        //if (this.userData.is_admin) {
        this.getAllJobs(data).then((result) => {
          this.currentPage = data.pageNumber
          this.busy = false
          this.hasMoreJobs = result
        })
        // } else {
        //   data.companyId = this.selectedCompany
        //   // console.log('selected company', this.selectedCompany)
        //   this.getAllJobs(data).then((result) => {
        //     this.currentPage = data.pageNumber
        //     this.busy = false
        //     this.hasMoreJobs = result
        //   })
        // }
      }
    },
    searchClick() {
      switch (this.$route.name) {
        case appConstants.routes.JOB:
          this.emitSearchButtonEvent('search-job')
          break
      }
    },
    emitSearchButtonEvent(eventName) {
      this.$eventHub.$emit(eventName, { searchText: this.searchFor })
      this.searchFor = ''
    },
    showDeleteConfirmationModal(deleteJob) {
      this.deleteJobId = deleteJob
      //this.$refs['delete-modal'].show()
      this.showDeleteModal = true
    },
    hideDeleteConfirmationModal() {
      this.deleteJobId = ''
      //this.$refs['delete-modal'].hide()
      this.showDeleteModal = false
    },
    searchjobs(value) {
      this.currentPage = 0
      this.hasMoreJobs = 1
      this.busy = true // set to true to stop infine scroll in case of JOB SEARCH RESULT
      this.fetchJobBySearchText(value.searchText)
    },
    setCurrentJobList() {
      if (this.getCurrentJobListButtonValue) {
        this.isLive = this.getCurrentJobListButtonValue.isLive
        this.isDraft = this.getCurrentJobListButtonValue.isDraft
        this.isExpired = this.getCurrentJobListButtonValue.isExpired
        this.isExternal = this.getCurrentJobListButtonValue.isExternal
        this.isCompanyJobs = this.getCurrentJobListButtonValue.isCompanyJobs
        this.job_type = this.getCurrentJobListButtonValue.job_type
        let data = {
          isAll: this.isAll,
          isLive: this.isLive,
          isDraft: this.isDraft,
          isExpired: this.isExpired,
          isExternal: this.isExternal,
          isCompanyJobs: this.isCompanyJobs,
          job_type: this.job_type
        }
        // console.log('button', data)
        this.saveCurrentJobListButtonValue(data)
      } else {
        let data = {
          isAll: this.isAll,
          isLive: this.isLive,
          isDraft: this.isDraft,
          isExpired: this.isExpired,
          isExternal: this.isExternal,
          isCompanyJobs: this.isCompanyJobs,
          job_type: this.job_type
        }
        // console.log('button', data)
        this.saveCurrentJobListButtonValue(data)
      }
    },
    getCompany() {
      this.currentPage = 0
      this.hasMoreJobs = 1
      this.getAllJobsList()
      this.saveSelectedCompany(this.selectedCompany)
    },
    loadDropdownData() {
      this.fetchProfessionData()
      this.fetchLevelData()
      this.fetchEmploymentData()
      this.fetchSectorData()
      this.fetchInterestsData()
      this.fetchLanguages()
      this.fetchSoftwareList()
      //this.fetchAllFieldOfStudyList()
      this.fetchLevelOfStudyForJob()
      // this.action_getFieldOfStudy()
    },
    openPremiumPopup() {
      if (this.isShowPremiumPopup == false) {
        this.isShowPremiumPopup = true
      } else {
        this.isShowPremiumPopup = false
      }
    },
    getPlanExpiryDate(date) {
      if (date != null && date != '') {
        return moment(date).format('DD MMM YYYY')
      }
    },
    getJobBalance() {
      let bal =
        this.getActiveJobPlanData.jobs_allocated -
        this.getActiveJobPlanData.jobs_posted
      return bal
    },
    goToPricingPage() {
      this.$router.push({ name: appConstants.routes.JOB_PRICING })
    }
  },
  async created() {
    this.loadDropdownData()
    this.fetchJobPricingPlanData()
    this.fetchActiveJobPlanData(this.allCompanies[0].id).then(() => {
      this.jobPlanDetails = this.getActiveJobPlanData
    })
    //console.log('userData', this.userData)
    if (
      this.userData.is_admin === false ||
      this.userData.is_admin == undefined
    ) {
      //await this.fetchCompanies().then(() => {
      if (this.allCompanies.length > 0) {
        this.companyList = this.allCompanies.sort()
        if (!this.getSelectedCompany && this.selectedCompany == '') {
          this.saveSelectedCompany(this.companyList[0].id)
          this.selectedCompany = this.companyList[0].id
        } else {
          this.selectedCompany = this.getSelectedCompany
        }
        this.setCurrentJobList()
        this.getAllJobsList()
      } else {
        this.fetchCompanies().then(() => {
          if (this.allCompanies.length > 0) {
            this.companyList = this.allCompanies.sort()
            if (!this.getSelectedCompany && this.selectedCompany == '') {
              this.saveSelectedCompany(this.companyList[0].id)
              this.selectedCompany = this.companyList[0].id
            } else {
              this.selectedCompany = this.getSelectedCompany
            }
            this.setCurrentJobList()
            this.getAllJobsList()
          }
        })
      }
      //})
    } else {
      this.setCurrentJobList()
      this.getAllJobsList()
    }

    this.$eventHub.$on('search-job', this.searchjobs)
  },
  beforeDestroy() {
    this.$eventHub.$off('search-job')
  }
}
</script>

<style scoped>
.btn-dark:not(:disabled):not(.disabled):active {
  background-color: #000000;
  border-color: #000000;
}
.btn-dark:hover {
  background-color: #000000;
  border-color: #000000;
}
.show > .btn-dark.dropdown-toggle .btnSearchjob {
  margin-top: 5px;
}
/* .form-conatiner {
  margin-top: 20px;
} */
/* .actioncolumn {
  background-color: ;
} */

.job-card .job_image {
  margin: auto;
  object-fit: contain;
}

.job-card {
  cursor: pointer;
  border-radius: 8px;
  padding: 8px 0px 8px 16px;
  min-height: 85px;
  background: #ffffff;
  /* box-shadow: rgba(0, 0, 0, 0.32) 0px 3px 6px; */
  display: flex;
  align-items: center;
  min-width: 713px;
}
.job-card:hover {
  /* border: 1px solid #ffcf0a; */
  background: #f5cb39;
}
.job_publish {
  height: 25px;
  padding: 0;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 0px;
  border-bottom-left-radius: 8px;
  border-top-right-radius: 8px;
  text-transform: capitalize;
  float: right;
  margin-right: 0px;
  margin-top: -16px;
  background-color: #f5cb39;
  font-weight: bold;
}
.job-line {
  background: #e4e4e4;
  width: 7px;
  margin-left: -3.3rem;
  height: 100%;
  margin-top: 12px;
}
.job-card:hover .job-line {
  background: #f5cb39;
  width: 7px;
  margin-left: -3.3rem;
  height: 100%;
  margin-top: 12px;
}
.action-row {
  display: flex;
  justify-content: flex-end;
}
.circle-arrow {
  border-radius: 50%;
  background-color: #e4e4e4;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.job-card:hover .circle-arrow {
  border-radius: 50%;
  background-color: #000;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.fa {
  font-size: 13px;
  color: #fff;
}
.job-card:hover .fa {
  color: #f5cb39;
}
.cursor-pointer {
  cursor: pointer;
}
.cursor-context-menu {
  cursor: context-menu;
}
.job-filter-container {
  min-width: 225px;
  border-radius: 11px;
  background-color: #fff;
}
.job-card .job_image {
  object-fit: contain;
  width: 43px;
  height: 39px;
  background: #f6f6f6;
  border-radius: 8px;
  padding: 4px 2px 4px 2px;
  margin-right: 0px;
  /* margin-top: 20px; */
}
.bg-yellow {
  background-color: #f5cb39;
}
.page-header {
  margin-top: -60px !important;
  position: inherit !important;
}
.font-weight-600 {
  font-weight: 600;
}
.circle {
  height: 46px;
  width: 46px;
  background-color: #f2f2f2;
  display: flex;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}
.btn-dark:focus,
.btn-dark.focus {
  background-color: #000000;
  border-color: #000000;
  box-shadow: none !important;
}

.premium-card {
  width: 245px;
  height: 234px;
  position: absolute;
  border-radius: 15px;
  padding: 22px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #f1f9f9;
  z-index: 11;
  top: 35px;
}
.premium-button:hover .premium-card {
  display: block;
}
.premium-title {
  font-size: 23px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.09;
  letter-spacing: normal;
  text-align: left;
  color: var(--app-primary-color);
}
.premium-text {
  font-size: 14px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000;
}
.hr-line {
  height: 0.7px;
  background: #000;
  display: flex;
  width: 100%;
}
.backdrop {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 9999;
  height: 100%;
}
.relative {
  position: relative;
}
@media only screen and (max-width: 600px) {
  .job-line {
    background: #e4e4e4;
    width: 7px;
    margin-left: -3.2rem;
    height: 100%;
    margin-top: 12px;
  }
  .job-card:hover .job-line {
    background: #f5cb39;
    width: 7px;
    margin-left: -3.2rem;
    height: 100%;
    margin-top: 12px;
  }
  .job-card .job_image {
    object-fit: contain;
    width: 50px;
    height: 50px;
    background: #f2f2f2;
    border-radius: 8px;
    margin-right: 10px;
    margin-left: 0px;
  }
}
/* @media only screen and (max-width: 992px) { */
.job-card .job_image .imgjob {
  transform: scale(1.5);
  margin-left: 10px;
}
.job-card .job_image .imgjob {
  /* transform: scale(1.5);
     margin-left: 10px; */
  padding: 5px;
  border-radius: 3px;
  margin: 20px 20px 20px 13px;
}
.job-card {
  border-radius: 8px;
  padding: 8px 0px 8px 16px;
}
.page-header {
  margin-top: -60px !important;
  position: inherit !important;
}
.nav-pills .nav-link {
  width: 175px !important;
}
.job-list-button {
  background-color: transparent;
  /*border-radius: 8px;
    border: 1px solid #707070; */
  border: none;
  height: 26px;
  width: auto;
  font-size: 14px;
  margin: 0px 5px 0px 5px;
}
.job-list-button-active {
  /* background-color: #ffcf0a;
   border: none !important; */
  color: #fff;
  border-bottom: 2px solid #fff;
  border-right: none;
  border-top: none;
  border-left: none;
  padding-bottom: 0px;
  font-family: 'Poppins Bold';
}
.job-list-button-active:focus-visible {
  outline: none;
}
button:focus {
  outline: none !important;
}
.job-list-titles {
  color: #fff;
  /* padding: 4px 10px 4px 10px;
   margin-right: 12px;  border-radius: 8px;
  border: solid 1px rgba(0, 0, 0, 0);
  background-color: #416c80;
  height: 44px;*/
  padding-left: 10px;
}
</style>
