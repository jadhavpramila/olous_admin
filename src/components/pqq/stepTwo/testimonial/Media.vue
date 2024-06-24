<template>
  <div>
    <!-- <div class="page-title">Add more information:</div> -->
    <div class="main-container">
      <div class="main-container-header p-4"></div>
      <div class="main-container-body">
        <div class="form-group row">
          <div class="col-12 col-md-2 pr-0">
            <img
              src="../../../../assets/img/socialMedia/facebook.svg"
              alt="facebook"
            />
            <span for="facebook" class="ml-1 fontSize14 font-weight-500"
              >Facebook</span
            >
          </div>
          <div class="col-12 col-md-8 pl-0">
            <input
              type="text"
              class="col-12 form-control"
              v-model="form_data.facebook_url"
              placeholder="Enter your social media link"
            />
            <div
              v-if="submitted && !$v.form_data.facebook_url.url"
              class="invalid-feedback d-block"
            >
              Enter Valid Facebook Url
            </div>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-12 col-md-2 pr-0">
            <img
              src="../../../../assets/img/socialMedia/Insta.svg"
              alt="instagram"
            />
            <span for="Instagram" class="ml-1 fontSize14 font-weight-500"
              >Instagram</span
            >
          </div>
          <div class="col-12 col-md-8 pl-0">
            <input
              type="text"
              class="col-12 form-control"
              v-model="form_data.instagram_url"
              placeholder="Enter your social media link"
            />
            <div
              v-if="submitted && !$v.form_data.instagram_url.url"
              class="invalid-feedback d-block"
            >
              Enter Valid Instagram Url
            </div>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-12 col-md-2 pr-0">
            <img
              src="../../../../assets/img/socialMedia/Linkdine.svg"
              alt="linkedin"
            />
            <span for="LinkedIn" class="ml-1 fontSize14 font-weight-500"
              >LinkedIn</span
            >
          </div>
          <div class="col-12 col-md-8 pl-0">
            <input
              type="text"
              class="col-12 form-control"
              v-model="form_data.linked_url"
              placeholder="Enter your social media link"
            />
            <div
              v-if="submitted && !$v.form_data.linked_url.url"
              class="invalid-feedback d-block"
            >
              Enter Valid linkeedIn Url
            </div>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-12 col-md-2 pr-0">
            <img
              src="../../../../assets/img/socialMedia/YouTube.svg"
              alt="youtube"
            />
            <span for="YouTube" class="ml-1 fontSize14 font-weight-500"
              >YouTube</span
            >
          </div>
          <div class="col-12 col-md-8 pl-0">
            <input
              type="text"
              class="col-12 form-control"
              v-model="form_data.youtube_url"
              placeholder="Enter your social media link"
            />
            <div
              v-if="submitted && !$v.form_data.youtube_url.url"
              class="invalid-feedback d-block"
            >
              Enter Valid youtube Url
            </div>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-12 col-md-2 pr-0">
            <img
              src="../../../../assets/img/socialMedia/Twitter.svg"
              alt="twitter"
            />
            <span for="Twitter" class="ml-1 fontSize14 font-weight-500"
              >Twitter</span
            >
          </div>
          <div class="col-12 col-md-8 pl-0">
            <input
              type="text"
              class="col-12 form-control"
              v-model="form_data.twitter_url"
              placeholder="Enter your social media link"
            />
            <div
              v-if="submitted && !$v.form_data.twitter_url.url"
              class="invalid-feedback d-block"
            >
              Enter Valid twitter Url
            </div>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-12 col-md-2 pr-0">
            <img
              src="../../../../assets/img/socialMedia/Google.svg"
              alt="googlePlus"
            />
            <span for="google" class="ml-1 fontSize14 font-weight-500"
              >Google+</span
            >
          </div>
          <div class="col-12 col-md-8 pl-0">
            <input
              type="text"
              class="col-12 form-control"
              v-model="form_data.google_url"
              placeholder="Enter your social media link"
            />
            <div
              v-if="submitted && !$v.form_data.google_url.url"
              class="invalid-feedback d-block"
            >
              Enter Valid google Url
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-end" v-if="isNewData()">
          <button class="btn p-3" @click="saveMedia">Save</button>
        </div>
        <div class="d-flex justify-content-end" v-if="!isNewData()">
          <button class="btn p-3" @click="updateMedia">Update</button>
        </div>
      </div>
    </div>

    <modal
      v-if="showTestimonialModal"
      @closeModal="updateTestimonialModalValues([false, ''])"
    >
      <div slot="body">{{ this.modalTestimonialMessage }}</div>
    </modal>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { url } from 'vuelidate/lib/validators'
import modal from '../../../../common/Modal'

export default {
  name: 'Media',
  components: {
    modal
  },
  computed: {
    ...mapGetters('companyData', ['getCurrentCompanyData']),
    ...mapGetters('testiomonial', [
      'getMediaData',
      'showTestimonialModal',
      'modalTestimonialMessage'
    ]),
    ...mapGetters(['getCurrentCompanyId'])
  },
  mounted() {
    this.fetchMediaData(this.getCurrentCompanyId).then(() => {
      this.setMediaData()
    })
  },
  validations() {
    return {
      form_data: {
        // facebook_url: {
        //   url: requiredIf(function () {
        //     return this.form_data.facebook_url
        //   })
        // },
        // google_url: {
        //   url: requiredIf(function () {
        //     return this.form_data.google_url
        //   })
        // },
        facebook_url: { url },
        google_url: { url },
        twitter_url: { url },
        youtube_url: { url },
        instagram_url: { url },
        linked_url: { url }
      }
    }
  },
  data() {
    return {
      submitted: false,
      form_data: {
        company_id: '',
        facebook_url: '',
        google_url: '',
        twitter_url: '',
        youtube_url: '',
        instagram_url: '',
        linked_url: ''
      }
    }
  },
  methods: {
    ...mapActions('testiomonial', [
      'fetchMediaData',
      'saveMediaData',
      'updateMediaData'
    ]),
    ...mapMutations('testiomonial', ['updateTestimonialModalValues']),
    setMediaData() {
      this.form_data = this.getMediaData
    },
    isNewData() {
      if (!this.getMediaData.id) {
        return true
      } else {
        return false
      }
    },
    saveMedia() {
      this.submitted = true
      // this.$v.$touch()
      if (this.$v.form_data.$invalid) {
        return
      }
      this.form_data.company_id = this.getCurrentCompanyId
      this.saveMediaData(this.form_data)
      // .then(() => {
      //   console.log('data saved =>', this.getMediaData)
      // })
    },
    updateMedia() {
      this.submitted = true
      // this.$v.$touch()
      if (this.$v.form_data.$invalid) {
        return
      }
      this.form_data.company_id = this.getCurrentCompanyId
      this.updateMediaData(this.form_data)
      // .then(() => {
      //   console.log('data saved =>', this.getMediaData)
      // })
    }
  }
}
</script>

<style>
input {
  background-color: #f2f2f2;
  border: none;
  border-radius: 5px;
}
</style>
