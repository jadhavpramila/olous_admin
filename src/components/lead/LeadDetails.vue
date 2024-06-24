<template>
  <div class="form-conatiner">
    <!-- lead info -->
    <div class="d-flex mt-3">
      <div class="d-flex same-width-column justify-content-between mr-2">
        <div class="d-flex flex-column mr-2">
          <span class="app-primary-text-color font-weight-700 job-title">
            {{ leadData.contact_name }}
            <span
              v-if="leadData.urgent"
              class="text-orange fontSize12 font-weight-400"
            >
              <b> ( Urgent )</b>
            </span>
          </span>

          <span class="fontSize14 font-weight-400 app-primary-text-color">
            {{ leadData.company_name }}
          </span>

          <span class="fontSize14 font-weight-400 app-primary-text-color">
            {{ leadData.city_state_country }}
          </span>
        </div>
        <div
          class="d-flex"
          style="flex-direction: column; align-items: flex-end"
        >
          <div v-if="isAdminUser()">
            <button class="btn ml-auto" @click="showLeadSuggestions()">
              Suggestions
            </button>
          </div>
          <div class="mt-2">
            <button class="btn ml-auto w-full" @click="showLeadInfo()">
              Lead Info
            </button>
          </div>
        </div>
      </div>

      <div class="same-width-column ml-2">
        <div class="d-flex flex-row-reverse">
          <div v-if="isDeleteButtonVisible()">
            <span>
              <img
                src="../../assets/img/Delete-Job.svg"
                class="image-icon mb-2"
                @click="showDeleteConfirmationModal"
            /></span>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex flex-row justify-content-around mt-4">
      <!-- left Div (Applicants List) -->
      <div class="same-width-column mr-2 container-div">
        <!-- Header -->
        <div
          class="header-height mb-0 px-2 align-items-center justify-content-between d-flex tab-list app-bg-top-gradient"
        >
          <div class="ml-2 applicant-text">
            <span class="media-tab media-tab-active"> Applicants </span>
          </div>
          <div class="d-flex fontSize12 mr-2 flex-shrink-1 justify-content-end">
            <div class="flex-shrink-0 my-auto">Sort By</div>
            <div class="flex-grow-0 mt-2" style="width: 150px">
              <v-select
                v-model="application_sort_order"
                label="label"
                :options="sortingOptionsArray"
                class="select-sort single-value show-placeholder"
                @input="sortBy($event)"
                :clearable="false"
                :single-line="false"
                :searchable="false"
                style=""
              >
              </v-select>
            </div>
          </div>
        </div>

        <!-- applicants list -->
        <div class="applicant-cv-div applicant-container-body scrollable-div">
          <div
            v-infinite-scroll="getAllLeadApplicants"
            infinite-scroll-disabled="busy"
            infinite-scroll-distance="80"
          >
            <div v-if="getLeadAllApplicants.length > 0">
              <div class="row ml-0">
                <div
                  v-for="(applicantData, index) in getLeadAllApplicants"
                  :key="index"
                  class="pl-1 col-lg-6 col-md-6 col-12"
                >
                  <div style="width: 100%; height: 100%; margin-bottom: 20px">
                    <LeadApplicantCard
                      :applicant="applicantData"
                      :key="getKey(applicantData.id)"
                      :is_selected="isApplicantSelected(applicantData.id)"
                      @viewApplicantDetails="
                        viewApplicantDetailsEvent(applicantData)
                      "
                    ></LeadApplicantCard>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>No record found</div>
          </div>
        </div>
      </div>

      <!-- right div (Matching report) -->
      <div class="same-width-column container-div ml-2">
        <div class="d-flex justify-content-between ml-1 mr-1">
          <div class="header-height fontSize14"><b>Report</b></div>
          <div>
            <div v-if="isShowButtonRow()" class="d-flex">
              <button
                class="btn d-flex align-items-center justify-content-center"
                @click="
                  changeApplicationStatus(leadApplicationStatusEnum.ACCEPTED)
                "
              >
                Accept
              </button>

              <button
                class="btn ml-3 d-flex align-items-center justify-content-center"
                @click="
                  changeApplicationStatus(leadApplicationStatusEnum.REJECTED)
                "
              >
                Reject
              </button>
            </div>
            <div v-if="isShowContactButton()">
              <span>
                <img
                  src="../../assets/img/Contact-Job.svg"
                  class="image-icon mb-2"
                  title="Contact Details"
                  @click="showContactDetailsPopup"
              /></span>
            </div>
          </div>
        </div>
        <div class="applicant-cv-div scrollable-div top-radious">
          <LeadMatchingReport
            :application_obj="selected_applicant"
            :key="getKey(selected_applicant.id)"
          ></LeadMatchingReport>
        </div>
      </div>
    </div>
    <b-modal
      ref="showLeadDetails"
      hide-footer
      hide-header
      :centered="true"
      size="lg"
    >
      <div class="p-3">
        <div>
          <LeadReadOnly :leadData="leadData"></LeadReadOnly>
        </div>
        <b-button
          class="mt-3 w-auto btn"
          variant="outline-dark"
          block
          @click="hideLeadDetails"
          >Close</b-button
        >
      </div>
    </b-modal>

    <b-modal
      ref="showLeadApplicantContactDetails"
      hide-footer
      hide-header
      :centered="true"
    >
      <div class="p-3">
        <div class="d-block text-left">
          <h1 class="fontSize16 font-weight-700">Contacts</h1>
          <div class="d-flex flex-column">
            <!-- <div v-if="selected_applicant_contact.isAppliedAsBusiness">
              <a
                :href="selected_applicant_contact.company_url"
                target="_blank"
                class="fontSize15"
                style="font-weight: 600"
              >
                {{ selected_applicant_contact.company_name }}
              </a>
            </div> -->

            <div v-if="selected_applicant_contact.isAppliedAsBusiness">
              {{ selected_applicant_contact.company_name }}
            </div>

            <a
              :href="selected_applicant_contact.olous_url"
              target="_blank"
              class="fontSize14"
            >
              <span> {{ selected_applicant_contact.contact_name }}</span>
            </a>

            <div v-if="selected_applicant_contact.phone != ''" class="mt-2">
              <a
                :href="`tel:${selected_applicant_contact.phone}`"
                class="fontSize14"
                ><img src="../../assets/img/Call.svg" alt="call" />
                <span>
                  {{ selected_applicant_contact.country_code }}
                  {{ selected_applicant_contact.phone }}
                </span>
              </a>
            </div>

            <div v-else class="mt-2">
              <img src="../../assets/img/Call.svg" alt="call" />
              <span>-</span>
            </div>

            <div v-if="selected_applicant_contact.email != ''">
              <a
                :href="`mailto:${selected_applicant_contact.email}`"
                class="fontSize14"
              >
                <img src="../../assets/img/Email.svg" alt="email" />
                <span>
                  {{ selected_applicant_contact.email }}
                </span>
              </a>
            </div>

            <div v-else>
              <a class="fontSize14">
                <img src="../../assets/img/Email.svg" alt="email" />
                <span> - </span>
              </a>
            </div>
          </div>
        </div>
        <b-button
          class="mt-3 w-auto btn"
          variant="outline-dark"
          block
          @click="hideContactDetailsPopup"
          >Close</b-button
        >
      </div>
    </b-modal>

    <modal v-if="showLeadModal" @closeModal="updateShowLeadModal([false, ''])">
      <div slot="body">{{ this.LeadModalMessage }}</div>
    </modal>

    <modal v-if="showDeleteModal" @closeModal="hideDeleteConfirmationModal">
      <div slot="body">Do you really want to delete this lead?</div>
      <div slot="footer" class="d-flex">
        <b-button
          class="btn"
          variant="outline-dark"
          @click="hideDeleteConfirmationModal"
        >
          Cancel
        </b-button>
        <b-button class="ml-2 btn" variant="outline-dark" @click="leadDelete">
          Yes
        </b-button>
      </div>
    </modal>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import LeadReadOnly from './leadComponent/LeadReadOnly.vue'
