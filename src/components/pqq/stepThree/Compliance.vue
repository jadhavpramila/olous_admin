<template>
  <div class="cls-compliance form-conatiner">
    <div class="form-container">
      <div class="page-body">
        <div class="form-group">
          <label
            class="app-primary-text-color bold-text"
            style="line-height: 1.25; max-width: 411px"
          >
            Do you have the following written company policies? If "yes",
            provide a copy of your Policy statements.
          </label>
        </div>

        <!-- company health and safty -->
        <div>
          <label>Environmental, Health and Safety</label>
        </div>
        <div class="row">
          <div class="col-lg-9 col-md-9 col-right-padding">
            <div style="display: flex">
              <div style="flex-grow: 1; margin-right: 15px">
                <div>
                  <input
                    type="text"
                    class="form-control input-lg show-placeholder"
                    placeholder="Title / Name"
                    @input="companySafetyPolicyValueEntered"
                    v-model="complianceData.company_safety_policy"
                  />
                  <div
                    v-if="
                      submitted &&
                      !$v.complianceData.company_safety_policy.required &&
                      $v.complianceData.company_safety_policy_pdf.required
                    "
                    class="invalid-feedback d-block"
                  >
                    Required policy name
                  </div>
                  <div
                    v-if="
                      submitted &&
                      !$v.complianceData.company_safety_policy_pdf.required &&
                      $v.complianceData.company_safety_policy.required
                    "
                    class="invalid-feedback d-block"
                  >
                    Required policy attachment
                  </div>
                  <div
                    v-if="
                      submitted &&
                      !$v.complianceData.company_safety_policy.required &&
                      !$v.complianceData.company_safety_policy_pdf.required
                    "
                    class="invalid-feedback d-block"
                  >
                    Required policy name & attachment
                  </div>
                </div>
              </div>
              <button
                class="yes-no-btn"
                :class="{
                  'is-selected': complianceData.is_company_safety_policy
                }"
                @click="complianceData.is_company_safety_policy = true"
              >
                Yes
              </button>
              <button
                class="yes-no-btn"
                style="margin-left: 13px"
                :class="{
                  'is-selected': !complianceData.is_company_safety_policy
                }"
                @click="noCompanySafetyPolicy"
              >
                No
              </button>
            </div>
          </div>
          <div class="col-lg-3 col-md-3">
            <div
              style="display: flex"
              v-if="complianceData.is_company_safety_policy"
            >
              <div
                class="upload-attachment-for-years"
                style="margin-right: 13px; width: 70px"
              >
                <UploadImage
                  v-if="complianceData.company_safety_policy_pdf == ''"
                  id="comphealthAndSefty"
                  component_height="44"
                  is_logo_image="false"
                  is_upload_pdf="true"
                  :save_image_path_value="path_s3_save_pdf"
                  is_object_fit_contain="false"
                  @uploadedImage_changed="getCompHelthAndSaftyAttachment"
                ></UploadImage>
                <img
                  v-else
                  class="attachment-uploaded"
                  src="../../../assets/img/Attachment_selected.svg"
                />
              </div>
              <div style="width: 48px; margin-top: auto">
                <!--<img
                  class="cursor-pointer year-attachment-uploaded"
                  src="../../assets/img/Trash.svg"
                  title="remove attachemnt"
                  style="height: 44px"
                  @click="trashCompanySafetyPolicy"
                />-->
                <Trash
                  id="CompanySafetyPolicy"
                  component_height="44"
                  tooltip="Remove attachment"
                  @trash_event="trashCompanySafetyPolicy"
                ></Trash>
              </div>
            </div>
          </div>
        </div>
        <!-- End company health and safty -->

        <!-- company Quality management -->
        <div class="top-margin-to-row">
          <label>Quality Management</label>
        </div>
        <div class="row">
          <div class="col-lg-9 col-md-9 col-right-padding">
            <div style="display: flex">
              <div style="flex-grow: 1; margin-right: 15px">
                <div>
                  <input
                    type="text"
                    class="form-control input-lg show-placeholder"
                    placeholder="Title / Name"
                    @input="companyQualityPolicyValueEntered"
                    v-model="complianceData.company_quality_mgt_policy"
                  />
                  <div
                    v-if="
                      submitted &&
                      !$v.complianceData.company_quality_mgt_policy.required &&
                      $v.complianceData.company_quality_mgt_policy_pdf.required
                    "
                    class="invalid-feedback d-block"
                  >
                    Required policy name
                  </div>
                  <div
                    v-if="
                      submitted &&
                      !$v.complianceData.company_quality_mgt_policy_pdf
                        .required &&
                      $v.complianceData.company_quality_mgt_policy.required
                    "
                    class="invalid-feedback d-block"
                  >
                    Required policy attachment
                  </div>
                  <div
                    v-if="
                      submitted &&
                      !$v.complianceData.company_quality_mgt_policy.required &&
                      !$v.complianceData.company_quality_mgt_policy_pdf.required
                    "
                    class="invalid-feedback d-block"
                  >
                    Required policy name & attachment
                  </div>
                </div>
              </div>
              <button
                class="yes-no-btn"
                :class="{
                  'is-selected': complianceData.is_company_quality_mgt_policy
                }"
                @click="complianceData.is_company_quality_mgt_policy = true"
              >
                Yes
              </button>
              <button
                class="yes-no-btn"
                style="margin-left: 13px"
                :class="{
                  'is-selected': !complianceData.is_company_quality_mgt_policy
                }"
                @click="noCompanyqualityPolicy"
              >
                No
              </button>
            </div>
          </div>
          <div class="col-lg-3 col-md-3">
            <div
              style="display: flex"
              v-if="complianceData.is_company_quality_mgt_policy"
            >
              <div
                class="upload-attachment-for-years"
                style="margin-right: 13px; width: 70px"
              >
                <UploadImage
                  v-if="complianceData.company_quality_mgt_policy_pdf == ''"
                  id="compQuality"
                  component_height="44"
                  is_logo_image="false"
                  is_upload_pdf="true"
                  :save_image_path_value="path_s3_save_pdf"
                  is_object_fit_contain="false"
                  @uploadedImage_changed="getCompQualityManagement"
                ></UploadImage>
                <img
                  v-else
                  class="attachment-uploaded"
                  src="../../../assets/img/Attachment_selected.svg"
                />
              </div>
              <div style="width: 48px; margin-top: auto">
                <!--<img
                  class="cursor-pointer year-attachment-uploaded"
                  src="../../assets/img/Trash.svg"
                  style="height: 44px"
                  title="remove attachemnt"
                  @click="trashCompanyqualityPolicy"
                />-->
                <Trash
                  id="CompanyqualityPolicy"
                  component_height="44"
                  tooltip="Remove attachment"
                  @trash_event="trashCompanyqualityPolicy"
                ></Trash>
              </div>
            </div>
          </div>
        </div>
        <!-- End company Quality management -->

        <!-- safety guideline -->
        <!--<div style="max-width: 520px" class="top-margin-to-row">
          <label
            >Which Safety guidelines does your Safety Policy apply to its
            organisation - ISO 14000 / ISO 18000 / OHSAS / NEBOSH / Other</label
          >
        </div>
        <div class="row">
          <div class="col-lg-9 col-md-9 col-right-padding">
            <div style="display: flex">
              <div style="flex-grow: 1; margin-right: 15px">
                <div>
                  <input
                    type="text"
                    class="form-control input-lg show-placeholder"
                    placeholder="Title / Name"
                    v-model="complianceData.safety_policy"
                    @input="safetyPolicyValueEntered"
                  />
                  <div
                    v-if="
                      submitted &&
                      !$v.complianceData.safety_policy.required &&
                      $v.complianceData.safety_policy_pdf.required
                    "
                    class="invalid-feedback d-block"
                  >
                    Required policy name
                  </div>
                  <div
                    v-if="
                      submitted &&
                      !$v.complianceData.safety_policy_pdf.required &&
                      $v.complianceData.safety_policy.required
                    "
                    class="invalid-feedback d-block"
                  >
                    Required policy attachment
                  </div>
                  <div
                    v-if="
                      submitted &&
                      !$v.complianceData.safety_policy.required &&
                      !$v.complianceData.safety_policy_pdf.required
                    "
                    class="invalid-feedback d-block"
                  >
                    Required policy name & attachment
                  </div>
                </div>
              </div>
              <button
                class="yes-no-btn"
                :class="{
                  'is-selected': complianceData.is_safety_policy
                }"
                @click="complianceData.is_safety_policy = true"
              >
                Yes
              </button>
              <button
                class="yes-no-btn"
                style="margin-left: 13px"
                :class="{
                  'is-selected': !complianceData.is_safety_policy
                }"
                @click="noSafetyPolicy"
              >
                No
              </button>
            </div>
          </div>
          <div class="col-lg-3 col-md-3">
            <div style="display: flex" v-if="complianceData.is_safety_policy">
              <div
                class="upload-attachment-for-years"
                style="margin-right: 13px; width: 70px"
              >
                <UploadImage
                  v-if="complianceData.safety_policy_pdf == ''"
                  id="healthAndSefty"
                  component_height="44"
                  is_logo_image="false"
                  is_upload_pdf="true"
                  :save_image_path_value="path_s3_save_pdf"
                  is_object_fit_contain="false"
                  @uploadedImage_changed="getHelthAndSaftyAttachment"
                ></UploadImage>
                <img
                  v-else
                  class="attachment-uploaded"
                  src="../../assets/img/Attachment_selected.svg"
                />
              </div>
              <div style="width: 48px; margin-top: auto">
                <Trash
                  id="SafetyPolicy"
                  component_height="44"
                  tooltip="Remove attachment"
                  @trash_event="trashSafetyPolicy"
                ></Trash>
              </div>
            </div>
          </div>
        </div>-->
        <!-- End safety guideline -->

        <!-- quality management -->
        <!--<div style="max-width: 520px" class="top-margin-to-row">
          <label
            >Which Quality Management System does your company apply to its
            organisation, i.e. ISO 9000, NVQ, other? If yes, in which year was
            this system first accredited?
          </label>
        </div>
        <div class="row">
          <div class="col-lg-9 col-md-9 col-right-padding">
            <div style="display: flex">
              <div style="flex-grow: 1; margin-right: 15px">
                <div>
                  <input
                    type="text"
                    class="form-control input-lg show-placeholder"
                    placeholder="Title / Name"
                    v-model="complianceData.quality_mgt_policy"
                    @input="qualityPolicyValueEntered"
                  />
                  <div
                    v-if="
                      submitted &&
                      !$v.complianceData.quality_mgt_policy.required &&
                      $v.complianceData.quality_mgt_policy_pdf.required
                    "
                    class="invalid-feedback d-block"
                  >
                    Required policy name
                  </div>
                  <div
                    v-if="
                      submitted &&
                      !$v.complianceData.quality_mgt_policy_pdf.required &&
                      $v.complianceData.quality_mgt_policy.required
                    "
                    class="invalid-feedback d-block"
                  >
                    Required policy attachment
                  </div>
                  <div
                    v-if="
                      submitted &&
                      !$v.complianceData.quality_mgt_policy.required &&
                      !$v.complianceData.quality_mgt_policy_pdf.required
                    "
                    class="invalid-feedback d-block"
                  >
                    Required policy name & attachment
                  </div>
                </div>
              </div>
              <div style="width: 115px; margin-right: 15px">
                <v-select
                  id="establishmnetYear"
                  label="name"
                  :searchable="false"
                  v-model="complianceData.year_first_accredited"
                  :options="getEstablishmentYears"
                  placeholder="select"
                  :reduce="(options) => options.id"
                  :closeOnSelect="true"
                  :disabled="complianceData.quality_mgt_policy.trim() == ''"
                  class="single-value remove-close-btn"
                />
                <div
                  v-if="
                    submitted &&
                    !$v.complianceData.year_first_accredited.required
                  "
                  class="invalid-feedback d-block"
                >
                  required
                </div>
              </div>
              <button
                class="yes-no-btn"
                :class="{
                  'is-selected': complianceData.is_quality_mgt_policy
                }"
                @click="complianceData.is_quality_mgt_policy = true"
              >
                Yes
              </button>
              <button
                class="yes-no-btn"
                style="margin-left: 13px"
                :class="{
                  'is-selected': !complianceData.is_quality_mgt_policy
                }"
                @click="noQualityPolicy"
              >
                No
              </button>
            </div>
          </div>
          <div class="col-lg-3 col-md-3">
            <div
              style="display: flex"
              v-if="complianceData.is_quality_mgt_policy"
            >
              <div
                class="upload-attachment-for-years"
                style="margin-right: 13px; width: 70px"
              >
                <UploadImage
                  v-if="complianceData.quality_mgt_policy_pdf == ''"
                  id="qualitymanagement"
                  component_height="44"
                  is_logo_image="false"
                  is_upload_pdf="true"
                  :save_image_path_value="path_s3_save_pdf"
                  is_object_fit_contain="false"
                  @uploadedImage_changed="getQualityManagementAttachment"
                ></UploadImage>
                <img
                  v-else
                  class="attachment-uploaded"
                  src="../../assets/img/Attachment_selected.svg"
                />
              </div>
              <div style="width: 48px; margin-top: auto">
                <Trash
                  id="CompanySafetyPolicy"
                  component_height="44"
                  tooltip="Remove attachment"
                  @trash_event="trashQualityPolicy"
                ></Trash>
              </div>
            </div>
          </div>
        </div>-->
        <!-- End quality management -->

        <!-- Add any other document -->
        <div class="mt-3">
          <label class="bold-text"
            >Which certifications does your company comply from the list
            below?</label
          >
        </div>
        <div class="row">
          <div class="col-lg-8 col-md-8">
            <div style="display: flex">
              <div style="flex-grow: 1">
                <!--<input
                  type="text"
                  class="form-control input-lg show-placeholder"
                  placeholder="Title / Name"
                  v-model="new_document.document_name"
                />-->
                <v-select
                  id="doucment_drp"
                  label="name"
                  :searchable="false"
                  v-model="new_document.document_name"
                  :options="getCertificationsList"
                  placeholder="select"
                  :reduce="(options) => options.id"
                  :closeOnSelect="true"
                  class="single-value remove-close-btn"
                />
                <div
                  v-if="
                    isShowAddDocumentValidation &&
                    new_document.document_name.trim() == '' &&
                    new_document.document_pdf != ''
                  "
                  class="invalid-feedback d-block"
                >
                  Certificate name required
                </div>
                <div
                  v-if="
                    isShowAddDocumentValidation &&
                    new_document.document_pdf == '' &&
                    new_document.document_name.trim() != ''
                  "
                  class="invalid-feedback d-block"
                >
                  Certificate attachment required
                </div>
                <div
                  v-if="
                    isShowAddDocumentValidation &&
                    new_document.document_name.trim() == '' &&
                    new_document.document_pdf == ''
                  "
                  class="invalid-feedback d-block"
                >
                  Certificate name & attachment required
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-4 col-left-padding">
            <div style="display: flex">
              <div
                class="upload-attachment-for-years"
                style="margin-right: 13px; width: 80px"
              >
                <UploadImage
                  v-if="new_document.document_pdf == ''"
                  id="anyotherReventDoc"
                  component_height="44"
                  is_logo_image="false"
                  is_upload_pdf="true"
                  :save_image_path_value="path_s3_save_pdf"
                  is_object_fit_contain="false"
                  @uploadedImage_changed="getOtherDocumentvalue"
                ></UploadImage>
                <img
                  v-else
                  class="attachment-uploaded"
                  src="../../../assets/img/Attachment_selected.svg"
                />
              </div>
              <div style="width: 48px; margin-top: auto; margin-right: 15px">
                <!--<img
                  class="cursor-pointer year-attachment-uploaded"
                  src="../../assets/img/Trash.svg"
                  style="height: 44px"
                  title="remove certification attachment "
                  @click="removeDocumentAttachment"
                />
                -->
                <Trash
                  id="CompanySafetyPolicy"
                  component_height="44"
                  tooltip="Remove attachment"
                  @trash_event="removeDocumentAttachment"
                ></Trash>
              </div>
              <div>
                <button
                  type="button"
                  class="btn btn-dark save_btn"
                  style="height: 44px !important"
                  @click="AddNewDocument"
                >
                  + Add
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- End any other document -->

        <!-- Document List -->
        <div
          class="row"
          v-for="(document, index) in complianceData.document_list"
          :key="getDocumentKey(index)"
        >
          <div class="col-lg-8 col-md-8">
            <div style="display: flex">
              <div style="flex-grow: 1; margin-right: 15px">
                <input
                  type="text"
                  :readonly="true"
                  class="form-control input-lg show-placeholder"
                  :value="getDocumentNameFromID(document.document_name)"
                />
              </div>
              <div style="width: 48px; margin-top: 2px">
                <!--<img
                  class="cursor-pointer year-attachment-uploaded"
                  src="../../assets/img/Trash.svg"
                  style="height: 44px"
                  title="delete certificate"
                  @click="deleteDocumentFromdb(index)"
                />-->
                <Trash
                  id="Document"
                  component_height="44"
                  tooltip="Remove attachment"
                  @trash_event="deleteDocumentFromdb(index)"
                ></Trash>
              </div>
            </div>
          </div>
        </div>

        <!-- End document List -->

        <!-- Add Insuarance policy -->
        <div class="mt-3">
          <label class="bold-text"
            >Which Insurance policies does your company possess?</label
          >
        </div>
        <div class="row">
          <div class="col-lg-8 col-md-8">
            <div style="display: flex">
              <div style="flex-grow: 1">
                <v-select
                  id="insurance_drp"
                  label="name"
                  :searchable="false"
                  v-model="new_insurance.insurance_id"
                  :options="getInsurancePoliciesList"
                  placeholder="select"
                  :reduce="(options) => options.id"
                  :closeOnSelect="true"
                  class="single-value remove-close-btn"
                />

                <div
                  v-if="
                    isShowAddInsuranceValidation &&
                    new_insurance.insurance_id == '' &&
                    new_insurance.insurance_pdf != ''
                  "
                  class="invalid-feedback d-block"
                >
                  Insurance name required
                </div>
                <div
                  v-if="
                    isShowAddInsuranceValidation &&
                    new_insurance.insurance_pdf == '' &&
                    new_insurance.insurance_id != ''
                  "
                  class="invalid-feedback d-block"
                >
                  Insurance attachment required
                </div>
                <div
                  v-if="
                    isShowAddInsuranceValidation &&
                    new_insurance.insurance_id == '' &&
                    new_insurance.insurance_pdf == ''
                  "
                  class="invalid-feedback d-block"
                >
                  Insurance name & attachment required
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-4 col-left-padding">
            <div style="display: flex">
              <div
                class="upload-attachment-for-years"
                style="margin-right: 13px; width: 80px"
              >
                <UploadImage
                  v-if="new_insurance.insurance_pdf == ''"
                  id="insuranceDoc"
                  component_height="44"
                  is_logo_image="false"
                  is_upload_pdf="true"
                  :save_image_path_value="path_s3_save_pdf"
                  is_object_fit_contain="false"
                  @uploadedImage_changed="getNewInsurancevalue"
                ></UploadImage>
                <img
                  v-else
                  class="attachment-uploaded"
                  src="../../../assets/img/Attachment_selected.svg"
                />
              </div>
              <div
                style="
                  width: 48px;
                  margin-top: auto;
                  margin-bottom: 10px;
                  margin-right: 15px;
                "
              >
                <!--<img
                  class="cursor-pointer year-attachment-uploaded"
                  src="../../assets/img/Trash.svg"
                  title="remove Licence attachment "
                  @click="removeAttachedLicence"
                />
                -->
                <Trash
                  id="CompanyInsurance"
                  component_height="44"
                  tooltip="Remove attachment"
                  @trash_event="removeAttachedInsurancepdf"
                ></Trash>
              </div>
              <div>
                <button
                  type="button"
                  class="btn btn-dark save_btn"
                  style="height: 44px !important"
                  @click="addInsurance"
                >
                  + Add
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- End add Insuarance policy -->

        <!-- Insuarance policies List-->
        <div
          class="row"
          v-for="(insurance, index) in complianceData.insurance_list"
          :key="getInsuranceKey(index)"
        >
          <div class="col-lg-8 col-md-8">
            <div style="display: flex">
              <div style="flex-grow: 1; margin-right: 15px">
                <input
                  type="text"
                  :readonly="true"
                  class="form-control input-lg show-placeholder"
                  :value="getInsuranceNameFromID(insurance.insurance_id)"
                />
              </div>
              <div style="width: 48px; margin-top: 2px">
                <!--<img
                  class="cursor-pointer year-attachment-uploaded"
                  src="../../assets/img/Trash.svg"
                  title="delete License"
                  @click="deleteLincence(index)"
                />-->
                <Trash
                  id="Lincence"
                  component_height="44"
                  tooltip="Remove Insurance"
                  @trash_event="deleteInsurance(index)"
                ></Trash>
              </div>
            </div>
          </div>
        </div>

        <!-- End Insurance policies List -->

        <!-- Add Licenses -->
        <div class="mt-3">
          <label class="bold-text"
            >Which licenses does your Company possess?</label
          >
        </div>
        <div class="row">
          <div class="col-lg-8 col-md-8">
            <div style="display: flex">
              <div style="flex-grow: 1">
                <!--<input
                  type="text"
                  class="form-control input-lg show-placeholder"
                  placeholder="Title / Name"
                  v-model="new_license.license_name"
                />-->
                <v-select
                  id="license_drp"
                  label="name"
                  :searchable="false"
                  v-model="new_license.license_name"
                  :options="getLicensesList"
                  placeholder="select"
                  :reduce="(options) => options.id"
                  :closeOnSelect="true"
                  class="single-value remove-close-btn"
                />

                <div
                  v-if="
                    isShowAddLicenseValidation &&
                    new_license.license_name.trim() == '' &&
                    new_license.license_pdf != ''
                  "
                  class="invalid-feedback d-block"
                >
                  License name required
                </div>
                <div
                  v-if="
                    isShowAddLicenseValidation &&
                    new_license.license_pdf == '' &&
                    new_license.license_name.trim() != ''
                  "
                  class="invalid-feedback d-block"
                >
                  License attachment required
                </div>
                <div
                  v-if="
                    isShowAddLicenseValidation &&
                    new_license.license_name.trim() == '' &&
                    new_license.license_pdf == ''
                  "
                  class="invalid-feedback d-block"
                >
                  License name & attachment required
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-4 col-left-padding">
            <div style="display: flex">
              <div
                class="upload-attachment-for-years"
                style="margin-right: 13px; width: 80px"
              >
                <UploadImage
                  v-if="new_license.license_pdf == ''"
                  id="anyotherlecenceDoc"
                  component_height="44"
                  is_logo_image="false"
                  is_upload_pdf="true"
                  :save_image_path_value="path_s3_save_pdf"
                  is_object_fit_contain="false"
                  @uploadedImage_changed="getNewLicensevalue"
                ></UploadImage>
                <img
                  v-else
                  class="attachment-uploaded"
                  src="../../../assets/img/Attachment_selected.svg"
                />
              </div>
              <div
                style="
                  width: 48px;
                  margin-top: auto;
                  margin-bottom: 10px;
                  margin-right: 15px;
                "
              >
                <!--<img
                  class="cursor-pointer year-attachment-uploaded"
                  src="../../assets/img/Trash.svg"
                  title="remove Licence attachment "
                  @click="removeAttachedLicence"
                />
                -->
                <Trash
                  id="CompanySafetyPolicy"
                  component_height="44"
                  tooltip="Remove attachment"
                  @trash_event="removeAttachedLicence"
                ></Trash>
              </div>
              <div>
                <button
                  type="button"
                  class="btn btn-dark save_btn"
                  style="height: 44px !important"
                  @click="addLicenses"
                >
                  + Add
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- End add Licenses -->

        <!-- Licenses List-->
        <div
          class="row"
          v-for="(licence, index) in complianceData.licenses_list"
          :key="getLicensesKey(index)"
        >
          <div class="col-lg-8 col-md-8">
            <div style="display: flex">
              <div style="flex-grow: 1; margin-right: 15px">
                <input
                  type="text"
                  :readonly="true"
                  class="form-control input-lg show-placeholder"
                  :value="getLicenseNameFromID(licence.license_name)"
                />
              </div>
              <div style="width: 48px; margin-top: 2px">
                <!--<img
                  class="cursor-pointer year-attachment-uploaded"
                  src="../../assets/img/Trash.svg"
                  title="delete License"
                  @click="deleteLincence(index)"
                />-->
                <Trash
                  id="Lincence"
                  component_height="44"
                  tooltip="Remove attachment"
                  @trash_event="deleteLincence(index)"
                ></Trash>
              </div>
            </div>
          </div>
        </div>

        <!-- End Licenses List -->

        <div class="row" align="right" style="margin-bottom: 10px">
          <div class="col-lg-11">
            <button
              type="button"
              class="btn btn-dark save_btn"
              @click="btnSaveComplianceData"
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <modal
        v-if="showModal"
        id="compliance_component_modal"
        @closeModal="closeModal"
      >
        <div slot="body">{{ modalMessage }}</div>
      </modal>

      <modal
        v-if="showComplianceModal"
        id="compliance_modal"
        @closeModal="updateComplianceModalData([false, ''])"
      >
        <div slot="body">{{ modalComplianceMessage }}</div>
      </modal>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import appConstants from '../../../appConstants.js'
