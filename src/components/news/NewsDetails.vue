<template>
  <div>
    <div class="form-conatiner cls-newsdetails">
      <div class="newsDetails">
        <div class="form-max-width border bg-white p-4">
          <div class="row">
            <div class="form-group col-lg-9">
              <label>Title</label>
              <input
                type="text"
                class="form-control input-lg"
                v-model="newsData.title"
                :class="{
                  'is-invalid': submitted && $v.newsData.title.$invalid
                }"
              />
              <div
                v-if="submitted && !$v.newsData.title.required"
                class="invalid-feedback"
              >
                Title is required
              </div>
            </div>
            <div class="form-group col-lg-3" style="">
              <label>Region</label>
              <select
                class="form-control"
                v-model="newsData.is_international"
                name="region"
              >
                <option :value="false">India</option>
                <option :value="true">International</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>Interest</label>
            <v-select
              multiple
              label="display_string"
              v-model="newsData.interest_categories"
              :options="getInterestOptions"
              placeholder=""
              :reduce="(interest) => interest.id"
              :closeOnSelect="false"
              :class="{
                'is-invalid':
                  submitted && $v.newsData.interest_categories.$invalid
              }"
              class="show-dropdown-icon form-control"
            />
            <div
              v-if="submitted && !$v.newsData.interest_categories.required"
              class="invalid-feedback"
            >
              Interest is required
            </div>
          </div>

          <div class="form-group">
            <label>Live date and time</label>
            <div class="row">
              <div class="col-lg-6">
                <b-form-datepicker
                  id="datepicker-placeholder"
                  placeholder="date"
                  locale="en"
                  v-model="newsData.date"
                  :value-as-date="true"
                  :min="min_date"
                  :class="{
                    'is-invalid': submitted && $v.newsData.date.$invalid
                  }"
                ></b-form-datepicker>
                <div
                  v-if="submitted && !$v.newsData.date.required"
                  class="invalid-feedback"
                >
                  Live date is required
                </div>
              </div>
              <div class="col-lg-6">
                <b-form-timepicker
                  id="timepicker-placeholder"
                  placeholder="time"
                  locale="en"
                  v-model="newsData.time"
                  :class="{
                    'is-invalid': submitted && $v.newsData.time.$invalid
                  }"
                ></b-form-timepicker>
                <div
                  v-if="submitted && !$v.newsData.time.required"
                  class="invalid-feedback"
                >
                  Live time is required
                </div>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>URL</label>
            <div style="display: flex">
              <input
                type="text"
                class="form-control input-lg url-text"
                v-model="newsData.url"
                :class="{
                  'is-invalid': submitted && $v.newsData.url.$invalid
                }"
              />
              <button
                type="button"
                class="Images_btn"
                style="float: right"
                @click="getImagesFromURL()"
              >
                <i class="fa fa-search" aria-hidden="true"></i>
              </button>
            </div>
            <div
              :class="{ 'is-invalid': submitted && $v.newsData.url.$invalid }"
            ></div>
            <div
              v-if="submitted && !$v.newsData.url.required"
              class="invalid-feedback"
            >
              URL is required
            </div>
          </div>

          <div class="form-group">
            <div
              :class="{
                'is-invalid': submitted && $v.newsData.selected_image.$invalid
              }"
            ></div>
            <div
              v-if="submitted && !$v.newsData.selected_image.$required"
              class="invalid-feedback mb-2"
            >
              Display image is required
            </div>

            <div class="row">
              <div
                class="col-lg-4 mb-3"
                v-for="(image_url, counter) in ImageScraping"
                :key="counter"
              >
                <div
                  class="image-card"
                  style="display: flex; flex-direction: column"
                >
                  <div class="urlImage">
                    <img
                      :src="image_url"
                      class="w-full object-cover h-full"
                      referrerpolicy="no-referrer"
                      style="width: 100%; object-fit: contain; height: 100%"
                    />
                  </div>
                  <div class="ml-1 mt-1 mr-1">
                    <input
                      type="radio"
                      id="male"
                      name="titleImage"
                      :value="image_url"
                      v-model="newsData.selected_image"
                    />
                    <label>Select display image </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!--Start Button -->
          <div class="form-group" style="display: flex">
            <div class="ml-auto d-flex mr-0">
              <button type="button" class="btn ml-2" @click="btnCancelClick">
                Cancel
              </button>
              <button type="button" class="btn ml-2" @click="btnAddNewsClick()">
                Add News
              </button>
            </div>
          </div>
          <!-- End bitton -->
        </div>

        <modal
          v-if="showNewsModal"
          @closeModal="updateShowNewsModal([false, ''])"
        >
          <div slot="body">{{ this.newsMessage }}</div>
        </modal>

        <modal
          v-if="showUploadImageError"
          @closeModal="showUploadImageError = false"
        >
          <div slot="body">{{ this.UploadImageError }}</div>
        </modal>

        <modal v-if="isShowCancelModal" @closeModal="isShowCancelModal = false">
          <div slot="body">Leave the page without saving?</div>
          <div slot="footer" class="d-flex">
            <b-button
              class="btn"
              variant="outline-dark"
              @click="isShowCancelModal = false"
            >
              Cancel
            </b-button>
            <b-button class="btn ml-2" variant="outline-dark" @click="cancel">
              OK
            </b-button>
          </div>
        </modal>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import appConstants from '../../appConstants.js'
