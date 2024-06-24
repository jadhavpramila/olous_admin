<template>
  <div>
    <div class="main-container">
      <div class="main-container-header p-4">
        <!-- <label class="font-weight-600 fontSize18 text-uppercase mb-0"
          >Testimonials and media
        </label> -->
      </div>
      <div class="main-container-body px-3">
        <div class="form-group px-3">
          <div class="row">
            <input
              :id="getIDandRef()"
              :accept="imageTypes"
              :ref="getIDandRef()"
              @change="previewLogo"
              type="file"
              style="display: none"
            />
            <div class="col-md-3 pr-0 col-12 text-center">
              <div
                v-if="!form_data.medias.name"
                class="cursor-pointer"
                @click="uploadImageClick()"
              >
                <div
                  class="circle rounded-circle mb-2 d-flex flex-column justify-content-center align-items-center"
                >
                  <img
                    src="../../../../assets/img/Upload_black.svg"
                    alt="upload img"
                    class="w-25 pb-2"
                  />
                  <p class="fontSize12 font-weight-300">
                    Click here to <br />
                    upload your photo
                  </p>
                </div>
              </div>
              <div
                v-if="form_data.medias.name"
                class="logo-preview circle rounded-circle mb-2"
              >
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
            <div class="col-md-9 pl-0 col-12 align-self-center">
              <div class="mb-3">
                <label for="full name">Full Name</label>
                <input
                  type="text"
                  v-model="form_data.name"
                  class="col-12 form-control"
                  maxlength="40"
                />
                <div
                  v-if="submitted && !$v.form_data.name.required"
                  class="invalid-feedback d-block"
                >
                  Enter Valid name
                </div>
                <div
                  v-if="submitted && !$v.form_data.name.maxLength"
                  class="invalid-feedback d-block"
                >
                  Max 40 characters required
                </div>
              </div>
              <div class="">
                <label for="designation">Designation</label>
                <input
                  type="text"
                  v-model="form_data.designation"
                  class="col-12 form-control"
                  maxlength="50"
                />
                <div
                  v-if="submitted && !$v.form_data.designation.required"
                  class="invalid-feedback d-block"
                >
                  Enter Valid designation
                </div>
                <div
                  v-if="submitted && !$v.form_data.designation.maxLength"
                  class="invalid-feedback d-block"
                >
                  Max 50 characters required
                </div>
              </div>
            </div>
          </div>
          <div class="form-group mt-3">
            <label for="description">Description</label>
            <textarea
              class="form-control bg-white col-12"
              name="longDesc"
              v-model="form_data.content"
              placeholder="Enter Description..."
              rows="5"
              maxlength="275"
            ></textarea>
            <div
              v-if="submitted && !$v.form_data.content.required"
              class="invalid-feedback d-block"
            >
              Enter Valid description
            </div>
            <div
              v-if="submitted && !$v.form_data.content.maxLength"
              class="invalid-feedback d-block"
            >
              Description Should be less than 275 characters
            </div>
          </div>
        </div>
        <div class="d-flex">
          <div class="col-md-12 col-12">
            <button class="btn float-right p-3" @click="saveData">Add+</button>
          </div>
        </div>
      </div>
    </div>
    <!-- add testimony -->

    <!-- display added data -->
    <div v-if="getTestiomonialData.length > 0" class="row mt-4">
      <div
        class="col-md-4 mb-4 text-center"
        v-for="(detail, index) in getTestiomonialData"
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
          <div class="card-min-height">
            <div
              class="d-flex flex-column justify-content-center align-items-center"
            >
              <div class="" style="min-width: 60px">
                <img
                  class="card-img rounded-circle"
                  :src="setImageUrl(detail.medias)"
                  :alt="detail.name"
                />
              </div>
              <div class="text-left">
                <span
                  class="font-size-16 font-weight-bold"
                  style="word-break: break-all"
                  >{{ detail.name }}
                </span>
                <p class="font-size-12" style="word-break: break-all">
                  {{ detail.designation }}
                </p>
              </div>
            </div>
            <div>
              {{ detail.content }}
            </div>
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
// import appConstants from '../../../appConstants.js'
import appConstants from '../../../../appConstants'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import uploadFileOnS3 from '../../../../mixins/uploadFileOnS3.js'
import { required, maxLength } from 'vuelidate/lib/validators'
import modal from '../../../../common/Modal'
import imageCheck from '../../../../mixins/imageCheck.js'

