<template>
  <div class="form-group">
    <label>Select Locations to target</label>

    <b-form-group v-slot="{ ariaDescribedby }">
      <b-form-radio-group
        id="ad_location_group"
        v-model="location_data.all_over_world"
        :aria-describedby="ariaDescribedby"
      >
        <b-form-radio
          :value="boolean_true"
          @change="onAllOverWorldSelection($event)"
          >All Over World</b-form-radio
        >
        <br />
        <b-form-radio :value="boolean_false">Country</b-form-radio>
      </b-form-radio-group>
    </b-form-group>

    <v-select
      label="name"
      :disabled="target_location.all_over_world"
      :searchable="true"
      v-model="location_data.country.name"
      :options="filteredCountry[0].data"
      @search="fetchCountryValues"
      @input="onCountrySelected($event)"
      :closeOnSelect="true"
      class="remove-dropdown-icon"
    />
    <div
      v-if="is_execute_validation && !$v.location_data.country.name.required"
      class="invalid-feedback d-block"
    >
      Country is required
    </div>

    <div v-if="location_data.country.name != ''">
      <label
        >Target States
        <span class="fontSize12">(Select multiple states)</span></label
      >
      <v-select
        v-model="location_data.states"
        multiple
        label="name"
        :options="filteredState[0].data"
        @search="fetchStateValues($event)"
        @input="onStateChanged($event)"
        placeholder="Enter state"
        class="single-value remove-close-btn remove-dropdown-icon form-control options-on-search-only"
      >
      </v-select>
    </div>

    <div v-if="location_data.country.name != ''">
      <label
        >Target Cities
        <span class="fontSize12">(Select multiple cities)</span></label
      >
      <v-select
        v-model="location_data.cities"
        multiple
        label="name"
        :options="filteredCitiesOfCountry[0].data"
        @search="fetchCitiesValues($event)"
        @input="onCityChanged($event)"
        placeholder="Enter state"
        class="single-value remove-close-btn remove-dropdown-icon form-control options-on-search-only"
      >
      </v-select>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
// eslint-disable-next-line no-unused-vars
import { required, numeric, requiredIf } from 'vuelidate/lib/validators'

export default {
  name: 'TargetLocation',
  // props: ['is_execute_validation', 'target_object'],
  props: {
    is_execute_validation: {
      type: Boolean,
      required: true,
      default: false
    },
    target_location: {
      type: Object,
      required: true,
      default: () => ({
        all_over_world: true,
        country: {
          name: '',
          iso2: ''
        },
        states: [],
        cities: []
      })
    }
  },

  data() {
    return {
      execute_validation: this.is_execute_validation,
      location_data: this.target_location,
      boolean_true: true,
      boolean_false: false,
      selected_states: []
    }
  },
  validations() {
    return {
      location_data: {
        country: {
          name: {
            required: requiredIf(function () {
              return !this.location_data.all_over_world
            })
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters('dropdownValues', [
      'filteredCountry',
      'filteredState',
      'filteredCitiesOfCountry'
    ])
  },
  created() {},
  methods: {
    ...mapMutations('dropdownValues', [
      'setStateEmpty',
      'setCitiesOFCountryEmpty'
    ]),
    ...mapActions('dropdownValues', [
      'searchContry',
      'searchState',
      'searchCitiesOfCountry'
    ]),
    emitLocationChangeEvent() {
      this.$emit('target_location_value_changed', this.location_data)
    },
    fetchCountryValues(text) {
      if (text === undefined) {
        return
      }
      this.searchContry(text)
    },
    fetchStateValues(text) {
      if (text === undefined || text == '') {
        return
      }
      let data = {
        country: this.location_data.country.iso2,
        state: text
      }
      this.searchState(data)
    },
    fetchCitiesValues(text) {
      if (text === undefined || text == '') {
        return
      }
      let data = {
        country: this.iso2,
        state: this.state_iso,
        city: text
      }
      this.searchCitiesOfCountry(data)
    },
    onCountrySelected(item) {
      if (item == null) {
        this.location_data.country.name = ''
        this.location_data.country.iso2 = ''
      } else {
        this.location_data.country.name = item.name
        this.location_data.country.iso2 = item.iso2
      }

      this.location_data.states = []
      this.location_data.cities = []

      this.setStateEmpty()
      this.setCitiesOFCountryEmpty()

      this.emitLocationChangeEvent()
    },
    onStateChanged(item) {
      this.emitLocationChangeEvent()
    },
    onCityChanged(item) {
      this.emitLocationChangeEvent()
    },
    onAllOverWorldSelection(value) {
      console.log(value)
      this.location_data.country.name = ''
      this.location_data.country.iso2 = ''
      this.location_data.country.states = []
      this.location_data.country.cities = []

      this.emitLocationChangeEvent()
    }
  }
}
</script>
