<template>
  <div class="cls-analytics form-conatiner">
    <div class="form-container">
      <div class="page-body mt-10">
        <div class="row">
          <div class="col-lg-4 date-row">
            <label>From Date</label>

            <b-form-datepicker
              id="datepicker-From-vendor"
              placeholder="date"
              size="sm"
              locale="en"
              v-model="from_date"
              :value-as-date="true"
              @input="checkFromDate()"
              :date-format-options="{
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                weekday: 'short'
              }"
              :max="maxDate"
            ></b-form-datepicker>
            <div v-if="isFromDateGreater" class="invalid-feedback d-block">
              Select date less than to date
            </div>
          </div>
          <div class="col-lg-4 date-row">
            <label>To Date</label>
            <b-form-datepicker
              id="datepicker-to-vendor"
              placeholder="date"
              size="sm"
              locale="en"
              v-model="to_date"
              :value-as-date="true"
              :date-format-options="{
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                weekday: 'short'
              }"
              :max="maxDate"
              :min="minDate"
            ></b-form-datepicker>
          </div>
          <div class="col-lg-4 date-row">
            <label>Country</label>
            <v-select
              v-model="country"
              label="name"
              :options="filteredCountry[0].data"
              @search="fetchCountryValues"
              @input="onCountrySelected($event)"
              placeholder="Enter country"
              @clear="clickClear()"
              class="single-value display-close-btn remove-dropdown-icon form-control options-on-search-only"
            ></v-select>
            <div v-if="isCountryNotSelected" class="invalid-feedback d-block">
              Select country first
            </div>
          </div>
          <div class="col-lg-4 date-row">
            <label>City</label>

            <v-select
              v-model="city"
              label="name"
              :options="getCitiesFromCountry[0].data"
              @search="fetchCitiesValues($event)"
              @input="onCitySelected($event)"
              placeholder="Enter city"
              class="single-value display-close-btn remove-dropdown-icon form-control options-on-search-only"
            ></v-select>
          </div>
          <div class="col-lg-4 button-row">
            <button class="btn w-50" @click="getAnalytics">
              Get Analytics
            </button>
          </div>
        </div>
        <!--<div class="d-flex my-4 flex-column">
          <span class="analytics-subtitle">
            Total User Count:
             {{ getter_newUserAnalytics.totalUserCount }} 
          </span>
          <span class="analytics-subtitle">
            Business User Count:
           {{ getter_newUserAnalytics.businessOwnerCount }} 
          </span>
        </div>-->
        <div>
          <apexchart
            width="400"
            type="pie"
            :options="options"
            :series="series"
          ></apexchart>
        </div>
      </div>
      <!-- Line Chart -->
    </div>
  </div>
</template>

