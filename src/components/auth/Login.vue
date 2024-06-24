<template>
  <div class="cls-login login-max-width">
    <div class="container">
      <div class="row justify-content-between align-items-start">
        <div class="col-lg-6 pl-md-0 login-margin-top">
          <div
            class="video-container d-flex flex-column justify-content-between mt-5"
          >
            <span class="hello-text"
              >Hello <br />
              World!!</span
            >
            <div class="d-flex flex-column">
              <span class="login-text">Welcome to</span>
              <span class="sub-title"
                >Top Digital Platform For Construction & Real Estate
                Industry</span
              >
            </div>

            <span class="login-text"
              >It Is One Stop Platform For <br />
              Jobs, Network, Business & Learning</span
            >
            <!-- <p class="pt-md-3 fontSize30 font-weight-500 text-left">
              Olous makes your business accessible amongst your very own Design,
              Construction & Real Estate community
            </p>

            <div class="d-flex align-items-center">
              <div class="form-inputs login">
                <span class="login-desc-max-width fontSize20 font-weight-700">
                  Do your Clients really know you?
                </span>
                <div class="highlight-text d-flex flex-column color_white mt-2">
                  <span class="login-info"> Be seen! </span>
                  <span class="login-info"> Be known! </span>
                  <span class="login-info"> Become accessible! </span>
                  <span class="login-info"> Become a brand! </span>
                  <span class="login-info"> Grow your Business! </span>
                </div>
              </div>
            </div> -->
            <div class="d-flex flex-row mt-4">
              <a href="https://www.facebook.com/OlousApp" class="mr-2"
                ><img src="../../assets/img/Login-Facebook.svg" alt="facebook"
              /></a>
              <a href="https://www.instagram.com/olous_app/" class="mr-2"
                ><img
                  src="../../assets/img/Login-Instagram.svg"
                  alt="Instagram"
              /></a>
              <a href="https://www.linkedin.com/company/olous-app" class="mr-2"
                ><img src="../../assets/img/Login-Linkdine.svg" alt="Linkedin"
              /></a>
              <!-- <a href="https://twitter.com/app_olous" class="mr-2"
                ><img src="../../assets/img/Login-Twitter.svg" alt="Twitter"
              /></a> -->
              <a href="https://www.youtube.com/channel/UC0I96ZlTBPYAjoq_da4XzDQ"
                ><img src="../../assets/img/Login-Youtube.svg" alt="Youtube"
              /></a>
            </div>
          </div>
        </div>
        <div class="col-lg-6 login-margin-top mt-5">
          <div class="d-flex" style="align-items: flex-start">
            <img src="../../assets/img/Olous.svg" class="w-Logo" alt="Olous" />
            <p class="login-logo-name app-primary-text-color">Olous</p>
          </div>
          <div class="mt-4">
            <div class="">
              <span class="sub-title app-secondary-text-color">Sign in</span>
            </div>
            <div class="inpute-div">
              <form class="form-login pb-0" @submit.prevent="authenticateUser">
                <div class="form-group">
                  <label for="Employee ID" class="app-primary-text-color"
                    >Email Or Phone</label
                  >
                  <input
                    type="Employee ID"
                    id="Employee ID"
                    class="form-control input-maxWidth"
                    placeholder="Email Or Phone"
                    v-model="loginData.emailOrPhone"
                    :class="{
                      'is-invalid':
                        submitted && $v.loginData.emailOrPhone.$invalid
                    }"
                  />
                  <div
                    v-if="submitted && !$v.loginData.emailOrPhone.required"
                    class="invalid-feedback"
                  >
                    Email Or Phone is required
                  </div>
                  <div v-if="usernameError" class="invalid-feedback">
                    Please Enter Email or Phone
                  </div>
                </div>
                <div class="form-group" v-if="!isLoginWithOtp">
                  <label for="password" class="app-primary-text-color"
                    >Password</label
                  >
                  <input
                    type="password"
                    id="passwprd"
                    class="form-control input-maxWidth"
                    placeholder="Password"
                    v-model="loginData.password"
                    :class="{
                      'is-invalid': submitted && $v.loginData.password.$invalid
                    }"
                  />
                  <div
                    v-if="submitted && !$v.loginData.password.required"
                    class="invalid-feedback"
                  >
                    Password is required
                  </div>
                </div>
                <div class="form-group" v-if="isLoginWithOtp">
                  <label for="otp" class="app-primary-text-color">OTP</label>
                  <input
                    placeholder="OTP"
                    v-model="loginData.otp"
                    autocomplete="off"
                    class="form-control"
                    id="txtOTP"
                    :class="{
                      'is-invalid': submitted && $v.loginData.otp.$invalid
                    }"
                  />
                  <div
                    class="invalid-feedback"
                    v-if="submitted && !$v.loginData.otp.required"
                  >
                    Please Enter OTP
                  </div>
                </div>
                <div class="form-group mt-5 mb-4">
                  <label class="checkbox-container fontSize14 font-weight-700"
                    >Login with OTP
                    <input
                      type="checkbox"
                      v-model="isLoginWithOtp"
                      @click="loginWithEmail()"
                      name="code"
                      id="chkLoginWithPW"
                    />
                    <span class="mark"></span>
                  </label>
                  <!-- <input
                    type="checkbox"
                    v-model="isLoginWithOtp"
                    @click="loginWithEmail()"
                    name="code"
                    id="chkLoginWithPW"
                  />
                  <label for="code" class="app-primary-text-color"
                    >Login with OTP</label
                  > -->
                </div>

                <OTPtimer
                  :showTimer="showTimer"
                  @otpTimer_resendOTP="resendOTP()"
                />
                <div class="text-right d-flex my-3">
                  <button
                    class="btn w-100 btn-height-40"
                    :disabled="loginData.emailOrPhone ? false : true"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
                <div
                  class="fontSize14 app-primary-text-color font-weight-500 text-center"
                >
                  Don't have an account?
                  <span
                    class="fontSize14 app-primary-text-color font-weight-700 cursor-pointer"
                    @click="signUp()"
                    >Sign Up</span
                  >
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal
      v-if="showMessageModal"
      @closeModal="showMessageModal = false"
      class="app-primary-text-color"
    >
      <div slot="body">{{ messageToUSer }}</div>
    </modal>
  </div>
