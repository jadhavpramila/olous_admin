<template>
  <div class="cls_InMemoryPreviewImageThenUpload">
    <div class="d-flex flex-row justify-content-center">
      <div style="width: 200px">
        <InMemoryLoadAndPreviewSingleFile
          ref="ref_InMemoryLoadAndPreviewSingleFile"
          id="1"
          upload_button_height="200"
          seleted_image_height="200"
          is_logo_image="false"
          is_object_fit_contain="false"
          :upload_button_text="upload_button_text"
          :file_type="file_type"
          :save_image_path_value="save_image_path_value"
          @media_uploaded="mediaUploadedToS3"
          @inMemoryFile_changed="file_changed"
        ></InMemoryLoadAndPreviewSingleFile>

        <div v-if="showImageRequired" class="mt-4">
          <div
            v-if="file_type == file_type_enum.IMAGE"
            class="fontSize12 validation-msg-color"
          >
            Please upload image
          </div>
          <div
            v-if="file_type == file_type_enum.VIDEO"
            class="fontSize12 validation-msg-color"
          >
            Please upload video
          </div>
        </div>
      </div>
      <div class="d-flex flex-column justify-content-center ml-5">
        <span class="btn" @click="btnSaveClick">Save</span>
        <span class="btn mt-5" @click="btnCancelClick">Cancel</span>
      </div>
    </div>
  </div>
</template>

<script>
import appConstants from '../../appConstants.js'
import InMemoryLoadAndPreviewSingleFile from './InMemoryLoadAndPreviewSingleFile.vue'

export default {
  //First preview image from in memory then on upload/save button click save on s3 and return URL
  name: 'InMemoryPreviewImageThenUpload',
  props: ['id', 'upload_button_text', 'file_type', 'save_image_path_value'],
  components: {
    InMemoryLoadAndPreviewSingleFile
  },
  data() {
    return {
      file_type_enum: appConstants.upload_file_type,
      showImageRequired: false,
      checkValidation: false
    }
  },

  methods: {
    btnSaveClick() {
      this.checkIsFileUploaded()

      this.$refs['ref_InMemoryLoadAndPreviewSingleFile'].btnUploadFile()
    },
    btnCancelClick() {
      this.$emit('cancel_media_uploaded')
    },
    mediaUploadedToS3(media_obj) {
      this.$emit('mediaUploadedToS3', media_obj)
    },
    checkIsFileUploaded() {
      this.checkValidation = true
      let isFileRequired = this.$refs[
        'ref_InMemoryLoadAndPreviewSingleFile'
      ].isFileUploaded()

      if (isFileRequired) {
        this.showImageRequired = false
      } else {
        this.showImageRequired = true
      }
    },
    file_changed(value) {
      if (this.checkValidation) {
        if (value.file_count > 0) {
          this.showImageRequired = false
        } else {
          this.showImageRequired = true
        }
      }
    }
  },
  created() {}
}
</script>

<style scoped>
#upload_files {
  background-color: rgb(0, 151, 153, 0.05) !important;
  border: solid 1px #d1e2ea;
}

.upload-text {
  color: #000000 !important;
}

.validation-msg-color {
  color: #dc3545;
}
</style>
