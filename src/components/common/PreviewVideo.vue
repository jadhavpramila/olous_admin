<template>
  <div class="cls_uploadimage">
    <div class="" :style="styleObject">
      <div v-if="company_logoSrc" class="logo-preview">
        <img
          v-if="company_logoSrc"
          @click="removeLogo"
          class="remove-logo"
          src="../../assets/img/Close.svg"
          title="close image"
        />
        <video
          v-if="company_logoSrc"
          width="100%"
          height="100%"
          controls
          :class="getObjectFitClass()"
          class="img-preview logo-image"
        >
          <source :src="company_logoSrc" />
          Your browser does not support HTML5 video.
        </video>
      </div>
    </div>
  </div>
</template>

<script>
import appConstants from '../../appConstants.js'

export default {
  name: 'PreviewVideo', //Preview Image from S3
  props: [
    'id',
    'component_height',
    'read_image_path_value',
    'image_name_value',
    'is_object_fit_contain'
  ],
  data() {
    return {
      company_logo: '',
      company_logoSrc: '',

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
    removeLogo() {
      this.company_logoSrc = ''
      this.company_logo = ''
      this.emitUploadedImageChangeEvent()
    },
    emitUploadedImageChangeEvent() {
      this.$emit('preview_uploadedImage_Removed')
    },
    getObjectFitClass() {
      if (this.is_object_fit_contain == 'true') {
        return 'is_object_fit_contain'
      }
    },
    setFullURL(imageName) {
      if (imageName == '' || imageName == null) {
        this.company_logo = ''
        this.company_logoSrc = ''
      } else {
        this.company_logo = imageName
        this.company_logoSrc = `${this.read_image_path_value}${imageName}`
      }

      if (imageName.trim() == '') {
        this.styleObject.height = '0px'
      } else {
        this.styleObject.height = `${this.component_height}px `
      }
    }
  },
  created() {
    this.setFullURL(this.image_name_value)
  }
}
</script>

<style scoped></style>
