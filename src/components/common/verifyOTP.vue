<template>
  <div class="d-flex flex-column align-items-center mb-6">
    <div class="d-flex flex-column align-items-center w-100">
      <h5 class="form-title app-secondary-text-color">Verification OTP</h5>
      <div class="mt-3 w-100">
        <div class="d-flex flex-column mt-3">
          <div class="d-flex space-x-2">
            <!-- otp -->
            <input
              type="text"
              v-model="otp"
              placeholder="Enter OTP"
              class="text-center p-1 w-full bg-white text-gray-700 focus:outline-none form-control"
              v-on:keyup="isEnterClicked($event)"
            />
          </div>
          <div class="grid grid-cols-5">
            <div class="text-danger fontSize14 col-span-3">
              <span v-if="error">{{ error }}</span>
            </div>
            <div class="text-right col-span-2">
              <span>
                <OTPtimer
                  :showTimer="startTimer"
                  @otpTimer_resendOTP="resendOTP()"
                />
              </span>
            </div>
          </div>
          <div class="d-flex justify-content-center mt-5">
            <button @click="submit()" class="btn w-100">
              Verify OTP
              <!-- <span
              class="app-primary-text-color align-items-center border btn btn-cursor d-flex justify-content-center"
              >Verify OTP</span
            > -->
            </button>
          </div>
        </div>
        <div class="mt-5" v-if="showInfoText">
          <p class="text-xs text-center text-gray-400">
            Please note that your firewall may block OTP email for company email
            address
            <!-- {{ startTimer }} -->
          </p>
        </div>
        <!-- <span v-if="error" class="mt-4 text-red-400">
          <small>{{ error }}</small>
        </span> -->
      </div>
    </div>
  </div>
</template>

<script>
import OTPtimer from './OTPtimer.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'verifyOTP',
  props: {
    error: String,
    startTimer: Boolean,
    showInfoText: {
      type: Boolean,
      default: true
    }
  },
  components: {
    OTPtimer
  },
  computed: {
    ...mapGetters('login', ['getter_error'])
  },
  data() {
    return {
      otp: '',
      showTimer: true
    }
  },
  methods: {
    isEnterClicked(e) {
      if (e.keyCode === 13) {
        this.submit()
      }
    },
    submit() {
      //   console.log(this.otp);
      this.$emit('verify_OTP_button_click', this.otp)
    },
    resendOTP() {
      this.$emit('otpTimer_resendOTP')
    }
  }
}
</script>

<style>
.form-title {
  font-size: 35px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: normal;
  text-align: left;
}
</style>
