<template>
  <div class="d-flex flex-column">
    <div
      class="mt-5 px-2 align-items-center justify-content-between d-flex tab-list"
    >
      <ul class="d-flex pl-0 mb-0 w-100" style="list-style: none">
        <li class="ml-1">
          <span
            type="button"
            class="job-list-button"
            @click="clickApplicants"
            :class="{
              'job-list-button-active':
                getCurrentJobDetailsButtonValue.isApplicants
            }"
          >
            Applicants
          </span>
        </li>
        <!-- <li class="ml-2 mr-2">
            <span
              type="button"
              class="job-list-button"
              @click="clickRecommendations"
              :class="{
                'job-list-button-active':
                  getCurrentJobDetailsButtonValue.isRecommendations
              }"
            >
              Recommendations
            </span>
          </li> -->
      </ul>
      <div class="align-items-center d-flex justify-content-end w-100">
        <span
          class="pr-0 fontSize14 w-25 font-weight-400 text-right mt-1 text-white"
          >Sort By</span
        >
        <v-select
          v-model="applicantsSort"
          label="label"
          :options="sortingOptionsArray"
          class="select-sort single-value show-placeholder"
          @input="sortBy($event)"
          :clearable="false"
          style="width: 40% !important; margin: 0 !important"
        >
        </v-select>
      </div>
    </div>
    <div class="applicants-tab applicant-cv-div applicant-container">
      <div class="applicants-list" v-if="getApplicants.length > 0">
        <div
          v-infinite-scroll="getApplicantsList"
          infinite-scroll-disabled="busy"
          infinite-scroll-distance="80"
        >
          <div
            class="row ml-0"
            style="
              column-width: 264.5px !important;
              column-gap: 20px !important;
            "
          >
            <div
              v-for="(applicant, index) in getApplicants"
              :key="index"
              class="p-0"
            >
              <JobCardComponentVue
                :jobData="applicant"
                :type="componentDataType.APPLICANT"
                :uniqueId="getUniqueId(index)"
                @applicant_changed="saveSingleApplicant"
              ></JobCardComponentVue>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import appConstants from '../../appConstants.js'
import JobCardComponentVue from './JobComponent/JobCardComponent.vue'
import { getRandomString } from '../../common/js/commonFunctions.js'

