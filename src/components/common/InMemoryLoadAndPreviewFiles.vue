<template>
  <div class="cls_uploadimageAndPreviewMultiple">
    <div class="row" :style="upload_button_styleObject" v-if="showUploadButton">
      <div class="col-lg-6 col-md-6 col-12">
        <input
          :id="getIDandRef()"
          :accept="imageTypes"
          :ref="getIDandRef()"
          @change="previewLogo"
          multiple="multiple"
          type="file"
          style="display: none"
        />
        <div
          id="upload_files"
          class="cursor-pointer"
          style="display: flex; align-items: center; justify-content: center"
          @click="uploadImageClick()"
        >
          <label class="upload-text">{{ upload_button_text }}</label>
        </div>
      </div>
    </div>
    <div class="row">
      <div
        class="col-lg-4 col-md-4 col-12 mt-3"
        v-for="(file, counter) in uploaded_files"
        :key="counter"
      >
        <InMemoryPreviewImageVideo
          :id="getToPreviewImage(counter)"
          :component_height="seleted_image_height"
          is_object_fit_contain="true"
          :fileObject="file"
          @preview_uploadedImagePassURL_Removed="removeLogo(counter)"
        ></InMemoryPreviewImageVideo>
      </div>
    </div>

    <!--<modal
      v-if="showUploadImageError"
      @closeModal="showUploadImageError = false"
    >
      <div slot="body">{{ this.UploadImageError }}</div>
    </modal>-->
    <modal
      v-if="showUploadImageError"
      @closeModal="showUploadImageError = false"
    >
      <div slot="body">
        <pre style="white-space: pre-wrap">{{ UploadImageError }}</pre>
      </div>
    </modal>
  </div>
</template>

<script>
import appConstants from '../../appConstants.js'
import imageCheck from '../../mixins/imageCheck.js'
import uploadFileOnS3 from '../../mixins/uploadFileOnS3.js'
import modal from '../../common/Modal.vue'
import InMemoryPreviewImageVideo from '../common/InMemoryPreviewImageVideo.vue'

export default {
  name: 'InMemoryLoadAndPreviewFiles',
  mixins: [imageCheck, uploadFileOnS3],
  props: [
    'id',
    'upload_button_height',
    'seleted_image_height',
    'is_logo_image',
    'is_object_fit_contain',
    'upload_button_text',
    'total_number_of_files',
    'selected_files'
  ],
  components: {
    modal,
    InMemoryPreviewImageVideo
  },
  data() {
    return {
      imageTypes: appConstants.ACCEPT_IMAGE_TYPE,

      showUploadImageError: false,
      UploadImageError: '',
      seleted_image_styleObject: {
        height: `${this.seleted_image_height}px `
      },
      upload_button_styleObject: {
        height: `${this.upload_button_height}px `
      },
      uploaded_files: [],
      showUploadButton: true,

      upload_file_attribute: {
        multiple: 'multiple'
      }
    }
  },

  methods: {
    getIDandRef() {
      return `companyLogo_${this.id}`
    },
    getToPreviewImage(count) {
      return `Preview_Image_${count}`
    },
    uploadImageClick() {
      document.getElementById(this.getIDandRef()).click()
    },
    async previewLogo() {
      let total_selected_file =
        this.uploaded_files.length + this.$refs[this.getIDandRef()].files.length
      let remaing_file_count =
        this.total_number_of_files - this.uploaded_files.length

      if (total_selected_file > this.total_number_of_files) {
        this.UploadImageError = `You can only upload ${remaing_file_count} files`
        this.showUploadImageError = true
        return
      }

      var max_size = appConstants.imageLogoSize.MAX_SIZE
      var max_width = appConstants.imageLogoSize.MAX_WIDTH
      var max_height = appConstants.imageLogoSize.MAX_HEIGHT

      if (this.is_logo_image) {
        max_size = appConstants.imageSize.MAX_SIZE
        max_width = appConstants.imageSize.MAX_WIDTH
        max_height = appConstants.imageSize.MAX_HEIGHT
      }

      let selected_files = this.$refs[this.getIDandRef()].files
      let invalid_image = 0

      for (let i = 0; i < selected_files.length; i++) {
        let file = this.$refs[this.getIDandRef()].files[i]
        if (!file) {
          continue
        }

        if (this.isFileVideo(file)) {
          this.uploaded_files.push(file)
        }

        if (this.isFileImage(file)) {
          await this.checkIsImageValid(
            appConstants.ACCEPT_IMAGE_TYPE,
            max_size,
            max_width,
            max_height,
            file
          ).then((result) => {
            if (result.isValidImage) {
              this.uploaded_files.push(file)
            } else {
              invalid_image++
            }
          })
        }
      }

      if (invalid_image > 0) {
        var validationRules = this.getAllImageValidationRule(
          appConstants.ACCEPT_IMAGE_TYPE,
          max_size,
          max_width,
          max_height
        )
        var message = `${invalid_image} out of ${selected_files.length} files could not be uploaded.`
        this.UploadImageError = `${message}\n${validationRules}`
        this.showUploadImageError = true
      }

      this.setVisibilityofUploadButton()
      this.emitFileChangedEvent()
    },
    removeLogo(index) {
      this.uploaded_files.splice(index, 1)
      this.setVisibilityofUploadButton()
      this.emitFileChangedEvent()
    },
    getObjectFitClass() {
      if (this.is_object_fit_contain == 'true') {
        return 'is_object_fit_contain'
      }
    },
    getURL(file) {
      return URL.createObjectURL(file)
    },

    isFileImage(file) {
      return file && file['type'].split('/')[0] === 'image'
    },
    isFileVideo(file) {
      return file && file['type'].split('/')[0] === 'video'
    },
    setVisibilityofUploadButton() {
      if (this.uploaded_files.length >= this.total_number_of_files) {
        this.showUploadButton = false
      } else {
        this.showUploadButton = true
      }
    },
    emitFileChangedEvent() {
      if (this.uploaded_files.length > 0) {
        this.$emit('inMemoryLoadAndPreviewFiles_changed', {
          files: this.uploaded_files
        })
      } else {
        this.$emit('inMemoryLoadAndPreviewFiles_changed', {
          files: []
        })
      }
    }
  },
  created() {
    this.setVisibilityofUploadButton()
    this.uploaded_files = this.selected_files
  }
}
</script>

<style scoped></style>
