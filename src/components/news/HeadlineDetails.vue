<template>
  <div>
    <div class="form-conatiner cls-headlines">
      <div class="newsDetails">
        <div class="form-max-width bg-white p-4 border">
          <div class="row">
            <div class="form-group col-lg-9">
              <label>Title</label>
              <input
                type="text"
                class="form-control input-lg"
                v-model="newsData.title"
                maxlength="150"
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
                <option value="false">India</option>
                <option value="true">International</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>Summary</label>
            <b-form-textarea
              name="content"
              v-model="newsData.content"
              cols="40"
              rows="2"
              max-rows="2"
              maxlength="300"
              no-resize
              class="form-control"
              :class="{
                'is-invalid': submitted && $v.newsData.content.$invalid
              }"
            ></b-form-textarea>
            <div
              v-if="submitted && !$v.newsData.content.required"
              class="invalid-feedback"
            >
              Summary is required
            </div>
          </div>

          <div class="row">
            <div class="form-group col-lg-3 col-md-4 col-sm-6 col-12">
              <UploadImageAndPreview
                id="headlineImage"
                component_height="200"
                is_logo_image="false"
                :save_image_path_value="PATH_SAVE_MEDIA_IMAGES_ON_S3"
                :read_image_path_value="read_media_s3_image_url"
                :image_name_value="newsData.image_url"
                :submitted="submitted"
                is_object_fit_contain="false"
                upload_button_text="Add Image"
                required_validation_message="Image is required"
                @uploadedImage_changed="getUpdatedCoverImage"
              ></UploadImageAndPreview>
            </div>
          </div>

          <!-- <div class="form-group">
            <label>Image Credit</label>
            <input
              type="text"
              class="form-control input-lg"
              v-model="newsData.image_credit"
              maxlength="50"
              :class="{
                'is-invalid': submitted && $v.newsData.image_credit.$invalid
              }"
            />
            <div
              v-if="submitted && !$v.newsData.image_credit.required"
              class="invalid-feedback"
            >
              Image Credit is required
            </div>
          </div> -->

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

          <!-- <div class="form-group">
            <label>Live date</label>
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
          </div> -->
          <div class="form-group">
            <label>URL</label>
            <input
              type="text"
              class="form-control input-lg show-placeholder"
              v-model="newsData.url"
              maxlength="100"
              placeholder="Enter URL e.g. http(s)://example.com"
              :class="{
                'is-invalid': submitted && !$v.newsData.url.url
              }"
            />
            <div
              v-if="submitted && !$v.newsData.url.url"
              class="invalid-feedback d-block"
            >
              URL is invalid
            </div>
          </div>

          <!--Start Button -->
          <div class="form-group" style="display: flex">
            <div class="ml-auto d-flex mr-0">
              <button type="button" class="btn ml-2" @click="btnCancelClick">
                Cancel</button
              ><button
                type="button"
                class="btn ml-2"
                @click="btnAddNewsClick()"
              >
                Add Headline
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
            <b-button class="ml-2 btn" variant="outline-dark" @click="cancel">
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
import { required, url } from 'vuelidate/lib/validators'
import UploadImageAndPreview from '../common/UploadImageAndPreview'

export default {
  name: 'HeadlineDetails',
  components: {
    modal,
    UploadImageAndPreview
  },
  data() {
    return {
      newsData: {
        title: '',
        content: '',
        interest_categories: [],
        is_international: false,

        url: '',
        profession_categories: [],
        lat: '',
        lng: '',

        media_type: appConstants.media_Type.IMAGE,
        medias: []
      },

      submitted: false,
      showUploadImageError: false,
      UploadImageError: '',
      isShowCancelModal: false,
      newsDataSavedCopy: '',
      PATH_SAVE_MEDIA_IMAGES_ON_S3: appConstants.PATH_SAVE_MEDIA_IMAGES_ON_S3,
      read_media_s3_image_url: process.env.VUE_APP_MEDIA_IMGURL
    }
  },
  validations() {
    return {
      newsData: {
        title: { required },
        interest_categories: { required },
        content: { required },
        medias: { required },
        url: { url }
      }
    }
  },
  computed: {
    ...mapGetters('headlines', ['showNewsModal', 'newsMessage']),
    ...mapGetters('dropdownValues', ['getInterestOptions'])
  },
  methods: {
    ...mapMutations('headlines', ['updateShowNewsModal']),
    ...mapActions('headlines', ['createHeadline']),
    ...mapActions('dropdownValues', ['fetchInterestsData']),

    resetMedia() {
      // this.newsData.selected_image = ''
    },
    getJsonDataToAddNews() {
      var data = {
        title: this.newsData.title,
        content: this.newsData.content,
        interest_categories: this.newsData.interest_categories,
        is_international: this.newsData.is_international,

        url: this.newsData.url,
        profession_categories: this.newsData.profession_categories,
        media_urls: [this.newsData.selected_image],
        lat: this.newsData.lat,
        lng: this.newsData.lng,

        media_type: this.newsData.media_type,
        medias: this.newsData.medias
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
      this.createHeadline(data)
      this.copyNewsObject()
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
      this.$router.push({ name: appConstants.routes.HEADLINES })
    },
    copyNewsObject() {
      this.newsDataSavedCopy = JSON.parse(JSON.stringify(this.newsData))
    },

    getUpdatedCoverImage(value) {
      if (value.image_name == '') {
        //image deleted
        this.newsData.medias = []
        return
      }

      var mediaObject = {
        name: value.image_name,
        mediaType: appConstants.media_Type.IMAGE,
        contentSize: value.size,
        width: value.width,
        height: value.height,
        video_duration: null
      }

      this.newsData.medias = []
      this.newsData.medias.push(mediaObject)
    }
  },
  created() {
    this.copyNewsObject()
  }
}
</script>
<style>
.form-conatiner {
  margin-top: 20px;
}
</style>
