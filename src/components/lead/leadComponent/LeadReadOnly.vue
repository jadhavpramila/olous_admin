<template>
  <div class="">
    <div class="d-flex flex-column mr-2">
      <div>
        <div class="font-weight-700">
          {{ leadData.contact_name }}
          <!-- <div
            v-if="leadData.urgent"
            class="text-orange fontSize12 font-weight-400"
          >
            <b> ( Urgent )</b>
          </div> -->
        </div>
      </div>

      <div>
        <div class="fontSize14 font-weight-400">
          {{ leadData.company_name }}
        </div>

        <div class="fontSize14 font-weight-400">
          {{ leadData.city_state_country }}
        </div>
      </div>

      <div>
        <div class="fontSize14 font-weight-700 mt-3">
          <b>Category :- </b>
        </div>
        <div class="fontSize14 font-weight-400">
          {{ setEmptyValue(leadData.category_name) }}
        </div>
      </div>

      <div>
        <div class="fontSize14 font-weight-700 mt-3">
          <b>Sub-Category :- </b>
        </div>
        <div class="fontSize14 font-weight-400">
          {{ setEmptyValue(leadData.sub_categorie_name) }}
        </div>
      </div>

      <div v-if="leadData.category == category_enum.CONTRACTOR">
        <div class="fontSize14 font-weight-700 mt-3">
          <b>Type of contract :- </b>
        </div>

        <div class="fontSize14 font-weight-400">
          {{ setEmptyValue(leadData.type_of_contract_name) }}
        </div>
      </div>

      <div>
        <div class="fontSize14 font-weight-700 mt-3">
          <b>Project type :- </b>
        </div>

        <div class="fontSize14 font-weight-400">
          {{ setEmptyValue(leadData.project_type_name) }}
        </div>
      </div>

      <div>
        <div class="fontSize14 font-weight-700 mt-3">
          <b>Approximate area :- </b>
        </div>
        <div class="fontSize14 font-weight-400">
          {{ setEmptyValue(leadData.appx_area_name) }}
        </div>
      </div>

      <div>
        <div class="fontSize14 font-weight-700 mt-3">
          <b>Contractor should have turn Over :- </b>
        </div>
        <div class="fontSize14 font-weight-400">
          {{ setEmptyValue(leadData.contractor_turnover_name) }}
        </div>
      </div>

      <!-- <div v-if="this.leadData.category == category_enum.CONTRACTOR">
        <div class="fontSize14 font-weight-700 mt-3">
          <b>Contractor should have done :- </b>
        </div>
        <div class="fontSize14 font-weight-400">
          {{ setEmptyValue(leadData.contractor_should_have_done_name) }}
        </div>
      </div> -->

      <div>
        <div class="fontSize14 font-weight-700 mt-3">
          <b>Expected value of Work :- </b>
        </div>
        <div class="fontSize14 font-weight-400">
          {{ setEmptyValue(leadData.min_work_value_name) }}
        </div>
      </div>

      <div>
        <div class="fontSize14 font-weight-700 mt-3">
          <b>Requirements :- </b>
        </div>
        <div class="fontSize14 font-weight-400">
          <p class="job-description" v-html="getRequirementText()"></p>
        </div>
      </div>

      <div v-if="leadData.mandatory_location">
        <div class="fontSize14 font-weight-700 mt-3">
          <b>Want the applicant only from above city :- </b>
        </div>
        <div class="fontSize14 font-weight-400">
          {{ leadData.city_state_country }}
        </div>
      </div>

      <div>
        <div class="fontSize14 font-weight-700 mt-3">
          <b>Contact Details :- </b>
        </div>
        <div class="fontSize14 font-weight-400">
          {{ leadData.contact_name }}
        </div>
        <div class="fontSize14 font-weight-400">{{ leadData.email }}</div>
        <div class="fontSize14 font-weight-400">
          {{ leadData.country_code }}-{{ leadData.phone }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import appConstants from '../../../appConstants.js'
// import {
//   getCategoryValues,
//   getSubCategoryValues,
//   minWorkValueStr,
//   getLeadProjectTypeString,
//   getLeadAppxAreaString,
//   getTurnOverOptionsString,
//   getTypeOfContractString,
//   getContractorShouldHaveDoneString
// } from '../../../common/js/getValuesFromIds.js'

export default {
  name: 'LeadReadOnly',
  props: ['leadData'],
  data() {
    return {
      // categoryStr: '',
      // subCategoryStr: '',
      // minWorkValueString: '',
      // projectTypeStr: '',
      // appxAreaStr: '',
      // contractorShouldHaveTurnOverStr: '',
      // typeOfContractStr: '',
      // contractorShouldHaveDoneStr: '',
      category_enum: appConstants.category
      // requirementStr: ''
    }
  },
  methods: {
    // async getCategoryString() {
    //   this.categoryStr = await getCategoryValues([this.leadData.category])
    // },
    // async getSubCategoryString() {
    //   this.subCategoryStr = await getSubCategoryValues(
    //     this.leadData.category,
    //     this.leadData.sub_category
    //   )
    // },
    // getMinWorkValueString() {
    //   let res = minWorkValueStr(this.leadData.min_work_value)
    //   this.minWorkValueString = this.setEmptyValue(res)
    // },
    // getProjectTypeString() {
    //   let res = getLeadProjectTypeString(this.leadData.project_type)
    //   this.projectTypeStr = this.setEmptyValue(res)
    // },
    // getAppxAreaString() {
    //   let res = getLeadAppxAreaString(this.leadData.appx_area)
    //   this.appxAreaStr = this.setEmptyValue(res)
    // },
    // getTurnOverOptionsStr() {
    //   let res = getTurnOverOptionsString(this.leadData.contractor_turnover)
    //   this.contractorShouldHaveTurnOverStr = this.setEmptyValue(res)
    // },
    // getTypeOfContractStr() {
    //   let res = getTypeOfContractString(this.leadData.type_of_contract)
    //   this.typeOfContractStr = this.setEmptyValue(res)
    // },
    // getContractorShouldHaveDoneStr() {
    //   let res = getContractorShouldHaveDoneString(
    //     this.leadData.contractor_should_have_done
    //   )
    //   this.contractorShouldHaveDoneStr = this.setEmptyValue(res)
    // },
    getRequirementText() {
      let req = this.setEmptyValue(this.leadData.requirement)
      return req.replace(/(\n){1,}/g, '<br />')
    },

    setEmptyValue(dropDownText) {
      if (dropDownText == '' || dropDownText == null) {
        return '-'
      } else {
        return dropDownText
      }
    }
  },
  created() {
    // this.getCategoryString()
    // this.getSubCategoryString()
    // this.getMinWorkValueString()
    // this.getProjectTypeString()
    // this.getAppxAreaString()
    // this.getTurnOverOptionsStr()
    // this.getTypeOfContractStr()
    // this.getContractorShouldHaveDoneStr()
    // this.getRequirementText()
  }
}
</script>
