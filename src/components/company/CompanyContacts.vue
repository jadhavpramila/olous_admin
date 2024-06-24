<template>
  <div>
    <div class="d-flex">
      <div class="col-md-10 px-0">
        <div class="main-container">
          <div class="main-container-header d-flex flex-column">
            <label class="font-weight-700 fontSize18 mb-0"
              >Primary Contact
            </label>
            <!-- <label class="fontSize14 text-white"
            >Please enter the basic company details</label
          > -->
          </div>

          <div class="contact-card-container main-container-body">
            <div>
              <div class="">
                <div class="row">
                  <div class="form-group col-md-8">
                    <label for="address">Email</label>
                    <input
                      type="email"
                      name="locality"
                      class="form-control"
                      autocomplete="off"
                      v-model="company_contact.email"
                    />
                    <div
                      v-if="submitted && !$v.company_contact.email.required"
                      class="invalid d-block"
                    >
                      Enter email
                    </div>
                  </div>
                  <div class="form-group col-md-4 pl-0">
                    <label for="address">Phone</label>
                    <input
                      type="text"
                      name="locality"
                      class="form-control"
                      autocomplete="off"
                      v-model="company_contact.phone"
                    />
                    <div
                      v-if="submitted && !$v.company_contact.phone.required"
                      class="invalid d-block"
                    >
                      Enter phone number
                    </div>
                    <div
                      v-if="submitted && !$v.company_contact.phone.numeric"
                      class="invalid-feedback d-block"
                    >
                      Phone number should be numeric
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label for="address">Address</label>
                  <input
                    type="text"
                    name="address"
                    class="form-control"
                    autocomplete="off"
                    v-model="company_contact.address"
                  />
                  <div
                    v-if="submitted && !$v.company_contact.address.required"
                    class="invalid d-block"
                  >
                    Enter Address
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-5 pr-2">
                    <div class="form-group">
                      <label class="color-black">Country</label>
                      <v-select
                        label="name"
                        v-model="company_contact.country"
                        :options="filteredCountry[0].data"
                        @search="fetchCountryValues"
                        @input="onCountrySelected($event, 0)"
                        :closeOnSelect="true"
                        @keydown="keyDown($event)"
                        :class="{
                          'is-invalid':
                            submitted && $v.company_contact.country.$invalid
                        }"
                        class="single-value show-placeholder remove-close-btn remove-dropdown-icon form-control options-on-search-only"
                      />
                      <div
                        v-if="submitted && !$v.company_contact.country.required"
                        class="invalid-feedback"
                      >
                        Country is required
                      </div>
                    </div>
                  </div>
                  <div class="col-md-5 pl-2 pr-2">
                    <div class="form-group">
                      <label for="address">City</label>
                      <v-select
                        label="displayName"
                        v-model="city_displayText"
                        :options="getLocation"
                        @search="getLocationData"
                        @input="selectedCity($event)"
                        :closeOnSelect="true"
                        class="single-value remove-close-btn remove-dropdown-icon form-control options-on-search-only"
                      />
                      <div
                        v-if="submitted && !$v.company_contact.city.required"
                        class="invalid d-block"
                      >
                        Select city
                      </div>
                    </div>
                  </div>
                  <div class="col-md-2 pl-2">
                    <div class="form-group">
                      <label for="address">Pin Code</label>
                      <input
                        type="text"
                        name="locality"
                        class="form-control"
                        autocomplete="off"
                        v-model="company_contact.pin_code"
                      />
                      <div
                        v-if="
                          submitted && !$v.company_contact.pin_code.required
                        "
                        class="invalid d-block"
                      >
                        Enter pincode
                      </div>
                    </div>
                  </div>
                </div>

                <!-- <div>
            <b-form-checkbox
              id="is_primary"
              v-model="company_contact.is_primary"
              name="is_primary"
              :disabled="isPrimary_disabled"
            >
              <label
                for="is_primary"
                class="app-primary-text-color font-weight-bold active-text"
              >
                Primary address
              </label>
            </b-form-checkbox>
          </div> -->
                <div class="d-flex justify-content-end">
                  <button
                    v-if="!company_contact.id"
                    class="ml-2 btn"
                    @click.prevent="updateCompanyContact"
                  >
                    <span class="">Update</span>
                  </button>
                  <!-- <button
                  v-if="company_contact.id"
                  class="ml-2 company-custom-btn"
                  @click.prevent="updateAddress"
                >
                  <span class="">Update</span>
                </button> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-2 pr-0">
        <div class="main-container">
          <div class="main-container-header d-flex flex-column">
            <label class="font-weight-700 fontSize16 mb-0"
              >Company User Contact
            </label>
            <!-- <label class="fontSize14 text-white"
                >Please enter the basic company details</label
              > -->
          </div>

          <div
            class="contact-card-container main-container-body d-flex justify-content-center align-items-center"
          >
            <div>
              <div class="d-flex flex-column">
                <!-- <label class="app-primary-text-color fontSize15"
            >Please add first company contact information</label
          > -->
              </div>
              <div class="">
                <div class="d-flex justify-content-end">
                  <button
                    class="ml-2 company-custom-btn btn"
                    @click.prevent="openUserContactForm"
                  >
                    <span class="">Add</span>
                  </button>
                  <!-- <button
                  v-if="company_contact.id"
                  class="ml-2 company-custom-btn"
                  @click.prevent="updateAddress"
                >
                  <span class="">Update</span>
                </button> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5" v-if="userContactsArray.length > 0">
      <div class="mb-3">
        <span class="fontSize18 app-primary-text-color font-weight-700"
          >Contacts</span
        >
      </div>
      <div
        class="row mx-0"
        style="
          column-width: 412px !important;
          column-gap: 16px !important;
          row-gap: 20px;
          column-count: 2;
        "
      >
        <div
          v-for="(contact, index) in userContactsArray"
          :key="setContactKey(index)"
          class="p-0 contact-card"
          v-if="contact.name"
        >
          <div class="main-container mt-0">
            <div
              class="main-container-header px-4 d-flex justify-content-between"
            >
              <div class="d-flex flex-column">
                <span class="fontSize16 app-primary-text-color font-weight-600">
                  {{ contact.name }}
                </span>
                <span class="fontSize14 font-weight-400">
                  {{ contact.designation }}
                </span>
              </div>

              <img
                src="../../assets/img/Edit-Job.svg"
                alt=""
                class="contact-icons cursor-pointer"
                @click="openUserContactForm(contact)"
              />
            </div>
            <div
              class="main-container-body pr-4 d-flex justify-content-between"
            >
              <div class="d-flex flex-column">
                <div v-if="contact.email">
                  <img src="../../assets/img/Emailer-Company.svg" alt="" />
                  <span
                    class="fontSize12 app-primary-text-color font-weight-600"
                  >
                    {{ contact.email }}
                  </span>
                </div>
                <div v-if="contact.phone">
                  <img src="../../assets/img/Contact-Company.svg" alt="" />
                  <span
                    class="fontSize12 app-primary-text-color font-weight-600"
                  >
                    {{ contact.phone }}
                  </span>
                </div>
                <div v-if="contact.address">
                  <img src="../../assets/img/Location-Company.svg" alt="" />
                  <span
                    class="fontSize12 app-primary-text-color font-weight-600"
                  >
                    {{ contact.address }}
                  </span>
                </div>
              </div>
              <img
                src="../../assets/img/Delete-Job.svg"
                alt=""
                class="contact-icons cursor-pointer"
                @click="deleteUserContact(contact)"
              />
            </div>
          </div>

          <!-- <div
              class="contact-card bg-skyblue d-flex flex-row justify-content-between"
            >
              <div class="d-flex flex-column justify-content-around"></div>
            </div> -->
        </div>
      </div>
    </div>
    <template>
      <b-modal
        size="lg"
        ref="user-contact"
        hide-footer
        hide-header
        :centered="true"
        @close="closeContactUserForm"
      >
        <div class="d-block">
          <div class="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              name="name"
              class="form-control"
              autocomplete="off"
              v-model="company_user_contact.name"
            />
            <div
              v-if="submitted && !$v.company_user_contact.name.required"
              class="invalid-feedback d-block"
            >
              Enter name
            </div>
          </div>
          <div class="form-group">
            <label for="designation">Designation</label>
            <input
              type="text"
              name="designation"
              class="form-control"
              autocomplete="off"
              v-model="company_user_contact.designation"
            />
            <div
              v-if="submitted && !$v.company_user_contact.designation.required"
              class="invalid-feedback d-block"
            >
              Enter designation
            </div>
          </div>

          <div class="form-group">
            <label for="phone">Mobile</label>
            <div class="row">
              <div class="col-lg-5">
                <v-select
                  v-model="selected_country"
                  label="countryAndCode"
                  :options="filteredCountry[0].data"
                  @search="fetchCountryValues"
                  @input="onCountrySelected($event)"
                  placeholder="Country"
                  class="form-control single-value remove-close-btn remove-dropdown-icon options-on-search-only"
                  :class="{
                    'is-invalid':
                      submitted && $v.company_user_contact.country_code.$invalid
                  }"
                ></v-select>
                <div
                  v-if="
                    submitted && !$v.company_user_contact.country_code.required
                  "
                  class="invalid-feedback d-block"
                >
                  Country code is required
                </div>
              </div>
              <div class="flex-grow-1 col-lg-7">
                <input
                  type="text"
                  name="phone"
                  class="form-control show-placeholder options-on-search-only"
                  autocomplete="off"
                  v-model="company_user_contact.phone"
                  placeholder="Mobile No."
                />
                <div
                  v-if="submitted && !$v.company_user_contact.phone.required"
                  class="invalid-feedback d-block"
                >
                  Phone number is required
                </div>
                <div
                  v-if="submitted && !$v.company_user_contact.phone.numeric"
                  class="invalid-feedback d-block"
                >
                  Phone number should be numeric
                </div>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              name="email"
              class="form-control"
              autocomplete="off"
              v-model="company_user_contact.email"
            />
            <div
              v-if="submitted && !$v.company_user_contact.email.required"
              class="invalid-feedback d-block"
            >
              Enter email
            </div>
            <div
              v-if="submitted && !$v.company_user_contact.email.email"
              class="invalid-feedback d-block"
            >
              Enter valid email
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-end">
          <div class="d-flex">
            <span
              class="mt-3 btn cursor-pointer"
              block
              @click="closeContactUserForm"
              >Cancel</span
            >
            <span
              v-if="!company_user_contact.id"
              class="mt-3 ml-3 btn cursor-pointer"
              block
              @click="saveUsercontact"
              >Save</span
            >
            <span
              v-if="company_user_contact.id"
              class="mt-3 ml-3 btn cursor-pointer"
              block
              @click="updateUsercontact"
              >Update</span
            >
          </div>
        </div>
      </b-modal>
      <b-modal ref="successModal" hide-footer hide-header :centered="true">
        <div
          class="d-flex flex-column justify-content-center align-items-center text-center"
        >
          <h4 class="my-4" style="text-transform: capitalize">
            <!-- User created successfully! -->
            {{ modal_message }}
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
import { mapActions, mapGetters } from 'vuex'
import '../../assets/css/appcolor.css'
export default {
  name: 'CompanyContacts',
  props: ['companyData'],
  mounted() {
    if (this.getCurrentCompanyContactData != null) {
      this.setContactData(this.getCurrentCompanyContactData)
    }
  },
  data() {
    return {
      company_contact: {
        company_id: '',
        address: '',
        country: '',
        city: '',
        is_primary: false,
        pin_code: '',
        country_iso: '',
        state_iso: '',
        contact_type: 1,
        contact_id: '',
        email: '',
        phone: '',
        country_code: '',
        state: ''
      },
      city_displayText: '',
      isPrimary_disabled: false,
      company_user_contact: {
        contact_id: '',
        name: '',
        designation: '',
        phone: '',
        country_code: '',
        email: '',
        contact_type: 0,
        id: ''
      },
      userContactsArray: [],
      submitted: false,
      selected_country: '',
      modal_message: ''
    }
  },
  computed: {
    ...mapGetters('dropdownValues', ['getLocation', 'filteredCountry']),
    ...mapGetters('companyData', ['getCurrentCompanyData']),
    ...mapGetters([
      'getCurrentCompanyId',
      'getCurrentContactData',
      'getCurrentCompanyContactData'
    ])
  },
  watch: {
    getCurrentCompanyContactData: {
      handler(val) {
        // console.log('watch =>', val)
        this.setContactData(val)
      },
      deep: true
    }
  },
  validations() {
    return {
      company_contact: {
        address: { required },
        country: { required },
        city: { required },
        email: { required },
        phone: { required, numeric },
        pin_code: { required }
      },
      company_user_contact: {
        name: { required },
        designation: { required },
        phone: { required, numeric },
        country_code: { required },
        email: { required, email }
      }
    }
  },
  methods: {
    ...mapActions('dropdownValues', [
      'fetchLocationFromCityName',
      'searchContry'
    ]),
    ...mapActions('registration', [
      'saveCompnayAddress',
      'updateCompnayAddress'
    ]),
    ...mapActions([
      'saveCompanyUserContact',
      'saveCompanyContacts',
      'saveCurrentContact',
      'updateCompanyUserContact',
      'deleteSingleUserContact',
      'fetchSingleCompanyPreviewDetails'
    ]),
    setContactData(data) {
      let contactData = data
      if (contactData != null) {
        // console.log('contact data', contactData)
        this.userContactsArray = contactData.contacts
        this.setCompanyContactData(contactData.company_contacts)
      }
    },
    setContactKey(index) {
      return 'contact_' + index
    },
    setCompanyContactData(data) {
      if (data.length > 0) {
        this.company_contact.contact_id = data[0].id
        this.company_contact.address = data[0].address
        this.company_contact.country = data[0].country
        this.company_contact.city = data[0].city
        this.company_contact.is_primary = data[0].is_primary
        this.company_contact.pin_code = data[0].pin
        this.company_contact.country_iso = data[0].iso_code.country
        this.company_contact.state_iso = data[0].iso_code.state
        this.company_contact.email = data[0].email
        this.company_contact.phone = data[0].phone
        this.company_contact.country_code = data[0].code
        this.company_contact.state = data[0].state
        this.city_displayText = `${data[0].city}`
      }
    },
    updateCompanyContact() {
      this.submitted = true
      if (this.$v.company_contact.$invalid) {
        return
      }
      if (this.is_primary) {
        this.company_contact.is_primary = this.is_primary
      }

      this.company_contact.company_id = this.getCurrentCompanyId
      this.saveCompanyContacts(this.company_contact).then(() => {
        this.fetchSingleCompanyPreviewDetails(this.getCurrentCompanyId)
        this.showModal()
        this.modal_message = 'Contact updated successfully'
      })
    },

    saveUsercontact() {
      this.submitted = true
      if (this.$v.company_user_contact.$invalid) {
        return
      }
      this.company_user_contact.company_id = this.getCurrentCompanyId

      this.saveCompanyUserContact(this.company_user_contact)
        .then(() => {
          this.fetchSingleCompanyPreviewDetails(this.getCurrentCompanyId)
          // this.userContactsArray.push(this.company_user_contact)
          this.$refs['user-contact'].hide()
          this.showModal()
          this.modal_message = 'Contact saved successfully'
          this.resetForm()
        })
        .catch((error) => {
          this.showModal()
          this.modal_message = error
          this.resetForm()
        })
    },
    getPayload() {
      let data = {
        contact_id: this.company_user_contact.id,
        company_id: this.getCurrentCompanyId,
        name: this.company_user_contact.name,
        designation: this.company_user_contact.designation,
        phone: this.company_user_contact.phone,
        country_code: this.company_user_contact.country_code,
        email: this.company_user_contact.email,
        contact_type: 0,
        id: this.company_user_contact.id
      }
      return data
    },
    updateUsercontact() {
      this.submitted = true
      if (this.$v.company_user_contact.$invalid) {
        return
      }
      let payload = this.getPayload(this.company_user_contact)
      this.updateCompanyUserContact(payload).then(() => {
        this.fetchSingleCompanyPreviewDetails(this.getCurrentCompanyId)
        this.resetForm()
      })
      this.$refs['user-contact'].hide()
    },

    getLocationData(cityName) {
      this.fetchLocationFromCityName(cityName)
    },

    resetForm() {
      this.company_user_contact.contact_id = ''
      this.company_user_contact.name = ''
      this.company_user_contact.designation = ''
      this.company_user_contact.phone = ''
      this.selected_country = ''
      this.company_user_contact.email = ''
      this.company_user_contact.contact_type = 0
      this.company_user_contact.id = ''
      this.submitted = false
    },
    selectedCity(data) {
      if (data == null) {
        this.company_contact.country = ''
        this.company_contact.country_iso = ''
        this.company_contact.state = ''
        this.company_contact.state_iso = ''
        this.company_contact.city = ''
        this.company_contact.lat = 0.0
        this.company_contact.lng = 0.0
      } else {
        this.company_contact.country = data.country.name
        this.company_contact.country_iso = data.country.iso2
        this.company_contact.state = data.state.name
        this.company_contact.state_iso = data.state.state_iso
        this.company_contact.city = data.name //data.name = pune && data.city = pune,maharashtra,india
        this.company_contact.lat = data.latitude
        this.company_contact.lng = data.longitude
        this.city_displayText = data.name
      }
    },
    fetchCountryValues(text) {
      if (text === undefined) {
        return
      }
      this.searchContry(text)
    },
    onCountrySelected(value) {
      if (value == '' || value == null) {
        this.company_user_contact.country_code = ''
        this.selected_country = ''
        this.company_contact.country = ''
      } else {
        this.company_user_contact.country_code = value.phone_code
        this.selected_country = value.phone_code
      }
    },
    openUserContactForm(data) {
      this.submitted = false
      if (data.code) {
        this.selected_country = data.code
        data.country_code = data.code
      } else {
        this.selected_country = data.country_code
        //data.country_code = data.code
      }

      this.company_user_contact = Object.assign({}, data)
      // console.log(
      //   'company this.company_user_contact',
      //   this.company_user_contact
      // )
      this.$refs['user-contact'].show()
    },
    closeContactUserForm() {
      this.$refs['user-contact'].hide()
      this.resetForm()
    },
    deleteUserContact(data) {
      let obj = {
        company_id: this.getCurrentCompanyId,
        contact_id: data.id
      }
      this.deleteSingleUserContact(obj)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          let objWithIdIndex = this.userContactsArray.findIndex(
            (opt) => opt.id === obj.contact_id
          )

          if (objWithIdIndex > -1) {
            this.userContactsArray.splice(objWithIdIndex, 1)
          }

          this.showModal()
          this.modal_message = 'Contact deleted successfully'
        })
        .catch((error) => {
          this.showModal()
          this.modal_message = error
        })
    },
    showModal() {
      this.$refs['successModal'].show()
    },
    hideModal() {
      this.$refs['successModal'].hide()
    }
  }
}
</script>
<style>
.company-custom-btn {
  border-radius: 8px;
  border-color: var(--app-primary-color);
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  text-align: left;
  color: #000;
  /* padding: 7px 24px 7px 24px; */
  width: 92px !important;
  height: 92px !important;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
}
/* .main-container {
  /* border: 1px solid #ccc;
  background-color: #fff;
  height: 100%; */
/* width: auto; 
  border-radius: 4px;
  margin-top: 28px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);*/
/* min-width: 835px;
  max-width: 950px; 
}*/
/*.main-container-header {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background-image: var(--app-bg-top-gradient);
  padding: 8px;
  color: #fff;
}
.main-container-body {
  padding: 16px;
} */
.contact-card {
  /* border: 1px solid #d1e2ea; */
  height: 142px;
  width: 466px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  text-transform: capitalize;
  margin-bottom: 10px;
}
.contact-card .designation {
  font-size: 14px;
  color: #767676;
}
.contact-card-container {
  width: auto;
  min-height: 300px;
  /* border-radius: 8px;
  border: solid 1px #d1e2ea;
  padding: 16px; */
}
.contact-icons {
  width: 38px;
}
.bg-skyblue {
  background-color: #f4f8fa;
}
</style>
