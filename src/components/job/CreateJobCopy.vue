<template>
  <div>
    <div class="form-conatiner">
      <div class="createjob">
        <form enctype="multipart/form-data" class="mt-3">
          <fieldset :disabled="is_disable">
            <div class="text-right"><label>*Required Field</label></div>
            <div :class="mainDivClass">
              <div class="form-group">
                <label>*Company</label>
                <input
                  v-if="isShowCompanyTextBox"
                  type="text"
                  class="form-control input-lg"
                  v-model="jobDetails.company"
                  readonly
                />
                <v-select
                  v-if="!isShowCompanyTextBox"
                  v-model="companyDetails"
                  label="name"
                  :options="companyList"
                  placeholder="Select Company"
                  class="form-control single-value show-placeholder"
                  @search="setCompanyDetails"
                  @input="onSelectCompany($event)"
                  :clearable="false"
                  :disabled="is_disable"
                  :class="{
                    'is-invalid': submitted && $v.jobDetails.company.$invalid
                  }"
                >
                </v-select>
                <!-- <multiselect
                  :multiple="false"
                  :searchable="true"
                  track-by="id"
                  label="name"
                  :value="companyList"
                  v-model="jobDetails.company"
                  :options="companyList"
                  @search-change="setCompanyDetails"
                  @select="onSelectCompany($event)"
                  :close-on-select="false"
                  placeholder="Select"
                  :class="{
                    'is-invalid': submitted && $v.jobDetails.company.$invalid
                  }"
                ></multiselect> -->
                <div
                  v-if="submitted && !$v.jobDetails.company.required"
                  class="invalid-feedback"
                >
                  Company name is required
                </div>
              </div>
              <div class="form-group">
                <button
                  type="button"
                  class="btn btn-dark"
                  @click="openCreateCompanyForm()"
                >
                  Create Company
                </button>
              </div>
              <div class="form-group">
                <div class="" v-cloak>
                  <label class="">*Company Logo</label>
                  <input
                    id="companyLogo"
                    :accept="imageTypes"
                    ref="companyLogo"
                    @change="previewLogo"
                    type="file"
                    style="display: none"
                  />
                  <button
                    type="button"
                    id="fileInputButton"
                    onclick="document.getElementById('companyLogo').click()"
                    class="btn btn-link"
                    v-if="
                      jobDetails.company_logo == '' ||
                      jobDetails.company_logo == null
                    "
                  >
                    <img
                      class="uploadImageIcon"
                      src="../../assets/img/Upload.svg"
                      title="upload image"
                    />
                  </button>
                  <div v-if="company_logoSrc" class="logo-preview">
                    <img
                      v-if="company_logoSrc"
                      @click="removeLogo"
                      :disabled="is_disable"
                      class="remove-logo"
                      src="../../assets/img/Close.svg"
                      title="close image"
                    />
                    <img
                      v-if="company_logoSrc"
                      :src="company_logoSrc"
                      class="img-preview logo-image"
                    />
                  </div>
                  <div
                    v-if="submitted && !$v.jobDetails.company_logo.required"
                    class="is-invalid"
                  ></div>
                  <div
                    v-if="submitted && !$v.jobDetails.company_logo.required"
                    class="invalid-feedback"
                  >
                    Company logo is required
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label>*Title</label>
                <input
                  type="text"
                  class="form-control input-lg"
                  v-model="jobDetails.job_title"
                  :class="{
                    'is-invalid': submitted && $v.jobDetails.job_title.$invalid
                  }"
                />
                <div
                  v-if="submitted && !$v.jobDetails.job_title.required"
                  class="invalid-feedback"
                >
                  Title is required
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>*Level</label>
                    <select
                      class="form-control input-lg"
                      name="level"
                      v-model="jobDetails.level"
                      @change="levelChanged()"
                      :class="{
                        'is-invalid': submitted && $v.jobDetails.level.$invalid
                      }"
                    >
                      <option value>Select</option>
                      <option
                        v-for="item in this.getLevelOptions"
                        :value="item.id"
                        :key="item.id"
                      >
                        {{ item.level_name }}
                      </option>
                    </select>
                    <div
                      v-if="submitted && !$v.jobDetails.level.required"
                      class="invalid-feedback"
                    >
                      Level is required
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="row">
                    <div class="col-6">
                      <div class="form-group">
                        <label>*Min. Exp.(year)</label>
                        <select
                          class="form-control input-lg"
                          name="min_exp"
                          v-model="jobDetails.min_exp"
                          @change="MinExpChanged"
                          :disabled="
                            jobDetails.level == this.job_level.FRESHER ||
                            jobDetails.level == this.job_level.INTERN
                          "
                          :class="{
                            'is-invalid':
                              submitted && $v.jobDetails.min_exp.$invalid
                          }"
                        >
                          <!--<option value>Select</option>-->
                          <option
                            v-for="(
                              n, // eslint-disable-next-line vue/no-unused-vars
                              index
                            ) in calculateMaxExpValueInMinExpDropdown"
                            :value="n.toString()"
                            :key="n"
                          >
                            {{ n }}
                          </option>
                          <!-- <option  :value="maxExperiance+1" :key="maxExperiance+1">{{maxExperiance+1}}+ year</option> -->
                        </select>
                        <div
                          v-if="submitted && !$v.jobDetails.min_exp.required"
                          class="invalid-feedback"
                        >
                          Min. Exp. is required
                        </div>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="form-group">
                        <label>Max. Exp.(year)</label>
                        <select
                          class="form-control input-lg"
                          name="max_exp"
                          v-model="jobDetails.max_exp"
                          :disabled="
                            jobDetails.level == this.job_level.FRESHER ||
                            jobDetails.level == this.job_level.INTERN ||
                            jobDetails.min_exp == 0
                          "
                        >
                          <option value="0">Select</option>
                          <option
                            v-for="n in maxExperianceRange"
                            :value="n.toString()"
                            :key="n"
                          >
                            {{ n }}
                          </option>
                          <option
                            :value="maxExperiance + 1"
                            :key="maxExperiance + 1"
                          >
                            {{ maxExperiance + 1 }}+
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="isShowProfesssionSectorDropdown">
                <div class="form-group">
                  <label>*Profession (Max 3)</label>

                  <multiselect
                    :multiple="true"
                    :searchable="false"
                    track-by="id"
                    label="display_string"
                    v-model="professional_categories_objArray"
                    :options="getProfessionOptions"
                    :close-on-select="false"
                    :max="3"
                    :disabled="
                      jobDetails.level == this.job_level.FRESHER ||
                      jobDetails.level == this.job_level.INTERN ||
                      jobDetails.level == ''
                    "
                    @select="onselectProfession($event)"
                    placeholder="Select"
                    class="form-control"
                    :class="{
                      'is-invalid':
                        submitted &&
                        $v.jobDetails.professional_categories.$invalid
                    }"
                  ></multiselect>
                  <div class="mt-2">
                    <input
                      type="checkbox"
                      class="chkAttachment ml-2"
                      name="professioncheck"
                      v-model="jobDetails.isStrictProfessions"
                    />
                    <label class="ml-1"
                      >Check if you want the candidate only from above
                      professions
                    </label>
                  </div>
                  <div
                    v-if="
                      submitted &&
                      !$v.jobDetails.professional_categories.required
                    "
                    class="invalid-feedback"
                  >
                    Profession is required
                  </div>
                </div>
              </div>
              <div v-if="isShowProfesssionSectorDropdown">
                <div class="form-group">
                  <label>
                    Sectors (Max 3)
                    <span class="fontSize12"
                      >this will help to reach right candidates</span
                    >
                  </label>
                  <multiselect
                    :multiple="true"
                    :searchable="false"
                    track-by="id"
                    label="display_string"
                    v-model="sectors_objArray"
                    :options="getSectorOptions"
                    :close-on-select="false"
                    :max="3"
                    :disabled="
                      jobDetails.level == this.job_level.FRESHER ||
                      jobDetails.level == this.job_level.INTERN ||
                      jobDetails.level == ''
                    "
                    @select="onselectSector($event)"
                    placeholder="Select"
                  ></multiselect>
                  <div class="mt-2">
                    <input
                      type="checkbox"
                      class="chkAttachment ml-2"
                      name="sectorscheck"
                      v-model="jobDetails.isStrictSectors"
                    />
                    <label class="ml-1"
                      >Check if you want the candidate only from above sectors
                    </label>
                  </div>
                </div>

                <div class="form-group">
                  <label
                    for="advancedfilter"
                    class="cursor-pointer font-size-16 font-weight-bold"
                    @click="openAdvancedFilterSector"
                    >Advanced Filter +
                  </label>
                </div>
                <div
                  class="border p-3 rounded mb-3"
                  :style="{ display: displayFilterSector }"
                >
                  <span class="mb-4"></span>
                  <div
                    v-if="
                      sectors_objArray.length == 0 &&
                      professional_categories_objArray.length == 0
                    "
                  >
                    Please select profession or sector first
                  </div>
                  <b-row>
                    <b-col cols="6">
                      <div
                        v-if="professional_categories_objArray.length > 0"
                        class="font-weight-bold mb-3"
                      >
                        Professions
                      </div>
                      <div
                        v-for="(
                          prof, index
                        ) in professional_categories_objArray"
                        :key="index"
                      >
                        <b-row class="flex flex-row">
                          <b-col cols="9">
                            <input
                              type="text"
                              v-model="prof.display_string"
                              class="input-capsule"
                              disabled
                            />
                          </b-col>
                          <b-col cols="3">
                            <!-- <input
                              type="text"
                              :v-model="professional_categories_objArray.exp"
                              class="form-control"
                              @change="getProfessionList($event, index)"
                            /> -->
                            <v-select
                              v-model="
                                professional_categories_objArray[index].exp
                              "
                              label="name"
                              :options="getExpArray()"
                              @input="getProfessionList($event, index)"
                              placeholder="Experience"
                              :clearable="true"
                              class="single-value display-close-btn remove-dropdown-icon form-control"
                            ></v-select>
                          </b-col>
                        </b-row>
                        <!-- {{ professional_categories_objArray }} -->
                      </div>
                    </b-col>
                    <b-col cols="6">
                      <div
                        v-if="sectors_objArray.length > 0"
                        class="font-weight-bold mb-3"
                      >
                        Sectors
                      </div>
                      <div
                        v-for="(prof, index) in sectors_objArray"
                        :key="index"
                      >
                        <b-row class="flex flex-row">
                          <b-col cols="9">
                            <input
                              type="text"
                              v-model="prof.display_string"
                              class="input-capsule"
                              disabled
                            />
                          </b-col>
                          <b-col cols="3">
                            <!-- <input
                              type="text"
                              :v-model="sectors_objArray.exp"
                              class="form-control"
                              @change="getSectorList($event, index)"
                            /> -->
                            <v-select
                              v-model="sectors_objArray[index].exp"
                              label="name"
                              :options="getExpArray()"
                              @input="getSectorList($event, index)"
                              placeholder="Experience"
                              :clearable="true"
                              class="single-value display-close-btn remove-dropdown-icon form-control"
                            ></v-select>
                          </b-col>
                        </b-row>
                      </div>
                    </b-col>
                  </b-row>
                </div>
              </div>
              <!-- FIELD AND STUDY -->
              <div v-if="isShowStudyFieldDropdown">
                <div class="form-group">
                  <label>*Field of Study (Max 3)</label>

                  <multiselect
                    :multiple="true"
                    :searchable="true"
                    track-by="id"
                    label="field_of_study"
                    v-model="field_of_study_objArray"
                    :options="getFilteredFieldOfStudy"
                    @search-change="getFieldOfStudyList($event)"
                    :close-on-select="false"
                    :max="3"
                    :disabled="
                      jobDetails.level == this.job_level.JUNIOR ||
                      jobDetails.level == this.job_level.INTERMEDIATE ||
                      jobDetails.level == this.job_level.SENIOR
                    "
                    placeholder="Select"
                    :class="{
                      'is-invalid':
                        submitted && $v.jobDetails.field_of_study.$invalid
                    }"
                  ></multiselect>
                  <div
                    v-if="submitted && !$v.jobDetails.field_of_study.required"
                    class="invalid-feedback"
                  >
                    Field of study is required
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label> Softwares (Max 6) </label>
                <b-row>
                  <b-col cols="12">
                    <!-- <v-select
                      label="name"
                      :searchable="true"
                      v-model="software"
                      :options="filteredSoftwares"
                      @search="applyFilterOnSoftware"
                      @input="selectedSoftware($event)"
                      :closeOnSelect="true"
                      placeholder="Enter software"
                      class="border border-[#c4c4c4] single-value rounded remove-dropdown-icon"
                    /> -->
                    <multiselect
                      :multiple="true"
                      :searchable="true"
                      track-by="id"
                      label="name"
                      v-model="software"
                      :options="filteredSoftwares"
                      @search-change="applyFilterOnSoftware"
                      :close-on-select="false"
                      :max="6"
                      placeholder="Select"
                      :class="{
                        'is-invalid':
                          submitted && $v.jobDetails.softwares.$invalid
                      }"
                    ></multiselect>
                  </b-col>
                  <!-- <b-col cols="2">
                    <button
                      type="button"
                      class="btn btn-dark btn-custom"
                      @click="addSoftware()"
                    >
                      Add +
                    </button>
                  </b-col> -->
                </b-row>
                <div
                  v-if="isSoftwareLimitExceed"
                  class="d-block invalid-feedback"
                >
                  Maximum 6 softwares added
                </div>
                <div v-if="isAlreadyAdded" class="d-block invalid-feedback">
                  Software already added
                </div>
                <b-row class="m-0">
                  <b-col
                    class="p-0 mr-2"
                    cols="3"
                    v-for="(soft, index) in softwareArray"
                    :key="index"
                  >
                    <input
                      type="text"
                      class="form-control"
                      :value="soft[0].name"
                      readonly
                    />
                  </b-col>
                </b-row>
              </div>
              <!-- <pre>{{ filteredSoftwares }}</pre> -->
              <div class="form-group">
                <label> Interests (Max 6) </label>
                <multiselect
                  :multiple="true"
                  :searchable="false"
                  track-by="id"
                  label="display_string"
                  v-model="interests_objArray"
                  :options="getInterestOptions"
                  :close-on-select="false"
                  :max="6"
                  :disabled="is_disable"
                  placeholder="Select"
                ></multiselect>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>*Employment</label>
                    {{ $v.jobDetails.employment.$invalid }}
                    <select
                      class="form-control input-lg"
                      name="employment"
                      v-model="jobDetails.employment"
                      :class="{
                        'is-invalid':
                          submitted && $v.jobDetails.employment.$invalid
                      }"
                    >
                      <option value>Select</option>
                      <option
                        v-for="item in this.getEmploymentOptions"
                        :value="item.id"
                        :key="item.id"
                      >
                        {{ item.employment_type }}
                      </option>
                    </select>
                    <div
                      v-if="submitted && !$v.jobDetails.employment.required"
                      class="invalid-feedback"
                    >
                      Employment is required
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>*Vacancy</label>
                    <select
                      class="form-control input-lg"
                      name="Vacancy"
                      v-model="jobDetails.vacancy"
                    >
                      <option
                        v-for="n in maxnumberOfVacancy"
                        :value="n.toString()"
                        :key="n"
                      >
                        {{ n }}
                      </option>
                    </select>
                    <div
                      v-if="submitted && !$v.jobDetails.vacancy.required"
                      class="invalid-feedback"
                    >
                      Vacancy is required
                    </div>
                  </div>
                </div>
              </div>

              <!-- new job location -->
              <div class="row">
                <div class="col-md-6">
                  <div class="col-md-12 p-0">
                    <label class="color-black">*Work Location</label>
                  </div>
                  <div class="col-md-12 p-0">
                    <select
                      name="work_location"
                      class="form-control"
                      v-model="jobDetails.work_location"
                      @change="worktypeChanged($event)"
                      :class="{
                        'is-invalid':
                          submitted && $v.jobDetails.work_location.$invalid
                      }"
                    >
                      <option
                        v-for="type in workTypeOptions"
                        :value="type.id"
                        :key="type.id"
                      >
                        {{ type.value }}
                      </option>
                    </select>
                    <div
                      v-if="submitted && !$v.jobDetails.work_location.required"
                      class="invalid-feedback"
                    >
                      Work location is required
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="col-md-12 p-0">
                    <!-- <label v-if="isCountry">*Country</label> -->
                    <label class="color-black">*City</label>
                  </div>
                  <div class="col-md-12 p-0" style="">
                    <!-- <div class="form-group" v-if="isCountry">
                    <v-select
                      v-model="jobDetails.location.country"
                      label="name"
                      :options="filteredCountry[0].data"
                      @search="fetchCountryValues"
                      @input="onCountrySelected($event)"
                      class="form-control"
                      placeholder="Enter country"
                    ></v-select>
                  </div> -->
                    <div class="form-group">
                      <v-select
                        label="displayName"
                        v-model="newLocation"
                        :options="getLocation"
                        @search="getLocationData"
                        @input="selectedCity($event)"
                        placeholder="City Name"
                        :closeOnSelect="true"
                        :class="{
                          'is-invalid': submitted && $v.newLocation.$invalid
                        }"
                        class="single-value show-placeholder remove-close-btn remove-dropdown-icon form-control options-on-search-only"
                      />
                      <div
                        v-if="submitted && !$v.newLocation.required"
                        class="invalid-feedback"
                      >
                        City is required
                      </div>
                      <div class="mt-2">
                        <input
                          type="checkbox"
                          class="chkAttachment ml-2"
                          name="citycheck"
                          v-model="jobDetails.mandatory_location"
                        />
                        <label class="ml-1"
                          >Check if you want the candidate only from above city
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div
                class="job-location-container"
                v-for="(locationdtls, index) in $v.jobDetails.location.$each
                  .$iter"
                :key="index"
              >
                <div class="loc-dist" style="flex: 1 1 auto; width: 100%">
                  <div class="form-group">
                    <label>Location (Max 4)</label>
                    <v-select
                      v-model="locationdtls.country.$model"
                      label="name"
                      :options="filteredCountry[0].data"
                      @search="fetchCountryValues"
                      @input="onCountrySelected($event, index)"
                      class="form-control"
                      placeholder="Enter country"
                      :disabled="
                        is_disable ||
                        index > 0 ||
                        (index == 0 && jobDetails.location.length > 1)
                      "
                      :class="{
                        'is-invalid':
                          submitted && !locationdtls.country.required
                      }"
                    ></v-select>

                    <div
                      v-if="submitted && !locationdtls.country.required"
                      class="invalid-feedback"
                    >
                      Country is required
                    </div>
                  </div>
                </div>
                <div class="loc-dist" style="flex: 1 1 auto; width: 100%">
                  <div class="form-group">
                    <label>State</label>
                    <v-select
                      v-model="locationdtls.state.$model"
                      label="name"
                      :options="filteredState[0].data"
                      @search="fetchStateValues($event, index)"
                      @input="onStateSelected($event, index)"
                      placeholder="Enter state"
                      class="form-control"
                      :disabled="is_disable"
                      :class="{
                        'is-invalid': submitted && !locationdtls.state.required
                      }"
                    >
                    </v-select>

                    <div
                      v-if="submitted && !locationdtls.state.required"
                      class="invalid-feedback"
                    >
                      State is required
                    </div>
                  </div>
                </div>
                <div class="" style="flex: 1 1 auto; width: 100%">
                  <div class="form-group">
                    <v-select
                      v-model="locationdtls.city.$model"
                      label="name"
                      :options="filteredCities[0].data"
                      @search="fetchCitiesValues($event, index)"
                      @input="onCitySelected($event, index)"
                      placeholder="Enter city"
                      class="form-control"
                      :disabled="is_disable"
                      :class="{
                        'is-invalid': submitted && !locationdtls.city.required
                      }"
                    ></v-select>
                    <div
                      v-if="submitted && !locationdtls.city.required"
                      class="invalid-feedback"
                    >
                      City is required
                    </div>
                  </div>
                </div>
                <div class="location-action-row" style="flex: 0 0 auto">
                  <button
                    v-if="index == 0"
                    type="button"
                    style="margin-top: 5px"
                    :disabled="
                      locationdtls.country.$model == '' ||
                      jobDetails.location.length == maxNumberOfLocation
                    "
                    class="btn btn-dark"
                    @click="addJobLocation()"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    style="margin-top: 5px"
                    class="btn btn-dark"
                    :disabled="index == 0 && jobDetails.location.length == 1"
                    @click="deleteJobLocation(index)"
                  >
                    Delete
                  </button>
                </div>
              </div> -->
              <div class="form-group">
                <label>Salary</label>
                <input
                  type="text"
                  class="form-control input-lg"
                  v-model="jobDetails.ctc"
                />
              </div>

              <div class="form-group">
                <label>Languages </label>
                <multiselect
                  :multiple="true"
                  :searchable="false"
                  track-by="id"
                  label="display_string"
                  v-model="language_objArray"
                  :options="getLanguages"
                  :close-on-select="false"
                  :disabled="is_disable"
                  placeholder="Select"
                ></multiselect>
              </div>

              <div class="form-group">
                <label>Attachment</label>
                <input
                  type="checkbox"
                  class="chkAttachment ml-2"
                  name="attachment"
                  @change="chkAttachmentEvent"
                  v-model="jobDetails.attachment_required"
                />
                <input
                  type="text"
                  class="form-control input-lg"
                  v-model="jobDetails.attachment_description"
                  placeholder="Attachment description"
                  :disabled="!jobDetails.attachment_required"
                  :class="{
                    'is-invalid':
                      submitted && $v.jobDetails.attachment_description.$invalid
                  }"
                />
                <div
                  v-if="
                    submitted && !$v.jobDetails.attachment_description.required
                  "
                  class="invalid-feedback"
                >
                  Attachment description is required
                </div>
              </div>

              <div class="form-group ml-2 mt-2">
                <!-- <b-form-checkbox size="lg" v-model="urgent" id="chkUrgent">Urgent</b-form-checkbox> -->
                <input
                  type="checkbox"
                  class="chkurgent"
                  name="urgent"
                  v-model="jobDetails.urgent"
                />
                <label
                  for="urgent"
                  class="app-primary-text-color font-weight-bold ml-2"
                >
                  Urgent</label
                >
              </div>
              <div class="form-group">
                <label class="app-primary-text-color"
                  >*Profile Requirement</label
                >
                <label class="mb-0 text-right float-right">
                  {{ remainingProfileReqLength }}/{{
                    ProfileReqTotalLength
                  }}</label
                >
                <b-form-textarea
                  name="profile_req"
                  v-model="jobDetails.profile_req"
                  cols="40"
                  rows="7"
                  max-rows="15"
                  maxlength="5000"
                  no-resize
                  v-on:keyup="getProfileReqLength($event.target.value)"
                  class="form-control"
                  :class="{
                    'is-invalid':
                      submitted && $v.jobDetails.profile_req.$invalid
                  }"
                ></b-form-textarea>

                <div
                  v-if="submitted && !$v.jobDetails.profile_req.required"
                  class="invalid-feedback"
                >
                  Profile requirement is required
                </div>
              </div>
              <div class="form-group mt-n1">
                <label class="app-primary-text-color">*Job Description</label>
                <label class="mb-0 text-right float-right">
                  {{ remainingJobDescLength }}/{{ JobDescTotalLength }}</label
                >
                <b-form-textarea
                  name="job_description"
                  v-model="jobDetails.job_description"
                  cols="40"
                  rows="7"
                  max-rows="15"
                  maxlength="5000"
                  no-resize
                  v-on:keyup="getJobDescriptionLength($event.target.value)"
                  class="form-control"
                  :class="{
                    'is-invalid':
                      submitted && $v.jobDetails.job_description.$invalid
                  }"
                ></b-form-textarea>

                <div
                  v-if="submitted && !$v.jobDetails.job_description.required"
                  class="invalid-feedback"
                >
                  Job Description is required
                </div>
              </div>
              <!--<div style="display: flex; flex-direction: row">
                <label style="flex: 0 0 auto">Language</label>

                <div
                  class="cursor-pointer ml-2 fontSize16andHalf"
                  style="margin-top: -3px"
                  @click="addLanguage()"
                >
                  <label>Add</label>
                  <img
                    src="../../assets/img/Add.svg"
                    class="fontSize16andHalf"
                    title="Add Language"
                  />
                </div>
              </div>
              <div
                class="row language-action-row"
                v-for="(lang, index) in language"
                :key="`lang${index}`"
              >
                <div class="col-lg-4">
                  <input
                    type="text"
                    class="form-control input-lg"
                    @input="languageChanged($event.target.value, index)"
                    v-model="lang.name"
                  />
                </div>
                <div class="col-lg-4">
                  <select
                    class="form-control input-lg"
                    name="rating"
                    :disabled="lang.name == ''"
                    v-model="lang.rating"
                  >
                    <option value>Select</option>
                    <option value="1">fluent</option>
                    <option value="2">Intermediate</option>
                  </select>
                </div>

                <div class="col-lg-4 language_delete">
                  <button
                    type="button"
                    class="btn btn-dark"
                    :disabled="index == 0 && language.length == 1"
                    @click="deleteLanguage(index)"
                  >
                    Delete
                  </button>
                </div>
              </div>-->

              <div class="form-group">
                <label class="app-primary-text-color">About Company</label>
                <label class="mb-0 text-right float-right">
                  {{ remainingAboutCompanyLength }}/{{
                    aboutCompanyTotalLength
                  }}</label
                >
                <b-form-textarea
                  name="about_company"
                  v-model="jobDetails.company_info"
                  cols="40"
                  rows="7"
                  max-rows="15"
                  maxlength="1000"
                  no-resize
                  v-on:keyup="getAboutCompanyLength($event.target.value)"
                  class="form-control"
                ></b-form-textarea>
              </div>
              <div class="form-group mt-2">
                <label>Company Website</label>
                <input
                  type="text"
                  class="form-control input-lg"
                  v-model="jobDetails.company_website"
                />
              </div>
              <div class="form-group mt-2">
                <label
                  >Job application URL
                  <span class="fontSize12">
                    (Direct link for job application)
                  </span>
                </label>
                <input
                  type="text"
                  class="form-control input-lg"
                  v-model="jobDetails.job_application_url"
                />
              </div>
              <div class="form-group">
                <label>*Number of days valid till</label>
                <select
                  class="form-control input-lg"
                  name="daysToExpire"
                  v-model="jobDetails.valid_till"
                  :class="{
                    'is-invalid': submitted && $v.jobDetails.valid_till.$invalid
                  }"
                >
                  <option value>Select</option>
                  <option v-for="n in 30" :value="n.toString()" :key="n">
                    {{ n }}
                  </option>
                </select>
                <div
                  v-if="submitted && !$v.jobDetails.valid_till.required"
                  class="invalid-feedback"
                >
                  Number of days valid till is required
                </div>
              </div>
              <div class="font-weight-bold fontSize16andHalf mt-n1">
                Contact Info
              </div>
              <div class="form-group mt-2">
                <label>Name</label>
                <input
                  type="text"
                  class="form-control input-lg"
                  v-model="jobDetails.contact_name"
                />
                <!--<div
                  v-if="submitted && !$v.jobDetails.contact_name.required"
                  class="invalid-feedback"
                >
                  Contact name is required
                </div>-->
              </div>
              <div class="row form-group">
                <div class="col-md-5">
                  <div class="form-group">
                    <label>*Email</label>
                    <input
                      type="text"
                      class="form-control input-lg"
                      v-model="jobDetails.contact_email"
                      :class="{
                        'is-invalid':
                          submitted && $v.jobDetails.contact_email.$invalid
                      }"
                    />
                    <div
                      v-if="submitted && !$v.jobDetails.contact_email.required"
                      class="invalid-feedback"
                    >
                      Email is required
                    </div>
                    <div
                      v-if="submitted && !$v.jobDetails.contact_email.email"
                      class="invalid-feedback"
                    >
                      Invalid email address
                    </div>
                  </div>
                </div>
                <div class="col-md-7">
                  <div class="form-group">
                    <label>Mobile</label>
                    <div class="row">
                      <div style="" class="col-4 pr-2 ml-2 mr-n2">
                        <!-- <input
                          type="text"
                          class="form-control input-lg"
                          disabled="disabled"
                          v-model="jobDetails.country_code"
                        /> -->
                        <v-select
                          v-model="jobDetails.country_code"
                          label="name"
                          :options="filteredCountry[0].data"
                          @search="fetchCountryValues"
                          @input="onCountrySelected($event)"
                          class="form-control options-on-search-only"
                          placeholder="Enter country"
                          :class="{
                            'is-invalid':
                              submitted && $v.jobDetails.country_code.$invalid
                          }"
                        ></v-select>
                        <div
                          v-if="
                            submitted && !$v.jobDetails.country_code.numeric
                          "
                          class="invalid-feedback"
                        >
                          Country code is required
                        </div>
                      </div>
                      <div style="" class="col-8">
                        <input
                          type="text"
                          class="form-control input-lg"
                          v-model="jobDetails.contact_mobile"
                          :class="{
                            'is-invalid':
                              submitted && $v.jobDetails.contact_mobile.$invalid
                          }"
                        />
                        <!--<div
                          v-if="
                            submitted && !$v.jobDetails.contact_mobile.required
                          "
                          class="invalid-feedback"
                        >
                          Mobile number is required
                        </div>-->
                        <div
                          v-if="
                            submitted && !$v.jobDetails.contact_mobile.numeric
                          "
                          class="invalid-feedback"
                        >
                          Mobile number is invalid
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group row mt-n3">
                <div class="col-4">
                  <div>
                    <button
                      v-if="jobDetails.is_published"
                      type="button"
                      class="btn btn-dark btn-custom"
                      @click="btnJobCloselClick"
                    >
                      Close Job
                    </button>
                  </div>
                </div>
                <div class="col-8 text-right" v-if="!is_disable">
                  <button
                    type="button"
                    class="btn btn-dark btn-custom"
                    @click="btnCancelClick"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    class="btn btn-dark btn-custom ml-2"
                    @click="saveJob()"
                  >
                    {{ this.saveButtonText }}
                  </button>
                  <button
                    type="button"
                    class="btn btn-dark btn-custom ml-2"
                    @click="saveAndPublishJobData()"
                    :disabled="jobDetails.is_published"
                  >
                    Publish
                  </button>
                </div>
              </div>
            </div>
          </fieldset>
          <div class="form-group mt-n3 float-right" v-if="is_disable">
            <button
              type="button"
              class="btn btn-dark btn-custom ml-2"
              @click="goToJobHomePage"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
    <modal v-if="showCancelModal" @closeModal="hideModal">
      <div slot="body">Leave the page without saving?</div>
      <div slot="footer">
        <b-button class="btn" variant="outline-dark" @click="hideModal">
          Cancel
        </b-button>
        <b-button class="ml-2 btn" variant="outline-dark" @click="cancel">
          OK
        </b-button>
      </div>
    </modal>
    <modal v-if="showCloseJobModal" @closeModal="hideCloseJobModal">
      <div slot="body">Job closed successfully</div>
      <div slot="footer">
        <b-button class="ml-2 btn" variant="outline-dark" @click="jobClose">
          OK
        </b-button>
      </div>
    </modal>
    <!--<template>
      <b-modal ref="cancel-modal" hide-footer>
        <div class="d-block text-center">
          <h4>Leave the page without saving?</h4>
        </div>
        <b-button class="mt-3" variant="outline-danger" @click="hideModal"
          >Cancel</b-button
        >
        <b-button class="mt-3 ml-3" variant="outline-primary" @click="cancel"
          >OK</b-button
        >
      </b-modal>
    </template>-->
    <modal v-if="showJobSaveModal" @closeModal="hideSaveInfoModel">
      <div slot="body">{{ this.saveMessage }}</div>
    </modal>
    <!--<template>
      <b-modal
        :visible="showJobSaveModal"
        ref="save-modal"
        hide-footer
        @close="hideSaveInfoModel"
      >
        <div class="d-block text-center">
          <h4>{{ this.saveMessage }}</h4>
        </div>
        <b-button
          class="mt-3 ml-3 float-right"
          variant="outline-primary"
          @click="hideSaveInfoModel"
          >OK</b-button
        >
      </b-modal>
    </template>-->
    <modal v-if="showJobPublishModal" @closeModal="hidePublishInfoModel">
      <div slot="body">{{ this.publishMessage }}</div>
    </modal>
    <!--<template>
      <b-modal
        :visible="showJobPublishModal"
        ref="publish-modal"
        hide-footer
        @close="hidePublishInfoModel"
      >
        <div class="d-block text-center">
          <h4>{{ this.publishMessage }}</h4>
        </div>
        <b-button
          class="mt-3 ml-3 float-right"
          variant="outline-primary"
          @click="hidePublishInfoModel"
          >OK</b-button
        >
      </b-modal>
    </template>-->
    <modal v-if="showUploadImageError" @closeModal="hideUploadImageError">
      <div slot="body">{{ this.UploadImageError }}</div>
    </modal>
    <!--<template>
      <b-modal :visible="showUploadImageError" ref="image-modal" hide-footer>
        <div class="d-block text-center">
          <h5>{{ this.UploadImageError }}</h5>
        </div>
        <b-button
          class="ml-2 float-right"
          variant="outline-primary"
          @click="hideUploadImageError"
          >OK</b-button
        >
      </b-modal>
    </template>-->
    <template>
      <b-modal
        :visible="showCreateCompanyForm"
        size="xl"
        ref="image-modal"
        hide-footer
        @close="closeCreateCompanyForm"
      >
        <div class="d-block">
          <CreateCompany
            @company_created="setCompanyIdToSave"
            @close_company_form="closeCreateCompanyForm"
          ></CreateCompany>
        </div>
        <!--<b-button
          class="ml-2 float-right"
          variant="outline-primary"
          @click="hideUploadImageError"
          >OK</b-button
        >-->
      </b-modal>
    </template>
    <loading :active="isLoading" :is-full-page="true" />
  </div>
