<template>
  <div>
    <!-- <div class="page-title">Clients</div> -->
    <!-- add client data -->
    <div class="main-container">
      <div class="main-container-header p-4"></div>
      <div class="main-container-body">
        <div class="mb-4">
          <input
            :id="getIDandRef()"
            :accept="imageTypes"
            :ref="getIDandRef()"
            @change="previewLogo"
            type="file"
            style="display: none"
          />
          <div class="row m-0">
            <div class="col-md-12 d-flex">
              <!-- circle -->
              <div class="align-self-center text-center col-md-3 p-0">
                <div
                  v-if="!form_data.medias.name"
                  class="cursor-pointer"
                  @click="uploadImageClick()"
                >
                  <div
                    class="align-items-center circle d-flex flex-column justify-content-center rounded-circle"
                  >
                    <img
                      src="../../../../assets/img/Upload_black.svg"
                      alt="upload img"
                      class="w-25 pb-2"
                    />
                    <p class="fontSize12 font-weight-300">
                      Click here to <br />
                      upload image
                    </p>
                  </div>
                </div>
                <div v-if="form_data.medias.name">
                  <!-- mx-auto -->
                  <img
                    v-if="form_data.medias.name"
                    :src="setImagePreview()"
                    class="rounded-circle circle"
                  />
                </div>
                <div
                  v-if="submitted && isShowImageValidation"
                  class="invalid-feedback d-block text-left"
                >
                  Please Upload Image
                </div>
              </div>
              <!-- input box  class="p-2 col-10" -->
              <div class="w-100 col-md-9 pl-0">
                <label for="client name">Client name</label>
                <input
                  type="text"
                  class="form-control w-100"
                  v-model="form_data.client_name"
                  maxlength="100"
                />
                <div
                  v-if="submitted && !$v.form_data.client_name.required"
                  class="invalid-feedback d-block"
                >
                  Enter Valid Client name
                </div>
                <div
                  v-if="submitted && !$v.form_data.client_name.maxLength"
                  class="invalid-feedback d-block"
                >
                  Client name should be less than 100 characters
                </div>
                <div
                  class="align-items-baseline d-flex justify-content-between ml-auto mt-5"
                >
                  <p
                    class="fontSize12 font-weight-500 app-secondary-text-color"
                  >
                    *Please ensure that you have permission from your client to
                    add logo
                  </p>
                  <button class="btn p-3" @click="addRecord">Add+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="form-group mb-4"></div> -->
    <!-- show the added logo and client name  -->
    <div v-if="getClientData.length > 0" class="row mt-5">
      <div
        class="col-md-4 mb-2 text-center"
        v-for="(detail, index) in getClientData"
        :key="index"
      >
        <div class="card back-color app-bg-top-gradient">
          <div class="d-flex justify-content-end mt-1 mr-1">
            <img
              role="button"
              @click="deleteRecord(detail)"
              src="../../../../assets/img/Delete-Job.svg"
              alt=""
            />
          </div>
          <div class="">
            <img
              class="card-img rounded-circle"
              :src="setImageUrl(detail.medias)"
              :alt="detail.client_name"
            />
            <h5
              class="mt-3 card-title text-capitalize"
              style="word-break: break-all"
            >
              <span>{{ detail.client_name }} </span>
            </h5>
          </div>
        </div>
      </div>
    </div>
    <modal
      v-if="showTestimonialModal"
      @closeModal="updateTestimonialModalValues([false, ''])"
    >
      <div slot="body">{{ this.modalTestimonialMessage }}</div>
    </modal>
    <modal
      v-if="showUploadImageError"
      @closeModal="showUploadImageError = false"
    >
      <div slot="body">{{ this.UploadImageError }}</div>
    </modal>
  </div>
</template>

<script>
// import appConstants from '../../../appConstants'
import appConstants from '../../../../appConstants'
import { mapGetters, mapActions, mapMutations } from 'vuex'
// import { s3LogoUpload } from '../../../common/js/ImageUploadFunctions'
import uploadFileOnS3 from '../../../../mixins/uploadFileOnS3.js'
import modal from '../../../../common/Modal'
import { required, maxLength } from 'vuelidate/lib/validators'
import imageCheck from '../../../../mixins/imageCheck.js'

