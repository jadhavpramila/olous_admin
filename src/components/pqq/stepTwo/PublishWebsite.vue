<template>
  <div class="cls-publishwebsite form-conatiner">
    <div class="form-container">
      <div class="page-body">
        <!--<div v-if="company_status == company_status_enum.PAID">
          <a :href="getCompanyWebsiteUrl()" target="_blank">
            {{ getCompanyWebsiteUrl() }}</a
          >
        </div>
        <div v-else>{{ getCompanyWebsiteUrl() }}</div>-->
        <div class="mt-5" v-if="company_status == company_status_enum.PAID">
          <button class="btn btn-dark" @click="publishUserCompany">
            Make Website Live
          </button>
        </div>
        <div v-if="company_status == company_status_enum.PUBLISHED">
          <div>Company website is already published.</div>
        </div>

        <div v-if="company_status == company_status_enum.OPEN">
          <div>
            To publish company website please buy 'Pricing plan' for company.
          </div>
        </div>
      </div>
      <modal
        v-if="publish_alert_isShow"
        @closeModal="updatePublishModalValues([false, ''])"
      >
        <div slot="body">{{ this.publish_alert_message }}</div>
      </modal>
    </div>
  </div>
</template>

<script>
import appConstants from '../../../appConstants.js'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import modal from '../../../common/Modal'
export default {
  name: 'PublishWebsite',
  components: {
    modal
  },
  data() {
    return {
      slug: '',
      company_status: '',
      portfolio_url: appConstants.PORTFOLIO_URL,
      company_status_enum: appConstants.company_status
    }
  },
  computed: {
    ...mapGetters('companyData', [
      'getCurrentCompanyData',
      'publish_alert_isShow',
      'publish_alert_message'
    ])
  },
  methods: {
    ...mapActions('companyData', [
      'fetchUpdatedCompanyDataSetToCurrentCompanyState',
      'publishCompany'
    ]),
    ...mapMutations('companyData', [
      'setCurrentCompanyData',
      'updatePublishModalValues'
    ]),
    getCompanyWebsiteUrl() {
      return `${appConstants.PORTFOLIO_URL}${this.slug}`
    },
    redirectToUserWesite() {
      let userSite = document.createElement('a')
      userSite.target = '_blank'
      userSite.href = this.getCompanyWebsiteUrl()
      userSite.click()
      userSite.remove()
    },
    publishUserCompany() {
      this.publishCompany(this.getCurrentCompanyData.id).then((result) => {
        this.setCurrentCompanyData(result)
        this.company_status = this.getCurrentCompanyData.status
        this.redirectToUserWesite()
      })
    }
  },
  created() {
    this.fetchUpdatedCompanyDataSetToCurrentCompanyState(
      this.getCurrentCompanyData.id
    ).then(() => {
      this.slug = this.getCurrentCompanyData.slug
      // console.log(this.slug)
      // console.log(this.getCurrentCompanyData.status)
      this.company_status = this.getCurrentCompanyData.status
      // console.log(this.company_status)
    })
  }
}
</script>

<style scoped></style>
