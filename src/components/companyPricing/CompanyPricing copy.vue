<template>
  <div class="form-conatiner">
    <div style="display: flex">
      <div v-if="pricingPlans.freePlan != ''" style="flex-grow: 1">
        <div>Free</div>
        <div>
          {{ pricingPlans.freePlan.plan_price }}
          {{ getCurrencyValue(pricingPlans.freePlan.currency) }}
        </div>
        <div>
          <button
            type="button"
            class="btn btn-dark btn-custom"
            @click="joinFreePlan(pricingPlans.freePlan)"
          >
            Join
          </button>
        </div>
      </div>

      <div v-if="pricingPlans.basicPlan != ''" style="flex-grow: 1">
        <div>Basic</div>
        <div>
          {{ pricingPlans.basicPlan.plan_price }}
          {{ getCurrencyValue(pricingPlans.basicPlan.currency) }}
        </div>
        <div>
          <button
            type="button"
            class="btn btn-dark btn-custom"
            @click="joinBasicPlan(pricingPlans.basicPlan)"
          >
            BUY
          </button>
        </div>
      </div>

      <div v-if="pricingPlans.leadPlan != ''" class="ml-3" style="flex-grow: 1">
        <div>Leads</div>
        <div>
          {{ pricingPlans.leadPlan.plan_price }}
          {{ getCurrencyValue(pricingPlans.leadPlan.currency) }}
        </div>
        <div>
          <button
            type="button"
            class="btn btn-dark btn-custom"
            @click="joinLeadsPlan(pricingPlans.leadPlan)"
          >
            BUY
          </button>
        </div>
      </div>

      <div v-if="pricingPlans.proPlan != ''" class="ml-3" style="flex-grow: 1">
        <div>Pro</div>
        <div>
          {{ pricingPlans.proPlan.plan_price }}
          {{ getCurrencyValue(pricingPlans.proPlan.currency) }}
        </div>
        <div>
          <button
            type="button"
            class="btn btn-dark btn-custom"
            @click="joinProPlan(pricingPlans.proPlan)"
          >
            BUY
          </button>
        </div>
      </div>
    </div>

    <modal v-if="isShowFinalPricingPopup">
      <div slot="body">
        <div>
          <div>{{ this.selectedPlan.plan_name }}</div>
          <div>
            {{ this.selectedPlan.plan_price }}
            {{ getCurrencyValue(this.selectedPlan.currency) }}
          </div>
          <div style="display: flex; justify-content: center">
            <label class="plan-code" style="margin-top: 12px"
              >Discount :
            </label>
            <input
              type="text"
              class="form-control input-lg ml-2"
              style="max-width: 150px"
              v-model="this.discount"
            />
          </div>
        </div>
      </div>
      <div slot="footer">
        <b-button class="btn" variant="outline-danger" @click="cancelByPlan">
          Cancel
        </b-button>
        <b-button
          class="ml-2 btn"
          variant="outline-dark"
          @click="buyPricingPlan"
        >
          BUY
        </b-button>
      </div>
    </modal>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import moment from 'moment'
import modal from '../../common/Modal'

export default {
  name: 'CompanyPricing',
  components: {
    modal
  },
  data() {
    return {
      pricingPlansIds: {
        freePlans: ['DM-01'],
        basicPlans: ['DM-02', 'DM-05'],
        leadsPlans: ['DM-03'],
        proPlans: ['DM-04']
      },
      pricingPlans: {
        freePlan: '',
        basicPlan: '',
        leadPlan: '',
        proPlan: ''
      },
      is_loaded: false,
      isShowFinalPricingPopup: false,
      selectedPlan: '',
      discount: ''
    }
  },
  computed: {
    ...mapGetters('companyData', ['getCurrentCompanyData']),
    ...mapGetters('companyPricing', ['getAllPricingPlansForCompany']),
    ...mapGetters('dropdownValues', ['getCurrencyOptions', 'getCompanyType'])
  },
  methods: {
    ...mapActions('companyPricing', ['fetchCompanyPricingPlanslist']),
    ...mapActions('dropdownValues', ['fetchCurrency']),
    ...mapMutations('companyPricing', ['companyPricingResetState']),
    getFreePlan() {
      var result = this.getAllPricingPlansForCompany.filter((x) =>
        this.pricingPlansIds.freePlans.includes(x.plan_code)
      )

      if (result.length > 0) {
        result.sort(function (a, b) {
          return moment(b.created_at).format() - moment(a.created_at).format()
        })

        return result[0]
      } else {
        return ''
      }
    },
    getBasicPlan() {
      var result = this.getAllPricingPlansForCompany.filter((x) =>
        this.pricingPlansIds.basicPlans.includes(x.plan_code)
      )

      if (result.length > 0) {
        var sorteArray = result.sort(function (a, b) {
          return new Date(b.created_at) - new Date(a.created_at)
        })

        return sorteArray[0]
      } else {
        return ''
      }
    },
    getLeadsPlan() {
      var result = this.getAllPricingPlansForCompany.filter((x) =>
        this.pricingPlansIds.leadsPlans.includes(x.plan_code)
      )

      if (result.length > 0) {
        result.sort(function (a, b) {
          return b.created_at - a.created_at
        })

        return result[0]
      } else {
        return ''
      }
    },
    getProPlan() {
      var result = this.getAllPricingPlansForCompany.filter((x) =>
        this.pricingPlansIds.proPlans.includes(x.plan_code)
      )

      if (result.length > 0) {
        result.sort(function (a, b) {
          return b.created_at - a.created_at
        })

        return result[0]
      } else {
        return ''
      }
    },
    getCurrencyValue(value) {
      for (var index = 0; index < this.getCurrencyOptions.length; index++) {
        if (value == this.getCurrencyOptions[index].id) {
          return this.getCurrencyOptions[index].name
        }
      }
    },
    joinFreePlan(selectedPlan) {
      this.isShowFinalPricingPopup = true
      this.selectedPlan = selectedPlan
    },
    joinBasicPlan(selectedPlan) {
      this.isShowFinalPricingPopup = true
      this.selectedPlan = selectedPlan
    },
    joinLeadsPlan(selectedPlan) {
      this.isShowFinalPricingPopup = true
      this.selectedPlan = selectedPlan
    },
    joinProPlan(selectedPlan) {
      this.isShowFinalPricingPopup = true
      this.selectedPlan = selectedPlan
    },
    cancelByPlan() {
      this.selectedPlan = ''
      this.isShowFinalPricingPopup = false
    },
    buyPricingPlan() {}
  },
  created() {
    this.companyPricingResetState()
    this.fetchCompanyPricingPlanslist(this.getCurrentCompanyData.id).then(
      () => {
        this.fetchCurrency()
        this.pricingPlans.freePlan = this.getFreePlan()
        this.pricingPlans.basicPlan = this.getBasicPlan()
        this.pricingPlans.leadPlan = this.getLeadsPlan()
        this.pricingPlans.proPlan = this.getProPlan()
      }
    )
  }
}
</script>
