<template>
  <div
    class="applicant-details-container cursor-pointer overflow-hidden"
    :id="uniqueId"
    @click="getSingleApplicantDetails(applicant)"
  >
    <div class="row align-items-center d-flex">
      <div
        class="align-items-baseline col-2 col-md-2 d-flex justify-content-center pl-0 pr-0"
      >
        <div class="client-logo">
          <img
            v-if="applicant.user_details[0].profile_image"
            class="circle"
            :src="setProfileImage(applicant.user_details[0].profile_image)"
            alt="Card image cap"
          />
          <span class="circle" v-else
            >{{ setUsernameInitial(applicant.user_details[0]) }}
          </span>
        </div>
      </div>
      <div class="col-5 col-md-8 flex-column p-0" style="position: relative">
        <div class="d-flex flex-column">
          <span class="fontSize14 font-weight-700">{{
            setApplicantName(applicant.user_details[0])
          }}</span>
          <span
            v-if="applicant.applicant_details.applicant_designation"
            class="fontSize14 font-weight-500"
          >
            {{ applicant.applicant_details.applicant_designation }}
            <!-- <span class="fontSize12 font-weight-400">{{
            applicant.user_details[0].exp[0].designation
          }}</span>
          <span class="fontSize12 font-weight-500">
            {{ applicant.user_details[0].exp[0].organization.name }}</span
          > -->
          </span>

          <span v-else class="d-flex flex-column">
            <span
              class="fontSize14 font-weight-500"
              v-if="applicant.user_details[0].exp.length > 0"
              >{{ applicant.user_details[0].exp[0].designation }}</span
            >
          </span>
        </div>

        <!-- <span v-else class="d-flex flex-column">
          <span
            class="fontSize12 font-weight-500"
            v-if="applicant.user_details[0].exp.length > 0"
          >
            {{ applicant.user_details[0].exp[0].organization.name }}</span
          >
        </span> -->
        <!-- <span
          v-if="
            applicant.user_details[0].exp.length == 0 &&
            applicant.user_details[0].edu.length > 0
          "
          class="d-flex flex-column"
        >
          <span class="fontSize12 font-weight-400"
            >{{ applicant.user_details[0].edu[0].degree }},
            {{ applicant.user_details[0].edu[0].department }}</span
          >
          <span class="fontSize12 font-weight-500">
            {{ applicant.user_details[0].edu[0].organization.name }}</span
          >
        </span> -->
      </div>
      <div class="col-5 col-md-2 text-right d-flex flex-column pl-2">
        <div class="d-flex flex-column w-100">
          <!-- <span
            class="fontSize12 font-weight-400"
            v-if="
              applicant.applicant_details.notice_period != null &&
              applicant.applicant_details.notice_period == 0
            "
          >
            Notice Period : 30 Days
          </span> -->
          <!-- <span class="fontSize12 font-weight-400">
            Notice Period :
            {{
              setApplicatsNoticePeriod(
                applicant.applicant_details.notice_period
              )
            }}
          </span> -->
          <div class="d-flex flex-column align-items-center">
            <!-- <span class="fontSize12 font-weight-700">
              {{ applicant.applicant_details.match_percentage }}% CV Match
            </span> -->
            <Donut :data="applicant.applicant_details.match_percentage"></Donut>
            <!-- <CircularProgressBar
              :data="applicant.applicant_details.match_percentage"
            ></CircularProgressBar> -->
            <!-- <radial-progress-bar
              :diameter="70"
              :completed-steps="applicant.applicant_details.match_percentage"
              :total-steps="totalSteps"
              :strokeWidth="4"
              :innerStrokeWidth="4"
              :innerStrokeColor="'#f2f2f2'"
              :startColor="'#860404'"
              :stopColo="'#359A00'"
            >
            </radial-progress-bar> -->
          </div>
        </div>
        <!-- <div v-else class="d-flex flex-column">
        <span class="fontSize12 font-weight-light"
          >Organization:
          {{ applicant.user_details[0].edu[0].organization.name }}</span
        >
        <span class="fontSize14 font-weight-light"
          >Degree: {{ applicant.user_details[0].edu[0].degree }}</span
        >
        <span class="fontSize12 font-weight-light"
          >Department: {{ applicant.user_details[0].edu[0].department }}</span
        >
      </div> -->

        <!-- <span class="fontSize12 mb-2 font-weight-light"
        >CV Match Percentage -
        {{
          getMatchPercentage(
            applicant.applicant_details.applicant_email.match_percentage
          )
        }}</span
      > -->
        <!-- <div class="d-flex">
        <a :href="`tel:${applicant.applicant_details.applicant_mobile}`"
          ><img src="../../assets/img/Call.svg" alt=""
        /></a>
        <a :href="`mailto:${applicant.applicant_details.applicant_email}`">
          <img src="../../assets/img/Email.svg" alt=""
        /></a>
      </div> -->

        <!-- <div class="">
        <div id="accordion">
          <h5 class="mb-0">
            <span
              class="btn-link fontSize12 font-weight-bold cursor-pointer align-items-center d-flex"
              data-toggle="collapse"
              :data-target="`#${uniqueId}`"
              aria-expanded="true"
              aria-controls="collapseOne"
              ><svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 14.5L17 9.5H7L12 14.5Z" fill="#2E3A59"></path>
              </svg>
              Click here to view cover note
            </span>
          </h5>

          <div
            :id="uniqueId"
            class="collapse fontSize12 mt-3"
            aria-labelledby="headingOne"
            data-parent="#accordion"
          >
            <span v-html="getCoverNote(applicant.applicant_details.cover_note)">
            </span>
          </div>
        </div>
      </div> -->
      </div>
    </div>
    <div class="row">
      <div
        class="align-items-baseline col-2 col-md-2 d-flex justify-content-center pl-0 pr-0"
      ></div>
      <div class="col-5 col-md-8 flex-column p-0" style="position: relative">
        <div class="d-flex align-items-center h-auto mt-2">
          <span
            v-if="applicant.applicant_details.applicant_total_exp"
            class="fontSize12 font-weight-400"
            >Experience:
            {{ applicant.applicant_details.applicant_total_exp }} yrs</span
          >
          <span v-else class="fontSize12 font-weight-400"
            >Experience: {{ applicant.user_details[0].total_exp }} yrs</span
          >
          <span class="mx-2"> | </span>
          <span class="fontSize12 font-weight-400"
            >Applied on {{ setAppliedDate(applicant.applicant_details) }}
          </span>
        </div>
      </div>
      <div
        class="align-items-center col-5 col-md-2 d-flex flex-column justify-content-end pl-2"
      >
        <!-- <span class="fontSize12 font-weight-700">
              {{ applicant.applicant_details.match_percentage }}% CV Match
            </span> -->

        <div class="">
          <span
            class="status-text-accept pt-1"
            v-if="
              applicant.applicant_details.application_status ==
              applicationStatus.ACCEPTED
            "
            >Accepted
          </span>
          <span
            class="status-text-reject pt-1"
            v-if="
              applicant.applicant_details.application_status ==
              applicationStatus.REJECTED
            "
            >Rejected
          </span>
          <!-- <span
            class="status-text-pending pt-1"
            v-if="
              applicant.applicant_details.application_status ==
                applicationStatus.OPEN ||
              applicant.applicant_details.application_status ==
                applicationStatus.UNDER_REVIEW
            "
            >Pending
          </span> -->
        </div>
      </div>
    </div>

    <!-- <div class="d-flex align-items-end justify-content-between flex-column p-0">
      <div class="d-flex flex-column">
        <div class="dropdown">
          <a
            type="text"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            ><img src="../../assets/img/Kebab-Background.svg" alt="" />
          </a>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a
              class="dropdown-item fontSize12 cursor-pointer"
              @click="downloadCVPDF(applicant)"
              >Download CV</a
            >
            <a
              class="dropdown-item fontSize12 cursor-pointer"
              @click="viewProfile(applicant.user_details[0].slug)"
              >View Profile</a
            >
            <a
              v-if="applicant.applicant_details.attcahment_file"
              class="dropdown-item fontSize12 cursor-pointer"
              @click="downloadAttachmentPDF(applicant)"
              >Download Attachment</a
            >
          </div>
        </div>

        <button class="download-button" @click="downloadCVPDF(app)">
                      Download CV
                    </button>
                    <button
                      v-if="app.applicant_details.attcahment_file"
                      @click="downloadAttachmentPDF()"
                      class="download-button mt-2"
                    >
                      Download Attachment
                    </button> 
      </div>
      <div class="d-flex">
        <span class="align-items-center d-flex flex-column">
         <span class="fontSize12">Fit</span>
          <img
            v-if="applicant.applicant_details.is_valid"
            src="../../assets/img/Olous_Fit.svg"
            alt=""
            class="cursor-pointer"
          />
        </span>
      </div>
    </div> -->
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import appConstants from '../../appConstants.js'
import moment from 'moment'
import Donut from '../../components/common/Donut.vue'
//import CircularProgressBar from '../common/CircularProgressBar.vue'
//import RadialProgressBar from 'vue-radial-progress'
export default {
  name: 'Applicant',
  components: {
    Donut
    //CircularProgressBar
    //RadialProgressBar
  },
  data() {
    return {
      jobDetails: [],
      companyList: [],
      currentPage: 0,
      hasMoreJobs: 1,
      deleteJobId: '',
      busy: false,
      selectedCompany: '',
      showDeleteModal: false,
      jobId: '',
      applicant_details_container_id: '',
      applicationStatus: appConstants.Application_Status,
      //completedSteps: 20,
      totalSteps: 100
    }
  },
  props: {
    applicant: {
      type: Object,
      default: null
    },
    uniqueId: String
  },

  computed: {
    ...mapGetters(['getApplicants', 'getSingleJobDetails'])
  },
  methods: {
    ...mapActions([
      'fetchApplicants',
      'fetchPDFFile',
      'saveSingleApplicantData'
    ]),
    getSingleApplicantDetails(applicantData) {
      var current = document.getElementsByClassName(
        'applicant-details-container-active'
      )
      if (current.length > 0) {
        current[0].className = current[0].className.replace(
          ' applicant-details-container-active',
          ''
        )
      }
      var a = document.querySelector(`#${this.uniqueId}`)

      a.classList.add('applicant-details-container-active')

      //this.saveSingleApplicantData(applicantData)
      this.$emit('applicant_changed', { applicantData })
    },
    viewProfile(slug) {
      // slug = 'pramilajadhav87c59'
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
      this.downloadPDF(this.getAttachmentURL(app), false, app)
    },
    downloadPDF(fileURL, isCvFile, app) {
      let data = {
        cv_url: fileURL
      }
      // console.log('pdf', fileURL)
      this.fetchPDFFile(data)
        .then((result_pdfFile) => {
          var fileURL = window.URL.createObjectURL(result_pdfFile)
          //console.log('pdf', fileURL)
          var fURL = document.createElement('a')

          fURL.href = fileURL
          var download_cv_name = this.getDownloadCVName(isCvFile, app)
          fURL.download = download_cv_name
          //fURL.setAttribute('download', download_cv_name)
          // console.log('pdf', fURL)
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
      // console.log('url', url)
      return url
    },
    getAttachmentURL(app) {
      //console.log('app', app)
      var url = ''
      url = `${process.env.VUE_APP_JOBATTACHMENTURL}${app.applicant_details.attcahment_file}`
      //console.log('getAttachmentURL', url)
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
        return `olous_${file_name}_attachment.pdf`
      }
    },
    setApplicantName(userDetails) {
      let fullName = userDetails.first_name + ' ' + userDetails.last_name
      return fullName
    },
    setApplicatsNoticePeriod(noticeperiod) {
      if (noticeperiod == appConstants.NOTICE_PERIOD.IMMEDIATE) {
        return 'Immediate'
      } else if (noticeperiod == appConstants.NOTICE_PERIOD.DAYS_30) {
        return '30 Days'
      } else if (noticeperiod == appConstants.NOTICE_PERIOD.DAYS_15) {
        return '15 Days'
      } else if (noticeperiod == appConstants.NOTICE_PERIOD.DAYS_45) {
        return '45 Days'
      } else if (noticeperiod == appConstants.NOTICE_PERIOD.DAYS_60) {
        return '60 Days'
      } else if (noticeperiod == appConstants.NOTICE_PERIOD.DAYS_75) {
        return '75 Days'
      } else if (noticeperiod == appConstants.NOTICE_PERIOD.DAYS_90) {
        return '90 Days'
      } else {
        return '30 Days'
      }
    },
    setAppliedDate(app) {
      if (app.created_at) {
        return moment(app.created_at).format('DD MMM YYYY')
      }
    },
    getMatchPercentage(percentage) {
      if (percentage == null) {
        return 0
      } else {
        return percentage
      }
    },
    // setCoverNote(data, id) {
    //   var out = document.getElementById(id)
    //   if (data.cover_note) {
    //     out.innerHTML = data.cover_note.replace(/\n/g, '<br />')
    //     //return out
    //     //data.cover_note.replace(/\n/g, '<br />')
    //   } else {
    //     return ''
    //   }
    // },
    getCoverNote(cover_note) {
      return cover_note.replace(/\n/g, '<br />')
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
    }
  },
  mounted() {
    var a = document.querySelector(`#applicant_container0`)
    a?.classList.add('applicant-details-container-active')
  }
  // created() {
  //   var a = document.querySelector(`#applicant_container0`)
  //   a?.classList.add('applicant-details-container-active')
  // }
}
</script>
<style scoped>
.status-text-accept {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0 !important;
  color: #359a00;
  font-style: italic;
}
.height-30 {
  height: 30px;
}
.status-text-reject {
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0 !important;
  color: #e81212;
  font-style: italic;
}
.status-text-pending {
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0 !important;
  color: #9b9b9b;
  font-style: italic;
}
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
  background-color: #f2f2f2;
  display: flex;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  font-size: 22px;
}
.applicant-name {
  font-size: 18px;
  color: #000;
  font-weight: 700;
  margin-top: 10px;
}
.cursor-pointer {
  cursor: pointer !important;
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
}
.company-name {
  font-size: 16px;
  color: #000;
}
.job-description {
  font-size: 14px;
  color: #000;
}
.btn-link {
  color: #333 !important;
}
.dropdown-menu {
  top: 0px !important;
  left: -137px !important;
}
.dropdown-item.active,
.dropdown-item:active {
  color: #333;
  text-decoration: none;
  background-color: #f2f2f2 !important;
}
.btn-link:hover {
  /* color: blue !important; */
  text-decoration: none;
}
/*.btn-link:visited {
  color: red !important;
} */
.applicant-details-container {
  /* display: grid;
  grid-template-columns: 54px 1fr; */
  padding: 8px;
  min-height: 96px;
  background-color: #fff;
  /*border: 1px solid gray;*/
  border-radius: 10px;
  margin-bottom: 10px;
}
.applicant-details-container:hover {
  /*  border: 1px solid #ffcf0a;
  box-shadow: rgba(0, 0, 0, 0.32) 0px 3px 6px; */
  background-color: #f5cb39;
  border-radius: 10px;
  margin-bottom: 10px;
}
.applicant-details-container-active {
  background-color: #f5cb39;
  /* border: 1px solid #ffcf0a;box-shadow: rgba(0, 0, 0, 0.32) 0px 3px 6px; */
  border-radius: 10px;
  margin-bottom: 10px;
}
.dropdown-kebab {
  background: #fff;
  border-radius: 50%;
  margin: 4px;
}
@media only screen and (max-width: 992px) {
  .applicant-details-container {
    /* display: grid;
    grid-template-columns: 40px 1fr 34px; border: 1px solid gray; */
    max-height: 120px;
    padding: 10px;

    border-radius: 10px;
  }
  .circle {
    height: 40px;
    width: 40px;
    background-color: #f2f2f2;
    display: flex;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    font-size: 22px;
  }
  .fontSize14 {
    font-size: 12px;
  }
  .dropdown-menu {
    top: 0px !important;
    left: -70px !important;
  }
}
</style>
