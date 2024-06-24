<template>
  <div class="cls_uploadimage">
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
      <div
        type="button"
        id="fileInputButton"
        @click="uploadImageClick()"
        class="btn-link"
      >
        <img
          class="upload-img"
          src="../../assets/img/Attach.svg"
          title="Attach"
        />
      </div>
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
// eslint-disable-next-line no-unused-vars
import Vue from 'vue'

export default {
  name: 'UploadImage',
  mixins: [imageCheck, uploadFileOnS3],
  props: [
    'id',
    'is_upload_pdf',
    'component_height',
    'is_logo_image',

    'save_image_path_value',
    'is_object_fit_contain'
  ],
  components: {
    modal
  },
  data() {
    return {
      company_logo: '',

      imageTypes: '',

      showUploadImageError: false,
      UploadImageError: '',
      styleObject: {
        height: `${this.component_height}px `
      }
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
      if (this.is_upload_pdf) {
        var result = this.checkFileTypeValid('.pdf', logoFile)
        if (result) {
          this.s3FileUploadPDF(logoFile)
          this.$refs[this.getIDandRef()].value = null
          this.isLoading = false
        } else {
          this.UploadImageError = 'Please select .pdf file.'
          this.showUploadImageError = true
          this.$refs[this.getIDandRef()].value = null
          this.isLoading = false
        }
      } else {
        this.isLoading = true
        let loader = this.$loading.show({})
        var max_size = appConstants.imageLogoSize.MAX_SIZE
        var max_width = appConstants.imageLogoSize.MAX_WIDTH
        var max_height = appConstants.imageLogoSize.MAX_HEIGHT

        if (this.is_logo_image) {
          max_size = appConstants.imageSize.MAX_SIZE
          max_width = appConstants.imageSize.MAX_WIDTH
          max_height = appConstants.imageSize.MAX_HEIGHT
        }

        this.checkIsImageValid(
          appConstants.ACCEPT_IMAGE_TYPE,
          max_size,
          max_width,
          max_height,
          logoFile
        ).then((result) => {
          if (result.isValidImage) {
            // console.log('valid image')
            this.s3LogoUpload(logoFile)
            this.$refs[this.getIDandRef()].value = null
            this.isLoading = false
            loader.hide()
          } else {
            this.UploadImageError = result.message
            this.showUploadImageError = true
            this.$refs[this.getIDandRef()].value = null
            this.isLoading = false
            loader.hide()
          }
        })
      }
    },

    s3LogoUpload(logoFile) {
      if (logoFile) {
        let imgExt = logoFile.name.substr(logoFile.name.lastIndexOf('.'))
        let fileName = this.$uuid.v1() + imgExt
        let loader = this.$loading.show({})
        this.uploadFileOnS3(
          fileName,
          this.save_image_path_value,
          logoFile,
          appConstants.IMAGE_CONTENT_TYPE
        )
          .then((data) => {
            this.company_logo = data.savedFileName
            this.isLoading = false
            loader.hide()
            this.emitUploadedImageChangeEvent()
          })
          .catch((err) => {
            this.UploadImageError = err
            this.showUploadImageError = true
            this.isLoading = false
            loader.hide()
          })
      }
    },
    s3FileUploadPDF(logoFile) {
      let imgExt = logoFile.name.substr(logoFile.name.lastIndexOf('.'))
      let fileName = this.$uuid.v1() + imgExt
      let loader = this.$loading.show({})
      this.uploadFileOnS3(
        fileName,
        this.save_image_path_value,
        logoFile,
        appConstants.PDF_CONTENT_TYPE
      )
        .then((data) => {
          this.company_logo = data.savedFileName
          this.isLoading = false
          loader.hide()
          this.emitUploadedImageChangeEvent()
        })
        .catch((err) => {
          this.UploadImageError = err
          this.showUploadImageError = true
          this.isLoading = false
          loader.hide()
        })
    },
    removeLogo() {
      this.$refs[this.getIDandRef()].value = ''
      this.company_logo = ''
      this.emitUploadedImageChangeEvent()
    },
    emitUploadedImageChangeEvent() {
      this.$emit('uploadedImage_changed', {
        image_name: this.company_logo
      })
    },
    getObjectFitClass() {
      if (this.is_object_fit_contain == 'true') {
        return 'is_object_fit_contain'
      }
    }
  },
  created() {
    if (this.is_upload_pdf) {
      this.imageTypes = appConstants.PDF_CONTENT_TYPE
    } else {
      //if not pdf then set image
      this.imageTypes = appConstants.ACCEPT_IMAGE_TYPE
    }
  }
}
</script>

<style scoped></style>
