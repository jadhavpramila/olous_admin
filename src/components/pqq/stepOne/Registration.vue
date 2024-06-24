<template>
  <div class="cls-companyregistration form-conatiner">
    <div class="form-max-width">
      <!-- <div class="page-title">Primary Details</div> -->
      <div class="">
        <!-- <pre> -->
        <!-- {{ getRegistrationData }} -->
        <!-- </pre> -->
        <div class="form-group">
          <label>Business Name</label>
          <input
            type="text"
            class="form-control input-lg"
            maxlength="60"
            v-model="registrationData.company_name"
            :disabled="userData.is_admin ? false : true"
          />
          <div
            v-if="submitted && !$v.registrationData.company_name.required"
            class="invalid-feedback d-block"
          >
            Business name is required
          </div>
          <div
            v-if="submitted && !$v.registrationData.company_name.maxLength"
            class="invalid-feedback d-block"
          >
            Business name max 60 characters required
          </div>
        </div>

        <div class="form-group" v-if="userData.is_admin">
          <label>Category</label>
          <v-select
            label="name"
            :searchable="false"
            v-model="registrationData.category"
            :options="getCategoryOptions"
            placeholder="select"
            :reduce="(category) => category.id"
            :closeOnSelect="true"
            @input="fetchSubCategoryAsPerCategory"
            class="single-value remove-close-btn form-control"
          />
          <div
            v-if="submitted && !$v.registrationData.category.required"
            class="invalid-feedback d-block"
          >
            Category is required
          </div>
        </div>

        <div class="form-group" v-if="userData.is_admin">
          <label
            >Sub-Category
            <span class="fontSize12">(select multiple options)</span></label
          >
          <v-select
            multiple
            label="name"
            v-model="registrationData.subCategory"
            :options="getSubcategoryOptions"
            placeholder="select"
            :reduce="(subCategory) => subCategory.id"
            :closeOnSelect="false"
            class="form-control"
          />
          <div
            v-if="submitted && !$v.registrationData.subCategory.required"
            class="invalid-feedback d-block"
          >
            Sub-Category is required
          </div>
        </div>

        <div class="form-group">
          <label class="d-flex flex-row">
            <span class="fontSize14 w-100"
              >Business Short Description
              <small>
                <!-- (Max 60 characters)  -->
                (Write for what you will like to be known)</small
              >
            </span>
            <span class="mb-0 text-right w-50">
              {{ remainingShortDescLength }}/{{ shortDescTotalLength }}
            </span>
          </label>
          <b-form-textarea
            id="textarea"
            v-model="registrationData.short_desrciption"
            rows="1"
            v-on:keyup="getShortDescriptionLength($event.target.value)"
            no-resize
            maxlength="60"
          ></b-form-textarea>
          <div style="display: flex; flex-direction: row-reverse">
            <div
              v-if="
                submitted && !$v.registrationData.short_desrciption.required
              "
              class="invalid-feedback d-block"
            >
              Business short description is required
            </div>
            <div
              v-if="
                submitted && !$v.registrationData.short_desrciption.minLength
              "
              class="invalid-feedback d-block"
            >
              Business short description minimum 20 characters required
            </div>
            <div
              v-if="
                submitted && !$v.registrationData.short_desrciption.maxLength
              "
              class="invalid-feedback d-block"
            >
              Business short description max 60 characters required
            </div>
          </div>
        </div>

        <div class="form-group" v-if="userData.is_admin">
          <label>Website (Optional)</label>
          <input
            type="text"
            class="form-control input-lg"
            v-model="registrationData.website"
          />
        </div>

        <div class="form-group" disabled>
          <slug
            v-if="isDataLoaded"
            textbox_label_name="Portfolio link"
            :initial_slug_Value="registrationData.slug"
            :isDisabled="true"
            @slug_value_changed="getPortFolioLink"
          >
          </slug>
          <div style="display: flex">
            <div></div>
            <div
              v-if="submitted && !$v.registrationData.slug.required"
              class="invalid-feedback d-block"
            >
              Portfolio link is required
            </div>
          </div>
        </div>

        <div class="form-group" v-if="isInIndia && userData.is_admin">
          <label>GST Number</label>
          <input
            type="text"
            class="form-control input-lg"
            v-model="registrationData.gst_number"
          />
        </div>

        <div class="row">
          <div class="col-lg-10"></div>
          <div class="col-lg-2"></div>
        </div>

        <!-- new contact page -->
        <!-- header -->
        <div class="mb-2 mt-2">
          <div for="contact" class="row p-0 mr-0">
            <div class="col-8 col-md-8">
              <label class="mt-2 app-primary-text-color bold-text">Company Address</label>
            </div>

            <div class="col-4 col-md-4">
              <div class="row float-right">
                <div>
                  <p class="contact-msg p-0 m-0"></p>
                </div>
                <div v-if="userData.is_admin">
                  <button
                    type="button"
                    @click="addAddress"
                    class="btn mt-0 text-right ml-2"
                  >
                    Add +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- show added address here -->
        <!-- {{ registrationData.contactDetails }} -->
        <div
          v-for="(data, index) in registrationData.contactDetails"
          :key="setAddressKey(index)"
        >
          <div class="mb-2" v-if="data.is_primary == true">
            <div class="primary-address-div">
              <img src="../../../assets/img/Checkmark.svg" alt="" class="" />
              <span class="ml-1">Primary Address</span>
            </div>
          </div>
          <div
            class="back-color mb-4"
            v-if="data.contact_type == contact_type.COMPANY"
          >
            <div class="row">
              <div class="col-8 col-md-10 px-4 py-2">
                <div class="d-flex">
                  <img
                    src="../../../assets/img/Address.svg"
                    alt="Address"
                    width="34px"
                  />
                  <div class="ml-2 contact-address">
                    <span class="">{{ data.address }}</span>
                    <br />
                    <span class="">{{ data.locality }} {{ data.pin }}</span>
                    <br />
                    <span class="">
                      {{ data.city }}, {{ data.state }},
                      {{ data.country }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-4 col-md-2 text-center">
                <div class="contact-edit-delete">
                  <img
                    role="button"
                    src="../../../assets/img/Edit-Contact.svg"
                    alt="trash"
                    class="mb-2"
                    @click="editAddressRecord(data)"
                  />
                  <img
                    role="button"
                    src="../../../assets/img/Trash-Contact.svg"
                    alt="trash"
                    @click="deleteAddressRecord(data)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- contact row here -->
        <div
          class="mb-2 mt-2"
          v-if="registrationData.contactDetails.length > 0"
        >
          <div for="contact" class="row p-0 mr-0">
            <div class="col-8 col-md-8">
              <label class="mt-2 app-primary-text-color bold-text">Contacts</label>
            </div>

            <div class="col-4 col-md-4">
              <div class="row float-right">
                <!-- <div>
                  <p class="contact-msg p-0 m-0"></p>
                </div> -->
                <div v-if="userData.is_admin">
                  <button
                    type="button"
                    @click="contactPopup"
                    class="btn btn-dark btn-custom mt-0 text-right ml-2"
                    v-if="isAddUserButtonVisible()"
                  >
                    Add +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- show contact added -->
        <div
          v-for="(data, index) in registrationData.contactDetails"
          :key="setContactKey(index)"
        >
          <div
            class="back-color mb-4"
            v-if="data.contact_type == contact_type.USER"
          >
            <div class="row">
              <div class="col-8 col-md-10 py-3 px-4">
                <div class="ml-1">
                  <span class="contact-name"> {{ data.name }} </span><br />
                  <span class="contact-designation"
                    >{{ data.designation }}
                  </span>
                </div>
                <div class="d-flex align-items-center m-1" v-if="data.phone">
                  <img
                    src="../../../assets/img/Call-Company.svg"
                    alt=""
                    class="contact-img"
                  />
                  <span class="contact-phone-email-add">{{ data.phone }} </span>
                </div>
                <div class="d-flex align-items-center m-1" v-if="data.email">
                  <img
                    src="../../../assets/img/Email-Company.svg"
                    alt=""
                    class="contact-img"
                  />
                  <span class="contact-phone-email-add">
                    {{ data.email }}
                  </span>
                </div>
                <div class="d-flex align-items-center m-1" v-if="data.address">
                  <img
                    src="../../../assets/img/Address.svg"
                    alt=""
                    class="contact-img"
                  /><span class="contact-phone-email-add">{{
                    data.address
                  }}</span>
                </div>
              </div>
              <div class="col-4 col-md-2 text-center">
                <div class="contact-edit-delete">
                  <img
                    role="button"
                    src="../../../assets/img/Edit-Contact.svg"
                    alt="trash"
                    class="mb-2"
                    @click="editContactRecord(data)"
                  />
                  <img
                    role="button"
                    src="../../../assets/img/Trash-Contact.svg"
                    alt="trash"
                    @click="deleteContactRecord(data)"
                    class=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- address popup -->
        <div v-if="isAddressPopup">
          <CompanyAddress
            :recordData="addressProps"
            :primarykey="primarykey"
            @closePopup="closeAddress"
          />
        </div>
        <!-- contact popup -->
        <div v-if="isContactPopup">
          <CompanyContact
            :recordData="contactProps"
            @closePopup="closeContact"
          />
        </div>
        <!-- show added address -->

        <div>
          <div align="right" class="mt-2 mb-2">
            <button
              type="button"
              class="btn btn-dark save_btn"
              @click="btnSave"
            >
              Update
            </button>
          </div>
        </div>

        <!--<div>
          <v-select
            v-model="country"
            label="name"
            :options="filteredCountry[0].data"
            @search="fetchCountryValues"
            @input="onCountrySelected($event)"
            placeholder="Enter country"
            class="single-value remove-close-btn remove-dropdown-icon"
          ></v-select>
        </div>-->
      </div>
      <modal
        v-if="showRegistrationModal"
        @closeModal="updateRegistrationModalValues([false, ''])"
      >
        <div slot="body">{{ this.modalRegistrationMessage }}</div>
      </modal>
    </div>
  </div>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Slug from '.././../common/Slug'
import modal from '../../../common/Modal'
// import Location from '../../../components/common/Location'
import CompanyContact from '../../company/CompanyContact.vue'
import CompanyAddress from '../../company/CompanyAddress.vue'
import appConstants from '../../../appConstants'

export default {
  name: 'Registration',
  components: {
    Slug,
    modal,
    CompanyAddress,
    CompanyContact
  },
  data() {
    return {
      contact_type: appConstants.contact_type,
      isAddressPopup: false,
      isContactPopup: false,
      primarykey: false,
      addressProps: {},
      contactProps: {},
      registrationData: {
        id: '',
        company_name: '',
        slug: '',
        category: '',
        subCategory: [],
        short_desrciption: '',
        website: '',

        city: '',
        gst_number: '',
        contactDetails: [
          // {
          //   id: '',
          //   name: '',
          //   address: '',
          //   locality: '',
          //   country: '',
          //   state: '',
          //   city: '',
          //   email: '',
          //   country_code: '',
          //   phone: '',
          //   country_iso: '',
          //   state_iso: '',
          //   lat: '',
          //   lng: '',
          //   pin: ''
          // }
        ]
      },
      isSlugAvailable: null,
      submitted: false,
      remainingShortDescLength: 60,
      shortDescTotalLength: 60,
      isDataLoaded: false,

      addContactLimit: true, //TODO:remove
      showDeleteButton: false,
      isConCode: [],
      isStateCode: [],
      contactsToDelete: [],
      contactCount: 0, //TODO:remove

      country: 'India',
      isInIndia: false,
      enum_country_iso: appConstants.country_iso
    }
  },
  validations() {
    return {
      registrationData: {
        company_name: { required, maxLength: maxLength(60) },
        category: { required },
        subCategory: { required },
        short_desrciption: {
          required,
          minLength: minLength(20),
          maxLength: maxLength(60)
        },
        slug: { required }
      }
    }
  },
  watch: {
    getRegistrationData: {
      handler(val) {
        // console.log('watch =>', val)
        this.setRegistrationData(val)
        this.setGSTdropdownVisibility(this.getCurrentCompanyData.country_iso)
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters('dropdownValues', [
      'getCategoryOptions',
      'getSubcategoryOptions'
    ]),
    ...mapGetters('registration', [
      'showRegistrationModal',
      'modalRegistrationMessage',
      'getRegistrationData'
    ]),
    ...mapGetters(['userData']),
    ...mapGetters('companyData', ['getCurrentCompanyData'])
  },
  methods: {
    ...mapActions('dropdownValues', [
      'fetchCategoryData',
      'fetchSubCategories'
    ]),
    ...mapActions('registration', [
      'fetchRegistrationData',
      'updateRegistrationData',
      'deleteCompnayAddress',
      'deleteContactUserContact'
    ]),
    ...mapMutations('registration', ['updateRegistrationModalValues']),
    ...mapMutations('companyData', ['setCurrentCompanyData']),

    checkLocality(add, locality) {
      let res = add.includes(locality)
      if (res == true) {
        return ''
      } else {
        return locality
      }
    },

    isAddUserButtonVisible() {
      let arr = []
      this.registrationData.contactDetails.map((x) => {
        if (x.contact_type == this.contact_type.USER) {
          arr.push(x)
          // return x
        }
      })
      if (arr.length >= 4) {
        return false
      } else {
        return true
      }
    },
    isDeleteUserContacts() {
      let arr = []
      this.registrationData.contactDetails.map((x) => {
        if (x.contact_type == this.contact_type.USER) {
          arr.push(x)
        }
      })
      if (arr.length == 1) {
        return false
      } else {
        return true
      }
    },
    setContactKey(index) {
      return 'contact_' + index
    },
    setAddressKey(index) {
      return 'address_' + index
    },
    addAddress() {
      let arr = this.registrationData.contactDetails.map((x) => {
        if (x.contact_type == this.contact_type.COMPANY) {
          return x
        }
        // else {
        //   return true
        // }
      })
      this.primarykey = arr.length > 0 ? false : true
      // console.log(this.primarykey)
      this.addressProps = null
      this.isAddressPopup = true
    },
    closeAddress() {
      this.isAddressPopup = false
    },
    editAddressRecord(data) {
      //console.log('in editAddressRecord()')
      this.isAddressPopup = true
      if (data.is_primary) {
        this.primarykey = data.is_primary
      } else {
        this.primarykey = null
      }
      this.addressProps = Object.assign({}, data)
    },
    deleteAddressRecord(data) {
      // console.log('in deleteAddressRecord()', data)
      let obj = {
        company_id: this.getCurrentCompanyData.id,
        contact_ids: []
      }
      obj.contact_ids.push(data.id)
      // console.log(obj)
      this.deleteCompnayAddress(obj)
        .then((response) => {
          console.log('delete compnay address success ', response)
        })
        .catch((error) => {
          console.log('delete compnay address catch ', error)
          // this.showModal = true
          // this.modal_message = error
        })
    },
    contactPopup() {
      this.isContactPopup = true
      this.contactProps = null
    },
    closeContact() {
      this.isContactPopup = false
    },
    editContactRecord(data) {
      //console.log('in editContactRecord()')
      this.isContactPopup = true
      this.contactProps = Object.assign({}, data)
    },
    deleteContactRecord(data) {
      console.log('in deleteContactRecord()', data)
      if (!this.isDeleteUserContacts()) {
        this.updateRegistrationModalValues([
          true,
          'Atleast one contact is required'
        ])
        return
      }
      let obj = {
        company_id: this.getCurrentCompanyData.id,
        contact_ids: []
      }
      obj.contact_ids.push(data.id)
      //console.log(obj)
      this.deleteContactUserContact(obj).then(() => {
        //console.log('delete compnay address success ')
      })
    },
    getPortFolioLink(value) {
      this.registrationData.slug = value.slugText
      this.isSlugAvailable = value.isSlugAvailable
    },
    checkIsSlugAvailable() {
      if (this.isSlugAvailable === '' || this.isSlugAvailable == null) {
        return true
      } else {
        return this.isSlugAvailable
      }
    },
    fetchSubCategoryAsPerCategory() {
      this.registrationData.subCategory = []
      if (
        this.registrationData.category != undefined &&
        this.registrationData.category != null &&
        this.registrationData.category != ''
      ) {
        this.fetchSubCategories(this.registrationData.category)
      }
    },
    getLocationValue(index, value) {
      //console.log('in getLocationValue =>', value)
      this.registrationData.contactDetails[index].country = value.country
      this.registrationData.contactDetails[index].country_iso =
        value.country_iso
      this.registrationData.contactDetails[index].state = value.state
      this.registrationData.contactDetails[index].state_iso = value.state_iso
      this.registrationData.contactDetails[index].city = value.city
      this.registrationData.contactDetails[index].pin = value.pincode
      this.registrationData.contactDetails[index].country_code =
        value.country_code
    },
    getShortDescriptionLength(e) {
      this.remainingShortDescLength = this.shortDescTotalLength - e.length
    },
    setRegistrationData(data) {
      this.registrationData.id = data.id
      this.registrationData.company_name = data.name
      this.registrationData.slug = data.slug
      this.registrationData.category = data.category
      this.registrationData.subCategory = data.sub_categories
      this.registrationData.short_desrciption = data.short_desrciption
      this.registrationData.website = data.website
      this.registrationData.gst_number = data.gst_number
      if (data.contacts.length > 0) {
        this.setContactValues(data.contacts)
      }
    },
    getDataToSave() {
      var data = {
        id: this.registrationData.id,
        name: this.registrationData.company_name,
        slug: this.registrationData.slug,
        category: this.registrationData.category,
        sub_categories: this.registrationData.subCategory,
        short_desrciption: this.registrationData.short_desrciption,
        website: this.registrationData.website,
        gst_number: this.registrationData.gst_number
      }
      return data
    },
    btnSave() {
      this.submitted = true
      if (
        this.$v.registrationData.$invalid ||
        !(this.isSlugAvailable != null ? this.isSlugAvailable : true)
      ) {
        console.log('Required data')
        return false
      }
      let companyData = this.getDataToSave()
      let obj = {
        id: this.registrationData.id,
        companyData: companyData
      }
      this.updateRegistrationData(obj)
    },
    // ****************************************
    addContact() {
      if (this.registrationData.contactDetails.length === 3) {
        this.addContactLimit = false
      }
      this.showDeleteButton = true
      this.registrationData.contactDetails.push({
        name: '',
        address: '',
        locality: '',
        country: '',
        state: '',
        city: '',
        email: '',
        phone: '',
        country_code: '',
        country_iso: '',
        state_iso: '',
        lat: '',
        lng: '',
        pin: ''
      })
      this.isConCode.push(false)
      this.isStateCode.push(false)
    },
    getContactNumber(index) {
      return parseInt(index) + 1
    },
    showContactDeleteButton() {
      if (this.registrationData.contactDetails.length > 1) {
        return true
      } else {
        return false
      }
    },
    deleteContact(counter) {
      if (this.registrationData.contactDetails.length === 1) {
        return
      }
      let abc = this.registrationData.contactDetails.splice(counter, 1)
      this.contactsToDelete.push(abc[0])
      if (this.registrationData.contactDetails.length === 1) {
        this.showDeleteButton = false
      }
      this.isConCode.splice(counter, 1)
      this.isStateCode.splice(counter, 1)
      if (this.registrationData.contactDetails.length <= 3) {
        this.addContactLimit = true
      }
    },
    contactUpdated(counter) {
      //console.log(counter)
      if (counter < this.contactCount) {
        this.isContactUpdated = true
      }
    },
    setContactValues(contactData) {
      this.registrationData.contactDetails = []
      this.isConCode = []
      this.isStateCode = []

      contactData.map((res, index) => {
        if (this.registrationData.contactDetails.length < index + 1) {
          this.addContact()
        }
        this.registrationData.contactDetails[index].id = res.id
        this.registrationData.contactDetails[index].name = res.name
        this.registrationData.contactDetails[index].address = res.address
        this.registrationData.contactDetails[index].locality = res.locality
        this.registrationData.contactDetails[index].email = res.email
        this.registrationData.contactDetails[index].phone = res.phone
        this.registrationData.contactDetails[index].country = res.country
        this.registrationData.contactDetails[index].state = res.state
        this.registrationData.contactDetails[index].city = res.city
        this.registrationData.contactDetails[index].country_code = res.code
        this.registrationData.contactDetails[index].country_iso =
          res.iso_code.country
        this.registrationData.contactDetails[index].state_iso =
          res.iso_code.state
        if (res.iso_code.country === '') {
          this.isConCode[index] = true
        } else {
          this.isConCode[index] = false
        }
        if (res.iso_code.state === '') {
          this.isStateCode[index] = true
        } else {
          this.isStateCode[index] = false
        }
        this.registrationData.contactDetails[index].lat = res.coordinates.lat
        this.registrationData.contactDetails[index].lng = res.coordinates.lng
        this.registrationData.contactDetails[index].pin = res.pin
        this.registrationData.contactDetails[index].contact_type =
          res.contact_type
        this.registrationData.contactDetails[index].is_primary = res.is_primary
        // if (res.is_primary) {
        //   this.registrationData.contactDetails[index].is_primary =
        //     res.is_primary
        // }
        if (res.designation) {
          this.registrationData.contactDetails[index].designation =
            res.designation
        } else {
          this.registrationData.contactDetails[index].designation = ''
        }
        index++
      })

      this.setArray(this.registrationData.contactDetails)
    },
    setGSTdropdownVisibility(country_iso) {
      if (country_iso == this.enum_country_iso.INDIA) {
        this.isInIndia = true
      } else {
        this.isInIndia = false
      }
    },
    setArray(arr) {
      // console.log("data", arr)
      let trueFirst = arr.sort(
        (a, b) => Number(b.is_primary) - Number(a.is_primary)
      )
      // console.log(trueFirst)
      return trueFirst
    }
  },
  created() {
    // this.registrationData.id = 'f4360fae-be63-4c55-a937-06a61f665565'
    this.registrationData.id = this.getCurrentCompanyData.id
    this.fetchCategoryData()
    this.setGSTdropdownVisibility(this.getCurrentCompanyData.country_iso)

    this.fetchRegistrationData(this.registrationData.id).then((response) => {
      //To set current status or other changed data in PQQ
      this.setCurrentCompanyData(response)
      // End

      this.setRegistrationData(response)
      this.registrationData.category = response.category
      this.fetchSubCategoryAsPerCategory()
      this.registrationData.subCategory = response.sub_categories
      this.getShortDescriptionLength(this.registrationData.short_desrciption)
      this.isDataLoaded = true
    })
  }
  // beforeDestroy() {
  //   alert('before un mount')
  // }
}
</script>

<style>
.cls-registration .contact-dtls {
  background-color: #f2f2f2;
  border-radius: 5px;
  padding: 6px;
}

.contact-details-card input[type='text'],
.contact-details-card input[type='email'] {
  height: 35px;
  background-color: #ffffff;
}

.contact-details-card .vs__dropdown-toggle {
  min-height: 35px !important;
  background-color: #ffffff !important;
}
.contact-details-card .vs__selected {
  background-color: #ffffff !important;
}
.back-color {
  background-color: #f2f2f2;
  border-radius: 5px;
}
.contact-name {
  font-weight: 800;
  font-size: 18px;
  color: black;
}
.contact-designation {
  font-weight: 400;
  font-size: 14px;
  color: #767676;
}
.contact-img {
  width: 34px;
}
.contact-phone-email-add {
  font-size: 14px;
  font-weight: normal;
  color: black;
  margin-left: 10px;
}
.contact-edit-delete {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
  width: 100%;
  height: 100%;
  padding: 16px 12px 16px 12px;
}
.contact-edit {
  width: 24px;
}
.contact-address {
  font-size: 14px;
  /* font-weight: 600; */
  color: black;
}

.primary-address-div {
  font-size: 12px;
  color: #000;
  font-weight: 600;
  text-align: center;
  padding: 10px;
  display: flex;
  background-color: #d8d8d8;
  border-radius: 5px;
  width: 135px;
}
@media only screen and (max-width: 600px) {
  .contact-name {
    font-weight: 800;
    font-size: 14px;
    color: black;
  }
  .contact-designation {
    font-weight: 300;
    font-size: 12px;
    color: #767676;
  }
  .contact-img {
    width: 28px;
  }
  .contact-phone-email-add {
    font-size: 14px;
    font-weight: normal;
    color: black;
    margin-left: 6px;
  }
  .contact-edit {
    width: 24px;
  }
  .contact-address {
    font-size: 12px;
    font-weight: 600;
    color: black;
  }
}
</style>
