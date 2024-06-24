<template>
  <div class="Enquery-list">
    <div class="form-conatiner cls-pricing">
      <div class="form-max-width bg-white border p-4">
        <div class="form-group">
          <div style="display: flex; justify-content: space-between">
            <label class="plan-code">Plan Code</label>
            <div>
              <input
                type="checkbox"
                class="chkActive"
                name="urgent"
                @change="chkActivePlanEvent"
                v-model="pricingData.is_active"
              />
              <label
                for="urgent"
                class="app-primary-text-color font-weight-bold ml-2 active-text"
              >
                Active</label
              >
            </div>
          </div>

          <input
            type="text"
            class="form-control input-lg"
            v-model="pricingData.plan_code"
            maxlength="10"
          />
          <div
            v-if="submitted && !$v.pricingData.plan_code.required"
            class="invalid-feedback d-block"
          >
            Plan name is required
          </div>
          <div
            v-if="submitted && !$v.pricingData.plan_code.maxLength"
            class="invalid-feedback d-block"
          >
            Please enter max 10 character
          </div>
        </div>

        <div class="form-group">
          <label>Plan name</label>
          <input
            type="text"
            class="form-control input-lg"
            v-model="pricingData.plan_name"
          />
          <div
            v-if="submitted && !$v.pricingData.plan_name.required"
            class="invalid-feedback d-block"
          >
            Plan name is required
          </div>
        </div>

        <div class="form-group">
          <label>Plan details</label>
          <b-form-textarea
            name="plan_details"
            v-model="pricingData.plan_details"
            cols="40"
            rows="7"
            max-rows="15"
            no-resize
            class="form-control"
          ></b-form-textarea>
          <div
            v-if="submitted && !$v.pricingData.plan_details.required"
            class="invalid-feedback d-block"
          >
            Plan details is required
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-6">
            <label>Plan Type</label>
            <select
              class="form-control input-lg"
              v-model="pricingData.plan_type"
              name="plan_type"
            >
              <option
                v-for="item in getCompanyType"
                :value="item.id"
                :key="item.id"
              >
                {{ item.name }}
              </option>
            </select>
            <div
              v-if="submitted && !$v.pricingData.plan_type.required"
              class="invalid-feedback d-block"
            >
              Plan type is required
            </div>
          </div>

          <div class="col-md-6">
            <label>Country</label>
            <v-select
              v-model="pricingData.country"
              label="name"
              :options="filteredCountry[0].data"
              @search="fetchCountryValues"
              @input="onCountrySelected($event)"
              placeholder="Enter country"
              class="single-value remove-close-btn remove-dropdown-icon form-control options-on-search-only"
            ></v-select>

            <div
              v-if="submitted && !$v.pricingData.country.required"
              class="invalid-feedback d-block"
            >
              Country is required
            </div>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-6">
            <label>Price</label>
            <input
              type="text"
              class="form-control input-lg"
              v-model="pricingData.plan_price"
            />
            <div
              v-if="submitted && !$v.pricingData.plan_price.required"
              class="invalid-feedback d-block"
            >
              Price is required
            </div>
            <div
              v-if="submitted && !$v.pricingData.plan_price.numeric"
              class="invalid-feedback d-block"
            >
              Plan price is invalid
            </div>
            <div
              v-if="submitted && !$v.pricingData.plan_price.greated_than_zero"
              class="invalid-feedback d-block"
            >
              Plan price must be greater than zero
            </div>
          </div>

          <div class="col-md-6">
            <label>Currency</label>
            <select
              class="form-control input-lg"
              v-model="pricingData.currency"
              name="currency"
            >
              <option
                v-for="item in getCurrencyOptions"
                :value="item.id"
                :key="item.id"
              >
                {{ item.name }}
              </option>
            </select>
            <div
              v-if="submitted && !$v.pricingData.currency.required"
              class="invalid-feedback d-block"
            >
              Currency is required
            </div>
          </div>
        </div>

        <div>
          <div
            class="mb-3"
            v-for="(plan_option, counter) in pricingData.options"
            :key="counter"
          >
            <div style="display: flex">
              <input
                type="checkbox"
                class="chkActive"
                v-model="plan_option.is_applicable"
              />
              <label
                for="urgent"
                class="app-primary-text-color font-weight-bold ml-3 active-text"
              >
                {{ plan_option.display_value }}</label
              >
            </div>
          </div>
        </div>

        <div class="form-group row">
          <!-- <div class="col-4">
                  
                </div> -->
          <div class="col-12 d-flex justify-content-end text-right">
            <button type="button" class="btn" @click="btnCancelClick">
              Cancel
            </button>
            <button
              type="button"
              class="btn ml-2"
              @click="btnSavePricingPlan()"
            >
              {{ getSaveButtontext }}
            </button>
          </div>
        </div>
      </div>

      <modal
        v-if="showPricingModal"
        @closeModal="updateShowPricingModal([false, ''])"
      >
        <div slot="body">{{ this.pricingModalMessage }}</div>
      </modal>

      <modal v-if="isShowCancelModal" @closeModal="isShowCancelModal = false">
        <div slot="body">Leave the page without saving?</div>
        <div slot="footer">
          <b-button variant="outline-danger" @click="isShowCancelModal = false">
            Cancel
          </b-button>
          <b-button
            class="ml-2 btn"
            variant="outline-dark"
            @click="goToPricingListPage"
          >
            OK
          </b-button>
        </div>
      </modal>

      <modal
        v-if="isShowInActivePlanModal"
        @closeModal="isShowInActivePlanModal = false"
      >
        <div slot="body">Do you really want to deactive this plan?</div>
        <div slot="footer">
          <b-button
            class="btn"
            variant="outline-dark"
            @click="
              isShowInActivePlanModal = false
              pricingData.is_active = true
            "
          >
            Cancel
          </b-button>
          <b-button
            class="ml-2 btn"
            variant="outline-dark"
            @click="isShowInActivePlanModal = false"
          >
            Yes
          </b-button>
        </div>
      </modal>
    </div>
  </div>
