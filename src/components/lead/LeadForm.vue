<template>
  <div>
    <div class="form-conatiner cls-leaddetails">
      <div class="leadDetails">
        <form enctype="multipart/form-data" class="mt-3">
          <div>
            <!-- first separator (Lead details) -->
            <separator
              title="Enquiry Details"
              sub_title="Please enter the details"
            >
              <div slot="body">
                <div
                  v-if="
                    editLeadDetail.id != '' && editLeadDetail.id != undefined
                  "
                  class="form-group bold-Font-Weight"
                  style="display: flex; flex-direction: row-reverse"
                >
                  Status : {{ getStatusStringValue() }}
                </div>

                <!-- Category -->
                <div class="form-group m-b">
                  <label>Category<span class="text-danger">*</span></label>
                  <!-- <select
                    v-model="editLeadDetail.category"
                    class="form-control input-lg"
                    name="company_category"
                    ref="drpCategory"
                    v-on:change="setSubCategoryAsPerCategory()"
                    :class="{
                      'is-invalid':
                        submitted && $v.editLeadDetail.category.$invalid
                    }"
                  >
                    <option
                      v-for="item in this.categoryOptions"
                      :value="item.id"
                      :key="getKeyID('category', item.id)"
                    >
                      {{ item.name }}
                    </option>
                  </select> -->
                  <v-select
                    label="name"
                    v-model="editLeadDetail.category"
                    :options="categoryOptions"
                    placeholder=""
                    ref="drpCategory"
                    @input="setSubCategoryAsPerCategory()"
                    :reduce="(category) => category.id"
                    class="form-control show-dropdown-icon"
                    :class="{
                      'is-invalid':
                        submitted && $v.editLeadDetail.category.$invalid
                    }"
                  />
                  <div
                    v-if="submitted && !$v.editLeadDetail.category.required"
                    class="invalid-feedback"
                  >
                    Category is required.
                  </div>
                </div>

                <!-- Sub category -->
                <div class="form-group">
                  <!-- <pre class="language-json"><code>{{ multiSelectoptions  }}</code></pre> -->
                  <label>Sub category<span class="text-danger">*</span></label>
                  <v-select
                    label="name"
                    v-model="editLeadDetail.sub_category"
                    placeholder=""
                    ref="drpSubCategory"
                    :options="multiSelectoptions"
                    :reduce="(subcategory) => subcategory.id"
                    class="form-control show-dropdown-icon"
                    :class="{
                      'is-invalid':
                        submitted && $v.editLeadDetail.sub_category.$invalid
                    }"
                  />
                  <div
                    v-if="submitted && !$v.editLeadDetail.sub_category.required"
                    class="invalid-feedback"
                  >
                    Sub category is required.
                  </div>
                </div>

                <!-- Type of contract -->
                <div v-if="isTypeOfContractVisible()" class="form-group mb-2">
                  <label
                    >Type of contract<span class="text-danger">*</span></label
                  >
                  <div class="lead-radio-btn">
                    <input
                      type="radio"
                      id="type_of_contract"
                      name="type_of_contract"
                      :value="typeOfContractEnum.WITH_MATERIAL"
                      v-model="editLeadDetail.type_of_contract"
                    />

                    <label>
                      <span class="fontSize16 font-weight-600">
                        With Material
                      </span>
                      <span> (description)</span>
                    </label>
                    <br />
                    <input
                      type="radio"
                      id="type_of_contract"
                      name="type_of_contract"
                      :value="typeOfContractEnum.ONLY_LABOUR"
                      v-model="editLeadDetail.type_of_contract"
                    />
                    <label>
                      <span class="fontSize16 font-weight-600">
                        Only Labour
                      </span>
                      <span> (description)</span>
                    </label>
                    <br />
                    <input
                      type="radio"
                      id="type_of_contract"
                      name="type_of_contract"
                      :value="typeOfContractEnum.TURNKEY"
                      v-model="editLeadDetail.type_of_contract"
                    />
                    <label>
                      <span class="fontSize16 font-weight-600"> Turnkey </span>
                      <span> (description)</span>
                    </label>
                  </div>

                  <div
                    v-if="
                      submitted && !$v.editLeadDetail.type_of_contract.required
                    "
                    class="invalid-feedback"
                  >
                    Type of contract is required.
                  </div>
                </div>

                <!-- Project type -->
                <div class="form-group m-b">
                  <label>Project type<span class="text-danger">*</span></label>
                  <!-- <select
                    v-model="editLeadDetail.project_type"
                    class="form-control input-lg"
                    name="project_type"
                    :class="{
                      'is-invalid':
                        submitted && $v.editLeadDetail.project_type.$invalid
                    }"
                  >
                    <option
                      v-for="item in this.projectTypeOptions"
                      :value="item.id"
                      :key="getKeyID('projecttype', item.id)"
                    >
                      {{ item.value }}
                    </option>
                  </select> -->
                  <v-select
                    ref="drpProjectType"
                    label="display_string"
                    v-model="editLeadDetail.project_type"
                    :options="getSectorOptions"
                    placeholder=""
                    :reduce="(projectType) => projectType.id_int_value"
                    class="form-control show-dropdown-icon"
                    :class="{
                      'is-invalid':
                        submitted && $v.editLeadDetail.project_type.$invalid
                    }"
                  />
                  <div
                    v-if="submitted && !$v.editLeadDetail.project_type.required"
                    class="invalid-feedback"
                  >
                    Project type is required.
                  </div>
                </div>

                <!-- Approximate Area  -->
                <div class="form-group m-b">
                  <label
                    >Approximate Area<span class="text-danger">*</span>
                  </label>
                  <!-- <select
                    v-model="editLeadDetail.appx_area"
                    class="form-control input-lg"
                    name="app_area"
                    :class="{
                      'is-invalid':
                        submitted && $v.editLeadDetail.appx_area.$invalid
                    }"
                  >
                    <option
                      v-for="item in this.appxAreaOptions"
                      :value="item.id"
                      :key="getKeyID('app_area', item.id)"
                    >
                      {{ item.value }}
                    </option>
                  </select> -->
                  <v-select
                    label="value"
                    v-model="editLeadDetail.appx_area"
                    placeholder=""
                    :options="getApproximateAreaOptions"
                    :reduce="(app_area) => app_area.id"
                    class="form-control show-dropdown-icon"
                    :class="{
                      'is-invalid':
                        submitted && $v.editLeadDetail.appx_area.$invalid
                    }"
                  />
                  <div
                    v-if="submitted && !$v.editLeadDetail.appx_area.required"
                    class="invalid-feedback"
                  >
                    Approximate Area is required.
                  </div>
                </div>

                <!-- Contractor should have turn Over -->
                <div class="form-group m-b">
                  <label
                    >Contractor should have turn Over<span class="text-danger"
                      >*</span
                    >
                  </label>
                  <!-- <select
                    v-model="editLeadDetail.contractor_turnover"
                    class="form-control input-lg"
                    name="Contractor_should_have_turn_Over"
                    :class="{
                      'is-invalid':
                        submitted &&
                        $v.editLeadDetail.contractor_turnover.$invalid
                    }"
                  >
                    <option
                      v-for="item in this.contractorTurnoverOptions"
                      :value="item.id"
                      :key="getKeyID('turnOver', item.id)"
                    >
                      {{ item.name }}
                    </option>
                  </select> -->
                  <v-select
                    label="name"
                    v-model="editLeadDetail.contractor_turnover"
                    placeholder=""
                    :options="getTurnOverOptions"
                    :reduce="(turnOver) => turnOver.id"
                    class="form-control show-dropdown-icon"
                    :class="{
                      'is-invalid':
                        submitted &&
                        $v.editLeadDetail.contractor_turnover.$invalid
                    }"
                  />
                  <div
                    v-if="
                      submitted &&
                      !$v.editLeadDetail.contractor_turnover.required
                    "
                    class="invalid-feedback"
                  >
                    Contractor turnover is required.
                  </div>
                </div>

                <!-- Contractor should have done -->
                <!-- <div v-if="isShouldHaveDoneIsVisible()" class="form-group m-b">
                  <label
                    >Contractor should have done<span class="text-danger"
                      >*</span
                    ></label
                  >

                  <v-select
                    label="value"
                    v-model="editLeadDetail.contractor_should_have_done"
                    placeholder=""
                    :options="getDevelopmentTypeOptions"
                    :reduce="(should_have_done) => should_have_done.id"
                    class="form-control show-dropdown-icon"
                    :class="{
                      'is-invalid':
                        submitted &&
                        $v.editLeadDetail.contractor_should_have_done.$invalid
                    }"
                  />
                  <div
                    v-if="
                      submitted &&
                      !$v.editLeadDetail.contractor_should_have_done.required
                    "
                    class="invalid-feedback"
                  >
                    Contractor should have done is required.
                  </div>
                </div> -->

                <!--start work value-->
                <div class="form-group">
                  <label
                    >Expected Value of Work<span class="text-danger">*</span>
                    <span class="fontSize12 ml-1"
                      >(This will help to chanelise your request to the right
                      company)</span
                    ></label
                  >
                  <!-- <select
                    class="form-control input-lg"
                    v-model="editLeadDetail.min_work_value"
                    name="emp_strength"
                    :class="{
                      'is-invalid':
                        submitted && $v.editLeadDetail.min_work_value.$invalid
                    }"
                  >
                    <option
                      v-for="item in min_work_options"
                      :value="item.id"
                      :key="getKeyID('value_of_work', item.id)"
                    >
                      {{ item.name }}
                    </option>
                  </select> -->
                  <v-select
                    label="name"
                    v-model="editLeadDetail.min_work_value"
                    placeholder=""
                    :options="getMinWorkOptions"
                    :reduce="(min_work) => min_work.id"
                    class="form-control show-dropdown-icon"
                    :class="{
                      'is-invalid':
                        submitted && $v.editLeadDetail.min_work_value.$invalid
                    }"
                  />
                  <div
                    v-if="
                      submitted && !$v.editLeadDetail.min_work_value.required
                    "
                    class="invalid-feedback"
                  >
                    Value of Works is required.
                  </div>
                </div>
                <!--End work value-->

                <div class="form-group mb-3">
                  <label>Place your requirement</label>
                  <b-form-textarea
                    name="lead-requirment"
                    v-model="editLeadDetail.requirement"
                    cols="40"
                    rows="7"
                    max-rows="15"
                    maxlength="1000"
                    no-resize
                    class="form-control"
                  ></b-form-textarea>
                  <label class="mb-0 text-right float-right">
                    <!-- (Min 100 characters) -->
                    {{ editLeadDetail.requirement.length }}/{{
                      leadRequirementTotalLength
                    }}</label
                  >
                  <!-- <div
                    v-if="submitted && !$v.editLeadDetail.requirement.required"
                    class="invalid-feedback"
                  >
                    Requirement is required
                  </div>
                  <div
                    v-if="submitted && !$v.editLeadDetail.requirement.minLength"
                    class="invalid-feedback"
                  >
                    Minimum 100 characters required
                  </div> -->
                </div>

                <!-- start urgent
                <div class="form-group ml-2 mt-3">
                  <label class="checkbox-container fontSize12"
                    ><span class="font-weight-600">Urgent</span>
                    <span class="fontSize12">
                      (Please tick only if urgent)</span
                    >
                    <input type="checkbox" v-model="editLeadDetail.urgent" />
                    <span class="mark"></span>
                  </label>
                </div>
                End urgent -->
              </div>
            </separator>

            <!-- 2nd separator (Location)  -->
            <separator
              class="mt-3"
              title="Location"
              sub_title="Please select work location"
              height=" 300px"
            >
              <div slot="body">
                <div class="form-group mt-1">
                  <div class="row">
                    <div class="col-lg-3">
                      <label>Country<span class="text-danger">*</span></label>
                      <v-select
                        v-model="editLeadDetail.country"
                        label="name"
                        :options="filteredCountry[0].data"
                        @search="fetchCountryValues"
                        @input="onCountrySelected($event)"
                        class="form-control show-dropdown-icon"
                        :disabled="is_country_disabled"
                        :class="{
                          'is-invalid':
                            submitted && !$v.editLeadDetail.country.required
                        }"
                      ></v-select>

                      <div
                        v-if="submitted && !$v.editLeadDetail.country.required"
                        class="invalid-feedback"
                      >
                        Country is required
                      </div>
                    </div>
                    <div class="col-lg-3">
                      <label>State<span class="text-danger">*</span></label>
                      <v-select
                        v-model="editLeadDetail.state"
                        label="state"
                        :options="filteredState[0].data"
                        @search="fetchStateValues($event)"
                        @input="onStateSelected($event)"
                        class="form-control show-dropdown-icon"
                        :class="{
                          'is-invalid':
                            submitted && !$v.editLeadDetail.state.required
                        }"
                      >
                      </v-select>

                      <div
                        v-if="submitted && !$v.editLeadDetail.state.required"
                        class="invalid-feedback"
                      >
                        State is required
                      </div>
                    </div>
                    <div class="col-lg-3">
                      <label>City<span class="text-danger">*</span></label>
                      <v-select
                        v-model="editLeadDetail.city"
                        label="city"
                        :options="filteredCities[0].data"
                        @search="fetchCitiesValues($event)"
                        @input="onCitySelected($event)"
                        class="form-control show-dropdown-icon"
                        :class="{
                          'is-invalid':
                            submitted && !$v.editLeadDetail.city.required
                        }"
                      ></v-select>
                      <div
                        v-if="submitted && !$v.editLeadDetail.city.required"
                        class="invalid-feedback"
                      >
                        City is required
                      </div>
                    </div>
                    <div class="col-lg-3">
                      <label>Pincode<span class="text-danger">*</span></label>
                      <input
                        type="text"
                        class="form-control input-lg"
                        v-model="editLeadDetail.pin"
                        placeholder="Enter pincode"
                        :class="{
                          'is-invalid':
                            submitted && $v.editLeadDetail.pin.$invalid
                        }"
                      />
                      <div
                        v-if="submitted && !$v.editLeadDetail.pin.required"
                        class="invalid-feedback"
                      >
                        Pincode is required
                      </div>
                      <div
                        v-if="submitted && !$v.editLeadDetail.pin.numeric"
                        class="invalid-feedback"
                      >
                        Pincode is not valid
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    >Locality/Address<span class="text-danger">*</span></label
                  >
                  <b-form-textarea
                    name="lead-address"
                    v-model="editLeadDetail.address"
                    cols="1"
                    rows="1"
                    max-rows="5"
                    maxlength="1000"
                    no-resize
                    class="form-control"
                    :class="{
                      'is-invalid':
                        submitted && $v.editLeadDetail.address.$invalid
                    }"
                  ></b-form-textarea>
                  <div
                    v-if="submitted && !$v.editLeadDetail.address.required"
                    class="invalid-feedback"
                  >
                    Locality/Address is required
                  </div>
                </div>
                <!-- <div class="form-group ml-2 mt-3">
                  <label class="checkbox-container fontSize12">
                    <span class="fontSize12">
                      Check if you want the applicant only from above city
                    </span>
                    <input
                      type="checkbox"
                      v-model="editLeadDetail.mandatory_location"
                    />
                    <span class="mark"></span>
                  </label>
                </div> -->
              </div>
            </separator>

            <!-- 3rd seperatior (contact info) -->
            <!-- v-if="isAdminPostingLead()" -->
            <separator
              v-if="isContactSeperatorVisible"
              class="mt-3"
              title="Contact Info"
              sub_title="Please add contact person info"
            >
              <div slot="body">
                <div class="row form-group">
                  <div v-if="isContactUserNameVisible" class="col-md-6">
                    <div class="mt-2">
                      <label>Name<span class="text-danger">*</span></label>
                      <input
                        type="text"
                        class="form-control input-lg"
                        v-model="editLeadDetail.contact_name"
                        :class="{
                          'is-invalid':
                            submitted && $v.editLeadDetail.contact_name.$invalid
                        }"
                      />
                      <div
                        v-if="
                          submitted && !$v.editLeadDetail.contact_name.required
                        "
                        class="invalid-feedback"
                      >
                        Contact name is required
                      </div>
                    </div>
                  </div>
                  <div v-if="isContactCompanyNameVisible" class="col-md-6">
                    <div class="mt-2">
                      <label>Company Name</label>
                      <input
                        type="text"
                        class="form-control input-lg"
                        v-model="editLeadDetail.company_name"
                        :class="{
                          'is-invalid':
                            submitted && $v.editLeadDetail.company_name.$invalid
                        }"
                      />
                      <div
                        v-if="
                          submitted && !$v.editLeadDetail.company_name.required
                        "
                        class="invalid-feedback"
                      >
                        Company name is required
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div v-if="isContactEmailVisible" class="col-md-6">
                    <div class="form-group">
                      <label>Email<span class="text-danger">*</span></label>
                      <div class="d-flex justify-content-between">
                        <div class="" style="flex-grow: 1; padding-right: 15px">
                          <input
                            type="text"
                            class="form-control input-lg"
                            v-model="editLeadDetail.email_to_display"
                            :class="{
                              'is-invalid':
                                (submitted || emailOTPVerification) &&
                                $v.editLeadDetail.email_to_display.$invalid
                            }"
                          />
                          <div
                            v-if="
                              (submitted || emailOTPVerification) &&
                              !$v.editLeadDetail.email_to_display.required
                            "
                            class="invalid-feedback"
                          >
                            Email is required
                          </div>
                          <div
                            v-if="
                              (submitted || emailOTPVerification) &&
                              !$v.editLeadDetail.email_to_display.email
                            "
                            class="invalid-feedback"
                          >
                            Invalid email address
                          </div>
                        </div>
                        <div>
                          <button
                            v-if="!isAdminPostingLead()"
                            class="btn"
                            style="height: 40px; width: 140px"
                            @click="sendEmailOTP($event)"
                          >
                            Verify Email
                          </button>
                        </div>
                      </div>
                      <div
                        v-if="!isAdminPostingLead()"
                        class="fontSize12 text-gray font-weight-700"
                      >
                        *This email id will be updated in your account
                      </div>
                    </div>
                  </div>
                  <div v-if="isContactPhoneVisible" class="col-md-6">
                    <div class="form-group">
                      <label
                        >Mobile no.<span class="text-danger">*</span></label
                      >
                      <div class="d-flex">
                        <div
                          style="max-width: 80px; margin-right: 15px"
                          class=""
                        >
                          <input
                            type="text"
                            class="form-control input-lg"
                            disabled="disabled"
                            v-model="editLeadDetail.country_code"
                          />
                        </div>
                        <div style="flex-basis: 0px; flex-grow: 1" class="">
                          <input
                            type="text"
                            class="form-control input-lg"
                            v-model="editLeadDetail.phone_to_display"
                            :class="{
                              'is-invalid':
                                (submitted || phoneOPTVerification) &&
                                $v.editLeadDetail.phone_to_display.$invalid
                            }"
                          />
                          <div
                            v-if="
                              (submitted || phoneOPTVerification) &&
                              !$v.editLeadDetail.phone_to_display.required
                            "
                            class="invalid-feedback"
                          >
                            Mobile number is required
                          </div>
                          <div
                            v-if="
                              (submitted || phoneOPTVerification) &&
                              !$v.editLeadDetail.phone_to_display.numeric
                            "
                            class="invalid-feedback"
                          >
                            Mobile number is invalid
                          </div>
                        </div>

                        <div
                          style="flex-grow: 0; margin-left: 15px"
                          v-if="!isAdminPostingLead()"
                        >
                          <button
                            class="btn"
                            style="height: 40px; width: 140px"
                            @click="sendPhoneOTP($event)"
                          >
                            Verify mobile no.
                          </button>
                        </div>
                      </div>
                      <div
                        v-if="!isAdminPostingLead()"
                        class="fontSize12 text-gray font-weight-700"
                      >
                        *This mobile no. will be updated in your account
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </separator>

            <!--Star allocate companies -->
            <!-- <div
              class="form-group"
              v-if="editLeadDetail.id != '' && editLeadDetail.id != undefined"
            >
              <div>
                <label class="app-primary-text-color bold-Font-Weight"
                  >Allocate companies</label
                >
              </div>
              <div style="display: flex">
                <input
                  type="text"
                  class="form-control input-lg allocate-search"
                  width="100px"
                  v-model="search_compnay_by"
                  @input="fetchAllCompaniesToAllocate"
                />
                <i
                  class="fa fa-search fa-lg cursor-pointer m-auto"
                  @click="searchAllCompanies"
                ></i>
              </div>
              <div>
                <div
                  :class="{
                    'is-invalid':
                      submitted && $v.editLeadDetail.companies.$invalid
                  }"
                ></div>
                <div
                  v-if="submitted && !$v.editLeadDetail.companies.required"
                  class="invalid-feedback"
                >
                  Allocate companies to lead
                </div>
              </div>

              <div style="display: flex; flex-direction: row; flex-wrap: wrap">
                <div
                  class="mr-2 mt-2 allocated-comp"
                  v-for="(allocatedComp, counter) in getAllocatedCompanyDetails"
                  :key="counter"
                >
                  <label class="m-1">{{ allocatedComp.name }}</label>
                  <i
                    @click="doNotAllocateCompany(allocatedComp)"
                    class="fa fa-times-circle fa-lg mt-auto mb-auto mr-1"
                    aria-hidden="true"
                  ></i>
                </div>
              </div>


              <div class="row">
                <div
                  class="col-lg-4 col-md-4 mb-3"
                  v-for="(companyData, counter) in getCompaniesToAllocate"
                  :key="counter"
                >
                  <CompanyCard
                    :company="companyData._source"
                    @companySelected="allocateCompany(companyData._source)"
                    :key="counter"
                  ></CompanyCard>
                </div>
              </div>
            </div>-->

            <!--End allocate companies -->

            <!-- 3rd seperatior (contact info) -->
            <!-- v-if="isAdminPostingLead()" -->
            <separator
              v-if="isRejectionSeparatorVisible()"
              class="mt-3"
              title="Rejection comment"
              :sub_title="getRejectionSubTitle()"
            >
              <div slot="body">{{ editLeadDetail.rejection_comment }}</div>
            </separator>
            <!--Start Button -->
            <div class="form-group mt-3 mb-3">
              <div align="right">
                <div class="ml-auto mr-0 d-flex justify-content-end">
                  <button
                    type="button"
                    class="btn ml-2"
                    @click="btnSaveUpdateClick($event)"
                  >
                    {{ getSaveButtonText() }}
                  </button>
                  <button
                    v-if="isApproveButtonVisible()"
                    class="btn ml-2"
                    @click="btnApproveClick($event)"
                  >
                    Approve
                  </button>
                  <button
                    v-if="isRejectButtonVisible()"
                    type="button"
                    class="btn ml-2"
                    @click="btnRejectClick($event)"
                  >
                    Reject
                  </button>
                  <button
                    v-if="isDeleteButtonVisible()"
                    class="btn ml-2"
                    @click="showDeleteConfirmationModal($event)"
                  >
                    Delete
                  </button>

                  <button
                    type="button"
                    class="btn ml-2"
                    @click="btnCancelClick"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
            <!-- End bitton -->
          </div>
        </form>
        <div>
          <!-- <b-modal
            hide-footer
            hide-header
            :visible="emailStartTimer"
            :centered="true"
            id="emailVerificationModel"
          >
            <div class="">
              <div align="right">
                <button></button>
              </div>
              <verifyOTP
                v-if="emailStartTimer"
                :error="emailOtpError"
                @verify_OTP_button_click="OTPEmailverify($event)"
                @otpTimer_resendOTP="resentEmailOTP()"
                :startTimer="emailStartTimer"
                :showInfoText="showInfoText"
                id="emailVerificationComp"
              />
            </div>
          </b-modal> -->
          <modal v-if="showEmailOTPVerificationModal">
            <div slot="body">
              <div class="p-3">
                <div align="right">
                  <img
                    src="../../assets/img/Close.svg"
                    title="close image"
                    @click="closeEmailVerificationModel"
                  />
                </div>
                <verifyOTP
                  :error="emailOtpError"
                  @verify_OTP_button_click="OTPEmailverify($event)"
                  @otpTimer_resendOTP="sendEmailOTP($event)"
                  :startTimer="emailStartTimer"
                  :showInfoText="showInfoText"
                  id="emailVerificationComp"
                />
              </div>
            </div>
            <div slot="footer"></div>
          </modal>
        </div>
      </div>

      <modal v-if="showPhoneOTPVerificationModal">
        <div slot="body">
          <div class="row">
            <div class="col-10">
              <verifyOTP
                :error="phoneOtpError"
                @verify_OTP_button_click="OTPPhoneverify($event)"
                @otpTimer_resendOTP="sendPhoneOTP($event)"
                :startTimer="phoneStartTimer"
                :showInfoText="showInfoText"
                id="phoneVerificationComp"
              />
            </div>
            <div class="col-2">
              <div align="right">
                <img
                  src="../../assets/img/Close.svg"
                  title="close image"
                  @click="closePhoneVerificationModel"
                />
              </div>
            </div>
          </div>
        </div>
        <div slot="footer"></div>
      </modal>

      <modal
        v-if="showLeadModal"
        @closeModal="updateShowLeadModal([false, ''])"
      >
        <div slot="body">{{ this.LeadModalMessage }}</div>
      </modal>

      <modal
        v-if="showSubCategoryModal"
        @closeModal="hideSubcategoryInfoModal"
        id="setSubCategory"
      >
        <div slot="body">You need to reselect subcategory.</div>
      </modal>

      <modal
        v-if="showMandatoryFieldModal"
        @closeModal="hideMandatoryModal()"
        id="mandatoryInfomModel"
      >
        <div slot="body">Please Fill all mandatory fields</div>
      </modal>

      <modal
        v-if="showInfoModel"
        @closeModal=";(showInfoModel = false), (showInfoModelMessage = '')"
        id="infoInfomModel"
      >
        <div slot="body">{{ this.showInfoModelMessage }}</div>
      </modal>

      <modal
        v-if="showCategorySubCategoryReqModal"
        @closeModal="hideCategorySubCategoryReqModal()"
        id="CategorySubCategoryReqModal"
      >
        <div slot="body">{{ categorySubCategoryReqModalMessage }}</div>
      </modal>

      <modal v-if="isShowCancelModal" @closeModal="hideCancelModal">
        <div slot="body">Leave the page without saving?</div>
        <div slot="footer">
          <div class="d-flex">
            <b-button
              class="btn"
              variant="outline-dark"
              @click="hideCancelModal"
            >
              Cancel
            </b-button>
            <b-button
              class="ml-2 btn"
              variant="outline-dark"
              @click="goToLeadsListPage"
            >
              OK
            </b-button>
          </div>
        </div>
      </modal>

      <modal v-if="showDeleteModal" @closeModal="hideDeleteConfirmationModal">
        <div slot="body">Do you really want to delete this lead?</div>
        <div slot="footer">
          <div class="d-flex">
            <b-button
              class="btn"
              variant="outline-dark"
              @click="hideDeleteConfirmationModal"
            >
              Cancel
            </b-button>
            <b-button
              class="ml-2 btn"
              variant="outline-dark"
              @click="leadDelete"
            >
              Yes
            </b-button>
          </div>
        </div>
      </modal>

      <modal
        v-if="showLeadRejectCommentPopup"
        @closeModal="hideLeadRejectCommentPopup($event)"
      >
        <div slot="body">
          <div class="fontSize14" align="left">Reject Comment :</div>
          <div>
            <b-form-textarea
              name="lead-reject-comment"
              v-model="rejectComment"
              cols="40"
              rows="5"
              max-rows="5"
              maxlength="1000"
              no-resize
              class="form-control"
              :class="{
                'is-invalid': isRejectCommentRequired
              }"
            ></b-form-textarea>
            <div
              v-if="isRejectCommentRequired"
              class="invalid-feedback fontSize12"
              align="left"
            >
              Reject comment is required
            </div>
          </div>
        </div>
        <div slot="footer">
          <div align="right" class="d-flex">
            <b-button
              class="btn"
              variant="outline-dark"
              @click="hideLeadRejectCommentPopup($event)"
            >
              Cancel
            </b-button>
            <b-button
              class="ml-2 btn"
              variant="outline-dark"
              @click="rejectLeadWithComment($event)"
            >
              Reject
            </b-button>
          </div>
        </div>
      </modal>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import {
  required,
  email,
  numeric,
  // eslint-disable-next-line no-unused-vars
  minLength,
  requiredIf
} from 'vuelidate/lib/validators'
import modal from '../../common/Modal'
import appConstants from '../../appConstants.js'
import CompanyCard from '../../components/company/common/CompanyCard'
import Separator from '../../common/separator.vue'
import verifyOTP from '../common/verifyOTP.vue'

