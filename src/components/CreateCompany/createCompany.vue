<template>
  <div class="form-conatiner">
    <div class="company-container">
      <div
        class="company-header-titles app-bg-top-gradient app-primary-text-color fontSize18 font-weight-600"
      >
        <span class="mb-2">Please register your company to get started </span>
      </div>
      <div class="app-bg-box-shadow" ref="signup">
        <form>
          <div class="justify-content-center p-4">
            <h5 class="fontSize16 mb-3 mt-1" v-if="!userData.first_name">
              User Details:
            </h5>
            <div class="">
              <div class="row">
                <div class="form-group col-md-6" v-if="!userData.first_name">
                  <label for="firstName">First Name</label>
                  <input
                    type="text"
                    v-model="user.first_name"
                    id="firstName"
                    name="firstName"
                    class="form-control"
                    placeholder="first name"
                    :class="{
                      'is-invalid': submitted && $v.user.first_name.$invalid
                    }"
                  />
                  <div
                    v-if="submitted && !$v.user.first_name.required"
                    class="invalid-feedback"
                  >
                    First Name is required
                  </div>
                </div>
                <div class="form-group col-md-6" v-if="!userData.last_name">
                  <label for="lastName">Last Name</label>
                  <input
                    type="text"
                    v-model="user.last_name"
                    id="surname"
                    name="surname"
                    class="form-control"
                    placeholder="last name"
                    :class="{
                      'is-invalid': submitted && $v.user.last_name.$invalid
                    }"
                  />
                  <div
                    v-if="submitted && !$v.user.last_name.required"
                    class="invalid-feedback"
                  >
                    Last name is required
                  </div>
                </div>
              </div>
              <div
                class="form-group mt-4 mb-3"
                v-if="!userData.cv_email || !userData.email"
              >
                <label for="email"
                  >Email<span class="text-danger">*</span></label
                >
                <input
                  type="email"
                  v-model="user.email"
                  id="email"
                  name="email"
                  class="form-control"
                  placeholder="email"
                  :class="{
                    'is-invalid': submitted && $v.user.email.$invalid
                  }"
                />
                <div
                  v-if="submitted && $v.user.email.$invalid"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.user.email.required">Email is required</span>
                  <span v-if="!$v.user.email.email">Email is invalid</span>
                </div>
              </div>

              <div
                class="form-group mt-4 mb-3"
                v-if="!userData.cv_phone || !userData.phone"
              >
                <label class="d-flex"
                  >Mobile<span class="text-danger">*</span></label
                >
                <div class="row">
                  <div class="col-lg-6">
                    <input
                      type="text"
                      class="form-control input-lg"
                      v-model="user.phone"
                    />
                    <div
                      v-if="submitted && !$v.user.phone.numeric"
                      class="invalid-feedback d-block"
                    >
                      Mobile no. is not valid
                    </div>
                    <div
                      v-if="submitted && !$v.user.phone.required"
                      class="invalid-feedback d-block"
                    >
                      Mobile no. is required
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h5 class="mb-3 mt-1 fontSize16">Company Details:</h5>
            <div class="">
              <registration
                :key="companyKey"
                :submitted="submitted"
                ref="companyDetailsref"
              ></registration>
            </div>
            <!-- Company details fields ends here-->
            <div class="d-flex form-group justify-content-end">
              <span
                class="mt-2 mb-2 btn cursor-pointer"
                @click="register()"
                :disabled="serachingSlug"
                style="min-width: 155px"
              >
                <!--Sign up-->
                Register Company
              </span>
            </div>
          </div>
        </form>
      </div>
      <b-overlay
        :show="show"
        no-wrap
        fixed
        variant="dark"
        opacity="0.9"
      ></b-overlay>
    </div>
    <template>
      <b-modal ref="successModal" hide-footer hide-header :centered="true">
        <div
          class="d-flex flex-column align-items-center justify-content-center"
        >
          <h4 class="my-4" style="text-transform: capitalize">
            <!-- User created successfully! -->
            {{ alertMessage }}
          </h4>
          <b-button class="mt-2 btn" variant="outline-dark" @click="hideModal"
            >Ok</b-button
          >
        </div>
      </b-modal>
    </template>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { required, email, numeric, requiredIf } from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from 'vuex'
