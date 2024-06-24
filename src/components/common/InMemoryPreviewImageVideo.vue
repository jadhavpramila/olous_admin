<template>
  <div class="cls_uploadimage">
    <div class="" :style="styleObject">
      <div class="logo-preview">
        <img
          @click="removeImage"
          class="remove-logo"
          src="../../assets/img/Close.svg"
          title="Delete"
        />
        <img
          v-if="isFileImage(fileObject)"
          :src="getURL(fileObject)"
          :style="styleObject"
          class="img-preview logo-image"
          :class="getObjectFitClass()"
        />
        <video
          v-else-if="isFileVideo(fileObject)"
          width="100%"
          height="100%"
          controls
          class="img-preview logo-image"
        >
          <source :src="getURL(fileObject)" />
          Your browser does not support HTML5 video.
        </video>

        <div v-else>
          <div>
            <img
              src="../../assets/img/ZIP-small-icon.svg"
              style="width: 40px; margin-right: 10px"
            />{{ fileObject.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import appConstants from '../../appConstants.js'

export default {
  name: 'InMemoryPreviewImageVideo', //Preview Image from S3 //InMemoryPreviewImageVideo is same just it shows file from uploaded file
  props: ['id', 'component_height', 'is_object_fit_contain', 'fileObject'],
  data() {
    return {
      imageTypes: appConstants.ACCEPT_IMAGE_TYPE,

      styleObject: {
        height: `${this.component_height}px `
      }
    }
  },
  watch: {
    image_name_value: function (val) {
      this.setFullURL(val)
    }
  },
  methods: {
    removeImage() {
      this.$emit('preview_uploadedImagePassURL_Removed')
    },
    getURL() {
      return URL.createObjectURL(this.fileObject)
    },
    isFileImage() {
      return (
        this.fileObject && this.fileObject['type'].split('/')[0] === 'image'
      )
    },
    isFileVideo(file) {
      return file && file['type'].split('/')[0] === 'video'
    },
    getObjectFitClass() {
      if (this.is_object_fit_contain == 'true') {
        return 'is_object_fit_contain'
      }
    }
  },
  created() {}
}
</script>

<style scoped></style>
