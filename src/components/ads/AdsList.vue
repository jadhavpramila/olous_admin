<template>
  <div>
    <div class="form-conatiner">
      <div>
        <div class="mt-4">
          <div
            v-infinite-scroll="fetchAllAdsList"
            infinite-scroll-disabled="busy"
            infinite-scroll-distance="80"
          >
            <div
              class="row ad-card-row ml-0 mr-0"
              v-for="(ad_data, counter) in getAllAdsList"
              :key="counter"
            >
              <div
                class="col-md-10 ad-card bgGrayLightColor mb-3"
                @dblclick="viewAd(ad_data)"
              >
                <div class="row">
                  <div class="col-2 ad-image">
                    <img
                      class="default_image"
                      src="../../assets/img/Job_List_Company.svg"
                    />
                  </div>
                  <div class="col-10 mt-3 mb-3 fon">
                    <div>
                      <div class="ad_publish">Running</div>
                    </div>
                    <!-- <div v-else><div class="ad_publish">Closed</div></div>-->
                    <!-- <div v-else><div class="ad_publish">Scheduled</div></div>-->

                    <div class="">
                      <label class="app-primary-text-color font-weight-bold">{{
                        ad_data.headline
                      }}</label>
                    </div>
                    <div class="row">
                      <div class="col-md-5">
                        <label class="fontSize12">{{
                          ad_data.company_name
                        }}</label>

                        <!--<div>
                          <label class="fontSize12">{{ 'Ad Duration' }}</label>
                        </div>-->
                      </div>
                      <div class="col-md-7">
                        <div>
                          <label class="fontSize12 date-width" align="right"
                            >From Date :
                          </label>
                          <label class="fontSize12">{{
                            getLocalDate(ad_data.from_date)
                          }}</label>
                        </div>
                        <div>
                          <label class="fontSize12 date-width" align="right"
                            >To Date &nbsp;&nbsp;&nbsp;:
                          </label>
                          <label class="fontSize12">{{
                            getLocalDate(ad_data.to_date)
                          }}</label>
                        </div>
                      </div>
                      <!--<div class="col-md-3">
                        <label class="fontSize12">{{
                          getDateDifference(job)
                        }}</label>
                      </div>-->
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-2 row ml-0 mb-3 action-row">
                <div>
                  <img
                    class="cursor-pointer"
                    @click="setDataOnEditAd(ad_data)"
                    title="Edit Ad"
                    src="../../assets/img/Edit.svg"
                  />
                </div>
                <div>
                  <img
                    class="cursor-pointer ml-3"
                    @click="showDeleteConfirmationModal(ad_data)"
                    src="../../assets/img/Delete.svg"
                    title="Delete Ad"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="getAllAdsList.length == 0">No record found</div>
      </div>
    </div>
    <modal v-if="showDeleteModal" @closeModal="hideDeleteConfirmationModal">
      <div slot="body">Do you really want to delete this Ad?</div>
      <div slot="footer">
        <b-button
          class="btn"
          variant="outline-dark"
          @click="hideDeleteConfirmationModal"
        >
          Cancel
        </b-button>
        <b-button class="ml-2 btn" variant="outline-dark" @click="AdDelete">
          OK
        </b-button>
      </div>
    </modal>
    <!--<template>
      <b-modal ref="delete-modal" hide-footer title="Delete job">
        <div class="d-block text-center">
          <h4>Do you really want to delete this job?</h4>
        </div>
        <b-button
          class="mt-3"
          variant="outline-danger"
          @click="hideDeleteConfirmationModal"
          >Cancel</b-button
        >
        <b-button class="mt-3 ml-3" variant="outline-primary" @click="AdDelete"
          >OK</b-button
        >
      </b-modal>
    </template>-->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
import appConstants from '../../appConstants.js'
import modal from '../../common/Modal'
export default {
  name: 'AdsList',
  components: {
    modal
  },
  data() {
    return {
      ads: [],
      currentPage: 0,
      hasMoreAds: true,
      deleteAdId: '',
      busy: false,
      showDeleteModal: false
    }
  },

  computed: {
    ...mapGetters('ads', ['getAllAdsList'])
  },
  methods: {
    ...mapActions('ads', [
      'fetchAllAds',
      'deleteAd',
      'editAd',
      'fetchAdBySearchText'
    ]),

    getPageDetails() {
      let pageNumber = this.currentPage + 1
      let adsPerPage = 15
      let offset = (pageNumber - 1) * adsPerPage
      let data = {
        pageNumber: pageNumber,
        adsPerPage: adsPerPage,
        offset: offset
      }
      return data
    },

    getDateDifference(job) {
      if (job.is_published) {
        return moment(job.published_at).format('DD MMM YYYY')
      } else {
        return moment(job.updated_at).format('DD MMM YYYY')
      }
    },
    setDataOnEditAd(adData) {
      this.editAd(adData)
      this.$router.push({ name: appConstants.routes.UPDATE_AD })
    },
    viewAd(adData) {
      this.editAd(adData)
      this.$router.push({ name: appConstants.routes.UPDATE_AD })
    },
    AdDelete() {
      this.deleteAd(this.deleteAdId)
      this.hideDeleteConfirmationModal()
    },
    fetchAllAdsList() {
      if (
        this.currentPage == 0 ||
        (this.currentPage > 0 && this.hasMoreAds != false)
      ) {
        let data = this.getPageDetails()
        this.busy = true
        this.fetchAllAds(data).then((result) => {
          this.currentPage = data.pageNumber
          this.busy = false
          this.hasMoreAds = result
        })
      }
    },
    showDeleteConfirmationModal(deleteAd) {
      this.deleteAdId = deleteAd
      //this.$refs['delete-modal'].show()
      this.showDeleteModal = true
    },
    hideDeleteConfirmationModal() {
      this.deleteAdId = ''
      //this.$refs['delete-modal'].hide()
      this.showDeleteModal = false
    },
    searchAds(value) {
      this.currentPage = 0
      this.hasMoreAds = true
      this.busy = true // set to true to stop infinite scroll in case of ad SEARCH RESULT
      this.fetchAdBySearchText(value.searchText)
    },
    getLocalDate(dateTime_obj) {
      let local_date = new Date(dateTime_obj)
      //return moment(local_date).format('LL')
      return moment(local_date).format('MMM Do YYYY, h:mm a')
    }
  },
  created() {
    this.fetchAllAdsList()
    this.$eventHub.$on('search-ads', this.searchAds)
  },
  beforeDestroy() {
    this.$eventHub.$off('search-ads')
  }
}
</script>

<style scoped>
.ad-card .ad-image {
  margin: auto;
  object-fit: fill;
}

.ad-card {
  cursor: pointer;
  border-radius: 8px;
}

.ad_publish {
  height: 25px;
  padding: 0;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 0px;
  border-bottom-left-radius: 8px;
  border-top-right-radius: 8px;
  text-transform: capitalize;
  float: right;
  margin-right: -15px;
  margin-top: -16px;
  background-color: #a5a1a1;
  font-weight: bold;
}
.action-row {
  display: flex;
  justify-content: flex-end;
}

.cursor-pointer {
  cursor: pointer;
}

.date-width {
  min-width: 75px;
}

@media only screen and (max-width: 992px) {
  .ad-card .ad-image .default_image {
    transform: scale(1.5);
    margin-left: 10px;
  }

  .page-header {
    margin-top: -60px !important;
  }
}
</style>
