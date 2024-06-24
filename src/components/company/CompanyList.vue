<template>
  <div class="cls-companylist">
    <div class="container-fluid company-list mt-3">
      <div class="row justify-content-end">
        <b-alert
          v-if="getError"
          variant="danger"
          dismissible
          fade
          :show="dismissCountDown"
          @dismiss-count-down="countDownChanged"
          >{{ getError }}</b-alert
        >
      </div>
      <div class="row justify-content-between">
        <div class="w-100">
          <div class="form-conatiner">
            <div class="d-flex justify-content-between align-items-center">
              <span
                class="fontSize22 font-weight-700 ml-2 app-secondary-text-color"
                >Business</span
              >
              <div class="" v-if="userData.is_admin">
                <div class="searchbar d-flex align-items-center mr-4">
                  <span>
                    <img src="../../assets/img/admin-search.svg" alt="Search" />
                  </span>
                  <input
                    autocomplete="off"
                    type="text"
                    placeholder="Search Company"
                    name="search"
                    v-on:keyup="isEnterClicked($event)"
                    v-model="searchFor"
                  />
                </div>
              </div>
            </div>
            <div
              class="row mt-2 card-list-wrapper"
              v-if="allCompanies.length > 0"
            >
              <div
                class="col-12 col-md-4 col-lg-4 mb-3 pl-0"
                v-for="(company, counter) in allCompanies"
                :key="counter"
              >
                <CompanyCardWithEditButton
                  :company="company"
                ></CompanyCardWithEditButton>
              </div>
            </div>
            <div v-if="allCompanies.length == 0">No record found</div>
          </div>
        </div>
      </div>
    </div>
    <modal v-if="showPublish" @closeModal="publish" id="company_list">
      <div slot="body">{{ getPublish }}</div>
    </modal>

    <modal v-if="showMarkAsPaidModal" class="markAsPaid-modal">
      <div slot="body">
        <div class="row pricing-plans-row">
          <div
            class="pricing-plan-card"
            :class="getClassAsPerTotalPricing()"
            v-for="(pricing_plan, counter) in getAllPricingPlansForCompany"
            :key="counter"
          >
            <div
              style="display: flex; flex-direction: column; align-items: center"
            >
              <div class="fontSize16 bold-text">
                {{ pricing_plan.plan_name }}
              </div>
              <div class="fontSize12">{{ pricing_plan.plan_code }}</div>
              <div class="fontSize16 bold-text">
                {{ pricing_plan.plan_price }}
                {{ getCurrencyValue(pricing_plan.currency) }}
              </div>
              <div class="fontSize16">
                <button
                  class="btn btn-dark"
                  @click="pricingPlanSelected(pricing_plan)"
                >
                  Select
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="selectedPlan != ''">
          <div class="mt-4">
            <div class="fontSize16 bold-text">
              {{ this.selectedPlan.plan_name }}
              <span class="fontSize12"
                >( {{ this.selectedPlan.plan_code }} )</span
              >
            </div>
            <div class="fontSize20 bold-text">
              {{ this.actual_price }}
              {{ getCurrencyValue(this.selectedPlan.currency) }}
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-sm-6">
              <div class="fontSize17">Cheque No./Transaction Id</div>
              <input
                type="text"
                class="form-control input-lg"
                v-model="transaction_details"
              />
              <div
                v-if="submitted && !$v.transaction_details.required"
                class="invalid-feedback d-block fontSize14"
              >
                Transaction details required
              </div>
            </div>
            <div class="col-sm-6 selected-plan-logo-div fontSize16">
              <div class="fontSize16">Paid At</div>
              <div>
                <b-form-datepicker
                  id="datepicker-paidAt"
                  placeholder="date"
                  size="sm"
                  locale="en"
                  v-model="paidDate"
                  :max="max_date"
                  :value-as-date="true"
                  :date-format-options="{
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                    weekday: 'short'
                  }"
                ></b-form-datepicker>
                <div
                  v-if="submitted && !$v.paidDate.required"
                  class="invalid-feedback d-block fontSize14"
                >
                  Paid date required
                </div>
              </div>
            </div>
          </div>

          <div class="body-second-row">
            <div class="">
              <div class="fontSize17 discount_text">Discount Coupon</div>
              <div class="discount-div">
                <input
                  type="text"
                  class="form-control input-lg bold-text discount-input"
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
        </div>

        <div class="mt-4">
          <button
            v-if="selectedPlan != ''"
            class="btn btn-dark buy-btn bold-text mr-2"
            @click="updatePaymentDetails"
          >
            Mark as Paid
          </button>
          <button
            class="btn btn-dark buy-btn bold-text cancel-btn"
            @click="closeMarkAsPaidModal"
          >
            Cancel
          </button>
        </div>
      </div>

      <div slot="footer"></div>
    </modal>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import appConstants from '../../appConstants.js'
