<template>
  <div>
    <modal @closeModal="hideModal">
      <div slot="body" class="text-left">
        <div class="page-title"><h4>Company Address</h4></div>
        <div class="form-group">
          <label for="address">Address</label>
          <input
            type="text"
            name="address"
            class="form-control"
            autocomplete="off"
            v-model="form_data.address"
          />
          <div
            v-if="submitted && !$v.form_data.address.required"
            class="invalid d-block"
          >
            Enter Address
          </div>
        </div>
        <div class="form-group">
          <label for="address"
            >Locality (Make your Address traceable on Google)</label
          >
          <input
            type="text"
            name="locality"
            class="form-control"
            autocomplete="off"
            v-model="form_data.locality"
          />
          <div
            v-if="submitted && !$v.form_data.locality.required"
            class="invalid d-block"
          >
            Enter locality
          </div>
        </div>
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
            v-if="submitted && !$v.form_data.city.required"
            class="invalid d-block"
          >
            Select city
          </div>
        </div>
        <div>
          <!-- <input
            type="checkbox"
            name="is_primary"
            v-model="form_data.is_primary"
            :disabled="form_data.is_primary == true"
          />
          <label
            for="is_primary"
            class="app-primary-text-color font-weight-bold ml-2 active-text"
          >
            Primary address
          </label> -->
          <b-form-checkbox
            id="is_primary"
            v-model="form_data.is_primary"
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
        </div>
      </div>
      <div slot="footer" class="justify-content-end">
        <button
          class="ml-2 btn"
          variant="outline-dark"
          @click.prevent="hideModal"
        >
          <span class="p-2">Cancel</span>
        </button>
        <button
          v-if="!form_data.id"
          class="ml-2 btn"
          variant="outline-dark"
          @click.prevent="saveAddress"
        >
          <span class="p-2">Save</span>
        </button>
        <button
          v-if="form_data.id"
          class="ml-2 btn"
          variant="outline-dark"
          @click.prevent="updateAddress"
        >
          <span class="p-2">Update</span>
        </button>
      </div>
    </modal>
  </div>
</template>

<script>
import modal from '../../common/Modal.vue'
import { required } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'CompanyAddress',
  components: {
    modal
  },
  computed: {
    ...mapGetters('dropdownValues', ['getLocation']),
    ...mapGetters('companyData', ['getCurrentCompanyData'])
  },
  validations() {
    return {
      form_data: {
        address: { required },
        locality: { required },
        city: { required }
      }
    }
  },
  mounted() {
    if (this.recordData != null) {
      this.form_data = this.recordData
      this.isPrimary_disabled = this.form_data.is_primary
      this.city_displayText = `${this.recordData.city}, ${this.recordData.state}, ${this.recordData.country}`
    }
  },
  props: {
    recordData: {
      type: Object,
      default: null
    },
    primarykey: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      submitted: false,
      isPrimary_disabled: false,
      city_displayText: '',
      form_data: {
        address: '',
        city: '',
        country: '',
        country_code: '',
        country_iso: '',
        email: '',
        id: '',
        lat: '',
        lng: '',
        locality: '',
        name: '',
        phone: '',
        pin: '',
        state: '',
        state_iso: '',
        designation: '',
        is_primary: this.primarykey
      }
    }
  },
  methods: {
    // ...mapMutations('dropdownValues', ['setLocation']),
    ...mapActions('dropdownValues', ['fetchLocationFromCityName']),
    ...mapActions('registration', [
      'saveCompnayAddress',
      'updateCompnayAddress'
    ]),
    hideModal() {
      this.$emit('closePopup')
    },
    saveAddress() {
      this.submitted = true
      if (this.$v.form_data.$invalid) {
        return
      }
      if (this.is_primary) {
        this.form_data.is_primary = this.is_primary
      }
      console.log('saveAddress =>', this.form_data)
      let obj = {
        contacts: [],
        company_id: this.getCurrentCompanyData.id
      }
      obj.contacts.push(this.form_data)
      this.saveCompnayAddress(obj).then(() => {
        console.log('save api call success!')
        this.hideModal()
      })
    },
    updateAddress() {
      this.submitted = true
      if (this.$v.form_data.$invalid) {
        return
      }
      if (this.is_primary == true) {
        this.form_data.is_primary = this.is_primary
      }
      //  else {
      //   delete this.form_data.is_primary
      // }
      let obj = {
        company_id: this.getCurrentCompanyData.id,
        data: {
          contacts: []
        }
      }
      obj.data.contacts.push(this.form_data)
      // console.log('updateAddress =>', obj)
      this.updateCompnayAddress(obj).then((result) => {
        console.log('update api call success!', result)
        if (result.status == 'success') {
          this.hideModal()
        }
      })
    },
    getLocationData(cityName) {
      // if (cityName) {
      //   this.setLocation([''])
      // }
      this.fetchLocationFromCityName(cityName)
    },
    selectedCity(data) {
      if (data == null) {
        this.form_data.country = ''
        this.form_data.country_iso = ''
        // this.form_data.country_code = data.country.code
        this.form_data.state = ''
        this.form_data.state_iso = ''
        this.form_data.city = ''
        this.form_data.lat = 0.0
        this.form_data.lng = 0.0
      } else {
        this.form_data.country = data.country.name
        this.form_data.country_iso = data.country.iso2
        // this.form_data.country_code = data.country.code
        this.form_data.state = data.state.name
        this.form_data.state_iso = data.state.state_iso
        this.form_data.city = data.name //data.name = pune && data.city = pune,maharashtra,india
        this.form_data.lat = data.latitude
        this.form_data.lng = data.longitude
      }
    }
  }
}
</script>

<style scoped>
/* input {
  border: none !important;
} */
.modal-container {
  background-color: #f2f2f2 !important;
}
/* .modal-footer {
  justify-content: end !important;
} */
</style>
