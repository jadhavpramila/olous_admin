<template>
  <div class="cls-companyStructure form-conatiner">
    <div class="form-container">
      <div class="page-body">
        <div class="row">
          <div class="col-lg-10">
            <div class="form-group">
              <label
                >Nature of Company e.g Public Limited/ Private Limited/ LLP/
                Partnership/ Proprietorship / OPC</label
              >
              <!--<div style="display: flex">
            <div style="flex-grow: 1; margin-right: 10px">-->
              <div class="" style="display: flex">
                <div style="flex-grow: 1; margin-right: 7px">
                  <v-select
                    id="compNature"
                    label="name"
                    :searchable="false"
                    v-model="companyStructureData.nature_of_company"
                    :options="getCompanyStructureOptions"
                    placeholder="select"
                    :reduce="(options) => options.id"
                    :closeOnSelect="true"
                    class="single-value remove-close-btn"
                  />
                  <div
                    v-if="
                      submitted &&
                      !$v.companyStructureData.nature_of_company.required
                    "
                    class="invalid-feedback d-block"
                  >
                    Nature of company is required
                  </div>
                </div>
                <div style="width: 48px; height: 40px; padding-left: 0px">
                  <!--<div>
                  <img
                    class="cursor-pointer trash-img"
                    src="../../assets/img/Trash.svg"
                    title="Trash"
                    @click="removeNatureOfCompany"
                  />
                </div>-->
                  <Trash
                    id="companyStru"
                    component_height="40"
                    tooltip="Remove attachment"
                    @trash_event="removeNatureOfCompany"
                  ></Trash>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label>Limit of Liability & currency</label>
              <div class="" style="display: flex">
                <div class="" style="flex-grow: 1; margin-right: 7px">
                  <input
                    type="text"
                    class="form-control input-lg"
                    maxlength="18"
                    v-model="companyStructureData.limit_of_liability"
                    @input="numberOnly"
                  />
                  <div
                    v-if="
                      submitted &&
                      !$v.companyStructureData.limit_of_liability.numeric
                    "
                    class="invalid-feedback d-block"
                  >
                    Please enter numeric value
                  </div>
                </div>
                <div class="liability-currency" style="flex-shrink: 0">
                  <v-select
                    id="currency"
                    label="name"
                    :searchable="false"
                    v-model="companyStructureData.liability_currency"
                    :options="getCurrencyOptions"
                    placeholder="select"
                    :reduce="(options) => options.id"
                    :closeOnSelect="true"
                    class="single-value remove-close-btn"
                  />
                  <div
                    v-if="
                      submitted &&
                      !$v.companyStructureData.liability_currency.required
                    "
                    class="invalid-feedback d-block"
                  >
                    Required currency
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="">Year of Company establishment </label>

              <v-select
                id="establishmnetYear"
                label="name"
                :searchable="false"
                v-model="companyStructureData.company_est_year"
                :options="getEstablishmentYears"
                placeholder="select"
                :reduce="(options) => options.id"
                :closeOnSelect="true"
                class="single-value remove-close-btn"
              />
              <div
                v-if="
                  submitted &&
                  !$v.companyStructureData.company_est_year.required
                "
                class="invalid-feedback d-block"
              >
                Company establishment year is required
              </div>
            </div>

            <div class="form-group">
              <label>Are you a member of a group of companies?</label>
              <div class="display: flex; mt-2">
                <button
                  class="yes-no-btn"
                  :class="{
                    'is-selected': companyStructureData.is_member_group_of_comp
                  }"
                  @click="setIsMemberOfGroupOfComp(true)"
                >
                  Yes
                </button>
                <button
                  class="yes-no-btn ml-2"
                  :class="{
                    'is-selected': !companyStructureData.is_member_group_of_comp
                  }"
                  @click="setIsMemberOfGroupOfComp(false)"
                >
                  No
                </button>
              </div>
              <div v-if="companyStructureData.is_member_group_of_comp">
                <label class="mt-2"
                  >If "Yes" what is your parent Company name?</label
                >
                <input
                  type="text"
                  class="form-control input-lg"
                  v-model="companyStructureData.parent_companies_name"
                />
                <div
                  v-if="
                    submitted &&
                    !$v.companyStructureData.parent_companies_name.required
                  "
                  class="invalid-feedback d-block"
                >
                  Parent Company name is required
                </div>
              </div>
            </div>

            <div class="form-group">
              <label
                >Has your Company been or is the subject of any bankruptcy or
                insolvency proceeding or is subject to assignment for the
                benefits of creditors?</label
              >
              <div class="display: flex; mt-2">
                <button
                  class="yes-no-btn"
                  :class="{
                    'is-selected': companyStructureData.is_bankruptcy
                  }"
                  @click="setIsBankruptcy(true)"
                >
                  Yes
                </button>
                <button
                  class="yes-no-btn ml-2"
                  :class="{
                    'is-selected': !companyStructureData.is_bankruptcy
                  }"
                  @click="setIsBankruptcy(false)"
                >
                  No
                </button>
              </div>
              <div v-if="companyStructureData.is_bankruptcy" class="">
                <label class="mt-2">If "Yes" please provide details?</label>
                <!--<input
                  type="text"
                  class="form-control input-lg mt-2"
                  v-model="companyStructureData.bankruptcy_details"
                />-->
                <b-form-textarea
                  name="longDesc"
                  v-model="companyStructureData.bankruptcy_details"
                  placeholder="Enter Long Description..."
                  cols="40"
                  rows="7"
                  max-rows="15"
                  maxlength="1000"
                  no-resize
                  v-on:keyup="getBankruptcyLength($event.target.value)"
                  class="form-control mt-2"
                ></b-form-textarea>
                <div align="right">
                  <label class="mb-0 text-right">
                    {{ remainingLength }}/{{ totalLength }}</label
                  >
                </div>
                <div
                  v-if="
                    submitted &&
                    !$v.companyStructureData.bankruptcy_details.required
                  "
                  class="invalid-feedback d-block"
                >
                  Details required
                </div>
              </div>
            </div>

            <div class="form-group">
              <label>Provide your PAN card No. (Attach a copy)</label>
              <div style="display: flex">
                <div style="flex-grow: 1; margin-right: 10px">
                  <input
                    type="text"
                    class="form-control input-lg"
                    v-model="companyStructureData.pan_card_no"
                  />
                  <div
                    v-if="
                      submitted && !$v.companyStructureData.pan_card_no.required
                    "
                    class="invalid-feedback d-block"
                  >
                    PAN card No. is required
                  </div>
                  <div
                    v-if="
                      submitted &&
                      !$v.companyStructureData.pan_card_image.required
                    "
                    class="invalid-feedback d-block"
                  >
                    PAN card image is required
                  </div>
                </div>
                <div
                  class=""
                  style="width: 48px; height: 40px; margin-top: 3px"
                >
                  <UploadImage
                    id="panCardImage"
                    component_height="40"
                    is_logo_image="false"
                    :save_image_path_value="path_s3_save_image"
                    is_object_fit_contain="false"
                    @uploadedImage_changed="getPanCardImageName"
                  ></UploadImage>
                </div>
              </div>
              <div class="row">
                <PreviewImage
                  class="col-lg-3 col-md-4 col-sm-4 col-6"
                  id="panCardImagePreview"
                  component_height="80"
                  :read_image_path_value="read_s3_image_url"
                  :image_name_value="companyStructureData.pan_card_image"
                  is_object_fit_contain="true"
                  :delete_file_url="path_s3_save_image"
                  @preview_uploadedImage_Removed="
                    companyStructureData.pan_card_image = ''
                  "
                ></PreviewImage>
              </div>
            </div>

            <div class="form-group">
              <label>Provide your GST card No. (Attach a copy)</label>
              <div style="display: flex">
                <div style="flex-grow: 1; margin-right: 10px">
                  <input
                    type="text"
                    class="form-control input-lg"
                    v-model="companyStructureData.gst_card_no"
                  />
                  <div
                    v-if="
                      submitted && !$v.companyStructureData.gst_card_no.required
                    "
                    class="invalid-feedback d-block"
                  >
                    GST No. is required
                  </div>
                  <div
                    v-if="
                      submitted &&
                      !$v.companyStructureData.gst_card_image.required
                    "
                    class="invalid-feedback d-block"
                  >
                    GST card image is required
                  </div>
                </div>
                <div
                  class=""
                  style="width: 48px; height: 40px; margin-top: 3px"
                >
                  <UploadImage
                    id="GSTCardImage"
                    component_height="40"
                    is_logo_image="false"
                    :save_image_path_value="path_s3_save_image"
                    is_object_fit_contain="false"
                    @uploadedImage_changed="getGSTCardImageName"
                  ></UploadImage>
                </div>
              </div>
              <div class="row">
                <PreviewImage
                  class="col-lg-3 col-md-4 col-sm-4 col-6"
                  id="gstCardImagePreview"
                  component_height="80"
                  :read_image_path_value="read_s3_image_url"
                  :image_name_value="companyStructureData.gst_card_image"
                  is_object_fit_contain="true"
                  :delete_file_url="path_s3_save_image"
                  @preview_uploadedImage_Removed="
                    companyStructureData.gst_card_image = ''
                  "
                ></PreviewImage>
              </div>
            </div>

            <div class="mb-3" style="">
              <div align="right">
                <button
                  type="button"
                  class="btn btn-dark save_btn"
                  @click="saveCompanyStructure"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <modal
        v-if="showCompanyStructureModal"
        @closeModal="updateCompanyStructureValues([false, ''])"
      >
        <div slot="body">{{ modalCompanyStructureMessage }}</div>
      </modal>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import modal from '../../../common/Modal'
