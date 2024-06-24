<template>
  <div class="cls-registration">
    <div class="form-container">
      <div class="">
        <div class="form-group">
          <label class="d-flex"
            >Company Name <span class="text-danger">*</span></label
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
              >Company Description <span class="text-danger">*</span
              ><small class="fontSize12"
                >(Write for what you will like to be known)</small
              ></span
            >
            <!-- <span class="align-items-end d-flex fontSize12">
              {{ remainingShortDescLength }}/{{ shortDescTotalLength }}
            </span> -->
          </label>
          <b-form-textarea
            id="textarea"
            v-model="company.description"
            rows="4"
            v-on:keyup="getShortDescriptionLength($event.target.value)"
            no-resize
            maxlength="2000"
            max-rows="8"
            style="overflow-y: auto !important"
          ></b-form-textarea>
          <div style="display: flex; flex-direction: row-reverse">
            <!-- <div class="mb-0 text-right fontSize12">
              {{ remainingShortDescLength }}/{{ shortDescTotalLength }}
            </div> -->

            <div
              class="invalid-feedback d-block"
              v-if="submitted && !$v.company.description.required"
            >
              Company short description is required
            </div>
            <div
              v-if="submitted && !$v.company.description.minLength"
              class="invalid-feedback d-block"
            >
              Company short description minimum 20 characters required
            </div>
            <div
              v-if="submitted && !$v.company.description.maxLength"
              class="invalid-feedback d-block"
            >
              Company short description max 2000 characters required
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="d-flex"
            >Portfolio Url <span class="text-danger">*</span></label
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
        <div>
          <div class="row">
            <div class="col-md-6 pr-2">
              <div class="form-group">
                <label>Category<span class="text-danger">*</span></label>
                <v-select
                  label="name"
                  :searchable="false"
                  v-model="company.category"
                  :options="getCategoryOptions"
                  placeholder="Select"
                  :reduce="(category) => category.id"
                  :closeOnSelect="true"
                  @input="fetchSubCategoryAsPerCategory"
                  class="single-value remove-close-btn form-control show-dropdown-icon"
                />
                <div
                  v-if="submitted && !$v.company.category.required"
                  class="invalid-feedback d-block"
                >
                  Category is required
                </div>
              </div>
            </div>
            <div class="col-md-6 pl-2">
              <div class="form-group">
                <label
                  >Sub-Category <span class="text-danger">*</span
                  ><span class="fontSize12"
                    >(select multiple options)</span
                  ></label
                >
                <v-select
                  multiple
                  label="name"
                  v-model="company.subCategory"
                  :options="getSubcategoryOptions"
                  placeholder="Select"
                  :reduce="(sub_categories) => sub_categories.id"
                  :closeOnSelect="false"
                  class="form-control show-dropdown-icon"
                />
                <div
                  v-if="submitted && !$v.company.subCategory.required"
                  class="invalid-feedback d-block"
                >
                  Sub-Category is required
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="row">
            <div class="col-md-6 pr-2">
              <div class="form-group">
                <label>Provide your GST card number</label>
                <div class="d-flex align-items-baseline">
                  <div class="w-100">
                    <input
                      type="text"
                      class="form-control input-lg"
                      v-model="company.gst_card_no"
                      @change="isValidGSTNo"
                    />
                    <div
                      v-if="submitted && !$v.company.gst_card_no.required"
                      class="invalid-feedback d-block"
                    >
                      GST number is required
                    </div>
                    <div
                      v-if="isValidGSTNumber"
                      class="invalid-feedback d-block"
                    >
                      GST number is not valid
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 pl-2">
              <div class="form-group">
                <label>Provide your PAN card number</label>
                <div class="d-flex align-items-baseline">
                  <div class="w-100">
                    <input
                      type="text"
                      class="form-control input-lg"
                      v-model="company.pan_card_no"
                      @change="isValidPanCardNo"
                    />
                    <div
                      v-if="submitted && !$v.company.pan_card_no.required"
                      class="invalid-feedback d-block"
                    >
                      PAN card number is required
                    </div>
                    <div
                      v-if="isPanCardNumberValid"
                      class="invalid-feedback d-block"
                    >
                      PAN card number is not valid
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Company Address -->
        <div class="">
          <div for="contact" class="p-0 mr-0">
            <div>
              <h5 class="mt-4 mb-3">Company Address</h5>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="d-flex"
            >Company Address <span class="text-danger">*</span></label
          >
          <input
            type="text"
            class="form-control input-lg"
            v-model="companyAddress.address"
          />
          <div
            v-if="submitted && !$v.companyAddress.address.required"
            class="invalid-feedback d-block"
          >
            Company Address is required
          </div>
        </div>
        <div class="form-group">
          <label class="d-flex"
            >Pin code <span class="text-danger">*</span></label
          >
          <input
            type="text"
            class="form-control input-lg"
            v-model="companyAddress.pin_code"
          />
          <div
            v-if="submitted && !$v.companyAddress.pin_code.required"
            class="invalid-feedback d-block"
          >
            Pin code is required
          </div>
          <!-- <div
            v-if="submitted && !$v.companyAddress.pin_code.minLength"
            class="invalid-feedback d-block"
          >
            Pin code must be 6 characters required
          </div>
          <div
            v-if="submitted && !$v.companyAddress.pin_code.maxLength"
            class="invalid-feedback d-block"
          >
            Pin code must be 6 characters required
          </div> -->
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
            v-if="submitted && !$v.companyAddress.country.required"
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
            label="cityState"
            v-model="companyAddress.selectedCity"
            :options="getCitiesFromCountryName"
            placeholder="Select city"
            @search="getLocationData"
            :closeOnSelect="true"
            :disabled="companyAddress.country ? false : true"
            class="form-control input-lg single-value show-dropdown-icon remove-close-btn"
          />
          <div
            v-if="submitted && !$v.companyAddress.selectedCity.required"
            class="invalid-feedback d-block"
          >
            City is required
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import appConstants from '../../appConstants.js'
import {
  required,
  minLength,
  maxLength,
  requiredIf
} from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from 'vuex'
//import slug from '../common/Slug.vue'
// import location from "./location";
export default {
  name: 'Registration',
  props: ['submitted'],
  components: {
    //slug
  },
  data() {
    return {
      company: {
        id: '',
        company_name: '',
        slug: '',
        description: '',
        website: '',
        pan_card_no: '',
        gst_card_no: '',
        category: '',
        subCategory: ''
      },
      companyAddress: {
        country: '',
        address: '',
        selectedCity: '',
        is_primary: true,
        pin_code: ''
      },
      isSlugAvailable: null,
      remainingShortDescLength: 2000,
      shortDescTotalLength: 2000,
      isConCode: [],
      isStateCode: [],
      contactsToDelete: [],
      contactCount: 0, //TODO:remove

      country: 'India',
      companyTypeOptions: [
        { id: 1, value: 'Service' },
        { id: 2, value: 'Product' },
        { id: 3, value: 'Mixed' }
      ],
      companyAddressCityData: '',
      userContact_selected_country: '',
      selectedCountryCompanyAddress: '',
      portfolio_url: appConstants.PORTFOLIO_URL,
      fullPortFolioUrl: '',
      isPanCardNumberValid: false,
      isValidGSTNumber: false
    }
  },
  validations() {
    return {
      company: {
        company_name: { required, maxLength: maxLength(60) },
        // company_type: { required },
        category: { required },
        subCategory: { required },
        description: {
          required,
          minLength: minLength(20),
          maxLength: maxLength(2000)
        },
        slug: { required },
        pan_card_no: {
          required: requiredIf(function () {
            if (this.company.gst_card_no) {
              return false
            } else {
              return true
            }
          })
        },
        gst_card_no: {
          required: requiredIf(function () {
            if (this.company.pan_card_no) {
              return false
            } else {
              return true
            }
          })
        }
      },
      companyAddress: {
        address: { required },
        //locality: { required },
        selectedCity: { required },
        country: { required },
        pin_code: {
          required
          // minLength: minLength(6),
          // maxLength: maxLength(6)
        }
      }
    }
  },

  computed: {
    ...mapGetters('dropdownValues', [
      'getCategoryOptions',
      'getSubcategoryOptions',
      'getLocation',
      'getCitiesFromCountryName'
    ]),
    ...mapGetters('dropdownValues', ['filteredCountry']),
    ...mapGetters(['userData']),
    ...mapGetters(['getSlugValue'])
  },
  methods: {
    ...mapActions('dropdownValues', [
      'fetchCategoryData',
      'fetchSubCategories',
      'fetchLocationFromCityName',
      'fetchCityFromCountryName',
      'searchContry'
    ]),
    ...mapActions(['fetchSlugFromCompanyName']),
    getSlugValueuUsingComapnyName() {
      if (this.company.company_name.trim() != '') {
        this.fetchSlugFromCompanyName(this.company.company_name).then(() => {
          this.company.slug = this.getSlugValue
          this.fullPortFolioUrl = this.portfolio_url + this.company.slug
        })
      }
    },
    // getPortFolioLink(value) {
    //   this.company.slug = value.slugText
    //   this.isSlugAvailable = value.isSlugAvailable
    // },
    // checkIsSlugAvailable() {
    //   if (this.isSlugAvailable === '' || this.isSlugAvailable == null) {
    //     return true
    //   } else {
    //     return this.isSlugAvailable
    //   }
    // },
    fetchSubCategoryAsPerCategory() {
      this.company.subCategory = []
      if (
        this.company.category != undefined &&
        this.company.category != null &&
        this.company.category != ''
      ) {
        this.fetchSubCategories(this.company.category)
      }
    },

    getShortDescriptionLength(e) {
      this.remainingShortDescLength = this.shortDescTotalLength - e.length
    },

    // contactUpdated(counter) {
    //   console.log(counter)
    //   if (counter < this.contactCount) {
    //     this.isContactUpdated = true
    //   }
    // },
    getLocationData(cityNAme) {
      // console.log('country', this.selectedCountryCompanyAddress.iso2)
      let obj = {
        city: cityNAme,
        country: this.selectedCountryCompanyAddress.iso2
      }
      this.fetchCityFromCountryName(obj)
    },
    fetchCountryValues(text) {
      if (text === undefined) {
        return
      }
      this.searchContry(text)
    },
    onCountrySelected(value) {
      if (value == '' || value == null) {
        //this.contactPerson.country_code = ''
        this.companyAddress.country = ''
      } else {
        //this.contactPerson.country_code = value.phone_code
        this.companyAddress.country = value.name
      }
    },
    isValidPanCardNo() {
      // Regex to check valid
      // PAN Number
      let panCardNo = this.company.pan_card_no
      let regex = new RegExp(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)

      // if PAN Number
      // is empty return false

      if (panCardNo == '') {
        this.isPanCardNumberValid = false
        return 'true'
      }

      if (panCardNo == null) {
        return 'false'
      }

      // Return true if the PAN NUMBER
      // matched the ReGex
      if (regex.test(panCardNo) == true) {
        this.isPanCardNumberValid = false
        return 'true'
      } else {
        this.isPanCardNumberValid = true
        return 'false'
      }
    },
    isValidGSTNo() {
      // Regex to check valid
      // GST CODE
      let str = this.company.gst_card_no
      let regex = new RegExp(
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
      )

      // GST CODE
      // is empty return false

      if (str == '') {
        this.isValidGSTNumber = false
        return 'true'
      }

      if (str == null) {
        return 'false'
      }

      // Return true if the GST_CODE
      // matched the ReGex
      if (regex.test(str) == true) {
        this.isValidGSTNumber = false
        return 'true'
      } else {
        this.isValidGSTNumber = true
        return 'false'
      }
    }
  },
  created() {
    this.fetchCategoryData()
  }
}
</script>

<style scoped></style>
