<template>
  <div class="cls-FinancialInfo form-conatiner">
    <div class="form-container">
      <div class="form-group">
        <label class="">Year of Company establishment </label>

        <v-select
          id="establishmnetYear"
          label="name"
          :searchable="false"
          v-model="financialInfoData.company_est_year"
          :options="getEstablishmentYears"
          placeholder="select"
          :reduce="(options) => options.id"
          :closeOnSelect="true"
          class="single-value remove-close-btn"
          @input="onEstablishmentYearSelected()"
        />
        <div
          v-if="submitted && !$v.financialInfoData.company_est_year.required"
          class="invalid-feedback d-block"
        >
          Company establishment year is required
        </div>
      </div>

      <div class="page-body">
        <div class="form-group">
          <label
            class="app-primary-text-color fontSize16"
            v-if="financialInfoData.turnover_list.length > 0"
            >State Turnover for below years (Attach Audited Financial Statement
            for respective years)</label
          >
        </div>

        <!--Year 1-->
        <div
          class="row"
          v-for="(turnover_record, counter) in $v.financialInfoData
            .turnover_list.$each.$iter"
          :key="counter"
        >
          <div class="col-lg-5">
            <div style="display: flex">
              <div>
                <label class="fontSize12"> {{ getYearCount(counter) }}</label>
                <input
                  type="text"
                  class="form-control input-lg"
                  v-model="turnover_record.$model.from_year"
                  :readonly="true"
                  tabindex="-1"
                />
              </div>
              <label class="fontSize14 to-text">To</label>
              <div style="margin-top: auto">
                <input
                  type="text"
                  class="form-control input-lg"
                  v-model="turnover_record.$model.to_year"
                  :readonly="true"
                  tabindex="-1"
                />
              </div>
            </div>
          </div>

          <div class="col-lg-7">
            <div style="display: flex">
              <div style="flex-grow: 1" class="right-control-margin">
                <label class="fontSize12">Turnover</label>
                <input
                  type="text"
                  class="form-control input-lg"
                  maxlength="18"
                  v-model="turnover_record.turnover.$model"
                  @input="integerValueOnly($event, turnover_record)"
                />
              </div>
              <div
                style="flex-shrink: 0; min-width: 110px"
                class="right-control-margin"
              >
                <label class="fontSize12">Currency </label>
                <div>
                  <v-select
                    id="currency"
                    label="name"
                    :searchable="false"
                    v-model="turnover_record.currency.$model"
                    :options="getCurrencyOptions"
                    placeholder="select"
                    :reduce="(options) => options.id"
                    :closeOnSelect="true"
                    class="single-value remove-close-btn"
                  />
                </div>
              </div>
              <div class="upload-attachment-for-years">
                <UploadImage
                  v-if="turnover_record.uploaded_pdf.$model == ''"
                  id="yearOne"
                  component_height="40"
                  is_logo_image="false"
                  is_upload_pdf="true"
                  :save_image_path_value="path_s3_save_pdf"
                  is_object_fit_contain="false"
                  @uploadedImage_changed="
                    getTornOverPdf($event, turnover_record)
                  "
                ></UploadImage>
                <img
                  v-else
                  class="attachment-uploaded"
                  src="../../../assets/img/Attachment_selected.svg"
                />
              </div>
              <!--<div style="width: 48px; margin-top: auto; margin-bottom: 10px">
                <img
                  class="cursor-pointer year-attachment-uploaded"
                  src="../../assets/img/Trash.svg"
                  title="remove attachment"
                  @click="removeTurmoverAttachemnt(turnover_record)"
                />
              </div>-->
              <div style="width: 48px; margin-top: auto; margin-bottom: 10px">
                <Trash
                  :id="counter"
                  component_height="40"
                  tooltip="Remove attachment"
                  @trash_event="removeTurmoverAttachemnt(turnover_record)"
                ></Trash>
              </div>
            </div>
            <div style="display: flex">
              <div v-if="submitted" class="invalid-feedback d-block">
                {{ getTurnoverValidationMessges(counter) }}
              </div>
            </div>
          </div>
          <hr style="width: 75%" class="year_seperator_line" />
        </div>
        <!--End Year 1 -->

        <!--<hr style="width: 75%" class="year_seperator_line" />-->

        <!--Year 2 -->
        <!--<div class="row">
          <div class="col-lg-5">
            <div style="display: flex">
              <div>
                <label class="fontSize12">Year 2</label>
                <input type="text" class="form-control input-lg" />
              </div>
              <label class="fontSize14 to-text">To</label>
              <div style="margin-top: auto">
                <input type="text" class="form-control input-lg" />
              </div>
            </div>
          </div>

          <div class="col-lg-7">
            <div style="display: flex">
              <div style="flex-grow: 1" class="right-control-margin">
                <label class="fontSize12">Turnover</label>
                <input type="text" class="form-control input-lg" />
              </div>
              <div style="flex-grow: 1" class="right-control-margin">
                <label class="fontSize12">Currency </label>
                <v-select
                  id="currency"
                  label="name"
                  :searchable="false"
                  v-model="financialInfoData.currency"
                  :options="getCurrencyOptions"
                  placeholder="select"
                  :reduce="(options) => options.id"
                  :closeOnSelect="true"
                  class="single-value remove-close-btn"
                />
              </div>
              <div class="upload-attachment-for-years">
                <UploadImage
                  v-if="financialInfoData.year_two_attachment == ''"
                  id="yeartwo"
                  component_height="40"
                  is_logo_image="false"
                  is_upload_pdf="true"
                  :save_image_path_value="path_s3_save_pdf"
                  is_object_fit_contain="false"
                  @uploadedImage_changed="getYearTwoAttachment"
                ></UploadImage>
                <img
                  v-else
                  class="attachment-uploaded"
                  src="../../../assets/img/Attachment_selected.svg"
                  title="Trash"
                />
              </div>
              <div style="width: 48px; margin-top: auto; margin-bottom: 10px">
                <img
                  class="cursor-pointer year-attachment-uploaded"
                  src="../../assets/img/Trash.svg"
                  title="Trash"
                />
              </div>
            </div>
          </div>
        </div>-->

        <!--End Year 2 -->

        <!--<hr style="width: 75%" class="year_seperator_line" />-->
        <!--Year 3 -->
        <!--<div class="row">
          <div class="col-lg-5">
            <div style="display: flex">
              <div>
                <label class="fontSize12">Year 3</label>
                <input type="text" class="form-control input-lg" />
              </div>
              <label class="fontSize14 to-text">To</label>
              <div style="margin-top: auto">
                <input type="text" class="form-control input-lg" />
              </div>
            </div>
          </div>

          <div class="col-lg-7">
            <div style="display: flex">
              <div style="flex-grow: 1" class="right-control-margin">
                <label class="fontSize12">Turnover</label>
                <input type="text" class="form-control input-lg" />
              </div>
              <div style="flex-grow: 1" class="right-control-margin">
                <label class="fontSize12">Currency </label>
                <v-select
                  id="currency"
                  label="name"
                  :searchable="false"
                  v-model="financialInfoData.currency"
                  :options="getCurrencyOptions"
                  placeholder="select"
                  :reduce="(options) => options.id"
                  :closeOnSelect="true"
                  class="single-value remove-close-btn"
                />
              </div>
              <div class="upload-attachment-for-years">
                <UploadImage
                  v-if="financialInfoData.year_three_attachment == ''"
                  id="yearthree"
                  component_height="40"
                  is_logo_image="false"
                  is_upload_pdf="true"
                  :save_image_path_value="path_s3_save_pdf"
                  is_object_fit_contain="false"
                  @uploadedImage_changed="getYearThreeAttachment"
                ></UploadImage>
                <img
                  v-else
                  class="attachment-uploaded"
                  src="../../../assets/img/Attachment_selected.svg"
                  title="Trash"
                />
              </div>
              <div style="width: 48px; margin-top: auto; margin-bottom: 10px">
                <img
                  class="cursor-pointer year-attachment-uploaded"
                  src="../../assets/img/Trash.svg"
                  title="Trash"
                />
              </div>
            </div>
          </div>
        </div>-->
        <!--End Year 3 -->

        <!--<div class="form-group checkbox-align">
          <input
            type="checkbox"
            class="chkEstbInlastOneYear"
            name="estbInlastOneYear"
            v-model="financialInfoData.estb_in_last_one_year"
          />
          <label for="urgent" class="app-primary-text-color ml-2 fontSize16">
            Click if Company is established within last one year</label
          >
        </div>-->

        <div class="form-group">
          <label>Forecast turnover for current year </label>
          <div style="display: flex">
            <div style="flex-grow: 1; margin-right: 7px">
              <input
                type="text"
                maxlength="18"
                class="form-control input-lg"
                v-model="financialInfoData.forecast_turnover"
                @input="integerValueOnlyForForecast"
              />
            </div>
            <div style="width: 110px">
              <v-select
                id="currency"
                label="name"
                :searchable="false"
                v-model="financialInfoData.forecast_turnover_currency"
                :options="getCurrencyOptions"
                placeholder="select"
                :reduce="(options) => options.id"
                :closeOnSelect="true"
                class="single-value remove-close-btn"
              />
            </div>
          </div>
          <div>
            <div v-if="submitted" class="invalid-feedback d-block">
              {{ getForecastValidationMessges() }}
            </div>
          </div>
        </div>

        <div class="form-group">
          <label>Do you have Professional Indemnity Cover? </label>
          <div class="display: flex; mt-2">
            <button
              class="yes-no-btn"
              :class="{
                'is-selected': financialInfoData.is_indemnity_cover
              }"
              @click="financialInfoData.is_indemnity_cover = true"
            >
              Yes
            </button>
            <button
              class="yes-no-btn ml-2"
              :class="{
                'is-selected': !financialInfoData.is_indemnity_cover
              }"
              @click="noIndemnityCoverClick"
            >
              No
            </button>
          </div>
          <div v-if="financialInfoData.is_indemnity_cover">
            <label class="mt-2" style=""
              >If "Yes", state value of cover (insert value in numericals
              without comma)
            </label>
            <div class="row">
              <div class="col-lg-10 col-right-padding">
                <div style="display: flex">
                  <div style="flex-grow: 1; margin-right: 15px">
                    <input
                      type="text"
                      maxlength="18"
                      class="form-control input-lg"
                      v-model="financialInfoData.indemnity_cover_val"
                      @input="integerValueOnlyForIndemnity"
                    />
                  </div>
                  <div
                    style="margin-right: 7px; flex-shrink: 0; min-width: 110px"
                  >
                    <v-select
                      id="indemnity_currency"
                      label="name"
                      :searchable="false"
                      v-model="financialInfoData.indemnity_currency"
                      :options="getCurrencyOptions"
                      placeholder="select"
                      :reduce="(options) => options.id"
                      :closeOnSelect="true"
                      class="single-value remove-close-btn"
                    />
                  </div>
                </div>
              </div>
              <div class="col-lg-2 col-left-padding">
                <div style="display: flex">
                  <div
                    class="upload-attachment-for-years"
                    style="margin-top: 3px"
                  >
                    <UploadImage
                      v-if="financialInfoData.indemnity_cover_pdf == ''"
                      id="prof_indemnity_cover"
                      component_height="40"
                      is_logo_image="false"
                      is_upload_pdf="true"
                      :save_image_path_value="path_s3_save_pdf"
                      is_object_fit_contain="false"
                      @uploadedImage_changed="getProfIndemnityCoverpdf"
                    ></UploadImage>
                    <img
                      v-else
                      class="attachment-uploaded"
                      src="../../../assets/img/Attachment_selected.svg"
                    />
                  </div>
                  <div style="width: 48px; height: 40px; margin-top: 3px">
                    <div>
                      <!--<img
                        class="cursor-pointer"
                        src="../../assets/img/Trash.svg"
                        title="Remove attachment"
                        style="height: 44px"
                        @click="removeIndemnityCoverAttachement"
                      />-->
                      <Trash
                        id="IndemnityCover"
                        component_height="40"
                        tooltip="Remove attachemnt"
                        @trash_event="removeIndemnityCoverAttachement"
                      ></Trash>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div v-if="submitted" class="invalid-feedback d-block">
              {{ getIndemnityValidationMessges() }}
            </div>
          </div>
        </div>

        <div>
          <div align="right" style="margin-bottom: 10px">
            <button
              type="button"
              class="btn btn-dark save_btn"
              @click="saveFinancialInfoData"
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <modal
        v-if="showFinancialInfoModal"
        @closeModal="updateFinanceInfoModalData([false, ''])"
      >
        <div slot="body">{{ modalFinancialInfoMessage }}</div>
      </modal>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import modal from '../../../common/Modal'
