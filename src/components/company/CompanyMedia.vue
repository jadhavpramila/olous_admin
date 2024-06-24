<template>
  <div class="">
    <div class="">
      <!-- <div class="page-title mt-4"><h4>Testimonials and media</h4></div> -->
      <div class="">
        <!-- top buttons here  -->
        <div class="d-flex">
          <button
            class="media-tab mr-4"
            @click="testmonialClicked"
            :class="{
              'media-tab-active': isTestimonial
            }"
          >
            Testimonials
          </button>
          <button
            class="media-tab mr-4"
            @click="ClientsLogoClicked"
            :class="{
              'media-tab-active': isClientsLogo
            }"
          >
            Client Logo
          </button>
          <button
            class="media-tab mr-4"
            @click="mediaClicked"
            :class="{
              'media-tab-active': isMedia
            }"
          >
            Media
          </button>
        </div>
        <!-- section here  -->
        <div v-if="isTestimonial" class="mt-3">
          <!-- <p>testimonial page load here !!!!</p> -->
          <Testimonial />
        </div>
        <div v-if="isClientsLogo" class="mt-3">
          <!-- <p>ClientsLogo page load here !!!!</p> -->
          <ClientsLogo />
        </div>
        <div v-if="isMedia" class="mt-3">
          <!-- <p>Media page load here !!!!</p> -->
          <Media />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Testimonial from '../../components/pqq/stepTwo/testimonial/Testimonial.vue'
import ClientsLogo from '../../components/pqq/stepTwo/testimonial/ClientsLogo.vue'
import Media from '../../components/pqq/stepTwo/testimonial/Media.vue'

export default {
  name: 'TestimonialsAndMedia',
  components: {
    Testimonial,
    Media,
    ClientsLogo
  },
  data() {
    return {
      isTestimonial: true,
      isMedia: false,
      isClientsLogo: false
    }
  },
  methods: {
    testmonialClicked() {
      this.isTestimonial = true
      this.isMedia = false
      this.isClientsLogo = false
    },
    mediaClicked() {
      this.isTestimonial = false
      this.isMedia = true
      this.isClientsLogo = false
    },
    ClientsLogoClicked() {
      this.isTestimonial = false
      this.isMedia = false
      this.isClientsLogo = true
    }
  }
}
</script>

<style></style>
