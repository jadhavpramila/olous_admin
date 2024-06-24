<template>
  <div>
    <div v-if="isCompanyPublished()">
      <button
        type="button"
        class="btn btn-dark btn-custom ml-auto mr-0 add-company"
        @click="isShowUnpublishConfirmation = true"
      >
        Unpublish Webpage
      </button>
    </div>
    <div v-else>
      <button
        type="button"
        class="btn btn-dark btn-custom ml-auto mr-0 add-company"
        @click="publishUserCompany"
      >
        Publish Webpage
      </button>
    </div>
    <modal
      v-if="publish_alert_isShow"
      @closeModal="updatePublishModalValues([false, ''])"
    >
      <div slot="body">{{ this.publish_alert_message }}</div>
    </modal>
    <modal
      v-if="isShowUnpublishConfirmation"
      @closeModal="isShowUnpublishConfirmation = false"
    >
      <div slot="body">Do you want to unpublish website?</div>
      <div slot="footer">
        <b-button
          variant="outline-dark"
          class="btn"
          @click="isShowUnpublishConfirmation = false"
        >
          No
        </b-button>
        <b-button
          class="ml-2 btn"
          variant="outline-dark"
          @click="unpublishWebsite"
        >
          Yes
        </b-button>
      </div>
    </modal>
  </div>
</template>

<script>
import appConstants from '../../appConstants.js'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import modal from '../../common/Modal'
export default {
  name: 'PublishUnpublish',
  components: {
    modal
  },
  data() {
    return {
      isShowUnpublishConfirmation: false
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
    ...mapActions('companyData', ['publishCompany', 'unpublishCompany']),
    ...mapMutations('companyData', [
      'setCurrentCompanyData',
      'updatePublishModalValues'
    ]),
    getCompanyWebsiteUrl() {
      return `${appConstants.PORTFOLIO_URL}${this.getCurrentCompanyData.slug}`
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
        this.redirectToUserWesite()
      })
    },
    isCompanyPublished() {
      if (
        this.getCurrentCompanyData.status ==
        appConstants.company_status.PUBLISHED
      ) {
        return true
      } else {
        return false
      }
    },
    unpublishWebsite() {
      this.isShowUnpublishConfirmation = false
      this.unpublishCompany(this.getCurrentCompanyData.id).then((result) => {
        this.setCurrentCompanyData(result)
        // this.redirectToUserWesite()
      })
    }
  }
}
</script>

<style scoped></style>
