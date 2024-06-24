<template>
  <div>
    <div class="form-conatiner cls-leaddetails">
      <div class="leadDetails form-max-width bg-white p-4 border">
        <form enctype="multipart/form-data" class="mt-3">
          <div>
            <div
              v-if="editLeadDetail.id != '' && editLeadDetail.id != undefined"
              class="form-group bold-Font-Weight"
              style="display: flex; flex-direction: row-reverse"
            >
              Status : {{ getStatusStringValue() }}
            </div>
            <div class="form-group m-b">
              <label>Category</label>
              <select
                v-model="editLeadDetail.category"
                class="form-control input-lg"
                name="company_category"
                v-on:change="setSubCategoryAsPerCategory()"
                :class="{
                  'is-invalid': submitted && $v.editLeadDetail.category.$invalid
                }"
              >
                <option value>Select Category</option>
                <option
                  v-for="item in this.categoryOptions"
                  :value="item.id"
                  :key="item.id"
                >
                  {{ item.name }}
                </option>
              </select>
              <div
                v-if="submitted && !$v.editLeadDetail.category.required"
                class="invalid-feedback"
              >
                Category is required.
              </div>
            </div>
            <div class="form-group">
              <!-- <pre class="language-json"><code>{{ multiSelectoptions  }}</code></pre> -->
              <label>Sub category</label>
              <v-select
                multiple
                label="name"
                v-model="editLeadDetail.sub_category"
                :options="multiSelectoptions"
                placeholder="Select"
                :reduce="(subcategory) => subcategory.id"
                :closeOnSelect="false"
                class="form-control show-dropdown-icon"
                :class="{
                  'is-invalid':
                    submitted && $v.editLeadDetail.sub_category.$invalid
                }"
              />
              <div
                v-if="submitted && !$v.editLeadDetail.sub_category.required"
                class="invalid-feedback"
              >
                Sub category is required.
              </div>
            </div>
            <div class="form-group mt-n1">
              <label>Place your requirement</label>
              <b-form-textarea
                name="lead-requirment"
                v-model="editLeadDetail.requirement"
                cols="40"
                rows="7"
                max-rows="15"
                maxlength="1000"
                no-resize
                class="form-control"
                :class="{
                  'is-invalid':
                    submitted && $v.editLeadDetail.requirement.$invalid
                }"
              ></b-form-textarea>
              <label class="mb-0 text-right float-right">
                (Min 100 characters)
                {{ editLeadDetail.requirement.length }}/{{
                  leadRequirementTotalLength
                }}</label
              >
              <div
                v-if="submitted && !$v.editLeadDetail.requirement.required"
                class="invalid-feedback"
              >
                Requirement is required
              </div>
              <div
                v-if="submitted && !$v.editLeadDetail.requirement.minLength"
                class="invalid-feedback"
              >
                Minimum 100 characters required
              </div>
            </div>
            <!--start location-->
            <div class="form-group mt-1">
              <label class="app-primary-text-color bold-Font-Weight"
                >Work Location</label
              >
              <div class="row">
                <div class="col-lg-3">
                  <label>Country</label>
                  <v-select
                    v-model="editLeadDetail.country"
                    label="name"
                    :options="filteredCountry[0].data"
                    @search="fetchCountryValues"
                    @input="onCountrySelected($event)"
                    class="form-control show-dropdown-icon"
                    placeholder="Enter country"
                    :class="{
                      'is-invalid':
                        submitted && !$v.editLeadDetail.country.required
                    }"
                  ></v-select>

                  <div
                    v-if="submitted && !$v.editLeadDetail.country.required"
                    class="invalid-feedback"
                  >
                    Country is required
                  </div>
                </div>
                <div class="col-lg-3">
                  <label>State</label>
                  <v-select
                    v-model="editLeadDetail.state"
                    label="state"
                    :options="filteredState[0].data"
                    @search="fetchStateValues($event)"
                    @input="onStateSelected($event)"
                    placeholder="Enter state"
                    class="form-control show-dropdown-icon"
                    :class="{
                      'is-invalid':
                        submitted && !$v.editLeadDetail.state.required
                    }"
                  >
                  </v-select>

                  <div
                    v-if="submitted && !$v.editLeadDetail.state.required"
                    class="invalid-feedback"
                  >
                    State is required
                  </div>
                </div>
                <div class="col-lg-3">
                  <label>City</label>
                  <v-select
                    v-model="editLeadDetail.city"
                    label="city"
                    :options="filteredCities[0].data"
                    @search="fetchCitiesValues($event)"
                    @input="onCitySelected($event)"
                    placeholder="Enter city"
                    class="form-control show-dropdown-icon"
                    :class="{
                      'is-invalid':
                        submitted && !$v.editLeadDetail.city.required
                    }"
                  ></v-select>
                  <div
                    v-if="submitted && !$v.editLeadDetail.city.required"
                    class="invalid-feedback"
                  >
                    City is required
                  </div>
                </div>
                <div class="col-lg-3">
                  <label>Pincode</label>
                  <input
                    type="text"
                    class="form-control input-lg"
                    v-model="editLeadDetail.pin"
                    placeholder="Enter pincode"
                    :class="{
                      'is-invalid': submitted && $v.editLeadDetail.pin.$invalid
                    }"
                  />
                  <div
                    v-if="submitted && !$v.editLeadDetail.pin.required"
                    class="invalid-feedback"
                  >
                    Pincode is required
                  </div>
                </div>
              </div>
            </div>
            <!--End Location-->
            <!--start work value-->
            <div class="form-group">
              <label
                >Value of Works
                <span class="fontSize12 ml-1"
                  >(This will help to chanelise your request to the right
                  company)</span
                ></label
              >
              <select
                class="form-control input-lg"
                v-model="editLeadDetail.min_work_value"
                name="emp_strength"
              >
                <option
                  v-for="item in min_work_options"
                  :value="item.id"
                  :key="item.id"
                >
                  {{ item.value }}
                </option>
              </select>
            </div>
            <!--End work value-->
            <!--Start contact details-->
            <div class="mt-1">
              <label class="app-primary-text-color bold-Font-Weight"
                >Contact details</label
              >
            </div>
            <div class="row form-group">
              <div class="col-md-6">
                <div class="mt-2">
                  <label>Name</label>
                  <input
                    type="text"
                    class="form-control input-lg"
                    v-model="editLeadDetail.contact_name"
                  />
                  <!--<div
                    v-if="submitted && !$v.editLeadDetail.contact_name.required"
                    class="invalid-feedback"
                  >
                    Contact name is required
                  </div>-->
                </div>
              </div>
              <div class="col-md-6">
                <div class="mt-2">
                  <label>Company Name</label>
                  <input
                    type="text"
                    class="form-control input-lg"
                    v-model="editLeadDetail.company_name"
                  />
                  <!--<div
                    v-if="submitted && !$v.editLeadDetail.company_name.required"
                    class="invalid-feedback"
                  >
                    Company name is required
                  </div>-->
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>Email</label>
                  <input
                    type="text"
                    class="form-control input-lg"
                    v-model="editLeadDetail.email"
                    :class="{
                      'is-invalid':
                        submitted && $v.editLeadDetail.email.$invalid
                    }"
                  />
                  <div
                    v-if="submitted && !$v.editLeadDetail.email.required"
                    class="invalid-feedback"
                  >
                    Email is required
                  </div>
                  <div
                    v-if="submitted && !$v.editLeadDetail.email.email"
                    class="invalid-feedback"
                  >
                    Invalid email address
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>Mobile</label>
                  <div class="row">
                    <div style="" class="col-3 pr-2 ml-2 mr-n2">
                      <input
                        type="text"
                        class="form-control input-lg"
                        disabled="disabled"
                        v-model="editLeadDetail.country_code"
                      />
                    </div>
                    <div style="" class="col-9">
                      <input
                        type="text"
                        class="form-control input-lg"
                        v-model="editLeadDetail.phone"
                        :class="{
                          'is-invalid':
                            submitted && $v.editLeadDetail.phone.$invalid
                        }"
                      />
                      <div
                        v-if="submitted && !$v.editLeadDetail.phone.required"
                        class="invalid-feedback"
                      >
                        Mobile number is required
                      </div>
                      <div
                        v-if="submitted && !$v.editLeadDetail.phone.numeric"
                        class="invalid-feedback"
                      >
                        Mobile number is invalid
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!--End contact details-->
            <!-- start urgent -->
            <div class="form-group ml-2 mt-2">
              <input
                type="checkbox"
                class="chkurgent"
                name="urgent"
                v-model="editLeadDetail.urgent"
              />
              <label
                for="urgent"
                class="app-primary-text-color bold-Font-Weight ml-2"
              >
                Urgent
              </label>
              <label class="fontSize12 ml-1"
                >(Please tick only if urgent)</label
              >
            </div>
            <!-- End urgent -->
            <!--Star allocate companies -->
            <div
              class="form-group"
              v-if="editLeadDetail.id != '' && editLeadDetail.id != undefined"
            >
              <div>
                <label class="app-primary-text-color bold-Font-Weight"
                  >Allocate companies</label
                >
              </div>
              <div style="display: flex">
                <input
                  type="text"
                  class="form-control input-lg allocate-search"
                  width="100px"
                  v-model="search_compnay_by"
                  @input="fetchAllComapiesToAllocate"
                />
                <i
                  class="fa fa-search fa-lg cursor-pointer m-auto"
                  @click="searchAllComapnies"
                ></i>
              </div>
              <div>
                <div
                  :class="{
                    'is-invalid':
                      submitted && $v.editLeadDetail.companies.$invalid
                  }"
                ></div>
                <div
                  v-if="submitted && !$v.editLeadDetail.companies.required"
                  class="invalid-feedback"
                >
                  Allocate companies to lead
                </div>
              </div>
              <!--Show Allocated companies-->
              <div style="display: flex; flex-direction: row; flex-wrap: wrap">
                <div
                  class="mr-2 mt-2 allocated-comp"
                  v-for="(allocatedComp, counter) in getAllocatedCompanyDetails"
                  :key="counter"
                >
                  <label class="m-1">{{ allocatedComp.name }}</label>
                  <i
                    @click="doNotAllocateCompany(allocatedComp)"
                    class="fa fa-times-circle fa-lg mt-auto mb-auto mr-1"
                    aria-hidden="true"
                  ></i>
                </div>
              </div>

              <!--End Allocated companies-->
              <div class="row">
                <div
                  class="col-lg-4 col-md-4 mb-3"
                  v-for="(companyData, counter) in getCompaniesToAllocate"
                  :key="counter"
                >
                  <CompanyCard
                    :company="companyData._source"
                    @companySelected="allocateCompany(companyData._source)"
                    :key="counter"
                  ></CompanyCard>
                </div>
              </div>
            </div>

            <!--End allocate companies -->

            <!--Start Button -->
            <div class="form-group row mt-n3">
              <div class="ml-auto mr-0">
                <button
                  type="button"
                  class="btn btn-dark btn-custom ml-2"
                  @click="btnSaveUpdateClick"
                >
                  {{ getSaveButtonText() }}
                </button>
                <button
                  v-if="isApproveButtonVisible"
                  class="btn btn-dark btn-custom ml-2"
                  @click="btnApproveClick"
                >
                  Approve
                </button>
                <button
                  v-if="isRejectButtonVisible"
                  type="button"
                  class="btn btn-dark btn-custom ml-2"
                  @click="btnRejectClick"
                >
                  Reject
                </button>

                <button
                  type="button"
                  class="btn btn-dark btn-custom ml-2"
                  @click="btnCancelClick"
                >
                  Cancel
                </button>
              </div>
            </div>
            <!-- End bitton -->
          </div>
        </form>
      </div>

      <modal
        v-if="showLeadModal"
        @closeModal="updateShowLeadModal([false, ''])"
      >
        <div slot="body">{{ this.LeadModalMessage }}</div>
      </modal>

      <modal
        v-if="showSubCategoryModal"
        @closeModal="hideSubcategoryInfoModal"
        id="setSubCategory"
      >
        <div slot="body">You need to reselect subcategory.</div>
      </modal>

      <modal v-if="isShowCancelModal" @closeModal="hideCancelModal">
        <div slot="body">Leave the page without saving?</div>
        <div slot="footer">
          <b-button variant="outline-danger" @click="hideCancelModal">
            Cancel
          </b-button>
          <b-button
            class="ml-2"
            variant="outline-primary"
            @click="goToLeadsListPage"
          >
            OK
          </b-button>
        </div>
      </modal>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import {
  required,
  email,
  numeric,
  minLength,
  requiredIf
} from 'vuelidate/lib/validators'
import modal from '../../common/Modal'
import appConstants from '../../appConstants.js'
import CompanyCard from '../../components/company/common/CompanyCard'

