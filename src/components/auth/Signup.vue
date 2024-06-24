<template>
  <div class="cls-signup cls-login login-max-width">
    <div class="justify-content-between align-items-start container">
      <div class="row">
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
              >It Is One Stop Platform For Jobs, Network, Business &
              Learning</span
            >

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
              <a href="https://www.youtube.com/channel/UC0I96ZlTBPYAjoq_da4XzDQ"
                ><img src="../../assets/img/Login-Youtube.svg" alt="Youtube"
              /></a>
            </div>
          </div>
        </div>
        <div class="col-lg-6 login-margin-top mt-5">
          <div class="d-flex" style="align-items: flex-start">
            <img src="../../assets/img/Olous.svg" class="w-Logo" alt="Olous" />
            <span class="login-logo-name app-primary-text-color">Olous </span>
          </div>

          <div class="signin-forms">
            <div
              v-if="!verified"
              class="d-flex justify-content-between align-items-center mt-4"
            >
              <span class="sub-title app-secondary-text-color">Sign Up</span>
            </div>
            <div v-if="!verified" class="">
              <div v-if="!verified" class="flex flex-col items-center">
                <div class="d-flex flex-column align-items-center">
                  <div class="flex space-x-3 mt-3">
                    <div class="flex flex-col space-4">
                      <div class="row">
                        <div class="d-flex flex-column col-md-6 form-group">
                          <label for="first_name" class="app-primary-text-color"
                            >First Name
                            <span class="text-danger">*</span></label
                          >
                          <input
                            v-model="form_data.first_name"
                            type="text"
                            class="form-control show-placeholder"
                            v-on:keyup="isEnterClicked($event)"
                            :class="{
                              'is-invalid':
                                submitted && $v.form_data.first_name.$invalid
                            }"
                          />
                          <div
                            class="invalid-feedback"
                            v-if="
                              submitted && !$v.form_data.first_name.required
                            "
                          >
                            Please select first name
                          </div>
                        </div>
                        <div class="d-flex flex-column col-md-6 form-group">
                          <label for="last_name" class="app-primary-text-color"
                            >Last Name<span class="text-danger">*</span></label
                          >
                          <input
                            v-model="form_data.last_name"
                            type="text"
                            class="form-control show-placeholder"
                            v-on:keyup="isEnterClicked($event)"
                            :class="{
                              'is-invalid':
                                submitted && $v.form_data.last_name.$invalid
                            }"
                          />
                          <div
                            class="invalid-feedback"
                            v-if="submitted && !$v.form_data.last_name.required"
                          >
                            Please select last name
                          </div>
                        </div>
                      </div>

                      <div class="d-flex" v-if="usePhone">
                        <div class="d-flex flex-column w-100 form-group">
                          <label for="phone" class="app-primary-text-color"
                            >Phone<span class="text-danger">*</span></label
                          >
                          <div class="d-flex w-100">
                            <div class="col-md-2 pl-0 pr-0">
                              <button
                                @click="selectPhoneCode = true"
                                class="text-center p-2 border-radius-right-none form-control bg-[#f2f2f2] border-r rounded-r-lg"
                              >
                                <span
                                  v-if="form_data.country_code == ''"
                                  class="text-[#a2a4af]"
                                  >+91</span
                                >
                                <span v-else>
                                  {{ form_data.country_code }}</span
                                >
                              </button>
                              <div
                                class="invalid-feedback"
                                v-if="
                                  submitted &&
                                  !$v.form_data.country_code.required
                                "
                              >
                                Please select country code
                              </div>
                            </div>
                            <div class="col-md-10 pl-0 pr-0">
                              <input
                                type="phone"
                                ref="phone"
                                v-model="form_data.phone"
                                class="form-control show-placeholder border-left-0 border-radius-left-none"
                                v-on:keyup="isEnterClicked($event)"
                                maxlength="17"
                                :class="{
                                  'is-invalid':
                                    submitted && $v.form_data.phone.$invalid
                                }"
                              />
                              <div
                                class="invalid-feedback"
                                v-if="submitted && !$v.form_data.phone.required"
                              >
                                Please select phone
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="d-flex" v-if="!usePhone">
                        <div class="d-flex flex-column w-100 form-group">
                          <label for="email" class="app-primary-text-color"
                            >Email<span class="text-danger">*</span></label
                          >
                          <input
                            v-model="form_data.email"
                            type="email"
                            class="form-control show-placeholder"
                            v-on:keyup="isEnterClicked($event)"
                            :class="{
                              'is-invalid':
                                submitted && $v.form_data.email.$invalid
                            }"
                          />
                          <div
                            class="invalid-feedback"
                            v-if="submitted && !$v.form_data.email.required"
                          >
                            Please select email
                          </div>
                        </div>
                      </div>

                      <div class="from-group flex-column d-flex">
                        <label for="interest" class="app-primary-text-color"
                          >User Type<span class="text-danger">*</span></label
                        >
                        <v-select
                          v-model="form_data.user_type"
                          :options="getter_userType"
                          :reduce="(option) => option.id"
                          label="name"
                          class="w-full form-control remove-dropdown-icon"
                          :class="{
                            'is-invalid':
                              submitted && $v.form_data.user_type.$invalid
                          }"
                          disabled
                        ></v-select>

                        <div
                          class="invalid-feedback"
                          v-if="submitted && !$v.interest_array.required"
                        >
                          Please select interest
                        </div>
                        <div
                          v-if="submitted && !$v.interest_array.minLength"
                          class="invalid-feedback"
                        >
                          Please select minimum 3 interest
                        </div>
                      </div>
                      <div class="d-flex form-group flex-column">
                        <label for="password" class="app-primary-text-color"
                          >Password<span class="text-danger">*</span></label
                        >
                        <div class="d-flex flex-column w-100">
                          <input
                            v-model="form_data.password1"
                            type="password"
                            class="w-full show-placeholder form-control"
                            @keyup="validtePassword()"
                            :class="{
                              'is-invalid':
                                submitted && $v.form_data.password1.$invalid
                            }"
                          />
                          <div v-if="strongPass" class="invalid-feedback">
                            Please enter strong password.
                          </div>
                          <div
                            class="invalid-feedback"
                            v-if="submitted && !$v.form_data.password1.required"
                          >
                            Please select password
                          </div>
                        </div>
                      </div>
                      <div class="d-flex flex-column form-group">
                        <label
                          for="confirmPassword"
                          class="app-primary-text-color"
                          >Confirm Password<span class="text-danger"
                            >*</span
                          ></label
                        >
                        <input
                          v-model="form_data.password2"
                          type="password"
                          class="w-full show-placeholder form-control"
                          :class="{
                            'is-invalid':
                              submitted && $v.form_data.password2.$invalid
                          }"
                        />
                        <div
                          class="invalid-feedback"
                          v-if="submitted && !$v.form_data.password2.required"
                        >
                          Please select confirm password
                        </div>
                      </div>
                      <span v-if="validatePassword">
                        <p class="font-size-12 mb-2 ml-2 text-red-400">
                          Passwords didn’t match. Try again.
                        </p>
                      </span>
                      <span class="">
                        <p
                          class="font-weight-400 text-black-50 fontSize12 text-center"
                        >
                          The password must be at least 8 characters and contain
                          one special character (!@#$%&*) and one upper case
                          character.
                        </p>
                      </span>
                      <div
                        class="d-flex align-items-center justify-content-center mb-2"
                      >
                        <label
                          class="checkbox-container fontSize12 font-weight-600"
                          >I Agree Terms & Conditions
                          <input
                            type="checkbox"
                            v-model="terms"
                            name="code"
                            id="code"
                            class="scale-125"
                          />
                          <span class="mark"></span>
                        </label>
                        <!-- <input
                              v-model="terms"
                              type="checkbox"
                              name="code"
                              id="code"
                            />
                            <label for="code">
                              <span
                                class="d-flex app-primary-text-color fontSize12 align-items-center"
                              >
                              </span
                            ></label> -->
                        <img
                          src="../../assets/img/Info-Job.svg"
                          alt="info"
                          class="w-6 ml-1 cursor-pointer"
                          @click="clickInfo()"
                        />
                      </div>
                      <div class="d-flex justify-content-center">
                        <button
                          @click="createAccount()"
                          class="mt-3 btn w-100 btn-height-40"
                          :disabled="terms ? false : true"
                        >
                          Create Account
                        </button>
                      </div>

                      <p class="fontSize12 mt-2 text-center">
                        Already have an account?
                        <span @click="signIn()" class="cursor-pointer"
                          ><b>Sign In</b></span
                        >
                      </p>
                    </div>
                  </div>
                  <span
                    class="text-red-400 w-[20rem] text-center"
                    v-if="error"
                    >{{ error }}</span
                  >
                </div>
              </div>
            </div>

            <!-- verify the otp -->
            <div v-if="verified" class="d-flex justify-content-end">
              <span
                class="m-4 cursor-pointer"
                type="submit"
                @click="closeVerifyOTP()"
              >
                <img src="../../assets/img/Close.svg" alt="" />
              </span>
            </div>
            <div v-if="verified" class="signin-forms-inner">
              <verifyOTP
                :error="otpError"
                @verify_OTP_button_click="OTPverify"
                @otpTimer_resendOTP="setOTPToUser"
                :startTimer="startTimer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="selectPhoneCode">
      <b-modal
        hide-footer
        hide-header
        :visible="selectPhoneCode"
        :centered="true"
      >
        <div class="d-block text-left">
          <div class="d-flex flex-column">
            <v-select
              v-model="form_data.country_code"
              label="name"
              :options="filteredCountry[0].data"
              @search="fetchCountryValues"
              @input="onCountrySelected($event)"
              class="form-control remove-dropdown-icon options-on-search-only"
            ></v-select>
          </div>
        </div>
        <div class="d-flex flex-row">
          <b-button
            class="mt-3 btn ml-2"
            variant="outline-dark"
            block
            @click="closePhoneCode"
            >Close</b-button
          >
          <b-button
            class="mt-3 btn"
            variant="outline-dark"
            block
            @click="savePhoneCode"
            >Ok</b-button
          >
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import appConstants from '../../appConstants.js'
import { mapGetters, mapActions } from 'vuex'
import verifyOTP from '../common/verifyOTP.vue'
import {
  required,
  email,
  numeric,
  // eslint-disable-next-line no-unused-vars
  minLength,
  requiredIf,
  maxLength
} from 'vuelidate/lib/validators'

export default {
  name: 'SignUp',
  components: {
    verifyOTP
  },
  data() {
    return {
      showPassword1: false,
      showPassword2: false,
      startTimer: false,
      strongPass: false,
      OTP: '',
      form_data: {
        email: '',
        username: '',
        first_name: '',
        last_name: '',
        interest: '',
        password1: '',
        password2: '',
        city: 'default',
        is_admin: false,
        country_code: '',
        phone: '',
        user_type: 4,
        verified_credentials: [0]
      },
      terms: false,
      verified: false,
      usePhone: false,
      error: '',
      otpError: '',
      validatePassword: false,
      password: '',
      has_minimum_lenth: false,
      has_number: false,
      has_lowercsae: false,
      has_uppercase: false,
      has_special: false,
      interest: '',
      selectPhoneCode: false,
      submitted: false,
      interest_array: []
    }
  },
  validations() {
    return {
      form_data: {
        password1: {
          required
        },
        password2: {
          required
        },
        email: {
          required,
          email
        },
        user_type: {
          required
        },
        phone: {
          required: requiredIf(function () {
            return this.usePhone == true
          }),
          numeric,
          maxLength: maxLength(17)
        },
        country_code: {
          required: requiredIf(function () {
            return this.usePhone == true
          })
        },

        first_name: {
          required
        },
        last_name: {
          required
        }
      }
    }
  },
  watch: {
    interest_array: function (val) {
      if (val.length > 0) {
        this.form_data.interest = val.map((res) => res.id)
      } else {
        this.form_data.interest = []
      }
    }
  },
  computed: {
    ...mapGetters([
      'getter_user',
      'getter_error',
      'getter_verifyPhoneOTP',
      'getter_verifyEmailOTP',
      'getter_optVerified',
      'userData'
    ]),
    ...mapGetters('dropdownValues', [
      'filteredCountry',
      'getInterestOptions',
      'getter_userType'
    ]),
    buttonLabel() {
      return this.showPassword1 ? 'Hide' : 'Show'
    }
  },
  methods: {
    ...mapActions([
      'action_verifyEmailOTP',
      'action_verifyPhoneOTP',
      'action_phoneOTP',
      'action_emailOTP',
      'action_getEmployeeAccessPermission',
      'fetchCompanies'
    ]),
    ...mapActions('dropdownValues', [
      'searchContry',
      'fetchInterestsData',
      'action_fetchUserType'
    ]),
    signIn() {
      let redirectUrl = this.$route.query.callback_url
      if (redirectUrl == appConstants.callback_url.BUSINESS) {
        window.open(`${appConstants.BUSINESS_URL}`, '_self')
      } else {
        this.$router.push({ name: appConstants.routes.LOGIN })
      }
    },
    isEnterClicked(e) {
      if (e.keyCode === 13) {
        this.createAccount()
      }
    },
    removePhone() {
      this.usePhone = !this.usePhone
      this.form_data.phone = ''
      this.form_data.country_code = ''
    },
    removeEmail() {
      this.usePhone = !this.usePhone
      this.form_data.email = ''
    },
    closeVerifyOTP() {
      this.verified = false
    },
    validtePassword() {
      let passw = /^(?=.*[A-Z])(?=.*[!@#$%&*])(?=.{8,})/
      if (this.form_data.password1.match(passw)) {
        this.strongPass = false
        return true
      } else {
        this.strongPass = true
        return false
      }
    },
    OTPverify(value) {
      this.$v.$touch()
      this.otpError = ''
      // console.log("interests =>", this.interest);
      this.form_data.interest = this.interest_array.map(function (element) {
        return element.id
      })
      this.OTP = value
      this.terms = true
      if (this.usePhone) {
        this.form_data.username = this.form_data.phone.concat('@olous.email')
        // console.log("intrest in if =>", this.form_data.interest);
        let verifyData = {
          verifyOTP: {
            country_code: this.form_data.country_code,
            phone: this.form_data.phone,
            otp: this.OTP
          },
          phone_data: {
            is_chat_private: true,
            country_code: this.form_data.country_code,
            username: this.form_data.username,
            phone: this.form_data.phone,
            verified_credentials: [1],
            password1: this.form_data.password1,
            user_type: this.form_data.user_type,
            interests: this.form_data.interest,
            email: this.form_data.username,
            first_name: this.form_data.first_name,
            last_name: this.form_data.last_name,
            password2: this.form_data.password2
          }
        }
        this.action_phoneOTP(verifyData)
          .then(() => {
            //this.$router.push({ name: appConstants.routes.ONBOARD });
            this.redirectToCorrospondingPage()
          })
          .catch((error) => {
            this.otpError = error
          })
      } else {
        // console.log("intrest in else =>", this.form_data.interest);
        let verifyData = {
          verifyOTP: {
            email: this.form_data.email,
            otp: this.OTP
          },
          email_data: {
            is_chat_private: true,
            country_code: '',
            username: this.form_data.email,
            phone: '',
            verified_credentials: [0],
            password1: this.form_data.password1,
            user_type: this.form_data.user_type,
            interests: this.form_data.interest,
            email: this.form_data.email,
            first_name: this.form_data.first_name,
            last_name: this.form_data.last_name,
            password2: this.form_data.password2
          }
        }
        this.action_emailOTP(verifyData)
          .then(() => {
            // console.log("registered successsfully!!");
            this.error = ''
            // this.$router.push({ name: appConstants.routes.ONBOARD });
            this.redirectToCorrospondingPage()
          })
          .catch((error) => {
            this.otpError = error
          })
      }
    },
    createAccount() {
      this.submitted = true
      this.$v.$touch()
      this.otpError = ''
      // console.log(this.v$);
      if (this.$v.$invalid) {
        // console.log("in if ");
        return false
      } else {
        // console.log("in else ");
        if (this.form_data.password1 == this.form_data.password2) {
          this.validatePassword = false
          this.setOTPToUser()
        } else {
          this.validatePassword = true
          this.form_data.password2 = ''
          this.$refs.password2.focus()
        }
      }
    },
    setOTPToUser() {
      this.terms = true
      if (this.usePhone) {
        let phoneData = {
          first_name: this.form_data.first_name,
          country_code: this.form_data.country_code,
          last_name: this.form_data.last_name,
          otp_type: '3',
          phone: this.form_data.phone,
          email: ''
        }
        this.startTimer = false
        this.action_verifyPhoneOTP(phoneData)
          .then(() => {
            this.startTimer = false
            this.startTimer = true
            this.verified = true
          })
          .catch((error) => {
            this.error = error
          })
      } else {
        let emailData = {
          country_code: '',
          last_name: this.form_data.last_name,
          phone: '',
          first_name: this.form_data.first_name,
          email: this.form_data.email
        }
        this.startTimer = false
        this.action_verifyEmailOTP(emailData)
          .then(() => {
            this.startTimer = false
            this.startTimer = true
            this.verified = true
          })
          .catch((error) => {
            this.error = error
          })
      }
    },
    clickClose() {
      // this.$router.push({ name: appConstants.routes.HOME });
      this.otpSent = false
      this.$router.push({ name: appConstants.routes.LOGIN })
    },
    clickInfo() {
      let route = this.$router.resolve({ name: appConstants.routes.TERMS })
      window.open(route.href, '_blank')
    },
    redirectToCorrospondingPage() {
      this.action_getEmployeeAccessPermission().then(() => {
        this.getUserCompanies()
        //console.log(this.getter_employeeAccessPermission)
      })
    },
    getUserCompanies() {
      if (
        this.userData.is_admin == undefined ||
        this.userData.is_admin === false
      ) {
        this.fetchCompanies().then(() => {
          this.$router.push({
            name: appConstants.routes.COMPANY
          })
        })
      } else {
        this.$router.push({
          name: appConstants.routes.DASHBOARD
        })
      }
    },
    closePhoneCode() {
      //console.log('closed')
      this.selectPhoneCode = false
    },
    savePhoneCode(value) {
      this.form_data.country_code = value
      this.selectPhoneCode = false
    },
    fetchCountryValues(text) {
      if (text === undefined) {
        return
      }
      this.searchContry(text)
    },
    // eslint-disable-next-line no-unused-vars
    onCountrySelected(item, index) {
      //this.setCountryValue(item, index)
      this.form_data.country_code = item.phone_code
    },
    setCountryValue(item, index) {
      if (index != 0) {
        return
      }
    }
  },
  created() {
    this.action_fetchUserType()
    this.fetchInterestsData()
    if (this.getter_isUserLoggedIn) {
      this.$router.push({ name: appConstants.routes.HOME })
    }
  }
}
</script>

<style>
.btn-height-40 {
  height: 40px;
}
.eye {
  margin: 17px 17px 0px 0px;
}
.has_required {
  /* visibility: hidden; */
  display: none;
  /* text-decoration: line-through; */
  color: #689868;
}
.p-inputtext {
  text-align: center;
}
.w-Logo {
  width: 32px;
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
</style>