</template>

<script>
import { required, numeric, maxLength } from 'vuelidate/lib/validators'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import modal from '../../common/Modal'
import appConstants from '../../appConstants.js'
const greated_than_zero = (value) => {
  if (value.toString().trim() == '') {
    return true
  } else {
    return value > 0
  }
}

export default {
  name: 'AddPricing',
  components: {
    modal
  },
  data() {
    return {
      pricingData: {
        id: '',
        plan_code: '',
        plan_name: '',
        plan_details: '',
        plan_price: '',
        plan_type: 1,
        currency: '',
        country: '',
        country_iso: '',
        country_code: '',
        is_active: true,
        options: []
      },
      submitted: false,
      saveButtonText: 'Save',
      pricingSavedCopy: '',
      isShowCancelModal: false,
      isShowInActivePlanModal: false
    }
  },
  validations() {
    return {
      pricingData: {
        plan_code: { required, maxLength: maxLength(10) },
        plan_name: { required },
        plan_details: { required },
        plan_price: { required, numeric, greated_than_zero },
        plan_type: { required },
        currency: { required },
        country: { required }
      }
    }
  },
  computed: {
    ...mapGetters('dropdownValues', [
      'getCurrencyOptions',
      'getCompanyType',
      'filteredCountry'
    ]),
    ...mapGetters('pricing', [
      'showPricingModal',
      'pricingModalMessage',
      'getPricingPlanDetails',
      'getPricingPlansOptionsList'
    ]),
    getSaveButtontext() {
      if (this.pricingData.id == '' || this.pricingData.id == undefined) {
        return 'Save'
      } else {
        return 'Update'
      }
    }
  },
  methods: {
    ...mapMutations('pricing', ['updateShowPricingModal']),
    ...mapActions('pricing', [
      'createPricingPlan',
      'updatePricingPlan',
      'fetchAllPricingPlanOptions'
    ]),
    ...mapActions('dropdownValues', [
      'searchContry',
      'fetchCurrency',
      'fetchCompanyType'
    ]),
    fetchCountryValues(text) {
      if (text === undefined) {
        return
      }
      this.searchContry(text)
    },
    onCountrySelected(item) {
      if (item == null) {
        this.pricingData.country = ''
        this.pricingData.country_iso = ''
        this.pricingData.country_code = ''
      } else {
        this.pricingData.country = item.name
        this.pricingData.country_iso = item.iso2
        this.pricingData.country_code = item.phone_code
      }
    },
    getPayload() {
      var data = {
        id: this.pricingData.id,
        plan_code: this.pricingData.plan_code,
        is_active: this.pricingData.is_active,
        plan_name: this.pricingData.plan_name,
        plan_details: this.pricingData.plan_details,
        plan_price:
          this.pricingData.plan_price == '' ? 0.0 : this.pricingData.plan_price,
        plan_type: this.pricingData.plan_type,
        currency: this.pricingData.currency,
        country: this.pricingData.country,
        country_iso: this.pricingData.country_iso,
        country_code: this.pricingData.country_code,

        options: this.pricingData.options
      }
      return data
    },
    addOrUpdateData() {
      let payload = this.getPayload()
      if (this.pricingData.id == '' || this.pricingData.id == undefined) {
        this.createPricingPlan(payload).then((id) => {
          this.pricingData.id = id
          this.pricingSavedCopy = JSON.parse(JSON.stringify(this.pricingData))
          this.submitted = false
        })
      } else {
        this.updatePricingPlan(payload).then(() => {
          this.pricingSavedCopy = JSON.parse(JSON.stringify(this.pricingData))
          this.submitted = false
        })
      }
    },
    goToPricingListPage() {
      this.$router.push({ name: appConstants.routes.PRICINGLIST })
    },
    btnSavePricingPlan() {
      this.submitted = true
      if (this.$v.pricingData.$invalid) {
        return false
      }
      this.addOrUpdateData()
    },
    btnCancelClick() {
      if (
        JSON.stringify(this.pricingData) ===
        JSON.stringify(this.pricingSavedCopy)
      ) {
        this.goToPricingListPage()
      } else {
        this.isShowCancelModal = true
      }
    },
    chkActivePlanEvent(event) {
      if (event.target.checked == false) {
        this.isShowInActivePlanModal = true
      }
    },
    deActivatePlan() {},
    setOptionValues() {
      for (
        var count = 0;
        count < this.getPricingPlanDetails.options.length;
        count++
      ) {
        var option = this.getPricingPlanDetails.options[count]
        for (var index = 0; index < this.pricingData.options.length; index++) {
          if (
            this.pricingData.options[index].pricingPlan_options_id ==
            option.pricingPlan_options_id
          ) {
            this.pricingData.options[index].is_applicable = option.is_applicable
          }
        }
      }
    }
  },
  created() {
    this.fetchCurrency()
    this.fetchCompanyType()
    this.fetchAllPricingPlanOptions().then(() => {
      for (
        var count = 0;
        count < this.getPricingPlansOptionsList.length;
        count++
      ) {
        var option = this.getPricingPlansOptionsList[count]
        if (option.is_active) {
          var data = {
            pricingPlan_options_id: option.id,
            display_value: option.display_value,
            is_applicable: false
          }
          this.pricingData.options.push(data)
        }
      }

      if (this.$route.name == appConstants.routes.UPDATE_PRICING) {
        this.pricingData.id = this.getPricingPlanDetails.id
        this.pricingData.plan_code = this.getPricingPlanDetails.plan_code
        this.pricingData.plan_name = this.getPricingPlanDetails.plan_name
        this.pricingData.plan_details = this.getPricingPlanDetails.plan_details
        this.pricingData.plan_price = this.getPricingPlanDetails.plan_price
        this.pricingData.plan_type = this.getPricingPlanDetails.plan_type
        this.pricingData.currency = this.getPricingPlanDetails.currency
        this.pricingData.country = this.getPricingPlanDetails.country
        this.pricingData.country_iso = this.getPricingPlanDetails.country_iso
        this.pricingData.country_code = this.getPricingPlanDetails.country_code
        this.pricingData.is_active = this.getPricingPlanDetails.is_active

        this.setOptionValues()
      }

      this.pricingSavedCopy = JSON.parse(JSON.stringify(this.pricingData))
    })
  }
}
</script>

<style scoped>
.plan-code {
  color: #000000;
}
.chkActive {
  transform: scale(1.3);
}

.active-text {
  font-family: 'Roboto Bold' !important;
}
</style>