export default {
  name: 'LeadForm',
  components: {
    modal,
    // eslint-disable-next-line vue/no-unused-components
    CompanyCard,
    Separator,
    verifyOTP
  },
  data() {
    return {
      editLeadDetail: {
        id: '',
        user_id: '',
        category: '',
        sub_category: [],
        requirement: '',
        country: '',
        country_iso: '',
        state: '',
        state_iso: '',
        city: '',
        pin: '',
        lng: '',
        lat: '',
        address: '',

        min_work_value: '',
        contact_name: '',
        company_name: '',
        country_code: '+91',
        email: '',
        phone: '',

        country_code_to_display: '+91',
        email_to_display: '',
        phone_to_display: '',

        urgent: false,
        status: appConstants.leadStatus.OPEN,
        companies: [],

        type_of_contract: appConstants.lead_type_of_contract.WITH_MATERIAL,
        project_type: '',
        appx_area: '',
        contractor_turnover: '',
        contractor_should_have_done: '',
        mandatory_location: false,
        rejection_comment: ''
      },

      is_add_lead: true,
      submitted: false,
      showSubCategoryModal: false,
      categoryOptions: [],
      multiSelectoptions: [],
      leadRequirementTotalLength: 1000,
      leadDetailsSavedCopy: '',
      isShowCancelModal: false,
      leadStatus: appConstants.leadStatus,

      search_compnay_by: '',
      saveButtonText: '',
      is_country_disabled: true,
      showMandatoryFieldModal: false,

      typeOfContractEnum: appConstants.lead_type_of_contract,
      min_work_options: [],
      projectTypeOptions: [],
      appxAreaOptions: [],
      contractorTurnoverOptions: [],
      contractorShouldDoneOptions: [],

      showCategorySubCategoryReqModal: false,
      categorySubCategoryReqModalMessage: '',

      //Contact details visibility
      isContactSeperatorVisible: false,
      isContactEmailVisible: false,
      isContactPhoneVisible: false,
      isContactCompanyNameVisible: false,
      isContactUserNameVisible: false,

      // email verification
      emailOtpError: '',
      emailStartTimer: true,
      showInfoText: false,
      showEmailOTPVerificationModal: false,

      //Phone verification
      phoneOtpError: '',
      phoneStartTimer: true,
      showPhoneOTPVerificationModal: false,

      showInfoModel: false,
      showInfoModelMessage: '',

      showDeleteModal: false,
      deleteLeadID: '',

      showLeadRejectCommentPopup: false,
      rejectComment: '',
      isRejectCommentRequired: false,

      phoneOPTVerification: false,
      emailOTPVerification: false
    }
  },
  validations() {
    return {
      editLeadDetail: {
        category: { required },
        sub_category: { required },
        // requirement: {
        //   required,
        //   minLength: minLength(100)
        // },
        country: { required },
        state: { required },
        city: { required },
        pin: { required, numeric },
        address: { required },
        min_work_value: { required },

        type_of_contract: {
          required: requiredIf(function () {
            if (
              this.editLeadDetail.category == appConstants.category.CONTRACTOR
            ) {
              return true
            } else {
              return false
            }
          })
        },
        project_type: { required },
        appx_area: { required },
        contractor_turnover: { required },
        // contractor_should_have_done: {
        //   required: requiredIf(function () {
        //     if (
        //       this.editLeadDetail.category == appConstants.category.CONTRACTOR
        //     ) {
        //       return true
        //     } else {
        //       return false
        //     }
        //   })
        // },
        contact_name: {
          required: requiredIf(function () {
            if (this.userData.is_admin) {
              return true
            } else {
              return false
            }
          })
        },
        company_name: {
          required: requiredIf(function () {
            if (this.userData.is_admin) {
              return true
            } else {
              return false
            }
          })
        },
        // companies: {
        //   required: requiredIf(function () {
        //     if (
        //       this.editLeadDetail.id == '' ||
        //       this.editLeadDetail.id == undefined
        //     ) {
        //       return false
        //     } else {
        //       return true
        //     }
        //   })
        // },
        email_to_display: {
          // required: requiredIf(function () {
          //   if (this.userData.is_admin) {
          //     return true
          //   } else {
          //     return false
          //   }
          // }),
          required,
          email
        },
        phone_to_display: {
          // required: requiredIf(function () {
          //   if (this.userData.is_admin) {
          //     return true
          //   } else {
          //     return false
          //   }
          // }),
          required,
          numeric
        }
      }
    }
  },

  computed: {
    ...mapGetters([
      'filteredCountry',
      'filteredState',
      'filteredCities',
      'getSubCategories',
      'getCategory',
      'userData',
      'allCompanies'
    ]),
    ...mapGetters('lead', [
      'getLeadDetails',
      'showLeadModal',
      'LeadModalMessage',
      'getStatusOfEditingLead',
      'getCompaniesToAllocate',
      'getAllocatedCompanyDetails',
      'getIdOfnewlyCreatedLead'
    ]),
    ...mapGetters('dropdownValues', [
      'getMinWorkOptions',
      'getTurnOverOptions',
      'getProjectTypeOptions',
      'getContractTypeOptions',
      'getApproximateAreaOptions',
      'getDevelopmentTypeOptions',
      'getSectorOptions'
    ])
  },
  watch: {
    getStatusOfEditingLead: function (val) {
      this.editLeadDetail.status = val
    },
    getIdOfnewlyCreatedLead: function (val) {
      this.editLeadDetail.id = val
    }
  },

  methods: {
    ...mapMutations(['setStateEmpty', 'setCityEmpty']),
    ...mapMutations('lead', [
      'updateShowLeadModal',
      'setCompaniesToAllocate',
      'addCompanyToAllocatedCompanyList',
      'removeFromAllocatedCompanyList'
    ]),
    ...mapActions([
      'fetchSubCategories',
      'fetchCategories',
      'searchContry',
      'searchState',
      'searchCity',
      'fetchCompanies'
    ]),
    ...mapActions('lead', [
      'updateLeadDetails',
      'rejectLead',
      'fetchAllocatedCompanyDetails',
      'fetchCompaniesToAllocate',
      'updateAndApproveLead',
      'createLead',
      'fetchLeadsDetails',
      'fetchLeadsDetailsFromEncryptedID',
      'deleteLead'
    ]),
    ...mapActions('user', ['fetchOneOlousUserData']),
    ...mapActions('otp', ['action_requestForOTP', 'action_checkIsOTPCorrect']),
    ...mapActions('dropdownValues', [
      'fetchMinWork',
      'fetchTurnover',
      'fetchProjectType',
      'fetchContractType',
      'fetchApproximateArea',
      'fetchDevelopmentType',
      'fetchSectorData'
    ]),
    async fetchCategoryOptions() {
      await this.fetchCategories()
      this.categoryOptions = this.getCategory
        .map((res) => res._source)
        .filter((res) => {
          if (res.name != '') {
            return res
          }
        })
    },

    async setSubCategoryAsPerCategory() {
      var subcategory_selected = false
      if (
        this.editLeadDetail.category != undefined &&
        this.editLeadDetail.category != null &&
        this.editLeadDetail.category != ''
      ) {
        await this.fetchSubCategories(this.editLeadDetail.category)
        if (this.editLeadDetail.sub_category.length > 0) {
          subcategory_selected = true
        }

        this.editLeadDetail.sub_category = []
        this.multiSelectoptions = this.getSubCategories
          .map((res) => res._source)
          .filter((res) => {
            if (res.name != '') {
              return res
            }
          })

        console.log('sub category value')
        console.log(this.multiSelectoptions)
        if (subcategory_selected) {
          this.showSubcategoryInfoModal()
        }
      } else {
        this.editLeadDetail.sub_category = []
        this.multiSelectoptions = []
      }
    },
    showSubcategoryInfoModal() {
      this.showSubCategoryModal = true
    },
    hideSubcategoryInfoModal() {
      this.showSubCategoryModal = false
    },
    fetchCountryValues(text) {
      if (text === undefined) {
        return
      }
      this.searchContry(text)
    },
    onCountrySelected(item, index) {
      this.setCountryValue(item, index)
    },
    setCountryValue(item) {
      if (item == null) {
        this.editLeadDetail.country = ''
        this.editLeadDetail.country_iso = ''
        this.editLeadDetail.country_code = ''
      } else {
        this.editLeadDetail.country = item.name
        this.editLeadDetail.country_iso = item.iso2
        this.editLeadDetail.country_code = item.phone_code
      }
      this.editLeadDetail.state = ''
      this.editLeadDetail.state_iso = ''

      this.editLeadDetail.city = ''
      this.editLeadDetail.lng = ''
      this.editLeadDetail.lat = ''
      this.setStateEmpty()
      this.setCityEmpty()
    },
    fetchStateValues(text) {
      if (text === undefined || text == '') {
        return
      }
      let data = {
        country: this.editLeadDetail.country_iso,
        state: text
      }
      this.searchState(data)
    },
    onStateSelected(item, index) {
      this.setStateValues(item, index)
    },
    setStateValues(item) {
      if (item != null) {
        this.editLeadDetail.state = item.state
        this.editLeadDetail.state_iso = item.state_iso
      } else {
        this.editLeadDetail.state = ''
        this.editLeadDetail.state_iso = ''
      }
      this.editLeadDetail.city = ''
      this.editLeadDetail.lng = ''
      this.editLeadDetail.lat = ''

      this.setCityEmpty()
    },
    fetchCitiesValues(text) {
      if (text === undefined || text == '') {
        return
      }
      let data = {
        country: this.editLeadDetail.country_iso,
        state: this.editLeadDetail.state_iso,
        city: text
      }
      this.searchCity(data)
    },
    onCitySelected(item, index) {
      this.setCityValue(item, index)
    },
    setCityValue(item) {
      if (item != null) {
        this.editLeadDetail.city = item.city
      } else {
        this.editLeadDetail.city = ''
      }
      this.editLeadDetail.lng = ''
      this.editLeadDetail.lat = ''
    },
    getJsonDataTOSaveLead() {
      let category_str = this.getCategorySelectedTextValue()
      let subCategory_str = this.getSubCategorySelectedTextValue()
      let ProjectType = this.getProjectTypeTextValue()

      let title = `Required ${subCategory_str} ${category_str}`
      var leadData = {
        id: this.editLeadDetail.id,
        title: title,
        category_name: category_str,
        sub_categorie_name: subCategory_str,
        project_type_name: ProjectType,
        requirement: this.editLeadDetail.requirement,
        category: this.editLeadDetail.category,
        expected_min_val: this.editLeadDetail.min_work_value,
        urgent: this.editLeadDetail.urgent,
        address: this.editLeadDetail.address,
        country: this.editLeadDetail.country,
        state: this.editLeadDetail.state,
        city: this.editLeadDetail.city,
        pin: this.editLeadDetail.pin,

        email: this.editLeadDetail.email,
        phone: this.editLeadDetail.phone,
        country_code: this.editLeadDetail.country_code,
        contact_name: this.editLeadDetail.contact_name,
        company_name: this.editLeadDetail.company_name,

        country_iso:
          this.editLeadDetail.country_iso == undefined
            ? ''
            : this.editLeadDetail.country_iso,
        state_iso:
          this.editLeadDetail.state_iso == undefined
            ? ''
            : this.editLeadDetail.state_iso,
        sub_categories: [this.editLeadDetail.sub_category],
        companies: this.editLeadDetail.companies,

        project_type: this.editLeadDetail.project_type,
        appx_area: this.editLeadDetail.appx_area,
        contractor_turnover: this.editLeadDetail.contractor_turnover,
        mandatory_location: this.editLeadDetail.mandatory_location
      }

      // if category is contractor then only send below 2 keys in payload
      if (this.editLeadDetail.category == appConstants.category.CONTRACTOR) {
        leadData['type_of_contract'] = this.editLeadDetail.type_of_contract
        // leadData[
        //   'contractor_should_have_done'
        // ] = this.editLeadDetail.contractor_should_have_done
      }

      return leadData
    },
    getCategorySelectedTextValue() {
      var category_dropdown = this.$refs['drpCategory']
      var selected_category_text = ''
      if (category_dropdown.selectedValue.length > 0) {
        try {
          selected_category_text = category_dropdown.selectedValue[0].name
        } catch (error) {
          selected_category_text = ''
        }
      }
      return selected_category_text
    },
    getSubCategorySelectedTextValue() {
      var subcategory_dropdown = this.$refs['drpSubCategory']
      var selected_subcategory_text = ''
      if (subcategory_dropdown.selectedValue.length > 0) {
        try {
          selected_subcategory_text = subcategory_dropdown.selectedValue[0].name
        } catch (error) {
          selected_subcategory_text = ''
        }
      }

      return selected_subcategory_text
    },
    getProjectTypeTextValue() {
      var project_type_dropdown = this.$refs['drpProjectType']
      var selected_project_type_text = ''
      if (project_type_dropdown.selectedValue.length > 0) {
        try {
          selected_project_type_text =
            project_type_dropdown.selectedValue[0].display_string
        } catch (error) {
          selected_project_type_text = ''
        }
      }
      return selected_project_type_text
    },

    checkISCategorySubCategorySelected() {
      var category_str = this.getCategorySelectedTextValue()

      if (category_str == '' || category_str == undefined) {
        this.categorySubCategoryReqModalMessage = 'Please select category'
        this.showCategorySubCategoryReqModal = true
        return false
      }

      var subCategory_str = this.getSubCategorySelectedTextValue()

      if (subCategory_str == '' || subCategory_str == undefined) {
        this.categorySubCategoryReqModalMessage = 'Please select sub-category'
        this.showCategorySubCategoryReqModal = true
        return false
      }

      var project_type_str = this.getProjectTypeTextValue()

      if (project_type_str == '' || project_type_str == undefined) {
        this.categorySubCategoryReqModalMessage = 'Please select project type'
        this.showCategorySubCategoryReqModal = true
        return false
      }

      return true
    },

    checkIsEmailAndPhoneVerified() {
      if (!this.isAdminPostingLead()) {
        if (this.editLeadDetail.email != this.editLeadDetail.email_to_display) {
          this.showInfoMessage('Please verify email')
          return false
        }

        if (this.editLeadDetail.phone != this.editLeadDetail.phone_to_display) {
          this.showInfoMessage('Please verify phone number')
          return false
        }

        return true
      } else {
        this.editLeadDetail.email = this.editLeadDetail.email_to_display
        this.editLeadDetail.phone = this.editLeadDetail.phone_to_display
        return true
      }
    },

    btnSaveUpdateClick(e) {
      this.submitted = true
      if (this.$v.editLeadDetail.$invalid) {
        console.log('Required data')
        this.showMandatoryFieldModal = true
        e.preventDefault()
        return false
      }

      let is_contact_verified = this.checkIsEmailAndPhoneVerified()
      if (!is_contact_verified) {
        e.preventDefault()
        return false
      }

      let is_selected = this.checkISCategorySubCategorySelected()
      if (!is_selected) {
        e.preventDefault()
        return false
      }

      this.addOrUpdateLead()
    },
    addOrUpdateLead() {
      var data = this.getJsonDataTOSaveLead()
      if (this.editLeadDetail.id == '' || this.editLeadDetail.id == undefined) {
        this.createLead(data).then(() => {
          this.leadDetailsSavedCopy = JSON.parse(
            JSON.stringify(this.editLeadDetail)
          )

          this.submitted = false
          this.goToLeadsListPage()
        })
      } else {
        this.updateLeadDetails(data).then(() => {
          this.leadDetailsSavedCopy = JSON.parse(
            JSON.stringify(this.editLeadDetail)
          )

          this.goToLeadsListPage()
        })
      }
    },
    // changeLeadStatus(status) {
    //   this.submitted = true
    //   if (this.$v.editLeadDetail.$invalid) {
    //     console.log('Required data')
    //     return false
    //   }

    //   var data = {
    //     id: this.editLeadDetail.id,
    //     statusTobeUpdate: status
    //   }

    //   this.rejectLead(data).then(() => {
    //     this.leadDetailsSavedCopy = JSON.parse(
    //       JSON.stringify(this.editLeadDetail)
    //     )
    //   })
    // },
    btnApproveClick(e) {
      this.submitted = true
      if (this.$v.editLeadDetail.$invalid) {
        console.log('Required data')
        this.showMandatoryFieldModal = true
        e.preventDefault()
        return false
      }

      let is_contact_verified = this.checkIsEmailAndPhoneVerified()
      if (!is_contact_verified) {
        e.preventDefault()
        return false
      }

      let is_selected = this.checkISCategorySubCategorySelected()
      if (!is_selected) {
        e.preventDefault()
        return false
      }

      var data = this.getJsonDataTOSaveLead()
      this.updateAndApproveLead(data).then(() => {
        this.leadDetailsSavedCopy = JSON.parse(
          JSON.stringify(this.editLeadDetail)
        )
        this.goToLeadsListPage()
      })

      e.preventDefault()
    },
    btnRejectClick(e) {
      this.showLeadRejectCommentPopup = true
      this.rejectComment = ''

      e.preventDefault()
    },
    hideLeadRejectCommentPopup(e) {
      this.showLeadRejectCommentPopup = false
      this.rejectComment = ''
      this.isRejectCommentRequired = false
      e.preventDefault()
    },

    rejectLeadWithComment(e) {
      e.preventDefault()
      if (this.rejectComment.trim() == '') {
        this.isRejectCommentRequired = true
        return false
      }

      this.isRejectCommentRequired = false

      this.showLeadRejectCommentPopup = false

      var data = {
        id: this.editLeadDetail.id,
        statusTobeUpdate: appConstants.leadStatus.REJECTED,
        rejection_comment: this.rejectComment
      }

      this.rejectLead(data).then(() => {
        this.leadDetailsSavedCopy = JSON.parse(
          JSON.stringify(this.editLeadDetail)
        )
        this.goToLeadsListPage()
      })

      // alert(data.rejection_comment)
      this.rejectComment = ''
      e.preventDefault()
    },

    btnCancelClick() {
      if (
        JSON.stringify(this.leadDetailsSavedCopy) ===
        JSON.stringify(this.editLeadDetail)
      ) {
        this.cancel()
      } else {
        this.showCancelModal()
      }
    },
    showCancelModal() {
      this.isShowCancelModal = true
    },
    hideCancelModal() {
      this.isShowCancelModal = false
    },
    cancel() {
      this.goToLeadsListPage()
    },
    goToLeadsListPage() {
      this.$router.push({ name: appConstants.routes.LEAD })
    },
    getStatusStringValue() {
      switch (this.editLeadDetail.status) {
        case appConstants.leadStatus.OPEN:
          return 'Open '
        case appConstants.leadStatus.APPROVED:
          return 'Approved '
        case appConstants.leadStatus.REJECTED:
          return 'Rejected '
        case appConstants.leadStatus.EXPIRED:
          return 'Expired '
        default:
          return ''
      }
    },
    fetchAllCompaniesToAllocate() {
      if (this.search_compnay_by.trim() == '') {
        this.setCompaniesToAllocate('')
      } else {
        if (this.search_compnay_by.trim().length >= 3) {
          this.fetchCompaniesToAllocate(this.search_compnay_by.trim())
        }
      }
    },
    searchAllCompanies() {
      if (this.search_compnay_by.trim() == '') {
        this.setCompaniesToAllocate('')
      } else {
        this.fetchCompaniesToAllocate(this.search_compnay_by.trim())
      }
    },
    allocateCompany(company) {
      var ispresent = this.editLeadDetail.companies.includes(company.id)
      if (!ispresent) {
        this.editLeadDetail.companies.push(company.id)
        this.addCompanyToAllocatedCompanyList(company)
      }
    },
    doNotAllocateCompany(removeCompany) {
      const index = this.editLeadDetail.companies.indexOf(removeCompany.id)
      if (index > -1) {
        this.editLeadDetail.companies.splice(index, 1)
        this.removeFromAllocatedCompanyList(removeCompany.id)
      }
    },
    getSaveButtonText() {
      if (this.editLeadDetail.id == '' || this.editLeadDetail.id == undefined) {
        return 'Post lead'
      } else {
        return 'Update'
      }
    },

    isApproveButtonVisible() {
      if (
        !this.is_add_lead &&
        this.userData.is_admin &&
        this.editLeadDetail.status == appConstants.leadStatus.OPEN
      ) {
        return true
      } else {
        return false
      }
    },
    isDeleteButtonVisible() {
      if (
        !this.is_add_lead &&
        this.userData.id == this.editLeadDetail.user_id
      ) {
        return true
      } else {
        return false
      }
    },

    isRejectButtonVisible() {
      if (
        !this.is_add_lead &&
        this.userData.is_admin &&
        this.editLeadDetail.status == appConstants.leadStatus.OPEN
      ) {
        return true
      } else {
        return false
      }
    },

    getKeyID(str, id) {
      return `${str}_${id}`
    },
    hideMandatoryModal() {
      this.showMandatoryFieldModal = false
    },
    hideCategorySubCategoryReqModal() {
      this.showCategorySubCategoryReqModal = false
      this.categorySubCategoryReqModalMessage = ''
    },
    showMandatoryModal() {
      this.showMandatoryFieldModal = true
    },

    isCategoryContractor() {
      if (this.editLeadDetail.category == appConstants.category.CONTRACTOR) {
        return true
      } else {
        return false
      }
    },
    isTypeOfContractVisible() {
      return this.isCategoryContractor()
    },
    isShouldHaveDoneIsVisible() {
      return false
      // return this.isCategoryContractor()
    },
    isAdminPostingLead() {
      return this.userData.is_admin
    },
    isContactDetailsVisible() {
      if (this.userData.is_admin) {
        this.isContactSeperatorVisible = true
        return
      }

      if (this.editLeadDetail.email == '' || this.editLeadDetail.phone == '') {
        this.isContactSeperatorVisible = true
      } else {
        this.isContactSeperatorVisible = false
      }
    },

    isContactDetailsContactNameVisible() {
      if (this.userData.is_admin) {
        this.isContactUserNameVisible = true
        return
      }

      if (this.editLeadDetail.contact_name == '') {
        this.isContactUserNameVisible = true
      } else {
        this.isContactUserNameVisible = false
      }
    },
    isContactDetailsCompanyNameVisible() {
      if (this.userData.is_admin) {
        this.isContactCompanyNameVisible = true
        return
      }

      if (this.editLeadDetail.company_name == '') {
        this.isContactCompanyNameVisible = true
      } else {
        this.isContactCompanyNameVisible = false
      }
    },

    isContactDetailsEmailVisible() {
      if (this.userData.is_admin) {
        this.isContactEmailVisible = true
        return
      }

      if (this.editLeadDetail.email == '') {
        this.isContactEmailVisible = true
      } else {
        this.isContactEmailVisible = false
      }
    },

    isContactDetailsPhoneVisible() {
      if (this.userData.is_admin) {
        this.isContactPhoneVisible = true
        return
      }

      if (this.editLeadDetail.phone == '') {
        this.isContactPhoneVisible = true
      } else {
        this.isContactPhoneVisible = false
      }
    },
    OTPEmailverify(value) {
      var otp_payload = {
        otp_for: this.editLeadDetail.email_to_display,
        country_code: '',
        otp: value
      }

      this.action_checkIsOTPCorrect([otp_payload, true])
        .then(() => {
          this.emailStartTimer = false
          this.showEmailOTPVerificationModal = false
          this.editLeadDetail.email = this.editLeadDetail.email_to_display
          this.emailOtpError = ''
        })
        .catch((error) => {
          this.emailOtpError = error
        })
    },
    OTPPhoneverify(value) {
      var otp_payload = {
        otp_for: this.editLeadDetail.phone_to_display,
        country_code: this.editLeadDetail.country_code_to_display,
        otp: value
      }

      this.action_checkIsOTPCorrect([otp_payload, true])
        //true means update in user account, so before setting true take a permission from se
        .then(() => {
          this.phoneStartTimer = false
          this.showPhoneOTPVerificationModal = false
          this.editLeadDetail.phone = this.editLeadDetail.phone_to_display
          this.phoneOtpError = ''
        })
        .catch((error) => {
          this.phoneOtpError = error
        })
    },

    sendEmailOTP(e) {
      if (e != undefined) {
        e.preventDefault()
      }

      if (
        !this.$v.editLeadDetail.email_to_display.email ||
        !this.$v.editLeadDetail.email_to_display.required
      ) {
        this.emailOTPVerification = true
        return false
      }

      this.emailOtpError = ''

      var otp_payload = {
        otp_for: this.editLeadDetail.email_to_display,
        country_code: '',
        otp_type: appConstants.OTPEnums.EMAIL_VERIFICATION_OTP,
        check_is_unique: true
      }

      this.emailStartTimer = false
      this.action_requestForOTP(otp_payload)
        .then(() => {
          this.emailStartTimer = true
          this.showEmailOTPVerificationModal = true
        })
        .catch((error) => {
          if (error != '') {
            this.showInfoMessage(error)
          }
        })
    },

    sendPhoneOTP(e) {
      if (e != undefined) {
        e.preventDefault()
      }

      if (
        !this.$v.editLeadDetail.phone_to_display.numeric ||
        !this.$v.editLeadDetail.phone_to_display.required
      ) {
        this.phoneOPTVerification = true
        return false
      }

      this.phoneOtpError = ''

      var otp_payload = {
        otp_for: this.editLeadDetail.phone_to_display,
        country_code: this.editLeadDetail.country_code_to_display,
        otp_type: appConstants.OTPEnums.PHONE_VERIFICATION_OTP,
        check_is_unique: true
      }
      this.phoneStartTimer = false
      this.action_requestForOTP(otp_payload)
        .then(() => {
          this.phoneStartTimer = true
          this.showPhoneOTPVerificationModal = true
        })
        .catch((error) => {
          if (error != '') {
            this.showInfoMessage(error)
          }
        })
    },

    closeEmailVerificationModel() {
      this.showEmailOTPVerificationModal = false
    },
    closePhoneVerificationModel() {
      this.showPhoneOTPVerificationModal = false
    },
    setDisplayValue() {
      this.editLeadDetail.country_code_to_display = this.editLeadDetail.country_code
      this.editLeadDetail.email_to_display = this.editLeadDetail.email
      this.editLeadDetail.phone_to_display = this.editLeadDetail.phone
    },
    showInfoMessage(message) {
      this.showInfoModel = true
      this.showInfoModelMessage = message
    },
    setContactDetailsSeparatorVisibility() {
      this.isContactDetailsVisible()
      this.isContactDetailsContactNameVisible()
      this.isContactDetailsCompanyNameVisible()
      this.isContactDetailsEmailVisible()
      this.isContactDetailsPhoneVisible()
    },
    setUserContactDetails(user_id) {
      this.fetchOneOlousUserData(user_id).then((response) => {
        if (response.is_email_verified) {
          this.editLeadDetail.email = response.email
        }

        if (response.is_phone_verified) {
          this.editLeadDetail.phone = response.phone
          this.editLeadDetail.country_code = response.country_code
        }
        this.editLeadDetail.contact_name = `${response.first_name} ${response.last_name}`

        this.setDisplayValue()
        this.setContactDetailsSeparatorVisibility()
      })
    },
    fetchDropDownValues() {
      this.fetchMinWork()
      this.fetchTurnover()
      // this.fetchProjectType()
      this.fetchSectorData()
      this.fetchApproximateArea()
      this.fetchDevelopmentType()

      // this.min_work_options = this.getMinWorkOptions
      // this.contractorTurnoverOptions = this.getTurnOverOptions
      // this.projectTypeOptions = this.getProjectTypeOptions
      // this.appxAreaOptions = this.getApproximateAreaOptions
      // this.contractorShouldDoneOptions = this.getDevelopmentTypeOptions
    },
    showDeleteConfirmationModal(e) {
      this.deleteLeadID = this.editLeadDetail.id
      this.showDeleteModal = true
      e.preventDefault()
    },
    hideDeleteConfirmationModal() {
      this.showDeleteModal = false
      this.deleteLeadID = ''
    },
    leadDelete(e) {
      // alert('delete lead')
      this.deleteLead({ id: this.deleteLeadID }).then(() => {
        this.hideDeleteConfirmationModal()
        this.goToLeadsListPage()
        e.preventDefault()
      })
    },
    isRejectionSeparatorVisible() {
      if (this.editLeadDetail.rejection_comment.trim() != '') {
        return true
      } else {
        return false
      }
    },
    getRejectionSubTitle() {
      if (this.userData.is_admin) {
        return ''
      } else {
        return 'Please do the changes as per comment and update request'
      }
    }
  },
  created() {
    this.fetchCategoryOptions()
    if (this.$route.name == appConstants.routes.UPDATE_LEAD) {
      this.is_add_lead = false
      this.fetchLeadsDetailsFromEncryptedID(this.$route.params.lead_id).then(
        () => {
          this.editLeadDetail = JSON.parse(JSON.stringify(this.getLeadDetails))
          this.setDisplayValue()
          this.setContactDetailsSeparatorVisibility()

          // this.editLeadDetail = JSON.parse(JSON.stringify(this.getLeadDetails))
          if (
            this.editLeadDetail.category != undefined &&
            this.editLeadDetail.category != null &&
            this.editLeadDetail.category != ''
          ) {
            this.fetchSubCategories(this.editLeadDetail.category).then(() => {
              this.multiSelectoptions = this.getSubCategories
                .map((res) => res._source)
                .filter((res) => {
                  if (res.name != '') {
                    return res
                  }
                })
            })
          } else {
            this.multiSelectoptions = []
          }

          // if (this.editLeadDetail.companies.length > 0) {
          //   var data = {
          //     company_ids: this.editLeadDetail.companies
          //   }
          //   this.fetchAllocatedCompanyDetails(data)
          // }
        }
      )
    } else {
      //New lead

      //set company details
      if (!this.userData.is_admin) {
        this.editLeadDetail.country = 'India'
        this.editLeadDetail.country_iso = 'IN'

        //if a user set company details
        // this.fetchCompanies().then(() => {
        //   if (this.allCompanies.length > 0) {
        //     let company = this.allCompanies[0]

        //     this.editLeadDetail.company_name = company['name']
        //     this.setUserContactDetails(this.userData.id)
        //   }
        // })

        if (this.allCompanies.length > 0) {
          let company = this.allCompanies[0]

          this.editLeadDetail.company_name = company['name']
          this.setUserContactDetails(this.userData.id)
        }
      } else {
        // this.loadDropdownData()
        this.editLeadDetail.country = 'India'
        this.editLeadDetail.country_iso = 'IN'
        // this.editLeadDetail.country_code = '+91'
        this.setContactDetailsSeparatorVisibility()
      }
    }
    this.leadDetailsSavedCopy = JSON.parse(JSON.stringify(this.editLeadDetail))
    this.fetchDropDownValues()
  },

  beforeDestroy() {
    this.updateShowLeadModal([false, ''])
  }
}
</script>

<style scoped>
/* .form-conatiner {
  margin-top: 20px;
} */
.chkurgent {
  transform: scale(2);
}

.lead-radio-btn {
  border: 1px solid #d1e2ea;
  padding: 6px 8px;
  margin-top: 2px;
}
.separator-container {
  border-radius: 8px !important;
}
.separator-header {
  border-top-left-radius: 8px !important;
  border-top-right-radius: 8px !important;
}
</style>