import UploadImage from '../../common/UploadImage'
import appConstants from '../../../appConstants.js'
import PreviewImage from '../../common/PreviewImage'
import Trash from '../../common/Trash'
import { required, numeric, requiredIf } from 'vuelidate/lib/validators'

export default {
  name: 'CompanyStructure',
  components: {
    modal,
    UploadImage,
    PreviewImage,
    Trash
  },
  data() {
    return {
      companyStructureData: {
        nature_of_company: '',
        limit_of_liability: '',
        liability_currency: '',
        company_est_year: '',
        is_member_group_of_comp: false,
        parent_companies_name: '',
        is_bankruptcy: false,
        bankruptcy_details: '',
        pan_card_no: '',
        pan_card_image: '',
        gst_card_no: '',
        gst_card_image: ''
      },
      isSlugAvailable: null,
      submitted: false,
      path_s3_save_image: appConstants.PATH_SAVE_IMAGE_ON_S3,
      read_s3_image_url: process.env.VUE_APP_IMGURL,
      remainingLength: 1000,
      totalLength: 1000
    }
  },
  validations() {
    return {
      companyStructureData: {
        id: '',
        nature_of_company: { required },
        limit_of_liability: { numeric },
        liability_currency: {
          required: requiredIf(function () {
            return (
              this.companyStructureData.limit_of_liability.toString().trim() !=
              ''
            )
          })
        },
        company_est_year: { required },
        parent_companies_name: {
          required: requiredIf(function () {
            return this.companyStructureData.is_member_group_of_comp
          })
        },
        bankruptcy_details: {
          required: requiredIf(function () {
            return this.companyStructureData.is_bankruptcy
          })
        },
        pan_card_no: { required },
        pan_card_image: { required },
        gst_card_no: { required },
        gst_card_image: { required }
      }
    }
  },

  computed: {
    ...mapGetters('dropdownValues', [
      'getCompanyStructureOptions',
      'getEstablishmentYears',
      'getCurrencyOptions'
    ]),
    ...mapGetters('companyStructure', [
      'getCompanyStructureData',
      'showCompanyStructureModal',
      'modalCompanyStructureMessage'
    ]),
    ...mapGetters('companyData', ['getCurrentCompanyData'])
  },
  methods: {
    ...mapActions('dropdownValues', [
      'fetchCompanyNature',
      'fetchEstablishmentYear',
      'fetchCurrency'
    ]),
    ...mapActions('companyStructure', [
      'fetchCompanyStructureData',
      'SaveCompanyStructureData'
    ]),
    ...mapMutations('companyStructure', ['updateCompanyStructureValues']),
    setIsMemberOfGroupOfComp(value) {
      this.companyStructureData.is_member_group_of_comp = value
      this.companyStructureData.parent_companies_name = ''
    },
    setIsBankruptcy(value) {
      this.companyStructureData.is_bankruptcy = value
      this.companyStructureData.bankruptcy_details = ''
    },
    getPanCardImageName(value) {
      this.companyStructureData.pan_card_image = value.image_name
    },
    getGSTCardImageName(value) {
      this.companyStructureData.gst_card_image = value.image_name
    },
    removeNatureOfCompany() {
      this.companyStructureData.nature_of_company = ''
    },
    numberOnly(e) {
      this.companyStructureData.limit_of_liability = e.target.value.replace(
        /[^0-9]/g,
        ''
      )

      if (this.companyStructureData.limit_of_liability == '') {
        this.companyStructureData.liability_currency = null
      }
    },
    getBankruptcyLength(e) {
      this.remainingLength = this.totalLength - e.length
    },
    saveCompanyStructure() {
      this.submitted = true
      if (this.$v.companyStructureData.$invalid) {
        return false
      }

      var liability_currency_val = null

      if (
        this.companyStructureData.limit_of_liability.toString().trim() !== ''
      ) {
        liability_currency_val = this.companyStructureData.liability_currency
      }

      var data = {
        company_id: this.getCurrentCompanyData.id,
        id: this.companyStructureData.id,
        nature_of_company: this.companyStructureData.nature_of_company,
        limit_of_liability:
          this.companyStructureData.limit_of_liability === ''
            ? null
            : this.companyStructureData.limit_of_liability,

        liability_currency: liability_currency_val,

        company_est_year: this.companyStructureData.company_est_year,

        is_member_group_of_comp: this.companyStructureData
          .is_member_group_of_comp,
        parent_companies_name: this.companyStructureData.parent_companies_name,

        is_bankruptcy: this.companyStructureData.is_bankruptcy,
        bankruptcy_details: this.companyStructureData.bankruptcy_details,

        pan_card_no: this.companyStructureData.pan_card_no,
        pan_card_image: this.companyStructureData.pan_card_image,

        gst_card_no: this.companyStructureData.gst_card_no,
        gst_card_image: this.companyStructureData.gst_card_image
      }

      this.SaveCompanyStructureData(data)
    },
    setCompanyStructureData(data) {
      this.companyStructureData.gst_card_no = data.gst_number

      if (data.pqq.length == 0) {
        return
      }

      var db_data = data.pqq[0]

      this.companyStructureData.id = db_data.id
      this.companyStructureData.nature_of_company = db_data.nature_of_company
      this.companyStructureData.limit_of_liability =
        db_data.limit_of_liability == null ? '' : db_data.limit_of_liability

      this.companyStructureData.liability_currency = db_data.liability_currency

      this.companyStructureData.company_est_year = db_data.company_est_year

      this.companyStructureData.is_member_group_of_comp =
        db_data.is_member_group_of_comp

      this.companyStructureData.parent_companies_name =
        db_data.parent_companies_name

      this.companyStructureData.is_bankruptcy = db_data.is_bankruptcy

      this.companyStructureData.bankruptcy_details = db_data.bankruptcy_details
      this.getBankruptcyLength(this.companyStructureData.bankruptcy_details)

      this.companyStructureData.pan_card_no = db_data.pan_card_no

      this.companyStructureData.pan_card_image = db_data.pan_card_image

      this.companyStructureData.gst_card_image = db_data.gst_card_image
    }
  },
  created() {
    this.fetchCompanyNature()
    this.fetchCurrency()
    this.fetchEstablishmentYear({ fromYear: 1860 })

    this.fetchCompanyStructureData(this.getCurrentCompanyData.id).then(() => {
      this.setCompanyStructureData(this.getCompanyStructureData)
    })
  }
}
</script>

<style scoped></style>