import UploadImage from '../../common/UploadImage'
import appConstants from '../../../appConstants.js'
import moment from 'moment'
import { required, requiredIf } from 'vuelidate/lib/validators'
import Trash from '../../common/Trash'

export default {
  name: 'FinancialInfo',
  components: {
    modal,
    UploadImage,
    Trash
  },
  data() {
    return {
      financialInfoData: {
        company_est_year: '',

        is_indemnity_cover: '',
        indemnity_cover_val: '',
        indemnity_currency: '',
        indemnity_cover_pdf: '',

        turnover_list: [],
        current_year_forcast: [],

        forecast_turnover: '',
        forecast_turnover_currency: ''
        // current_year_forcast: {
        //   id: '',
        //   from_year: '',
        //   to_year: '',
        //   turnover: '',
        //   currency: '',
        //   uploaded_pdf: '',
        //   is_forecast: true
        // }
      },
      submitted: false,
      path_s3_save_pdf: appConstants.PATH_SAVE_PDF_ON_S3,
      turnoverdata_from_db: []
    }
  },
  validations() {
    return {
      financialInfoData: {
        company_est_year: { required },
        indemnity_cover_val: {
          required: requiredIf(function () {
            return this.financialInfoData.is_indemnity_cover
          })
        },
        indemnity_currency: {
          required: requiredIf(function () {
            return this.financialInfoData.is_indemnity_cover
          })
        },
        indemnity_cover_pdf: {
          required: requiredIf(function () {
            return this.financialInfoData.is_indemnity_cover
          })
        },
        forecast_turnover: { required },
        forecast_turnover_currency: { required },

        turnover_list: {
          $each: {
            turnover: { required },
            currency: { required },
            uploaded_pdf: { required }
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters('dropdownValues', [
      'getCurrencyOptions',
      'getEstablishmentYears'
    ]),
    ...mapGetters('companyData', ['getCurrentCompanyData']),
    ...mapGetters('financialInfo', [
      'getFinancialInfoData',
      'showFinancialInfoModal',
      'modalFinancialInfoMessage'
    ])
  },
  methods: {
    ...mapActions('dropdownValues', [
      'fetchCurrency',
      'fetchEstablishmentYear'
    ]),
    ...mapActions('financialInfo', [
      'SaveFinancialInfoData',
      'fetchFinancialInfoData'
    ]),
    ...mapMutations('financialInfo', ['updateFinanceInfoModalData']),

    getTornOverPdf(value, turnover_data) {
      turnover_data.uploaded_pdf.$model = value.image_name
    },
    removeTurmoverAttachemnt(turnover_data) {
      turnover_data.uploaded_pdf.$model = ''
    },
    integerValueOnly(e, turnover_record) {
      let res = e.target.value.replace(/[^0-9]/g, '')
      turnover_record.turnover.$model = res
    },
    integerValueOnlyForForecast(e) {
      let res = e.target.value.replace(/[^0-9]/g, '')
      this.financialInfoData.forecast_turnover = res
    },
    integerValueOnlyForIndemnity(e) {
      let res = e.target.value.replace(/[^0-9]/g, '')
      this.financialInfoData.indemnity_cover_val = res
    },
    getProfIndemnityCoverpdf(value) {
      this.financialInfoData.indemnity_cover_pdf = value.image_name
    },
    noIndemnityCoverClick() {
      this.financialInfoData.is_indemnity_cover = false
      this.financialInfoData.indemnity_cover_val = ''
      this.financialInfoData.indemnity_currency = ''
      this.financialInfoData.indemnity_cover_pdf = ''
    },
    removeIndemnityCoverAttachement() {
      this.financialInfoData.indemnity_cover_pdf = ''
    },
    onEstablishmentYearSelected() {
      this.calculateLastThreeaplicableYears()
    },
    getYearCount(counter) {
      let count = parseInt(counter) + 1
      return `Year ${count}`
    },
    getForecastValidationMessges() {
      var required_str = ''
      if (!this.$v.financialInfoData.forecast_turnover.required) {
        required_str = `${required_str} Turnover,`
      }

      if (!this.$v.financialInfoData.forecast_turnover_currency.required) {
        required_str = `${required_str} Currency,`
      }

      if (required_str != '') {
        required_str = `${required_str.slice(0, -1)} is required`
        return required_str
      } else {
        return ''
      }
    },
    getIndemnityValidationMessges() {
      var required_str = ''
      if (!this.$v.financialInfoData.indemnity_cover_val.required) {
        required_str = `${required_str} Indemnity cover value,`
      }

      if (!this.$v.financialInfoData.indemnity_currency.required) {
        required_str = `${required_str} Currency,`
      }

      if (!this.$v.financialInfoData.indemnity_cover_pdf.required) {
        required_str = `${required_str} Indemnity attachemnt,`
      }

      if (required_str != '') {
        required_str = `${required_str.slice(0, -1)} is required`
        return required_str
      } else {
        return ''
      }
    },
    getTurnoverValidationMessges(counter) {
      var required_str = ''
      if (
        !this.$v.financialInfoData.turnover_list.$each[counter].turnover
          .required
      ) {
        required_str = `${required_str} Turnover,`
      }

      if (
        !this.$v.financialInfoData.turnover_list.$each[counter].currency
          .required
      ) {
        required_str = `${required_str} Currency,`
      }

      if (
        !this.$v.financialInfoData.turnover_list.$each[counter].uploaded_pdf
          .required
      ) {
        required_str = `${required_str} Attachment,`
      }

      if (required_str != '') {
        required_str = `${required_str.slice(0, -1)} is required`
        return required_str
      } else {
        return ''
      }
    },
    calculateLastThreeaplicableYears() {
      if (
        this.financialInfoData.company_est_year == '' ||
        this.financialInfoData.company_est_year == null
      ) {
        this.financialInfoData.current_year_forcast = []
        this.financialInfoData.turnover_list = []
        return
      }

      let today = new Date()

      let this_finyear_start_date = moment({
        year: today.getFullYear(),
        month: 2, //March
        day: 31
      })

      let current_financial_year_from = ''
      let current_financial_year_to = ''

      if (this_finyear_start_date < today) {
        current_financial_year_from = today.getFullYear()
        current_financial_year_to = today.getFullYear() + 1
      } else {
        current_financial_year_from = today.getFullYear() - 1
        current_financial_year_to = today.getFullYear()
      }

      //get current financial year
      let turnover_record = {
        id: '',
        from_year: current_financial_year_from,
        to_year: current_financial_year_to,
        turnover: '',
        currency: '',
        uploaded_pdf: '',
        is_forecast: true
      }

      this.financialInfoData.current_year_forcast = []
      let added_forecast_record = false

      var db_turnover_data = this.turnoverdata_from_db

      for (let count = 0; count < db_turnover_data.length; count++) {
        //check is from year- to year record already present
        if (
          db_turnover_data[count].from_year == current_financial_year_from &&
          db_turnover_data[count].to_year == current_financial_year_to &&
          db_turnover_data[count].is_forecast == true
        ) {
          this.financialInfoData.current_year_forcast.push(
            db_turnover_data[count]
          )

          this.financialInfoData.forecast_turnover =
            db_turnover_data[count].turnover == null
              ? ''
              : db_turnover_data[count].turnover

          this.financialInfoData.forecast_turnover_currency =
            db_turnover_data[count].currency == null
              ? ''
              : db_turnover_data[count].currency

          added_forecast_record = true
        }
      }

      if (!added_forecast_record) {
        this.financialInfoData.current_year_forcast.push(turnover_record)
      }

      //calculate last 3 years

      this.financialInfoData.turnover_list = []

      for (let index = 0; index < 3; index++) {
        //get from year - to year
        let from_year = current_financial_year_from - (index + 1)
        let to_year = current_financial_year_to - (index + 1)
        let turnover_record = {
          id: '',
          from_year: from_year,
          to_year: to_year,
          turnover: '',
          currency: '',
          uploaded_pdf: '',
          is_forecast: false
        }

        if (from_year >= this.financialInfoData.company_est_year) {
          if (db_turnover_data.length == 0) {
            this.financialInfoData.turnover_list.push(turnover_record)
          } else {
            let record_present = false
            for (let count = 0; count < db_turnover_data.length; count++) {
              //check is from year- to year record already present
              if (
                db_turnover_data[count].from_year == from_year &&
                db_turnover_data[count].to_year == to_year
              ) {
                let temp_record = db_turnover_data[count]
                temp_record.is_forecast = false
                this.financialInfoData.turnover_list.push(temp_record)
                record_present = true
              }
            }

            if (!record_present) {
              this.financialInfoData.turnover_list.push(turnover_record)
            }
          }
        }
      }
    },
    setFinanceData(data) {
      if (data.pqq.length > 0) {
        let finance_data = data.pqq[0]

        this.financialInfoData.company_est_year =
          finance_data.company_est_year == null
            ? ''
            : finance_data.company_est_year

        this.financialInfoData.is_indemnity_cover =
          finance_data.is_indemnity_cover

        this.financialInfoData.indemnity_cover_val =
          finance_data.indemnity_cover_val == null
            ? ''
            : finance_data.indemnity_cover_val

        this.financialInfoData.indemnity_currency =
          finance_data.indemnity_currency == null
            ? ''
            : finance_data.indemnity_currency

        this.financialInfoData.indemnity_cover_pdf =
          finance_data.indemnity_cover_pdf
      }

      if (data.turnover_details.length > 0) {
        this.turnoverdata_from_db = data.turnover_details
      }

      this.calculateLastThreeaplicableYears()
    },
    saveFinancialInfoData() {
      this.submitted = true
      if (this.$v.financialInfoData.$invalid) {
        return
      }

      var temp_turnoverRecord = this.financialInfoData.turnover_list

      for (let i = 0; i < temp_turnoverRecord.length; i++) {
        temp_turnoverRecord[i].turnover =
          temp_turnoverRecord[i].turnover === ''
            ? null
            : parseInt(temp_turnoverRecord[i].turnover)

        temp_turnoverRecord[i].currency =
          temp_turnoverRecord[i].currency === ''
            ? null
            : parseInt(temp_turnoverRecord[i].currency)
      }

      let new_turnover = temp_turnoverRecord.filter((res) => {
        return !res.id
      })

      let update_turnover = temp_turnoverRecord.filter((res) => {
        return res.id
      })

      this.financialInfoData.current_year_forcast[0].turnover =
        this.financialInfoData.forecast_turnover === ''
          ? null
          : parseInt(this.financialInfoData.forecast_turnover)

      this.financialInfoData.current_year_forcast[0].currency =
        this.financialInfoData.forecast_turnover_currency === ''
          ? null
          : parseInt(this.financialInfoData.forecast_turnover_currency)

      if (this.financialInfoData.current_year_forcast[0].id === '') {
        new_turnover.push(this.financialInfoData.current_year_forcast[0])
      } else {
        update_turnover.push(this.financialInfoData.current_year_forcast[0])
      }

      var finance_data = {
        company_id: this.getCurrentCompanyData.id,

        company_est_year:
          this.financialInfoData.company_est_year == ''
            ? null
            : this.financialInfoData.company_est_year,

        is_indemnity_cover: this.financialInfoData.is_indemnity_cover,

        indemnity_cover_val:
          this.financialInfoData.indemnity_cover_val === ''
            ? null
            : this.financialInfoData.indemnity_cover_val,

        indemnity_currency:
          this.financialInfoData.indemnity_currency === ''
            ? null
            : this.financialInfoData.indemnity_currency,

        indemnity_cover_pdf: this.financialInfoData.indemnity_cover_pdf,

        add_turnover: {
          company_id: this.getCurrentCompanyData.id,
          turnover: new_turnover
        },

        update_turnover: {
          company_id: this.getCurrentCompanyData.id,
          turnover: update_turnover
        }
      }

      this.SaveFinancialInfoData(finance_data).then(() => {
        this.setFinanceData(this.getFinancialInfoData)
      })
    }
  },
  created() {
    this.fetchCurrency()
    this.fetchEstablishmentYear({ fromYear: 1860 })
    this.fetchFinancialInfoData(this.getCurrentCompanyData.id).then(() => {
      this.setFinanceData(this.getFinancialInfoData)
    })
  }
}
</script>

<style scoped></style>
