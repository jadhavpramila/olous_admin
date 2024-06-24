<template>
  <div>
    <Card
      :card_logo="card_logo"
      component_height="254px"
      :is_selected="is_selected"
      @btnCardArrowClick="emitViewApplicantDetailsEvent()"
    >
      <div slot="body">
        <!-- Bussiness applicant -->
        <div v-if="isBussinessApplicant()" class="d-flex flex-column">
          <div style="height: 135px; overflow: hidden">
            <div class="text-orange font-weight-700 fontSize14 job-title">
              {{ applicant_details.name }}
            </div>

            <div class="fontSize12 font-weight-400 mt-2">
              <span class="fontSize12 font-weight-600">{{ categoryStr }}</span>
            </div>

            <div class="fontSize12 font-weight-400"></div>

            <div class="fontSize12 font-weight-400 margintop4px mt-2">
              Turnover : {{ applicant_details.absolute_turnover }}
              {{ getTurnoverUnitName() }}
            </div>

            <div class="fontSize12 font-weight-400 margintop4px">
              Min.Value of Work : {{ applicant_details.min_work_value_name }}
            </div>
          </div>

          <!-- <span class="fontSize14 font-weight-700 color_gray">
            {{ getLeadApplicationStatus() }}
          </span> -->

          <span
            class="fontSize14 font-weight-700"
            :style="getLeadApplicationStatusColorStyle()"
          >
            {{ getLeadApplicationStatus() }}
          </span>
        </div>

        <!-- User applicant -->
        <div v-else class="d-flex flex-column">
          <span
            class="app-primary-text-color font-weight-700 fontSize14 job-title"
          >
            {{ applicant_details.name }}
          </span>

          <span
            class="fontSize14 font-weight-400 app-primary-text-color margintop4px"
          >
            {{ applicant_details.designation }}
          </span>

          <span>
            {{ applicant_details.address }}
          </span>

          <div class="margintop15px">
            <span class="fontSize12 font-weight-400">
              Total Exp. {{ applicant_details.total_exp }}
            </span>
          </div>

          <span
            class="fontSize14 font-weight-700 mt-4"
            :style="getLeadApplicationStatusColorStyle"
          >
            {{ getLeadApplicationStatus() }}
          </span>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from '../../../common/card.vue'
import appConstants from '../../../appConstants.js'
import {
  getTurnOverOptionsString,
  getCategoryValues,
  // eslint-disable-next-line no-unused-vars
  getSubCategoryValues,
  minWorkValueStr
} from '../../../common/js/getValuesFromIds.js'

export default {
  name: 'LeadApplicantCard',
  props: ['applicant', 'is_selected'],
  components: {
    Card
  },
  data() {
    return {
      applicant_details: null,
      card_logo: '',
      turnOverStr: '',
      categoryStr: '',
      subCategoryStr: '',
      minWorkStr: ''
    }
  },

  methods: {
    getCardLogo() {
      return this.applicant_details.logo_url
    },
    isBussinessApplicant() {
      if (this.applicant.applied_as == appConstants.lead_applied_as.USER) {
        return false
      } else {
        return true
      }
    },
    async getTurnOverString() {
      let turnOverStr = await getTurnOverOptionsString([
        this.applicant_details.turnover
      ])

      if (turnOverStr == '') {
        this.turnOverStr = ' - '
      } else {
        this.turnOverStr = turnOverStr
      }
    },

    async getMinWorkValueStr() {
      let minWorkStr = await minWorkValueStr([
        this.applicant_details.min_work_value
      ])

      if (minWorkStr == '') {
        this.minWorkStr = ' - '
      } else {
        this.minWorkStr = minWorkStr
      }
    },

    async getCategoryString() {
      this.categoryStr = await getCategoryValues([
        this.applicant_details.category
      ])
    },
    // async getSubCategoryString() {
    //   this.subCategoryStr = await getSubCategoryValues(
    //     this.applicant_details.category,
    //     this.applicant_details.sub_categories
    //   )
    // },
    emitViewApplicantDetailsEvent() {
      this.$emit('viewApplicantDetails', this.applicant.id)
    },
    getLeadApplicationStatus() {
      let status_str = ''
      if (
        this.applicant.application_status ==
        appConstants.lead_application_status.OPEN
      ) {
        status_str = 'Pending'
      }

      if (
        this.applicant.application_status ==
        appConstants.lead_application_status.ACCEPTED
      ) {
        status_str = 'Accepted'
      }

      if (
        this.applicant.application_status ==
        appConstants.lead_application_status.REJECTED
      ) {
        status_str = 'Rejected'
      }

      if (
        this.applicant.application_status ==
        appConstants.lead_application_status.UNDER_REVIEW
      ) {
        status_str = 'Pending'
      }

      if (
        this.applicant.application_status ==
        appConstants.lead_application_status.PAID
      ) {
        status_str = 'Paid'
      }

      if (
        this.applicant.application_status ==
        appConstants.lead_application_status.INTERVIEW_REQUESTED
      ) {
        status_str = 'interview Requested'
      }

      if (
        this.applicant.application_status ==
        appConstants.lead_application_status.INTERVIEW_SCHEDULED
      ) {
        status_str = 'Interview Scheduled'
      }

      return status_str.toUpperCase()
    },
    getLeadApplicationStatusColorStyle() {
      let style_str = 'color : #989898 '
      if (
        this.applicant.application_status ==
          appConstants.lead_application_status.OPEN ||
        this.applicant.application_status ==
          appConstants.lead_application_status.UNDER_REVIEW
      ) {
        style_str = 'color : #ed951d'
      }

      if (
        this.applicant.application_status ==
        appConstants.lead_application_status.ACCEPTED
      ) {
        style_str = 'color : #429318'
      }

      if (
        this.applicant.application_status ==
        appConstants.lead_application_status.REJECTED
      ) {
        style_str = 'color : #f00808'
      }

      if (
        this.applicant.application_status ==
          appConstants.lead_application_status.PAID ||
        this.applicant.application_status ==
          appConstants.lead_application_status.INTERVIEW_REQUESTED ||
        this.applicant.application_status ==
          appConstants.lead_application_status.INTERVIEW_SCHEDULED
      ) {
        style_str = 'color : #1616f4'
      }

      return style_str
    },
    getTurnoverUnitName() {
      let unit_name = ''
      if (
        this.applicant_details.absolute_turnover_unit ==
        appConstants.price_unit.LAKH
      ) {
        unit_name = 'Lakh'
      } else if (
        this.applicant_details.absolute_turnover_unit ==
        appConstants.price_unit.CRORE
      ) {
        unit_name = 'Crore'
      }
      return unit_name
    }
  },
  created() {
    this.applicant_details = this.applicant.applicant_details
    this.card_logo = this.applicant_details.logo_url
    // this.getTurnOverString()
    this.getCategoryString()
    // this.getSubCategoryString()
    // this.getMinWorkValueStr()
  }
}
</script>
