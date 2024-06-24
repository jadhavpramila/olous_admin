<template>
  <div class="Enquery-list">
    <div class="form-conatiner cls-pricing">
      <div class="form-max-width">
        <div
          class="row lead-card-row ml-0 mr-0"
          v-for="(pricing_plan, counter) in getAllPricingPlansList"
          :key="counter"
        >
          <div
            class="col-md-10 Lead-card bgGrayLightColor mb-3 border rounded-lg"
            @dblclick="viewPricingDetails(pricing_plan)"
          >
            <div class="row">
              <div class="col-12 mt-3 mb-3 fon">
                <div class="row">
                  <div class="col-6">
                    <div class="bold-text plan-code">
                      CODE : {{ pricing_plan.plan_code }}
                    </div>
                  </div>
                  <div class="col-6">
                    <div
                      v-if="pricing_plan.is_active == false"
                      class="status-row"
                    >
                      <div class="lead-status">Inactive</div>
                    </div>
                    <div v-else class="status-row">
                      <div class="lead-status">Active</div>
                    </div>
                  </div>
                </div>

                <div class="row mt-1">
                  <div class="col-md-8">
                    <label class="app-primary-text-color font-weight-bold">
                      {{ pricing_plan.plan_name }}</label
                    >
                  </div>
                  <div class="col-md-4">
                    <div>
                      <label
                        class="fontSize12 app-primary-text-color font-weight-bold"
                      >
                        {{ pricing_plan.plan_price }}
                        {{ getCurrencyValue(pricing_plan.currency) }}</label
                      >
                    </div>
                  </div>
                </div>
                <div class="row mt-1">
                  <div class="col-md-8">
                    <label class="fontSize12 lead_req">{{
                      getPlanDetaits(pricing_plan)
                    }}</label>
                  </div>
                  <div class="col-md-4">
                    <div>
                      <label class="fontSize12">{{
                        pricing_plan.country
                      }}</label>
                    </div>

                    <div>
                      <label class="fontSize12">
                        {{ getPlanTypeText(pricing_plan.plan_type) }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-2 row ml-0 mb-3 action-row">
            <div>
              <img
                class="cursor-pointer"
                @click="viewPricingDetails(pricing_plan)"
                title="Edit Pricing plan"
                src="../../assets/img/Edit.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import appConstants from '../../appConstants.js'

export default {
  name: 'PricingList',
  components: {},
  data() {
    return {
      name: ''
    }
  },
  computed: {
    ...mapGetters('pricing', ['getAllPricingPlansList', 'getEnqueryDetails']),
    ...mapGetters('dropdownValues', ['getCurrencyOptions', 'getCompanyType'])
  },
  methods: {
    ...mapMutations('pricing', ['pricingResetState', 'clearAllPricingData']),
    ...mapActions('pricing', ['fetchPricingPlanslist', 'editPricingplan']),
    ...mapActions('dropdownValues', ['fetchCurrency', 'fetchCompanyType']),

    viewPricingDetails(plan) {
      this.editPricingplan(plan)
      this.$router.push({ name: appConstants.routes.UPDATE_PRICING })
    },
    getPlanDetaits(plan) {
      if (plan.plan_details.length < 200) {
        return plan.plan_details
      } else {
        var str = plan.plan_details.substring(0, 200) //0 to 200 char
        return `${str}...`
      }
    },
    setDataToEditpricing(plan) {
      this.editPricingplan(plan)
      this.$router.push({ name: appConstants.routes.ADD_PRICING })
    },
    getCurrencyValue(value) {
      for (var index = 0; index < this.getCurrencyOptions.length; index++) {
        if (value == this.getCurrencyOptions[index].id) {
          return this.getCurrencyOptions[index].name
        }
      }
    },
    getPlanTypeText(value) {
      for (var index = 0; index < this.getCompanyType.length; index++) {
        if (value == this.getCompanyType[index].id) {
          return this.getCompanyType[index].name
        }
      }
    }
  },
  created() {
    this.clearAllPricingData()
    this.fetchCurrency()
    this.fetchCompanyType()
    this.fetchPricingPlanslist()
  }
}
</script>

<style scoped>
.btnSearchjob {
  margin-top: 5px;
}

/* .actioncolumn {
  background-color: ;
} */

.job-card .job_image {
  margin: auto;
  object-fit: fill;
}

.job-card {
  cursor: pointer;
  border-radius: 8px;
}

.status-row {
  display: flex;
  flex-direction: row-reverse;
}
.lead-status {
  height: 25px;
  padding: 0;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 0px;
  border-bottom-left-radius: 8px;
  border-top-right-radius: 8px;
  text-transform: capitalize;
  /* float: right;*/
  margin-right: -15px;
  margin-top: -16px;
  background-color: #a5a1a1;
  /*  font-weight: bold;*/
  font-family: 'Roboto Bold' !important;
}
.action-row {
  display: flex;
  justify-content: flex-start;
}

.cursor-pointer {
  cursor: pointer;
}

.plan-code {
  font-family: 'Roboto Bold' !important;
}

@media only screen and (max-width: 992px) {
  .action-row {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
