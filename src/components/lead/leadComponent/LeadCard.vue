<template>
  <div v-if="leadData">
    <Card
      :card_logo="getCardLogo()"
      component_height="260px"
      @btnCardArrowClick="btnLeadViewClick"
    >
      <div slot="body">
        <div class="d-flex flex-column">
          <span
            style="height: 46px"
            class="app-primary-text-color font-weight-700 fontSize14 job-title"
          >
            {{ leadData.company_name }}
          </span>

          <div style="overflow-y: hidden">
            <div
              class="fontSize14 font-weight-700 text-orange mt-2"
              style="height: 46px"
            >
              {{ leadData.title }}
            </div>

            <!-- <span class="fontSize12 font-weight-400">
            {{ leadData.company_name }}
          </span> -->

            <div class="fontSize12">
              {{ leadData.city_state_country }}
            </div>

            <!-- <div class="margintop15px">
            <span class="fontSize12 font-weight-400">
              {{ getLeadRequiremnttext() }}
            </span>
          </div> -->
          </div>

          <div class="d-flex flex-column-reverse" style="height: 40px">
            <div>
              <span
                v-if="leadData.no_of_applicants > 1"
                class="fontSize12 font-weight-700 text-gray mb-0 mt-4"
              >
                Number of applicants : {{ leadData.no_of_applicants }}
              </span>
              <span
                v-else
                class="fontSize12 font-weight-700 text-gray mb-0 mt-4"
              >
                Number of applicant : {{ leadData.no_of_applicants }}
              </span>
            </div>
            <div class="fontSize12">{{ getDateDifference() }}</div>
          </div>
        </div>
      </div>
    </Card>
  </div>
  <div v-else>
    <Card
      is_to_show_button="true"
      add_button_text="+ Add Enquiry"
      :card_logo="getCardLogo()"
      component_height="260px"
      @btnCardAddClick="btnLeadAddClick"
    ></Card>
  </div>
</template>

<script>
import Card from '../../../common/card.vue'
import appConstants from '../../../appConstants.js'
import { mapGetters } from 'vuex'
import moment from 'moment'
import { calculateNoOfDaysFromTodayToGivenDate } from '../../../common/js/dateFunction.js'

export default {
  name: 'LeadCard',
  props: ['leadData'],
  components: {
    Card
  },
  computed: {
    ...mapGetters(['userData'])
  },
  methods: {
    getCardLogo() {
      return ''
      // return '../../../assets/ibtnLeadViewClickmg/Job-List-Dummy-Logo.svg'
    },
    getLeadRequiremnttext() {
      if (this.leadData.requirement.length < 80) {
        return this.leadData.requirement
      } else {
        var str = this.leadData.requirement.substring(0, 81) //0 to 100 char
        return `${str}...`
      }
    },
    btnLeadAddClick() {
      this.$router.push({ name: appConstants.routes.ADD_LEAD })
    },
    btnLeadViewClick() {
      if (
        this.leadData.status == appConstants.leadStatus.OPEN ||
        this.leadData.status == appConstants.leadStatus.REJECTED
      ) {
        this.$router.push({
          name: appConstants.routes.UPDATE_LEAD,
          params: { lead_id: this.leadData.encrypted_id }
        })
      } else {
        this.$router.push({
          name: appConstants.routes.LEAD_APPLICANTS,
          params: { lead_id: this.leadData.encrypted_id }
        })
      }
    },
    getDateDifference() {
      let noOfDays = ''
      if (this.leadData.status == appConstants.leadStatus.APPROVED) {
        let lead_expires_at = this.leadData.expires_at
        try {
          let daysCount = calculateNoOfDaysFromTodayToGivenDate(lead_expires_at)
          if (Number.isNaN(daysCount)) {
            return ''
          } else {
            noOfDays = daysCount + ' days left to expire'
          }
        } catch (error) {
          return ''
        }
      } else if (this.leadData.status == appConstants.leadStatus.EXPIRED) {
        let only_date = moment(this.leadData.expires_at).format('DD MMM YYYY')

        if (only_date == 'Invalid date') {
          return ''
        } else {
          return 'Expired on ' + only_date
        }
      } else if (this.leadData.status == appConstants.leadStatus.OPEN) {
        let only_date = moment(this.leadData.created_at).format('DD MMM YYYY')

        if (only_date == 'Invalid date') {
          return ''
        } else {
          return 'Created on ' + only_date
        }
      }

      return noOfDays
    }
  }
}
</script>