</template>

<script>
import { required, email, numeric, requiredIf } from 'vuelidate/lib/validators'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import appConstants from '../../appConstants.js'
import imageCheck from '../../mixins/imageCheck.js'
import uploadFileOnS3 from '../../mixins/uploadFileOnS3.js'
import modal from '../../common/Modal.vue'
import Loading from 'vue-loading-overlay'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import CreateCompany from '../CreateCompany/createCompany.vue'
// import md5 from 'js-md5'

export default {
  name: 'Createjob',
  mixins: [imageCheck, uploadFileOnS3],
  data() {
    return {
      workTypeOptions: [
        { id: 1, value: 'Office' },
        { id: 2, value: 'Onsite' },
        { id: 3, value: 'Work From Home' }
      ],
      jobDetails: {
        id: '',
        company: '',
        company_id: '',
        company_info: '',
        company_website: '',
        job_title: '',
        professional_categories: [],
        isStrictProfessions: false,
        sectors: [],
        isStrictSectors: false,
        interests: [],
        softwares: [],
        level: '',
        min_exp: '0',
        max_exp: '0',
        employment: '',
        vacancy: '1',
        ctc: '',
        country_code: '',
        urgent: false,
        profile_req: '',
        job_description: '',
        contact_name: '',
        contact_email: '',
        contact_mobile: '',
        is_published: false,
        valid_till: 30,
        company_logo: '',
        languages: [],
        work_from_home: false,
        job_application_url: '',
        attachment_description: '',
        attachment_required: false,
        mandatory_location: false,
        work_location: '1',
        location: [
          {
            country: '',
            country_iso: '',
            state: '',
            state_iso: '',
            city: ''
          }
        ],
        sectors_filter: [],
        professions_filter: [],
        field_of_study: []
      },
      displayFilter: 'none',
      displayFilterSector: 'none',
      profession1: '',
      Experience1: '',
      profession2: '',
      Experience2: '',
      profession3: '',
      Experience3: '',
      newLocation: '',
      remainingProfileReqLength: 5000,
      ProfileReqTotalLength: 5000,
      remainingJobDescLength: 5000,
      JobDescTotalLength: 5000,
      remainingAboutCompanyLength: 1000,
      aboutCompanyTotalLength: 1000,
      submitted: false,
      maxExperiance: 41,
      maxnumberOfVacancy: 50,
      countryItems: [],
      stateItems: [],
      cityItems: [],
      textInCountryTexbox: '',
      textInStateTexbox: '',
      textInCityTexbox: '',
      //popupMessage : "",
      saveMessage: 'Job details saved successfully.',
      publishMessage: 'Job published successfully',
      pageTitle: 'Create job',
      mainDivClass: 'form-inputs align-items-center',
      publishValidationReq: false,
      saveButtonText: 'Save',
      jobDetailsSavedCopy: '',
      company_logoSrc: '',
      showUploadImageError: false,
      UploadImageError: '',
      imageTypes: appConstants.ACCEPT_IMAGE_TYPE,
      showCancelModal: false,
      isLoading: false,
      professional_categories_objArray: [],
      sectors_objArray: [],
      interests_objArray: [],
      language_objArray: [],
      field_of_study_objArray: [],
      showCloseJobModal: false,
      filteredSoftwares: [],
      software: [],
      softwareArray: [],
      isSoftwareLimitExceed: false,
      isAlreadyAdded: false,
      isShowStudyFieldDropdown: false,
      isShowProfesssionSectorDropdown: true,
      // language: [
      //   {
      //     name: '',
      //     rating: ''
      //   }
      // ],
      maxNumberOfLocation: 4,
      is_disable: false,
      job_level: appConstants.job_level,
      work_location: appConstants.WORK_LOCATION,
      showCreateCompanyForm: false,
      companyList: [],
      getFilteredFieldOfStudy: [],
      companyDetails: '',
      isShowCompanyTextBox: false
    }
  },

  validations() {
    return {
      jobDetails: {
        company: { required },
        job_title: { required },
        professional_categories: {
          required: requiredIf(function () {
            if (this.publishValidationReq) {
              if (
                this.jobDetails.level == this.job_level.FRESHER ||
                this.jobDetails.level == this.job_level.INTERN
              ) {
                //if fresher
                return false
              } else {
                return true
              }
            } else {
              return false
            }
          })
        },
        field_of_study: {
          required: requiredIf(function () {
            if (this.publishValidationReq) {
              if (
                this.jobDetails.level == this.job_level.SENIOR ||
                this.jobDetails.level == this.job_level.JUNIOR ||
                this.jobDetails.level == this.job_level.INTERMEDIATE
              ) {
                //if fresher
                return false
              } else {
                return true
              }
            } else {
              return false
            }
          })
        },
        min_exp: {
          required: requiredIf(function () {
            if (this.publishValidationReq) {
              if (
                this.jobDetails.level == this.job_level.FRESHER ||
                this.jobDetails.level == this.job_level.INTERN
              ) {
                //if fresher
                return false
              } else {
                return true
              }
            } else {
              return false
            }
          })
        },
        level: {
          required: requiredIf(function () {
            return this.publishValidationReq
          })
        },
        employment: {
          required: requiredIf(function () {
            return this.publishValidationReq
          })
        },
        vacancy: {
          required: requiredIf(function () {
            return this.publishValidationReq
          })
        },
        profile_req: {
          required: requiredIf(function () {
            return this.publishValidationReq
          })
        },
        job_description: {
          required: requiredIf(function () {
            return this.publishValidationReq
          })
        },

        contact_email: {
          required: requiredIf(function () {
            if (this.publishValidationReq) {
              if (this.jobDetails.job_application_url.trim() == '') {
                return true
              } else {
                return false
              }
            } else {
              return false
            }
          }),
          email
        },

        contact_mobile: {
          numeric
        },
        valid_till: {
          required: requiredIf(function () {
            return this.publishValidationReq
          })
        },
        company_logo: {
          required: requiredIf(function () {
            return this.publishValidationReq
          })
        },
        attachment_description: {
          required: requiredIf(function () {
            return this.jobDetails.attachment_required
          })
        },
        work_location: {
          required: requiredIf(function () {
            return this.publishValidationReq
          })
        },
        country_code: {
          required: requiredIf(function () {
            return this.jobDetails.contact_mobile
          })
        }
      },
      newLocation: {
        required: requiredIf(function () {
          return this.publishValidationReq
        })
      }
    }
  },
  components: {
    modal,
    Loading,
    Multiselect,
    CreateCompany
  },
  watch: {
    getJobDetails: function (val) {
      this.jobDetails = val
      this.jobDetailsSavedCopy = JSON.parse(JSON.stringify(this.jobDetails))
      this.setSaveButtonText()
      this.setLogosrc(this.jobDetails.company_logo)
    },
    // professional_categories_objArray: function (val) {
    //   if (val.length > 0) {
    //     this.jobDetails.professional_categories = val.map((res) => res.id)
    //     //console.log('str', str)
    //   } else {
    //     this.jobDetails.professional_categories = []
    //   }
    // },
    software: function (val) {
      if (val.length > 0) {
        this.jobDetails.softwares = val.map((res) => res.id)
      } else {
        this.jobDetails.softwares = []
      }
    },
    // sectors_objArray: function (val) {
    //   if (val.length > 0) {
    //     this.jobDetails.sectors = val.map((res) => res.id)
    //   } else {
    //     this.jobDetails.sectors = []
    //   }
    // },
    field_of_study_objArray: function (val) {
      if (val.length > 0) {
        this.jobDetails.field_of_study = val.map((res) => res.id)
      } else {
        this.jobDetails.field_of_study = []
      }
      console.log('val', this.jobDetails.field_of_study)
    },
    interests_objArray: function (val) {
      if (val.length > 0) {
        this.jobDetails.interests = val.map((res) => res.id)
      } else {
        this.jobDetails.interests = []
      }
    },
    language_objArray: function (val) {
      if (val.length > 0) {
        this.jobDetails.languages = val.map((res) => res.id)
      } else {
        this.jobDetails.languages = []
      }
    }
  },
  computed: {
    ...mapGetters([
      'getJobDetails',
      'filteredCountry',
      'filteredState',
      'filteredCities',
      'getProfessionOptions',
      'getLevelOptions',
      'getEmploymentOptions',
      'getJobToEdit',
      'showJobSaveModal',
      'showJobPublishModal',
      'getSectorOptions',
      'getInterestOptions',
      'isAdmin',
      'allCompaniesJob',
      'allCompaniesList',
      'getFieldOfStudy'
    ]),
    ...mapGetters('dropdownValues', [
      'getLanguages',
      'getLocation',
      'filteredCountry',
      'getter_software'
    ]),
    calculateMaxExpValueInMinExpDropdown() {
      //console.log('min exp', this.jobDetails.min_exp)
      // if(this.jobDetails.max_exp)
      //   return parseInt(this.jobDetails.max_exp);
      //   else
      //   return this.maxExperiance;
      return this.maxExperiance
    },
    calculateMinExpValueInMaxExpDropdown() {
      if (this.jobDetails.min_exp) {
        return parseInt(this.jobDetails.min_exp) + 1
      } else {
        return 1
      }
    },

    maxExperianceRange() {
      var array = [],
        j = 0
      for (
        var i = this.calculateMinExpValueInMaxExpDropdown;
        i <= this.maxExperiance;
        i++
      ) {
        array[j] = i
        j++
      }
      return array
    }
  },
  methods: {
    ...mapMutations([
      'setShowJobSaveModal',
      'setShowJobPublishModal',
      'setStateEmpty',
      'setCityEmpty'
    ]),
    ...mapActions([
      'saveJobDetails',
      'updateJobDetails',

      'searchState',
      'searchCity',
      'fetchProfessionData',
      'fetchLevelData',
      'fetchEmploymentData',
      'fetchSectorData',
      'fetchInterestsData',
      'getJobData',
      'updateAndPublishJob',
      'saveAndPublishJob',
      'closeJob',
      'fetchOnlyusersCompanies',
      'searchCompanies',
      'fetchFieldOfStudyList'
    ]),
    ...mapActions('dropdownValues', [
      'fetchLanguages',
      'searchContry',
      'fetchLocationFromCityName',
      'action_getSoftwareDetails'
    ]),
    // ...mapActions('company', ['searchCompany']),
    getFieldOfStudyList(query) {
      //console.log('getFieldOfStudyList', query)
      this.fetchFieldOfStudyList(query).then(() => {
        for (let i = 0; i < this.getFieldOfStudy.length; i++) {
          this.getFilteredFieldOfStudy.push(this.getFieldOfStudy[i]._source)
        }
        // console.log(
        //   ' this.getFilteredFieldOfStudy',
        //   this.getFilteredFieldOfStudy
        // )
      })
    },
    getProfessionList(e, i) {
      let str
      if (e == null || e == undefined) {
        this.jobDetails.professions_filter.splice(i, 1)
        //console.log('sectors_objArray.exp', this.jobDetails.professions_filter)
        return
      } else {
        str = this.professional_categories_objArray[i].id + '_' + e
        this.jobDetails.professions_filter.push(str)
      }
      //console.log('sectors_objArray.exp', this.jobDetails.professions_filter)
    },
    getSectorList(e, i) {
      let str
      if (e == null || e == undefined) {
        this.jobDetails.sectors_filter.splice(i, 1)
        // console.log('sectors_objArray.exp', this.jobDetails.sectors_filter)
        return
      } else {
        str = this.sectors_objArray[i].id + '_' + e
        this.jobDetails.sectors_filter.push(str)
      }
      //console.log('sectors_objArray.exp', this.jobDetails.sectors_filter)
    },
    getExpArray() {
      let arr = []
      for (let i = 0; i < 30; i++) {
        arr.push(i)
      }
      return arr
    },
    onselectSector(val) {
      //console.log('eee', val)
      if (val) {
        this.jobDetails.sectors.push(val.id)
      } else {
        this.jobDetails.sectors = []
      }
      //console.log('sectors', this.jobDetails.sectors)
    },
    onselectProfession(val) {
      //console.log('eee', val)
      if (val) {
        this.jobDetails.professional_categories.push(val.id)
      } else {
        this.jobDetails.professional_categories = []
      }
      //console.log('sectors', this.jobDetails.professional_categories)
    },

    addSoftware() {
      let alreadyAdded = false
      //console.log('this.software', this.software)
      this.softwareArray.map((res) => {
        if (res[0].name == this.software[0].name) {
          alreadyAdded = true
          this.isAlreadyAdded = true
        }
      })
      if (!alreadyAdded) {
        if (this.softwareArray.length < 6) {
          this.softwareArray.push(this.software)
          this.software = []
        } else {
          this.isSoftwareLimitExceed = true
        }
      } else {
        return
      }
    },
    applyFilterOnSoftware(text) {
      this.filteredSoftwares = []
      if (text === undefined || text == '' || text.length < 2) {
        return
      }
      this.action_getSoftwareDetails(text).then(() => {
        this.getSoftwareOptionList()
      })
    },
    getSoftwareOptionList() {
      for (let i = 0; i < this.getter_software.length; i++) {
        this.filteredSoftwares.push(this.getter_software[i]._source)
      }
      //console.log('this.filteredSoftwares', this.filteredSoftwares)
    },

    openAdvancedFilterSector() {
      if (this.displayFilterSector == 'block') {
        this.displayFilterSector = 'none'
      } else {
        this.displayFilterSector = 'block'
      }
    },
    openAdvancedFilter() {
      if (this.displayFilter == 'block') {
        this.displayFilter = 'none'
      } else {
        this.displayFilter = 'block'
      }
    },
    onSelectCompany(company) {
      console.log('name', company)
      this.jobDetails.company = company.name
      this.jobDetails.company_id = company.id
    },
    setCompanyIdToSave(value) {
      this.isShowCompanyTextBox = true
      //console.log('value ', value)
      this.jobDetails.company = value.companyObj.company_name
      this.jobDetails.company_id = value.companyObj.company_id
      // console.log(
      //   'company id',
      //   this.jobDetails.company_id,
      //   'company',
      //   this.jobDetails.company
      // )
    },
    setCompanyDetails(query) {
      //this.allCompaniesList = []
      if (query === undefined || query == '' || query.length < 2) {
        return
      }
      this.searchCompanies(query).then(() => {
        this.companyList = this.allCompaniesList.sort()
        // console.log('event', res)
      })

      // if (singleCompany.status == this.company_status.PUBLISHED) {
      //   this.jobDetails.company = singleCompany.name
      //   this.jobDetails.company_id = singleCompany.id
      //   this.jobDetails.company_logo = singleCompany.logo
      //   this.setCompanyLogo(event)
      // } else {
      //   this.isNotPublishCompanyMessage = `Business webpage is not live for '${singleCompany.name}', you can't post job`
      //   this.jobDetails.company = ''
      //   this.jobDetails.company_id = ''
      //   this.jobDetails.company_logo = ''
      //   this.isNotPublishCompanyModal = true
      // }
    },
    openCreateCompanyForm() {
      this.showCreateCompanyForm = true
    },
    closeCreateCompanyForm() {
      this.showCreateCompanyForm = false
    },
    goToJobHomePage() {
      this.$router.push({ name: appConstants.routes.JOB })
    },
    getProfileReqLength(e) {
      this.remainingProfileReqLength = this.ProfileReqTotalLength - e.length
    },
    getJobDescriptionLength(e) {
      this.remainingJobDescLength = this.JobDescTotalLength - e.length
    },
    getAboutCompanyLength(e) {
      if (e != null) {
        this.remainingAboutCompanyLength =
          this.aboutCompanyTotalLength - e.length
      } else {
        this.remainingAboutCompanyLength = this.aboutCompanyTotalLength
      }
    },
    saveAndPublishJobData() {
      this.submitted = true
      this.publishValidationReq = true
      if (this.$v.jobDetails.$invalid) {
        console.log('Required data')
        return false
      }
      let payload = this.getPayload()
      console.log('payload save and publish', payload)
      if (this.jobDetails.id == '' || this.jobDetails.id == undefined) {
        this.saveAndPublishJob(payload)
      } else {
        this.updateAndPublishJob(payload)
      }
    },
    saveJob() {
      this.submitted = true
      this.publishValidationReq = false
      if (this.$v.jobDetails.$invalid) {
        console.log('Required data')
        return false
      }
      this.addOrUpdateData()
    },

    getPayload() {
      // return dataToSave
      let dataToSave = JSON.stringify(this.jobDetails)
      let json_dataToSave = JSON.parse(dataToSave)
      json_dataToSave.min_exp = parseInt(this.jobDetails.min_exp)
      json_dataToSave.max_exp = parseInt(this.jobDetails.max_exp)
      json_dataToSave.vacancy = parseInt(this.jobDetails.vacancy)

      return json_dataToSave
    },
    addOrUpdateData() {
      let payload = this.getPayload()
      console.log('payload add or update', payload)
      if (this.jobDetails.id == '' || this.jobDetails.id == undefined) {
        this.saveJobDetails(payload)
      } else {
        this.updateJobDetails(payload)
      }
    },

    showModal() {
      this.showCancelModal = true
    },
    hideModal() {
      this.showCancelModal = false
    },
    cancel() {
      this.goToJobHomePage()
    },
    btnCancelClick() {
      if (
        JSON.stringify(this.jobDetails) ===
        JSON.stringify(this.jobDetailsSavedCopy)
      ) {
        this.cancel()
      } else {
        this.showModal()
      }
    },
    btnJobCloselClick() {
      this.closeJob(this.jobDetails.id).then(() => {
        this.showCloseJobModal = true
      })
    },
    hideCloseJobModal() {
      this.showCloseJobModal = false
    },
    jobClose() {
      this.showCloseJobModal = false
    },
    showSaveInfoModal() {
      this.$refs['save-modal'].show()
    },
    hideSaveInfoModel() {
      this.setShowJobSaveModal(false)
    },
    hidePublishInfoModel() {
      this.setShowJobPublishModal(false)
    },

    isLetter(e) {
      // console.log(e)
      let char = String.fromCharCode(e.keyCode)
      if (/^[A-Za-z]+$/.test(char)) {
        return true
      } else {
        e.preventDefault()
      }
    },
    loadDropdownData() {
      this.fetchProfessionData()
      this.fetchLevelData()
      this.fetchEmploymentData()
      this.fetchSectorData()
      this.fetchInterestsData()
      this.fetchLanguages()
    },
    onCountrySelected(item) {
      this.jobDetails.country_code = item.phone_code
    },
    setCountryValue(item, index) {
      if (index != 0) {
        return
      }
      if (item == null) {
        this.jobDetails.country_code = ''

        this.updateJobLocationData('', '', '', '', '', index)
      } else {
        this.jobDetails.country_code = item.phone_code

        this.updateJobLocationData(item.name, item.iso2, '', '', '', index)
      }
      this.setStateEmpty()

      this.setCityEmpty()
    },
    fetchStateValues(text, index) {
      if (text === undefined || text == '') {
        return
      }
      let data = {
        country: this.jobDetails.location[index].country_iso,
        state: text
      }
      this.searchState(data)
    },
    onStateSelected(item, index) {
      this.setStateValues(item, index)
    },
    setStateValues(item, index) {
      this.setStateEmpty()
      this.setCityEmpty()

      if (item != null) {
        this.updateJobLocationData(
          this.jobDetails.location[index].country,
          this.jobDetails.location[index].country_iso,
          item.name,
          item.state_code,
          '',
          index
        )
      } else {
        this.updateJobLocationData(
          this.jobDetails.location[index].country,
          this.jobDetails.location[index].country_iso,
          '',
          '',
          '',
          index
        )
      }
    },
    fetchCitiesValues(text, index) {
      if (text === undefined || text == '') {
        return
      }
      let data = {
        country: this.jobDetails.location[index].country_iso,
        state: this.jobDetails.location[index].state_iso,
        city: text
      }
      this.searchCity(data)
    },
    onCitySelected(item, index) {
      this.setCityValue(item, index)
    },
    setCityValue(item, index) {
      this.setCityEmpty()
      if (item != null) {
        this.updateJobLocationData(
          this.jobDetails.location[index].country,
          this.jobDetails.location[index].country_iso,
          this.jobDetails.location[index].state,
          this.jobDetails.location[index].state_iso,
          item.name,
          index
        )
      } else {
        this.updateJobLocationData(
          this.jobDetails.location[index].country,
          this.jobDetails.location[index].country_iso,
          this.jobDetails.location[index].state,
          this.jobDetails.location[index].state_iso,
          '',
          index
        )
      }
    },
    getLocationData(cityName) {
      this.fetchLocationFromCityName(cityName)
    },
    selectedCity(data) {
      if (data == null) {
        this.jobDetails.location[0].country = ''
        this.jobDetails.location[0].country_iso = ''
        this.jobDetails.location[0].state = ''
        this.jobDetails.location[0].state_iso = ''
        this.jobDetails.location[0].city = ''
      } else {
        this.jobDetails.location[0].country = data.country.name
        this.jobDetails.location[0].country_iso = data.country.iso2
        this.jobDetails.location[0].state = data.state.name
        this.jobDetails.location[0].state_iso = data.state.state_code
        this.jobDetails.location[0].city = data.name //data.name = pune && data.city = pune,maharashtra,india
      }
    },
    fetchCountryValues(text) {
      if (text === undefined) {
        return
      }
      this.searchContry(text)
    },

    MinExpChanged() {
      this.jobDetails.max_exp = '0'
    },
    setSaveButtonText() {
      if (this.jobDetails.id == '' || this.jobDetails.id == undefined) {
        this.saveButtonText = 'Save'
      } else {
        this.saveButtonText = 'Update'
      }
    },
    previewLogo() {
      let logoFile = this.$refs.companyLogo.files[0]
      if (!logoFile) {
        return
      }

      this.isLoading = true
      this.checkIsImageValid(
        appConstants.ACCEPT_IMAGE_TYPE,
        appConstants.imageLogoSize.MAX_SIZE,
        appConstants.imageLogoSize.MAX_WIDTH,
        appConstants.imageLogoSize.MAX_HEIGHT,
        logoFile
      ).then((result) => {
        if (result.isValidImage) {
          this.s3LogoUpload(logoFile)
          this.$refs.companyLogo.value = null
          this.isLoading = false
        } else {
          this.UploadImageError = result.message
          this.showUploadImageError = true
          this.$refs.companyLogo.value = null
          this.isLoading = false
        }
      })
    },

    s3LogoUpload(logoFile) {
      if (logoFile) {
        let imgExt = logoFile.name.substr(logoFile.name.lastIndexOf('.'))
        let fileName = this.$uuid.v1() + imgExt
        this.uploadFileOnS3(
          fileName,
          appConstants.PATH_SAVE_IMAGE_ON_S3,
          logoFile,
          appConstants.IMAGE_CONTENT_TYPE
        )
          .then((data) => {
            this.jobDetails.company_logo = data.savedFileName
            this.company_logoSrc = data.serverFilePath
            this.isLoading = false
          })
          .catch((err) => {
            this.UploadImageError = err
            this.showUploadImageError = true
            this.isLoading = false
          })
      }
    },
    removeLogo() {
      this.$refs.companyLogo.value = ''
      this.company_logoSrc = ''
      this.jobDetails.company_logo = ''
    },
    setLogosrc(logoName) {
      if (logoName == '' || logoName == null) {
        this.company_logoSrc = ''
      } else {
        this.company_logoSrc = `${process.env.VUE_APP_IMGURL}${logoName}`
      }
    },
    hideUploadImageError() {
      this.showUploadImageError = false
      this.UploadImageError = ''
    },
    setMultiSelectFields() {
      // In v1.5.0 profession was string In v1.5.1 it changed to Array[]
      //so check is old version job so string value else array value
      //if array is empty it's new job else old job

      if (
        this.jobDetails.professional_categories == null ||
        this.jobDetails.professional_categories.length == 0
      ) {
        //this is old job
        this.setValueToMiltiSelectDropDown(
          this.getProfessionOptions,
          [this.jobDetails.profession],
          this.professional_categories_objArray,
          'id'
        )
      } else {
        //new job with multiple profession
        this.setValueToMiltiSelectDropDown(
          this.getProfessionOptions,
          this.jobDetails.professional_categories,
          this.professional_categories_objArray,
          'id'
        )
      }
      this.setValueToMiltiSelectDropDown(
        this.getSectorOptions,
        this.jobDetails.sectors,
        this.sectors_objArray,
        'id'
      )
      this.setValueToMiltiSelectDropDown(
        this.getInterestOptions,
        this.jobDetails.interests,
        this.interests_objArray,
        'id'
      )
      this.setValueToMiltiSelectDropDown(
        this.getLanguages,
        this.jobDetails.languages,
        this.language_objArray,
        'id'
      )
      this.setValueToMultiSelectDropDownFieldOfStudy(
        this.getter_software,
        this.jobDetails.softwares,
        this.software,
        'id'
      )
      this.setValueToMultiSelectDropDownFieldOfStudy(
        this.getFieldOfStudy,
        this.jobDetails.field_of_study,
        this.field_of_study_objArray,
        'id'
      )
    },
    setValueToMultiSelectDropDownFieldOfStudy(
      availableOtions,
      selectedID,
      setOptionsObjectTo,
      mapWith
    ) {
      if (selectedID != null) {
        selectedID.map((res) => {
          let selected = res
          availableOtions.filter((options) => {
            if (options._source[mapWith] == selected) {
              setOptionsObjectTo.push(options._source)
              return
            }
          })
        })
      }
    },
    setValueToMiltiSelectDropDown(
      availableOtions,
      selectedID,
      setOptionsObjectTo,
      mapWith
    ) {
      if (selectedID != null) {
        selectedID.map((res) => {
          let selected = res
          availableOtions.filter((options) => {
            if (options[mapWith] == selected) {
              setOptionsObjectTo.push(options)
              return
            }
          })
        })
      }
    },
    addJobLocation() {
      var temp = {
        country: '',
        country_iso: '',
        state: '',
        state_iso: '',
        city: ''
      }
      if (this.jobDetails.location.length > 0) {
        temp.country = this.jobDetails.location[0].country
        temp.country_iso = this.jobDetails.location[0].country_iso
      }

      this.jobDetails.location.push(temp)
    },
    updateJobLocationData(country, country_iso, state, state_iso, city, index) {
      this.jobDetails.location[index].country = country
      this.jobDetails.location[index].country_iso = country_iso
      this.jobDetails.location[index].state = state
      this.jobDetails.location[index].state_iso = state_iso
      this.jobDetails.location[index].city = city
    },
    deleteJobLocation(index) {
      this.jobDetails.location.splice(index, 1)
    },

    levelChanged() {
      if (this.jobDetails.level == this.job_level.JUNIOR) {
        this.isShowStudyFieldDropdown = false
        this.isShowProfesssionSectorDropdown = true
        this.jobDetails.min_exp = '1'
        this.jobDetails.max_exp = '2'
      } else if (this.jobDetails.level == this.job_level.INTERMEDIATE) {
        this.isShowStudyFieldDropdown = false
        this.isShowProfesssionSectorDropdown = true
        this.jobDetails.min_exp = '3'
        this.jobDetails.max_exp = '5'
      } else if (this.jobDetails.level == this.job_level.SENIOR) {
        this.isShowStudyFieldDropdown = false
        this.isShowProfesssionSectorDropdown = true
        this.jobDetails.min_exp = '6'
        this.jobDetails.max_exp = '8'
      } else {
        this.isShowStudyFieldDropdown = true
        this.isShowProfesssionSectorDropdown = false
        this.jobDetails.min_exp = '0'
        this.jobDetails.max_exp = '0'
      }
    },
    chkAttachmentEvent() {
      this.jobDetails.attachment_description = ''
    },
    worktypeChanged(event) {
      if (event == this.work_location.ONSITE) {
        this.isCountry = true
      } else {
        this.isCountry = false
      }
      //console.log('work type', event.target.value)
    }
  },
  created() {
    // this.fetchOnlyusersCompanies().then(() => {
    //   this.companyList = this.allCompaniesJob.sort()
    // })
    if (this.$route.name == appConstants.routes.UPDATE_JOB) {
      if (
        this.getJobToEdit.level == this.job_level.INTERN ||
        this.getJobToEdit.level == this.job_level.FRESHER
      ) {
        this.isShowStudyFieldDropdown = true
        this.isShowProfesssionSectorDropdown = false
      } else {
        this.isShowProfesssionSectorDropdown = true
        this.isShowStudyFieldDropdown = false
      }
      this.jobDetails.level = this.getJobToEdit.level
      this.jobDetails = this.getJobToEdit

      console.log('getJobToEdit', this.getJobToEdit)
      this.isShowCompanyTextBox = true
      this.getJobDescriptionLength(this.jobDetails.job_description)
      this.getProfileReqLength(this.jobDetails.profile_req)
      this.getAboutCompanyLength(this.jobDetails.company_info)
      if (this.jobDetails.is_published) {
        this.pageTitle = 'job Details'
      } else {
        this.pageTitle = 'Update job'
      }
      if (
        this.jobDetails.location == null ||
        this.jobDetails.location.length == 0
      ) {
        this.addJobLocation()
      }
      if (this.jobDetails.location[0].city) {
        this.newLocation = `${this.jobDetails.location[0].city}, ${this.jobDetails.location[0].state}, ${this.jobDetails.location[0].country}`
      }
      // Allow edit published job only to admin
      if (this.jobDetails.is_published) {
        if (this.isAdmin) {
          this.is_disable = false
        } else {
          this.is_disable = true
        }
      } else {
        this.is_disable = false
      }
      // this.createJobLocationArray()
    } else {
      //this.addJobLocation()
    }
    this.loadDropdownData()
    this.setSaveButtonText()
    this.setLogosrc(this.jobDetails.company_logo)
    this.setMultiSelectFields()
    this.jobDetailsSavedCopy = JSON.parse(JSON.stringify(this.jobDetails))
    //this.jobDetails.valid_till = (this.jobDetails.valid_till == "" || this.jobDetails.valid_till == null )? 30 : this.jobDetails.valid_till;
    //let id = this.$route.params.id;
    //this.mainDivClass = `${this.mainDivClass} read-only`
  }
}
</script>

<style scoped>
.urgentdiv.custom-control-label {
  padding-top: 6px;
}

.remainig-text {
  margin-top: -30px;
}
.chkurgent {
  transform: scale(2);
}

.chkWFH,
.chkAttachment {
  transform: scale(1.3);
}

.read-only {
  pointer-events: none;
}

.img-preview {
  margin: 10px 10px;
  width: 100%;
  height: 147px;
  border-radius: 9px;
  object-fit: contain;
}

.locationAddBtn[disabled='disabled'],
.remove-logo[disabled='disabled'] {
  pointer-events: none;
}
.input-capsule {
  border-radius: 24px;
  color: #000;
  background-color: #f2f2f2;
  width: 100%;
  padding: 10px;
}
.v-select {
  margin-bottom: 0 !important;
}
.font-size-16 {
  font-size: 16px !important;
  color: #000;
}
</style>
