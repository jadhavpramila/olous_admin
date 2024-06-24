<template>
  <div class="container cls-createcompany">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-12 col-md-12 m-0" ref="signup">
          <form @submit.prevent="register">
            <div class="justify-content-center pl-5 pr-5 ml-5 mt-5 mr-5">
              <span class="mb-2"
                >You don't have any company registered so, you please create
                company first
              </span>
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
                  class="form-group"
                  v-if="!userData.cv_email || !userData.email"
                >
                  <label for="email">Email</label>
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
                    <span v-if="!$v.user.email.required"
                      >Email is required</span
                    >
                    <span v-if="!$v.user.email.email">Email is invalid</span>
                  </div>
                </div>

                <div
                  class="form-group"
                  v-if="!userData.cv_phone || !userData.phone"
                >
                  <label for="mobile">Phone</label>
                  <input
                    type="text"
                    id="mobile"
                    name="mobile"
                    v-model="user.phone"
                    class="form-control"
                    :class="{
                      'is-invalid': submitted && $v.user.phone.$invalid
                    }"
                  />
                  <div
                    v-if="submitted && !$v.user.phone.required"
                    class="invalid-feedback"
                  >
                    Phone number is required
                  </div>

                  <div
                    v-if="
                      submitted &&
                      !$v.user.phone.numeric &&
                      $v.user.phone.required
                    "
                    class="invalid-feedback"
                  >
                    Please enter a valid Phone number
                  </div>
                </div>

                <div class="form-group m-b" v-if="!userData.country">
                  <label for="city">Country</label>
                  <v-select
                    v-model="selectedCountry"
                    label="name"
                    :options="filteredCountry[0].data"
                    @search="fetchCountryValues"
                    @input="onCountrySelected($event)"
                    placeholder=""
                    class="form-control options-on-search-only"
                    :class="{
                      'is-invalid': submitted && $v.selectedCountry.$invalid
                    }"
                  ></v-select>
                  <div
                    v-if="submitted && !$v.selectedCountry.required"
                    class="invalid-feedback"
                  >
                    Country is required
                  </div>
                </div>
                <div class="form-group m-b" v-if="!userData.city">
                  <label for="city">City</label>
                  <v-select
                    label="displayName"
                    class="form-control options-on-search-only"
                    :disabled="
                      this.selectedCountry == '' || this.selectedCountry == null
                    "
                    v-model="selectedCitiData"
                    :options="this.cities"
                    @search="fetchCities"
                    :class="{
                      'is-invalid': submitted && $v.user.city.$invalid
                    }"
                  >
                  </v-select>
                  <div
                    v-if="submitted && !$v.user.city.required"
                    class="invalid-feedback"
                  >
                    City is required
                  </div>
                </div>
              </div>
              <h5 class="mb-3 mt-1 fontSize16">Company Details:</h5>
              <div class="">
                <div class="cls-registration">
                  <div class="form-container">
                    <div class="">
                      <div class="form-group">
                        <label class="d-flex"
                          >Company Name
                          <span class="text-danger">*</span></label
                        >
                        <input
                          type="text"
                          class="form-control input-lg"
                          v-model="company.company_name"
                          @change="getSlugValueuUsingComapnyName()"
                        />
                        <div
                          v-if="submitted && !$v.company.company_name.required"
                          class="invalid-feedback d-block"
                        >
                          Company name is required
                        </div>
                        <div
                          v-if="submitted && !$v.company.company_name.maxLength"
                          class="invalid-feedback d-block"
                        >
                          Company name max 60 characters required
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="d-flex justify-content-between">
                          <span
                            >Company Short Description
                            <span class="text-danger">*</span
                            ><small class="fontSize12"
                              >(Max 60 characters) (Write for what you will like
                              to be known)</small
                            ></span
                          >
                          <span class="align-items-end d-flex fontSize12">
                            {{ remainingShortDescLength }}/{{
                              shortDescTotalLength
                            }}
                          </span>
                        </label>
                        <b-form-textarea
                          id="textarea"
                          v-model="company.short_desrciption"
                          rows="1"
                          v-on:keyup="
                            getShortDescriptionLength($event.target.value)
                          "
                          no-resize
                          maxlength="60"
                          max-rows="3"
                          style="overflow-y: auto !important"
                        ></b-form-textarea>
                        <div style="display: flex; flex-direction: row-reverse">
                          <div
                            class="invalid-feedback d-block"
                            v-if="
                              submitted &&
                              !$v.company.short_desrciption.required
                            "
                          >
                            Company short description is required
                          </div>
                          <div
                            v-if="
                              submitted &&
                              !$v.company.short_desrciption.minLength
                            "
                            class="invalid-feedback d-block"
                          >
                            Company short description minimum 20 characters
                            required
                          </div>
                          <div
                            v-if="
                              submitted &&
                              !$v.company.short_desrciption.maxLength
                            "
                            class="invalid-feedback d-block"
                          >
                            Company short description max 60 characters required
                          </div>
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="d-flex"
                          >Portfolio Url
                          <span class="text-danger">*</span></label
                        >
                        <input
                          type="text"
                          name="slug"
                          v-model="fullPortFolioUrl"
                          class="form-control"
                          disabled
                        />
                        <div style="display: flex">
                          <div></div>
                          <div
                            v-if="submitted && !$v.company.slug.required"
                            class="invalid-feedback d-block"
                          >
                            Portfolio link is required
                          </div>
                        </div>
                      </div>

                      <!-- Company Address -->
                      <div class="">
                        <div for="contact" class="p-0 mr-0">
                          <div>
                            <h5 class="mt-2 mb-3">Company Address</h5>
                          </div>
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="d-flex"
                          >Company Address
                          <span class="text-danger">*</span></label
                        >
                        <input
                          type="text"
                          class="form-control input-lg"
                          v-model="companyAddress.address"
                        />
                        <div
                          v-if="
                            submitted && !$v.companyAddress.address.required
                          "
                          class="invalid-feedback d-block"
                        >
                          Company Address is required
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="d-flex"
                          >Country <span class="text-danger">*</span></label
                        >
                        <v-select
                          v-model="selectedCountryCompanyAddress"
                          label="name"
                          :options="filteredCountry[0].data"
                          @search="fetchCountryValues"
                          @input="onCountrySelected($event)"
                          placeholder="Select Country"
                          class="form-control single-value remove-close-btn show-dropdown-icon options-on-search-only"
                        ></v-select>
                        <div
                          v-if="
                            submitted && !$v.companyAddress.country.required
                          "
                          class="invalid-feedback d-block"
                        >
                          Country is required
                        </div>
                      </div>

                      <div class="form-group mb-4">
                        <label for="city" class="d-flex"
                          >City <span class="text-danger">*</span></label
                        >
                        <v-select
                          label="name"
                          v-model="companyAddress.selectedCity"
                          :options="getCitiesFromCountryName"
                          placeholder="Select city"
                          @search="getLocationData"
                          :closeOnSelect="true"
                          :disabled="companyAddress.country ? false : true"
                          class="form-control input-lg single-value show-dropdown-icon remove-close-btn"
                        />
                        <div
                          v-if="
                            submitted &&
                            !$v.companyAddress.selectedCity.required
                          "
                          class="invalid-feedback d-block"
                        >
                          City is required
                        </div>
                      </div>

                      <!-- Company Address -->
                      <div class="" v-if="!userData.first_name">
                        <div for="contact" class="p-0 mr-0 mt-2">
                          <div>
                            <h5 class="mt-2 mb-3">Contact person</h5>
                          </div>
                        </div>
                      </div>

                      <div class="form-group" v-if="!userData.first_name">
                        <label class="d-flex">Name</label>
                        <input
                          type="text"
                          class="form-control input-lg"
                          v-model="contactPerson.name"
                        />
                        <div
                          v-if="submitted && !$v.contactPerson.name.required"
                          class="invalid-feedback d-block"
                        >
                          Contact name is required
                        </div>
                      </div>

                      <div class="form-group" v-if="!userData.designation">
                        <label class="d-flex">Designation</label>
                        <input
                          type="text"
                          class="form-control input-lg"
                          v-model="contactPerson.designation"
                        />
                        <div
                          v-if="
                            submitted && !$v.contactPerson.designation.required
                          "
                          class="invalid-feedback d-block"
                        >
                          Designation is required
                        </div>
                      </div>

                      <div
                        class="form-group"
                        v-if="!userData.cv_phone || !userData.phone"
                      >
                        <label class="d-flex">Mobile</label>
                        <div class="row">
                          <div class="col-lg-5">
                            <v-select
                              v-model="userContact_selected_country"
                              label="name"
                              :options="filteredCountry[0].data"
                              @search="fetchCountryValues"
                              @input="onCountrySelected($event)"
                              placeholder="Country"
                              class="form-control single-value remove-close-btn remove-dropdown-icon options-on-search-only"
                            ></v-select>
                            <div
                              v-if="
                                submitted &&
                                !$v.contactPerson.country_code.required
                              "
                              class="invalid-feedback d-block"
                            >
                              Country is required
                            </div>
                          </div>
                          <div class="col-lg-7">
                            <input
                              type="text"
                              class="form-control input-lg"
                              v-model="contactPerson.mobile"
                            />
                            <div
                              v-if="
                                submitted && !$v.contactPerson.mobile.numeric
                              "
                              class="invalid-feedback d-block"
                            >
                              Mobile no. is not valid
                            </div>
                            <div
                              v-if="
                                submitted && !$v.contactPerson.mobile.required
                              "
                              class="invalid-feedback d-block"
                            >
                              Mobile no. is required
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        class="form-group"
                        v-if="!userData.cv_email || !userData.email"
                      >
                        <label class="d-flex">Email</label>
                        <input
                          type="text"
                          class="form-control input-lg"
                          v-model="contactPerson.email"
                        />
                        <div
                          v-if="submitted && !$v.contactPerson.email.required"
                          class="invalid-feedback d-block"
                        >
                          email id is required
                        </div>
                        <div
                          v-if="submitted && !$v.contactPerson.email.email"
                          class="invalid-feedback d-block"
                        >
                          email id is not valid
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Company details fields ends here-->
              <div class="d-flex form-group justify-content-end">
                <button class="btn mt-3 mb-5" :disabled="serachingSlug">
                  <!--Sign up-->
                  Create Company
                </button>
              </div>
            </div>
          </form>
        </div>
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
        <div class="d-block text-center">
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
import { required, email, numeric } from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from 'vuex'
import appConstants from '../../appConstants.js'
//import registration from './registration'

