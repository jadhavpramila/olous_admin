<template>
  <div class="leads-list">
    <div class="form-conatiner cls-leadlist">
      <div
        class="joblist-container"
        v-if="!(allCompanies.length == 0 && !userData.is_admin)"
      >
        <div class="">
          <div class="d-flex justify-content-between job-list-titles">
            <div class="col-md-9 d-flex p-0">
              <div class="align-items-end d-flex">
                <ul
                  class="d-flex pl-0 mb-0 align-items-center"
                  style="list-style: none"
                >
                  <li class="mr-3 cursor-pointer">
                    <span
                      class="company-tab"
                      @click="applyFilter(lead_filter_type_enum.OPEN)"
                      :class="{
                        'company-tab-active':
                          getCurrentLeadFilterType == lead_filter_type_enum.OPEN
                      }"
                    >
                      Open
                    </span>
                  </li>
                  <li class="mr-3 cursor-pointer">
                    <span
                      class="company-tab"
                      @click="applyFilter(lead_filter_type_enum.APPROVED)"
                      :class="{
                        'company-tab-active':
                          getCurrentLeadFilterType ==
                          lead_filter_type_enum.APPROVED
                      }"
                    >
                      Approved
                    </span>
                  </li>
                  <li class="ml-1 mr-3 cursor-pointer">
                    <span
                      class="company-tab"
                      @click="applyFilter(lead_filter_type_enum.REJECTED)"
                      :class="{
                        'company-tab-active':
                          getCurrentLeadFilterType ==
                          lead_filter_type_enum.REJECTED
                      }"
                    >
                      Rejected
                    </span>
                  </li>
                  <li class="ml-1 mr-3 cursor-pointer">
                    <span
                      class="company-tab"
                      @click="applyFilter(lead_filter_type_enum.EXPIRED)"
                      :class="{
                        'company-tab-active':
                          getCurrentLeadFilterType ==
                          lead_filter_type_enum.EXPIRED
                      }"
                    >
                      Expired
                    </span>
                  </li>
                  <!-- <li class="ml-1 mr-3 cursor-pointer">
                  <span
                    class="job-list-button"
                    @click="applyFilter(lead_filter_type_enum.COMPANIES)"
                    :class="{
                      'job-list-button-active':
                        getCurrentLeadFilterType ==
                        lead_filter_type_enum.COMPANIES
                    }"
                  >
                    REJECTED
                  </span>
                </li> -->
                  <!-- <li class="ml-1 mr-3 cursor-pointer">
                  <span
                    class="job-list-button"
                    @click="applyFilter(lead_filter_type_enum.USER)"
                    :class="{
                      'job-list-button-active':
                        getCurrentLeadFilterType == lead_filter_type_enum.USER
                    }"
                  >
                    User Leads
                  </span>
                </li>-->
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
          </div>
          <div
            v-infinite-scroll="getAllLeads"
            infinite-scroll-disabled="busy"
            infinite-scroll-distance="80"
            class="mt-4"
          >
            <div v-if="getAllLeadsList.length > 0">
              <div class="row ml-0">
                <div
                  v-if="getCurrentLeadFilterType == lead_filter_type_enum.OPEN"
                  class="pl-1 col-lg-3 col-md-4 col-12"
                >
                  <div style="width: 100%; height: 100%; margin-bottom: 20px">
                    <LeadCard leaData="null" id="newLeadAddButton"></LeadCard>
                  </div>
                </div>

                <div
                  v-for="(lead, index) in getAllLeadsList"
                  :key="index"
                  class="pl-1 col-lg-3 col-md-4 col-12"
                >
                  <div style="width: 100%; height: 100%; margin-bottom: 20px">
                    <LeadCard
                      :leadData="lead"
                      :key="getKey(lead.id, index)"
                    ></LeadCard>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div
                v-if="getCurrentLeadFilterType == lead_filter_type_enum.OPEN"
              >
                <div class="row ml-0">
                  <div
                    v-if="
                      getCurrentLeadFilterType == lead_filter_type_enum.OPEN
                    "
                    class="pl-1 col-lg-3 col-md-4 col-12"
                  >
                    <div style="width: 100%; height: 100%; margin-bottom: 20px">
                      <LeadCard leaData="null" id="newLeadAddButton"></LeadCard>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else>No record found</div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>You don't have company, please create company first</div>
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
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import appConstants from '../../appConstants.js'
import modal from '../../common/Modal'
import LeadCard from './leadComponent/LeadCard.vue'
import '../../assets/css/appcolor.css'