export default {
  name: 'Applicant',
  components: {
    JobCardComponentVue
  },
  data() {
    return {
      componentDataType: appConstants.component_data_type,
      applicantsSort: {
        label: 'Latest',
        value: appConstants.Applicants_Sort.CREATED_DATE
      },
      sortingOptionsArray: [
        {
          label: 'Latest',
          value: appConstants.Applicants_Sort.CREATED_DATE
        },
        {
          label: 'Top Match',
          value: appConstants.Applicants_Sort.TOPMATCH
        },
        {
          label: 'Accepted',
          value: appConstants.Applicants_Sort.ACCEPTED
        },
        {
          label: 'Rejected',
          value: appConstants.Applicants_Sort.REJECTED
        }
      ]
    }
  },

  computed: {
    ...mapGetters(['getApplicants', 'getSingleJobDetails']),
    ...mapGetters([
      'getApplicants',
      'getSingleJobDetails',
      'getEmploymentOptions',
      'getCurrentJobDetailsButtonValue',
      'getSingleApplicantData',
      'getCVImageList',
      'getApplicationStatus',
      'getUserContactDetails',
      'getter_singleJobDetails',
      'getResumeUrl',
      'getApplicationReportDetails'
    ])
  },
  methods: {
    ...mapMutations('dropdownValues', ['setSoftwareListwithId']),
    ...mapMutations([
      'setCvImages',
      'setSingleApplicantData',
      'setApplicants',
      'setApplcationReportOfJob'
    ]),
    ...mapActions([
      'fetchApplicants',
      'fetchPDFFile',
      'fetchEmploymentData',
      'saveCurrentJobDetailsButtonValue',
      'saveSingleApplicantData',
      'fetchCvImages',
      'saveApplicationStatus',
      'fetchUserContactDetails',
      'fetchSingleJobDetails',
      'fetchUserResumeUrl',
      'editJob',
      'deleteJob',
      'closeJob',
      'fetchCVReportDetails'
    ]),
    getUniqueId(index) {
      let uniqueId = 'applicant_container' + index
      return uniqueId
    },
    clickApplicants() {
      this.currentPage = 0
      this.hasMoreJobs = 1
      this.getCurrentJobDetailsButtonValue.job_id = this.jobId
      this.getCurrentJobDetailsButtonValue.isApplicants = true
      this.getCurrentJobDetailsButtonValue.isRecommendations = false
    },
    clickRecommendations() {
      this.currentPage = 0
      this.hasMoreJobs = 1
      this.getCurrentJobDetailsButtonValue.job_id = this.jobId
      this.getCurrentJobDetailsButtonValue.isApplicants = false
      this.getCurrentJobDetailsButtonValue.isRecommendations = true
    },
    sortBy(sort) {
      this.applicantsSort = sort
      this.currentPage = 0
      this.hasMoreJobs = 1
      this.getApplicantsList()
    },
    getPageDetails() {
      let pageNumber = this.currentPage + 1
      let jobPerPage = 10
      let offset = (pageNumber - 1) * jobPerPage
      let data = {
        pageNumber: pageNumber,
        jobPerPage: jobPerPage,
        offset: offset,
        jobId: this.jobId,
        sort: this.applicantsSort.value
      }
      return data
    },
    getApplicantsList() {
      if (
        (this.currentPage == 0 || this.currentPage > 0) &&
        this.hasMoreJobs != null
      ) {
        let data = this.getPageDetails()
        this.busy = true
        // console.log('data', data)
        this.fetchApplicants(data).then((result) => {
          this.currentPage = data.pageNumber
          this.busy = false
          this.hasMoreJobs = result
          if (this.getApplicants.length > 0) {
            this.saveSingleApplicant(this.getApplicants[0])
          }
        })
      }
    },
    saveSingleApplicant(data) {
      this.isShowDownLoadCvButton = false
      let obj = ''
      if (data.applicantData) {
        obj = {
          applicant_details: data.applicantData.applicant_details,
          user_details: data.applicantData.user_details
        }
      } else {
        obj = {
          applicant_details: data.applicant_details,
          user_details: data.user_details
        }
      }
      //console.log('data', data)
      this.saveSingleApplicantData(obj).then(() => {
        this.getCVReport()
        this.getCvImages()
        this.updateStatus()
      })
    },
    getCVReport() {
      if (this.getSingleApplicantData) {
        this.fetchCVReportDetails(
          this.getSingleApplicantData.applicant_details.id
        )
      }
    },
    getCvImages() {
      if (this.getSingleApplicantData) {
        if (
          this.getSingleApplicantData.applicant_details.cv_images == null ||
          this.getSingleApplicantData.applicant_details.cv_images.length == 0
        ) {
          if (this.getSingleApplicantData.applicant_details.applicant_resume) {
            let obj = {
              cvFile: this.getSingleApplicantData.applicant_details
                .applicant_resume,
              application_id: this.getSingleApplicantData.applicant_details.id
            }
            try {
              this.fetchCvImages(obj).then(() => {
                this.cvImageList = this.getCVImageList.cv_images
                this.cvImageFolder = this.getCVImageList.cv_images_folder
                this.resumeKey = getRandomString()
                // console.log('resume key', this.resumeKey)
                // console.log('resume key', this.cvImageList)
                // console.log('resume key', this.cvImageFolder)
              })
            } catch (error) {
              console.log('cv not available', error)
            }
          } else {
            this.isShowCvErrorMessage = true
          }
        } else {
          this.cvImageList = this.getSingleApplicantData.applicant_details.cv_images
          this.cvImageFolder = this.getSingleApplicantData.applicant_details.cv_images_folder
        }
      }
    },
    updateStatus() {
      if (this.getSingleApplicantData) {
        if (
          this.getSingleApplicantData.applicant_details.application_status ==
          this.applicationStatus.OPEN
        ) {
          let data = {
            application_id: this.getSingleApplicantData.applicant_details.id,
            status: this.applicationStatus.UNDER_REVIEW
          }
          this.saveApplicationStatus(data)
        }
        //console.log(this.getSingleApplicantData)
      }
    }
  },
  created() {}
}
</script>
<style scoped>
.job-list-button {
  background-color: transparent;
  /*border-radius: 8px;
    border: 1px solid #707070; */
  border: none;
  height: 26px;
  width: auto;
  font-size: 14px;
  margin: 0px 0px 0px 0px;
}
.job-list-button-active {
  /* background-color: #ffcf0a;
   border: none !important; */
  color: #fff;
  font-weight: 700;
  /* border-bottom: 3px solid var(--app-primary-color); */
  border-right: none;
  border-top: none;
  border-left: none;
  font-family: 'Manrope Bold';
  -webkit-font-smoothing: antialiased;
}
.job-list-button-active:focus-visible {
  outline: none;
}
button:focus {
  outline: none !important;
}
.tab-list {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border: solid 1px rgba(0, 0, 0, 0);
  background-color: #333c4a;
  height: 39px;
}
.applicant-container {
  padding: 16px;
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px #d8d8d8;
  background-color: var(--white);
}
</style>
