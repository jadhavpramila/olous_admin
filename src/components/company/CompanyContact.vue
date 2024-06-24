<template>
  <div>
    <modal @closeModal="hideModal">
      <div slot="body" class="text-left">
        <div class="page-title"><h4>Contacts Details</h4></div>
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            name="name"
            class="form-control"
            autocomplete="off"
            v-model="form_data.name"
          />
          <div
            v-if="submitted && !$v.form_data.name.required"
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
            v-model="form_data.designation"
          />
          <div
            v-if="submitted && !$v.form_data.designation.required"
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
              ></v-select>
              <div
                v-if="submitted && !$v.form_data.country_code.required"
                class="invalid-feedback d-block"
              >
                Country is required
              </div>
            </div>
            <div class="flex-grow-1 col-lg-7">
              <input
                type="text"
                name="phone"
                class="form-control show-placeholder options-on-search-only"
                autocomplete="off"
                v-model="form_data.phone"
                placeholder="Mobile No."
              />
              <div
                v-if="submitted && !$v.form_data.phone.required"
                class="invalid-feedback d-block"
              >
                Phone number is required
              </div>
              <div
                v-if="submitted && !$v.form_data.phone.numeric"
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
            type="text"
            name="email"
            class="form-control"
            autocomplete="off"
            v-model="form_data.email"
          />
          <div
            v-if="submitted && !$v.form_data.email.required"
            class="invalid-feedback d-block"
          >
            Enter email
          </div>
          <div
            v-if="submitted && !$v.form_data.email.email"
            class="invalid-feedback d-block"
          >
            Enter valid email
          </div>
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
          @click.prevent="save"
        >
          <span class="p-2">Save</span>
        </button>
        <button
          v-if="form_data.id"
          class="ml-2 btn"
          variant="outline-dark"
          @click.prevent="update"
        >
          <span class="p-2">Update</span>
        </button>
      </div>
    </modal>
  </div>
</template>

<script>
import modal from '../../common/Modal.vue'
import { required, email, numeric } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'CompanyContact',
  components: {
    modal
  },
  mounted() {
    this.setAddressArr()
    // console.log(this.recordData)
    if (this.recordData != null) {
      this.form_data = this.recordData
      this.selected_country = this.recordData.country_code
    }
  },
  props: {
    recordData: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapGetters('companyData', ['getCurrentCompanyData']),
    ...mapGetters('dropdownValues', ['filteredCountry'])
  },
  validations() {
    return {
      form_data: {
        name: { required },
        designation: { required },
        email: { required, email },
        phone: { required, numeric },
        country_code: { required }
      }
    }
  },
  data() {
    return {
      submitted: false,
      arr: [],
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
        designation: ''
      },
      selected_country: ''
    }
  },

  methods: {
    ...mapActions('registration', ['saveContact', 'updateContact']),
    ...mapActions('dropdownValues', ['searchContry']),
    setOption(data) {
      let str = data.substring(0, 40)
      let res = str + '...'
      return res
    },
    hideModal() {
      this.$emit('closePopup')
    },
    save() {
      this.submitted = true
      if (this.$v.form_data.$invalid) {
        return
      }
      console.log('saveContact =>', this.form_data)
      let obj = {
        contacts: [],
        company_id: this.getCurrentCompanyData.id
      }
      obj.contacts.push(this.form_data)
      this.saveContact(obj).then(() => {
        console.log('save api call success!')
        this.hideModal()
      })
    },
    update() {
      this.submitted = true
      if (this.$v.form_data.$invalid) {
        return
      }
      let obj = {
        company_id: this.getCurrentCompanyData.id,
        data: {
          contacts: []
        }
      }
      obj.data.contacts.push(this.form_data)
      console.log('update contact =>', obj)
      this.updateContact(obj).then((result) => {
        console.log('update api call success!', result)
        if (result.status == 'success') {
          this.hideModal()
        }
      })
    },
    setAddressArr() {
      let obj = {
        id: 0,
        address:
          'Olous House, Pancard Club Road,Baner 414103 /n Olous House, Pancard Club Road,Baner 414103'
      }
      for (let i = 0; i < 5; i++) {
        obj.id = i + 1
        this.arr.push(obj)
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
        this.form_data.country_code = ''
        this.selected_country = ''
      } else {
        this.form_data.country_code = value.phone_code
        this.selected_country = value.phone_code
      }
    }
  }
}
</script>

<style>
input .dropdown {
  border: none !important;
}

/* .modal-footer {
  justify-content: end !important;
} */
.invalid {
  font-size: 10px;
  color: red;
}
</style>
