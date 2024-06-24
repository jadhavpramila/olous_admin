<template>
  <div>
    <div class="form-conatiner">
      <div>
        <h1 class="fontSize20 color-black font-weight-bold">Job Details</h1>
      </div>
      <div class="col-12 col-md-8 p-0" id="accordion">
        <div class="job-details" v-if="jobDetails">
          <div class="d-flex">
            <img
              class="job_image"
              :src="setCompanyLogo(jobDetails.company_logo)"
            />
          </div>
          <div class="col-10 d-flex flex-column justify-content-between">
            <div class="d-flex flex-column">
              <span class="job-title">
                <!-- <b>Job Title</b> :  -->
                {{ jobDetails.job_title }}</span
              >

              <span class="company-name">
                <!-- <b>Company</b> :  -->
                {{ jobDetails.company }}</span
              >
            </div>
            <div class="d-flex flex-column">
              <small class="fontSize12 font-light"
                >{{ jobDetails.country }}-{{ jobDetails.city }}</small
              >
              <small class="fontSize12 font-light"
                >Min {{ jobDetails.min_exp }} yrs - Max
                {{ jobDetails.max_exp }} yrs |
                {{ setEmployment(jobDetails.employment) }} |
                {{ jobDetails.vacancy }} Position
              </small>
              <div>
                <h5 class="mb-0">
                  <span
                    class="btn-link fontSize14 font-weight-bold cursor-pointer align-items-center d-flex"
                    data-toggle="collapse"
                    data-target="#uniqueId"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                    @keyup="setArrow($event)"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 14.5L17 9.5H7L12 14.5Z"
                        fill="#2E3A59"
                      ></path>
                    </svg>
                    <span class="">Job Details</span>
                  </span>
                </h5>

                <!-- <div
                id="uniqueId"
                class="collapse fontSize12"
                aria-labelledby="headingOne"
                data-parent="#accordion"
              >
                <span class="job-description">
                  {{ jobDetails.job_description }}</span
                >
              </div> -->
              </div>
            </div>
          </div>
        </div>
        <div
          id="uniqueId"
          class="collapse fontSize12 job-description-collapse"
          aria-labelledby="headingOne"
          data-parent="#accordion"
        >
          <div class="d-flex flex-column">
            <h1 class="fontSize14 color-black font-weight-bold">
              Job Description :-
            </h1>
            <p
              class="job-description"
              v-html="setJobDescription(jobDetails.job_description)"
            ></p>
          </div>
          <div class="d-flex flex-column">
            <h1 class="fontSize14 color-black font-weight-bold">
              Profile Requirment :-
            </h1>
            <p
              class="job-description"
              v-html="setProfileRequirment(jobDetails.profile_req)"
            ></p>
          </div>

          <div class="d-flex flex-column" v-if="jobDetails.sectors.length > 0">
            <h1 class="fontSize14 color-black font-weight-bold">Sectors :-</h1>
            <p class="job-description">{{ sectors }}</p>
          </div>
          <div
            class="d-flex flex-column"
            v-if="jobDetails.professional_categories.length > 0"
          >
            <h1 class="fontSize14 color-black font-weight-bold">
              Professions :-
            </h1>
            <p class="job-description">{{ professions }}</p>
          </div>
        </div>
      </div>
      <div class="mt-3">
        <h1 class="fontSize20 color-black font-weight-bold">Applicant List</h1>
      </div>
      <div class="row">
        <div
          v-infinite-scroll="getApplicantsList"
          infinite-scroll-disabled="busy"
          infinite-scroll-distance="80"
        >
          <div
            v-for="(applicant, index) in getApplicants"
            :key="index"
            class="col-12 mb-4 pr-0"
          >
            <Applicant :applicant="applicant" :uniqueId="getUniqueId(index)" />
          </div>
        </div>
      </div>
      <!-- <div class="mt-4">
          <div
            v-if="selectedCompany != ''"
            v-infinite-scroll="getJobsListByCompany"
            infinite-scroll-disabled="busy"
            infinite-scroll-distance="80"
          >
            <div
              class="row job-card-row ml-0 mr-0"
              v-for="(job, counter) in getAllJobList"
              :key="counter"
            >
              <div
                class="col-md-10 job-card bgGrayLightColor mb-3"
                @dblclick="viewJob(job)"
              >
                <div class="row">
                  <div class="col-2 job_image">
                    <img
                      class="imgjob"
                      src="../../assets/img/Job_List_Company.svg"
                    />
                  </div>
                  <div class="col-10 mt-3 mb-3 fon">
                    <div v-if="job.is_published">
                      <div class="job_publish">Publish</div>
                    </div>
                    <div v-else><div class="job_publish">Draft</div></div>
                    <div class="">
                      <label class="app-primary-text-color font-weight-bold">{{
                        job.job_title
                      }}</label>
                    </div>
                    <div class="row">
                      <div class="col-md-5">
                        <label class="fontSize12">{{ job.company }}</label>
                      </div>
                      <div class="col-md-4">
                        <label class="fontSize12">{{ getLocation(job) }}</label>
                      </div>
                      <div class="col-md-3">
                        <label class="fontSize12">{{
                          getDateDifference(job)
                        }}</label>
                      </div>
                    </div>
                    <div class="d-flex justify-content-end mt-2">
                      <button
                        class="view-applicant-button"
                        @click="viewApplications"
                      >
                        View Applications
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-2 row ml-0 mb-3 action-row">
                <div v-if="!job.is_published">
                  <img
                    class="cursor-pointer"
                    @click="setDataOneditJob(job)"
                    title="Edit job"
                    src="../../assets/img/Edit.svg"
                  />
                </div>
                <div v-if="job.is_published">
                  <i
                    class="fa fa-eye fa-2x cursor-pointer"
                    style="margin-top: -5px"
                    aria-hidden="true"
                    title="View job"
                    @click="viewJob(job)"
                  ></i>
                </div>
                <div>
                  <img
                    class="cursor-pointer ml-3"
                    @click="showDeleteConfirmationModal(job)"
                    src="../../assets/img/Delete.svg"
                    title="Delete job"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="getAllJobList.length == 0">No record found</div> -->
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import appConstants from '../../appConstants.js'
import Applicant from './Applicant.vue'
import {
  getProfessionValues,
  getSectorValues
} from '../../common/js/getValuesFromIds.js'

