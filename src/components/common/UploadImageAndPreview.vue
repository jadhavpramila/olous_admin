<template>
  <div class="cls_uploadimageAndPreview">
    <!--:style="{ height: component_height + 'px' }"-->
    <div class="" :style="styleObject">
      <input
        :id="getIDandRef()"
        :accept="imageTypes"
        :ref="getIDandRef()"
        @change="previewLogo"
        type="file"
        style="display: none"
      />
      <!--<button
        type="button"
        id="fileInputButton"
        @click="uploadImageClick()"
        class="btn btn-link"
        v-if="company_logo == '' || company_logo == null"
      >
        <label class="upload-text">{{ upload_button_text }}</label>
      </button>-->
      <div
        id="fileInputButton"
        class="cursor-pointer"
        style="display: flex; align-items: center; justify-content: center"
        @click="uploadImageClick()"
        v-if="company_logo == '' || company_logo == null"
      >
        <label class="upload-text">{{ upload_button_text }}</label>
      </div>

      <div v-if="company_logoSrc" class="logo-preview">
        <img
          v-if="company_logoSrc"
          @click="removeLogo"
          class="remove-logo"
          src="../../assets/img/Close.svg"
          title="close image"
        />
        <img
          v-if="company_logoSrc"
          :src="company_logoSrc"
          :style="styleObject"
          class="img-preview logo-image"
          :class="getObjectFitClass()"
        />
      </div>
    </div>
    <div v-if="submitted && !$v.company_logo.required" class="is-invalid"></div>
    <div v-if="submitted && !$v.company_logo.required" class="invalid-feedback">
      {{ required_validation_message }}
    </div>

    <modal
      v-if="showUploadImageError"
      @closeModal="showUploadImageError = false"
    >
      <div slot="body">{{ this.UploadImageError }}</div>
    </modal>
  </div>
</template>

<script>
import appConstants from '../../appConstants.js'
import imageCheck from '../../mixins/imageCheck.js'
import uploadFileOnS3 from '../../mixins/uploadFileOnS3.js'
import modal from '../../common/Modal.vue'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'UploadImageAndPreview',
  mixins: [imageCheck, uploadFileOnS3],
  props: [
    'id',
    'component_height',
    'is_logo_image',

    'save_image_path_value',
    'read_image_path_value',
    'image_name_value',
    'submitted',
    'is_object_fit_contain',
    'upload_button_text',
    'required_validation_message'
  ],
  components: {
    modal
  },
  data() {
    return {
      company_logo: '',
      company_logoSrc: '',

      imageTypes: appConstants.ACCEPT_IMAGE_TYPE,

      showUploadImageError: false,
      UploadImageError: '',
      styleObject: {
        height: `${this.component_height}px `
      },

      uploaded_image_height: 0.0,
      uploaded_image_width: 0.0,
      uploaded_image_size: 1277
    }
  },
  validations() {
    return {
      company_logo: { required }
    }
  },
  methods: {
    getIDandRef() {
      return `companyLogo_${this.id}`
    },
    uploadImageClick() {
      document.getElementById(this.getIDandRef()).click()
    },
    previewLogo() {
      let logoFile = this.$refs[this.getIDandRef()].files[0]
      if (!logoFile) {
        return
      }

      this.isLoading = true
      var max_size = appConstants.imageLogoSize.MAX_SIZE
      var max_width = appConstants.imageLogoSize.MAX_WIDTH
      var max_height = appConstants.imageLogoSize.MAX_HEIGHT

      if (this.is_logo_image) {
        max_size = appConstants.imageSize.MAX_SIZE
        max_width = appConstants.imageSize.MAX_WIDTH
        max_height = appConstants.imageSize.MAX_HEIGHT
      }

      this.checkIsImageValidAndGetHW(
        appConstants.ACCEPT_IMAGE_TYPE,
        max_size,
        max_width,
        max_height,
        logoFile
      ).then((result) => {
        if (result.isValidImage) {
          this.uploaded_image_height = result.height
          this.uploaded_image_width = result.width
          this.uploaded_image_size = result.size

          // console.log('valid image')
          this.s3LogoUpload(logoFile)
          this.$refs[this.getIDandRef()].value = null
          this.isLoading = false
        } else {
          this.UploadImageError = result.message
          this.showUploadImageError = true
          this.$refs[this.getIDandRef()].value = null
          this.isLoading = false
        }
      })
    },

    s3LogoUpload(logoFile) {
      if (logoFile) {
        let imgExt = logoFile.name.substr(logoFile.name.lastIndexOf('.'))
        let fileName = this.$uuid.v1() + imgExt
        this.uploadFileOnS3(
          fileName,
          this.save_image_path_value,
          logoFile,
          appConstants.IMAGE_CONTENT_TYPE
        )
          .then((data) => {
            this.company_logo = data.savedFileName
            this.company_logoSrc = data.serverFilePath
            this.isLoading = false
            this.emitUploadedImageChangeEvent()
          })
          .catch((err) => {
            this.UploadImageError = err
            this.showUploadImageError = true
            this.isLoading = false
          })
      }
    },
    removeLogo() {
      this.$refs[this.getIDandRef()].value = ''
      this.company_logoSrc = ''
      this.company_logo = ''
      this.uploaded_image_height = 0.0
      this.uploaded_image_width = 0.0
      this.uploaded_image_size = 1277
      this.emitUploadedImageChangeEvent()
    },
    emitUploadedImageChangeEvent() {
      this.$emit('uploadedImage_changed', {
        image_name: this.company_logo,
        height: this.uploaded_image_height,
        width: this.uploaded_image_width,
        size: this.uploaded_image_size
      })
      // this.$emit('uploadedImage_changed', this.company_logo)
    },
    getObjectFitClass() {
      if (this.is_object_fit_contain == 'true') {
        return 'is_object_fit_contain'
      } else {
        return 'is_object_fit_cover'
      }
    }
  },
  created() {
    if (this.image_name_value == '' || this.image_name_value == null) {
      this.company_logo = ''
      this.company_logoSrc = ''
    } else {
      this.company_logo = this.image_name_value
      this.company_logoSrc = `${this.read_image_path_value}${this.image_name_value}`
    }
  }
}
</script>

<style scoped></style>
