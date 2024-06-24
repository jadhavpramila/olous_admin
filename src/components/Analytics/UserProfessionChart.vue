<template>
  <div class="cls-analytics form-conatiner">
    <div class="form-container">
      <div class="page-body-profession mt-5">
        <div class="row">
          <div class="col-lg-4 date-row">
            <label>From Date</label>

            <b-form-datepicker
              id="datepicker-From-profession"
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
              id="datepicker-to-profession"
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
        <!-- <div class="d-flex my-4 flex-column">
          <span class="analytics-subtitle">
            Total active user count:
             {{ getter_activeUserAnalytics.totalActiveUsers_location_Count }} 
          </span>
        </div>-->
        <!-- <div class="row">
          <div class="col-12 mt-5">
            <span class="analytics-subtitle">
              Total registered user count:
              {{ getter_activeUserAnalytics.totalUsers_location_Count }}
            </span>
            <apexchart
              width="700"
              type="bar"
              :options="optionsBarChart"
              :series="seriesBarChart"
            ></apexchart>
          </div>
        </div> -->
        <div class="mb-4 mt-4">
          <span class="font-weight-bold font-size-16"
            >Users count according to profession</span
          >
        </div>
        <table border="1">
          <thead>
            <tr>
              <td class="font-weight-bold p-2">Profession Title</td>
              <td class="font-weight-bold p-2">User Count</td>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(profession, index) in userProfessionCatagories"
              :key="index"
            >
              <td v-if="profession.key" class="p-2">
                {{ getProfessionString(profession.key) }}
              </td>
              <td v-if="profession.key" class="p-2">
                {{ profession.doc_count }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapGetters, mapActions, mapMutations } from 'vuex'
//import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'UserProfessionChart',
  components: {
    //apexchart: VueApexCharts
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
      userProfessionCatagories: {},
      professionIdList: [],
      seriesBarChart: [
        {
          name: 'Series 1',
          data: []
        }
      ],
      optionsBarChart: {
        chart: {
          height: 600,
          type: 'bar',
          zoom: {
            enabled: true
          },
          title: {
            text: 'Users count according to profession',
            align: 'left'
          },
          plotOptions: {
            bar: {
              horizontal: true,
              columnWidth: '70%',
              barHeight: '70%'
            }
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
          categories: []
        }
      }
    }
  },
  computed: {
    ...mapGetters('analytics', ['getter_userProfessionAnalytics']),
    ...mapGetters('dropdownValues', [
      'filteredCountry',
      'getCitiesFromCountry',
      'getProfessionOptions'
    ])
  },
  methods: {
    ...mapMutations('dropdownValues', ['setCityEmpty']),
    ...mapActions('analytics', ['action_fetchUserProfessionAnalytics']),
    ...mapActions('dropdownValues', [
      'searchContry',
      'searchCityFromCountry',
      'fetchProfessionData'
    ]),

    async clickActiveUserAnalytics() {
      //this.seriesBarChart[0].data = []
      //this.seriesLineChart[0].data = []
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
        await this.getUserProfessionAnalytics(data)
      }
      //console.log('to date', data)
    },

    async getUserProfessionAnalytics(data) {
      let obj = {
        start_date: data.from_date,
        end_date: data.to_date,
        country: this.country,
        city: this.city
      }
      //console.log('obj', obj)
      await this.action_fetchUserProfessionAnalytics(obj).then(() => {
        this.userProfessionCatagories = {}
        this.userProfessionCatagories = this.getter_userProfessionAnalytics.users_professions_categories

        //this.setSeriesLineDataRegisterUsers()
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
    getProfessionString(key) {
      let prof_str = ''
      var arr = this.getProfessionOptions.find((x) => x.id == key)
      if (arr != undefined) {
        prof_str = arr.display_string
      }
      //console.log('arr', arr)
      return prof_str
    },
    // async setSeriesLineDataRegisterUsers() {
    //   this.seriesBarChart[0].data = []

    //   //let userArray = []
    //   let prof_str = ''
    //   if (this.userProfessionCatagories) {
    //     for (let i = 0; i < this.userProfessionCatagories.length; i++) {
    //       var arr = this.getProfessionOptions.find(
    //         (x) => x.id == this.userProfessionCatagories[i].key
    //       )
    //       if (arr != undefined) {
    //         prof_str = arr.display_string
    //       }
    //       //console.log('arr', arr)
    //       // let obj = {
    //       //   x: this.userProfessionCatagories[i].doc_count,
    //       //   y: prof_str
    //       // }
    //       this.seriesBarChart[0].data.push(
    //         this.userProfessionCatagories[i].doc_count
    //       )
    //       this.optionsBarChart.xaxis.categories.push(prof_str)
    //       //userArray.push(obj)
    //     }
    //     //this.seriesBarChart[0].data = userArray

    //     // console.log('this.seriesLine data', this.seriesBarChart[0].data)
    //     // console.log(
    //     //   'this.seriesLine xaxis',
    //     //   this.optionsBarChart.xaxis.categories
    //     // )
    //   }
    //   window.dispatchEvent(new Event('resize'))
    // },
    checkFromDate() {
      if (this.fromDate_activeUser) {
        this.minDate = this.from_date
        //console.log('in if to date less', this.from_date)
      }
    }
  },
  async created() {
    this.fetchProfessionData()
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

    this.getUserProfessionAnalytics(data)
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
.page-body-profession {
  padding: 16px;
  border: 1px solid #777;
  border-radius: 10px;
  height: 500px;
  overflow-y: scroll;
}
.display-close-btn .vs__clear {
  display: block;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  /* border: 1px solid #dddddd; */
  text-align: left;
  padding: 8px;
}

/*tr:nth-child(even) {
   background-color: #dddddd; 
}*/
</style>