export default {
  name: 'Applicantions',
  components: { Applicant },
  data() {
    return {
      jobDetails: [],
      companyList: [],
      sectors: '',
      professions: '',
      currentPage: 0,
      hasMoreJobs: 1,
      deleteJobId: '',
      busy: false,
      selectedCompany: '',
      showDeleteModal: false,
      jobId: ''
    }
  },

  computed: {
    ...mapGetters([
      'getApplicants',
      'getSingleJobDetails',
      'getEmploymentOptions'
    ])
  },
  methods: {
    ...mapActions(['fetchApplicants', 'fetchPDFFile']),
    getPageDetails() {
      let pageNumber = this.currentPage + 1
      let jobPerPage = 10
      let offset = (pageNumber - 1) * jobPerPage
      let data = {
        pageNumber: pageNumber,
        jobPerPage: jobPerPage,
        offset: offset,
        jobId: this.jobId
      }
      return data
    },
    getApplicantsList() {
      if (
        this.currentPage == 0 ||
        (this.currentPage > 0 && this.hasMoreJobs != null)
      ) {
        let data = this.getPageDetails()
        this.busy = true
        // console.log('data', data)
        this.fetchApplicants(data).then((result) => {
          this.currentPage = data.pageNumber
          this.busy = false
          this.hasMoreJobs = result
        })
      }
    },
    viewProfile() {
      let slug = 'pramilajadhav87c59'
      window.open(`${appConstants.WEB_URL}${slug}`, '_blank')
      // this.$router.push({
      //   name: appConstants.WEB_URL,
      //   params: { user_slug: slug }
      // })
    },
    downloadCVPDF(app) {
      // console.log('Applicants list', this.getApplicants)
      this.downloadPDF(this.getPDFURL(app), true, app)
    },
    downloadAttachmentPDF(app) {
      this.downloadPDF(this.getAttachmentURL(), false, app)
    },
    downloadPDF(fileURL, isCvFile, app) {
      let data = {
        cv_url: fileURL
      }

      this.fetchPDFFile(data)
        .then((result_pdfFile) => {
          var fileURL = window.URL.createObjectURL(result_pdfFile)
          var fURL = document.createElement('a')

          fURL.href = fileURL
          var download_cv_name = this.getDownloadCVName(isCvFile, app)
          fURL.setAttribute('download', download_cv_name)
          document.body.appendChild(fURL)
          //console.log('result_pdfFile', fURL)
          fURL.click()
          document.body.removeChild(fURL)
        })
        .catch(() => {
          this.modalMessage =
            'Facing an issue while downloading file,  please try again after some time'
          this.showModal = true
        })
    },
    getPDFURL(app) {
      var url = ''
      url = `${process.env.VUE_APP_CVURL}${app.applicant_details.applicant_resume}`
      //console.log('url', app)
      return url
    },
    getAttachmentURL(app) {
      var url = ''
      url = `${process.env.VUE_APP_JOBATTACHMENTURL}${app.applicant_details.attachment_pdf_url}`
      return url
    },
    getDownloadCVName(isCvFile, app) {
      //console.log('name', app)
      var file_name = this.setApplicantName(app.user_details[0]).replace(
        ' ',
        ''
      )
      if (isCvFile) {
        return `olous_${file_name}_cv.pdf`
      } else {
        return `olous_${file_name}_attachemnt.pdf`
      }
    },
    setApplicantName(userDetails) {
      let fullName = userDetails.first_name + ' ' + userDetails.last_name
      return fullName
    },
    getUniqueId(index) {
      let uniqueId = 'covernote' + index
      return uniqueId
    },
    setEmployment(type) {
      for (let i = 0; i < this.getEmploymentOptions.length; i++) {
        if (this.getEmploymentOptions[i].id == type) {
          // console.log("type", employmentTypes.value[i].employment_type);
          return this.getEmploymentOptions[i].employment_type
        }
      }
    },
    setCompanyLogo(logo) {
      // console.log('logo', logo)
      let logoUrl = ''
      if (logo == '' || logo == null) {
        logoUrl = '../../assets/img/company_default_logo.svg'
      } else {
        logoUrl = `${process.env.VUE_APP_IMGURL}${logo}`
      }
      //console.log('url', logoUrl)
      return logoUrl
    },
    setArrow(event) {
      console.log('event', event)
    },
    async setSectors(sectorArray) {
      this.sectors = await getSectorValues(sectorArray)
      //console.log(getSectorValues(sectorArray))
      // return sectors
    },
    async setProfessions(professionArray) {
      this.professions = await getProfessionValues(professionArray)
      //console.log(getProfessionValues(professionArray))
      // return sectors
    },
    setProfileRequirment(requirment) {
      return requirment.replace(/\n/g, '<br />')
    },
    setJobDescription(description) {
      return description.replace(/\n/g, '<br />')
    }
  },
  created() {
    this.jobDetails = this.getSingleJobDetails
    this.jobId = this.jobDetails.id
    this.setSectors(this.jobDetails.sectors)
    this.setProfessions(this.jobDetails.professional_categories)
    if (this.jobId) {
      this.getApplicantsList()
    }
  }
}
</script>
<style scoped>
.application-container {
  background-color: #f2f2f2;
  height: auto;
  width: 100%;
  color: #000;
  border-radius: 10px;
  margin-top: 20px;
  padding: 10px;
}
.circle {
  height: 50px;
  width: 50px;
  background-color: white;
  display: table;
}
.applicant-name {
  font-size: 18px;
  color: #000;
  font-weight: 700;
  font-family: 'Manrope Bold';
  -webkit-font-smoothing: antialiased;
  margin-top: 10px;
}
.download-button {
  padding: 8px;
  background-color: #333;
  color: #fff;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 400;
  border: none;
}
.job-title {
  font-size: 18px;
  color: #000;
  font-weight: 600;
}
.job_image {
  object-fit: contain;
  width: 130px;
  height: 130px;
  background: #fff;
  border-radius: 8px;
}
.company-name {
  font-size: 16px;
  color: #000;
  font-weight: 400;
}
.font-light {
  font-weight: 300 !important;
}
.job-description {
  font-size: 12px;
  color: #000;
}
.job-description-collapse {
  /* display: flex; */
  flex-direction: column;
  padding: 16px;
  background-color: #cbcbcb;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.job-details {
  background-color: #f2f2f2;
  padding: 16px;
  display: grid;
  grid-template-columns: 130px 1fr;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.btn-link {
  color: #333 !important;
}
.btn-link:hover {
  /* color: blue !important; */
  text-decoration: none;
}
.collapsing {
  position: relative;
  height: 0;
  overflow: hidden;
  transition: height -0.35s ease !important;
}
.panel-title {
  position: relative;
}

.panel-title::after {
  content: '\f107';
  color: #333;
  top: -2px;
  left: 0px;
  margin-right: 3px;
  position: absolute;
  font-family: 'FontAwesome';
}

.panel-title[aria-expanded='false']::after {
  content: '\f106';
}
@media only screen and (max-width: 992px) {
  .job-details {
    background-color: #f2f2f2;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 10px;
    display: grid;
    grid-template-columns: 40px 1fr;
  }
  .job_image {
    object-fit: contain;
    width: 40px;
    height: 40px;
    background: #fff;
    border-radius: 8px;
  }
  .job-title {
    font-size: 16px;
    color: #000;
    font-weight: 700;
    font-family: 'Manrope Bold';
    -webkit-font-smoothing: antialiased;
  }
  .company-name {
    font-size: 14px;
    color: #000;
    font-weight: 500;
  }
  .fontSize14 {
    font-size: 12px;
  }
}
</style>
