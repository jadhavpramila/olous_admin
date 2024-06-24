<template>
  <div class="news-list">
    <div class="form-conatiner">
      <div class="d-flex justify-content-end">
        <span class="btn" @click="addClick">Add News</span>
      </div>
      <div class="mt-4">
        <!-- <pre>{{ getAllNewsList }}</pre> -->
        <div class="form-group" style="">
          <!--<label>Search by</label>-->
          <v-select
            multiple
            label="display_string"
            v-model="searchBy"
            :options="getInterestOptions"
            placeholder="Apply filter"
            :reduce="(interest) => interest.id"
            :closeOnSelect="true"
            @input="applyFiltr"
            class=""
          />
        </div>
        <div
          v-infinite-scroll="getAllNews"
          infinite-scroll-disabled="busy"
          infinite-scroll-distance="80"
        >
          <div
            class="row lead-card-row ml-0 mr-0"
            v-for="(news, index) in getAllNewsList"
            :key="index"
          >
            <div class="col-lg-8 news-card bgGrayLightColor mb-3">
              <div class="">
                <div class="row mt-3 mb-3">
                  <div class="col-lg-6">
                    <div class="single-img-div">
                      <img
                        :src="getImageURL(news)"
                        class="w-full object-cover h-full"
                        style="width: 100%; object-fit: cover; height: 100%"
                      />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="row mt-2">
                      <div class="col-sm-3 col-md-3 col-lg-3">
                        <label class="app-primary-text-color">Title </label
                        ><span class="colon">:</span>
                      </div>
                      <div class="col-sm-9 col-md-9 col-lg-9">
                        <label class="">{{
                          convertToEllipsisSTring(news.title)
                        }}</label>
                      </div>
                    </div>

                    <!--<div class="row mt-2">
                      <div class="col-sm-3 col-md-3 col-lg-3">
                        <label class="app-primary-text-color">Content </label
                        ><span class="colon">:</span>
                      </div>
                      <div class="col-sm-9 col-md-9 col-lg-9">
                        <label>{{
                          convertToEllipsisSTring(news.content)
                        }}</label>
                      </div>
                    </div>-->

                    <div class="row mt-2">
                      <div class="col-sm-3 col-md-3 col-lg-3">
                        <label class="app-primary-text-color">URL</label>
                        <span class="colon">:</span>
                      </div>
                      <div class="col-sm-9 col-md-9 col-lg-9">
                        <a :href="news.url" target="_blank">
                          <label class="url-value cursor-pointer">
                            {{ getHostName(news.url) }}
                          </label>
                        </a>
                      </div>
                    </div>

                    <div class="row mt-2">
                      <div class="col-sm-3 col-md-3 col-lg-3">
                        <label class="app-primary-text-color">Date</label>
                        <span class="colon">:</span>
                      </div>
                      <div class="col-sm-9 col-md-9 col-lg-9">
                        <label>{{ getLocalDateTime(news.live_date) }}</label>
                        <span v-if="news.is_live" class="dot-green ml-1"></span>
                        <span v-else class="dot-red ml-1"></span>
                      </div>
                    </div>

                    <div class="row mt-2">
                      <div class="col-sm-3 col-md-3 col-lg-3">
                        <label class="app-primary-text-color">Interest</label>
                        <span class="colon">:</span>
                      </div>
                      <div class="col-sm-9 col-md-9 col-lg-9">
                        <label class="tags-value">
                          {{ getInterestAsString(news.interest_categories) }}
                        </label>
                      </div>
                    </div>

                    <div class="row mt-2">
                      <div class="col-sm-3 col-md-3 col-lg-3">
                        <label class="app-primary-text-color">Region</label>
                        <span class="colon">:</span>
                      </div>
                      <div class="col-sm-9 col-md-9 col-lg-9">
                        <!--<label class="tags-value">
                          {{ getRegion(news) }}
                        </label>-->
                        <select
                          class="form-control input-lg col-lg-11"
                          v-model="news.is_international"
                          name="region"
                          @change="updateRegionValue(news)"
                        >
                          <option value="false">India</option>
                          <option value="true">International</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <img
                class="cursor-pointer news_delete"
                title="Delete news"
                src="../../assets/img/Delete-New.svg"
                @click="btndeleteNews(news.id)"
              />
            </div>

            <!-- <div class="col-lg-2 row ml-0 mb-3 action-row">
              <div>
                <img
                  class="cursor-pointer"
                  title="Delete news"
                  src="../../assets/img/Delete.svg"
                />
              </div>
            </div>-->

            <div class="col-lg-4 mr-0 pr-0">
              <v-select
                multiple
                label="display_string"
                v-model="news.interest_categories"
                :options="getInterestOptions"
                placeholder="Select tags"
                :reduce="(interest) => interest.id"
                :closeOnSelect="false"
              />
              <div>
                <button
                  type="button"
                  class="btn block assign_tag_news"
                  style="float: right"
                  @click="AssignTagsToNews(news.id, news.interest_categories)"
                >
                  Assign tags
                </button>
              </div>
            </div>
          </div>
          <div v-if="getAllNewsList.length == 0">No record found</div>
        </div>
      </div>
      <modal
        v-if="showNewsModal"
        @closeModal="updateShowNewsModal([false, ''])"
      >
        <div slot="body">{{ this.newsMessage }}</div>
      </modal>

      <modal v-if="showDeleteModal" @closeModal="hideDeleteConfirmationModal">
        <div slot="body">Do you really want to delete this news?</div>
        <div slot="footer" class="d-flex">
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
            @click="deleteNewsFormDB"
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
import appConstants from '../../appConstants.js'
import modal from '../../common/Modal.vue'
import '../../assets/css/appcolor.css'

