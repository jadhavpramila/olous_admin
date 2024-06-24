<template>
  <div>
    <div>
      <div>
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>Name</label>
              <input
                type="text"
                class="form-control input-lg"
                v-model="productDetails.name"
                placeholder="product name"
                :class="{
                  'is-invalid': submitted && $v.productDetails.name.$invalid
                }"
              />
              <div
                v-if="submitted && !$v.productDetails.name.required"
                class="invalid-feedback"
              >
                Product name is required
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
      </div>
      <div>
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
              <!-- <pre class="mb-0 text-right remainig-text">
                  {{ remainingDescLength 
              v-on:keyup="getDescLength($event.target.value)"}}/1000</pre
            > -->
              <div
                v-if="submitted && !$v.productDetails.description.required"
                class="invalid-feedback"
              >
                Product description is required
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
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
              <select
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
              </select>
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
              <select
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
              </select>
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
      <div>
        <div
          v-if="isShowNotAllowMessage"
          class="text-danger fontSize12 text-black"
        >
          You are not allow to upload all images at once , first you save this
          info and then add multiple images
        </div>

        <div
          class="row ml-0"
          style="column-width: 188px !important; column-gap: 20px !important"
        >
          <div class="d-flex">
            <div class="form-group">
              <div class="d-flex" v-if="!productDetails.id" v-cloak>
                <input
                  id="companyLogo"
                  :accept="imageTypes"
                  ref="companyLogo"
                  @change="previewImage"
                  type="file"
                  style="display: none"
                />
                <button
                  type="button"
                  onclick="document.getElementById('companyLogo').click()"
                  class="upload-product-image"
                >
                  <img src="../../assets/img/Upload.svg" title="upload image" />
                  Image
                </button>
              </div>
              <div
                class="invalid-feedback d-block"
                v-if="submitted && !$v.productDetails.media_name.required"
              >
                Image required
              </div>
            </div>
          </div>
          <div
            v-for="(img, index) in product_images"
            :key="index"
            class="d-flex"
          >
            <!-- {{ img }} -->
            <div class="product-img-preview">
              <img
                v-if="!productDetails.id"
                @click="removeImage(index)"
                class="remove-product-img"
                src="../../assets/img/Close.svg"
                title="close image"
              />
              <img
                v-if="productDetails.id"
                @click="deleteImage(img.id)"
                class="remove-product-img"
                src="../../assets/img/Delete-Job.svg"
                title="close image"
              />
              <img :src="img.name" class="img-preview logo-image" />
              <!-- <div class="product-image-overlay px-2" v-if="!isAddProduct">
                <label
                  v-if="!img.is_primary"
                  class="checkbox-container fontSize12 text-white font-weight-600"
                >
                  Make Primary
                  <input type="radio" @change="makeImagePrimary(img)" />
                  <span class="mark"></span>
                </label>
                <label
                  v-if="img.is_primary"
                  class="checkbox-container fontSize12 text-white font-weight-600"
                >
                  Make Primary
                  <input type="radio" checked @change="makeImagePrimary(img)" />
                  <span class="mark"></span>
                </label>
                
              </div> -->
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end mt-3">
        <div class="d-flex" v-if="productDetails.id && isAddedProduct">
          <span class="company-custom-btn" @click="openImagePopup()"
            >Add Image</span
          >
          <span class="company-custom-btn ml-4" @click="openVideoPopup()"
            >Add Video</span
          >
        </div>
        <span class="company-custom-btn ml-4" @click="cancelProduct"
          >Cancel</span
        >
        <span class="company-custom-btn ml-4" @click="saveProductInfo"
          >Save</span
        >
        <!-- <span
          class="company-custom-btn ml-4"
          @click="updateProductInfo"
          >Update</span
        > -->
      </div>
    </div>
    <template>
      <b-modal ref="imageModal" hide-footer hide-header>
        <div class="d-block text-center">
          <h4 class="my-4" style="text-transform: capitalize">Upload Image</h4>
          <div class="form-group">
            <div class="" v-cloak>
              <input
                id="companyLogo"
                :accept="imageTypes"
                ref="companyLogo"
                @change="previewImage"
                type="file"
                style="display: none"
              />
              <button
                type="button"
                id="fileInputButton"
                onclick="document.getElementById('companyLogo').click()"
                class=""
                v-if="!product_image"
              >
                <img
                  class="uploadImageIcon"
                  src="../../assets/img/Upload.svg"
                  title="upload image"
                />
                Image
              </button>
              <div v-if="product_image" class="logo-preview">
                <img
                  @click="removeImageModal"
                  class="remove-logo"
                  src="../../assets/img/Close.svg"
                  title="close image"
                />
                <img :src="product_image" class="img-preview logo-image" />
              </div>
              <div
                v-if="isImageRequired && $v.singleImageData.media_name.$invalid"
                class="is-invalid"
              ></div>
              <div
                v-if="
                  isImageRequired && !$v.singleImageData.media_name.required
                "
                class="invalid-feedback text-left d-block"
              >
                Image is required
              </div>
            </div>
          </div>

          <div class="d-flex justify-content-end">
            <span class="mt-2 company-custom-btn" @click="hideImageModal()"
              >Cancel</span
            >
            <span
              class="mt-2 company-custom-btn ml-2"
              @click="uploadSingleImage()"
              >Save</span
            >
          </div>
        </div>
      </b-modal>
      <b-modal ref="videoModal" hide-footer hide-header>
        <div class="d-block text-center">
          <h4 class="my-4" style="text-transform: capitalize">Upload Video</h4>
          <div class="form-group">
            <div class="" v-cloak>
              <input
                id="companyLogo"
                :accept="videoTypes"
                ref="companyLogo"
                @change="previewVideo"
                type="file"
                style="display: none"
              />
              <button
                type="button"
                id="fileInputButton"
                onclick="document.getElementById('companyLogo').click()"
                class=""
                v-if="!product_video"
              >
                <img
                  class="uploadImageIcon"
                  src="../../assets/img/Upload.svg"
                  title="upload image"
                />
                Video
              </button>
              <div v-if="product_video" class="logo-preview">
                <img
                  @click="removeImageModal"
                  class="remove-logo"
                  src="../../assets/img/Close.svg"
                  title="close image"
                />
                <video v-if="product_video" height="150" width="100%" controls>
                  <source :src="product_video" />
                </video>
                <!-- <img :src="product_video" class="img-preview logo-image" /> -->
              </div>
              <div
                v-if="isVideoRequired && $v.singleVideoData.media_name.$invalid"
                class="is-invalid"
              ></div>
              <div
                v-if="
                  isVideoRequired && !$v.singleVideoData.media_name.required
                "
                class="invalid-feedback text-left d-block"
              >
                Video is required
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <span class="mt-2 company-custom-btn" @click="hideVideoModal()"
              >Cancel</span
            >
            <span
              class="mt-2 ml-2 company-custom-btn"
              @click="uploadSingleVideo()"
              >Save</span
            >
          </div>
        </div>
      </b-modal>
      <b-modal ref="successModal" hide-footer hide-header>
        <div class="d-block text-center">
          <h4 class="my-4" style="text-transform: capitalize">
            {{ modal_message }}
          </h4>

          <b-button class="mt-2" variant="outline-dark" @click="hideModal"
            >Ok</b-button
          >
        </div>
      </b-modal>
      <b-modal ref="mediaModal" hide-footer hide-header>
        <div class="d-block text-center">
          <h4 class="my-4" style="text-transform: capitalize">
            {{ modal_message }}
          </h4>
          <b-button class="mt-2" variant="outline-dark" @click="hideMediaModal"
            >Ok</b-button
          >
        </div>
      </b-modal>
    </template>
    <modal v-if="showUploadImageError" @closeModal="hideUploadImageError">
      <div slot="body">{{ this.UploadImageError }}</div>
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
export default {
  name: 'AddProductDetails',
  mixins: [imageCheck, uploadFileOnS3, videoCheck],
  components: {
    Loading,
    modal
  },
  props: ['ProductData', 'isAddProduct', 'mediasData'],
  data() {
    return {
      submitted: false,
      isLoading: false,
      UploadImageError: '',
      showUploadImageError: false,
      imageTypes: appConstants.ACCEPT_IMAGE_TYPE,
      videoTypes: appConstants.ACCEPT_VIDEO_TYPE,
      productDetails: {
        name: '',
        media_name: '',
        description: '',
        price: 0,
        unit: '',
        currency: '',
        company: '',
        id: '',
        search_keywords: '',
        media_width: 0.0,
        media_height: 0.0,
        isPrimary: true
      },
      singleImageData: {
        product: '',
        company: '',
        media_name: '',
        media_width: 0.0,
        media_height: 0.0,
        is_primary: false
      },
      singleVideoData: {
        product: '',
        company: '',
        media_name: '',
        media_width: 0.0,
        media_height: 0.0
      },
      isImageRequired: false,
      isVideoRequired: false,
      isAddedProduct: false,
      isShowAddImageButton: false,
      product_images: [],
      isShowAddProduct: false,
      isShowProductList: true,
      product_image: '',
      product_video: '',
      modal_message: '',
      isShowNotAllowMessage: false,
      isAllowMultipleImage: false,
      hasPrice: false
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
          media_name: { required }
        },
        singleImageData: {
          media_name: { required }
        },
        singleVideoData: {
          media_name: { required }
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
          media_name: { required }
        },
        singleImageData: {
          media_name: { required }
        },
        singleVideoData: {
          media_name: { required }
        }
      }
    }
  },
  computed: {
    ...mapGetters(['getCurrentCompanyProductData', 'getCurrentCompanyId'])
  },
  methods: {
    ...mapActions([
      'saveProductInfoNew',
      'deleteSingleMediaProductImage',
      'deleteSingleProduct',
      'addSingleMediaImage',
      'addSingleMediaVideo',
      'setImageAsPrimaryImage',
      'updateProductDetailsNew',
      'fetchSingleCompanyPreviewDetails'
    ]),
    integerValueOnly(e) {
      this.productDetails.price = e.target.value
        .replace(/\s+/g, 0)
        .replace(/[^0-9]/g, 0)
    },
    getPrice(event) {
      if (event.length >= 2) {
        this.hasPrice = true
      } else {
        this.hasPrice = false
      }
    },
    previewImage() {
      //if (this.isAddProduct) {
      if (this.product_images.length >= 1) {
        this.isShowNotAllowMessage = true
      } else {
        let imageFile = this.$refs.companyLogo.files[0]
        if (!imageFile) {
          return
        }

        this.isLoading = true
        this.checkIsImageValidAndGetHW(
          appConstants.ACCEPT_IMAGE_TYPE,
          appConstants.imageLogoSize.MAX_SIZE,
          appConstants.imageLogoSize.MAX_WIDTH,
          appConstants.imageLogoSize.MAX_HEIGHT,
          imageFile
        ).then((result) => {
          //console.log('valid image', result)
          if (result.isValidImage) {
            //console.log('valid image', result)
            this.productDetails.media_height = result.height
            this.productDetails.media_width = result.width
            this.s3LogoUpload(imageFile)
            this.$refs.companyLogo.value = null
            this.isLoading = false
          } else {
            this.UploadImageError = result.message
            this.showUploadImageError = true
            this.$refs.companyLogo.value = null
            this.isLoading = false
          }
        })
      }
      // } else {
      //   let imageFile = this.$refs.companyLogo.files[0]
      //   if (!imageFile) {
      //     return
      //   }

      //   this.isLoading = true
      //   this.checkIsImageValidAndGetHW(
      //     appConstants.ACCEPT_IMAGE_TYPE,
      //     appConstants.imageLogoSize.MAX_SIZE,
      //     appConstants.imageLogoSize.MAX_WIDTH,
      //     appConstants.imageLogoSize.MAX_HEIGHT,
      //     imageFile
      //   ).then((result) => {
      //     //console.log('valid image', result)
      //     if (result.isValidImage) {
      //       //console.log('valid image', result)
      //       this.productDetails.media_height = result.height
      //       this.productDetails.media_width = result.width
      //       this.singleImageData.media_height = result.height
      //       this.singleImageData.media_width = result.width
      //       this.s3LogoUpload(imageFile)
      //       this.$refs.companyLogo.value = null
      //       this.isLoading = false
      //     } else {
      //       this.UploadImageError = result.message
      //       this.showUploadImageError = true
      //       this.$refs.companyLogo.value = null
      //       this.isLoading = false
      //     }
      //   })
      // }
    },
    previewVideo() {
      //  if (this.isAddProduct) {
      if (this.product_images.length >= 1) {
        this.isShowNotAllowMessage = true
      } else {
        let imageFile = this.$refs.companyLogo.files[0]
        if (!imageFile) {
          return
        }

        this.isLoading = true
        this.checkIsVideoValidGetHW(
          appConstants.ACCEPT_VIDEO_TYPE,
          imageFile
        ).then((result) => {
          if (result.isValidImage) {
            //console.log('valid image', result)
            this.productDetails.media_height = result.height
            this.productDetails.media_width = result.width
            this.s3LogoUpload(imageFile)
            this.$refs.companyLogo.value = null
            this.isLoading = false
          } else {
            this.UploadImageError = result.message
            this.showUploadImageError = true
            this.$refs.companyLogo.value = null
            this.isLoading = false
          }
        })
      }
      // } else {
      //   let imageFile = this.$refs.companyLogo.files[0]
      //   if (!imageFile) {
      //     return
      //   }

      //   this.isLoading = true
      //   this.checkIsVideoValidGetHW(
      //     appConstants.ACCEPT_VIDEO_TYPE,
      //     imageFile
      //   ).then((result) => {
      //     console.log('valid image', result)
      //     if (result.isValidVideo) {
      //       this.productDetails.media_height = result.height
      //       this.productDetails.media_width = result.width
      //       this.singleVideoData.media_height = result.height
      //       this.singleVideoData.media_width = result.width
      //       this.s3LogoUpload(imageFile)
      //       this.$refs.companyLogo.value = null
      //       this.isLoading = false
      //     } else {
      //       this.UploadImageError = result.message
      //       this.showUploadImageError = true
      //       this.$refs.companyLogo.value = null
      //       this.isLoading = false
      //     }
      //   })
      // }
    },
    s3LogoUpload(imageFile) {
      if (imageFile) {
        let imgExt = imageFile.name.substr(imageFile.name.lastIndexOf('.'))
        let fileName = this.$uuid.v1() + imgExt
        this.uploadFileOnS3(
          fileName,
          appConstants.PATH_SAVE_IMAGE_ON_S3,
          imageFile,
          appConstants.IMAGE_CONTENT_TYPE
        )
          .then((data) => {
            let obj = {
              name: data.serverFilePath,
              id: ''
            }
            console.log('object', obj)
            this.product_images.push(obj)
            this.product_image = data.serverFilePath
            this.product_video = data.serverFilePath
            this.productDetails.media_name = data.savedFileName
            this.singleImageData.media_name = data.savedFileName
            this.singleVideoData.media_name = data.savedFileName
            this.isLoading = false
          })
          .catch((err) => {
            this.UploadImageError = err
            this.showUploadImageError = true
            this.isLoading = false
          })
      }
    },
    removeImage(index) {
      this.$refs.companyLogo.value = ''
      this.product_image = ''
      this.product_video = ''
      this.productDetails.media_name = ''
      this.productDetails.media_height = 0.0
      this.productDetails.media_width = 0.0
      this.singleImageData.media_name = ''
      this.product_images.splice(index, 1)
      // this.jobDetails.company_logo = ''
    },
    removeImageModal() {
      this.$refs.companyLogo.value = ''
      this.product_image = ''
      this.product_video = ''
      this.singleImageData.media_name = ''
      // this.product_images.splice(index, 1)
      // this.jobDetails.company_logo = ''
    },
    uploadSingleImage() {
      this.$v.singleImageData.$touch()
      this.isImageRequired = true
      if (this.$v.singleImageData.$invalid) {
        return
      }
      this.singleImageData.company = this.getCurrentCompanyId
      this.singleImageData.product = this.productDetails.id
      let payload = this.singleImageData
      //console.log('payload image', payload)
      // eslint-disable-next-line no-unused-vars
      this.addSingleMediaImage(payload).then((res) => {
        this.showModal()
        this.product_image = ''
        this.product_video = ''
        this.modal_message = 'Image added successfully'
        this.$refs['imageModal'].hide()
      })
    },
    uploadSingleVideo() {
      this.isVideoRequired = true
      if (this.$v.singleVideoData.$invalid) {
        return
      }
      this.singleVideoData.company = this.getCurrentCompanyId
      this.singleVideoData.product = this.productDetails.id
      let payload = this.singleVideoData
      //console.log('payload image', payload)
      // eslint-disable-next-line no-unused-vars
      this.addSingleMediaVideo(payload).then((res) => {
        this.showModal()
        this.product_video = ''
        this.product_image = ''
        this.modal_message = 'Video added successfully'
        this.$refs['videoModal'].hide()
      })
    },
    deleteImage(pid) {
      // console.log('id =>', pid)
      let obj = {
        media_id: pid,
        product_id: this.productDetails.id
      }
      this.deleteSingleMediaProductImage(obj)
        .then((res) => {
          console.log('delete media result', res)
          this.showDeleteMediaModal()
          this.modal_message = 'Product Media Deleted'
        })
        .catch((error) => {
          this.showDeleteMediaModal()
          this.modal_message = error
        })
    },

    getPayload(data) {
      let dataObj = {
        name: data.name,
        media_name: data.media_name == undefined ? '' : data.media_name,
        description: data.description,
        price: data.price == undefined || data.price == '' ? 0 : data.price,
        unit: data.unit == undefined ? '' : data.unit,
        currency: data.currency == undefined ? '' : data.currency,
        company: this.getCurrentCompanyId,
        id: data.id,
        search_keywords:
          data.search_keywords == undefined ? '' : data.search_keywords,
        media_width: data.media_width == undefined ? 0.0 : data.media_width,
        media_height: data.media_height == undefined ? 0.0 : data.media_height
      }
      return dataObj
    },
    saveProductInfo() {
      this.submitted = true
      this.$v.productDetails.$touch()
      // if (this.isAddProduct) {
      if (this.$v.productDetails.$invalid) {
        return
      }
      //}

      let payload = this.getPayload(this.productDetails)
      //console.log('payload', payload)
      this.saveProductInfoNew(payload)
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          this.fetchSingleCompanyPreviewDetails(this.getCurrentCompanyId)
          //console.log('result', res)
          this.showModal()
          this.isAddedProduct = true
          this.modal_message = 'Product Added Successfully'
          this.isShowAddImageButton = true
          this.$eventHub.$emit('Cancel_Product_Form', { cancelled: true })
        })
        .catch((error) => {
          this.showModal()
          this.modal_message = error
        })
    },
    updateProductInfo() {
      let payload = this.getPayload(this.productDetails)
      console.log('payload', payload)
      // eslint-disable-next-line no-unused-vars
      this.updateProductDetailsNew(payload).then((res) => {
        this.fetchSingleCompanyPreviewDetails(this.getCurrentCompanyId)
        this.showModal()
        this.isAddedProduct = true
        this.modal_message = 'Product Updated Successfully'
        this.isShowAddImageButton = true
        this.$eventHub.$emit('Cancel_Product_Form', { cancelled: true })
      })
    },
    cancelProduct() {
      this.$eventHub.$emit('Cancel_Product_Form', { cancelled: true })
      this.isShowProductList = true
      this.isShowAddProduct = false
    },
    resetForm() {
      this.productDetails.name = ''
      this.productDetails.media_name = ''
      this.productDetails.description = ''
      this.productDetails.price = 0
      this.productDetails.unit = ''
      this.productDetails.currency = ''
      this.productDetails.company = ''
      this.productDetails.id = ''
      this.productDetails.search_keywords = ''
      this.productDetails.media_width = 0.0
      this.productDetails.media_height = 0.0
      this.productDetails.isPrimary = true
    },
    showModal() {
      this.$refs['successModal'].show()
    },
    hideModal() {
      this.$refs['successModal'].hide()
      this.isShowProductList = true
      this.isShowAddProduct = false
    },
    hideMediaModal() {
      this.$refs['mediaModal'].hide()
    },
    showDeleteMediaModal() {
      this.$refs['mediaModal'].show()
    },
    hideUploadImageError() {
      this.showUploadImageError = false
      this.UploadImageError = ''
    },
    openImagePopup() {
      this.$refs['imageModal'].show()
    },
    hideImageModal() {
      this.$refs['imageModal'].hide()
      this.isImageRequired = false
    },
    openVideoPopup() {
      this.$refs['videoModal'].show()
    },
    hideVideoModal() {
      this.$refs['videoModal'].hide()
      this.isVideoRequired = false
    },
    makeImagePrimary(media) {
      let payload = {
        media: media.id,
        product: this.productDetails.id,
        company: this.getCurrentCompanyId
      }
      var res = this.product_images.find((item) => item.id === media.id)
      if (res) {
        res.is_primary = true
      }
      var result = this.product_images.find((item) => item.is_primary === true)
      if (result) {
        result.is_primary = false
      }
      // console.log('result', result)
      // eslint-disable-next-line no-unused-vars
      this.setImageAsPrimaryImage(payload).then((res) => {
        this.showModal()
        this.modal_message = 'Set image as primary image'
      })
    }
  },
  mounted() {
    // if (this.isAddProduct) {
    //   this.productDetails = this.ProductData
    //   this.product_images = this.mediasData
    //   this.isAddedProduct = false
    // } else {
    //   this.resetForm()
    //   this.isAddedProduct = true
    //   this.productDetails = this.ProductData
    //   this.product_images = this.mediasData
    //   if (
    //     this.productDetails.price !== null &&
    //     this.productDetails.price !== 0
    //   ) {
    //     this.hasPrice = true
    //   }
    // }
  }
}
</script>
<style>
button:focus-visible {
  outline: none !important;
}
</style>