export default {
  name: 'LeadForm',
  components: {
    modal,
    CompanyCard
  },
  data() {
    return {
      editLeadDetail: {
        id: '',
        category: '',
        sub_category: [],
        requirement: '',
        country: '',
        country_iso: '',
        state: '',
        state_iso: '',
        city: '',
        pin: '',
        lng: '',
        lat: '',
        country_code: '',
        min_work_value: 1,
        contact_name: '',
        company_name: '',
        email: '',
        phone: '',
        urgent: false,
        status: appConstants.leadStatus.OPEN,
        companies: []
      },
      is_add_lead: true,
      submitted: false,
      showSubCategoryModal: false,
      categoryOptions: [],
      multiSelectoptions: [],
      leadRequirementTotalLength: 1000,
      leadDetailsSavedCopy: '',
      isShowCancelModal: false,
      leadStatus: appConstants.leadStatus,
      search_compnay_by: '',
      saveButtonText: '',

      min_work_options: appConstants.min_work_options
    }
  },
  validations() {
    return {
      editLeadDetail: {
        category: { required },
        sub_category: { required },
        requirement: {
          required,
          minLength: minLength(100)
        },
        country: { required },
        state: { required },
        city: { required },
        pin: { required },
        min_work_value: { required },
        email: { required, email },
        phone: { required, numeric },
        companies: {
          required: requiredIf(function () {
            if (
              this.editLeadDetail.id == '' ||
              this.editLeadDetail.id == undefined
            ) {
              return false
            } else {
              return true
            }
          })
        }
      }
    }
  },

  computed: {
    ...mapGetters([
      'filteredCountry',
      'filteredState',
      'filteredCities',
      'getSubCategories',
      'getCategory',
      'userData'
    ]),
    ...mapGetters('lead', [
      'getLeadDetails',
      'showLeadModal',
      'LeadModalMessage',
      'getStatusOfEditingLead',
      'getCompaniesToAllocate',
      'getAllocatedCompanyDetails',
      'getIdOfnewlyCreatedLead'
    ])
  },
  watch: {
    getStatusOfEditingLead: function (val) {
      this.editLeadDetail.status = val
    },
    getIdOfnewlyCreatedLead: function (val) {
      this.editLeadDetail.id = val
    }
  },

  methods: {
    ...mapMutations(['setStateEmpty', 'setCityEmpty']),
    ...mapMutations('lead', [
      'updateShowLeadModal',
      'setCompaniesToAllocate',
      'addCompanyToAllocatedCompanyList',
      'removeFromAllocatedCompanyList'
    ]),
    ...mapActions([
      'fetchSubCategories',
      'fetchCategories',
      'searchContry',
      'searchState',
      'searchCity'
    ]),
    ...mapActions('lead', [
      'updateLeadDetails',
      'rejectLead',
      'fetchAllocatedCompanyDetails',
      'fetchCompaniesToAllocate',
      'updateAndApproveLead',
      'createLead',
      'fetchLeadsDetails'
    ]),
    async fetchCategoryOptions() {
      await this.fetchCategories()
      this.categoryOptions = this.getCategory
        .map((res) => res._source)
        .filter((res) => {
          if (res.name != '') {
            return res
          }
        })
    },

    async setSubCategoryAsPerCategory() {
      var subcategory_selected = false
      if (
        this.editLeadDetail.category != undefined &&
        this.editLeadDetail.category != null &&
        this.editLeadDetail.category != ''
      ) {
        await this.fetchSubCategories(this.editLeadDetail.category)
        if (this.editLeadDetail.sub_category.length > 0) {
          subcategory_selected = true
        }

        this.editLeadDetail.sub_category = []
        this.multiSelectoptions = this.getSubCategories
          .map((res) => res._source)
          .filter((res) => {
            if (res.name != '') {
              return res
            }
          })

        console.log('sub category value')
        console.log(this.multiSelectoptions)
        if (subcategory_selected) {
          this.showSubcategoryInfoModal()
        }
      } else {
        this.editLeadDetail.sub_category = []
        this.multiSelectoptions = []
      }
    },
    showSubcategoryInfoModal() {
      this.showSubCategoryModal = true
    },
    hideSubcategoryInfoModal() {
      this.showSubCategoryModal = false
    },
    fetchCountryValues(text) {
      if (text === undefined) {
        return
      }
      this.searchContry(text)
    },
    onCountrySelected(item, index) {
      this.setCountryValue(item, index)
    },
    setCountryValue(item) {
      if (item == null) {
        this.editLeadDetail.country = ''
        this.editLeadDetail.country_iso = ''
        this.editLeadDetail.country_code = ''
      } else {
        this.editLeadDetail.country = item.name
        this.editLeadDetail.country_iso = item.iso2
        this.editLeadDetail.country_code = item.phone_code
      }
      this.editLeadDetail.state = ''
      this.editLeadDetail.state_iso = ''

      this.editLeadDetail.city = ''
      this.editLeadDetail.lng = ''
      this.editLeadDetail.lat = ''
      this.setStateEmpty()
      this.setCityEmpty()
    },
    fetchStateValues(text) {
      if (text === undefined || text == '') {
        return
      }
      let data = {
        country: this.editLeadDetail.country_iso,
        state: text
      }
      this.searchState(data)
    },
    onStateSelected(item, index) {
      this.setStateValues(item, index)
    },
    setStateValues(item) {
      if (item != null) {
        this.editLeadDetail.state = item.state
        this.editLeadDetail.state_iso = item.state_iso
      } else {
        this.editLeadDetail.state = ''
        this.editLeadDetail.state_iso = ''
      }
      this.editLeadDetail.city = ''
      this.editLeadDetail.lng = ''
      this.editLeadDetail.lat = ''

      this.setCityEmpty()
    },
    fetchCitiesValues(text) {
      if (text === undefined || text == '') {
        return
      }
      let data = {
        country: this.editLeadDetail.country_iso,
        state: this.editLeadDetail.state_iso,
        city: text
      }
      this.searchCity(data)
    },
    onCitySelected(item, index) {
      this.setCityValue(item, index)
    },
    setCityValue(item) {
      if (item != null) {
        this.editLeadDetail.city = item.city
      } else {
        this.editLeadDetail.city = ''
      }
      this.editLeadDetail.lng = ''
      this.editLeadDetail.lat = ''
    },
    getJsonDataTOSaveLead() {
      var leadData = {
        id: this.editLeadDetail.id,
        requirement: this.editLeadDetail.requirement,
        category: this.editLeadDetail.category,
        expected_min_val: this.editLeadDetail.min_work_value,
        email: this.editLeadDetail.email,
        phone: this.editLeadDetail.phone,
        country_code: this.editLeadDetail.country_code,
        urgent: this.editLeadDetail.urgent,
        address: '',
        country: this.editLeadDetail.country,
        state: this.editLeadDetail.state,
        city: this.editLeadDetail.city,
        pin: this.editLeadDetail.pin,

        contact_name: this.editLeadDetail.contact_name,
        company_name: this.editLeadDetail.company_name,
        country_iso:
          this.editLeadDetail.country_iso == undefined
            ? ''
            : this.editLeadDetail.country_iso,
        state_iso:
          this.editLeadDetail.state_iso == undefined
            ? ''
            : this.editLeadDetail.state_iso,
        sub_categories: this.editLeadDetail.sub_category,
        companies: this.editLeadDetail.companies
      }

      return leadData
    },
    btnSaveUpdateClick() {
      this.submitted = true
      if (this.$v.editLeadDetail.$invalid) {
        console.log('Required data')
        return false
      }

      this.addOrUpdateLead()
    },
    addOrUpdateLead() {
      var data = this.getJsonDataTOSaveLead()
      if (this.editLeadDetail.id == '' || this.editLeadDetail.id == undefined) {
        this.createLead(data).then(() => {
          this.leadDetailsSavedCopy = JSON.parse(
            JSON.stringify(this.editLeadDetail)
          )

          this.submitted = false
        })
      } else {
        this.updateLeadDetails(data).then(() => {
          this.leadDetailsSavedCopy = JSON.parse(
            JSON.stringify(this.editLeadDetail)
          )
        })
      }
    },
    changeLeadStatus(status) {
      this.submitted = true
      if (this.$v.editLeadDetail.$invalid) {
        console.log('Required data')
        return false
      }

      var data = {
        id: this.editLeadDetail.id,
        statusTobeUpdate: status
      }

      this.rejectLead(data).then(() => {
        this.leadDetailsSavedCopy = JSON.parse(
          JSON.stringify(this.editLeadDetail)
        )
      })
    },
    btnApproveClick() {
      this.submitted = true
      if (this.$v.editLeadDetail.$invalid) {
        console.log('Required data')
        return false
      }

      var data = this.getJsonDataTOSaveLead()
      this.updateAndApproveLead(data).then(() => {
        this.leadDetailsSavedCopy = JSON.parse(
          JSON.stringify(this.editLeadDetail)
        )
      })
    },
    btnRejectClick() {
      var data = {
        id: this.editLeadDetail.id,
        statusTobeUpdate: appConstants.leadStatus.REJECTED
      }

      this.rejectLead(data).then(() => {
        this.leadDetailsSavedCopy = JSON.parse(
          JSON.stringify(this.editLeadDetail)
        )
      })
    },

    btnCancelClick() {
      if (
        JSON.stringify(this.leadDetailsSavedCopy) ===
        JSON.stringify(this.editLeadDetail)
      ) {
        this.cancel()
      } else {
        this.showCancelModal()
      }
    },
    showCancelModal() {
      this.isShowCancelModal = true
    },
    hideCancelModal() {
      this.isShowCancelModal = false
    },
    cancel() {
      this.goToLeadsListPage()
    },
    goToLeadsListPage() {
      this.$router.push({ name: appConstants.routes.LEAD })
    },
    getStatusStringValue() {
      switch (this.editLeadDetail.status) {
        case appConstants.leadStatus.OPEN:
          return 'Open '
        case appConstants.leadStatus.APPROVED:
          return 'Approved '
        case appConstants.leadStatus.REJECTED:
          return 'Rejected '
        case appConstants.leadStatus.EXPIRED:
          return 'Expired '
        default:
          return ''
      }
    },
    fetchAllComapiesToAllocate() {
      if (this.search_compnay_by.trim() == '') {
        this.setCompaniesToAllocate('')
      } else {
        if (this.search_compnay_by.trim().length >= 3) {
          this.fetchCompaniesToAllocate(this.search_compnay_by.trim())
        }
      }
    },
    searchAllComapnies() {
      if (this.search_compnay_by.trim() == '') {
        this.setCompaniesToAllocate('')
      } else {
        this.fetchCompaniesToAllocate(this.search_compnay_by.trim())
      }
    },
    allocateCompany(company) {
      var ispresent = this.editLeadDetail.companies.includes(company.id)
      if (!ispresent) {
        this.editLeadDetail.companies.push(company.id)
        this.addCompanyToAllocatedCompanyList(company)
      }
    },
    doNotAllocateCompany(removeCompany) {
      const index = this.editLeadDetail.companies.indexOf(removeCompany.id)
      if (index > -1) {
        this.editLeadDetail.companies.splice(index, 1)
        this.removeFromAllocatedCompanyList(removeCompany.id)
      }
    },
    getSaveButtonText() {
      if (this.editLeadDetail.id == '' || this.editLeadDetail.id == undefined) {
        return 'Save'
      } else {
        return 'Update'
      }
    },

    isApproveButtonVisible() {
      if (
        !this.is_add_lead &&
        this.userData.is_admin &&
        this.editLeadDetail.status == appConstants.leadStatus.OPEN
      ) {
        return true
      }
    },

    isRejectButtonVisible() {
      if (
        !this.is_add_lead &&
        this.userData.is_admin &&
        this.editLeadDetail.status == appConstants.leadStatus.OPEN
      ) {
        return true
      }
    }
  },
  created() {
    this.fetchCategoryOptions()
    if (this.$route.name == appConstants.routes.UPDATE_LEAD) {
      this.is_add_lead = false
      this.fetchLeadsDetails(this.$route.params.lead_id).then(() => {
        this.editLeadDetail = this.getLeadDetails
        if (
          this.editLeadDetail.category != undefined &&
          this.editLeadDetail.category != null &&
          this.editLeadDetail.category != ''
        ) {
          this.fetchSubCategories(this.editLeadDetail.category).then(() => {
            this.multiSelectoptions = this.getSubCategories
              .map((res) => res._source)
              .filter((res) => {
                if (res.name != '') {
                  return res
                }
              })
          })
        } else {
          this.multiSelectoptions = []
        }

        // if (this.editLeadDetail.companies.length > 0) {
        //   var data = {
        //     company_ids: this.editLeadDetail.companies
        //   }
        //   this.fetchAllocatedCompanyDetails(data)
        // }
      })
    }

    // this.loadDropdownData()
    this.leadDetailsSavedCopy = JSON.parse(JSON.stringify(this.editLeadDetail))
  }
}
</script>

<style scoped>
.form-conatiner {
  margin-top: 20px;
}
.chkurgent {
  transform: scale(2);
}
</style>