<script>
//import appConstants from '../../../appConstants.js'
import moment from 'moment'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'PieChartVendorCatagory',
  components: {
    apexchart: VueApexCharts
  },
  data() {
    return {
      to_date: new Date(),
      from_date: '',
      city: '',
      country: '',
      isCountryNotSelected: false,
      options: {
        labels: [],
        title: {
          text: 'Vendor count according to catagory',
          align: 'left'
        }
      },
      series: [],
      maxDate: '',
      minDate: '',
      isFromDateGreater: false
    }
  },
  computed: {
    ...mapGetters('analytics', ['getter_vendorCatagoryAnalytics']),
    ...mapGetters('dropdownValues', ['filteredCountry', 'getCitiesFromCountry'])
  },
  methods: {
    ...mapMutations('dropdownValues', ['setCityEmpty']),
    ...mapActions('analytics', ['action_fetchVendorCatagoryAnalytics']),
    ...mapActions('dropdownValues', ['searchContry', 'searchCityFromCountry']),

    async getAnalytics() {
      var from_date = this.from_date
      from_date.setHours(0)
      from_date.setMinutes(0)
      from_date.setSeconds(0)
      var to_date = this.to_date
      to_date.setHours(23)
      to_date.setMinutes(59)
      to_date.setSeconds(0)

      var data = {
        from_date: moment(from_date).format('YYYY-MM-DDT00:00:00') + 'Z',
        to_date: moment(to_date).format('YYYY-MM-DDT23:59:00') + 'Z'
      }
      if (from_date > to_date) {
        this.isFromDateGreater = true
        //console.log('in if ')
        return false
      } else {
        this.isFromDateGreater = false
        await this.getVendorAnalytics(data)
      }
      //console.log('to date', this.to_date)

      // console.log('to date', this.to_date)
    },

    async getVendorAnalytics(data) {
      this.series = []
      this.options.labels = []
      let obj = {
        start_date: data.from_date,
        end_date: data.to_date,
        city: this.city,
        country: this.country
      }
      await this.action_fetchVendorCatagoryAnalytics(obj).then(() => {
        this.getSeriesDataForChart()
        // this.series = [
        //   this.getter_newUserAnalytics.professionalCount,
        //   this.getter_newUserAnalytics.fresherCount,
        //   this.getter_newUserAnalytics.studentCount,
        //   this.getter_newUserAnalytics.otherCount
        // ]
      })
      window.dispatchEvent(new Event('resize'))
    },
    getSeriesDataForChart() {
      for (let i = 0; i < this.getter_vendorCatagoryAnalytics.length; i++) {
        this.series.push(this.getter_vendorCatagoryAnalytics[i].doc_count)
        this.options.labels.push(
          this.getter_vendorCatagoryAnalytics[i].key +
            ' - ' +
            this.getter_vendorCatagoryAnalytics[i].doc_count
        )
      }
      //console.log('this.series', this.series)
    },
    checkFromDate() {
      if (this.from_date) {
        this.minDate = this.from_date
        //console.log('in if to date less', this.from_date)
      }
    },
    fetchCitiesValues(text) {
      if (
        ((text === undefined || text == '') &&
          this.country_iso === undefined) ||
        this.country_iso == ''
      ) {
        return
      } else {
        if (this.country_iso) {
          let data = {
            country: this.country_iso,
            city: text
          }
          this.searchCityFromCountry(data)
        } else {
          this.isCountryNotSelected = true
        }
      }
    },
    onCitySelected(item, index) {
      this.setCityValue(item, index)
    },
    setCityValue(item) {
      if (item != null) {
        this.city = item.name
      } else {
        this.city = ''
      }
      //this.emitLocationChangeEvent()
    },
    fetchCountryValues(text) {
      if (text === undefined) {
        return
      }
      this.searchContry(text)
    },
    onCountrySelected(item, index) {
      //console.log('text', item)
      this.setCountryValue(item, index)
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
      this.setCityEmpty()
    }
  },
  async created() {
    this.maxDate = new Date()
    var from_date = new Date()
    //let from_date = moment(oneWeekAgo.setDate(oneWeekAgo.getDate() - 7))
    from_date.setDate(from_date.getDate() - 7)
    //console.log('datte 7', from_date)
    // let d = from_date.toDate()
    //console.log('newDate', d)
    from_date.setHours(0)
    from_date.setMinutes(0)
    from_date.setSeconds(0)
    let to_date = this.to_date
    to_date.setHours(23)
    to_date.setMinutes(59)
    to_date.setSeconds(0)
    this.from_date = from_date
    this.minDate = from_date
    var data = {
      from_date: moment(from_date).format('YYYY-MM-DDT00:00:00') + 'Z',
      to_date: moment(to_date).format('YYYY-MM-DDT23:59:00') + 'Z'
    }
    await this.getVendorAnalytics(data)
  }
}
</script>

<style>
.date-row {
  display: flex;
  flex-direction: column;
}
.button-row {
  display: flex;
  align-items: center;
  justify-content: center;
}
.page-body {
  padding: 16px;
  border: 1px solid #777;
  border-radius: 10px;
}
.legend-mouseover-inactive {
  opacity: 0.7 !important;
}
.apexcharts-inactive-legend {
  opacity: 0.5 !important;
}
</style>