export default {
  name: 'ClientsLogo',
  components: {
    modal
  },
  mixins: [imageCheck, uploadFileOnS3],

  computed: {
    ...mapGetters('companyData', ['getCurrentCompanyData']),
    ...mapGetters('testiomonial', [
      'getClientData',
      'showTestimonialModal',
      'modalTestimonialMessage'
    ]),
    ...mapGetters(['getCurrentCompanyId'])
  },
  mounted() {
    this.fetchClientData(this.getCurrentCompanyId)
  },
  validations() {
    return {
      form_data: {
        client_name: { required, maxLength: maxLength(100) }
      }
    }
  },
  data() {
    return {
      showUploadImageError: false,
      submitted: false,
      isShowImageValidation: false,
      imageTypes: appConstants.ACCEPT_IMAGE_TYPE,
      // process.env.VUE_APP_IMGURL
      // read_s3_image_url: process.env.VUE_APP_S3_URL,
      imageFile: '',
      addedData: [],
      copyObjcet: {},
      disabled: true,
      form_data: {
        company_id: '',
        client_name: '',
        medias: {
          name: '',
          width: '',
          height: '',
          mediaPath: ''
        }
      }
    }
  },
  methods: {
    ...mapActions('testiomonial', [
      'fetchClientData',
      'saveClientData',
      'updateClientData',
      'deleteClientRecord'
    ]),
    ...mapMutations('testiomonial', ['updateTestimonialModalValues']),
    setImageUrl(media) {
      // console.log(process.env.VUE_APP_S3_URL)
      // console.log(media.mediaPath)
      // console.log(media.name)
      // let src = `${process.env.VUE_APP_S3_URL}${media.mediaPath}${media.name}`
      let src = `${process.env.VUE_APP_IMGURL}${media.name}`
      return src
    },
    deleteRecord(data) {
      // console.log('delete record', data)
      this.deleteClientRecord(data)
      // .then(() => {
      // console.log('record deleted =>', this.getClientData)
      // })
    },
    setImagePreview() {
      let src = URL.createObjectURL(this.imageFile)
      return src
    },
    isNewData() {
      if (!this.getClientData.id) {
        return true
      } else {
        return false
      }
    },
    updateRecord(data) {
      this.submitted = true
      if (this.$v.form_data.$invalid) {
        return
      }
      this.updateClientData(data)
      // .then(() => {
      //   console.log('data updated =>', this.getClientData)
      // })
    },
    getIDandRef() {
      return `clientLogo_${this.id}`
    },
    uploadImageClick() {
      document.getElementById(this.getIDandRef()).click()
    },
    async previewLogo() {
      this.imageFile = this.$refs[this.getIDandRef()].files[0]
      if (!this.imageFile) {
        return
      }

      let loader = this.$loading.show({})
      var max_size = appConstants.imageSize.MAX_SIZE
      var max_width = appConstants.imageSize.MAX_WIDTH
      var max_height = appConstants.imageSize.MAX_HEIGHT

      this.checkIsImageValidAndGetHW(
        appConstants.ACCEPT_IMAGE_TYPE,
        max_size,
        max_width,
        max_height,
        this.imageFile
      ).then((result) => {
        if (result.isValidImage) {
          this.form_data.company_id = this.getCurrentCompanyId
          this.form_data.medias.name = this.imageFile.name
          this.form_data.medias.width = result.width
          this.form_data.medias.height = result.height
          // this.form_data.medias.mediaPath =
          //   appConstants.PATH_SAVE_COMPNAY_IMAGE_ON_S3 +
          //   this.getCurrentCompanyData.id +
          //   '/testimonial/'
          this.form_data.medias.mediaPath = appConstants.PATH_SAVE_IMAGE_ON_S3
          console.log(this.form_data)
          this.$refs[this.getIDandRef()].value = null
          loader.hide()
        } else {
          this.UploadImageError = result.message
          this.showUploadImageError = true
          this.$refs[this.getIDandRef()].value = null
          this.imageFile = ''
          loader.hide()
        }
      })
    },
    async addRecord() {
      this.submitted = true
      if (this.imageFile == '' || this.imageFile == undefined) {
        // console.log('img not selected')
        this.isShowImageValidation = true
        return
      }

      if (this.$v.form_data.$invalid) {
        return
      }
      // if (this.imageFile == '') {
      //   // console.log('img not selected')
      //   this.isShowImageValidation = true
      //   return
      // }
      this.isShowImageValidation = false
      let result = await this.s3LogoUpload(
        this.imageFile,
        this.form_data.medias.mediaPath
      )
      if (result) {
        this.saveClientData(this.form_data).then(() => {
          this.resetForm()
        })
      }
    },
    async s3LogoUpload(logoFile, path_to_save) {
      if (logoFile) {
        let imgExt = logoFile.name.substr(logoFile.name.lastIndexOf('.'))
        let fileName = this.$uuid.v1() + imgExt
        let loader = this.$loading.show({})

        let result = await this.uploadFileOnS3(
          fileName,
          path_to_save,
          logoFile,
          appConstants.IMAGE_CONTENT_TYPE
        )
          .then((data) => {
            // this.form_data.medias.name = data.savedFileName
            // let obj = {
            //   name: data.savedFileName
            //   // imageSrc: data.serverFilePath
            // }
            this.isLoading = false
            loader.hide()
            // console.log(data.savedFileName)
            this.form_data.medias.name = data.savedFileName
            return true
          })
          .catch((err) => {
            this.UploadImageError = err
            this.showUploadImageError = true
            this.isLoading = false
            loader.hide()
            return false
          })

        return result
      }
    },
    resetForm() {
      // this.form_data = ''
      this.form_data.company_id = ''
      this.form_data.client_name = ''
      this.form_data.medias.width = ''
      this.form_data.medias.height = ''
      this.form_data.medias.name = ''
      this.form_data.medias.mediaPath = ''
      this.submitted = false
    }
  }
}
</script>

<style scoped>
/* input {
  border: none;
  border-radius: 5px;
}
input:hover {
  border: none;
} */
.set-delete {
  top: -10px;
  right: -5px;
}
.card {
  border: none !important;
}
.card-img {
  height: 145px;
  width: 145px;
}
/* input {
  background-color: #fff;
  border-radius: 5px;
}
input:hover {
  background-color: #fff;
} */
.back-color {
  background-color: var(--app-secondary-color);
  border-radius: 8px;
}
.circle {
  height: 150px;
  width: 150px;
  background-color: var(--app-secondary-color);
  display: table;
}
.circle p {
  vertical-align: middle;
  display: table-cell;
  font-size: 10px;
  line-height: 1.3;
  color: black;
}
</style>
