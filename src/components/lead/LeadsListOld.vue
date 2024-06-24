<template>
  <div class="leads-list">
    <div class="form-conatiner cls-leadlist">
      <div class="d-flex justify-content-end">
        <span class="add-button" @click="addClick">Add Lead</span>
      </div>
      <div class="form-max-width mt-4">
        <div
          v-infinite-scroll="getAllLeads"
          infinite-scroll-disabled="busy"
          infinite-scroll-distance="80"
        >
          <div
            class="row lead-card-row ml-0 mr-0"
            v-for="(lead, counter) in getAllLeadsList"
            :key="counter"
          >
            <div
              class="col-md-10 Lead-card bgGrayLightColor mb-3 border rounded-lg"
              @dblclick="viewLead(lead)"
            >
              <div class="row">
                <!--<div
                  class="col-1 lead_image mt-1 mb-1"
                  style="display: flex; flex-direction: row"
                >
                  <img
                    class="imgjob"
                    src="../../assets/img/Job_List_Company.svg"
                  />
                </div>-->
                <div class="col-12 mt-3 mb-3 fon">
                  <div v-if="lead.status == leadStatus.OPEN" class="status-row">
                    <div class="lead-status">OPEN</div>
                  </div>
                  <div
                    v-if="lead.status == leadStatus.APPROVED"
                    class="status-row"
                  >
                    <div class="lead-status">APPROVED</div>
                  </div>
                  <div
                    v-if="lead.status == leadStatus.REJECTED"
                    class="status-row"
                  >
                    <div class="lead-status">REJECTED</div>
                  </div>
                  <div class="row mt-1">
                    <div class="col-md-8">
                      <label class="app-primary-text-color font-weight-bold">
                        {{ lead.contact_name }}</label
                      >
                    </div>
                    <div class="col-md-4">
                      <div v-if="lead.urgent">
                        <!--<img src="../../assets/img/Urgent.svg" title="" />-->
                        <label
                          class="fontSize12 app-primary-text-color font-weight-bold"
                          >Urgent</label
                        >
                      </div>
                    </div>
                  </div>
                  <div class="row mt-1">
                    <div class="col-md-8">
                      <label class="fontSize12 lead_req">{{
                        getLeadRequiremnttext(lead)
                      }}</label>
                    </div>
                    <div class="col-md-4">
                      <label class="fontSize12">{{ getLocation(lead) }}</label>
                    </div>
                    <!--<div class="col-md-3">
                      <label class="fontSize12">
                         {{
                        getDateDifference(lead) 
                      }}
                      </label>
                    </div>-->
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-2 row ml-0 mb-3 action-row">
              <div>
                <img
                  class="cursor-pointer"
                  @click="setDataOneditLead(lead)"
                  title="Edit lead"
                  src="../../assets/img/Edit.svg"
                />
              </div>
              <div>
                <img
                  class="cursor-pointer ml-3"
                  @click="showDeleteConfirmationModal(lead)"
                  src="../../assets/img/Delete.svg"
                  title="Delete lead"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <modal v-if="showDeleteModal" @closeModal="hideDeleteConfirmationModal">
        <div slot="body">Do you really want to delete this lead?</div>
        <div slot="footer">
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
import '../../assets/css/appcolor.css'

export default {
  name: 'LeadsList',
  components: {
    modal
  },
  data() {
    return {
      currentPage: 0,
      hasMoreJobs: true,
      busy: false,
      leadStatus: appConstants.leadStatus,
      deleteLeadId: '',
      showDeleteModal: false
    }
  },
  computed: {
    ...mapGetters('lead', ['getAllLeadsList', 'getCompaniesToAllocate'])
  },

  methods: {
    ...mapMutations('lead', ['clearAllPreviousLeadData']),
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
        (this.currentPage > 0 && this.hasMoreJobs == 'true')
      ) {
        let data = this.getPageDetails()
        this.busy = true
        this.fetchAllLeads(data).then((result) => {
          this.currentPage = data.pageNumber
          this.busy = false
          this.hasMoreJobs = result
        })
      }
    },
    getLocation(lead) {
      let loc = ''
      if (lead.city) {
        loc = `${lead.city}, `
      }
      if (lead.state) {
        loc = `${loc}${lead.state}, `
      }
      if (lead.country) {
        loc = `${loc}${lead.country}`
      }

      let lastCha = loc.slice(loc.length - 1, loc.length)
      if (lastCha == ',') {
        loc = loc.slice(0, loc.length - 1)
      }

      return loc
    },
    getLeadRequiremnttext(lead) {
      if (lead.requirement.length < 100) {
        return lead.requirement
      } else {
        var str = lead.requirement.substring(0, 101) //0 to 100 char
        return `${str}...`
      }
    },
    setDataOneditLead(lead) {
      this.editLead(lead)
      this.$router.push({ name: appConstants.routes.UPDATE_LEAD })
    },
    viewLead(lead) {
      this.setDataOneditLead(lead)
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
.form-conatiner {
  margin-top: 20px;
}
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