import modal from '../../../common/Modal'
import UploadImage from '../../common/UploadImage'
import { requiredIf } from 'vuelidate/lib/validators'
import Trash from '../../common/Trash'

export default {
  name: 'Compliance',
  components: {
    modal,
    UploadImage,
    Trash
  },
  data() {
    return {
      complianceData: {
        id: '',
        is_company_safety_policy: false,
        company_safety_policy: '',
        company_safety_policy_pdf: '',

        is_company_quality_mgt_policy: false,
        company_quality_mgt_policy: '',
        company_quality_mgt_policy_pdf: '',

        // is_safety_policy: false,
        // safety_policy: '',
        // safety_policy_pdf: '',

        // is_quality_mgt_policy: false,
        // quality_mgt_policy: '',
        // quality_mgt_policy_pdf: '',
        // year_first_accredited: '',

        document_list: [],
        licenses_list: [],
        insurance_list: []
      },
      submitted: false,
      isShowAddDocumentValidation: false,
      isShowAddLicenseValidation: false,
      isShowAddInsuranceValidation: false,
      path_s3_save_pdf: appConstants.PATH_SAVE_PDF_ON_S3,
      new_document: {
        id: '',
        document_name: '',
        document_pdf: ''
      },
      new_license: {
        id: '',
        license_name: '',
        license_pdf: ''
      },
      new_insurance: {
        id: '',
        insurance_id: '',
        insurance_pdf: ''
      },
      deleted_document: [],
      deleted_licenses: [],
      deleted_insurance: [],
      showModal: false,
      modalMessage: ''
    }
  },
  validations() {
    return {
      complianceData: {
        company_safety_policy: {
          required: requiredIf(function () {
            return this.complianceData.is_company_safety_policy
          })
        },
        company_safety_policy_pdf: {
          required: requiredIf(function () {
            return this.complianceData.is_company_safety_policy
          })
        },

        company_quality_mgt_policy: {
          required: requiredIf(function () {
            return this.complianceData.is_company_quality_mgt_policy
          })
        },
        company_quality_mgt_policy_pdf: {
          required: requiredIf(function () {
            return this.complianceData.is_company_quality_mgt_policy
          })
        }

        // safety_policy: {
        //   required: requiredIf(function () {
        //     return this.complianceData.is_safety_policy
        //   })
        // },
        // safety_policy_pdf: {
        //   required: requiredIf(function () {
        //     return this.complianceData.is_safety_policy
        //   })
        // },

        // quality_mgt_policy: {
        //   required: requiredIf(function () {
        //     return this.complianceData.is_quality_mgt_policy
        //   })
        // },
        // quality_mgt_policy_pdf: {
        //   required: requiredIf(function () {
        //     return this.complianceData.is_quality_mgt_policy
        //   })
        // },
        // year_first_accredited: {
        //   required: requiredIf(function () {
        //     return this.complianceData.is_quality_mgt_policy
        //   })
        // }
      }
    }
  },
  computed: {
    ...mapGetters('dropdownValues', [
      'getEstablishmentYears',
      'getCertificationsList',
      'getLicensesList',
      'getInsurancePoliciesList'
    ]),
    ...mapGetters('compliance', [
      'getComplianceData',
      'showComplianceModal',
      'modalComplianceMessage'
    ]),
    ...mapGetters('companyData', ['getCurrentCompanyData'])
  },
  methods: {
    ...mapActions('dropdownValues', [
      'fetchEstablishmentYear',
      'fetchCertificationList',
      'fetchLicensesList',
      'fetchInsurancePoliciesList'
    ]),
    ...mapActions('compliance', [
      'fetchComplianceData',
      'saveComplianceData',
      'saveDocument',
      'deleteDocument',
      'saveLicense',
      'deleteLicense'
    ]),
    ...mapMutations('compliance', ['updateComplianceModalData']),
    getCompHelthAndSaftyAttachment(value) {
      this.complianceData.company_safety_policy_pdf = value.image_name
    },
    getCompQualityManagement(value) {
      this.complianceData.company_quality_mgt_policy_pdf = value.image_name
    },
    getHelthAndSaftyAttachment(value) {
      this.complianceData.safety_policy_pdf = value.image_name
    },
    getQualityManagementAttachment(value) {
      this.complianceData.quality_mgt_policy_pdf = value.image_name
    },
    getOtherDocumentvalue(value) {
      this.new_document.document_pdf = value.image_name
    },

    getNewLicensevalue(value) {
      this.new_license.license_pdf = value.image_name
    },
    getNewInsurancevalue(value) {
      this.new_insurance.insurance_pdf = value.image_name
    },
    removeAttachedLicence() {
      this.new_license.license_pdf = ''
    },
    removeAttachedInsurancepdf() {
      this.new_insurance.insurance_pdf = ''
    },
    getLicensesKey(index) {
      return `Licenses${index}`
    },
    getInsuranceKey(index) {
      return `Insurance${index}`
    },
    getDocumentKey(index) {
      return `Doc${index}`
    },
    getFileKeyTodelete(fileName) {
      return `${this.path_s3_save_pdf}${fileName}`
    },

    trashCompanySafetyPolicy() {
      this.complianceData.company_safety_policy_pdf = ''
    },
    noCompanySafetyPolicy() {
      this.complianceData.is_company_safety_policy = false
      this.complianceData.company_safety_policy = ''
      this.trashCompanySafetyPolicy()
    },
    companySafetyPolicyValueEntered() {
      this.complianceData.is_company_safety_policy = true
    },

    trashCompanyqualityPolicy() {
      this.complianceData.company_quality_mgt_policy_pdf = ''
    },
    noCompanyqualityPolicy() {
      this.complianceData.is_company_quality_mgt_policy = false
      this.complianceData.company_quality_mgt_policy = ''
      this.trashCompanyqualityPolicy()
    },
    companyQualityPolicyValueEntered() {
      this.complianceData.is_company_quality_mgt_policy = true
    },

    trashSafetyPolicy() {
      this.complianceData.safety_policy_pdf = ''
    },
    noSafetyPolicy() {
      this.complianceData.is_safety_policy = false
      this.complianceData.safety_policy = ''
      this.trashSafetyPolicy()
    },
    safetyPolicyValueEntered() {
      this.complianceData.is_safety_policy = true
    },

    trashQualityPolicy() {
      this.complianceData.quality_mgt_policy_pdf = ''
    },
    noQualityPolicy() {
      this.complianceData.is_quality_mgt_policy = false
      this.complianceData.quality_mgt_policy = ''
      this.complianceData.year_first_accredited = ''
      this.trashQualityPolicy()
    },
    qualityPolicyValueEntered(e) {
      if (e.target.value.trim() == '') {
        this.complianceData.year_first_accredited = ''
        this.complianceData.is_quality_mgt_policy = false
      } else {
        this.complianceData.is_quality_mgt_policy = true
      }
    },
    getDocumentNameFromID(value) {
      for (var index = 0; index < this.getCertificationsList.length; index++) {
        if (value == this.getCertificationsList[index].id) {
          return this.getCertificationsList[index].name
        }
      }
    },
    getInsuranceNameFromID(value) {
      for (
        var index = 0;
        index < this.getInsurancePoliciesList.length;
        index++
      ) {
        if (value == this.getInsurancePoliciesList[index].id) {
          return this.getInsurancePoliciesList[index].name
        }
      }
    },
    getLicenseNameFromID(value) {
      for (var index = 0; index < this.getLicensesList.length; index++) {
        if (value == this.getLicensesList[index].id) {
          return this.getLicensesList[index].name
        }
      }
    },
    closeModal() {
      this.showModal = false
      this.modalMessage = ''
    },
    addLicenses() {
      // validation
      if (
        this.new_license.license_name.trim() == '' ||
        this.new_license.license_pdf.trim() == ''
      ) {
        this.isShowAddLicenseValidation = true
        return
      }

      this.isShowAddLicenseValidation = false

      // check already available
      for (
        let index = 0;
        index < this.complianceData.licenses_list.length;
        index++
      ) {
        if (
          this.complianceData.licenses_list[index].license_name.toLowerCase() ==
          this.new_license.license_name.toLowerCase()
        ) {
          //Already added
          this.modalMessage = 'Already added'
          this.showModal = true
          setTimeout(() => {
            this.modalMessage = ''
            this.showModal = false
          }, 2500)
          return
        }
      }

      //Save to DB //TODO

      var new_licence_details = {
        id: '',
        license_name: this.new_license.license_name,
        license_pdf: this.new_license.license_pdf
      }

      this.complianceData.licenses_list.push(new_licence_details)
      this.new_license.license_name = ''
      this.new_license.license_pdf = ''
    },

    deleteLincence(index) {
      if (this.complianceData.licenses_list[index].id != '') {
        this.deleted_licenses.push(this.complianceData.licenses_list[index].id)
      }
      this.complianceData.licenses_list.splice(index, 1)
    },
    deleteInsurance(index) {
      if (this.complianceData.insurance_list[index].id != '') {
        this.deleted_insurance.push(
          this.complianceData.insurance_list[index].id
        )
      }
      this.complianceData.insurance_list.splice(index, 1)
    },
    removeDocumentAttachment() {
      this.new_document.document_pdf = ''
    },
    deleteDocumentFromdb(index) {
      if (this.complianceData.document_list[index].id != '') {
        this.deleted_document.push(this.complianceData.document_list[index].id)
      }
      this.complianceData.document_list.splice(index, 1)
      // var deleteItem = this.complianceData.document_list[index]
      // let payload = {
      //   company_id: this.getCurrentCompanyData.id,
      //   documents_ids: [deleteItem.id]
      // }
      // this.deleteDocument(payload).then(() => {})
    },
    AddNewDocument() {
      // validation
      if (
        this.new_document.document_name.trim() == '' ||
        this.new_document.document_pdf.trim() == ''
      ) {
        this.isShowAddDocumentValidation = true
        return
      }

      this.isShowAddDocumentValidation = false

      // check already available
      for (
        var index = 0;
        index < this.complianceData.document_list.length;
        index++
      ) {
        if (
          this.complianceData.document_list[
            index
          ].document_name.toLowerCase() ==
          this.new_document.document_name.toLowerCase()
        ) {
          //Already added
          this.modalMessage = 'Already added'
          this.showModal = true
          setTimeout(() => {
            this.modalMessage = ''
            this.showModal = false
          }, 2500)
          return
        }
      }

      //Save to DB
      var new_Document_details = {
        id: '',
        document_name: this.new_document.document_name,
        document_pdf: this.new_document.document_pdf
      }

      this.complianceData.document_list.push(new_Document_details)
      this.new_document.document_name = ''
      this.new_document.document_pdf = ''

      // let payload = {
      //   company_id: this.getCurrentCompanyData.id,
      //   documents: [new_Document_details]
      // }

      // this.saveDocument(payload).then((doc) => {
      //   new_Document_details.id = doc[0].id
      //  this.complianceData.document_list.push(new_Document_details)
      // this.new_document.document_name = ''
      // this.new_document.document_pdf = ''
      // })
    },
    addInsurance() {
      // validation
      if (
        this.new_insurance.insurance_id == '' ||
        this.new_insurance.insurance_pdf.trim() == ''
      ) {
        this.isShowAddInsuranceValidation = true
        return
      }

      this.isShowAddInsuranceValidation = false

      // check already available
      for (
        let index = 0;
        index < this.complianceData.insurance_list.length;
        index++
      ) {
        if (
          this.complianceData.insurance_list[index].insurance_id ==
          this.new_insurance.insurance_id
        ) {
          //Already added
          this.modalMessage = 'Already added'
          this.showModal = true
          setTimeout(() => {
            this.modalMessage = ''
            this.showModal = false
          }, 2500)
          return
        }
      }

      //Save to DB //TODO

      var new_insurance_details = {
        id: '',
        insurance_id: this.new_insurance.insurance_id,
        insurance_pdf: this.new_insurance.insurance_pdf
      }

      this.complianceData.insurance_list.push(new_insurance_details)
      this.new_insurance.insurance_id = ''
      this.new_insurance.insurance_pdf = ''
    },
    setComplianceData(data) {
      if (data.pqq.length > 0) {
        let comp_data = data.pqq[0]

        this.complianceData.id = comp_data.id

        this.complianceData.is_company_safety_policy =
          comp_data.is_company_safety_policy == null
            ? false
            : comp_data.is_company_safety_policy

        this.complianceData.company_safety_policy =
          comp_data.company_safety_policy

        this.complianceData.company_safety_policy_pdf =
          comp_data.company_safety_policy_pdf

        this.complianceData.is_company_quality_mgt_policy =
          comp_data.is_company_quality_mgt_policy == null
            ? false
            : comp_data.is_company_quality_mgt_policy

        this.complianceData.company_quality_mgt_policy =
          comp_data.company_quality_mgt_policy

        this.complianceData.company_quality_mgt_policy_pdf =
          comp_data.company_quality_mgt_policy_pdf

        // this.complianceData.is_safety_policy = comp_data.is_safety_policy
        // this.complianceData.safety_policy = comp_data.safety_policy
        // this.complianceData.safety_policy_pdf = comp_data.safety_policy_pdf

        // this.complianceData.is_quality_mgt_policy =
        //   comp_data.is_quality_mgt_policy

        // this.complianceData.quality_mgt_policy = comp_data.quality_mgt_policy

        // this.complianceData.quality_mgt_policy_pdf =
        //   comp_data.quality_mgt_policy_pdf

        // this.complianceData.year_first_accredited =
        //   comp_data.year_first_accredited == null
        //     ? ''
        //     : comp_data.year_first_accredited
      }

      this.complianceData.document_list = []

      if (data.documents.length > 0) {
        for (let i = 0; i < data.documents.length; i++) {
          let temp = data.documents[i]
          var db_documents_details = {
            id: temp.id,
            document_name: temp.document_name,
            document_pdf: temp.document_pdf
          }
          this.complianceData.document_list.push(db_documents_details)
        }
      }

      this.complianceData.licenses_list = []

      if (data.licenses.length > 0) {
        for (let i = 0; i < data.licenses.length; i++) {
          let temp = data.licenses[i]
          var db_license_details = {
            id: temp.id,
            license_name: temp.license_name,
            license_pdf: temp.license_pdf
          }
          this.complianceData.licenses_list.push(db_license_details)
        }
      }

      this.complianceData.insurance_list = []

      if (data.insurances.length > 0) {
        for (let i = 0; i < data.insurances.length; i++) {
          let temp = data.insurances[i]
          var db_insurance_details = {
            id: temp.id,
            insurance_id: temp.insurance_id,
            insurance_pdf: temp.insurance_pdf
          }
          this.complianceData.insurance_list.push(db_insurance_details)
        }
      }
    },
    btnSaveComplianceData() {
      this.new_document.document_name = ''
      this.new_document.document_pdf = ''
      this.isShowAddDocumentValidation = false

      this.new_license.license_name = ''
      this.new_license.license_pdf = ''
      this.isShowAddLicenseValidation = false

      this.new_insurance.insurance_id = ''
      this.new_insurance.insurance_pdf = ''
      this.isShowAddInsuranceValidation = false

      this.submitted = true
      if (this.$v.complianceData.$invalid) {
        return false
      }

      let new_doc = this.complianceData.document_list.filter((res) => {
        return !res.id
      })

      let new_licenses = this.complianceData.licenses_list.filter((res) => {
        return !res.id
      })

      let new_insurance = this.complianceData.insurance_list.filter((res) => {
        return !res.id
      })

      var compliance_data_to_save = {
        company_id: this.getCurrentCompanyData.id,
        id: this.complianceData.id,

        is_company_safety_policy: this.complianceData.is_company_safety_policy,
        company_safety_policy: this.complianceData.company_safety_policy,
        company_safety_policy_pdf: this.complianceData
          .company_safety_policy_pdf,

        is_company_quality_mgt_policy: this.complianceData
          .is_company_quality_mgt_policy,
        company_quality_mgt_policy: this.complianceData
          .company_quality_mgt_policy,
        company_quality_mgt_policy_pdf: this.complianceData
          .company_quality_mgt_policy_pdf,

        // is_safety_policy: this.complianceData.is_safety_policy,
        // safety_policy: this.complianceData.safety_policy,
        // safety_policy_pdf: this.complianceData.safety_policy_pdf,

        // is_quality_mgt_policy: this.complianceData.is_quality_mgt_policy,
        // quality_mgt_policy: this.complianceData.quality_mgt_policy,
        // quality_mgt_policy_pdf: this.complianceData.quality_mgt_policy_pdf,
        // year_first_accredited:
        //   this.complianceData.year_first_accredited == ''
        //     ? null
        //     : this.complianceData.year_first_accredited,

        add_document: {
          company_id: this.getCurrentCompanyData.id,
          documents: new_doc
        },

        del_document: {
          company_id: this.getCurrentCompanyData.id,
          documents_ids: this.deleted_document
        },

        add_license: {
          company_id: this.getCurrentCompanyData.id,
          license_list: new_licenses
        },

        del_license: {
          company_id: this.getCurrentCompanyData.id,
          licenses_ids: this.deleted_licenses
        },

        add_insurance: {
          company_id: this.getCurrentCompanyData.id,
          insurance_list: new_insurance
        },

        del_insurance: {
          company_id: this.getCurrentCompanyData.id,
          insurance_ids: this.deleted_insurance
        }
      }

      this.saveComplianceData(compliance_data_to_save).then(() => {
        this.setComplianceData(this.getComplianceData)
      })
    }
  },
  created() {
    this.fetchEstablishmentYear({ fromYear: 1860 })
    this.fetchCertificationList()
    this.fetchLicensesList()
    this.fetchInsurancePoliciesList()
    this.fetchComplianceData(this.getCurrentCompanyData.id).then(() => {
      this.setComplianceData(this.getComplianceData)
    })
  }
}
</script>

<style scoped></style>