export default {
  name: 'Testiomonial',
  components: {
    modal
  },
  mixins: [imageCheck, uploadFileOnS3],
  computed: {
    ...mapGetters('companyData', ['getCurrentCompanyData']),
    ...mapGetters('testiomonial', [
      'getTestiomonialData',
      'showTestimonialModal',
      'modalTestimonialMessage'
    ]),
    ...mapGetters(['getCurrentCompanyId'])
  },
  mounted() {
    this.fetchTestimonialData(this.getCurrentCompanyId)
  },
  validations() {
    return {
      form_data: {
        name: { required, maxLength: maxLength(40) },
        designation: { required, maxLength: maxLength(50) },
        content: { required, maxLength: maxLength(275) }
      }
    }
  },
  data() {
    return {
      showUploadImageError: false,
      submitted: false,
      isShowImageValidation: false,
      imageTypes: appConstants.ACCEPT_IMAGE_TYPE,
      path_s3_save_image: appConstants.PATH_SAVE_IMAGE_ON_S3,
      read_s3_image_url: process.env.VUE_APP_IMGURL,
      imageFile: '',
      form_data: {
        company_id: '',
        name: '',
        designation: '',
        content: '',
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
      'fetchTestimonialData',
      'saveTestimonialData',
      // 'updateTestimonialData',
      'deleteTestimonialRecord'
    ]),
    ...mapMutations('testiomonial', ['updateTestimonialModalValues']),
    getIDandRef() {
      return `clientLogo_${this.id}`
    },
    setImageUrl(media) {
      // let src = `${process.env.VUE_APP_S3_URL}${media.mediaPath}${media.name}`
      let src = `${this.read_s3_image_url}${media.name}`
      return src
    },
    uploadImageClick() {
      document.getElementById(this.getIDandRef()).click()
    },
    setImagePreview() {
      let src = URL.createObjectURL(this.imageFile)
      return src
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
          this.form_data.company_id = this.getCurrentCompanyData.id
          this.form_data.medias.name = this.imageFile.name
          this.form_data.medias.width = result.width
          this.form_data.medias.height = result.height
          // this.form_data.medias.mediaPath =
          //   appConstants.PATH_SAVE_COMPNAY_IMAGE_ON_S3 +
          //   this.getCurrentCompanyData.id +
          //   '/testimonial/'
          //Path changed to media/products
          this.form_data.medias.mediaPath = appConstants.PATH_SAVE_IMAGE_ON_S3
          // console.log(this.form_data)
          this.$refs[this.getIDandRef()].value = null
          this.isShowImageValidation = false
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
    async saveData() {
      this.submitted = true
      if (this.imageFile == '' || this.imageFile == undefined) {
        // console.log('img not selected')
        this.isShowImageValidation = true
        return
      }

      if (this.$v.form_data.$invalid) {
        return
      }

      this.isShowImageValidation = false
      let result = await this.s3LogoUpload(
        this.imageFile,
        this.form_data.medias.mediaPath
      )
      this.form_data.company_id = this.getCurrentCompanyId
      console.log()
      if (result) {
        this.saveTestimonialData(this.form_data).then(() => {
          // console.log('data saved =>', this.getTestiomonialData)
          this.resetForm()
        })
      }
    },
    deleteRecord(data) {
      this.deleteTestimonialRecord(data)
      // .then(() => {
      // console.log('record deleted =>', this.getTestiomonialData)
      // })
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
      this.form_data.company_id = ''
      this.form_data.name = ''
      this.form_data.designation = ''
      this.form_data.content = ''
      this.form_data.medias.width = ''
      this.form_data.medias.height = ''
      this.form_data.medias.name = ''
      this.form_data.medias.mediaPath = ''
      this.submitted = false
      this.$refs[this.getIDandRef()].value = null
      this.imageFile = ''
    }
  }
}
</script>

<style scoped>
input {
  background-color: white;
}
/* input:hover {
  border: none;
} */
.set-delete {
  top: -10px;
  right: -5px;
}
.font-size-16 {
  font-size: 16px;
}
.font-size-12 {
  font-size: 12px;
}
.card {
  border: none !important;
}
.card-img {
  height: 68px;
  width: 68px;
}
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
  color: #000000;
}

.card-min-height {
  height: 295px;
}
</style>