export default {
  name: 'NewsList',
  components: {
    modal
  },
  data() {
    return {
      currentPage: 0,
      hasMoreNews: true,
      busy: false,
      searchBy: [],
      showDeleteModal: false,
      delete_news_id: ''
    }
  },
  computed: {
    ...mapGetters('news', ['getAllNewsList', 'showNewsModal', 'newsMessage']),
    ...mapGetters('dropdownValues', ['getInterestOptions'])
  },
  methods: {
    ...mapMutations('news', [
      'clearAllPreviousNewsData',
      'updateShowNewsModal'
    ]),
    ...mapActions('news', [
      'fetchAllNewsList',
      'editNews',
      'fetchNewsByFilter',
      'updateNewsInterest',
      'deleteNews',
      'updateRegion'
    ]),
    ...mapActions('dropdownValues', ['fetchInterestsData']),
    getAllNews() {
      if (
        this.currentPage == 0 ||
        (this.currentPage > 0 && this.hasMoreNews != null)
      ) {
        // console.log('fetching data :' + this.currentPage)
        let data = this.getPageDetails()
        this.busy = true
        if (this.searchBy.length == 0) {
          //if now search criteria
          this.fetchAllNewsList(data).then((result) => {
            this.currentPage = data.pageNumber
            this.busy = false
            this.hasMoreNews = result
            console.log('getAllNewsList', this.getAllNewsList)
            // for (var i = 0; i < this.getAllNewsList.length; i++) {
            //   console.log('id :' + this.getAllNewsList[i].id)
            //   console.log(this.getAllNewsList[i].medias[0].name)
            // }
          })
        } else {
          this.fetchNewsByFilter(data).then((result) => {
            this.currentPage = data.pageNumber
            this.busy = false
            this.hasMoreNews = result
          })
        }
      }
    },
    getPageDetails() {
      let pageNumber = this.currentPage + 1
      let newsPerPage = 10
      let offset = (pageNumber - 1) * newsPerPage
      let data = {
        pageNumber: pageNumber,
        newsPerPage: newsPerPage,
        offset: offset,
        filterby: this.searchBy
      }
      return data
    },
    convertToEllipsisSTring(value) {
      if (value.length < 75) {
        return value
      } else {
        var str = value.substring(0, 101) //0 to 100 char
        return `${str}...`
      }
    },
    getHostName(newsURL) {
      var fullurl = newsURL
      var j = fullurl.indexOf('://')
      var host = ''
      for (var i = j + 3; i < fullurl.length; i++) {
        if (fullurl.charAt(i) != '/') {
          host = host + '' + fullurl.charAt(i)
        } else {
          break
        }
      }
      return host
    },
    getLocalDateTime(dtFromServer) {
      var localDate = new Date(dtFromServer)
      return localDate.toLocaleString('en-US')
    },
    getInterestAsString(userSelectedinterest) {
      var interest_string = ''
      for (var count = 0; count < userSelectedinterest.length; count++) {
        var interest = this.getInterestOptions.find(
          (x) => x.id == userSelectedinterest[count]
        )
        if (interest != undefined) {
          interest_string = interest_string + interest.display_string + ', '
        }
      }

      return interest_string.replace(/,\s*$/, '') //Remove last commaa and white sapce if any
    },
    getImageURL(news) {
      // TODO
      //return `${process.env.VUE_APP_MEDIA_IMGURL}${imageFileNAme}`
      if (
        news.medias[0] == null ||
        news.medias[0] == undefined ||
        news.medias[0] == ''
      ) {
        return ''
      } else {
        return `${process.env.VUE_APP_MEDIA_IMGURL}${news.medias[0].name}`
      }
    },
    viewNewsDetails(news) {
      this.editNews(news)
      this.$router.push({ name: appConstants.routes.UPDATE_NEWS })
    },
    applyFiltr() {
      this.currentPage = 0
      this.hasMoreJobs = 1
      this.getAllNews()
    },
    AssignTagsToNews(news_id, interest_values) {
      let reqData = {
        id: news_id,
        interest_categories: interest_values
      }
      this.updateNewsInterest(reqData)
    },
    btndeleteNews(id) {
      this.delete_news_id = id
      this.showDeleteModal = true
    },
    hideDeleteConfirmationModal() {
      this.delete_news_id = ''
      this.showDeleteModal = false
    },
    deleteNewsFormDB() {
      this.deleteNews(this.delete_news_id)
      this.hideDeleteConfirmationModal()
    },
    getRegion(news) {
      if (news.is_international) {
        return 'International'
      } else {
        return 'India'
      }
    },
    updateRegionValue(news) {
      let reqData = {
        id: news.id,
        is_international: news.is_international == 'true' ? true : false
      }
      this.updateRegion(reqData)
    },
    addClick() {
      this.$router.push({ name: appConstants.routes.ADD_NEWS })
    }
  },
  created() {
    this.fetchInterestsData()
    this.clearAllPreviousNewsData()
    this.getAllNews()
  }
}
</script>

<style scoped>
/*.form-conatiner {
   max-width: 1124px; 
  margin-top: 20px;
}
*/
.news-list select {
  height: 32px;
  font-size: 15px;
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
</style>
