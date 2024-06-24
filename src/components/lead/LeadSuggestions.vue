<template>
  <div class="form-conatiner">
    <div
      v-infinite-scroll="fetchSuggestions"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="80"
      class="mt-4"
    >
      <div class="row">
        <div
          class="col-lg-6 col-md-6 mb-3"
          v-for="(company, counter) in getLeadSuggestions"
          :key="counter"
        >
          <CompanyCardWithEditButton
            :company="company"
          ></CompanyCardWithEditButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import appConstants from '../../appConstants.js'
import CompanyCardWithEditButton from '../company/common/CompanyCardWithEditButton.vue'

export default {
  name: 'LeadSuggestions',
  components: { CompanyCardWithEditButton },
  data() {
    return {
      lead_id: '',
      currentPage: 0,
      hasMoreSuggestions: true,
      busy: false
    }
  },
  props: {},
  computed: {
    ...mapGetters(['userData']),
    ...mapGetters('lead', ['getLeadSuggestions'])
    // getUniqueKey() {
    //   return getRandomString()
    // }
  },
  methods: {
    ...mapActions('lead', ['fetchLeadSuggestions']),
    isAdminUser() {
      return this.userData.is_admin
    },
    goToLeadsListPage() {
      this.$router.push({ name: appConstants.routes.LEAD })
    },
    fetchSuggestions() {
      if (
        this.currentPage == 0 ||
        (this.currentPage > 0 &&
          this.hasMoreSuggestions.toString() != 'false' &&
          this.hasMoreSuggestions != null)
      ) {
        let data = this.getPageDetails()
        data['type'] = this.getCurrentLeadFilterType
        this.busy = true
        this.fetchLeadSuggestions(data).then((result) => {
          this.currentPage = data.pageNumber
          this.busy = false
          this.hasMoreSuggestions = result
        })
      }
    },
    getPageDetails() {
      let pageNumber = this.currentPage + 1
      let limit = 10
      let offset = (pageNumber - 1) * limit
      let data = {
        pageNumber: pageNumber,
        limit: limit,
        offset: offset,
        lead_id: this.lead_id
      }
      // let data = {
      //   pageNumber: 70,
      //   limit: 100,
      //   offset: 800,
      //   lead_id: this.lead_id
      // }
      return data
    }
  },
  created() {
    this.lead_id = this.$route.params.lead_id
    if (this.isAdminUser()) {
      this.fetchSuggestions()
    } else {
      this.goToLeadsListPage()
    }
  }
}
</script>

<style lang="scss" scoped></style>
