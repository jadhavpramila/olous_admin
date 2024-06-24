<template>
  <div class="leads-list">
    <div class="form-conatiner cls-enquiry">
      <div class="form-max-width">
        <div
          v-infinite-scroll="getAllEnqueries"
          infinite-scroll-disabled="busy"
          infinite-scroll-distance="80"
        >
          <div
            class="row lead-card-row ml-0 mr-0"
            v-for="(enquery, counter) in getAllEnqueryList"
            :key="counter"
          >
            <div
              class="col-md-10 Lead-card bgGrayLightColor mb-3 border rounded-lg"
              @dblclick="viewEnquery(enquery)"
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
                  <div class="row mt-1">
                    <div class="col-md-8">
                      <label class="app-primary-text-color font-weight-bold">
                        {{ enquery.contact_name }}</label
                      >
                    </div>
                    <div class="col-md-4">
                      <div>
                        <label
                          class="fontSize12 app-primary-text-color font-weight-bold"
                        >
                          {{ enquery.enquiry_company_name }}</label
                        >
                      </div>
                    </div>
                  </div>
                  <!-- <div>
                    <label class="fontSize12">
                      {{ enquery.email }}, +{{ enquery.country_code }}
                      {{ enquery.phone }}
                    </label>
                  </div>-->
                  <div class="row mt-2">
                    <div class="col-md-8">
                      <label class="fontSize12 lead_req">{{
                        getEnqueryRequiremnttext(enquery)
                      }}</label>
                    </div>
                    <div class="col-md-4">
                      <label class="fontSize12">{{
                        getLocation(enquery)
                      }}</label>
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
                <i
                  class="fa fa-info-circle fa-2x cursor-pointer"
                  style="margin-top: -5px"
                  aria-hidden="true"
                  title="View enquiry"
                  @click="setDataOnEditEnquery(enquery)"
                ></i>
              </div>
              <!--<div>
                <img
                  class="cursor-pointer ml-3"
                  @click="showDeleteConfirmationModal(enquery)"
                  src="../../assets/img/Delete.svg"
                  title="Delete lead"
                />
              </div>-->
            </div>
          </div>
        </div>
      </div>
      <modal v-if="showDeleteModal" @closeModal="hideDeleteConfirmationModal">
        <div slot="body">Do you really want to delete this Enquery?</div>
        <div slot="footer">
          <b-button
            class="btn"
            variant="outline-dark"
            @click="hideDeleteConfirmationModal"
          >
            Cancel
          </b-button>
          <b-button
            class="ml-2 btn"
            variant="outline-dark"
            @click="enqueryDelete"
          >
            Yes
          </b-button>
        </div>
      </modal>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import modal from '../../common/Modal'
import appConstants from '../../appConstants.js'

export default {
  name: 'EnquiryList',
  components: {
    modal
  },
  data() {
    return {
      currentPage: 0,
      hasMoreEnqueries: true,
      busy: false,
      deleteEnqueryId: '',
      showDeleteModal: false
    }
  },
  computed: {
    ...mapGetters('enquery', ['getAllEnqueryList', 'getEnqueryDetails'])
  },

  methods: {
    ...mapMutations('enquery', ['enqueryResetState']),
    ...mapActions('enquery', ['fetchEnqueries', 'editEnquery']),
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
      let enqueriesPerPage = 10
      let offset = (pageNumber - 1) * enqueriesPerPage
      let data = {
        pageNumber: pageNumber,
        enqueriesPerPage: enqueriesPerPage,
        offset: offset
      }
      return data
    },
    getAllEnqueries() {
      if (
        this.currentPage == 0 ||
        (this.currentPage > 0 && this.hasMoreEnqueries == 'true')
      ) {
        let data = this.getPageDetails()
        this.busy = true
        this.fetchEnqueries(data).then((result) => {
          this.currentPage = data.pageNumber
          this.busy = false
          this.hasMoreEnqueries = result
        })
      }
    },
    getLocation(enquery) {
      let loc = ''
      if (enquery.city) {
        loc = `${enquery.city}, `
      }
      if (enquery.state) {
        loc = `${loc}${enquery.state}, `
      }
      if (enquery.country) {
        loc = `${loc}${enquery.country}`
      }

      let lastCha = loc.slice(loc.length - 1, loc.length)
      if (lastCha == ',') {
        loc = loc.slice(0, loc.length - 1)
      }

      return loc
    },
    getEnqueryRequiremnttext(enquery) {
      if (enquery.requirement.length < 200) {
        return enquery.requirement
      } else {
        var str = enquery.requirement.substring(0, 201) //0 to 200 char
        return `${str}...`
      }
    },
    setDataOnEditEnquery(lead) {
      this.editEnquery(lead)
      this.$router.push({ name: appConstants.routes.ENQUERY_DETAILS })
    },
    viewEnquery(lead) {
      this.setDataOnEditEnquery(lead)
    },

    showDeleteConfirmationModal(deleteEnquery) {
      this.deleteEnqueryId = deleteEnquery
      this.showDeleteModal = true
    },
    hideDeleteConfirmationModal() {
      this.deleteEnqueryId = ''
      this.showDeleteModal = false
    },
    enqueryDelete() {
      // this.deleteLead(this.deleteEnqueryId)
      this.hideDeleteConfirmationModal()
    }
  },
  created() {
    this.enqueryResetState()
    this.getAllEnqueries()
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
.lead_req {
  word-break: break-all;
}
.action-row {
  display: flex;
  justify-content: flex-start;
}
.action-row div {
  display: flex;
  align-items: center;
}

.cursor-pointer {
  cursor: pointer;
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