</template>

<script>
import { required, requiredIf } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'
import appConstants from '../../appConstants'
import modal from '../../common/Modal'
import OTPtimer from '../../components/common/OTPtimer.vue'

export default {
  name: 'Login',
  components: { modal, OTPtimer },

  validations: {
    loginData: {
      emailOrPhone: {
        required
      },
      password: {
        required: requiredIf(function () {
          return this.isLoginWithOtp == false
        })
      },
      otp: {
        required: requiredIf(function () {
          return this.isLoginWithOtp == true
        })
        // numeric: helpers.withMessage('OTP should be in numeric form', numeric)
      }
    }
  },
  data() {
    return {
      loginData: {
        emailOrPhone: '',
        password: '',
        otp: ''
      },
      submitted: false,
      messageToUSer: '',
      showMessageModal: false,
      isLoginWithOtp: false,
      showTimer: false,
      isLoginWithPassWord: true,
      usernameError: false,
      otpSent: false,
      disabled: true,
      loading: false,
      error: ''
    }
  },
  computed: {
    ...mapGetters(['getter_employeeAccessPermission']),
    ...mapGetters(['allCompanies', 'userData'])
  },
  methods: {
    ...mapActions(['login', 'action_getEmployeeAccessPermission', 'sendOTP']),
    ...mapActions([
      'fetchCompanies',
      'fetchSingleCompanyPreviewDetails',
      'saveCurrentCompanyId'
    ]),
    authenticateUser() {
      this.submitted = true
      if (this.$v.loginData.$invalid) {
        return
      }
      let authData
      if (this.isLoginWithPassWord) {
        //this.passwordError = false
        authData = {
          email: this.loginData.emailOrPhone,
          password: this.loginData.password
        }
      } else {
        authData = {
          email: this.loginData.emailOrPhone,
          otp: this.loginData.otp
        }
      }

      this.login(authData)
        .then(() => {
          this.action_getEmployeeAccessPermission().then(() => {
            this.getUserCompanies()
          })
        })
        .catch((err) => {
          this.messageToUSer = err
          this.showMessageModal = true
        })

      this.submitted = false
    },
    async getUserCompanies() {
      if (
        this.userData.is_admin == undefined ||
        this.userData.is_admin === false
      ) {
        await this.fetchCompanies().then(() => {
          //this.getsingleCompanyData()
          this.$router.push({
            name: appConstants.routes.COMPANY
          })
        })
      } else {
        this.$router.push({
          name: appConstants.routes.ANALYTICS
        })
      }
    },
    // async getsingleCompanyData() {
    //   let company_id = ''
    //   if (this.allCompanies.length > 0) {
    //     company_id = this.allCompanies[0].id
    //     await this.fetchSingleCompanyPreviewDetails(company_id)
    //     this.saveCurrentCompanyId(this.allCompanies[0].id)
    //   } else if (this.userData.company_data.length > 0) {
    //     company_id = this.userData.company_data[0].id
    //     await this.fetchSingleCompanyPreviewDetails(company_id)
    //     this.saveCurrentCompanyId(this.userData.company_data[0].id)
    //   }
    // },
    loginWithEmail() {
      if (this.$v.$invalid) {
        this.$v.loginData.otp.$reset()
      }

      if (this.isLoginWithPassWord) {
        this.isLoginWithPassWord = false
        this.loginData.password = ''
        this.loginData.otp = ''
        this.getOTP()
      } else {
        this.isLoginWithPassWord = true
        this.error = ''
        this.showTimer = false
      }
    },
    getOTP() {
      if (this.loginData.emailOrPhone) {
        this.usernameError = false
        this.loading = true
        this.sendOTP(this.loginData.emailOrPhone)
          .then((res) => {
            this.otpSent = true
            this.showTimer = false
            this.showTimer = true
            this.loading = false
            this.response = res
            this.error = res.data.message
            this.disabled = false
          })
          .catch((res) => {
            this.otpSent = false
            this.loading = false
            this.user = null
            this.messageToUSer = res.data.message
            this.showMessageModal = true
          })
      } else {
        this.usernameError = true
        return false
      }
    },
    // isVerifyOTP(e) {
    //   if (e.keyCode === 13) {
    //     this.verifyOTP()
    //   }
    // },
    signUp() {
      this.$router.push({ name: appConstants.routes.SIGNUP })
    },
    resendOTP() {
      this.showTimer = false
      this.getOTP()
    }
  }
}
</script>

<style scoped>
.w-Logo {
  width: 32px;
}
.btn-height-40 {
  height: 40px;
}
.hello-text {
  font-size: 60px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: left;
}
.login-text {
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.75;
  letter-spacing: normal;
  text-align: left;
}
.sub-title {
  font-size: 35px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: normal;
  text-align: left;
}
/* .form-conatiner {
  margin-top: 0 !important;
} */
</style>
