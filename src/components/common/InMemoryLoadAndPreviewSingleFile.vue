<template>
  <div class="cls_uploadimageAndPreviewMultiple">
    <div class="row" :style="upload_button_styleObject" v-if="showUploadButton">
      <div class="col-12">
        <input
          :id="getIDandRef()"
          :accept="getAcceptableFileType()"
          :ref="getIDandRef()"
          @change="previewLogo"
          type="file"
          style="display: none"
        />
        <div
          id="upload_files"
          class="cursor-pointer d-flex flex-column"
          style="display: flex; align-items: center; justify-content: center"
          @click="uploadImageClick()"
        >
          <img src="../../assets/img/Upload.svg" />
          <label class="upload-text cursor-pointer mt-2">{{
            upload_button_text
          }}</label>
        </div>
      </div>
    </div>
    <div class="row">
      <div
        class="col-12"
        v-for="(file_obj, counter) in uploaded_files"
        :key="counter"
      >
        <InMemoryPreviewImageVideo
          :id="getToPreviewImage(counter)"
          :component_height="seleted_image_height"
          :is_object_fit_contain="is_object_fit_contain"
          :fileObject="file_obj.file"
          @preview_uploadedImagePassURL_Removed="removeLogo(counter)"
        ></InMemoryPreviewImageVideo>
      </div>
    </div>

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
import videoCheck from '../../mixins/videoCheck'
import uploadFileOnS3 from '../../mixins/uploadFileOnS3.js'
import modal from '../../common/Modal.vue'
import InMemoryPreviewImageVideo from '../common/InMemoryPreviewImageVideo.vue'