export default {
  name: 'Signup',
  components: {
    // registration
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
      companyKey: 1
    }
  },

  validations: {
    user: {
      first_name: { required },
      last_name: { required },
      email: { required, email },
      phone: {
        required,
        numeric
      },
      city: { required }
    },
    selectedCountry: { required }
  },
  computed: {
    ...mapGetters('dropdownValues', [
      'getCategoryOptions',
      'getSubcategoryOptions',
      'filteredCountry'
    ]),
    ...mapGetters(['userData'])
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
      'fetchCompCategories',
      'fetchIndianCities',
      'fetchCitiesOfCountry',
      'logout'
    ]),

    ...mapActions('dropdownValues', [
      'fetchCategoryData',
      'fetchSubCategories',
      'searchContry'
    ]),
    getCompanyDataToSave() {
      let companyData = this.$refs.companyDetailsref.$data.company
      let companyAddress = this.$refs.companyDetailsref.$data.companyAddress
      let contactPerson = this.$refs.companyDetailsref.$data.contactPerson

      //First get company data
      var data = {
        name: companyData.company_name,
        company_type: companyData.company_type,
        slug: companyData.slug,
        category: companyData.category,
        sub_categories: companyData.subCategory,
        short_desrciption: companyData.short_desrciption,
        website: companyData.website,
        contact_details: []
      }

      let contactPersonObj = {
        id: '',
        address: companyAddress.address,
        city: companyAddress.selectedCity.name,
        state: companyAddress.selectedCity.state.name,
        state_iso: companyAddress.selectedCity.state_iso,
        country: companyAddress.selectedCity.country.name,
        country_iso: companyAddress.selectedCity.country_iso2,
        lat: companyAddress.selectedCity.latitude,
        lng: companyAddress.selectedCity.longitude,
        pin: '',
        country_code: contactPerson.country_code,
        locality: companyAddress.locality,
        name: contactPerson.name,
        designation: contactPerson.designation,
        email: contactPerson.email,
        phone: contactPerson.mobile
      }

      //get contact details
      data.contact_details.push(contactPersonObj)
      data.contact_details.map((contact) => {
        ;(contact.address = contact.address || ''),
          (contact.locality = contact.locality || ''),
          (contact.country_iso =
            contact.country_iso != undefined ? contact.country_iso : ''),
          (contact.state_iso =
            contact.state_iso != undefined ? contact.state_iso : ''),
          (contact.country_code = contact.country_code || ''),
          (contact.lat = contact.lat || contact.latitude || 0),
          (contact.lng = contact.lng || contact.longitude || 0),
          (contact.pin = contact.pin || '')

        //Adding only one contact so set it as primary
        //contact.is_primary = true; contact will not be primary address
      })

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
      //let data = this.user;
      //this.user.country_code = this.selectedCountry.phone_code;
      let data = this.user
      this.user.country_code = this.selectedCountry.phone_code
      this.user.country_iso = this.selectedCountry.iso2
      //console.log("country iso", this.selectedCountry)
      this.user.country = this.selectedCountry.name

      //get registration company data to save
      var companyData = this.getCompanyDataToSave()
      data.company = companyData

      //Add profession category in user
      this.selected = []
      this.selected.push(data.company.category)
      data.profession_cat = this.selected

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
        this.$refs.companyDetailsref.$v.companyAddress.$invalid ||
        this.$refs.companyDetailsref.$v.contactPerson.$invalid
      ) {
        console.log(true)
        this.show = false
        return
      }

      let data = this.getDataToSave()
      console.log('data', data)

      this.createCompany(data)
        .then((data) => {
          console.log('response data', data)
          if (data.status === 'error') {
            this.show = false
            this.is_error = true
            let msg = data.message
            this.alertMessage = msg
            this.showModal()
          } else {
            this.show = false
            let companyObj = {
              company_id: data.data.id,
              company_name: data.data.newly_created_company.name
            }

            this.$emit('company_created', {
              companyObj: companyObj
            })
            console.log('companyObj', companyObj)
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
      this.$emit('close_company_form')
      this.$refs['successModal'].hide()
    },

    resetForm() {
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
    },
    async getCities(url = '') {
      const response = await fetch(url, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return response.json()
    },
    fetchCities: function (search) {
      if (search.length >= 3) {
        var data = {
          cityStartWith: search,
          countryName: this.selectedCountry.name,
          stateName: ''
        }

        this.fetchCitiesOfCountry(data)
          .then((response) => {
            const result = response.data.hits.hits
            this.cities = result
              .map((res) => res._source)
              .filter((res) => {
                if (res.name != '') {
                  return res
                }
              })

            for (let i = 0; i < this.cities.length; i++) {
              this.cities[
                i
              ].displayName = `${this.cities[i].name}, ${this.cities[i].state}`
            }
          })
          .catch((error) => {
            console.log(error.response.data)
          })
      } else {
        this.cities = []
      }
    },
    logoutUser() {
      this.logout().then(() => {
        console.log(this.$store.getters.isLoggedIn)
        this.$router.go(appConstants.routes.LOGIN)
      })
    },

    fetchSubCategoryAsPerCategory() {
      this.user.company.subCategory = []
      if (
        this.user.company.category != undefined &&
        this.user.company.category != null &&
        this.user.company.category != ''
      ) {
        this.fetchSubCategories(this.user.company.category)
      }
    },

    getShortDescriptionLength(e) {
      this.remainingShortDescLength = this.shortDescTotalLength - e.length
    },

    fetchCountryValues(text) {
      if (text === undefined) {
        return
      }
      this.searchContry(text)
    },
    onCountrySelected(item) {
      this.setCountryValue(item)
    },
    setCountryValue(item) {
      console.log(item)
      this.selectedCitiData = ''
      this.cities = []
    }
  }
}
</script>

<style scoped></style>