import LeadApplicantCard from './leadComponent/LeadApplicantCard.vue'
import LeadMatchingReport from './leadComponent/LeadMatchingReport.vue'
import appConstants from '../../appConstants.js'
import modal from '../../common/Modal'
import { getRandomString } from '../../common/js/commonFunctions.js'

export default {
  name: 'LeadDetails',
  components: {
    LeadReadOnly,
    LeadApplicantCard,
    LeadMatchingReport,
    modal
  },
  data() {
    return {
      lead_id: '',
      leadData: {},
      applicantData: {},
      currentPage: 0,
      hasMoreApplicants: true,
      busy: false,
      // show_report_id: '',
      selected_applicant: {
        id: '',
        application_status: ''
      },
      selected_applicant_contact: {
        isAppliedAsBusiness: '',
        company_name: '',
        company_slug: '',
        company_url: '',
        contact_name: '',
        slug: '',
        olous_url: '',
        email: '',
        country_code: '',
        phone: ''
      },
      leadApplicationStatusEnum: appConstants.lead_application_status,

      sortingOptionsArray: [
        {
          label: 'Latest',
          value: appConstants.lead_application_sort_type.CREATED_DATE
        },
        {
          label: 'Paid',
          value: appConstants.lead_application_sort_type.PAID
        },
        {
          label: 'Accepted',
          value: appConstants.lead_application_sort_type.ACCEPTED
        },
        {
          label: 'Rejected',
          value: appConstants.lead_application_sort_type.REJECTED
        }
      ],
      application_sort_order: {
        label: 'Latest',
        value: appConstants.lead_application_sort_type.CREATED_DATE
      },
      showDeleteModal: false
    }
  },
  computed: {
    ...mapGetters('lead', [
      'getLeadDetails',
      'getLeadAllApplicants',
      'showLeadModal',
      'LeadModalMessage'
    ]),
    ...mapGetters(['userData']),
    getUniqueKey() {
      return getRandomString()
    }
  },
  methods: {
    ...mapActions('lead', [
      'fetchLeadsDetails',
      'fetchLeadsApplicantsDetails',
      'deleteLead',
      'fetchLeadsDetailsFromEncryptedID',
      'changeLeadApplicationStatus'
    ]),
    ...mapMutations('lead', ['updateShowLeadModal']),
    ...mapActions('user', ['fetchOneOlousUserData']),
    // eslint-disable-next-line no-unused-vars
    sortBy(sort) {
      this.currentPage = 0
      this.hasMoreApplicants = true
      this.getAllLeadApplicants()
    },

    getKey(value) {
      let new_key = `${value}_${this.getUniqueKey}`
      return new_key
    },

    getPageDetails() {
      let pageNumber = this.currentPage + 1
      let applicationsPerPage = 10
      let data = {
        lead_id: this.lead_id,
        page: pageNumber,
        limit: applicationsPerPage,
        sort_order: this.application_sort_order.value
      }
      return data
    },
    getAllLeadApplicants() {
      let isFocusFirstApplicant = false

      if (this.currentPage == 0) {
        isFocusFirstApplicant = true
      }
      if (
        this.currentPage == 0 ||
        (this.currentPage > 0 && this.hasMoreApplicants != null)
      ) {
        let payload = this.getPageDetails()
        this.busy = true
        this.fetchLeadsApplicantsDetails(payload).then((result) => {
          this.currentPage = payload.page
          this.busy = false
          this.hasMoreApplicants = result

          if (isFocusFirstApplicant) {
            this.focusFirstApplicant()
          }
        })
      }
    },
    showLeadInfo() {
      // alert('show alert')
      this.$refs['showLeadDetails'].show()
    },
    hideLeadDetails() {
      this.$refs['showLeadDetails'].hide()
    },
    viewApplicantDetailsEvent(value) {
      this.selected_applicant = value
      this.changeApplicationStatusToUnderReview(value)
    },
    focusFirstApplicant() {
      if (this.getLeadAllApplicants.length > 0) {
        // this.selected_applicant.id = this.getLeadAllApplicants[0].id
        this.viewApplicantDetailsEvent(this.getLeadAllApplicants[0])
      } else {
        return
      }
    },
    isApplicantSelected(applicant_id) {
      if (this.selected_applicant.id == applicant_id) {
        return true
      } else {
        return false
      }
    },
    changeApplicationStatusToUnderReview(selected_application) {
      if (
        selected_application.application_status ==
        appConstants.lead_application_status.OPEN
      ) {
        this.changeApplicationStatus(
          appConstants.lead_application_status.UNDER_REVIEW
        )
      }
    },
    changeApplicationStatus(status) {
      let payload = {
        application_id: this.selected_applicant.id,
        status: status
      }
      this.changeLeadApplicationStatus(payload)
    },
    isShowButtonRow() {
      if (
        this.selected_applicant.application_status ==
          appConstants.lead_application_status.OPEN ||
        this.selected_applicant.application_status ==
          appConstants.lead_application_status.UNDER_REVIEW
      ) {
        return true
      } else {
        return false
      }
    },

    isShowContactButton() {
      if (
        this.selected_applicant.application_status >=
        appConstants.lead_application_status.PAID
      ) {
        return true
      } else {
        return false
      }
    },
    showContactDetailsPopup() {
      //fetch contatc details
      this.resetContactDetails()

      if (
        this.selected_applicant.application_status >=
        appConstants.lead_application_status.PAID
      ) {
        this.setUserContactDetails()
        this.$refs['showLeadApplicantContactDetails'].show()
      }
    },
    hideContactDetailsPopup() {
      this.$refs['showLeadApplicantContactDetails'].hide()
      this.resetContactDetails()
    },
    resetContactDetails() {
      this.selected_applicant_contact.contact_name = ''
      this.selected_applicant_contact.slug = ''
      this.selected_applicant_contact.olous_url = ''
      this.selected_applicant_contact.email = ''
      this.selected_applicant_contact.country_code = ''
      this.selected_applicant_contact.phone = ''

      this.selected_applicant_contact.isAppliedAsBusiness = false
      this.selected_applicant_contact.company_name = ''
      this.selected_applicant_contact.company_slug = ''
      this.selected_applicant_contact.company_url = ''
    },
    setUserContactDetails() {
      this.fetchOneOlousUserData(
        this.selected_applicant.applicant_user_id
      ).then((response) => {
        if (response.is_email_verified) {
          this.selected_applicant_contact.email = response.email
        }

        if (
          response.is_phone_verified &&
          response.phone != '' &&
          response.phone != null &&
          response.country_code != '' &&
          response.country_code != null
        ) {
          this.selected_applicant_contact.phone = response.phone
          this.selected_applicant_contact.country_code = response.country_code
        }

        this.selected_applicant_contact.contact_name = `${response.first_name} ${response.last_name}`
        this.selected_applicant_contact.slug = response.slug
        this.selected_applicant_contact.olous_url = `${appConstants.WEB_URL}${response.slug}`
      })

      //set businee details
      if (this.isBussinessApplicant) {
        this.selected_applicant_contact.isAppliedAsBusiness = true
        this.selected_applicant_contact.company_name = this.selected_applicant.applicant_details.name
        this.selected_applicant_contact.company_slug = this.selected_applicant.applicant_details.slug
        this.selected_applicant_contact.company_url = `${appConstants.PORTFOLIO_URL}${this.selected_applicant.applicant_details.slug}`
      }
    },
    isBussinessApplicant() {
      if (
        this.selected_applicant.applied_as ==
        appConstants.lead_applied_as.COMPANY
      ) {
        return true
      } else {
        return false
      }
    },
    isDeleteButtonVisible() {
      if (
        this.userData.id == this.leadData.user_id &&
        this.leadData.no_of_applicants == 0
      ) {
        return true
      } else {
        return false
      }
      // if (this.leadData.no_of_applicants == 0) {
      //   return true
      // } else {
      //   return false
      // }
    },
    isAdminUser() {
      return this.userData.is_admin
    },
    showDeleteConfirmationModal(e) {
      this.showDeleteModal = true
      e.preventDefault()
    },
    hideDeleteConfirmationModal() {
      this.showDeleteModal = false
    },
    leadDelete(e) {
      // alert('delete lead')
      this.deleteLead({ id: this.leadData.id }).then(() => {
        this.goToLeadsListPage()
        e.preventDefault()
      })

      this.hideDeleteConfirmationModal()
    },
    goToLeadsListPage() {
      this.$router.push({ name: appConstants.routes.LEAD })
    },

    showLeadSuggestions() {
      this.$router.push({
        name: appConstants.routes.LEAD_SUGGESTIONS,
        params: { lead_id: this.leadData.id }
      })
    }
  },
  created() {
    this.lead_id = this.$route.params.lead_id
    this.fetchLeadsDetailsFromEncryptedID(this.$route.params.lead_id).then(
      () => {
        this.leadData = this.getLeadDetails
      }
    )

    this.getAllLeadApplicants()
    // this.focusFirstApplicant()
  },

  beforeDestroy() {
    this.updateShowLeadModal([false, ''])
  }
}
</script>

<style scoped>
a {
  color: #000000 !important;
}
a:hover,
a:active,
a:focus,
a:visited {
  color: #0056b3 !important;
}

.image-icon {
  width: 40px;
  height: 40px;
}
.tab-list {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  /* border: solid 1px #416c80;
  background-color: #416c80; */
}

.header-height {
  height: 48px;
}

.applicant-cv-div {
  /* width: 100%; */
  max-height: 100vh;
  overflow-y: auto;
}

.applicant-container-body {
  padding: 16px;
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.16);
  /* border: solid 1px #d8d8d8; */
  background-color: var(--white);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.scrollable-div {
  height: 100%;
  overflow-y: scroll;
}

.container-div {
  /* height: 600px; */
  min-height: 100px;
  max-height: 600px;
}
.applicant-text {
  flex-basis: 100px;
  flex-grow: 0;
  flex-shrink: 0;
}

.top-radious {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.same-width-column {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0px;
}
</style>
