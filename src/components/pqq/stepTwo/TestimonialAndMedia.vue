<template>
  <div class="mt-4 pt-4">
    <div class="form-conatiner">
      <div class="page-title mt-4"><h4>Testimonials and media</h4></div>
      <div class="page-body">
        <!-- top buttons here  -->
        <div>
          <button
            class="btn btn-light rounded mr-4 col-2"
            @click="testmonialClicked"
            :class="{
              'btn-dark': isTestimonial
            }"
          >
            Testimonials
          </button>
          <button
            class="btn btn-light rounded mr-4 col-2"
            @click="ClientsLogoClicked"
            :class="{
              'btn-dark': isClientsLogo
            }"
          >
            Client Logo
          </button>
          <button
            class="btn btn-light rounded mr-4 col-2"
            @click="mediaClicked"
            :class="{
              'btn-dark': isMedia
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
import Testimonial from './testimonial/Testimonial.vue'
import ClientsLogo from './testimonial/ClientsLogo.vue'
import Media from './testimonial/Media.vue'

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
