<template>
  <div class="form-conatiner cls-companypricing">
    <div class="button-row">
      <button
        class="payment-details-btn"
        v-if="getCompanyPaymentStatus.hasActivePlan"
        @click="showPaymentDetails"
      >
        Active Subscription Details
      </button>
      <button
        class="payment-details-btn"
        v-if="getCompanyPaymentStatus.islinkSent"
        @click="showPaymentDetails"
      >
        Payment Link Details
      </button>
    </div>

    <div class="row">
      <div
        class="pricing-plan-card"
        :class="getClassAsPerTotalPricing()"
        v-for="(pricing_plan, counter) in getAllPricingPlansForCompany"
        :key="counter"
      >
        <div class="heading-row" style="display: flex">
          <label class="plan-name bold-text">
            {{ pricing_plan.plan_name }}
          </label>
          <div class="plan-price">
            <label class="bold-text"
              >{{ pricing_plan.plan_price }}
              {{ getCurrencyValue(pricing_plan.currency) }}</label
            >
          </div>
        </div>
        <div
          v-for="(option, index) in pricing_plan.options"
          :key="counter + option + index"
        >
          <div
            class="option-row"
            style="display: flex"
            v-if="option.option_details.is_active"
          >
            <label class="option-display-value">{{
              option.option_details.display_value
            }}</label>
            <div class="option-image" v-if="option.is_applicable">
              <img class="" src="../../assets/img/tick.svg" />
            </div>
            <div class="option-image" v-else>
              <img class="" src="../../assets/img/Close_small.svg" />
            </div>
          </div>
          <hr class="pricing-option-divider" />
        </div>
        <div>
          <div
            class="buy-buttton cursor-pointer"
            :disabled="!isAllowThisPlan(pricing_plan)"
          >
            <button
              class="bold-text choose-plan-btn"
              @click="joinPlan(pricing_plan)"
              :disabled="!isAllowThisPlan(pricing_plan)"
            >
              {{ getTextForPlan(pricing_plan) }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <modal
      v-if="showCompanyPricingModal"
      @closeModal="updateShowCompanyPricingModal([false, ''])"
    >
      <div slot="body">{{ this.companyPricingModalMessage }}</div>
    </modal>

    <modal
      v-if="isShowCompanyLiveinfo"
      @closeModal="isShowCompanyLiveinfo = false"
    >
      <div slot="body">Company is Live now !!</div>
    </modal>

    <modal v-if="isShowSubscriptionPopup" class="subscription_modal">
      <div slot="body">
        <div v-if="getCompanyPaymentStatus.hasActivePlan">
          <div class="close-button-div">
            <img
              class="modal-subscription-close cursor-pointer"
              src="../../assets/img/Close_small.svg"
              @click="closeSubcriptionPopup()"
            />
          </div>

          <div class="row body-first-row">
            <div class="col-sm-6 col-8">
              <div class="fontSize22 bold-text">
                {{
                  getCompanyPaymentStatus.activePlan[0].pricing_plan_details
                    .plan_name
                }}
              </div>
              <div class="selected-plan-label">Plan Price</div>
              <div class="selected-plan-value bold-text">
                {{
                  convertPaisaTORupees(
                    getCompanyPaymentStatus.activePlan[0].actual_price
                  )
                }}
                {{
                  getCurrencyValue(
                    getCompanyPaymentStatus.activePlan[0].pricing_plan_details
                      .currency
                  )
                }}
              </div>
            </div>
            <div class="col-sm-6 col-4 subscription-plan-logo-div">
              <img
                class="selecte-plan-logo"
                src="../../assets/img/logo_Big.svg"
              />
            </div>
          </div>

          <div class="row body-second-row">
            <div class="col-sm-6 col-8">
              <div class="selected-plan-label">Subscription Start Date</div>
              <div class="selected-plan-value bold-text">
                {{ formatDate(getCompanyPaymentStatus.activePlan[0].paid_at) }}
              </div>
              <hr class="selected-price-divider" />

              <div class="selected-plan-label">Subscription valid till</div>
              <div class="selected-plan-value bold-text">
                {{
                  formatDate(
                    getCompanyPaymentStatus.activePlan[0].plan_expire_at
                  )
                }}
              </div>
              <hr class="selected-price-divider" />

              <div class="selected-plan-label">Order ID</div>
              <div class="selected-plan-value bold-text">
                {{ getCompanyPaymentStatus.activePlan[0].order.order_id }}
              </div>
            </div>
            <div class="col-sm-6 col-4 item-center-align">
              <div class="item-center-align paid-div">
                <div class="fontSize15">Paid</div>
                <div>
                  {{
                    convertPaisaTORupees(
                      getCompanyPaymentStatus.activePlan[0].final_price
                    )
                  }}
                </div>
                <div class="fontSize15">
                  {{
                    getCurrencyValue(
                      getCompanyPaymentStatus.activePlan[0].pricing_plan_details
                        .currency
                    )
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="getCompanyPaymentStatus.islinkSent">
          <div class="close-button-div">
            <img
              class="modal-subscription-close cursor-pointer"
              src="../../assets/img/Close_small.svg"
              @click="closeSubcriptionPopup()"
            />
          </div>

          <div class="row body-first-row">
            <div class="col-sm-6 col-8">
              <div class="fontSize22 bold-text">
                {{
                  getCompanyPaymentStatus.linksentRecord[0].pricing_plan_details
                    .plan_name
                }}
              </div>
              <div class="selected-plan-label">Plan Price</div>
              <div class="selected-plan-value bold-text">
                {{
                  convertPaisaTORupees(
                    getCompanyPaymentStatus.linksentRecord[0].actual_price
                  )
                }}
                {{
                  getCurrencyValue(
                    getCompanyPaymentStatus.linksentRecord[0]
                      .pricing_plan_details.currency
                  )
                }}
              </div>
            </div>
            <div class="col-sm-6 col-4 subscription-plan-logo-div">
              <img
                class="selecte-plan-logo"
                src="../../assets/img/logo_Big.svg"
              />
            </div>
          </div>

          <div class="row body-second-row">
            <div class="col-sm-6 col-8">
              <!--<div class="selected-plan-label">Link Sent Date & Time</div>
              <div class="selected-plan-value bold-text">
                {{
                  formatDate(
                    getCompanyPaymentStatus.linksentRecord[0].created_at
                  )
                }}
              </div>
              <hr class="selected-price-divider" />-->

              <div class="selected-plan-label">Link Expire Date & Time</div>
              <div class="selected-plan-value bold-text">
                {{
                  formatDate(
                    getCompanyPaymentStatus.linksentRecord[0].link_expire_at
                  )
                }}
              </div>
              <hr class="selected-price-divider" />

              <div class="selected-plan-label">Order ID</div>
              <div class="selected-plan-value bold-text">
                {{ getCompanyPaymentStatus.linksentRecord[0].order.order_id }}
              </div>

              <div class="body-second-row">
                <button class="btn btn-dark" @click="cancelPaymentLink">
                  Cancel Payment link
                </button>
              </div>
            </div>
            <div class="col-sm-6 col-4 item-center-align">
              <div class="item-center-align paid-div">
                <div class="fontSize15">Pay</div>
                <div>
                  {{
                    convertPaisaTORupees(
                      getCompanyPaymentStatus.linksentRecord[0].final_price
                    )
                  }}
                </div>
                <div class="fontSize15">
                  {{
                    getCurrencyValue(
                      getCompanyPaymentStatus.linksentRecord[0]
                        .pricing_plan_details.currency
                    )
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer"></div>
    </modal>

    <modal v-if="isShowFinalPricingPopup" class="finalprice_modal">
      <div slot="body">
        <div class="close-button-div">
          <img
            class="modal-subscription-close cursor-pointer"
            src="../../assets/img/Close_small.svg"
            @click="cancelBuyPlan"
          />
        </div>

        <div class="row">
          <div class="col-sm-6 col-8">
            <div class="fontSize33 bold-text">
              {{ this.selectedPlan.plan_name }}
            </div>
            <div class="fontSize20 bold-text">
              {{ this.selectedPlan.plan_price }}
              {{ getCurrencyValue(this.selectedPlan.currency) }}
            </div>
          </div>
          <div class="col-sm-6 col-4 selected-plan-logo-div">
            <img
              class="selecte-plan-logo"
              src="../../assets/img/logo_Big.svg"
            />
          </div>
        </div>

        <div class="body-second-row">
          <div class="">
            <div class="fontSize17 discount_text">Discount Coupon</div>
            <div class="discount-div">
              <input
                type="text"
                class="form-control input-lg fontSize12 bold-text discount-input"
                style="flex-grow: 1"
                v-model="discount_coupon"
              />
              <button
                type="button"
                class="ml-1 btn applydiscount bold-text"
                @click="calculateFinalPrice()"
              >
                Apply
              </button>
            </div>
            <div style="color: red" v-if="showDiscount_error">
              {{ discount_error }}
            </div>

            <div class="final-price-row bold-text">
              Final Price :
              {{ this.final_price }}
              {{ getCurrencyValue(this.selectedPlan.currency) }}
              + 18% GST
            </div>
          </div>
        </div>

        <div class="mt-4">
          <button
            class="btn btn-dark buy-btn bold-text"
            @click="buyPricingPlan"
          >
            BUY
          </button>
        </div>
      </div>

      <div slot="footer"></div>
    </modal>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import modal from '../../common/Modal'
import moment from 'moment'

export default {
  name: 'CompanyPricing',
  components: {
    modal
  },
  data() {
    return {
      isShowFinalPricingPopup: false,
      isShowSubscriptionPopup: false,
      isShowCompanyLiveinfo: false,

      selectedPlan: '',
      discount_coupon: '',
      final_price: '',
      discount_error: '',
      appliedDiscount: ''
    }
  },
  computed: {
    ...mapGetters('companyData', ['getCurrentCompanyData']),
    ...mapGetters('companyPricing', [
      'getAllPricingPlansForCompany',
      'getCompanyPaymentStatus',
      'showCompanyPricingModal',
      'companyPricingModalMessage'
    ]),
    ...mapGetters('dropdownValues', ['getCurrencyOptions', 'getCompanyType'])
  },
  methods: {
    ...mapActions('companyPricing', [
      'fetchCompanyPricingPlanslist',
      'fetchCurrentPaymentStatus',
      'sendPaymentLinkToUser',
      'calculateFinalpricefromDiscount',
      'cancelPaymentLinkOfUser'
    ]),
    ...mapActions('dropdownValues', ['fetchCurrency']),
    ...mapMutations('companyPricing', [
      'companyPricingResetState',
      'updateShowCompanyPricingModal'
    ]),
    ...mapActions(['markAsPaid']),

    getCurrencyValue(value) {
      for (var index = 0; index < this.getCurrencyOptions.length; index++) {
        if (value == this.getCurrencyOptions[index].id) {
          return this.getCurrencyOptions[index].name
        }
      }
    },
    joinPlan(selectedPlan) {
      this.isShowFinalPricingPopup = true
      this.selectedPlan = selectedPlan
      this.final_price = this.selectedPlan.plan_price
    },

    cancelBuyPlan() {
      this.clearSelectedPlanDetails()
    },
    clearSelectedPlanDetails() {
      this.selectedPlan = ''
      this.isShowFinalPricingPopup = false
      this.discount_coupon = ''
      this.final_price = ''
      this.discount_error = ''
      this.appliedDiscount = ''
    },
    isAllowThisPlan(plan) {
      if (
        (this.getCompanyPaymentStatus.hasActivePlan &&
          this.getCompanyPaymentStatus.activePlan[0].pricingplans_id ==
            plan.id) ||
        (this.getCompanyPaymentStatus.islinkSent &&
          this.getCompanyPaymentStatus.linksentRecord[0].pricingplans_id ==
            plan.id)
      ) {
        return false
      } else {
        return true
      }
    },
    formatDate(dt) {
      return moment(dt).format('MMMM Do YYYY, h:mm a')
    },
    calculateFinalPrice() {
      var data = {
        actual_price: this.selectedPlan.plan_price,
        discount_coupon: this.discount_coupon
      }

      this.calculateFinalpricefromDiscount(data)
        .then((result) => {
          this.final_price = result
          this.appliedDiscount = this.discount_coupon
          this.discount_error = ''
          this.discount_coupon = ''
        })
        .catch((errorMesage) => {
          this.final_price = this.selectedPlan.plan_price
          this.discount_error = errorMesage
          this.discount_coupon = ''
          this.appliedDiscount = ''
        })
    },
    buyPricingPlan() {
      var data = {
        company_id: this.getCurrentCompanyData.id,
        pricingplans_id: this.selectedPlan.id,
        actual_price: this.selectedPlan.plan_price,
        discount_coupon: this.appliedDiscount,
        final_price: this.final_price,
        paid_at: new Date().toISOString().split('.')[0] + 'Z'
      }

      if (this.final_price == 0) {
        this.markAsPaid(data)
          .then(() => {
            this.clearSelectedPlanDetails()
            this.fetchCurrentPaymentStatus(this.getCurrentCompanyData.id)
          })
          .catch(() => {
            this.clearSelectedPlanDetails()
          })
      } else {
        this.sendPaymentLinkToUser(data)
          .then(() => {
            //clear selected plan
            //show selected paln details
            this.clearSelectedPlanDetails()

            this.fetchCurrentPaymentStatus(this.getCurrentCompanyData.id)
          })
          .catch(() => {
            this.clearSelectedPlanDetails()
          })
      }
    },
    convertPaisaTORupees(amount) {
      var result = amount / 100
      return result
    },
    closeSubcriptionPopup() {
      this.isShowSubscriptionPopup = false
    },
    showDiscount_error() {
      if (this.discount_error.trim() != '') {
        return true
      } else {
        return false
      }
    },
    showPaymentDetails() {
      this.isShowSubscriptionPopup = true
    },
    getTextForPlan(plan) {
      if (
        this.getCompanyPaymentStatus.hasActivePlan &&
        this.getCompanyPaymentStatus.activePlan[0].pricingplans_id == plan.id
      ) {
        return 'Active Subscription'
      }

      if (
        this.getCompanyPaymentStatus.islinkSent &&
        this.getCompanyPaymentStatus.linksentRecord[0].pricingplans_id ==
          plan.id
      ) {
        return 'Sent Payment Link'
      }

      return 'Buy'
    },
    getClassAsPerTotalPricing() {
      if (this.getAllPricingPlansForCompany.length == 1) {
        return 'col-md-12'
      }

      if (this.getAllPricingPlansForCompany.length == 2) {
        return 'col-md-6'
      }

      if (this.getAllPricingPlansForCompany.length == 3) {
        return 'col-md-4'
      }

      if (this.getAllPricingPlansForCompany.length == 4) {
        return 'col-md-6'
      }

      if (this.getAllPricingPlansForCompany.length > 4) {
        return 'col-md-4'
      }
    },
    showCompanyLiveInfoModal() {
      this.isShowCompanyLiveinfo = true
      setTimeout(() => {
        this.isShowCompanyLiveinfo = false
      }, 2500)
    },
    cancelPaymentLink() {
      this.cancelPaymentLinkOfUser(this.getCurrentCompanyData.id).then(() => {
        this.closeSubcriptionPopup()
        this.fetchCurrentPaymentStatus(this.getCurrentCompanyData.id)
      })
    }
  },
  created() {
    this.companyPricingResetState()
    this.fetchCurrency()
    this.fetchCurrentPaymentStatus(this.getCurrentCompanyData.id)
    this.fetchCompanyPricingPlanslist(this.getCurrentCompanyData.id).then(
      () => {
        if (
          this.getCompanyPaymentStatus.hasActivePlan ||
          this.getCompanyPaymentStatus.islinkSent
        ) {
          this.isShowSubscriptionPopup = true
        } else {
          this.isShowSubscriptionPopup = false
        }
      }
    )
  }
}
</script>

<style scoped>
.applydiscount {
  margin-top: auto;
  margin-bottom: auto;
  background: #e2e2e2;
  border: none;
  max-width: 125px;
  width: 100%;
  height: 43px;
  border-radius: 5px;
  color: #000000;
  font-size: 20px;
  flex-shrink: 0;
  margin-top: 5px;
}

.discount-input {
  height: 43px;
  font-size: 20px;
}

.plan-name {
  flex-grow: 1;
  font-size: 20px;
  color: #000000;
}

.plan-price {
  background-color: #333;

  width: 150px;
  border-radius: 5px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.plan-price label {
  color: #ffffff;
  font-size: 20px;
}

.option-display-value {
  flex-grow: 1;
  font-size: 11px;
  color: #000000;
}

.option-image {
  width: 30px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  flex-shrink: 0;
}

.option-image img {
  display: flex;
}

.heading-row {
  margin-bottom: 30px;
  height: 25px;
  margin-bottom: 30px;
}

.pricing-option-divider {
  width: 100%;
  color: #707070;
  margin-top: 7px;
  margin-bottom: 7px;
}

.buy-buttton {
  background-color: #333;
  width: 100%;
  margin-top: 23px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 9px;
  border-bottom-right-radius: 9px;
  margin-bottom: 20px;
}

.buy-buttton[disabled] {
  background-color: #686262;
}

.choose-plan-btn {
  width: 100%;
  height: 100%;
  background: transparent;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  color: white;
  border: none;
}

.modal-close {
  height: 20px;
}

.selected-plan-label {
  font-size: 12px;
  color: #4a4a4a;
}

.selected-plan-value {
  font-size: 14.5px;
  margin-top: -4px;
}

.subscription-plan-logo-div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.selected-plan-logo-div {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
}

.selected-plan-logo-div .selecte-plan-logo {
  max-width: fit-content;
}
.selecte-plan-logo {
  max-width: 130px;
}
.selected-price-divider {
  margin-top: 6px;
  margin-bottom: 6px;
}

.body-first-row {
  margin-top: 25px;
}

.body-second-row {
  margin-top: 21px;
}

.item-center-align {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.paid-div {
  background: #000000;
  color: #ffffff;
  width: 122px;
  height: 122px;
  border-radius: 50%;
}

.close-button-div {
  display: flex;
  flex-direction: row-reverse;
  height: 20px;
  margin-top: -17px;
}

.discount_text {
  color: #333333;
}

.discount-div {
  display: flex;
}

.final-price-row {
  font-size: 20px;
}

.button-row {
  display: flex;
  flex-direction: row-reverse;
}

.payment-details-btn {
  font-weight: bold;
  border: 1px solid;
  background: transparent;
  border-radius: 5px;
  font-size: 13px;
  margin-bottom: 10px;
}

.buy-btn {
  height: 43px;
  border-radius: 5px;
  width: 100%;
  max-width: 145px;
  font-size: 23px;
}

/***************** Mobile style*******************/
@media only screen and (max-width: 992px) {
  .paid-div {
    width: 108px !important;
    height: 108px !important;
  }

  .applydiscount {
    max-width: 80px !important;
  }

  .final-price-row {
    font-size: 18px;
  }

  .discount-input {
    font-size: 16px !important;
  }

  .selecte-plan-logo {
    max-width: 130px !important;
  }
}
</style>
