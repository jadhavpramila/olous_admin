<template>
  <div class="">
    <div class="">
      <!-- <div class="container-fluid company-list form-conatiner mt-3"> -->
      <!-- </div>
    <div class="justify-content-between form-conatiner"> -->
      <!-- <div class="col-lg-4 fixed-menu">
        <div
          class="fixedPosition d-flex align-items-center left-content-wrapper"
        >
          <LeftContent />
        </div>
      </div> -->
      <div class="mt-3">
        <!-- <Header /> -->
        <!-- <div
          class="text-right page-header row align-items-center justify-content-between">
          <div class="text-left">
            <h3>Add Service</h3>
          </div>
          <div class="col-6">
            <router-link to="/home" class="btn btn-info btn-outline mr-2"
              >back</router-link
            >
          </div>
        </div> -->
        <div class="">
          <div class="text-left">
            <h3 class="text-2xl">Add Service</h3>
          </div>
          <form enctype="multipart/form-data" @submit.prevent="saveService">
            <div class="form-inputs align-items-center">
              <div class="form-group">
                <label>Name</label>
                <input
                  type="text"
                  class="form-control input-lg"
                  v-model="serviceDetail.name"
                  placeholder="service name"
                  :class="{
                    'is-invalid': submitted && $v.serviceDetail.name.$invalid
                  }"
                />
                <div
                  v-if="submitted && !$v.serviceDetail.name.required"
                  class="invalid-feedback"
                >
                  Service name is required
                </div>
              </div>
              <div class="form-group">
                <label>Description (Max 1000 characters)</label>
                <b-form-textarea
                  name="short_desc"
                  v-model="serviceDetail.description"
                  cols="40"
                  rows="1"
                  max-rows="10"
                  maxlength="1000"
                  no-resize
                  v-on:keyup="getDescLength($event.target.value)"
                  class="form-control"
                  :class="{
                    'is-invalid':
                      submitted && $v.serviceDetail.description.$invalid
                  }"
                ></b-form-textarea>
                <pre class="mb-0 text-right remainig-text">
                  {{ remainingDescLength }}/1000</pre
                >
                <div
                  v-if="submitted && !$v.serviceDetail.description.required"
                  class="invalid-feedback"
                >
                  Service description is required
                </div>
              </div>

              <div class="mt-n2">
                <div class="form-group mb-n1">
                  <div class="col-12">
                    <label
                      >Service Images(Upto 3 Images) (Mark Primary image with
                      tick)</label
                    >
                  </div>
                </div>
                <!-- <template v-if="previewList.length"> -->
                <template>
                  <div class="row">
                    <div
                      class="col-md-4 mt-2"
                      v-for="(item, index) in previewList"
                      :key="index"
                    >
                      <div class="product_card_edit">
                        <div class="product_card_edit_image_div">
                          <img
                            :src="item.logosrc"
                            class="img-fluid product_card_edit_image"
                          />
                        </div>
                        <div class="product_card_edit_action p-3">
                          <div class="row">
                            <div class="col-9 pl-3">
                              <input
                                :checked="item.is_primary === true"
                                type="radio"
                                name="primary"
                                id
                                @input="makePrimary(index)"
                              />
                              Mark as Primary
                            </div>
                            <div class="col-3 pl-3">
                              <img
                                src="../../../assets/img/Delete.svg"
                                title="Delete"
                                @click.prevent="removeImage(index)"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <!--  -->
                      <!-- <button
                        type="button"
                        @click="removeImage(index)"
                        class="btn btn-link remove-logo"
                        title="Remove Image"
                      >
                        X
                      </button>
                      <input
                        :checked="index == 0"
                        type="radio"
                        name="primary"
                        id
                        @input="makePrimary(index)"
                      />
                      Mark as Primary
                      <img :src="item" class="img-fluid" /> -->
                    </div>
                    <div
                      class="col-md-4 mt-2 add-product-img"
                      v-if="previewList.length < 3"
                      v-cloak
                    >
                      <input
                        id="fileInput"
                        :accept="imageTypes"
                        multiple
                        @change="previewFile($event, previewList.length)"
                        type="file"
                        style="display: none"
                      />
                      <button
                        type="button"
                        id="fileInputButton"
                        onclick="document.getElementById('fileInput').click()"
                        class="btn btn-link"
                      >
                        Add Image
                      </button>
                    </div>
                  </div>
                </template>
                <!-- <div
                  class="form-group col-5 mt-2 img-preview-wrapper"
                  v-if="previewList.length < 3"
                  v-cloak
                >
                  <input
                    id="fileInput"
                    accept="image/*"
                    multiple
                    @change="previewFile($event, (previewList.length))"
                    type="file"
                    style="display: none"
                  />
                  <button
                    type="button"
                    id="fileInputButton"
                    onclick="document.getElementById('fileInput').click()"
                    class="btn btn-link"
                  >
                    Add
                  </button>
                </div> -->
              </div>
              <div v-if="submitted && primaryImage" class="image-error ml-2">
                atleast 1 service image is required
              </div>
              <!-- <div class="form-group m-b">
                <label for="location">Add Key Search Words</label>
                <span class="ml-3">{{ remainingLength }}</span>
                <input
                  type="text"
                  class="form-control"
                  v-model.trim="serviceDetail.word"
                  v-on:keyup="getLength($event.target.value)"
                  placeholder="search word"
                  :class="{
                    'is-invalid': submitted && $v.serviceDetail.word.$error,
                  }"
                />
                <pre class="mt-3 mb-0">Add comma seperated word</pre>
                <div
                  v-if="submitted && !$v.serviceDetail.word.required"
                  class="invalid-feedback"
                >search keyword required</div>
              </div> -->

              <div class="form-group text-right">
                <button
                  type="button"
                  @click.prevent="showModal"
                  class="btn btn-dark btn-custom mr-2"
                >
                  Cancel
                </button>
                <button class="btn btn-dark btn-custom">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <modal v-if="showCancelModal" @closeModal="hideModal">
      <div slot="body">Leave the page without saving?</div>
      <div slot="footer">
        <b-button class="btn" variant="outline-dark" @click.prevent="hideModal">
          Cancel
        </b-button>
        <b-button
          class="ml-2 btn"
          variant="outline-dark"
          @click.prevent="cancel"
        >
          OK
        </b-button>
      </div>
    </modal>
    <!--<template>
      <b-modal ref="cancel-modal" hide-footer title="Go to Dashboard">
        <div class="d-block text-center">
          <h4>You will lose all your data</h4>
        </div>
        <b-button
          class="mt-3"
          variant="outline-danger"
          @click.prevent="hideModal"
          >Cancel</b-button
        >
        <b-button
          class="mt-3 ml-3"
          variant="outline-primary"
          @click.prevent="cancel"
          >OK</b-button
        >
      </b-modal>
    </template>-->
    <modal v-if="maxImageAlert" @closeModal="hideImageModal">
      <div slot="body">
        <pre style="white-space: pre-wrap">{{ imageError }} </pre>
      </div>
    </modal>
    <!--<template>
      <b-modal
        :visible="maxImageAlert"
        hide-footer
        hide-header
        ref="image-Modal"
        id="modal-2"
      >
        <div class="d-block">
          <pre class="my-4">{{ imageError }}</pre>
          <b-button class="mt-2 float-right" @click.prevent="hideImageModal">
            Ok
          </b-button>
        </div>
      </b-modal>
    </template>-->
    <loading :active="isLoading" :is-full-page="true" />
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import { required } from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from 'vuex'
import md5 from 'js-md5'
import appConstants from '../../../appConstants.js'
import imageCheck from '../../../mixins/imageCheck.js'
import uploadFileOnS3 from '../../../mixins/uploadFileOnS3.js'
import modal from '../../../common/Modal'