import modal from '../../common/Modal.vue'
import { required } from 'vuelidate/lib/validators'
import uploadFileOnS3 from '../../mixins/uploadFileOnS3.js'

export default {
  name: 'NewsDetails',
  mixins: [uploadFileOnS3],
  components: {
    modal
  },
  data() {
    return {
      newsData: {
        title: '',
        interest_categories: [],
        date: '',
        time: '',
        url: '',
        is_international: false,
        selected_image: '',
        media_type: appConstants.media_Type.IMAGE
      },
      min_date: new Date(),
      submitted: false,
      // selected_image: '',
      showUploadImageError: false,
      UploadImageError: '',
      isShowCancelModal: false,
      newsDataSavedCopy: ''
    }
  },
  validations() {
    return {
      newsData: {
        title: { required },
        interest_categories: { required },
        date: { required },
        time: { required },
        url: { required },
        selected_image: { required }
      }
    }
  },
  computed: {
    ...mapGetters('news', [
      'getImageScrapingResult',
      'showNewsModal',
      'newsMessage'
    ]),
    ...mapGetters('dropdownValues', ['getInterestOptions']),
    ImageScraping() {
      if (this.getImageScrapingResult == '') {
        return []
      } else {
        return this.getImageScrapingResult.images
      }
    }
  },
  methods: {
    ...mapMutations('news', ['updateShowNewsModal']),
    ...mapActions('news', ['createNews', 'fetchImagesFromURL']),
    ...mapActions('dropdownValues', ['fetchInterestsData']),

    addNews() {},
    getImagesFromURL() {
      let data = {
        url: this.newsData.url
      }
      this.fetchImagesFromURL(data).then(() => {
        this.setImageScrapingTitleTONewsTitle()
      })

      this.resetMedia()
    },
    resetMedia() {
      this.newsData.selected_image = ''
    },
    setImageScrapingTitleTONewsTitle() {
      if (this.getImageScrapingResult == '') {
        this.newsData.title = ''
      } else {
        this.newsData.title = this.getImageScrapingResult.title
      }
    },
    getJsonDataToAddNews() {
      var timearray = this.newsData.time.split(':')
      this.newsData.date.setHours(timearray[0])
      this.newsData.date.setMinutes(timearray[1])

      var data = {
        title: this.newsData.title,
        interest_categories: this.newsData.interest_categories,
        live_date: this.newsData.date.toISOString().split('.')[0] + 'Z', //Removed milisconds
        url: this.newsData.url,
        media_type: this.newsData.media_type,
        media_urls: [this.newsData.selected_image],
        is_international: this.newsData.is_international
      }

      return data
    },
    btnAddNewsClick() {
      this.submitted = true
      if (this.$v.newsData.$invalid) {
        console.log('Required data')
        return false
      }

      var data = this.getJsonDataToAddNews()
      // console.log('data', data)
      this.createNews(data)
      this.copyNewsObject()
    },
    onImageLoad(image_url) {
      let img = new Image()
      img.referrerPolicy = 'no-referrer'
      img.onload = () => {
        this.newsData.medias[0].name = image_url
        this.newsData.medias[0].width = img.naturalWidth
        this.newsData.medias[0].height = img.naturalHeight
      }
      img.src = image_url
    },

    btnCancelClick() {
      if (
        JSON.stringify(this.newsDataSavedCopy) === JSON.stringify(this.newsData)
      ) {
        this.cancel()
      } else {
        this.showCancelModal()
      }
    },

    showCancelModal() {
      this.isShowCancelModal = true
    },
    cancel() {
      this.$router.push({ name: appConstants.routes.NEWS })
    },
    copyNewsObject() {
      this.newsDataSavedCopy = JSON.parse(JSON.stringify(this.newsData))
    }
  },
  created() {
    this.copyNewsObject()
  }
}
</script>
<style>
/* .form-conatiner {
  margin-top: 20px;
} */
</style>
