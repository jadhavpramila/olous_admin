<template>
  <div class="">
    <div class="mt-4">
      <!-- <div class="colspan-2"></div> -->

      <p class="pricing-title mb-1">Pricing</p>
      <p class="fontSize14 text-center">Choose a plan for Job Posting</p>
      <!-- <div class="colspan-2"></div> -->
      <div class="d-flex justify-content-center">
        <div
          class="d-flex w-auto col-12 column-gap justify-content-center px-0"
        >
          <div
            v-for="(data, index) in getJobPricingPlanData"
            :key="index"
            class="d-flex"
            :class="getPricingColorClass(data)"
          >
            <div
              class="d-flex align-items-center"
              v-if="data.plan_code != jobPricingPlan.FREE"
            >
              <div
                class="align-items-center d-flex justify-content-center rect-bg"
                v-if="data.plan_code != jobPricingPlan.FREE"
              >
                <div class="pricing-price">
                  <span
                    class="pricing-price-rotate"
                    v-if="data.plan_type == pricingPlanDuration.YEARLY"
                    ><img
                      src="../../../assets/img/rupee.png"
                      alt="rupee"
                      class="rupee-symbol"
                    />&nbsp; {{ data.plan_price }} / Annually</span
                  >
                  <span
                    class=""
                    v-if="data.plan_type == pricingPlanDuration.HALF_YEARLY"
                    ><img
                      src="../../../assets/img/rupee.png"
                      alt="rupee"
                      class="rupee-symbol"
                    />&nbsp; {{ data.plan_price }} / Half-Yearly</span
                  >
                  <span
                    class=""
                    v-if="data.plan_type == pricingPlanDuration.QUATERLY"
                    ><img
                      src="../../../assets/img/rupee.png"
                      alt="rupee"
                      class="rupee-symbol"
                    />&nbsp; {{ data.plan_price }} / Quaterly</span
                  >
                  <span
                    class=""
                    v-if="data.plan_type == pricingPlanDuration.MONTHLY"
                    ><img
                      src="../../../assets/img/rupee.png"
                      alt="rupee"
                      class="rupee-symbol"
                    />&nbsp; {{ data.plan_price }} / Monthly</span
                  >
                </div>
              </div>
            </div>

            <div
              v-if="data.plan_code != jobPricingPlan.FREE"
              class="pricing-card"
            >
              <div class="d-flex flex-column">
                <span class="pricing-plan-name text-center">{{
                  data.plan_name
                }}</span>

                <!-- <div class="hr-line"></div> -->
                <div class="d-flex flex-column">
                  <ul>
                    <li
                      class="pricing-text"
                      v-if="
                        data.plan_code != jobPricingPlan.FREE &&
                        data.plan_code == jobPricingPlan.BASIC
                      "
                    >
                      12+2 Job Postings (Annually)
                    </li>
                    <li
                      class="pricing-text"
                      v-if="
                        data.plan_code != jobPricingPlan.FREE &&
                        data.plan_code == jobPricingPlan.PREMIUM
                      "
                    >
                      20+2 Job Postings (Annually)
                    </li>
                    <li
                      v-if="data.plan_code == jobPricingPlan.FREE"
                      class="pricing-text mt-4"
                    >
                      2 Job Posting
                    </li>
                    <li class="pricing-text">
                      First two job Posting are complimentary Which Needs to be
                      consumed in one Month from the Date
                    </li>
                    <li class="pricing-text">
                      Receive Shortlisted Candidates for each job Posting
                    </li>
                    <li class="pricing-text">
                      AI driven Percentage Matching Report for each job
                      Applicant
                    </li>
                  </ul>
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <span
                  v-if="data.plan_code != jobPricingPlan.FREE"
                  class="buy-now-btn"
                  @click="clickBuyNow(data.id)"
                  >Buy Now</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <p class="mt-4 annually-text">
        Save 50% on Premium plan.
        <!--  Any question?<b class="text-style-1">
          Contact Us</b
        > -->
      </p>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import appConstants from '../../../appConstants'
