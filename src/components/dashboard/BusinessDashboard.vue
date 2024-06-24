<template>
  <div class="form-conatiner">
    <div class="d-flex justify-content-start">
      <span class="fontSize19 font-weight-bold">HR Dashboard</span>
    </div>
    <div class="d-flex" v-if="isShowGraph">
      <div class="d-flex border d-flex p-2 border-radius12px">
        <apexchart
          width="650"
          type="bar"
          height="462"
          :options="optionsBarChart"
          :series="seriesBarChart"
        ></apexchart>
      </div>
      <div class="d-flex flex-column ml-3">
        <div class="d-flex flex-column cls-speedometer align-items-center">
          <span class="speedometer-title">
            {{ getter_businessDashboardData.plan_name }} PLAN
          </span>
          <div
            class="align-items-center d-flex justify-content-center relative"
          >
            <img src="../../assets/img/Speedometer.svg" alt="Speedometer" />
            <img
              src="../../assets/img/Arrow.svg"
              alt="Arrow"
              class="absolute arrow-first-position"
              :class="getArrowPosition()"
            />
          </div>
          <span class="jobs-count"> {{ getJobBalance() }} Jobs</span>
          <span class="job-balance">Job Balance</span>
          <span class="expiry-text mt-3"
            >Expiry
            {{
              getPlanExpiryDate(getter_businessDashboardData.expires_at)
            }}</span
          >
        </div>
        <div class="graph-legend-box">
          <div class="d-flex flex-column">
            <span class="legend-text"> Number of Live Lobs </span>
            <span class="live-jobs">{{
              getter_businessDashboardData.live_Jobs
            }}</span>
          </div>
          <div class="d-flex flex-column">
            <span class="legend-text"> Total Applications Received </span>
            <span class="received-app">{{
              getter_businessDashboardData.total_applications
            }}</span>
          </div>
          <div class="d-flex flex-column">
            <span class="legend-text"> Total Accepted Applications </span>
            <span class="accepted-app">{{
              getter_businessDashboardData.total_accepted
            }}</span>
          </div>
          <div class="d-flex flex-column">
            <span class="legend-text"> Total Rejected Applications </span>
            <span class="rejected-app">{{
              getter_businessDashboardData.total_rejected
            }}</span>
          </div>
          <div class="d-flex flex-column">
            <span class="legend-text"> Total Jobs Posted </span>
            <span class="job-posted">{{
              getter_businessDashboardData.total_jobs_posted
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import VueApexCharts from 'vue-apexcharts'
import { mapGetters } from 'vuex'
import appConstants from '../../appConstants'
export default {
  name: 'BusinessDashboard',
  components: {
    apexchart: VueApexCharts
  },
  data() {
    return {
      jobPlanCode: appConstants.pricing_plan_job,
      toDate_activeUser: new Date(),
      fromDate_activeUser: '',
      city: '',
      country: '',
      isCountryNotSelected: false,
      maxDate: '',
      minDate: '',
      isFromDateGreater: false,
      isShowGraph: false,

      seriesBarChart: [
        {
          data: []
        }
      ],
      optionsBarChart: {
        chart: {
          height: 462,
          width: 579,
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
        fill: {
          colors: ['#008ffb', '#f9c80e', '#43cd68', '#f9200e', '#d96f20']
        },
        plotOptions: {
          bar: {
            columnWidth: '55%',
            distributed: true,
            dataLabels: {
              borderRadius: 10,
              position: 'center' // top, center , bottom
            }
          }
        },
        dataLabels: {
          enabled: true,
          // formatter: function (val) {
          //   return val + '%'
          // },
          //offsetY: -20,
          style: {
            fontSize: '14px',
            colors: ['#fff']
          }
        },
        labels: {
          style: {
            fontSize: '12px'
          }
        },
        legend: {
          show: false,
          position: 'right',
          horizontalAlign: 'center'
        },
        xaxis: {
          categories: [],
          labels: {
            style: {
              fontSize: '12px'
            }
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters('businessdashboard', ['getter_businessDashboardData'])
  },
  methods: {
    async getChartData() {
      this.seriesBarChart[0].data = [
        this.getter_businessDashboardData.live_Jobs,
        this.getter_businessDashboardData.total_applications,
        this.getter_businessDashboardData.total_accepted,
        this.getter_businessDashboardData.total_rejected,
        this.getter_businessDashboardData.total_jobs_posted
      ]
      this.optionsBarChart.xaxis.categories[0] = ['Number of', 'Live Jobs']
      this.optionsBarChart.xaxis.categories[1] = [
        'Total Applications',
        'Received'
      ]
      this.optionsBarChart.xaxis.categories[2] = [
        'Total Application',
        'Accepted'
      ]
      this.optionsBarChart.xaxis.categories[3] = [
        'Total Applications',
        'Rejeted'
      ]
      this.optionsBarChart.xaxis.categories[4] = ['Total', 'Job Posted']
      this.isShowGraph = true
    },
    getPlanExpiryDate(date) {
      if (date != null && date != '') {
        return moment(date).format('DD MMM YYYY')
      }
    },
    getJobBalance() {
      let bal =
        this.getter_businessDashboardData.jobs_allocated -
        this.getter_businessDashboardData.jobs_posted
      return bal
    },
    async getArrowPosition() {
      let bal = this.getJobBalance()
      let res = (bal / this.getter_businessDashboardData.jobs_allocated) * 100
      console.log('result', res)
      if (res > 75) {
        return 'arrow-first-position'
      } else if (res > 50 && res < 75) {
        return 'arrow-second-position'
      } else if (res > 35 && res < 50) {
        return 'arrow-third-position'
      } else if (res > 0 && res < 35) {
        return 'arrow-fourth-position'
      }
    }
    // getReverseStr() {
    //   var arr = [
    //     'you',
    //     'can',
    //     'do',
    //     'that',
    //     'say',
    //     'can',
    //     'again',
    //     'that',
    //     'again'
    //   ]
    //   for (let i = 0; i < arr.length; i++) {
    //     if (arr[i] == arr[i]) {
    //       arr.splice(arr[i], 1)
    //     }
    //   }
    //   console.log('new array=>', arr)
    // }
  },
  async created() {
    // this.getReverseStr()
    await this.getChartData()
  }
}
</script>
<style>
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
.cls-speedometer {
  height: 209px;
  width: 239px;
  border-radius: 12px;
  background-color: #f2f2f2;
  padding: 12px;
}
.speedometer-title {
  margin-bottom: 18px;
  color: #211f77;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
}
.jobs-count {
  font-size: 26px;
  font-weight: bold;
  color: #000;
  line-height: 1.23;
}
.expiry-text {
  font-size: 11px;
  color: #ff0a0a;
  font-weight: 600;
  line-height: 1.18;
  text-transform: uppercase;
}
.job-balance {
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: -0.08px;
  text-align: left;
  color: #211f77;
}
.graph-legend-box {
  width: 239px;
  height: 230px;
  padding: 12px 18px 12px 18px;
  background-color: #f8f8f8;
  border-radius: 12px;
  margin-top: 22px;
}
.legend-text {
  font-size: 12px;
  font-weight: 500;
  color: #000;
  line-height: 1.5;
}
.live-jobs {
  color: #008ffb;
  font-weight: bold;
  font-size: 22px;
}
.received-app {
  font-weight: bold;
  font-size: 22px;
  color: #f9c80e;
}
.rejected-app {
  font-weight: bold;
  font-size: 22px;
  color: #f9200e;
}
.job-posted {
  font-weight: bold;
  font-size: 22px;
  color: #d96f20;
}
.accepted-app {
  font-weight: bold;
  font-size: 22px;
  color: #43cd68;
}
.border-radius12px {
  border-radius: 12px;
}
.arrow-first-position {
  transform: rotate(74deg);
  transform-origin: 100% 80%;
  margin-bottom: -28px;
}
.arrow-second-position {
  transform: rotate(24deg);
  transform-origin: 100% 90%;
  margin-bottom: -18px;
}
.arrow-third-position {
  transform: rotate(-29deg);
  transform-origin: -70% 70%;
  margin-bottom: -26px;
}
.arrow-fourth-position {
  transform: rotate(-74deg);
  transform-origin: 27% 80%;
  margin-bottom: -21px;
}
</style>
