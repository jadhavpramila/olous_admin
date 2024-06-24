<template>
  <div>
    <div class="main-container">
      <div class="main-container-header">
        <label class="font-weight-700 fontSize18 mb-0">Service Details </label>
      </div>
      <div class="main-container-body">
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>Name</label>
              <input
                type="text"
                class="form-control input-lg"
                v-model="productDetails.name"
                :class="{
                  'is-invalid': submitted && $v.productDetails.name.$invalid
                }"
              />
              <div
                v-if="submitted && !$v.productDetails.name.required"
                class="invalid-feedback"
              >
                Service name is required
              </div>
            </div>
            <div
              v-if="submitted && !$v.productDetails.name.maxLength"
              class="invalid-feedback d-block"
            >
              Please enter max 100 character
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label class="contact-msg"
                >Description (Max 1000 characters)</label
              >
              <b-form-textarea
                name="short_desc"
                v-model="productDetails.description"
                cols="40"
                rows="1"
                max-rows="10"
                maxlength="1000"
                no-resize
                class="form-control"
                :class="{
                  'is-invalid':
                    submitted && $v.productDetails.description.$invalid
                }"
              ></b-form-textarea>

              <div
                v-if="submitted && !$v.productDetails.description.required"
                class="invalid-feedback"
              >
                Service description is required
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="form-group">
              <label>Price (Optional)</label>
              <input
                type="text"
                class="form-control input-lg"
                v-model="productDetails.price"
                placeholder="product price"
                v-on:keyup="getPrice($event.target.value)"
                @keydown.space.prevent
                @input="integerValueOnly"
                :class="{
                  'is-invalid': submitted && $v.productDetails.price.$invalid
                }"
              />
            </div>
            <div
              v-if="submitted && !$v.productDetails.price.numeric"
              class="invalid-feedback d-block"
            >
              Price must be numeric value
            </div>
          </div>
          <div class="col-md-4" v-if="hasPrice">
            <div class="form-group">
              <label>Units</label>
              <v-select
                class="form-control input-lg"
                label="name"
                :options="unitArray"
                v-model="productDetails.unit"
                :reduce="(option) => option.id"
                :class="{
                  'is-invalid': submitted && $v.productDetails.unit.$invalid
                }"
              />
              <!-- <select
                class="form-control input-lg"
                name="unit"
                v-model="productDetails.unit"
                :class="{
                  'is-invalid': submitted && $v.productDetails.unit.$invalid
                }"
              >
                <option value>Select units</option>
                <option value="1">Square Feet</option>
                <option value="2">Square Meter</option>
                <option value="3">Running Feet</option>
                <option value="4">Running Meter</option>
                <option value="5">Cubic Feet</option>
                <option value="6">Cubic Meter</option>
                <option value="7">Tonne</option>
                <option value="8">Metric Tonne</option>
                <option value="9">Kilogram</option>
                <option value="10">Litre</option>
                <option value="11">Number</option>
                <option value="12">Box</option>
                <option value="13">Bundle</option>
                <option value="14">Roll</option>
                <option value="15">Lot</option>
              </select> -->
            </div>
            <div
              v-if="submitted && !$v.productDetails.unit.required"
              class="invalid-feedback d-block"
            >
              Unit is required
            </div>
          </div>
          <div class="col-md-4" v-if="hasPrice">
            <div class="form-group">
              <label>Currency</label>
              <v-select
                class="form-control input-lg"
                label="value"
                :options="currencyArray"
                :reduce="(option) => option.value"
                v-model="productDetails.currency"
                :class="{
                  'is-invalid': submitted && $v.productDetails.currency.$invalid
                }"
              />
              <!-- <select
                class="form-control input-lg"
                name="category"
                v-model="productDetails.currency"
                :class="{
                  'is-invalid': submitted && $v.productDetails.currency.$invalid
                }"
              >
                <option value>Select Currency</option>
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select> -->
            </div>
            <div
              v-if="submitted && !$v.productDetails.currency.required"
              class="invalid-feedback d-block"
            >
              Currency is required
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <!-- <div
          v-if="this.product_images.length >= 1"
          class="text-danger fontSize12 app-primary-text-color"
        >
          You are not allow to upload all images at once , first you save this
          info and then add multiple images
        </div> -->
      <div
        v-if="!isAddNewProduct"
        class="mt-3 bold-text fontSize12 app-primary-text-color"
      >
        * You can add upto 10 images and 1 video
      </div>
      <div
        v-if="isShowImageInfoNote()"
        class="mt-3 bold-text fontSize12 app-primary-text-color"
      >
        * First you save this info and then add multiple images
      </div>

      <div
        class="row ml-0"
        style="column-width: 188px !important; column-gap: 20px !important"
      >
        <div class="d-flex" v-if="isShowAddImageButton()">
          <div class="form-group">
            <div class="d-flex" v-cloak>
              <button
                type="button"
                @click="showUploadImagePopup"
                class="upload-product-image"
              >
                <img
                  src="../../assets/img/Upload.svg"
                  title="upload image"
                  class=""
                />
                <span class="mt-2 px-2"> Click to Add Service Image</span>
              </button>
            </div>
            <div
              class="invalid-feedback d-block"
              v-if="submitted && !$v.productDetails.medias.required"
            >
              Image required
            </div>
          </div>
        </div>
        <div v-for="(img, index) in getImageMedia" :key="index" class="d-flex">
          <!-- {{ img }} -->
          <div class="product-img-preview">
            <img
              v-if="!img.id"
              @click="removeImage(index)"
              class="remove-product-img"
              src="../../assets/img/Delete-Job.svg"
              title="close image"
            />
            <img
              v-if="img.id"
              @click="deleteImage(img.id)"
              class="remove-product-img"
              src="../../assets/img/Delete-Job.svg"
              title="close image"
            />

            <img
              v-if="!img.id"
              :src="img.full_URL"
              class="img-preview logo-image"
            />
            <img v-else :src="img.name" class="img-preview logo-image" />

            <div class="product-image-overlay pr-2">
              <label class="checkbox-container fontSize12 font-weight-600">
                Make Primary
                <input
                  type="radio"
                  :checked="img.is_primary ? true : false"
                  @change="makeImagePrimary(img)"
                  name="primary_image"
                />
                <span class="mark"></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="!isAddNewProduct"
        class="row ml-0"
        style="column-width: 188px !important; column-gap: 20px !important"
      >
        <div class="d-flex" v-if="isShowAddVideoButton()">
          <div class="form-group">
            <div class="d-flex" v-cloak>
              <button
                type="button"
                @click="showUploadVideoPopup"
                class="upload-product-image"
              >
                <img
                  src="../../assets/img/Upload.svg"
                  title="upload image"
                  class=""
                />
                <span class="mt-2 px-2"> Click to Add Product Video</span>
              </button>
            </div>
          </div>
        </div>
        <div
          v-for="(video, index) in getVideoMedia"
          :key="getKey(index, 'videoMedia')"
          class="d-flex"
        >
          <!-- {{ img }} -->
          <div class="product-video-preview">
            <img
              v-if="!video.id"
              @click="removeImage(index)"
              class="remove-product-img"
              src="../../assets/img/Delete-Job.svg"
              title="close image"
            />
            <img
              v-if="video.id"
              @click="deleteImage(video.id)"
              class="remove-product-img"
              src="../../assets/img/Delete-Job.svg"
              title="close image"
            />

            <video v-if="!video.id" height="150" width="100%" controls>
              <source :src="video.full_URL" />
            </video>
            <video v-else width="100%" controls class="video-height">
              <source :src="video.name" />
            </video>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-end mt-3">
      <span class="btn ml-4" @click="cancelProduct">Cancel</span>
      <span class="btn ml-4" @click="saveProductInfo">Save</span>
    </div>
    <template>
      <b-modal ref="successModal" hide-footer hide-header centered>
        <div class="d-block text-center modal-dialog-centered">
          <h4 class="my-4" style="">
            {{ modal_message }}
          </h4>

          <b-button class="mt-2 btn" variant="outline-dark" @click="hideModal"
            >Ok</b-button
          >
        </div>
      </b-modal>
      <b-modal ref="mediaModal" hide-footer hide-header centered>
        <div class="d-block text-center modal-dialog-centered">
          <h4 class="my-4" style="">
            {{ modal_message }}
          </h4>
          <b-button
            class="mt-2 btn"
            variant="outline-dark"
            @click="hideMediaModal"
            >Ok</b-button
          >
        </div>
      </b-modal>
    </template>

    <modal v-if="isShowUploadImagePopup" @closeModal="HideUploadImagePopup">
      <div slot="body" align="center">
        <InMemoryPreviewImageThenUpload
          upload_button_text="Click to Upload Image"
          :file_type="image_file_type"
          :save_image_path_value="path_save_media_images_on_s3"
          @mediaUploadedToS3="saveImageMediaObject"
          @cancel_media_uploaded="HideUploadImagePopup"
        ></InMemoryPreviewImageThenUpload>
      </div>
      <div slot="footer"></div>
    </modal>

    <modal v-if="isShowUploadVideoPopup" @closeModal="HideUploadVideoPopup">
      <div slot="body" align="center">
        <InMemoryPreviewImageThenUpload
          upload_button_text="Click to Upload Video"
          :file_type="video_file_type"
          :save_image_path_value="path_save_media_videos_on_s3"
          @mediaUploadedToS3="saveVideoMediaObject"
          @cancel_media_uploaded="HideUploadVideoPopup"
        ></InMemoryPreviewImageThenUpload>
      </div>
      <div slot="footer"></div>
    </modal>

    <loading :active="isLoading" :is-full-page="true" />
  </div>
