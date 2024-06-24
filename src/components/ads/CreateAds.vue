<template>
  <div>
    <div class="form-conatiner cls-create-ad">
      <div class="form-group">
        <label>Company</label>
        <v-select
          label="name"
          :searchable="true"
          v-model="adData.company_name"
          :options="getCompaniesSearchResult"
          @search="applyFilterOnCompanies"
          @input="onCompanySelected($event)"
          :closeOnSelect="true"
          class="single-value remove-close-btn remove-dropdown-icon"
        />
        <div
          v-if="submitted && !$v.adData.company_id.required"
          class="invalid-feedback d-block"
        >
          Company is required
        </div>
      </div>

      <div class="row">
        <div
          class="col-lg-4 col-md-4 col-12"
          v-for="(media, counter) in this.getImageFilesOnly"
          :key="counter"
        >
          <div>
            <PreviewImage
              class=""
              id="counter"
              component_height="250"
              :read_image_path_value="read_s3_image_url"
              :image_name_value="media.name"
              is_object_fit_contain="false"
              @preview_uploadedImage_Removed="deleteMedia(media.name)"
            ></PreviewImage>
          </div>
        </div>
      </div>

      <div>
        <div
          class="row mt-3"
          v-for="(media, counter) in this.getVideoFilesOnly"
          :key="counter"
        >
          <div class="col-lg-4 col-md-4">
            <div class="mb-n2">Video {{ counter + 1 }}</div>
            <PreviewVideo
              class=""
              :id="'adPreviewVideo' + counter"
              component_height="250"
              :read_image_path_value="read_s3_video_url"
              :image_name_value="media.name"
              is_object_fit_contain="true"
              @preview_uploadedImage_Removed="deleteMedia(media.name)"
            ></PreviewVideo>
          </div>

          <div class="col-lg-4 col-md-4">
            <div class="mb-n2">Cover Image of Video {{ counter + 1 }}</div>
            <div>
              <UploadImageAndPreview
                v-if="isDataLoaded"
                :id="'AdCoverImageForVideo' + counter"
                component_height="250"
                is_logo_image="false"
                :save_image_path_value="path_save_media_images_on_s3"
                :read_image_path_value="read_s3_image_url"
                :image_name_value="media.cover_image"
                :submitted="submitted"
                is_object_fit_contain="false"
                upload_button_text="Add Cover Image"
                required_validation_message="Cover Image required"
                @uploadedImage_changed="getUploadedCoverImages($event, media)"
              ></UploadImageAndPreview>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-3">
        <div>
          <UploadImageVideoMultiple
            v-if="isDataLoaded"
            key="AdUploadMultipleFileKey"
            id="MultipleFileUploadForAd"
            upload_button_height="40"
            is_logo_image="false"
            :allow_total_number_of_files="getRequiredFileCount()"
            is_object_fit_contain="false"
            upload_button_text="Upload Images and videos"
            :save_image_path_value="this.path_save_media_images_on_s3"
            :save_video_path_value="this.path_save_media_videos_on_s3"
            @UploadMultipleFile_changed="getUploadedFiles"
          >
          </UploadImageVideoMultiple>
        </div>
      </div>

      <div v-if="isMediaDataRequired()" class="invalid-feedback d-block">
        Please Add Photos and videos
      </div>

      <div class="form-group mt-3">
        <label
          >Headline <span class="fontSize12">(Max 30 characters )</span></label
        >
        <input
          type="text"
          class="form-control input-lg"
          maxlength="30"
          v-model="adData.headline"
        />
        <div
          v-if="submitted && !$v.adData.headline.required"
          class="invalid-feedback d-block"
        >
          Headline is required
        </div>
        <div
          v-if="submitted && !$v.adData.headline.maxLength"
          class="invalid-feedback d-block"
        >
          Should be less than 30 characters
        </div>
      </div>

      <div class="call-to-action-panel">
        <div class="form-group">
          <label>Call To Action</label>
          <div
            v-if="
              submitted && !$v.adData.call_to_action.call_action_id.required
            "
            class="invalid-feedback d-block"
          >
            Please select one option form below options
          </div>
          <b-form-group v-slot="{ ariaDescribedby }">
            <b-form-radio-group
              id="call_action_group"
              v-model="adData.call_to_action.call_action_id"
              :aria-describedby="ariaDescribedby"
            >
              <!--<b-form-radio :value="enum_call_to_action.CALL"
                >Call</b-form-radio
              >
              <b-form-radio :value="enum_call_to_action.EMAIL"
                >Email</b-form-radio
              >-->
              <b-form-radio
                :value="enum_call_to_action.WEBSITE"
                @change="resetCallToAction()"
              >
                website
              </b-form-radio>
              <b-form-radio
                :value="enum_call_to_action.ENQUIRY"
                @change="resetCallToAction()"
              >
                Enquiry
              </b-form-radio>
            </b-form-radio-group>
          </b-form-group>
        </div>

        <div class="form-group">
          <!--<div
            class="row"
            v-if="
              adData.call_to_action.call_action_id == enum_call_to_action.CALL
            "
          >
            <div style="" class="col-3 col-lg-1 pr-2">
              <input
                type="text"
                class="form-control input-lg"
                disabled="disabled"
                v-model="adData.call_to_action.call.country_code"
              />
            </div>
            <div style="" class="col-9 col-lg-4">
              <input
                type="text"
                class="form-control input-lg show-placeholder"
                placeholder="Enter mobile No."
                v-model="adData.call_to_action.call.contact_mobile"
              />
            </div>
            <div
              v-if="
                submitted &&
                !$v.adData.call_to_action.call.country_code.required
              "
              class="invalid-feedback d-block"
            >
              Country code is required
            </div>
            <div class="col-12 col-lg-12">
              <div
                v-if="
                  submitted &&
                  !$v.adData.call_to_action.call.contact_mobile.required
                "
                class="invalid-feedback d-block"
              >
                Contact Number is required
              </div>

              <div
                v-if="
                  submitted &&
                  !$v.adData.call_to_action.call.contact_mobile.numeric
                "
                class="invalid-feedback d-block"
              >
                Contact Number is invalid
              </div>
            </div>
          </div>-->

          <!--<div
            class="row"
            v-if="
              adData.call_to_action.call_action_id == enum_call_to_action.EMAIL
            "
          >
            <div style="" class="col-12 col-lg-5">
              <input
                type="text"
                class="form-control input-lg show-placeholder"
                v-model="adData.call_to_action.email.email"
                placeholder="Enter Email ID"
              />

              <div
                v-if="
                  submitted && !$v.adData.call_to_action.email.email.required
                "
                class="invalid-feedback d-block"
              >
                Email id is required
              </div>

              <div
                v-if="submitted && !$v.adData.call_to_action.email.email.email"
                class="invalid-feedback d-block"
              >
                email id is invalid
              </div>
            </div>
          </div>-->

          <div
            class="row"
            v-if="
              adData.call_to_action.call_action_id ==
              enum_call_to_action.WEBSITE
            "
          >
            <div style="" class="col-12 col-lg-5">
              <input
                type="text"
                class="form-control input-lg show-placeholder"
                v-model="adData.call_to_action.website.website"
                placeholder="Enter Website e.g. http://example.com"
              />

              <div
                v-if="
                  submitted &&
                  !$v.adData.call_to_action.website.website.required
                "
                class="invalid-feedback d-block"
              >
                Website is required
              </div>
              <div
                v-if="
                  submitted && !$v.adData.call_to_action.website.website.url
                "
                class="invalid-feedback d-block"
              >
                Website is invalid
              </div>
            </div>
          </div>

          <div
            class="row"
            v-if="
              adData.call_to_action.call_action_id ==
              enum_call_to_action.ENQUIRY
            "
          >
            <div style="" class="col-12 col-lg-6">
              <UploadImageAndPreview
                v-if="isDataLoaded"
                id="EnquiryAdsImage"
                component_height="150"
                is_logo_image="false"
                :save_image_path_value="path_save_media_images_on_s3"
                :read_image_path_value="read_s3_image_url"
                :image_name_value="adData.call_to_action.enquiry.image"
                :submitted="submitted"
                is_object_fit_contain="false"
                upload_button_text="Upload Image"
                required_validation_message="Enquiry Image required"
                @uploadedImage_changed="getNewEnqueryImage"
              ></UploadImageAndPreview>

              <!--<div
                v-if="isEnquiryImageRequired()"
                class="invalid-feedback d-block"
              >
                Enquiry image is required
              </div>-->

              <label class="mt-2">
                Headline <span class="fontSize12">(Max 30 characters )</span>
              </label>
              <input
                type="text"
                class="form-control input-lg"
                maxlength="30"
                v-model="adData.call_to_action.enquiry.heading"
              />
              <div
                v-if="
                  submitted &&
                  !$v.adData.call_to_action.enquiry.heading.required
                "
                class="invalid-feedback d-block"
              >
                Headline is required
              </div>
              <div
                v-if="
                  submitted &&
                  !$v.adData.call_to_action.enquiry.heading.maxLength
                "
                class="invalid-feedback d-block"
              >
                Should be less than 30 characters
              </div>

              <label>Description</label>

              <b-form-textarea
                name="desc"
                v-model="adData.call_to_action.enquiry.description"
                cols="40"
                rows="2"
                max-rows="10"
                no-resize
                class="form-control"
              ></b-form-textarea>
              <div
                v-if="
                  submitted &&
                  !$v.adData.call_to_action.enquiry.description.required
                "
                class="invalid-feedback d-block"
              >
                Description is required
              </div>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label>Text for "call to action" button</label>
          <div
            v-if="
              submitted &&
              !$v.adData.call_to_action.text_to_action_button.required
            "
            class="invalid-feedback d-block"
          >
            Please select one option form below options
          </div>
          <b-form-group v-slot="{ ariaDescribedby }">
            <b-form-radio-group
              id="buttontext_for_call_action_group"
              v-model="adData.call_to_action.text_to_action_button"
              :aria-describedby="ariaDescribedby"
            >
              <b-form-radio :value="enum_call_to_action_btn_text.LEARN_MORE"
                >Learn more</b-form-radio
              >
              <b-form-radio :value="enum_call_to_action_btn_text.CONTACT_US"
                >Contact us</b-form-radio
              >
              <b-form-radio :value="enum_call_to_action_btn_text.SHOP"
                >Shop</b-form-radio
              >
              <b-form-radio :value="enum_call_to_action_btn_text.BOOK_NOW"
                >Book now</b-form-radio
              >

              <b-form-radio :value="enum_call_to_action_btn_text.ORDER_NOW"
                >Order Now</b-form-radio
              >

              <b-form-radio :value="enum_call_to_action_btn_text.ENQUIRE"
                >Enquire</b-form-radio
              >
            </b-form-radio-group>
          </b-form-group>
        </div>
      </div>

      <div class="form-group mt-3">
        <label>Description</label>
        <b-form-textarea
          name="desc"
          v-model="adData.description"
          cols="40"
          rows="2"
          max-rows="10"
          no-resize
          class="form-control"
        ></b-form-textarea>
        <!-- v-on:keyup="getDescriptionLength($event.target.value)"
        <div class="row">
          <div class="col-12" align="right">
            <label class="mb-0 mr-0 text-right float-right">
              {{ remainingDescLength }}/{{ descTotalLength }}</label
            >
          </div>
        </div>-->
        <div
          v-if="submitted && !$v.adData.description.required"
          class="invalid-feedback d-block"
        >
          Description is required
        </div>
      </div>

      <div class="form-group">
        <div class="row">
          <div class="col-lg-4 col-12">
            <label>
              From Date
              <span class="fontSize12">
                ({{ this.getDateWith12PMTimeInFormat(adData.from_date) }})
              </span>
            </label>
            <div>
              <div>
                <b-form-datepicker
                  id="from-datepicker"
                  placeholder="date"
                  locale="en"
                  v-model="adData.from_date"
                  :value-as-date="true"
                  @input="calculateToDate"
                  :min="min_date"
                  :date-format-options="{
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                  }"
                ></b-form-datepicker>
              </div>
            </div>

            <div
              v-if="submitted && !$v.adData.from_date.required"
              class="invalid-feedback d-block"
            >
              From date is required
            </div>
          </div>
          <div class="col-lg-8 col-12">
            <div class="row">
              <div class="col-4 col-lg-6">
                <label>{{ number_of_days_text }}</label>
                <input
                  type="text"
                  placeholder="Count"
                  class="form-control input-lg"
                  autocomplete="off"
                  v-model="adData.number_of_days"
                  @input="integerValueOnly($event)"
                />
                <div
                  v-if="submitted && !$v.adData.number_of_days.required"
                  class="invalid-feedback d-block"
                >
                  Number of days is required
                </div>
                <div
                  v-if="submitted && !$v.adData.number_of_days.greaterThanZero"
                  class="invalid-feedback d-block"
                >
                  value should be greater than zero
                </div>
              </div>

              <div class="col-8 col-lg-6">
                <label>
                  To Date
                  <span class="fontSize12">
                    ({{ this.getDateWith12PMTimeInFormat(adData.to_date) }})
                  </span>
                </label>
                <div>
                  <div>
                    <b-form-datepicker
                      id="to-datepicker"
                      placeholder="date"
                      locale="en"
                      disabled
                      v-model="adData.to_date"
                      :value-as-date="true"
                      :min="min_date"
                      :date-format-options="{
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit'
                      }"
                    ></b-form-datepicker>
                  </div>
                </div>
                <div
                  v-if="submitted && !$v.adData.to_date.required"
                  class="invalid-feedback d-block"
                >
                  To date is required
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label>Profession</label>
        <v-select
          label="display_string"
          multiple
          :searchable="true"
          v-model="adData.profession"
          :options="getProfessionOptions"
          :reduce="(option) => option.id"
          :closeOnSelect="false"
        />
        <div
          v-if="submitted && !$v.adData.profession.required"
          class="invalid-feedback d-block"
        >
          Profession is required
        </div>
      </div>

      <div class="form-group">
        <label>Sector</label>
        <v-select
          label="display_string"
          multiple
          :searchable="true"
          v-model="adData.sector"
          :options="getSectorOptions"
          :reduce="(option) => option.id"
          :closeOnSelect="false"
        />
        <div
          v-if="submitted && !$v.adData.sector.required"
          class="invalid-feedback d-block"
        >
          Sector is required
        </div>
      </div>

      <div class="form-group">
        <label>Interest</label>
        <v-select
          label="display_string"
          multiple
          :searchable="true"
          v-model="adData.interest"
          :options="getInterestOptions"
          :reduce="(option) => option.id"
          :closeOnSelect="false"
        />
        <div
          v-if="submitted && !$v.adData.interest.required"
          class="invalid-feedback d-block"
        >
          Interest is required
        </div>
      </div>

      <!--<div>
        <TargetLocation
          :is_execute_validation="submitted"
          :target_location="adData.location"
          @target_location_value_changed="targetLocationChanged"
        ></TargetLocation>
      </div>-->

      <div class="mt-3 mb-5" align="right">
        <button class="btn btn-dark mr-2" @click="saveAdData">
          {{ getSaveButtonText }}
        </button>

        <button class="btn btn-dark" @click="btnCancel">Cancel</button>
      </div>

      <modal
        v-if="showAdsModal"
        @closeModal="updateAdsModalValues([false, ''])"
      >
        <div slot="body">{{ showAdsModalMessage }}</div>
      </modal>

      <modal v-if="isShowCancelModal" @closeModal="isShowCancelModal = false">
        <div slot="body">Leave the page without saving?</div>
        <div slot="footer">
          <b-button
            class="btn"
            variant="outline-dark"
            @click="isShowCancelModal = false"
          >
            Cancel
          </b-button>
          <b-button
            class="ml-2 btn"
            variant="outline-dark"
            @click="goToAdsListPage"
          >
            OK
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
import PreviewVideo from '../../components/common/PreviewVideo'
import PreviewImage from '../../components/common/PreviewImage'
import moment from 'moment'
// import TargetLocation from '../common/TargetLocation'
import UploadImageVideoMultiple from '../common/UploadImageVideoMultiple'
import UploadImageAndPreview from '../common/UploadImageAndPreview'

