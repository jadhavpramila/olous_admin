<template>
  <div>
    <div class="ml-5" v-if="userData.is_admin">
      <Analytics></Analytics>
    </div>
    <div v-else>
      <BusinessDashboard></BusinessDashboard>
    </div>
    <!-- <div>
      <button @click="saveData()">Save</button>
    </div> -->
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { mapActions, mapGetters } from 'vuex'
import Analytics from '../Analytics/Analytics.vue'
import BusinessDashboard from './BusinessDashboard.vue'

//import createCompany from '../CreateCompany/createCompany.vue'
import appConstants from '../../appConstants'
//import JobCardComponentVue from '../job/JobComponent/JobCardComponent.vue'
export default {
  name: 'Dashboard',
  components: {
    Analytics,
    BusinessDashboard
    //createCompany
    //JobCardComponentVue
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['userData', 'getProfessionOptions', 'getSectorOptions']),
    ...mapGetters('dropdownValues', ['getter_allSoftwareList']),
    ...mapGetters(['isAdmin'])
  },
  methods: {},
  created() {
    if (this.isAdmin) {
      //console.log('in if=>', this.isAdmin)
      this.$router.push({ name: appConstants.routes.ANALYTICS })
    } else {
      //console.log('in else=>', this.isAdmin)
      this.$router.push({ name: appConstants.routes.COMPANY })
    }
  }
}
</script>

<style></style>
