<template>
  <div class="cls-location">
    <div class="row">
      <div class="col-lg-6">
        <label>Country</label>
        <v-select
          v-model="country"
          label="name"
          :options="filteredCountry[0].data"
          @search="fetchCountryValues"
          @input="onCountrySelected($event)"
          placeholder="Enter country"
          class="single-value remove-close-btn remove-dropdown-icon form-control options-on-search-only"
        ></v-select>

        <div
          v-if="execute_validation && !$v.country.required"
          class="invalid-feedback d-block"
        >
          Country is required
        </div>
      </div>
      <div class="col-lg-6">
        <label>State</label>
        <v-select
          v-model="state"
          label="name"
          :options="filteredState[0].data"
          @search="fetchStateValues($event)"
          @input="onStateSelected($event)"
          placeholder="Enter state"
          class="single-value remove-close-btn remove-dropdown-icon form-control options-on-search-only"
        >
        </v-select>

        <div
          v-if="execute_validation && !$v.state.required"
          class="invalid-feedback d-block"
        >
          State is required
        </div>
      </div>
      <div class="col-lg-6">
        <label>City</label>
        <v-select
          v-model="city"
          label="name"
          :options="filteredCities[0].data"
          @search="fetchCitiesValues($event)"
          @input="onCitySelected($event)"
          placeholder="Enter city"
          class="single-value remove-close-btn remove-dropdown-icon form-control options-on-search-only"
        ></v-select>
        <div
          v-if="execute_validation && !$v.city.required"
          class="invalid-feedback d-block"
        >
          City is required
        </div>
      </div>

      <!--<div class="col-lg-6">
        <label>Pincode</label>
        <input
          type="text"
          class="form-control input-lg"
          @blur="onPincodeChange($event)"
          v-model="pincode"
        />
        <div
          v-if="is_execute_validation && !$v.pincode.required"
          class="invalid-feedback d-block"
        >
          Pincode is required
        </div>
        <div
          v-if="is_execute_validation && !$v.pincode.numeric"
          class="invalid-feedback d-block"
        >
          Pincode is invalid
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'LocationWithoutPin',
  props: [
    'is_label_visible',
    'is_execute_validation',
    'country_value',
    'country_iso_value',
    'state_value',
    'state_iso_value',
    'city_value',
    'country_code_value'
  ],
  mounted() {
    this.label_visible = this.is_label_visible
    this.execute_validation = this.is_execute_validation
    this.country = this.country_value
    this.country_iso = this.country_iso_value
    this.state = this.state_value
    this.state_iso = this.state_iso_value
    this.city = this.city_value
    this.country_code = this.country_code_value
  },
  data() {
    return {
      label_visible: this.is_label_visible,
      execute_validation: this.is_execute_validation,
      country: this.country_value,
      country_iso: this.country_iso_value,
      state: this.state_value,
      state_iso: this.state_iso_value,
      city: this.city_value,
      country_code: this.country_code_value,
      lat: '',
      lng: ''
    }
  },
  validations() {
    return {
      country: { required },
      state: { required },
      city: { required }
      // pincode: { required, numeric }
    }
  },
  computed: {
    ...mapGetters('dropdownValues', [
      'filteredCountry',
      'filteredState',
      'filteredCities'
    ])
  },
  methods: {
    ...mapMutations('dropdownValues', ['setStateEmpty', 'setCityEmpty']),
    ...mapActions('dropdownValues', [
      'searchContry',
      'searchState',
      'searchCity'
    ]),

    emitLocationChangeEvent() {
      console.log(this.country, this.country_iso)
      this.$emit('location_changed', {
        country: this.country,
        country_iso: this.country_iso,
        state: this.state,
        state_iso: this.state_iso,
        city: this.city,
        country_code: this.country_code,
        lat: this.lat,
        lng: this.lng
      })
    },
    fetchCountryValues(text) {
      if (text === undefined) {
        return
      }
      this.searchContry(text)
    },
    onCountrySelected(item) {
      console.log(item)
      this.setCountryValue(item)
    },
    setCountryValue(item) {
      if (item == null) {
        this.country = ''
        this.country_iso = ''
        this.country_code = ''
      } else {
        this.country = item.name
        this.country_iso = item.iso2
        this.country_code = item.phone_code
      }
      this.state = ''
      this.state_iso = ''

      this.city = ''

      this.setStateEmpty()
      this.setCityEmpty()
      this.emitLocationChangeEvent()
    },
    fetchStateValues(text) {
      if (text === undefined || text == '') {
        return
      }
      let data = {
        country: this.country_iso,
        state: text
      }
      this.searchState(data)
    },
    onStateSelected(item) {
      this.setStateValues(item)
    },
    setStateValues(item) {
      if (item != null) {
        this.state = item.name
        this.state_iso = item.state_code
      } else {
        this.state = ''
        this.state_iso = ''
      }
      this.city = ''

      this.setCityEmpty()
      this.emitLocationChangeEvent()
    },
    fetchCitiesValues(text) {
      if (text === undefined || text == '') {
        return
      }
      let data = {
        country: this.country_iso,
        state: this.state_iso,
        city: text
      }
      this.searchCity(data)
    },
    onCitySelected(item) {
      this.setCityValue(item)
    },
    setCityValue(item) {
      console.log(item)
      if (item != null) {
        this.city = item.name
        this.lat = item.latitude
        this.lng = item.longitude
      } else {
        this.city = ''
      }
      this.emitLocationChangeEvent()
    }
    // onPincodeChange(e) {
    //   console.log(e)
    //   this.emitLocationChangeEvent()
    // }
  }
}
</script>