export default {
  name: 'LeadsList',
  components: {
    modal,
    LeadCard
  },
  data() {
    return {
      currentPage: 0,
      hasMoreLeads: true,
      busy: false,
      leadStatus: appConstants.leadStatus,
      deleteLeadId: '',
      showDeleteModal: false,
      lead_filter_type_enum: appConstants.lead_filter_type
    }
  },
  computed: {
    ...mapGetters(['allCompanies', 'userData']),
    ...mapGetters('lead', [
      'getAllLeadsList',
      'getCompaniesToAllocate',
      'getCurrentLeadFilterType'
    ])
  },

  methods: {
    ...mapMutations('lead', [
      'clearAllPreviousLeadData',
      'setCurrentLeadFilterType'
    ]),
    ...mapActions('lead', ['fetchAllLeads', 'editLead', 'deleteLead']),
    showErrorNotification(errorMessage) {
      var message = errorMessage
      if (errorMessage == '') {
        message = 'Something went wrong!'
      }
      this.$notify({
        group: 'error',
        type: 'error',
        text: message
      })
    },
    getPageDetails() {
      let pageNumber = this.currentPage + 1
      let jobPerPage = 10
      let offset = (pageNumber - 1) * jobPerPage
      let data = {
        pageNumber: pageNumber,
        leadPerPage: jobPerPage,
        offset: offset
      }
      return data
    },
    getAllLeads() {
      if (
        this.currentPage == 0 ||
        (this.currentPage > 0 && this.hasMoreLeads != null)
      ) {
        let data = this.getPageDetails()
        data['type'] = this.getCurrentLeadFilterType
        this.busy = true
        this.fetchAllLeads(data).then((result) => {
          this.currentPage = data.pageNumber
          this.busy = false
          this.hasMoreLeads = result
        })
      }
    },

    clearAllEditLeadData() {
      this.clearAllPreviousLeadData()
    },
    showDeleteConfirmationModal(deleteJob) {
      this.deleteLeadId = deleteJob
      //this.$refs['delete-modal'].show()
      this.showDeleteModal = true
    },
    hideDeleteConfirmationModal() {
      this.deleteLeadId = ''
      //this.$refs['delete-modal'].hide()
      this.showDeleteModal = false
    },
    leadDelete() {
      this.deleteLead(this.deleteLeadId)
      this.hideDeleteConfirmationModal()
    },
    addClick() {
      this.$router.push({ name: appConstants.routes.ADD_LEAD })
    },
    applyFilter(value) {
      this.setCurrentLeadFilterType(value)
      this.currentPage = 0
      this.hasMoreLeads = true
      this.getAllLeads()
    },
    getKey(id, index) {
      return `${id}_${index}`
    }
  },
  created() {
    this.getAllLeads()
    this.clearAllEditLeadData()
  }
}
</script>

<style scoped>
.btnSearchjob {
  margin-top: 5px;
}

/* .actioncolumn {
  background-color: ;
} */

.job-card .job_image {
  margin: auto;
  object-fit: fill;
}

.job-card {
  cursor: pointer;
  border-radius: 8px;
}

.status-row {
  display: flex;
  flex-direction: row-reverse;
}
.lead-status {
  height: 25px;
  padding: 0;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 0px;
  border-bottom-left-radius: 8px;
  border-top-right-radius: 8px;
  text-transform: capitalize;
  /* float: right;*/
  margin-right: -15px;
  margin-top: -16px;
  background-color: #a5a1a1;
  font-weight: bold;
}
.action-row {
  display: flex;
  justify-content: flex-start;
}

.cursor-pointer {
  cursor: pointer;
}
/* .form-conatiner {
  margin-top: 20px;
} */
.add-button {
  width: 130px;
  height: 35px;
  padding: 8px 24px 8px;
  border-radius: 8px;
  background-color: var(--app-primary-color);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.job-list-titles {
  /* border-radius: 8px;
  border: solid 1px rgba(0, 0, 0, 0);
  background-color: #416c80;
  color: #fff;margin-right: 12px; */
  padding: 4px 8px 4px 8px;
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

@media only screen and (max-width: 992px) {
  .job-card .job_image .imgjob {
    transform: scale(2);
    margin-left: 10px;
  }

  .page-header {
    margin-top: -60px !important;
  }

  .action-row {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
