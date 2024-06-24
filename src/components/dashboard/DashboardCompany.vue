<template>
  <div style="" v-if="allCompanies.length == 0" class="ml-5">
    <div class="ml-5">
      <createCompany></createCompany>
    </div>
  </div>
  <div v-else>
    <CompanyList></CompanyList>
  </div>
</template>

<script>
import createCompany from '../CreateCompany/createCompany.vue'
import CompanyList from '../company/CompanyList.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  components: { createCompany, CompanyList },
  computed: {
    ...mapGetters(['userData', 'allCompanies'])
  },
  created() {}
}
</script>

<style scoped></style>
