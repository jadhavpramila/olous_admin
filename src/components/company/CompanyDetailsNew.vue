<template>
  <div>
    <div class="cls-companydetails">
      <div>
        <div class="row mb-3">
          <div class="col-lg-6 d-flex">
            <div class="col-5 pl-0">
              <UploadImageAndPreview
                id="logoImage"
                component_height="105"
                is_logo_image="true"
                :save_image_path_value="path_s3_save_image"
                :read_image_path_value="read_s3_image_url"
                :image_name_value="business.logo"
                :submitted="false"
                is_object_fit_contain="true"
                upload_button_text="Add Your Logo"
                required_validation_message="Logo is required"
                @uploadedImage_changed="getUpdatedLogoImage"
              ></UploadImageAndPreview>
            </div>
            <div class="col-7 pr-0">
              <UploadImageAndPreview
                id="coverImage"
                component_height="105"
                is_logo_image="false"
                :save_image_path_value="path_s3_save_image"
                :read_image_path_value="read_s3_image_url"
                :image_name_value="business.banner_image"
                :submitted="submitted"
                is_object_fit_contain="false"
                upload_button_text="Add Cover Image"
                required_validation_message="Cover image is required"
                @uploadedImage_changed="getUpdatedCoverImage"
              ></UploadImageAndPreview>
            </div>
          </div>
        </div>
      </div>
      <div class="main-container">
        <div class="main-container-header d-flex flex-column">
          <label class="font-weight-700 fontSize18 text-uppercase mb-0"
            >Company Details
          </label>
          <!-- <label class="fontSize14 text-white"
            >Please enter the basic company details</label
          > -->
        </div>
        <div class="main-container-body">
          <div>
            <div class="form-group">
              <label class="d-flex"
                >Business Name <span class="text-danger">*</span></label
              >
              <input
                type="text"
                class="form-control input-lg"
                v-model="business.name"
                @change="getSlugValueuUsingComapnyName()"
              />
              <div
                v-if="submitted && !$v.business.name.required"
                class="invalid-feedback d-block"
              >
                Business name is required
              </div>
              <div
                v-if="submitted && !$v.business.name.maxLength"
                class="invalid-feedback d-block"
              >
                Business name max 60 characters required
              </div>
            </div>
          </div>
          <div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="d-flex"
                    >Portfolio Url <span class="text-danger">*</span></label
                  >
                  <input
                    type="text"
                    name="slug"
                    v-model="fullPortFolioUrl"
                    class="form-control"
                    disabled
                  />
                  <div style="display: flex">
                    <div></div>
                    <div
                      v-if="submitted && !$v.business.slug.required"
                      class="invalid-feedback d-block"
                    >
                      Portfolio link is required
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="d-flex justify-content-between">
                    <span
                      >Business Description <span class="text-danger">*</span>
                      <small class="fontSize12 app-secondary-text-color">
                        (Write for what you will like to be known)</small
                      ></span
                    >
                    <!-- <span class="align-items-end d-flex fontSize12">
                  {{ remainingShortDescLength }}/{{ shortDescTotalLength }}
                </span> -->
                  </label>
                  <b-form-textarea
                    id="textarea"
                    v-model="business.description"
                    rows="5"
                    maxlength="2000"
                    max-rows="10"
                    style="overflow-y: auto !important"
                  ></b-form-textarea>
                  <div style="display: flex; flex-direction: row-reverse">
                    <div
                      class="invalid-feedback d-block"
                      v-if="submitted && !$v.business.description.required"
                    >
                      Business description is required
                    </div>
                    <div
                      v-if="submitted && !$v.business.description.minLength"
                      class="invalid-feedback d-block"
                    >
                      Business description minimum 20 characters required
                    </div>
                    <div
                      v-if="submitted && !$v.business.description.maxLength"
                      class="invalid-feedback d-block"
                    >
                      Business description max 2000 characters required
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="form-group">
              <label class="d-flex">Business Website</label>
              <input
                type="text"
                class="form-control input-lg"
                v-model="business.website"
              />
            </div>
          </div>
          <div>
            <div class="row">
              <div class="col-md-6 pr-2">
                <div class="form-group">
                  <label>Category<span class="text-danger">*</span></label>
                  <v-select
                    label="name"
                    :searchable="false"
                    v-model="business.category"
                    :options="getCategoryOptions"
                    placeholder="Select"
                    :reduce="(category) => category.id"
                    :closeOnSelect="true"
                    @input="fetchSubCategoryAsPerCategory"
                    class="single-value remove-close-btn form-control show-dropdown-icon"
                  />
                  <div
                    v-if="submitted && !$v.business.category.required"
                    class="invalid-feedback d-block"
                  >
                    Category is required
                  </div>
                </div>
              </div>
              <div class="col-md-6 pl-2">
                <div class="form-group">
                  <label
                    >Sub-Category <span class="text-danger">*</span
                    ><span class="fontSize12 app-secondary-text-color"
                      >(select multiple options)</span
                    ></label
                  >
                  <v-select
                    multiple
                    label="name"
                    v-model="business.sub_categories"
                    :options="getSubcategoryOptions"
                    placeholder="Select"
                    :reduce="(sub_categories) => sub_categories.id"
                    :closeOnSelect="false"
                    class="form-control show-dropdown-icon"
                  />
                  <div
                    v-if="submitted && !$v.business.sub_categories.required"
                    class="invalid-feedback d-block"
                  >
                    Sub-Category is required
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="row">
              <div class="col-md-6 pr-2">
                <div class="form-group">
                  <label
                    >Sector<span class="text-danger">*</span>
                    <span class="fontSize12 app-secondary-text-color"
                      >(max 6 options allow)</span
                    >
                  </label>
                  <v-select
                    multiple
                    :selectable="
                      () => business.project_types_handled.length < 6
                    "
                    label="display_string"
                    :searchable="false"
                    v-model="business.project_types_handled"
                    :options="getSectorOptions"
                    placeholder="Select"
                    :reduce="(sector) => sector.id"
                    :closeOnSelect="false"
                    class="form-control show-dropdown-icon"
                  />
                  <div
                    v-if="
                      submitted && !$v.business.project_types_handled.required
                    "
                    class="invalid-feedback d-block"
                  >
                    Sector is required
                  </div>
                </div>
              </div>
              <div class="col-md-6 pl-2">
                <div class="form-group">
                  <label
                    >Type of contracts <span class="text-danger">*</span
                    ><span class="fontSize12 app-secondary-text-color"
                      >(select multiple options)</span
                    ></label
                  >
                  <v-select
                    multiple
                    label="value"
                    v-model="business.type_of_contracts"
                    :options="getContractTypeOptions"
                    placeholder="Select"
                    :reduce="(contractType) => contractType.str_id"
                    :closeOnSelect="false"
                    class="form-control show-dropdown-icon"
                  />
                  <div
                    v-if="submitted && !$v.business.type_of_contracts.required"
                    class="invalid-feedback d-block"
                  >
                    Type of contracts is required
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="row">
              <div class="col-md-6 pr-2">
                <div class="form-group">
                  <label>Business Turnover</label>
                  <v-select
                    id="turnOver"
                    label="name"
                    :searchable="false"
                    v-model="business.turnover"
                    :options="getTurnOverOptions"
                    placeholder="Select"
                    :reduce="(turnover) => turnover.id"
                    :closeOnSelect="true"
                    class="single-value form-control remove-close-btn show-dropdown-icon"
                  />
                </div>
              </div>

              <div class="col-6 col-md-3 pl-2 pr-2">
                <div class="form-group">
                  <label
                    >Absolute Turnover<span class="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control input-lg"
                    v-model="business.absolute_turnover"
                  />
                  <div
                    v-if="submitted && !$v.business.absolute_turnover.required"
                    class="invalid-feedback d-block"
                  >
                    Turnover is required
                  </div>
                  <div
                    v-if="submitted && !$v.business.absolute_turnover.decimal"
                    class="invalid-feedback d-block"
                  >
                    Invalid Turnover value
                  </div>
                  <div
                    v-if="
                      submitted &&
                      $v.business.absolute_turnover.required &&
                      $v.business.absolute_turnover.decimal &&
                      !$v.business.absolute_turnover.greaterThanZero
                    "
                    class="invalid-feedback d-block"
                  >
                    Please enter value greater than zero
                  </div>
                </div>
              </div>
              <div class="col-6 col-md-3 pl-2">
                <div class="form-group">
                  <label>Unit<span class="text-danger">*</span> </label>
                  <v-select
                    label="value"
                    :searchable="false"
                    v-model="business.absolute_turnover_unit"
                    :options="getPriceUnitOptions"
                    placeholder="Select"
                    :reduce="(unit) => unit.id"
                    :closeOnSelect="true"
                    class="single-value remove-close-btn form-control show-dropdown-icon"
                  />
                  <div
                    v-if="
                      submitted && !$v.business.absolute_turnover_unit.required
                    "
                    class="invalid-feedback d-block"
                  >
                    Unit is required
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="row">
              <div class="col-md-6 pr-2">
                <div class="form-group">
                  <label
                    >Project Size<span class="text-danger">*</span>
                    <span class="fontSize12 app-secondary-text-color"
                      >(Mention maximum size of project handled)</span
                    >
                  </label>
                  <v-select
                    label="value"
                    :searchable="false"
                    v-model="business.appx_area"
                    :options="getApproximateAreaOptions"
                    placeholder="Select"
                    :reduce="(area) => area.id"
                    :closeOnSelect="true"
                    class="single-value remove-close-btn form-control show-dropdown-icon"
                  />
                  <div
                    v-if="submitted && !$v.business.appx_area.required"
                    class="invalid-feedback d-block"
                  >
                    Project size is required
                  </div>
                </div>
              </div>
              <div class="col-md-3 pl-2 pr-2">
                <div class="form-group">
                  <label>Min.Value of Work</label>
                  <v-select
                    id="minworkValue"
                    label="name"
                    v-model="business.min_work_value"
                    :options="getMinWorkOptions"
                    placeholder="Select"
                    :reduce="(minwork) => minwork.id"
                    :closeOnSelect="true"
                    class="single-value form-control remove-close-btn show-dropdown-icon"
                  />
                </div>
              </div>
              <div class="col-md-3 pl-2">
                <div class="form-group">
                  <label>Employee Strength</label>
                  <input
                    type="text"
                    v-model="business.employee_strength"
                    class="form-control"
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="row">
              <div class="col-md-6 pr-2">
                <div class="form-group">
                  <label
                    >Provide your GST card number<span class="text-danger"
                      >*</span
                    ></label
                  >
                  <div class="d-flex align-items-baseline">
                    <div class="w-100">
                      <input
                        type="text"
                        class="form-control input-lg"
                        v-model="business.gst_number"
                      />
                      <div
                        v-if="submitted && !$v.business.gst_number.required"
                        class="invalid-feedback d-block"
                      >
                        GST number is required
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 pl-2">
                <div class="form-group">
                  <label
                    >Provide your PAN card number
                    <span class="text-danger">*</span></label
                  >
                  <div class="d-flex align-items-baseline">
                    <div class="w-100">
                      <input
                        type="text"
                        class="form-control input-lg"
                        v-model="business.pan_number"
                      />
                      <div
                        v-if="submitted && !$v.business.pan_number.required"
                        class="invalid-feedback d-block"
                      >
                        PAN card number is required
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-md-12 d-flex justify-content-end">
          <button class="cursor-pointer btn" @click="updateCompanyData">
            Update
          </button>
        </div>
      </div>
    </div>
    <b-modal ref="successModal" hide-footer hide-header :centered="true">
      <div class="d-flex justify-content-center flex-column align-items-center">
        <h4 class="my-4 text-center" style="text-transform: capitalize">
          <!-- User created successfully! -->
          {{ alertMessage }}
        </h4>
        <b-button class="mt-2 btn" variant="outline-dark" @click="hideModal"
          >Ok</b-button
        >
      </div>
    </b-modal>
  </div>