export default {
  name: 'InMemoryLoadAndPreviewSingleFile',
  mixins: [imageCheck, uploadFileOnS3, videoCheck],
  props: [
    'id',
    'upload_button_height',
    'seleted_image_height',
    'is_logo_image',
    'is_object_fit_contain',
    'upload_button_text',
    'file_type',
    'save_image_path_value',
    'zip_max_size'
  ],
  components: {
    modal,
    InMemoryPreviewImageVideo
  },
  emits: ['inMemoryFile_changed', 'media_uploaded'],

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

      total_number_of_files: 1,

      max_zip_file: 78643200
      //max_zip_file: 15728640 = 15MB 100 MB = 104857600 Bytes 100MB  78643200 Bytes -= 75 MB takes line time
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
      var max_size = appConstants.imageLogoSize.MAX_SIZE
      var max_width = appConstants.imageLogoSize.MAX_WIDTH
      var max_height = appConstants.imageLogoSize.MAX_HEIGHT

      if (this.is_logo_image) {
        max_size = appConstants.imageSize.MAX_SIZE
        max_width = appConstants.imageSize.MAX_WIDTH
        max_height = appConstants.imageSize.MAX_HEIGHT
      }

      let selected_files = this.$refs[this.getIDandRef()].files

      for (let i = 0; i < selected_files.length; i++) {
        let file = this.$refs[this.getIDandRef()].files[i]
        //console.log(file)

        if (!file) {
          continue
        }

        if (this.file_type == appConstants.upload_file_type.ZIP) {
          console.log('file type')
          console.log(file.type)
          let isZipFile = this.isFileZip(file)
          if (isZipFile) {
            // check file size
            if (file.size > this.max_zip_file) {
              // this.UploadImageError = `File size ${file.size}`
              // this.showUploadImageError = true

              this.UploadImageError = 'zip File size must be less than 75MB'
              this.showUploadImageError = true
              this.$refs[this.getIDandRef()].value = null
              return
            }

            let data = {
              file: file,
              media_height: '',
              media_width: '',
              duration: ''
            }

            this.uploaded_files.push(data)
            continue
          } else {
            this.UploadImageError = 'Please select .zip file'
            this.showUploadImageError = true
            this.$refs[this.getIDandRef()].value = null
          }
        }

        if (this.file_type == appConstants.upload_file_type.IMAGE) {
          await this.checkIsImageValidAndGetHW(
            appConstants.ACCEPT_IMAGE_TYPE,
            max_size,
            max_width,
            max_height,
            file
          ).then((result) => {
            if (result.isValidImage) {
              let data = {
                file: file,
                media_height: result.height,
                media_width: result.width,
                duration: 0
              }
              this.uploaded_files.push(data)
            } else {
              this.UploadImageError = result.message
              this.showUploadImageError = true
              this.$refs[this.getIDandRef()].value = null
            }
          })
        }

        if (this.file_type == appConstants.upload_file_type.VIDEO) {
          await this.checkIsVideoValidGetHW(
            appConstants.ACCEPT_VIDEO_TYPE,
            file
          ).then((result) => {
            if (result.isValidVideo) {
              let data = {
                file: file,
                media_height: result.height,
                media_width: result.width,
                duration: result.duration
              }
              this.uploaded_files.push(data)
            } else {
              this.UploadImageError = result.message
              this.showUploadImageError = true
              this.$refs[this.getIDandRef()].value = null
            }
          })

          // if (this.isFileVideo(file)) {
          //   let data = {
          //     file: file,
          //     media_height: result.media_height,
          //     media_width: result.media_width
          //   }
          //   this.uploaded_files.push(file)
          // } else {
          //   this.UploadImageError = 'Please select video file'
          //   this.showUploadImageError = true
          // }
        }
      }

      this.setVisibilityofUploadButton()
      this.emitFileChangedEvent()
    },
    removeLogo(index) {
      this.uploaded_files.splice(index, 1)
      this.setVisibilityofUploadButton()
      this.emitFileChangedEvent()
    },
    // getObjectFitClass() {
    //   if (this.is_object_fit_contain == 'true') {
    //     return 'is_object_fit_contain'
    //   }
    // },
    checkFileTypeIsZip(selectedImageName) {
      var result = false
      var imageExtension = selectedImageName.split('.').pop() //get image extension
      var imageTypeArray = ['zip'] //from .png,.jpg,.jpeg make an array ["png", "jpg",..]
      var imageType
      for (imageType in imageTypeArray) {
        if (
          imageExtension.toLowerCase() ==
          `${imageTypeArray[imageType]}`.toLowerCase()
        ) {
          result = true
        }
      }
      return result
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

    isFileZip(file) {
      if (file && appConstants.ZIP_CONTENT_TYPE.includes(file['type'])) {
        return true
      }

      let imgExt = file['name'].substr(file['name'].lastIndexOf('.'))
      let zip_extension = appConstants.ACCEPT_ZIP_TYPE.split(',')

      for (let i = 0; i < zip_extension.length; i++) {
        if (imgExt == zip_extension[i].trim()) {
          return true
        }
      }

      return false
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
        this.$emit('inMemoryFile_changed', {
          file_count: this.uploaded_files.length
        })
      } else {
        this.$emit('inMemoryFile_changed', {
          file_count: 0
        })
      }
    },
    emitUploadedImageChangeEvent(file_obj) {
      this.$emit('media_uploaded', file_obj)
    },
    getAcceptableFileType() {
      if (this.file_type == appConstants.upload_file_type.IMAGE) {
        return appConstants.ACCEPT_IMAGE_TYPE
      }

      if (this.file_type == appConstants.upload_file_type.VIDEO) {
        return appConstants.ACCEPT_VIDEO_TYPE
      }

      if (this.file_type == appConstants.upload_file_type.ZIP) {
        return appConstants.ACCEPT_ZIP_TYPE
      }
    },
    btnUploadFile() {
      for (let i = 0; i < this.uploaded_files.length; i++) {
        let file = this.uploaded_files[i]
        if (!file) {
          continue
        }

        this.s3UploadFile(file)
      }
    },
    s3UploadFile(file_obj) {
      let logoFile = file_obj.file
      if (logoFile) {
        let imgExt = logoFile.name.substr(logoFile.name.lastIndexOf('.'))
        let fileName = this.$uuid.v1() + imgExt
        let loader = this.$loading.show({})

        // let content_type = appConstants.IMAGE_CONTENT_TYPE

        // if (this.isFileVideo(logoFile)) {
        //   content_type = appConstants.VIDEO_CONTENT_TYPE
        // } else if (this.isFileZip(logoFile)) {
        //   content_type = appConstants.ZIP_CONTENT_TYPE
        // }

        this.uploadFileOnS3(fileName, this.save_image_path_value, logoFile, '')
          .then((data) => {
            // this.company_logo = data.savedFileName

            let obj = {
              height: file_obj.media_height,
              width: file_obj.media_width,
              image_name: data.savedFileName,
              full_URL: data.serverFilePath,
              duration: file_obj.duration
            }

            this.isLoading = false
            loader.hide()

            this.emitUploadedImageChangeEvent(obj)
          })
          .catch((err) => {
            this.UploadImageError = err
            this.showUploadImageError = true
            this.isLoading = false
            loader.hide()
          })
      }
    },
    isFileUploaded() {
      if (this.uploaded_files.length > 0) {
        return true
      } else {
        return false
      }
    }
  },
  created() {
    this.setVisibilityofUploadButton()
  }
}
</script>

<style scoped>
#upload_files {
  background-color: rgb(0, 151, 153, 0.05) !important;
  border: solid 1px #d1e2ea;
}

.upload-text {
  font-size: 13px !important;
  color: #000000 !important;
}
</style>