import modal from '../../common/Modal'
import { required, requiredIf } from 'vuelidate/lib/validators'
//import createCompany from '../CreateCompany/createCompany.vue'
import CompanyCardWithEditButton from './common/CompanyCardWithEditButton.vue'
import '../../assets/css/appcolor.css'

export default {
  name: 'CompanyList',
  components: { modal, CompanyCardWithEditButton },
  data() {
    return {
      errorMessage: '',
      dismissSecs: 10,
      dismissCountDown: 4,
      showPublishModal: false,
      publishComIndex: 0,
      searchText: '',
      company_status: appConstants.company_status,

      showMarkAsPaidModal: false,
      current_markAspaid_companyId: '',
      selectedPlan: '',
      actual_price: '',
      discount_coupon: '',
      final_price: '',
      discount_error: '',
      appliedDiscount: '',
      paidDate: '',
      transaction_details: '',
      max_date: new Date(),

      submitted: false,
      enum_category: appConstants.category,
      enum_country_iso: appConstants.country_iso,
      portfolio_url: appConstants.PORTFOLIO_URL,
      searchFor: ''
      // isAdmin: true
    }
  },
  computed: {
    ...mapGetters([
      'allCompanies',
      'getError',
      'getPublish',
      'isAdmin',
      'userData'
    ]),
    ...mapGetters('dropdownValues', ['getCurrencyOptions', 'getCompanyType']),
    ...mapGetters('companyPricing', [
      'getAllPricingPlansForCompany',
      'getCompanyPaymentStatus'
    ]),
    // eslint-disable-next-line vue/return-in-computed-property
    showPublish() {
      if (this.getPublish !== null) {
        return true
      }
    }
  },
  validations() {
    return {
      paidDate: { required },
      transaction_details: {
        required: requiredIf(function () {
          if (this.final_price > 0) {
            return true
          } else {
            return false
          }
        })
      }
    }
  },
  methods: {
    ...mapActions([
      'searchCompany',
      'fetchCompanies',
      'gotoProduct',
      'completeCompanyProfile',
      'editSingleCompany',
      'oneCompanyProducts',
      'goToPayment',
      'goToService',
      'publishCompany',
      'changePublishState',
      'markAsPaid',
      'action_getCompaniesData'
    ]),
    ...mapActions('dropdownValues', ['fetchCurrency']),
    ...mapActions('companyPricing', [
      'fetchCompanyPricingPlanslist',
      'calculateFinalpricefromDiscount',
      'fetchCurrentPaymentStatus'
    ]),
    ...mapActions(['saveCurrentCompanyId']),
    ...mapMutations('companyData', ['setCurrentCompanyData']),
    // eslint-disable-next-line no-dupe-keys
    searchCompanyName() {
      console.log('Searching for company: ' + this.searchFor)
      this.searchCompany(this.searchFor)
    },

    getImage(banner) {
      if (banner === '' || banner === null) {
        // return `http://via.placeholder.com/100x100`;
        // return `https://dummyimage.com/294x250`;
        return require(`@/assets/img/DefaultCompanyImage.png`)
      }
      // return `https://olous-dev.s3.ap-south-1.amazonaws.com/media/products/${banner}`;
      // return `https://daifhb63cb3v5.cloudfront.net/media/products/${banner}`;
      return `${process.env.VUE_APP_IMGURL}${banner}`
    },

    addProduct(company) {
      // console.log(companyId);
      // let data = {
      //   id: companyId
      // };
      // console.log(company);
      this.gotoProduct(company)
    },

    addService(company) {
      this.goToService(company)
    },

    addCompanyDetails(companyId, companyName, slugValue, categoryValue) {
      // console.log(name);
      let data = {
        id: companyId,
        name: companyName,
        slug: slugValue,
        category: categoryValue
      }
      this.completeCompanyProfile(data)
    },

    editCompany(data) {
      let companyData = data['comp_data']
      this.saveCurrentCompanyId(companyData.id)
      this.editSingleCompany(companyData)
    },

    viewProducts(company) {
      // console.log(company);
      // this.$router.push("/viewProducts");
      this.oneCompanyProducts(company)
    },

    makePayment(company) {
      this.goToPayment(company)
    },
    showAlert(error) {
      this.dismissCountDown = this.dismissSecs
      this.errorMessage = error
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },

    // eslint-disable-next-line no-unused-vars
    previewCompany(com) {
      // let myid = com.id
      // localStorage.setItem('myid', myid)
      // let routeUrl = this.$router.resolve({
      //   path: '/preview',
      //   params: { id: myid }
      // })
      // window.open(routeUrl.href, '_blank')
    },

    publishComp(company, i) {
      // console.log(i);
      this.publishComIndex = i
      this.publishCompany(company).then(() => {
        this.allCompanies[this.publishComIndex].status =
          appConstants.company_status.PUBLISHED
      })
    },

    publish() {
      this.changePublishState()
      //this.allCompanies[this.publishComIndex].status = 4
      //this.$refs['publish-Modal'].hide()
    },
    goToAddNewCompany() {
      // this.$router.push({ name: 'companyName' })
      this.$router.push({ name: appConstants.routes.ADD_COMPANY })
    },
    markAsPaidCompany(company) {
      //this.markAsPaid({ id: company.id })
      this.current_markAspaid_companyId = company.id
      this.fetchCurrency()
      this.fetchCompanyPricingPlanslist(company.id)
      this.fetchCurrentPaymentStatus(company.id).then(() => {
        if (this.getCompanyPaymentStatus.islinkSent) {
          this.selectedPlan = this.getCompanyPaymentStatus.linksentRecord[0].pricing_plan_details
          this.discount_coupon = this.getCompanyPaymentStatus.linksentRecord[0].discount_coupon
          this.appliedDiscount = this.getCompanyPaymentStatus.linksentRecord[0].discount_coupon
          this.final_price =
            this.getCompanyPaymentStatus.linksentRecord[0].final_price / 100 //convert paisa to rupees

          this.actual_price =
            this.getCompanyPaymentStatus.linksentRecord[0].actual_price / 100 //convert paisa to rupees
        }

        this.showMarkAsPaidModal = true
      })
    },
    getCurrencyValue(value) {
      for (var index = 0; index < this.getCurrencyOptions.length; index++) {
        if (value == this.getCurrencyOptions[index].id) {
          return this.getCurrencyOptions[index].name
        }
      }
    },
    getClassAsPerTotalPricing() {
      if (this.getAllPricingPlansForCompany.length == 1) {
        return 'col-md-12'
      }

      if (this.getAllPricingPlansForCompany.length == 2) {
        return 'col-md-6'
      }

      if (this.getAllPricingPlansForCompany.length == 3) {
        return 'col-4'
      }

      if (this.getAllPricingPlansForCompany.length == 4) {
        return 'col-md-6'
      }

      if (this.getAllPricingPlansForCompany.length > 4) {
        return 'col-md-4'
      }
    },
    showDiscount_error() {
      if (this.discount_error.trim() != '') {
        return true
      } else {
        return false
      }
    },
    closeMarkAsPaidModal() {
      this.clearSelectedPlanDetails()
    },
    clearSelectedPlanDetails() {
      this.selectedPlan = ''
      this.showMarkAsPaidModal = false
      this.discount_coupon = ''
      this.actual_price = ''
      this.final_price = ''
      this.discount_error = ''
      this.appliedDiscount = ''
      this.paidDate = ''
      this.transaction_details = ''
      this.current_markAspaid_companyId = ''
      this.submitted = false
    },
    pricingPlanSelected(selectedPricingPlan) {
      this.selectedPlan = selectedPricingPlan
      this.actual_price = this.selectedPlan.plan_price
      this.final_price = this.selectedPlan.plan_price
      this.discount_coupon = ''
      this.discount_error = ''
      this.appliedDiscount = ''
      this.paidDate = ''
      this.transaction_details = ''
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
          this.final_price = this.actual_price
          this.appliedDiscount = ''
          this.discount_error = errorMesage
          this.discount_coupon = ''
        })
    },
    updatePaymentDetails() {
      this.submitted = true
      if (this.$v.paidDate.$invalid || this.$v.transaction_details.$invalid) {
        return false
      }

      var data = {
        company_id: this.current_markAspaid_companyId,
        pricingplans_id: this.selectedPlan.id,
        actual_price: this.actual_price,
        discount_coupon: this.appliedDiscount,
        final_price: this.final_price,
        paid_at: this.paidDate.toISOString().split('.')[0] + 'Z',
        transaction_details: this.transaction_details
      }

      this.markAsPaid(data).then(() => {
        this.clearSelectedPlanDetails()
      })
    },
    onContext(ctx) {
      this.dateInYMDFormat = ctx.selectedYMD
    },
    isEnterClicked(e) {
      if (e.keyCode === 13) {
        console.log('enter clicked')
        this.searchClick()
      }
    },
    searchClick() {
      switch (this.$route.name) {
        case appConstants.routes.COMPANYLIST:
          this.searchCompanyName()
          //this.emitSearchButtonEvent('search-company')
          break
        // case appConstants.routes.JOB:
        //   this.emitSearchButtonEvent('search-job')
        //   break
        // case appConstants.routes.NEWS:
        //   this.emitSearchButtonEvent('search-news')
        //   break
        // case appConstants.routes.ADS:
        //   this.emitSearchButtonEvent('search-ads')
        //   break
      }
    }
  },
  mounted() {
    //this.$eventHub.$on('search-company', this.searchCompanyName)
  },
  created() {
    this.setCurrentCompanyData('')

    // this.action_getCompaniesData()
    if (
      this.userData.is_admin == undefined ||
      this.userData.is_admin === false
    ) {
      this.fetchCompanies()
    } else {
      if (this.allCompanies.length > 0) {
        //do nothing show companies from store
      } else {
        this.searchCompany('')
        //this.action_getCompaniesData()
      }
    }
  },
  beforeDestroy() {
    //this.$eventHub.$off('add-company')
    this.$eventHub.$off('search-company')
  }
}
</script>

