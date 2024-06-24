<template>
  <div class="cls-analytics">
    <div class="form-container">
      <PieChart></PieChart>
      <!-- Line Chart -->
      <BarAndLineChart></BarAndLineChart>
      <PieChartVendorCatagory></PieChartVendorCatagory>
      <UserProfessionChart></UserProfessionChart>
      <UserSectorChart></UserSectorChart>
    </div>
  </div>
</template>

<script>
import PieChart from './PieChart.vue'
import BarAndLineChart from './BarAndLineChart.vue'
import PieChartVendorCatagory from './PieChartVendorCatagory.vue'
import UserProfessionChart from './UserProfessionChart.vue'
import UserSectorChart from './UserSectorChart.vue'
export default {
  name: 'Analytics',
  components: {
    //apexchart: VueApexCharts,
    PieChart,
    BarAndLineChart,
    PieChartVendorCatagory,
    UserProfessionChart,
    UserSectorChart
  },
  data() {
    return {}
  },
  computed: {},
  methods: {}
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
</style>