// eslint-disable-next-line no-unused-vars
import appConstants from '../../appConstants.js'
import registration from './registration'
import '../../assets/css/appcolor.css'

export default {
  name: 'CreateCompany',
  components: {
    registration
  },

  data() {
    return {
      show: false,
      selected: [],
      cities: [],
      selectedCitiData: '',
      selectedCountry: '',
      is_in_mh: true,
      user: {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        profession_cat: '',
        city: '',
        country_code: '',
        country: '',
        country_iso: '',
        coupon: '',
        company: {}
      },
      items: [
        { txt: 'Maharashtra', val: true },
        { txt: 'Non Maharashtra', val: false }
      ],
      is_error: false,
      alertMessage: '',
      submitted: false,
      profession_error: false,
      serachingSlug: false,
      loggedIn_user_empid: '',

      remainingShortDescLength: 60,
      shortDescTotalLength: 60,
      companyKey: 1,
      userContact_selected_country: ''
    }
  },

  validations: {
    user: {
      first_name: {
        required: requiredIf(function () {
          return this.userData.first_name == ''
        })
      },
      last_name: {
        required: requiredIf(function () {
          return this.userData.last_name == ''
        })
      },
      email: {
        required: requiredIf(function () {
          return this.userData.email == ''
        }),
        email
      },
      phone: {
        required: requiredIf(function () {
          return this.userData.phone == ''
        }),
        numeric
      }
    }
  },
  computed: {
    ...mapGetters('dropdownValues', [
      'getCategoryOptions',
      'getSubcategoryOptions',
      'filteredCountry'
    ]),
    ...mapGetters(['userData']),
    ...mapGetters(['allCompanies'])
  },

  watch: {
    selectedCitiData: function (citiInfo) {
      if (citiInfo == null || citiInfo == '') {
        this.user.city = ''
      } else {
        this.user.city = citiInfo.name
      }
    }
  },
  mounted() {},

  created() {
    this.fetchCategoryData()
    var userData = this.$store.getters.userData
    this.loggedIn_user_empid = userData.emp_id
  },
  methods: {
    ...mapActions([
      'createCompany',
      'createCompanyNew',
      'fetchCompCategories',
      'fetchIndianCities',
      'fetchCitiesOfCountry',
      'logout'
    ]),
    ...mapActions(['fetchCompanies']),
    ...mapActions('dropdownValues', [
      'fetchCategoryData',
      'fetchSubCategories',
      'searchContry'
    ]),
    getCompanyDataToSave() {
      let companyData = this.$refs.companyDetailsref.$data.company
      let companyAddress = this.$refs.companyDetailsref.$data.companyAddress
      // let contactPerson = this.$refs.companyDetailsref.$data.contactPerson

      //First get company data
      var data = {
        name: companyData.company_name,
        company_type: companyData.company_type,
        slug: companyData.slug,
        category: companyData.category,
        sub_categories: companyData.subCategory,
        description: companyData.description,
        website: companyData.website,
        address: companyAddress.address,
        pin_code: companyAddress.pin_code,
        pan_card_no: companyData.pan_card_no,
        gst_card_no: companyData.gst_card_no
        //contact_details: []
      }

      // let contactPersonObj = {
      //   id: '',
      //   address: companyAddress.address,
      //   city: companyAddress.selectedCity.name,
      //   state: companyAddress.selectedCity.state.name,
      //   state_iso: companyAddress.selectedCity.state_iso,
      //   country: companyAddress.selectedCity.country.name,
      //   country_iso: companyAddress.selectedCity.country_iso2,
      //   lat: companyAddress.selectedCity.latitude,
      //   lng: companyAddress.selectedCity.longitude,
      //   pin: ''
      //   //locality: companyAddress.locality
      // }

      //get contact details
      //data.contact_details.push(contactPersonObj)
      // data.contact_details.map((contact) => {
      //   ;(contact.address = contact.address || ''),
      //     (contact.locality = contact.locality || ''),
      //     (contact.country_iso =
      //       contact.country_iso != undefined ? contact.country_iso : ''),
      //     (contact.state_iso =
      //       contact.state_iso != undefined ? contact.state_iso : ''),
      //     (contact.country_code = contact.country_code || ''),
      //     (contact.lat = contact.lat || contact.latitude || 0),
      //     (contact.lng = contact.lng || contact.longitude || 0),
      //     (contact.pin = contact.pin || '')

      //Adding only one contact so set it as primary
      //contact.is_primary = true; contact will not be primary address
      //})

      if (
        companyAddress.selectedCity == null ||
        companyAddress.selectedCity == ''
      ) {
        // this.user.city = "";
        data.is_in_mh = false
      } else {
        //this.user.city = citiInfo.name;
        if (
          companyAddress.selectedCity.state_iso == 'MH' ||
          companyAddress.selectedCity.state_iso == 'IN-MH'
        ) {
          data.is_in_mh = true
        } else {
          data.is_in_mh = false
        }
      }

      if (
        companyAddress.selectedCity == null ||
        companyAddress.selectedCity == ''
      ) {
        data.country = ''
        data.country_iso = ''
        data.state = ''
        data.state_iso = ''
        data.city = ''
        data.lat = ''
        data.lng = ''
      } else {
        data.country = companyAddress.selectedCity.country.name
        data.country_iso = companyAddress.selectedCity.country_iso2
        data.state = companyAddress.selectedCity.state.name
        data.state_iso = companyAddress.selectedCity.state_iso
        data.city = companyAddress.selectedCity.name
        data.lat = companyAddress.selectedCity.latitude
        data.lng = companyAddress.selectedCity.longitude
      }

      return data
    },

    getDataToSave() {
      var companyData = this.getCompanyDataToSave()
      // console.log('companyData', companyData)
      // data.company = companyData
      if (this.userData.email) {
        this.user.email = this.userData.email
      }
      if (this.userData.phone) {
        this.user.phone = this.userData.phone
      }
      let data
      // if () {
      //   data = {
      //     name: companyData.name,
      //     slug: companyData.slug,
      //     description: companyData.description,
      //     country: companyData.country,
      //     state: companyData.state,
      //     country_iso: companyData.country_iso,
      //     state_iso: companyData.state_iso,
      //     city: companyData.city,
      //     address: companyData.address,
      //     pin_code: companyData.pin_code,
      //     email: this.user.email,
      //     pan_card_no: companyData.pan_card_no,
      //     gst_card_no: companyData.gst_card_no
      //   }
      // } else if (!this.userData.phone) {
      //   data = {
      //     name: companyData.name,
      //     slug: companyData.slug,
      //     description: companyData.description,
      //     country: companyData.country,
      //     state: companyData.state,
      //     country_iso: companyData.country_iso,
      //     state_iso: companyData.state_iso,
      //     city: companyData.city,
      //     address: companyData.address,
      //     pin_code: companyData.pin_code,
      //     phone: this.user.phone,
      //     pan_card_no: companyData.pan_card_no,
      //     gst_card_no: companyData.gst_card_no
      //   }
      // } else {
      data = {
        name: companyData.name,
        slug: companyData.slug,
        description: companyData.description,
        country: companyData.country,
        state: companyData.state,
        country_iso: companyData.country_iso,
        state_iso: companyData.state_iso,
        city: companyData.city,
        email: this.user.email,
        phone: this.user.phone,
        address: companyData.address,
        pin_code: companyData.pin_code,
        pan_number: companyData.pan_card_no,
        gst_number: companyData.gst_card_no,
        category: companyData.category,
        sub_categories: companyData.sub_categories
        // }
      }
      //this.user

      this.user.country_code = this.selectedCountry.phone_code
      this.user.country_iso = this.selectedCountry.iso2
      //console.log("country iso", this.selectedCountry)
      this.user.country = this.selectedCountry.name

      return data
    },

    register() {
      this.show = true
      // console.log(this.user);
      this.submitted = true
      if (this.user.company.slug === '') {
        this.getSlug = false
      }
      this.$v.$touch()
      if (
        this.$v.$invalid ||
        this.$refs.companyDetailsref.$v.company.$invalid ||
        this.$refs.companyDetailsref.$v.companyAddress.$invalid
      ) {
        console.log(true)
        this.show = false
        return
      }

      let data = this.getDataToSave()
      console.log('data', data)

      this.createCompanyNew(data)
        .then((data) => {
          //console.log('response data', data)
          if (data.status === 'error') {
            this.show = false
            this.is_error = true
            let msg = data.message
            this.alertMessage = msg
            this.showModal()
          } else {
            this.show = false
            this.fetchCompanies().then(() => {
              location.reload()
            })
            let msg = `Business registered successfully!`
            this.alertMessage = msg
            this.showModal()
            this.resetForm()
          }
        })
        .catch((error) => {
          this.show = false
          console.error('Error:', error)
          this.is_error = true
          let msg = error
          this.alertMessage = msg
          this.showModal()
        })
    },

    showModal() {
      this.$refs['successModal'].show()
    },
    hideModal() {
      if (!this.is_error) {
        this.resetForm()
      }
      //this.$emit('close_company_form')
      this.$refs['successModal'].hide()
    },

    resetForm() {
      //Iterate through each object field, key is name of the object field`
      // Object.keys(this.user).forEach((key) => {
      //   if (key === "company") {
      //     Object.keys(this.user[key]).forEach((nestedkey) => {
      //       console.log(nestedkey);
      //       this.user[key][nestedkey] = "";
      //       if (nestedkey == "is_in_mh") {
      //         this.user[key][nestedkey] = true;
      //       }
      //     });
      //   } else {
      //     this.user[key] = "";
      //   }
      // });

      Object.keys(this.user).forEach((key) => {
        if (key === 'company') {
          this.user[key] = {}
        } else {
          this.user[key] = ''
        }
      })

      //Key-changing to force re-renders of a component
      this.companyKey = this.companyKey + 1

      this.is_in_mh = true
      this.submitted = false
      this.selected = []
      this.cities = []
      this.selectedCitiData = ''
      this.selectedCountry = ''
    }
    // async getCities(url = '') {
    //   const response = await fetch(url, {
    //     method: 'get',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   })
    //   return response.json()
    // },
    // fetchCities: function (search) {
    //   if (search.length >= 3) {
    //     var data = {
    //       cityStartWith: search,
    //       countryName: this.selectedCountry.name,
    //       stateName: ''
    //     }

    //     this.fetchCitiesOfCountry(data)
    //       .then((response) => {
    //         const result = response.data.hits.hits
    //         this.cities = result
    //           .map((res) => res._source)
    //           .filter((res) => {
    //             if (res.name != '') {
    //               return res
    //             }
    //           })

    //         for (let i = 0; i < this.cities.length; i++) {
    //           this.cities[
    //             i
    //           ].displayName = `${this.cities[i].name}, ${this.cities[i].state}`
    //         }
    //       })
    //       .catch((error) => {
    //         console.log(error.response.data)
    //       })
    //   } else {
    //     this.cities = []
    //   }
    // }
    // logoutUser() {
    //   this.logout().then(() => {
    //     console.log(this.$store.getters.isLoggedIn)
    //     this.$router.go(appConstants.routes.LOGIN)
    //   })
    // }

    // fetchSubCategoryAsPerCategory() {
    //   this.user.company.subCategory = []
    //   if (
    //     this.user.company.category != undefined &&
    //     this.user.company.category != null &&
    //     this.user.company.category != ''
    //   ) {
    //     this.fetchSubCategories(this.user.company.category)
    //   }
    // },

    // getShortDescriptionLength(e) {
    //   this.remainingShortDescLength = this.shortDescTotalLength - e.length
    // },

    // fetchCountryValues(text) {
    //   if (text === undefined) {
    //     return
    //   }
    //   this.searchContry(text)
    // },
    // onCountrySelected(item) {
    //   this.setCountryValue(item)
    // },
    // setCountryValue(item) {
    //   console.log(item)
    //   this.selectedCitiData = ''
    //   this.cities = []
    // }
  }
}
</script>

<style>
/* .form-conatiner {
  margin-top: 20px;
} */
.company-header-titles {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  /* border: solid 1px rgba(0, 0, 0, 0);
  background-color: #416c80; */
  color: #fff;
  padding: 4px 10px 4px 10px;
  /* border: solid 1px rgba(0, 0, 0, 0);
  background-color: #416c80;margin-right: 12px;border-radius: 8px; */
}
.company-container {
  height: auto;
  /* box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px #d8d8d8; */
  background-color: #fff;
  border-radius: 8px;
  margin-top: 20px;
}
.company-btn {
  border-radius: 4px;
  background-color: var(--app-primary-color);
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
  /* padding: 7px 24px 7px 24px; */
  width: 150px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
}
</style>