<style scoped>
/**** styles for dashboard cards ****/
.card-list-wrapper {
  padding: 0 20px;
}
.company-btn {
  border-radius: 4px;
  background-color: var(--app-primary-color);
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
  /* padding: 7px 24px 7px 24px; */
  width: 98px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card {
  margin: 18px auto;
  border: 0;
  box-shadow: 0px 1px 20px rgba(23, 26, 29, 0.035);
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.1);
}

.company-name {
  padding-bottom: 9px;
}
.company-name span {
  display: block;
  font-size: 22px;
  font-weight: 500;
  line-height: 1.1;
}

.company-slug {
  margin-top: 2px;
  display: block;
  font-size: 14px;
  font-weight: 700;
  font-family: 'Manrope Bold';
  -webkit-font-smoothing: antialiased;
  line-height: 1.1;
}

.card-header {
  background-color: transparent;
  padding: 0 20px;
  margin-bottom: 10px;
  border: 0;
}
.card label {
  display: block;
  font-size: 10px;
  margin: 0;
  padding: 0;
  font-weight: 700;
  font-family: 'Manrope Bold';
  -webkit-font-smoothing: antialiased;
  letter-spacing: 0.05rem;
  opacity: 0.65;
}

.card-body {
  padding: 0 20px;
}

.card-header .button-wrapper {
  padding-bottom: 9px;
}

