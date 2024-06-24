<template>
  <div class="cursor-pointer">
    <div
      v-if="type == componentDataType.JOB && jobData != null"
      @click="viewJob(jobData)"
    >
      <div class="job-card-container">
        <div class="job-card-header">
          <div class="job-card-logo">
            <div v-if="jobData.company_logo">
              <img
                class="job_image"
                :src="setCompanyImage(jobData.company_logo)"
              />
            </div>
            <div v-else>
              <img class="" src="../../../assets/img/Job-List-Dummy-Logo.svg" />
            </div>
          </div>
          <div class="circle-arrow ml-3">
            <i class="fa fa-arrow-right" aria-hidden="true"></i>
          </div>
        </div>
        <div class="job-card-body">
          <div class="d-flex flex-column">
            <span
              class="app-primary-text-color font-weight-700 fontSize14 job-title"
              >{{ jobData.job_title }}</span
            >
            <span
              class="fontSize14 font-weight-400 app-primary-text-color margintop4px"
              style="word-wrap: break-word"
              >{{ jobData.company }}</span
            >
            <span
              class="fontSize12 font-weight-400 margintop3px"
              v-if="jobData.country && jobData.location.length > 0"
            >
              {{ jobData.country }} -
              {{ getJobCities(jobData.location) }}
            </span>
          </div>
          <div class="margintop12px">
            <span class="fontSize12 font-weight-400">{{
              setEmployment(jobData.employment)
            }}</span>

            <span v-if="getCurrentJobListButtonValue.isExternal == false">
              <span class="text-orange" v-if="jobData.no_of_applicants > 0">
                |
              </span>
              <span
                v-if="jobData.no_of_applicants == 1"
                class="fontSize12 font-weight-400 app-primary-text-color"
              >
                {{ jobData.no_of_applicants }} Applicant</span
              >
              <span
                v-if="jobData.no_of_applicants > 1"
                class="fontSize12 font-weight-400 app-primary-text-color"
                >{{ jobData.no_of_applicants }} Applicants</span
              >
            </span>
          </div>
          <div class="d-flex flex-column margintop4px">
            <span class="fontSize12 app-primary-text-color font-weight-400">{{
              getDateDifference(jobData)
            }}</span>
            <span
              class="fontSize12 text-orange font-weight-400 margintop12px"
              v-if="jobData.last_applied_on != null || jobData.last_applied_on"
            >
              {{ getLastApplicationDate(jobData) }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="type == componentDataType.APPLICANT && jobData != null"
      @click="getSingleApplicantDetails(jobData)"
    >
      <div class="job-card-container" style="height: 300px" :id="uniqueId">
        <div class="job-card-header" :id="uniqueIdHeader">
          <div class="job-card-logo">
            <div v-if="jobData.user_details[0].profile_image">
              <img
                class="job_image"
                :src="setProfileImage(jobData.user_details[0].profile_image)"
              />
            </div>
            <div v-else>
              <span class="circle"
                >{{ setUsernameInitial(jobData.user_details[0]) }}
              </span>
            </div>
          </div>
          <div class="circle-arrow ml-3">
            <i class="fa fa-arrow-right" aria-hidden="true"></i>
          </div>
        </div>
        <div class="job-card-body d-flex flex-column justify-content-between">
          <div class="d-flex flex-column">
            <span class="app-primary-text-color font-weight-700 fontSize14">{{
              setApplicantName(jobData.user_details[0])
            }}</span>
            <span
              class="fontSize12 font-weight-400 app-primary-text-color margintop4px job-title"
              v-if="jobData.applicant_details.applicant_designation"
            >
              {{
                getDesignation(jobData.applicant_details.applicant_designation)
              }}</span
            >
            <span v-else>
              <span
                class="fontSize12 font-weight-400 app-primary-text-color margintop4px"
                v-if="jobData.user_details[0].exp.length > 0"
                >{{
                  getDesignation(jobData.user_details[0].exp[0].designation)
                }}</span
              >
            </span>
            <span
              class="fontSize12 font-weight-400 margintop3px"
              v-if="jobData.user_details[0].city"
            >
              {{ jobData.user_details[0].city }}
              <!-- {{ getJobCities(jobData.location) }} -->
            </span>
          </div>
          <div class="d-flex flex-column justify-content-between h-50">
            <div class="margintop15px d-flex flex-column">
              <span
                v-if="jobData.applicant_details.applicant_total_exp"
                class="fontSize12 font-weight-400"
                >Experience:
                {{ jobData.applicant_details.applicant_total_exp }} yrs</span
              >
              <span v-else class="fontSize12 font-weight-400"
                >Experience: {{ jobData.user_details[0].total_exp }} yrs</span
              >

              <span class="fontSize12 font-weight-400"
                >Applied on {{ setAppliedDate(jobData.applicant_details) }}
              </span>
            </div>
            <div class="d-flex justify-content-between align-items-end">
              <span
                class="font-weight-700 fontSize14 status-text-accept text-uppercase mb-n1"
                v-if="
                  jobData.applicant_details.application_status ==
                  applicationStatus.ACCEPTED
                "
                >Accepted
              </span>
              <span
                class="font-weight-700 fontSize14 status-text-reject text-uppercase mb-n1"
                v-if="
                  jobData.applicant_details.application_status ==
                  applicationStatus.REJECTED
                "
                >Rejected
              </span>
              <span
                class="status-text-pending text-uppercase font-weight-700 fontSize14 mb-n1"
                v-if="
                  jobData.applicant_details.application_status ==
                    applicationStatus.OPEN ||
                  jobData.applicant_details.application_status ==
                    applicationStatus.UNDER_REVIEW
                "
                >Pending
              </span>
              <span
                v-else
                class="font-weight-700 fontSize14 status-text-reject text-uppercase mb-n1"
              ></span>
              <div v-if="isMatchingPdfReportIsAvailable()">
                <Donut
                  v-if="
                    jobData.applicant_details.match_percentage_absolute >= 0
                  "
                  :data="jobData.applicant_details.match_percentage_absolute"
                ></Donut>
              </div>
              <div v-else>
                <Donut
                  v-if="jobData.applicant_details.match_percentage >= 0"
                  :data="jobData.applicant_details.match_percentage"
                ></Donut>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="type == componentDataType.JOB && jobData == null">
      <div
        v-if="!userData.is_admin"
        class="align-items-center d-flex flex-column job-card-container justify-content-center"
      >
        <div v-if="jobPlanDetails" class="plan-card">
          <div
            class="d-flex flex-column justify-content-center align-items-center"
          >
            <span class="premium-title">{{ jobPlanDetails.plan_name }}</span>
            <span
              class="text-dark font-weight-600 fontSize12 text-center"
              v-if="jobPlanDetails.is_plan_active"
              >Job Posting Balance
              <!-- Posted {{ jobPlanDetails.jobs_posted }} | Balance -->

              {{ getJobBalance(jobPlanDetails) }}
            </span>
            <span
              class="text-dark font-weight-600 fontSize12"
              v-if="!jobPlanDetails.is_plan_active"
              >Job Posting Balance: 0
              <!-- {{ getJobBalance(jobPlanDetails) }} -->
            </span>
            <span
              v-if="jobPlanDetails.plan_code != jobPricingPlan.FREE"
              class="fontSize14 font-weight-600 text-orange"
              >Expiry: {{ getPlanExpiryDate(jobPlanDetails.expires_at) }}</span
            >
          </div>
          <span
            v-if="!jobPlanDetails.is_plan_active"
            class="fontSize12 text-danger"
            >Your plan has expired</span
          >
        </div>
        <div
          v-if="
            !jobPlanDetails.is_plan_active ||
            (jobPlanDetails.is_plan_active &&
              jobPlanDetails.plan_code == jobPricingPlan.FREE)
          "
          class="align-items-center d-flex flex-column mt-3"
        >
          <button class="premium-button btn" @click="goToPricingPage">
            <img
              src="../../../assets/img/Upgrade.svg"
              alt="premium"
              class="mr-1"
            />
            Buy Now
          </button>
        </div>
        <div class="align-items-center mt-3 d-flex justify-content-center">
          <button
            class="add-job-button btn"
            :disabled="jobPlanDetails.is_plan_active ? false : true"
            @click="createNewJob"
          >
            + Add Job
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'
// eslint-disable-next-line no-unused-vars
import appConstants from '../../../appConstants'
import Donut from '../../common/Donut.vue'
// eslint-disable-next-line no-unused-vars
import { required, email, numeric, requiredIf } from 'vuelidate/lib/validators'
import '../../../assets/css/appcolor.css'
export default {
  name: 'JobCardComponent',
  props: ['jobData', 'type', 'uniqueId', 'uniqueIdHeader', 'jobPlanDetails'],
  components: {
    Donut
  },
  data() {
    return {
      componentDataType: appConstants.component_data_type,
      applicationStatus: appConstants.Application_Status,
      jobPricingPlan: appConstants.pricing_plan_job
    }
  },
  watch: {},
  computed: {
    ...mapGetters('dropdownValues', ['getProfessionOptions']),
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
      'getSelectedCompany'
    ])
  },

  methods: {
    ...mapActions(['saveSingleJobDetails']),
    setCompanyImage(image) {
      let imageUrl = `${process.env.VUE_APP_IMGURL}${image}`

      return imageUrl
    },
    setEmployment(type) {
      for (let i = 0; i < this.getEmploymentOptions.length; i++) {
        if (this.getEmploymentOptions[i].id == type) {
          return this.getEmploymentOptions[i].employment_type
        }
      }
    },
    getJobCities(data) {
      let cities = []
      for (let count = 0; count < data.length; count++) {
        cities.push(data[count].city)
      }

      let res = cities.join(', ')
      return res
    },
    getDateDifference(job) {
      let noOfDays = ''
      if (job.is_published) {
        noOfDays =
          this.calculateNoOfDays(job.expires_at) + ' days left to expire'
      } else if (job.is_expired) {
        return 'Expired on ' + moment(job.expires_at).format('DD MMM YYYY')
      } else {
        return 'Updated on ' + moment(job.updated_at).format('DD MMM YYYY')
      }
      return noOfDays
    },
    calculateNoOfDays(expiryDate) {
      var currentDate = new Date().toISOString().split('.')[0] + 'Z'
      const d2 = new Date(currentDate)
      //for (let i = 0; i < jobData.value.jobs.length; i++) {
      const d1 = new Date(expiryDate)
      var Difference_In_Time = d1.getTime() - d2.getTime()
      var Difference_In_Days = Math.round(
        Difference_In_Time / (24 * 60 * 60 * 1000)
      )
      return Difference_In_Days
    },
    viewJob(job) {
      this.saveSingleJobDetails(job)
      let encoded_id = btoa(job.id)
      this.$router.push({
        name: appConstants.routes.JOBDETAILS,
        params: { job_id: encoded_id }
      })
    },
    createNewJob() {
      // this.$router.push({ name: 'createJob' })
      this.$router.push({ name: appConstants.routes.CREATE_JOB })
    },

    //APPLICANT RELATED FINCTIONS

    setProfileImage(profileImage) {
      let profileImageUrl = ''
      if (profileImage) {
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
    setApplicantName(userDetails) {
      let fullName = userDetails.first_name + ' ' + userDetails.last_name
      return fullName
    },
    setAppliedDate(app) {
      if (app.created_at) {
        return moment(app.created_at).format('DD MMM YYYY')
      }
    },
    getLastApplicationDate(app) {
      if (app.last_applied_on != null && app.last_applied_on != '') {
        return (
          ' Last Application Date ' +
          moment(app.last_applied_on).format('DD MMM YYYY')
        )
      }
    },
    getDesignation(designation) {
      let maxLength = 50
      if (designation.length > maxLength) {
        designation = designation.slice(0, maxLength) + '...'
      }
      return designation
    },
    getSingleApplicantDetails(applicantData) {
      var current = document.getElementsByClassName('job-card-container-active')
      var currentHeader = document.getElementsByClassName(
        'job-card-header-active'
      )
      if (current.length > 0) {
        current[0].className = current[0].className.replace(
          ' job-card-container-active',
          ''
        )
      }
      if (currentHeader > 0) {
        currentHeader[0].className = currentHeader[0].className.replace(
          'job-card-header-active',
          ''
        )
      }

      var a = document.querySelector(`#${this.uniqueId}`)

      a.classList.add('job-card-container-active')
      var b = document.querySelector(`#${this.uniqueIdHeader}`)
      b.classList.add('job-card-header-active')
      //this.saveSingleApplicantData(applicantData)
      this.$emit('applicant_changed', { applicantData })
    },
    isMatchingPdfReportIsAvailable() {
      if (
        this.jobData.applicant_details.report_images_folder != null &&
        this.jobData.applicant_details.report_images_folder != '' &&
        this.jobData.applicant_details.report_images.length > 0
      ) {
        return true
      } else {
        return false
      }
    },
    getPlanExpiryDate(date) {
      if (date != null && date != '') {
        return moment(date).format('DD MMM YYYY')
      }
    },
    getJobBalance() {
      let bal =
        this.jobPlanDetails.jobs_allocated - this.jobPlanDetails.jobs_posted
      return bal
    },
    goToPricingPage() {
      this.$router.push({ name: appConstants.routes.JOB_PRICING })
    }
  },
  mounted() {
    var a = document.querySelector(`#applicant_container0`)
    a?.classList.add('job-card-container-active')
    var b = document.querySelector(`#applicant_container_header0`)
    b?.classList.add('job-card-header-active')
  },
  created() {}
}
</script>
<style>
.job-card-container {
  width: 264.5px;
  height: 300px;
  border-radius: 8px;
  border: 1px solid #d1e2ea;
  background-color: #f4f8fa;
  margin-bottom: 20px;
}
.job-card-header {
  width: 264.5px;
  height: 50.1px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: #d1e2ea;
  /* border: 1px solid#d1e2ea; */
  position: relative;
  display: flex;
  justify-content: end;
  align-items: center;
  display: -webkit-flex !important;
  -webkit-flex-align: end !important;
  -ms-flex-align: center !important;
  -webkit-align-items: center !important;
  -webkit-justify-content: end !important;
}
.job-card-container:hover {
  border: 1px solid var(--app-primary-color);
}
.job-card-container:hover .job-card-header {
  background-color: var(--app-primary-color);
  margin-left: -1px;
  /* border: 1px solid var(--app-primary-color); */
}
.job-card-container-active {
  border: 1px solidvar(--app-primary-color);
}
.job-card-container-active .job-card-header-active {
  background-color: var(--app-primary-color);
  margin-left: -1px;
  /* border: 1px solidvar(--app-primary-color); */
}
.job-card-logo {
  position: absolute;
  width: 52.8px;
  height: 55.8px;
  border-radius: 8px;
  /* border: solid 1px #1c1c1c; */
  background-color: #fff;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.job-card-body {
  padding: 20px;
  margin-top: 8px;
}
.circle-arrow {
  border-radius: 50%;
  background-color: #fff;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 14px;
}
.job-card-container:hover .circle-arrow {
  border-radius: 50%;
  background-color: #fff;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.fa {
  font-size: 13px;
  color: #50554b;
}
.job-card-container:hover .fa {
  color: var(--app-primary-color);
}
.job-card-container-active .fa {
  color: var(--app-primary-color);
}
.job-card-container .job_image {
  margin: auto;
  object-fit: contain;
  border-radius: 8px;
  width: 55.8px;
  height: 55.8px;
}
.add-job-button {
  width: 166px !important;
  height: 32px;
  /* padding: 8px 24px 8px;
  border-radius: 8px;
  background-color: var(--app-primary-color);
  color: #fff;
  font-size: 14px;
  font-weight: 600; border: 0.5px solid var(--app-primary-color); */
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
}
.job-card-body .job-title {
  min-height: 40px;
  word-wrap: break-word;
}
.status-text-accept {
  font-size: 14px;
  font-weight: 700;
  font-family: 'Manrope Bold';
  -webkit-font-smoothing: antialiased;
  letter-spacing: 0 !important;
  color: #359a00;
}
.status-text-reject {
  font-size: 14px;
  font-weight: 700;
  font-family: 'Manrope Bold';
  -webkit-font-smoothing: antialiased;
  letter-spacing: 0 !important;
  color: #e81212;
}
.status-text-pending {
  font-size: 14px;
  font-weight: 700;
  font-family: 'Manrope Bold';
  letter-spacing: 0 !important;
  -webkit-font-smoothing: antialiased;
  color: #9b9b9b;
}
.premium-button {
  height: 32px;
  width: 166px !important;
  /*  padding: 0px;
  border-radius: 8px;
  background-color: var(--app-primary-color);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.text-orange {
  color: var(--app-primary-color) !important;
}
.premium-title {
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: var(--app-primary-color);
}
.plan-card {
  padding: 10px;
  height: auto;
  width: 166px;
  border: 1px solid var(--app-primary-color);
  background-color: var(--app-lighter-primary);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