export default {
  name: 'AddService',
  mixins: [imageCheck, uploadFileOnS3],
  props: ['currrentCompanyData'],
  components: {
    Loading,
    modal
  },
  data() {
    return {
      imageError: '',
      isLoading: false,
      searchTotalLength: 256,
      remainingLength: 256,
      previewList: [],
      medias: [],
      maxImageAlert: false,
      primaryImage: false,
      descTotalLength: 1000,
      remainingDescLength: 1000,
      serviceDetail: {
        name: '',
        description: '',
        word: ''
      },
      productType: appConstants.PRODUCT_TYPE,
      submitted: false,
      imageTypes: appConstants.ACCEPT_IMAGE_TYPE,
      showCancelModal: false
    }
  },
  computed: {
    // ...mapGetters(['companyDetails'])
  },
  created() {
    // if (this.currrentCompanyData == undefined) {
    //   this.$router.push("/home");
    // }
  },
  validations() {
    return {
      serviceDetail: {
        name: {
          required
        },
        description: {
          required
        }
        // word: { required, maxLength: maxLength(256) },
      }
    }
  },
  methods: {
    ...mapActions('product', ['addService', 'updateShowAddService']),
    showModal() {
      //this.$refs['cancel-modal'].show()
      this.showCancelModal = true
    },
    hideModal() {
      //this.$refs['cancel-modal'].hide()
      this.showCancelModal = false
    },
    hideImageModal() {
      // this.$refs['image-Modal'].hide()
      this.maxImageAlert = false
    },
    cancel() {
      // this.$router.push("/home");
      //this.hideAddService(false);
      this.updateShowAddService(false)
    },
    getLength(e) {
      this.remainingLength = this.searchTotalLength - e.length
    },
    getDescLength(e) {
      this.remainingDescLength = this.descTotalLength - e.length
    },
    async previewFile(e, fileIndex) {
      let input = e.target
      let userSelectedFileCount = input.files.length
      let maxCount = userSelectedFileCount + this.previewList.length
      if (userSelectedFileCount > 3 || maxCount > 3) {
        this.imageError = 'Upto 3 Service images are allowed'
        this.maxImageAlert = true
        return
      }
      // if (input.files) {
      //   this.s3ImgUpload(fileIndex)
      // }

      var validImages = []
      var invalidImageIndex = []
      var index
      for (index = 0; index < input.files.length; index++) {
        await this.checkIsImageValid(
          appConstants.ACCEPT_IMAGE_TYPE,
          appConstants.imageSize.MAX_SIZE,
          appConstants.imageSize.MAX_WIDTH,
          appConstants.imageSize.MAX_HEIGHT,
          input.files[index]
        ).then((result) => {
          if (result.isValidImage) {
            validImages.push(input.files[index])
          } else {
            invalidImageIndex.push({
              index: index,
              InvalidMesage: result.message
            })
          }
        })
      }

      if (invalidImageIndex.length > 0) {
        var errorMessage = ''
        //if user has selected only one image then show error for only that image other wise display all valid image rules
        if (userSelectedFileCount == 1 && invalidImageIndex.length == 1) {
          errorMessage = invalidImageIndex[0].InvalidMesage
        } else {
          //show error message to user
          var validationRules = this.getAllImageValidationRule(
            appConstants.ACCEPT_IMAGE_TYPE,
            appConstants.imageSize.MAX_SIZE,
            appConstants.imageSize.MAX_WIDTH,
            appConstants.imageSize.MAX_HEIGHT
          )
          var message = `${invalidImageIndex.length} out of ${userSelectedFileCount} files could not be uploaded.`
          errorMessage = `${message}\n${validationRules}`
          this.maxImageAlert = true
        }
        this.imageError = errorMessage
        this.maxImageAlert = true
      }
      if (validImages.length) {
        this.primaryImage = false
        this.s3ImgUpload(fileIndex, validImages)
      } else {
        let fileInput = document.getElementById('fileInput')
        fileInput.value = ''
      }
    },
    updateMediaList(file, fileName, index) {
      let primary = true
      if (index === 0) {
        primary = true
      } else {
        primary = false
      }
      let fileDetails = {
        name: '',
        height: 0,
        width: 0,
        video_duration: 0,
        logosrc: file,
        mediaType: 7,
        is_primary: primary
      }
      fileDetails.name = fileName
      if (this.previewList.length === 1) {
        this.makePrimary(0)
      }
      this.previewList.push(fileDetails)
      var image = new Image()
      image.src = file
      // this.previewList.push(e.target.result);
      image.onload = () => {
        fileDetails.height = image.height
        fileDetails.width = image.width
        this.medias.push(fileDetails)
      }
    },
    removeImage(i) {
      this.previewList.splice(i, 1)
      this.medias.splice(i, 1)
    },
    makePrimary(i) {
      this.medias.map((res, j, arr) => {
        if (i === j) {
          arr[j].is_primary = true
        } else {
          arr[j].is_primary = false
        }
      })
    },
    s3ImgUpload(index, files) {
      this.isLoading = true
      let fileInput = document.getElementById('fileInput')
      //let files = document.getElementById('fileInput').files
      if (files) {
        for (let i = 0; i < files.length; i++) {
          let file = files[i]
          let fileName = file.name
          let abc = md5(fileName)
          fileName = fileName.substr(fileName.lastIndexOf('.'))
          fileName = abc + this.currrentCompanyData.id + '-ser' + fileName
          // let filePath = 'media/products/' + fileName
          this.uploadFileOnS3(
            fileName,
            appConstants.PATH_SAVE_IMAGE_ON_S3,
            files[i],
            appConstants.IMAGE_CONTENT_TYPE
          )
            .then((data) => {
              this.updateMediaList(
                data.serverFilePath,
                data.savedFileName,
                index
              )
              this.isLoading = false
            })
            .catch((err) => {
              this.imageError = err
              this.maxImageAlert = true
              this.isLoading = false
            })

          // s3.upload(
          //   {
          //     Key: filePath,
          //     Body: file,
          //     ACL: 'public-read',
          //     ContentType: 'image'
          //   },
          //   (err, data) => {
          //     this.isLoading = false
          //     if (err) {
          //       console.log(err)
          //       this.imageError =
          //         'Unable to upload image. Please try again later.'
          //       this.maxImageAlert = true
          //     } else if (data) {
          //       // let file = ;
          //       // console.log(file)
          //       // data.key.substr(data.key.lastIndexOf("/")).replace('/','')
          //       //this.previewList.push(data.Location);
          //       this.updateMediaList(data.Location, fileName, index)
          //       //this.maxImageAlert = false
          //     }
          //   }
          // ).on('httpUploadProgress', function (progress) {
          //   let uploaded = parseInt((progress.loaded * 100) / progress.total)
          //   // eslint-disable-next-line no-undef
          //   $('progress').attr('value', uploaded)
          // })
        }
      }

      fileInput.value = ''
    },
    saveService() {
      this.submitted = true
      this.$v.serviceDetail.$touch()
      if (this.$v.serviceDetail.$invalid || this.previewList.length == 0) {
        this.primaryImage = true
        return
      }

      let data = {
        company: this.currrentCompanyData.id,
        name: this.serviceDetail.name,
        description: this.serviceDetail.description,
        search_keywords: this.serviceDetail.word,
        medias: this.medias,
        product_type: this.productType.SERVICES
      }
      let payLoad = {
        p: data,
        c: this.currrentCompanyData
      }

      this.addService(payLoad).then(() => {
        this.hideAddService(true)
      })
    },
    hideAddService(reloadPage) {
      this.$emit('hideAddService', { reloadPage: reloadPage })
    }
  }
}
</script>

<style scoped>
span {
  font-size: 12px;
}
.img-preview-wrapper {
  background: #f1f1f1;
  padding: 5px 14px 14px;
  margin: 0 10px;
  border-radius: 16px;
  position: relative;
}
.img-preview {
  max-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}
.img-preview img {
  max-height: 200px;
}

#fileInputButton {
  width: 100%;
  height: 100%;
  margin-top: 0px;
  border-radius: 4px;
}

.image-error {
  color: #dc3545;
}

.contact-msg {
  display: inline;
  text-transform: none;
}
</style>