.cover-img {
  position: relative;
  max-width: 500px;
  max-height: 250px;
  min-height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.cover-img-wrapper {
  max-height: 250px;
  min-height: 250px;
  overflow: hidden;
}

.cover-img:after {
  content: '';
  background: rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  bottom: 0;
  right: 0;
}

.edit-btn-wrapper {
  position: absolute;
  top: 8px;
  right: 8px;
  /* width: 90px; */
  height: 32px;
  overflow: hidden;
  min-width: 32px;
  min-height: 32px;
  background: rgba(0, 0, 0, 0.85);
  border-radius: 27px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  z-index: 3;
  transition: width 0.3s ease-in-out;
  cursor: pointer;
  padding: 5px 12px;
  /* padding-left: 28px; */
}

/* .edit-btn-wrapper:hover {
} */
.edit-btn-wrapper:hover .btn-copy {
  opacity: 1;
}
.btn-copy {
  min-width: 40px;
  transition: opacity 0.25s ease-in-out;
  transition-delay: 0.05s;
  color: #fff;
}

.btn.btn-icon {
  text-transform: uppercase;
  font-weight: bold;
  font-size: 10px;
  text-align: center;
  letter-spacing: 0.025rem;
  margin: 0;
  padding: 0;
  text-align: right;
  line-height: 1;
}
.btn-icon span {
  display: inline-block;
}

.btn-icon .edit-icon {
  color: #fff;
  min-width: 23px;
  min-height: 32px;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  left: 0;
  top: 0;
  font-size: 14px;
  font-weight: 300;
  display: flex;
}

.footer-btn-wrapper {
  display: flex;
  justify-content: space-around;
  padding: 0 10px 15px;
}
.footer-btn-wrapper .btn {
  max-width: 48%;
  flex: 0 0 48%;
}
.incomplete-profile {
  /* background-color: #ff7d7d; */
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
  color: #111111;
  z-index: 2;
  margin-top: 16px;
  margin-left: 15px;
  margin-right: 15px;
  /* border-top-left-radius: 15px;
  border-top-right-radius: 15px; */
  border-radius: 15px;
}
.incomplete-profile .footer-btn-wrapper .btn {
  max-width: 100%;
  flex: 0 0 100%;
}
/*.incomplete-profile .company-name span,
.incomplete-profile p {
   text-shadow: 0 0px 2px rgb(105 1 11); 
}*/

/* Mark as paid modal css start */
.applydiscount {
  margin-top: auto;
  margin-bottom: auto;
  background: #e2e2e2;
  border: none;
  max-width: 125px;
  width: 100%;
  height: 40px;
  border-radius: 5px;
  color: #000000;
  font-size: 20px;
  flex-shrink: 0;
  margin-top: 5px;
}

.body-second-row {
  margin-top: 10px;
}

.discount-div {
  display: flex;
}

.buy-btn {
  height: 35px;
  border-radius: 5px;
  width: 100%;
  max-width: 130px;
  font-size: 15px;
}

.pricing-plans-row {
  border: solid 1px #000000;
  padding-top: 25px;
  padding-bottom: 25px;
}
/* SEARCH BAR CSS */
.searchbar {
  min-width: 254px;
  max-width: 254px;
}
.searchbar input[type='text'] {
  padding-top: 1px;
  padding-left: 4px;
  padding-right: 4px;
  padding-bottom: 4px;
  border: 1px solid var(--app-secondary-color);
  float: left;
  /* width: 80%; font-size: 14px;  padding: 4px; color: white;*/
  background-color: var(--app-secondary-color) !important;
  background: var(--app-secondary-color) !important ;
  border-top-right-radius: 4px !important;
  border-bottom-right-radius: 4px !important;
  border-radius: 0px;
  height: 36px;
  width: 100%;
  color: #8d8d8d;
  font-size: 14px;
  font-weight: 600;
  font-family: 'Manrope Semibold' !important;
}
.searchbar input[type='text']::placeholder {
  color: #8d8d8d;
  font-size: 12px !important;
  font-family: 'Manrope Light' !important;
}
.searchbar input[type='text']:focus-visible {
  outline: none;
}
.searchbar input[type='text']:focus {
  outline: none;
}
.searchbar span {
  float: left;
  /* width: 20%;
  padding: 10px; */
  background: var(--app-secondary-color);
  background-color: var(--app-secondary-color);
  color: #8d8d8d;
  font-size: 14px;
  border: 1px solid var(--app-secondary-color);
  border-left: none;
  cursor: pointer;
  height: 36px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  padding-right: 2px;
  padding-left: 12px;
  display: flex;
  align-items: center;
}

.searchbar::after {
  content: '';
  clear: both;
  display: table;
}
.searchbar .fa {
  color: #000;
  font-weight: 100;
}
/***************** Mobile style*******************/
@media only screen and (max-width: 992px) {
  .applydiscount {
    max-width: 80px !important;
  }

  .final-price-row {
    font-size: 18px;
  }

  .discount-input {
    font-size: 16px !important;
  }

  .cancel-btn {
    margin-top: 5px;
  }
}

/* END Mark as paid Modal css start */
</style>