</template>
<script>
import { required, numeric, maxLength } from 'vuelidate/lib/validators'
import appConstants from '../../appConstants'
import Loading from 'vue-loading-overlay'
import imageCheck from '../../mixins/imageCheck.js'
import uploadFileOnS3 from '../../mixins/uploadFileOnS3.js'
import { mapActions, mapGetters } from 'vuex'
import modal from '../../common/Modal.vue'
import videoCheck from '../../mixins/videoCheck'
import InMemoryPreviewImageThenUpload from '../common/InMemoryPreviewImageThenUpload.vue'
export default {
  name: 'AddServiceForm',
  mixins: [imageCheck, uploadFileOnS3, videoCheck],
  components: {
    Loading,
    modal,
    InMemoryPreviewImageThenUpload
  },
  props: ['ProductData', 'isAddProduct', 'mediasData', 'isAddNewProduct'],
  data() {
    return {
      submitted: false,
      isLoading: false,
      imageTypes: appConstants.ACCEPT_IMAGE_TYPE,
      videoTypes: appConstants.ACCEPT_VIDEO_TYPE,
      productDetails: {
        name: '',
        description: '',
        price: 0,
        unit: '',
        currency: '',
        id: '',
        medias: []
      },
      product_images: [],
      modal_message: '',
      hasPrice: false,
      image_file_type: appConstants.upload_file_type.IMAGE,
      path_save_media_images_on_s3: appConstants.PATH_SAVE_IMAGE_ON_S3,
      path_save_media_videos_on_s3: appConstants.PATH_SAVE_PRODUCT_VIDEO_ON_S3,
      isShowUploadImagePopup: false,
      max_number_of_media:
        appConstants.ALLOW_TOTAL_NUMBER_OF_IMAGES_IN_PRODUCTS,
      isShowUploadVideoPopup: false,
      video_file_type: appConstants.upload_file_type.VIDEO,
      unitArray: appConstants.unit,
      currencyArray: [
        { value: 'INR', name: 'INR' },
        { value: 'USD', name: 'USD' },
        { value: 'Pound', name: 'Pound' },
        { value: 'Euro', name: 'Euro' }
      ]
    }
  },
  validations() {
    if (this.hasPrice) {
      return {
        productDetails: {
          name: {
            required,
            maxLength: maxLength(100)
          },
          price: {
            numeric
          },
          unit: {
            required
          },
          currency: {
            required
          },
          description: { required },
          medias: { required }
        }
      }
    } else {
      return {
        productDetails: {
          name: {
            required,
            maxLength: maxLength(100)
          },
          price: {
            numeric
          },

          description: { required },
          medias: { required }
        }
      }
    }
  },
  computed: {
    ...mapGetters(['getCurrentCompanyId', 'getCurrentEditServiceData']),
    getImageMedia() {
      let image_media = []
      for (let i = 0; i < this.productDetails.medias.length; i++) {
        if (
          this.productDetails.medias[i].mediaType ==
          appConstants.media_type_enum.IMAGE
        ) {
          image_media.push(this.productDetails.medias[i])
        }
      }
      return image_media
    },
    getVideoMedia() {
      let video_media = []
      for (let i = 0; i < this.productDetails.medias.length; i++) {
        if (
          this.productDetails.medias[i].mediaType ==
          appConstants.media_type_enum.VIDEO
        ) {
          video_media.push(this.productDetails.medias[i])
        }
      }
      return video_media
    }
  },
  methods: {
    ...mapActions([
      'saveServiceInfoNew',
      'deleteSingleMediaServiceImage',
      'addSingleMediaImageService',
      'addSingleMediaVideoService',
      'setImageAsPrimaryImageInService',
      'updateProductServiceDetailsNew',
      'fetchSingleCompanyPreviewDetails'
    ]),
    integerValueOnly(e) {
      this.productDetails.price = e.target.value
        .replace(/\s+/g, 0)
        .replace(/[^0-9]/g, 0)
    },
    getPrice(event) {
      if (parseFloat(event) > 0) {
        this.hasPrice = true
      } else {
        this.hasPrice = false
      }
    },

    removeImage(index) {
      this.productDetails.medias.splice(index, 1)
    },

    deleteImage(pid) {
      // console.log('id =>', pid)
      let obj = {
        media_id: pid,
        product_id: this.productDetails.id
      }
      this.deleteSingleMediaServiceImage(obj)
        .then((res) => {
          let delete_index = this.productDetails.medias.findIndex(
            (c) => c.id === pid
          )

          if (delete_index > -1) {
            this.productDetails.medias.splice(delete_index, 1)
          }

          console.log('delete media result', res)
          this.showDeleteMediaModal()
          this.modal_message = 'Service media deleted'
        })
        .catch((error) => {
          this.showDeleteMediaModal()
          this.modal_message = error
        })
    },

    getProductPayload(data) {
      let dataObj = {
        name: data.name,
        description: data.description,
        price: data.price == undefined || data.price == '' ? 0 : data.price,
        unit: data.unit == undefined ? '' : data.unit,
        currency: data.currency == undefined ? '' : data.currency,
        company: this.getCurrentCompanyId,
        id: data.id,
        search_keywords: ''
      }
      return dataObj
    },

    getPayloadToCreateNewProduct(data) {
      let dataObj = this.getProductPayload(data)

      dataObj['media_width'] =
        data.medias[0].width == undefined ? 0.0 : data.medias[0].width
      dataObj['media_height'] =
        data.medias[0].height == undefined ? 0.0 : data.medias[0].height
      dataObj['media_name'] =
        data.medias[0].name == undefined ? '' : data.medias[0].name

      return dataObj
    },
    saveProductInfo() {
      this.submitted = true
      this.$v.productDetails.$touch()
      if (this.$v.productDetails.$invalid) {
        return
      }

      if (this.isAddNewProduct) {
        this.addNewProduct()
      } else {
        this.updateProductInfo()
      }
    },

    addNewProduct() {
      let payload = this.getPayloadToCreateNewProduct(this.productDetails)
      this.saveServiceInfoNew(payload)
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          // this.fetchSingleCompanyPreviewDetails(this.getCurrentCompanyId)
          this.showModal()
          this.modal_message = 'Service added successfully'
          // this.$eventHub.$emit('Cancel_Product_Form', { cancelled: true })
          this.$emit('hide_Product_Form', { cancelled: true })
        })
        .catch((error) => {
          this.showModal()
          this.modal_message = error
        })
    },
    updateProductInfo() {
      let payload = this.getProductPayload(this.productDetails)
      console.log('payload', payload)
      // eslint-disable-next-line no-unused-vars
      this.updateProductServiceDetailsNew(payload).then((res) => {
        // this.fetchSingleCompanyPreviewDetails(this.getCurrentCompanyId)
        this.showModal()
        this.modal_message = 'Service updated successfully'
        // this.$eventHub.$emit('Cancel_Product_Form', { cancelled: true })
        this.$emit('hide_Product_Form', { cancelled: true })
      })
    },
    cancelProduct() {
      // this.$eventHub.$emit('Cancel_Product_Form', { cancelled: true })
      this.$emit('hide_Product_Form', { cancelled: true })
    },
    resetForm() {
      this.productDetails.name = ''
      // this.productDetails.media_name = ''
      this.productDetails.description = ''
      this.productDetails.price = 0
      this.productDetails.unit = ''
      this.productDetails.currency = ''
      // this.productDetails.company = ''
      this.productDetails.id = ''
      // this.productDetails.seakrch_keywords = ''
      // this.productDetails.media_width = 0.0
      // this.productDetails.media_height = 0.0
      // this.productDetails.isPrimary = true
      this.medias = []
    },
    showModal() {
      this.$refs['successModal'].show()
    },
    hideModal() {
      this.$refs['successModal'].hide()
    },
    hideMediaModal() {
      this.$refs['mediaModal'].hide()
    },
    showDeleteMediaModal() {
      this.$refs['mediaModal'].show()
    },

    makeImagePrimary(media) {
      let payload = {
        media: media.id,
        product: this.productDetails.id,
        company: this.getCurrentCompanyId
      }

      var result = this.productDetails.medias.find(
        (item) => item.is_primary === true
      )
      if (result) {
        result.is_primary = false
      }

      var res = this.productDetails.medias.find((item) => item.id === media.id)
      if (res) {
        res.is_primary = true
      }
      // eslint-disable-next-line no-unused-vars
      this.setImageAsPrimaryImageInService(payload).then((res) => {
        this.showModal()
        this.modal_message = 'Image set as primary image'
      })
    },
    showUploadImagePopup() {
      this.isShowUploadImagePopup = true
    },
    HideUploadImagePopup() {
      this.isShowUploadImagePopup = false
    },
    showUploadVideoPopup() {
      this.isShowUploadVideoPopup = true
    },
    HideUploadVideoPopup() {
      this.isShowUploadVideoPopup = false
    },
    saveImageMediaObject(media_obj) {
      if (this.isAddNewProduct) {
        //Do not call API

        //Do not call API
        let media = {
          id: '',
          name: media_obj.image_name,
          width: 0.0,
          height: 0.0,
          video_duration: 0.0,
          is_primary: true,
          mediaType: appConstants.media_type_enum.IMAGE,
          full_URL: media_obj.full_URL
        }

        this.productDetails.medias.push(media)
        this.HideUploadImagePopup()
      } else {
        this.uploadSingleImage(media_obj)
        this.HideUploadImagePopup()
      }
    },
    saveVideoMediaObject(media_obj) {
      if (!this.isAddNewProduct) {
        this.uploadSingleVideo(media_obj)
        this.HideUploadVideoPopup()
      }
    },
    uploadSingleImage(media_obj) {
      let payload = {
        product: this.productDetails.id,
        company: this.getCurrentCompanyId,
        media_name: media_obj.image_name,
        media_width: media_obj.width,
        media_height: media_obj.height,
        is_primary: false
      }
      this.addSingleMediaImageService(payload).then((res) => {
        this.productDetails.medias = res
        this.showModal()
        this.modal_message = 'Image added successfully'
      })
    },
    uploadSingleVideo(media_obj) {
      let payload = {
        product: this.productDetails.id,
        company: this.getCurrentCompanyId,
        media_name: media_obj.image_name,
        media_width: media_obj.width,
        media_height: media_obj.height,
        video_duration: media_obj.duration,
        is_primary: false
      }
      this.addSingleMediaVideoService(payload).then((res) => {
        this.productDetails.medias = res
        this.showModal()
        this.modal_message = 'Video added successfully'
      })
    },
    isShowAddImageButton() {
      if (this.isAddNewProduct) {
        if (this.getImageMedia.length > 0) {
          return false
        } else {
          return true
        }
      } else {
        if (this.getImageMedia.length < this.max_number_of_media) {
          return true
        } else {
          return false
        }
      }
    },
    isShowAddVideoButton() {
      if (this.isAddNewProduct) {
        return false
      } else {
        if (this.getVideoMedia.length > 0) {
          return false
        } else {
          return true
        }
      }
    },
    getKey(index, word) {
      return `${index}_${word}`
    },
    isShowImageInfoNote() {
      if (this.isAddNewProduct) {
        if (this.productDetails.medias.length > 0) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    }
  },
  mounted() {
    if (this.isAddNewProduct) {
      //This is  for add product
    } else {
      this.resetForm()
      this.productDetails = JSON.parse(
        JSON.stringify(this.getCurrentEditServiceData)
      )
      if (
        this.productDetails.price !== null &&
        this.productDetails.price !== 0
      ) {
        this.hasPrice = true
      }
    }
  }
}
</script>
<style scoped>
button:focus-visible {
  outline: none !important;
}

.product-video-preview {
  position: relative !important;
  width: 400px !important;
  position: relative !important;
  background: #f2f2f2 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  margin-top: 26px !important;
  border-radius: 9px !important;
}

.video-height {
  max-height: 350px !important;
}
</style>