import '../../../assets/css/appcolor.css'
export default {
  name: 'JobPricing',
  components: {},
  data() {
    return {
      pricingPlanDuration: appConstants.pricing_plan_duration,
      jobPricingPlan: appConstants.pricing_plan_job,
      currencySymbol: '₹'
    }
  },

  computed: {
    ...mapGetters(['getJobPricingPlanData']),
    ...mapGetters(['allCompanies'])
  },
  methods: {
    ...mapActions(['jobPricingPlanBuyNow']),
    clickBuyNow(planId) {
      let obj = {
        plan_id: planId,
        company_id: this.allCompanies[0].id
      }
      this.jobPricingPlanBuyNow(obj).then((res) => {
        //console.log('response', res)
        window.location.href = res.url_to_pay_order
      })
    },
    getPricingColorClass(data) {
      if (data.plan_code == this.jobPricingPlan.BASIC) {
        return 'pricing-card-blue'
      } else if (data.plan_code == this.jobPricingPlan.PREMIUM) {
        return 'pricing-card-orange'
      }
    }
  },
  created() {},
  beforeDestroy() {}
}
</script>
<style>
.pricing-card-blue .pricing-card {
  width: 343px;
  height: auto;
  border-radius: 15px;
  border: solid 1px #c7c7c7;
}
.pricing-card-blue .rect-bg {
  border-radius: 15px 0px 0px 15px;
  background-color: var(--app-primary-color);
  padding-top: 12px;
  padding-bottom: 12px;
}
.pricing-card-blue .pricing-plan-name {
  font-size: 40px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: var(--app-primary-color);
  margin-top: 22px;
  margin-bottom: 22px;
}

.pricing-card-blue .pricing-card ul {
  /* list-style: none; */
  list-style-image: url('../../../assets/img/check-lg.svg');
  margin-bottom: 0px;
}

.pricing-card-blue .pricing-price {
  font-size: 26px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 10px;
  padding-right: 10px;
  min-width: 60px;
}
.pricing-card-blue .pricing-price-rotate {
  transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  width: 100% !important;
  writing-mode: tb;
  text-orientation: sideways;
  display: flex;
  justify-content: center;
  align-items: center;
}
.rupee-symbol {
  transform: rotate(90deg);
  height: 30px;
  width: 30px;
}
.pricing-card-blue .buy-now-btn {
  width: 199px;
  height: 36px;
  border-radius: 6px;
  background-color: var(--app-primary-color);
  font-size: 14.5px;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 27px;
  margin-top: 13px;
}
.pricing-card-orange .pricing-card {
  width: 343px;
  height: auto;
  border-radius: 15px;
  border: solid 1px #c7c7c7;
}
.pricing-card-orange .rect-bg {
  border-radius: 15px 0px 0px 15px;
  background-color: #d96f20;
  padding-top: 12px;
  padding-bottom: 12px;
}
.pricing-card-orange .pricing-plan-name {
  font-size: 40px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: #d96f20;
  margin-top: 22px;
  margin-bottom: 22px;
}

.pricing-card-orange .pricing-card ul {
  /* list-style: none; */
  list-style-image: url('../../../assets/img/check-lg.svg');
  margin-bottom: 0px;
}

.pricing-card-orange .pricing-price {
  font-size: 26px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 10px;
  padding-right: 10px;
  min-width: 60px;
}
.pricing-card-orange .pricing-price-rotate {
  transform: rotate(180deg);
  width: 100% !important;
  writing-mode: tb;
  text-orientation: sideways;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pricing-card-orange .buy-now-btn {
  width: 199px;
  height: 36px;
  border-radius: 6px;
  background-color: #d96f20;
  font-size: 14.5px;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 27px;
  margin-top: 13px;
}
.annually-text {
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  text-align: center;
  color: #000;
}
.pricing-title {
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  color: #1c1c1c;
}
.hr-line {
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
  height: 1px;
  background-color: #707070;
}
.column-gap {
  column-gap: 20px;
}

.pricing-text {
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #1c1c1c;
  line-height: 1.13;
  margin-bottom: 20px;
}

.job-plan {
  font-size: 14.5px;
  font-weight: normal;
  font-style: normal;
  text-align: center;
  color: #1c1c1c;
}
/* .pricing-card ul li::marker {
  content: '✓';
} */
</style>
