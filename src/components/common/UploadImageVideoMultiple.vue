<template>
  <div class="cls_uploadimageAndPreviewMultiple">
    <div class="row" :style="upload_button_styleObject" v-if="showUploadButton">
      <div
        class="col-lg-6 col-md-6 col-12"
        v-if="this.allow_total_number_of_files > 0"
      >
        <input
          :id="getIDandRef()"
          :accept="getAcceptFileType()"
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

    <modal v-if="showMessage" @closeModal="showMessage = false">
      <div slot="body">{{ this.messageText }}</div>
    </modal>

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
import videoCheck from '../../mixins/videoCheck.js'
import uploadFileOnS3 from '../../mixins/uploadFileOnS3.js'
import modal from '../../common/Modal.vue'

export default {
  name: 'UploadImageVideoMultiple',
  mixins: [imageCheck, videoCheck, uploadFileOnS3],
  props: [
    'id',
    'upload_button_height',
    'is_logo_image',
    'is_object_fit_contain',
    'upload_button_text',
    'allow_total_number_of_files',
    'save_image_path_value',
    'save_video_path_value'
  ],
  components: {
    modal
  },
  data() {
    return {
      imageTypes: appConstants.ACCEPT_IMAGE_TYPE,
      videoTypes: appConstants.ACCEPT_VIDEO_TYPE,

      showUploadImageError: false,
      UploadImageError: '',

      upload_button_styleObject: {
        height: `${this.upload_button_height}px `
      },
      uploaded_files: [],
      showUploadButton: true,

      upload_file_attribute: {
        multiple: 'multiple'
      },

      showMessage: false,
      messageText: ''
    }
  },

  methods: {
    getAcceptFileType() {
      let types = `${this.imageTypes},${this.videoTypes}`
      return types
    },
    getIDandRef() {
      return `uploadMultiple_${this.id}`
    },

    uploadImageClick() {
      document.getElementById(this.getIDandRef()).click()
    },
    async previewLogo() {
      let loader = this.$loading.show({})

      if (
        this.$refs[this.getIDandRef()].files.length >
        this.allow_total_number_of_files
      ) {
        this.UploadImageError = `You can only select ${this.allow_total_number_of_files} files`
        this.showUploadImageError = true
        loader.hide()
        return
      }

      let selected_files = this.$refs[this.getIDandRef()].files
      let invalid_image = 0
      let valid_files_list = []

      var max_size = appConstants.imageLogoSize.MAX_SIZE
      var max_width = appConstants.imageLogoSize.MAX_WIDTH
      var max_height = appConstants.imageLogoSize.MAX_HEIGHT

      if (this.is_logo_image) {
        max_size = appConstants.imageSize.MAX_SIZE
        max_width = appConstants.imageSize.MAX_WIDTH
        max_height = appConstants.imageSize.MAX_HEIGHT
      }

      for (let i = 0; i < selected_files.length; i++) {
        let file = this.$refs[this.getIDandRef()].files[i]
        if (!file) {
          continue
        }

        if (this.isFileVideo(file)) {
          await this.checkIsVideoValidGetHW(
            appConstants.ACCEPT_VIDEO_TYPE,
            file
          ).then((result) => {
            if (result.isValidVideo) {
              valid_files_list.push({
                file: file,
                validResult: result,
                is_video: true
              })
            } else {
              invalid_image++
            }
          })
        }

        if (this.isFileImage(file)) {
          await this.checkIsImageValidAndGetHW(
            appConstants.ACCEPT_IMAGE_TYPE,
            max_size,
            max_width,
            max_height,
            file
          ).then((result) => {
            if (result.isValidImage) {
              valid_files_list.push({
                file: file,
                validResult: result,
                is_video: false
              })
            } else {
              invalid_image++
            }
          })
        }
      }

      for (let j = 0; j < valid_files_list.length; j++) {
        let file_to_upload = valid_files_list[j]

        if (file_to_upload.is_video) {
          await this.s3VideoUpload(
            file_to_upload.file,
            this.save_video_path_value,
            file_to_upload.validResult
          )
        } else {
          await this.s3FileUpload(
            file_to_upload.file,
            this.save_image_path_value,
            file_to_upload.validResult
          )
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

      loader.hide()
      this.emitFileChangedEvent()

      this.$refs[this.getIDandRef()].value = null
      this.uploaded_files = []
    },

    async s3FileUpload(file_to_upload, path_to_save_file, image_Data) {
      if (file_to_upload) {
        let imgExt = file_to_upload.name.substr(
          file_to_upload.name.lastIndexOf('.')
        )
        let fileName = this.$uuid.v1() + imgExt
        let loader = this.$loading.show({})
        await this.uploadFileOnS3(
          fileName,
          path_to_save_file,
          file_to_upload,
          appConstants.IMAGE_CONTENT_TYPE
        )
          .then((data) => {
            var media = {
              name: data.savedFileName,
              mediaType: appConstants.media_Type.IMAGE,
              cover_image: '',
              contentSize: image_Data.size,
              width: image_Data.width,
              height: image_Data.height,
              video_duration: 0.0
            }

            this.uploaded_files.push(media)

            loader.hide()
          })
          .catch((err) => {
            this.UploadImageError = err
            this.showUploadImageError = true
            loader.hide()
          })
      }
    },
    async s3VideoUpload(file_to_upload, path_to_save_file, video_Data) {
      if (file_to_upload) {
        let imgExt = file_to_upload.name.substr(
          file_to_upload.name.lastIndexOf('.')
        )
        let fileName = this.$uuid.v1() + imgExt
        let loader = this.$loading.show({})
        await this.uploadFileOnS3(
          fileName,
          path_to_save_file,
          file_to_upload,
          appConstants.VIDEO_CONTENT_TYPE
        )
          .then((data) => {
            var media = {
              name: data.savedFileName,
              mediaType: appConstants.media_Type.VIDEO,
              cover_image: '',
              contentSize: video_Data.size,
              width: video_Data.width,
              height: video_Data.height,
              video_duration: video_Data.duration
            }

            this.uploaded_files.push(media)

            loader.hide()
          })
          .catch((err) => {
            this.UploadImageError = err
            this.showUploadImageError = true
            loader.hide()
          })
      }
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

    emitFileChangedEvent() {
      if (this.uploaded_files.length > 0) {
        this.$emit('UploadMultipleFile_changed', {
          files: this.uploaded_files
        })
      } else {
        this.$emit('UploadMultipleFile_changed', {
          files: []
        })
      }
    }
  },
  created() {}
}
</script>

<style scoped></style>