</template>
<script>
import {
  required,
  maxLength,
  minLength,
  requiredIf,
  decimal
} from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from 'vuex'
import appConstants from '../../appConstants'
// import PreviewImage from '../common/PreviewImage.vue'
// import UploadImage from '../common/UploadImage.vue'
import UploadImageAndPreview from '../common/UploadImageAndPreview.vue'
import '../../assets/css/appcolor.css'
const greaterThanZero = (value) => value > 0

export default {
  name: 'CompanyDetailsNew',
  components: {
    // PreviewImage,
    // UploadImage
    UploadImageAndPreview
  },
  props: ['companyData'],
  data() {
    return {
      business: {
        name: '',
        sub_categories: [],
        category: '',
        turnover: '',
        min_work_value: '',
        logo: '',
        banner_image: '',
        employee_strength: '',
        description: '',
        pan_number: '',
        gst_number: '',
        slug: '',
        website: '',
        company_id: '',
        type_of_contracts: [],
        project_types_handled: [],
        appx_area: '',
        absolute_turnover: '',
        absolute_turnover_unit: ''
      },
      submitted: false,
      path_s3_save_image: appConstants.PATH_SAVE_IMAGE_ON_S3,
      read_s3_image_url: process.env.VUE_APP_IMGURL,
      fullPortFolioUrl: '',
      portfolio_url: appConstants.PORTFOLIO_URL,
      show: false,
      is_error: false,
      alertMessage: ''
    }
  },
  validations() {
    return {
      business: {
        name: { required, maxLength: maxLength(60) },
        slug: { required },
        category: { required },
        sub_categories: { required },
        description: {
          required,
          minLength: minLength(20),
          maxLength: maxLength(2000)
        },
        pan_number: {
          required: requiredIf(function () {
            if (this.business.gst_number) {
              return false
            } else {
              return true
            }
          })
        },
        gst_number: {
          required: requiredIf(function () {
            if (this.business.pan_number) {
              return false
            } else {
              return true
            }
          })
        },
        project_types_handled: { required },
        type_of_contracts: { required },
        appx_area: { required },
        absolute_turnover: { required, decimal, greaterThanZero },
        absolute_turnover_unit: { required }
      }
    }
  },
  computed: {
    ...mapGetters('dropdownValues', [
      'getCategoryOptions',
      'getSubcategoryOptions',
      'getTurnOverOptions',
      'getMinWorkOptions',
      'getSectorOptions',
      'getContractTypeOptions',
      'getApproximateAreaOptions',
      'getPriceUnitOptions'
    ]),
    ...mapGetters([
      'getSlugValue',
      'getCurrentCompanyId',
      'getSingleCompanyPreviewDetails'
    ])
  },
  methods: {
    ...mapActions('dropdownValues', [
      'fetchCategoryData',
      'fetchSubCategories',
      'fetchTurnover',
      'fetchMinWork',
      'fetchUnitValues',
      'fetchSectorData',
      'fetchContractType',
      'fetchApproximateArea',
      'fetchPriceUnit'
    ]),
    ...mapActions([
      'fetchSlugFromCompanyName',
      'updateBusinessData',
      'fetchSingleCompanyPreviewDetails'
    ]),

    fetchSubCategoryAsPerCategory() {
      this.business.sub_categories = []
      if (
        this.business.category != undefined &&
        this.business.category != null &&
        this.business.category != ''
      ) {
        this.fetchSubCategories(this.business.category)
      }
    },
    // getGSTCardImageName(value) {
    //   this.business.gst_card_image = value.image_name
    // },
    // getPanCardImageName(value) {
    //   this.business.pan_card_image = value.image_name
    // },
    getDataToSave(data) {
      let dataToSave = {
        id: this.getCurrentCompanyId,
        name: data.name,
        logo: data.logo,
        banner_image: data.banner_image,
        website: data.website,
        turnover: data.turnover,
        employee_strength: data.employee_strength,
        category: data.category,
        gst_number: data.gst_number,
        min_work_value: data.min_work_value,
        sub_categories: data.sub_categories,
        pan_number: data.pan_number,
        description: data.description,
        company_id: this.getCurrentCompanyId,
        project_types_handled: data.project_types_handled,
        type_of_contracts: data.type_of_contracts,
        absolute_turnover: data.absolute_turnover,
        absolute_turnover_unit: data.absolute_turnover_unit,
        appx_area: data.appx_area
      }
      return dataToSave
    },
    updateCompanyData() {
      this.submitted = true
      let payload = this.getDataToSave(this.business)
      //console.log('payload', this.business)
      if (this.$v.business.$invalid) {
        console.log('Required data')
        return false
      }
      this.updateBusinessData(payload).then((data) => {
        if (data.status === 'error') {
          this.show = false
          this.is_error = true
          let msg = data.message
          this.alertMessage = msg
          this.showModal()
        } else {
          this.fetchSingleCompanyPreviewDetails(this.getCurrentCompanyId)
          this.show = false
          let msg = `Business information updated successfully!`
          this.alertMessage = msg
          this.showModal()
        }
      })
    },
    showModal() {
      this.$refs['successModal'].show()
    },
    hideModal() {
      this.$refs['successModal'].hide()
    },
    getUpdatedLogoImage(value) {
      this.business.logo = value.image_name
    },
    getUpdatedCoverImage(value) {
      this.business.banner_image = value.image_name
    },
    getSlugValueuUsingComapnyName() {
      if (this.business.name.trim() != '') {
        this.fetchSlugFromCompanyName(this.business.name).then(() => {
          this.business.slug = this.getSlugValue
          this.fullPortFolioUrl = this.portfolio_url + this.business.slug
        })
      }
    },
    setCompanyDetails() {
      if (this.getSingleCompanyPreviewDetails) {
        //console.log('business', this.getSingleCompanyPreviewDetails)
        this.business = this.getSingleCompanyPreviewDetails
        this.business.description = this.getSingleCompanyPreviewDetails.long_description
        this.business.category = this.getSingleCompanyPreviewDetails.category
        if (
          this.business.category != undefined &&
          this.business.category != null &&
          this.business.category != ''
        ) {
          this.fetchSubCategories(this.business.category)
        }
        this.business.sub_categories = this.getSingleCompanyPreviewDetails.sub_categories
        this.fullPortFolioUrl =
          this.portfolio_url + this.getSingleCompanyPreviewDetails.slug
        //this.fetchSubCategoryAsPerCategory()
      }
    }
  },
  mounted() {
    //this.setCompanyDetails()
  },
  async created() {
    this.fetchCategoryData()
    this.fetchTurnover()
    this.fetchMinWork()
    this.fetchUnitValues()
    this.fetchSectorData()
    this.fetchContractType()
    this.fetchApproximateArea()
    this.fetchPriceUnit()
    await this.setCompanyDetails()

    //console.log('business', this.business)
  }
}
</script>
<style>
.form-conatiner {
  margin-top: 20px;
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
</style>