import { required, requiredIf, url, maxLength } from 'vuelidate/lib/validators'

const greaterThanZero = (value) => value > 0

export default {
  name: 'CreateAds',
  components: {
    PreviewVideo,
    PreviewImage,
    modal,
    // TargetLocation,
    UploadImageVideoMultiple,
    UploadImageAndPreview
  },
  data() {
    return {
      adData: {
        id: '',
        company_id: '',
        company_name: '',
        headline: '',
        description: '',
        profession: [],
        sector: [],
        interest: [],
        from_date: new Date(),
        to_date: '',
        number_of_days: 1,
        is_all_over_india: false,
        location: {
          all_over_world: false,
          country: {
            name: '',
            iso2: ''
          },
          states: [],
          cities: []
        },

        call_to_action: {
          call_action_id: appConstants.call_to_action.WEBSITE,
          text_to_action_button:
            appConstants.call_to_action_btn_text.LEARN_MORE,
          website: {
            website: ''
          },
          enquiry: {
            image: '',
            heading: '',
            description: ''
          }
        },

        selected_media: []
      },
      submitted: false,
      isDataLoaded: false,
      remainingDescLength: 1000,
      descTotalLength: 1000,
      min_date: new Date(),
      number_of_days_text: 'Days',

      read_s3_image_url: process.env.VUE_APP_MEDIA_IMGURL,
      read_s3_video_url: process.env.VUE_APP_MEDIA_VIDEOURL,
      path_save_media_images_on_s3: appConstants.PATH_SAVE_MEDIA_IMAGES_ON_S3,
      path_save_media_videos_on_s3: appConstants.PATH_SAVE_MEDIA_VIDEOS_ON_S3,

      total_number_of_files: appConstants.ALLOW_TOTAL_NUMBER_OF_FILES_IN_AD,
      enum_call_to_action: appConstants.call_to_action,
      enum_upload_file_types: appConstants.upload_file_type,
      enum_media_type: appConstants.media_Type,
      enum_call_to_action_btn_text: appConstants.call_to_action_btn_text,
      adDataSavedCopy: '',
      isShowCancelModal: false
    }
  },
  validations() {
    return {
      adData: {
        company_id: { required },
        headline: { required, maxLength: maxLength(30) },
        description: { required },
        profession: { required },
        sector: { required },
        interest: { required },
        from_date: { required },
        to_date: { required },
        number_of_days: { required, greaterThanZero },

        call_to_action: {
          call_action_id: { required },
          text_to_action_button: { required },

          website: {
            website: {
              required: requiredIf(function () {
                return (
                  this.adData.call_to_action.call_action_id ==
                  appConstants.call_to_action.WEBSITE
                )
              }),
              url
            }
          },
          enquiry: {
            // image: {
            //   required: requiredIf(function () {
            //     return (
            //       this.adData.call_to_action.call_action_id ==
            //       appConstants.call_to_action.ENQUIRY
            //     )
            //   })
            // },
            heading: {
              required: requiredIf(function () {
                return (
                  this.adData.call_to_action.call_action_id ==
                  appConstants.call_to_action.ENQUIRY
                )
              }),
              maxLength: maxLength(30)
            },
            description: {
              required: requiredIf(function () {
                return (
                  this.adData.call_to_action.call_action_id ==
                  appConstants.call_to_action.ENQUIRY
                )
              })
            }
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters('dropdownValues', [
      'getNumberList',
      'getCompaniesSearchResult',
      'getProfessionOptions',
      'getSectorOptions',
      'getInterestOptions',
      'filteredPlaces',
      'filteredCountry'
    ]),
    ...mapGetters('ads', [
      'showAdsModal',
      'showAdsModalMessage',
      'getAdsDetails'
    ]),
    getImageFilesOnly() {
      return this.adData.selected_media.filter(
        (item) => item.mediaType === this.enum_media_type.IMAGE
      )
    },
    getVideoFilesOnly() {
      return this.adData.selected_media.filter(
        (item) => item.mediaType === this.enum_media_type.VIDEO
      )
    },
    getSaveButtonText() {
      if (this.adData.id == '') {
        return 'Post Ad'
      } else {
        return 'Update Ad'
      }
    }
  },

  methods: {
    ...mapActions('dropdownValues', [
      'fetchNumberList',
      'searchCompanies',
      'fetchProfessionData',
      'fetchSectorData',
      'fetchInterestsData',
      'searchPlaces',
      'searchContry'
    ]),
    ...mapActions('ads', ['saveAdDetails', 'updateAdDetails']),
    ...mapMutations('dropdownValues', [
      'setCompaniesSearchResult',
      'setStateEmpty',
      'setCityEmpty',
      'setCompaniesSearchResultEmpty'
    ]),
    ...mapMutations('ads', ['updateAdsModalValues']),
    getDescriptionLength(e) {
      this.remainingDescLength = this.descTotalLength - e.length
    },
    getTomorrowsDate() {
      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)

      this.adData.from_date = tomorrow
    },
    calculateToDate() {
      const to_date = new Date(this.adData.from_date)
      if (this.adData.number_of_days == '') {
        this.adData.number_of_days = 0
      }

      //It is showing value as 01 or 02 to remove leading zero did parseInt
      this.adData.number_of_days = parseInt(this.adData.number_of_days, 10)

      to_date.setDate(to_date.getDate() + parseInt(this.adData.number_of_days))
      this.adData.to_date = to_date
    },
    integerValueOnly(e) {
      let res = e.target.value.replace(/[^0-9]/g, '')
      this.adData.number_of_days = res
      this.calculateToDate()
    },
    applyFilterOnCompanies(text) {
      if (text === undefined || text == '' || text.length < 4) {
        // this.setCompaniesSearchResult([])
        return
      }
      this.searchCompanies(text)
    },
    onCompanySelected(item) {
      if (item == null) {
        this.adData.company_name = ''
        this.adData.company_id = ''
      } else {
        this.adData.company_name = item.name
        this.adData.company_id = item.id
      }
    },
    getUpdatedEnqueryImage(value) {
      this.adData.call_to_action.enquiry.image = value.image_name
    },
    getRequiredFileCount() {
      return this.total_number_of_files - this.adData.selected_media.length
    },
    deleteMedia(filename) {
      for (let index in this.adData.selected_media) {
        if (
          this.adData.selected_media[index].name.toLowerCase() ==
          filename.toLowerCase()
        ) {
          this.adData.selected_media.splice(index, 1)
        }
      }
    },

    getUploadedFiles(uploadedFiles) {
      var new_media = uploadedFiles.files

      for (const uploadedFile of new_media) {
        this.adData.selected_media.push(uploadedFile)
      }
    },
    getUploadedCoverImages(uploadedFiles, mediaObject) {
      mediaObject.cover_image = uploadedFiles.image_name
    },
    getNewEnqueryImage(selectedFiles) {
      this.adData.call_to_action.enquiry.image = selectedFiles.image_name
    },

    getDataToSave() {
      var from_date_12PM = this.getDateWith12PMTime(this.adData.from_date)
      var to_date_12PM = this.getDateWith12PMTime(this.adData.to_date)

      let data_to_save = {
        uid: this.adData.id,
        company_id: this.adData.company_id,
        company_name: this.adData.company_name,
        headline: this.adData.headline,
        description: this.adData.description,
        profession: this.adData.profession,
        sector: this.adData.sector,
        interest: this.adData.interest,
        from_date: from_date_12PM.toISOString().split('.')[0] + 'Z', //Removed milliseconds
        to_date: to_date_12PM.toISOString().split('.')[0] + 'Z', //Removed milliseconds
        number_of_days: parseInt(this.adData.number_of_days, 10),
        call_to_action: this.adData.call_to_action,
        media: this.adData.selected_media

        // location: this.adData.location
      }

      return data_to_save
    },
    setDataToObject() {
      this.adData.id = this.getAdsDetails.id
      this.adData.company_name = this.getAdsDetails.company_name
      this.adData.company_id = this.getAdsDetails.company_id
      this.adData.headline = this.getAdsDetails.headline
      this.adData.description = this.getAdsDetails.description
      this.adData.profession = this.getAdsDetails.profession
      this.adData.sector = this.getAdsDetails.sector
      this.adData.interest = this.getAdsDetails.interest

      let local_from_date = new Date(this.getAdsDetails.from_date)
      let local_to_date = new Date(this.getAdsDetails.to_date)

      this.adData.from_date = local_from_date
      this.adData.to_date = local_to_date

      this.adData.number_of_days = this.getAdsDetails.number_of_days
      this.adData.call_to_action = this.getAdsDetails.call_to_action
      this.adData.selected_media = this.getAdsDetails.media
      // this.adData.location = this.getAdsDetails.location
    },

    resetCallToAction() {
      this.adData.call_to_action.website.website = ''
      this.adData.call_to_action.enquiry.image = ''
      this.adData.call_to_action.enquiry.heading = ''
      this.adData.call_to_action.enquiry.description = ''
    },
    saveAdData() {
      this.submitted = true
      if (
        this.$v.adData.$invalid ||
        this.isMediaDataRequired() ||
        this.isEnquiryImageRequired() ||
        this.isCoverImageRequired()
      ) {
        console.log('Required data')
        return false
      }

      const data_to_save = this.getDataToSave()

      if (data_to_save.uid == '') {
        this.saveAdDetails(data_to_save).then(() => {
          // this.setDataToObject(this.getAdsDetails)
          // this.copyAdsObject()
          setTimeout(() => {
            this.$router.push({ name: appConstants.routes.ADS })
          }, 2000)
        })
      } else {
        this.updateAdDetails(data_to_save).then(() => {
          // this.setDataToObject(this.getAdsDetails)
          // this.copyAdsObject()
          setTimeout(() => {
            this.$router.push({ name: appConstants.routes.ADS })
          }, 2000)
        })
      }
    },
    isMediaDataRequired() {
      if (this.submitted && this.adData.selected_media.length == 0) {
        return true
      } else {
        return false
      }
    },

    isEnquiryImageRequired() {
      if (
        this.submitted &&
        this.adData.call_to_action.call_action_id ==
          this.enum_call_to_action.ENQUIRY &&
        this.adData.call_to_action.enquiry.image == ''
      ) {
        return true
      } else {
        return false
      }
    },
    isCoverImageRequired() {
      let is_coverImage_req = false
      for (let index in this.adData.selected_media) {
        if (
          this.adData.selected_media[index].mediaType ==
            appConstants.media_Type.VIDEO &&
          this.adData.selected_media[index].cover_image == ''
        ) {
          is_coverImage_req = true
        }
      }
      if (this.submitted && is_coverImage_req) {
        return true
      } else {
        return false
      }
    },

    btnCancel() {
      console.log('Cancelclick')
      if (
        JSON.stringify(this.adDataSavedCopy) === JSON.stringify(this.adData)
      ) {
        this.goToAdsListPage()
      } else {
        this.showCancelModal()
      }
    },

    goToAdsListPage() {
      this.$router.push({ name: appConstants.routes.ADS })
    },

    showCancelModal() {
      this.isShowCancelModal = true
    },

    copyAdsObject() {
      this.adDataSavedCopy = JSON.parse(JSON.stringify(this.adData))
    },

    fetchPlacesValues(searchText) {
      if (searchText === undefined) {
        return
      }
      this.searchPlaces(searchText)
    },

    getDateWith12PMTime(dateTimeObj) {
      var date_12PM = dateTimeObj
      date_12PM.setHours(12)
      date_12PM.setMinutes(0)
      date_12PM.setSeconds(0)

      return date_12PM
    },
    getDateWith12PMTimeInFormat(dateTimeObj) {
      let date_obj = this.getDateWith12PMTime(dateTimeObj)
      return moment(date_obj).format('MMM Do YYYY, h:mm a')
    },

    targetLocationChanged(value) {
      this.adData.location = value
    }
  },
  created() {
    this.fetchNumberList({ fromNumber: 0, toNumber: 100 })
    this.fetchInterestsData()
    this.fetchProfessionData()
    this.fetchSectorData()

    if (window.innerWidth > 450) {
      this.number_of_days_text = 'Number of days'
    } else {
      this.number_of_days_text = 'Days'
    }

    if (this.$route.name == appConstants.routes.UPDATE_AD) {
      //Edit Ad

      this.setDataToObject(this.getAdsDetails)
    } else {
      //Ad new Ad
      this.getTomorrowsDate()
      this.calculateToDate()
    }

    this.isDataLoaded = true
    this.copyAdsObject()
    this.setCompaniesSearchResultEmpty()
  }
}
</script>

<style scoped>
.chkAllOverIndia {
  transform: scale(1.3);
}
</style>
