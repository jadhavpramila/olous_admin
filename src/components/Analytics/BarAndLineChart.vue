<template>
  <div class="cls-analytics form-conatiner">
    <div class="form-container">
      <div class="page-body mt-5">
        <div class="row">
          <div class="col-lg-4 date-row">
            <label>From Date</label>

            <b-form-datepicker
              id="datepicker-From-active"
              placeholder="date"
              size="sm"
              locale="en"
              v-model="fromDate_activeUser"
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
              id="datepicker-to-active"
              placeholder="date"
              size="sm"
              locale="en"
              v-model="toDate_activeUser"
              :value-as-date="true"
              :date-format-options="{
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                weekday: 'short'
              }"
              :min="minDate"
              :max="maxDate"
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
            <button class="btn w-50" @click="clickActiveUserAnalytics">
              Get Analytics
            </button>
          </div>
        </div>
        <div class="d-flex my-4 flex-column">
          <span class="analytics-subtitle">
            Total active user count:
            {{ getter_activeUserAnalytics.totalActiveUsers_location_Count }}
          </span>
        </div>
        <div class="row">
          <div class="col-12">
            <apexchart
              width="100%"
              type="line"
              :options="optionsLineChart"
              :series="seriesLineChart"
            ></apexchart>
          </div>
          <hr />
          <div class="col-12 mt-5">
            <span class="analytics-subtitle">
              Total registered user count:
              {{ getter_activeUserAnalytics.totalUsers_location_Count }}
            </span>
            <apexchart
              width="100%"
              type="bar"
              :options="optionsBarChart"
              :series="seriesBarChart"
            ></apexchart>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import appConstants from '../../../appConstants.js'
//import { mapGetters, mapActions, mapMutations } from 'vuex'
//import modal from '../../../common/Modal'
// import Vue from 'vue'
import moment from 'moment'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import VueApexCharts from 'vue-apexcharts'
export default {
  name: 'Analytics',
  components: {
    apexchart: VueApexCharts
  },
  data() {
    return {
      toDate_activeUser: new Date(),
      fromDate_activeUser: '',
      city: '',
      country: '',
      isCountryNotSelected: false,
      maxDate: '',
      minDate: '',
      isFromDateGreater: false,
      seriesLineChart: [
        {
          name: 'Series 1',
          data: []
        }
      ],
      optionsLineChart: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          },
          animation: {
            enabled: false
          }
        },
        xaxis: {
          type: 'datetime',
          labels: {
            //rotate: 0
          }
        },
        dataLabels: {
          enabled: false
        },
        title: {
          text: 'Active users by day',
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        }
      },
      seriesBarChart: [
        {
          name: 'Series 1',
          data: []
        }
      ],
      optionsBarChart: {
        chart: {
          height: 350,
          type: 'bar',
          zoom: {
            enabled: true
          },
          toolbar: {
            show: true,
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: false,
              reset: false
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          type: 'datetime',
          labels: {
            //rotate: 0
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters('analytics', ['getter_activeUserAnalytics']),
    ...mapGetters('dropdownValues', ['filteredCountry', 'getCitiesFromCountry'])
  },
  methods: {
    ...mapMutations('dropdownValues', ['setCityEmpty']),
    ...mapActions('analytics', ['action_fetchActiveUserAnalytics']),
    ...mapActions('dropdownValues', ['searchContry', 'searchCityFromCountry']),

    async clickActiveUserAnalytics() {
      this.seriesBarChart[0].data = []
      this.seriesLineChart[0].data = []
      var from_date = this.fromDate_activeUser
      from_date.setHours(0)
      from_date.setMinutes(0)
      from_date.setSeconds(0)
      var to_date = this.toDate_activeUser
      to_date.setHours(23)
      to_date.setMinutes(59)
      to_date.setSeconds(0)

      let data = {
        //from_date: from_date.toISOString().split('.')[0] + 'Z',
        from_date: moment(from_date).format('YYYY-MM-DDT00:00:00') + 'Z',
        to_date: moment(to_date).format('YYYY-MM-DDT23:59:00') + 'Z'
      }
      if (from_date > to_date) {
        this.isFromDateGreater = true
        //console.log('in if ')
        return false
      } else {
        this.isFromDateGreater = false
        await this.getActiveUserAnalytics(data)
      }
      //console.log('to date', data)
    },

    getActiveUserAnalytics(data) {
      let obj = {
        start_date: data.from_date,
        end_date: data.to_date,
        country: this.country,
        city: this.city
      }
      //console.log('obj', obj)
      this.action_fetchActiveUserAnalytics(obj).then(() => {
        this.setSeriesLineDataActiveUsers()
        this.setSeriesLineDataRegisterUsers()
      })
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
    clickClear() {
      console.log('click clear')
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
      //this.emitLocationChangeEvent()
    },

    async setSeriesLineDataActiveUsers() {
      this.seriesLineChart[0].data = []
      if (this.getter_activeUserAnalytics) {
        for (
          let i = 0;
          i <
          this.getter_activeUserAnalytics.totalActiveUsers_location_day_Count
            .length;
          i++
        ) {
          let obj = {
            x: this.getter_activeUserAnalytics
              .totalActiveUsers_location_day_Count[i].key_as_string,
            y: this.getter_activeUserAnalytics
              .totalActiveUsers_location_day_Count[i].doc_count
          }
          this.seriesLineChart[0].data.push(obj)
        }
        //console.log('laskdaks', this.seriesLineChart[0].data)
      }
      window.dispatchEvent(new Event('resize'))
    },
    async setSeriesLineDataRegisterUsers() {
      this.seriesBarChart[0].data = []
      let userArray = []
      if (this.getter_activeUserAnalytics) {
        for (
          let i = 0;
          i <
          this.getter_activeUserAnalytics.totalUsers_location_day_Count.length;
          i++
        ) {
          let obj = {
            x: this.getter_activeUserAnalytics.totalUsers_location_day_Count[i]
              .key_as_string,
            y: this.getter_activeUserAnalytics.totalUsers_location_day_Count[i]
              .doc_count
          }
          userArray.push(obj)
        }
        this.seriesBarChart[0].data = userArray
        //console.log('this.seriesLine data', this.seriesLineChart)
      }
      window.dispatchEvent(new Event('resize'))
    },
    checkFromDate() {
      if (this.fromDate_activeUser) {
        this.minDate = this.from_date
        //console.log('in if to date less', this.from_date)
      }
    }
  },
  async created() {
    this.maxDate = new Date()
    var from_date = new Date()
    from_date.setDate(from_date.getDate() - 7)
    // let fromDate_activeUser = moment(
    //   oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    // )
    //let d = fromDate_activeUser.toDate()
    from_date.setHours(0)
    from_date.setMinutes(0)
    from_date.setSeconds(0)
    let to_date = this.toDate_activeUser
    to_date.setHours(23)
    to_date.setMinutes(59)
    to_date.setSeconds(0)
    this.fromDate_activeUser = from_date
    this.minDate = from_date
    var data = {
      from_date: moment(from_date).format('YYYY-MM-DDT00:00:00') + 'Z',
      to_date: moment(to_date).format('YYYY-MM-DDT23:59:00') + 'Z'
    }

    this.getActiveUserAnalytics(data)
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
.display-close-btn .vs__clear {
  display: block;
}
</style>
