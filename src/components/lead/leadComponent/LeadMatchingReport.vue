<template>
  <div>
    <!-- <div class="form-conatiner">{{ application_obj.id }}</div> -->
    <div></div>
    <div v-for="(url_data, index) in image_urls" :key="index" class="ml-1 mr-1">
      <img
        :src="url_data.url"
        :key="url_data.image_name"
        class="pdf_border mb-2 rounded-lg"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeadMatchingReport',
  props: ['application_obj'],
  data() {
    return {
      image_urls: []
    }
  },
  methods: {
    createImageList() {
      let folder_name = this.application_obj.report_images_folder
      let report_images = this.application_obj.report_images
      this.image_urls = []

      if (report_images == undefined) {
        return
      }

      for (let i = 0; i < report_images.length; i++) {
        let url = `${process.env.VUE_APP_LEAD_REPORT}${folder_name}/${report_images[i]}`
        let obj = {
          url: url,
          image_name: report_images[i]
        }
        this.image_urls.push(obj)
      }
    }
  },
  created() {
    this.createImageList()
  }
}
</script>
<style scoped>
.pdf_border {
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px #d8d8d8;
  background-color: var(--white);
}
</style>
