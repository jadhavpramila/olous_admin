<template>
  <div>
    <div class="cls-createjob form-conatiner">
      <div class="">
        <!-- <form enctype="multipart/form-data" class="">
          <fieldset> -->
        <div class="d-flex flex-column">
          <div class="main-container mt-0" v-if="userData.is_admin">
            <div class="main-container-header d-flex flex-column">
              <label class="font-weight-700 fontSize18 mb-0"
                >Company Details
              </label>
              <label class="fontSize14"
                >Please enter the basic company details</label
              >
            </div>
            <div class="main-container-body">
              <div class="d-flex row">
                <div class="pr-md-4 col-md-2" v-if="userData.is_admin">
                  <div class="form-group">
                    <div class="" v-cloak>
                      <!-- <label class="">*Company Logo</label> -->
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
                        class=""
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
                        Company <br />
                        Logo
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
                    </div>
                  </div>
                </div>
                <div
                  class="w-100 col-md-12"
                  :class="{ 'col-md-10': userData.is_admin }"
                >
                  <div class="form-group" v-if="userData.is_admin">
                    <label>Company<span class="text-danger">*</span></label>
                    <input
                      type="text"
                      class="form-control input-lg show-placeholder"
                      v-model="jobDetails.company"
                      :class="{
                        'is-invalid':
                          submitted && $v.jobDetails.company.$invalid
                      }"
                    />

                    <div
                      v-if="submitted && !$v.jobDetails.company.required"
                      class="invalid-feedback"
                    >
                      Company name is required
                    </div>
                  </div>
                  <div v-if="!userData.is_admin" class="mt-4">
                    <div class="form-group">
                      <v-select
                        v-model="selectedCompany"
                        label="name"
                        :options="companyList"
                        @input="onSelectCompany($event)"
                        placeholder="Select Company"
                        class="form-control single-value show-dropdown-icon cursor-pointer"
                        :clearable="false"
                        :class="{
                          'is-invalid':
                            submitted && $v.jobDetails.company.$invalid
                        }"
                      >
                      </v-select>
                      <div
                        v-if="submitted && !$v.jobDetails.company.required"
                        class="invalid-feedback"
                      >
                        Company name is required
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="main-container"
            :class="{ 'mt-0': userData.isAdmin == false }"
          >
            <div class="main-container-header d-flex flex-column">
              <label class="font-weight-700 fontSize18 mb-0"
                >Job Details
              </label>
              <label class="fontSize14"
                >Please enter the basic job details</label
              >
            </div>
            <!-- <span class="font-weight-bold fontSize23">
                  {{ pageTitle }}
                </span> -->
            <div class="main-container-body">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>Job Title<span class="text-danger">*</span></label>
                    <input
                      type="text"
                      class="form-control input-lg show-placeholder"
                      v-model="jobDetails.job_title"
                      :class="{
                        'is-invalid':
                          submitted && $v.jobDetails.job_title.$invalid
                      }"
                    />
                    <div
                      v-if="submitted && !$v.jobDetails.job_title.required"
                      class="invalid-feedback"
                    >
                      Title is required
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Level<span class="text-danger">*</span></label>
                    <v-select
                      label="level_name"
                      v-model="jobDetails.level"
                      :options="getLevelOptions"
                      :reduce="(option) => option.id"
                      @input="levelChanged()"
                      class="form-control single-value show-placeholder remove-close-btn show-dropdown-icon"
                      :class="{
                        'is-invalid': submitted && $v.jobDetails.level.$invalid
                      }"
                    />

                    <!-- <select name="level" @change="">
                      <option
                        v-for="item in this."
                        :value="item.id"
                        :key="item.id"
                      >
                        {{ item.level_name }}
                      </option>
                    </select> -->
                    <div
                      v-if="submitted && !$v.jobDetails.level.required"
                      class="invalid-feedback"
                    >
                      Level is required
                    </div>
                  </div>
                </div>
                <div class="col-md-8">
                  <div class="row">
                    <div class="col-md-6 pl-md-0">
                      <div class="form-group">
                        <label
                          >Min. Exp.(year)<span class="text-danger"
                            >*</span
                          ></label
                        >
                        <v-select
                          label="min_exp"
                          v-model="jobDetails.min_exp"
                          :options="maxExperianceRange"
                          @input="MinExpChanged()"
                          class="form-control single-value show-placeholder remove-close-btn show-dropdown-icon"
                          :class="{
                            'is-invalid':
                              submitted && $v.jobDetails.min_exp.$invalid
                          }"
                          :disabled="
                            jobDetails.level == this.job_level.FRESHER ||
                            jobDetails.level == this.job_level.INTERN
                          "
                        />
                        <!-- <select
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
                        </select> -->
                        <div
                          v-if="submitted && !$v.jobDetails.min_exp.required"
                          class="invalid-feedback"
                        >
                          Min. Exp. is required
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6 pl-md-0">
                      <div class="form-group">
                        <label>Max. Exp.(year)</label>
                        <v-select
                          label="max_exp"
                          v-model="jobDetails.max_exp"
                          :options="maxExperianceRange"
                          class="form-control single-value show-placeholder remove-close-btn show-dropdown-icon"
                          :disabled="
                            jobDetails.level == this.job_level.FRESHER ||
                            jobDetails.level == this.job_level.INTERN
                          "
                        />
                        <!-- <select
                          class="form-control input-lg"
                          name="max_exp"
                          v-model="jobDetails.max_exp"
                          :disabled="
                            jobDetails.level == this.job_level.FRESHER ||
                            jobDetails.level == this.job_level.INTERN
                          "
                        >
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
                        </select> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Employment<span class="text-danger">*</span></label>
                    <v-select
                      label="employment_type"
                      v-model="jobDetails.employment"
                      :options="getEmploymentOptions"
                      :reduce="(option) => option.id"
                      class="form-control single-value show-placeholder remove-close-btn show-dropdown-icon"
                      :class="{
                        'is-invalid':
                          submitted && $v.jobDetails.employment.$invalid
                      }"
                    />
                    <!-- <select
                      class="form-control input-lg"
                      name="employment"
                      v-model="jobDetails.employment"
                      :class="{
                        'is-invalid':
                          submitted && $v.jobDetails.employment.$invalid
                      }"
                    >
                      <option
                        class="selectoption"
                        v-for="item in this.getEmploymentOptions"
                        :value="item.id"
                        :key="item.id"
                      >
                        {{ item.employment_type }}
                      </option>
                    </select> -->
                    <div
                      v-if="submitted && !$v.jobDetails.employment.required"
                      class="invalid-feedback"
                    >
                      Employment is required
                    </div>
                  </div>
                </div>
                <div class="col-md-4 pl-md-0">
                  <div class="form-group">
                    <label>Vacancy<span class="text-danger">*</span></label>
                    <v-select
                      label="vacancy"
                      v-model="jobDetails.vacancy"
                      :options="getMaxNoOfVacancy"
                      class="form-control single-value show-placeholder remove-close-btn show-dropdown-icon"
                      :class="{
                        'is-invalid':
                          submitted && $v.jobDetails.vacancy.$invalid
                      }"
                    />
                    <!-- <select
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
                    </select> -->
                    <div
                      v-if="submitted && !$v.jobDetails.vacancy.required"
                      class="invalid-feedback"
                    >
                      Vacancy is required
                    </div>
                  </div>
                </div>
                <div class="col-md-4 pl-md-0">
                  <div class="form-group p-0">
                    <label class="color-black"
                      >Work Location<span class="text-danger">*</span></label
                    >
                    <v-select
                      label="work_location"
                      v-model="jobDetails.work_location"
                      :options="workTypeOptions"
                      :reduce="(option) => option.id"
                      class="form-control single-value show-placeholder remove-close-btn show-dropdown-icon"
                      :class="{
                        'is-invalid':
                          submitted && $v.jobDetails.work_location.$invalid
                      }"
                    />
                    <!-- <select
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
                        v-for="(type, index) in workTypeOptions"
                        :value="type.id"
                        :key="index"
                      >
                        {{ type.value }}
                      </option>
                    </select> -->
                    <div
                      v-if="submitted && !$v.jobDetails.work_location.required"
                      class="invalid-feedback"
                    >
                      Work location is required
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label
                      >Salary
                      <span class="app-secondary-text-color"
                        >(Kindly provide the CTC for candidate's
                        decision-making)</span
                      ></label
                    >

                    <input
                      type="text"
                      placeholder="E.g 5 Lacs Per Annum"
                      class="form-control input-lg show-placeholder"
                      v-model="jobDetails.ctc"
                    />
                  </div>
                </div>
                <div class="col-md-6 pl-md-0">
                  <div class="form-group">
                    <label
                      >Number of days valid till<span class="text-danger"
                        >*</span
                      ></label
                    >
                    <v-select
                      label="daysToExpire"
                      v-model="jobDetails.valid_till"
                      :options="getValidDaysArray"
                      class="form-control single-value show-placeholder remove-close-btn show-dropdown-icon"
                      :class="{
                        'is-invalid':
                          submitted && $v.jobDetails.valid_till.$invalid
                      }"
                    />
                    <!-- <select
                      class="form-control input-lg"
                      name="daysToExpire"
                      v-model="jobDetails.valid_till"
                      :class="{
                        'is-invalid':
                          submitted && $v.jobDetails.valid_till.$invalid
                      }"
                    >
                      <option value>Select</option>
                      <option v-for="n in 30" :value="n.toString()" :key="n">
                        {{ n }}
                      </option>
                    </select> -->
                    <div
                      v-if="submitted && !$v.jobDetails.valid_till.required"
                      class="invalid-feedback"
                    >
                      Number of days valid till is required
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="main-container">
            <div class="main-container-header d-flex flex-column">
              <label class="font-weight-700 fontSize18 mb-0"
                >Location <span class="text-danger">*</span>
              </label>
              <label class="fontSize14">Please select the job location</label>
            </div>
            <div class="main-container-body">
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label class="color-black"
                      >Country<span class="text-danger">*</span></label
                    >
                    <v-select
                      label="name"
                      v-model="jobDetails.location[0].country"
                      :options="filteredCountry[0].data"
                      @search="fetchCountryValues"
                      @input="onCountrySelected($event, 0)"
                      :closeOnSelect="true"
                      @keydown="keyDown($event)"
                      :class="{
                        'is-invalid':
                          submitted && $v.newLocation.country.$invalid
                      }"
                      class="single-value show-placeholder remove-close-btn show-dropdown-icon form-control options-on-search-only"
                    />
                    <div
                      v-if="submitted && !$v.newLocation.country.required"
                      class="invalid-feedback"
                    >
                      Country is required
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label class="color-black"
                      >State<span class="text-danger">*</span></label
                    >
                    <v-select
                      label="state"
                      v-model="jobDetails.location[0].state"
                      :options="filteredState[0].data"
                      @search="fetchStateValues($event, 0)"
                      @input="onStateSelected($event, 0)"
                      :closeOnSelect="true"
                      @keydown="keyDown($event)"
                      :class="{
                        'is-invalid': submitted && $v.newLocation.state.$invalid
                      }"
                      class="single-value show-placeholder remove-close-btn show-dropdown-icon form-control options-on-search-only"
                    />
                    <div
                      v-if="submitted && !$v.newLocation.state.required"
                      class="invalid-feedback"
                    >
                      State is required
                    </div>
                  </div>
                </div>
                <div class="col-md-4 pl-md-0">
                  <div class="form-group">
                    <label class="color-black"
                      >City<span class="text-danger">*</span></label
                    >
                    <v-select
                      label="city"
                      v-model="jobDetails.location[0].city"
                      :options="filteredCities[0].data"
                      @search="fetchCitiesValues($event)"
                      @input="onCitySelected($event, 0)"
                      :closeOnSelect="true"
                      :disabled="jobDetails.location[0].country ? false : true"
                      :class="{
                        'is-invalid': submitted && $v.newLocation.city.$invalid
                      }"
                      class="single-value show-placeholder remove-close-btn show-dropdown-icon form-control options-on-search-only"
                    />
                    <div
                      v-if="submitted && !$v.newLocation.city.required"
                      class="invalid-feedback"
                    >
                      City is required
                    </div>
                  </div>
                </div>
                <div class="col-md-12 mb-2">
                  <label class="checkbox-container fontSize12 font-weight-700"
                    >Check if you want the candidate only from above city
                    <input
                      type="checkbox"
                      name="citycheck"
                      v-model="jobDetails.mandatory_location"
                    />
                    <span class="mark"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div v-if="isShowProfesssionSectorDropdown">
            <JobDropdownComponent
              ref="profession"
              :arrayOfObject="getProfessionOptions"
              :filterArray="jobDetails.professions_filter"
              :Type="1"
              :isShowExperience="true"
              :isShowMustHave="false"
              :isShowInCurrentExperience="false"
              :jobLevel="jobDetails.level"
              :isPublish="publishValidationReq"
              :submitted="submitted"
              :required_max_exp="jobDetails.max_exp"
            ></JobDropdownComponent>
            <JobDropdownComponent
              ref="sector"
              :arrayOfObject="getSectorOptions"
              :filterArray="jobDetails.sectors_filter"
              :Type="2"
              :isShowExperience="true"
              :isShowMustHave="false"
              :isShowInCurrentExperience="false"
              :jobLevel="jobDetails.level"
              :isPublish="publishValidationReq"
              :submitted="submitted"
              :required_max_exp="jobDetails.max_exp"
            ></JobDropdownComponent>
          </div>

          <JobDropdownComponent
            ref="software"
            :arrayOfObject="getter_allSoftwareList"
            :filterArray="jobDetails.softwares"
            :Type="6"
            :isShowExperience="true"
            :isPublish="publishValidationReq"
            :submitted="submitted"
            :jobLevel="jobDetails.level"
            :isShowMustHave="false"
            :isShowInCurrentExperience="false"
            required_max_exp="99"
          ></JobDropdownComponent>

          <!--Languages  -->
          <JobDropdownComponent
            ref="languages"
            :arrayOfObject="getLanguages"
            :filterArray="jobDetails.languages"
            :Type="7"
            :isShowExperience="true"
            :isShowMustHave="false"
            :isShowInCurrentExperience="false"
            required_max_exp="99"
          ></JobDropdownComponent>

          <!-- FIELD AND STUDY -->
          <div class="main-container">
            <div class="main-container-header d-flex flex-column">
              <label class="font-weight-700 fontSize18"
                >Education
                <span class="text-danger">*</span>
              </label>
              <label class="fontSize14"
                >Highest education qualification of candidate</label
              >
            </div>
            <div class="main-container-body">
              <div class="row">
                <div class="col-md-12">
                  <div>
                    <div class="form-group">
                      <label> Level of study </label>
                      <v-select
                        label="name"
                        v-model="selected_level_of_study"
                        :options="getLevelOfStudy"
                        @input="onSelectLevelOfStudy($event)"
                        :closeOnSelect="true"
                        class="single-value show-placeholder remove-close-btn show-dropdown-icon form-control"
                        :class="{
                          'is-invalid':
                            submitted && $v.jobDetails.field_of_study.$invalid
                        }"
                      />

                      <div
                        v-if="
                          submitted && !$v.jobDetails.field_of_study.required
                        "
                        class="invalid-feedback"
                      >
                        <span> Level of study is required</span>
                      </div>
                    </div>
                    <div class="form-group">
                      <label> Field of study </label>
                      <v-select
                        label="name"
                        v-model="selected_field_of_study"
                        :options="getter_fieldOfStudy"
                        @input="onSelectFieldOfStudy($event)"
                        :closeOnSelect="true"
                        class="single-value show-placeholder remove-close-btn show-dropdown-icon form-control"
                        :class="{
                          'is-invalid':
                            submitted && $v.jobDetails.degree.$invalid
                        }"
                        :disabled="
                          jobDetails.field_of_study.length > 0 ? false : true
                        "
                      />

                      <div
                        v-if="submitted && !$v.jobDetails.degree.required"
                        class="invalid-feedback"
                      >
                        <span> Field of study is required</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row ml-3" style="margin-top: 28px">
            <div class="col-md-12 pl-md-0">
              <div class="form-group mb-0">
                <div class="d-flex">
                  <label class="checkbox-container fontSize18 font-weight-700"
                    >Do You Want An Immediate Joiner?
                    <input
                      type="checkbox"
                      @change="setNoticePeriod()"
                      v-model="notice_period"
                      checked="checked"
                    />
                    <span class="mark mt-1"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="main-container">
            <div class="main-container-header d-flex flex-column">
              <label class="font-weight-700 fontSize18 mb-0"
                >Job Description
              </label>
              <label class="fontSize14">Please enter the job description</label>
            </div>
            <div class="main-container-body">
              <div class="row">
                <div class="col-md-12"></div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label class=""
                      >Job Description<span class="text-danger">*</span></label
                    >
                    <b-form-textarea
                      name="job_description"
                      v-model="jobDetails.job_description"
                      cols="40"
                      rows="3"
                      max-rows="5"
                      maxlength="5000"
                      v-on:keyup="getJobDescriptionLength($event.target.value)"
                      class="form-control show-placeholder"
                      style="overflow-y: auto !important"
                      :class="{
                        'is-invalid':
                          submitted && $v.jobDetails.job_description.$invalid
                      }"
                    ></b-form-textarea>

                    <div
                      v-if="
                        submitted && !$v.jobDetails.job_description.required
                      "
                      class="invalid-feedback"
                    >
                      Job Description is required
                    </div>
                  </div>
                </div>
              </div>

              <div class="row" v-if="userData.is_admin">
                <div class="col-md-12">
                  <div class="form-group">
                    <label class="">About Company</label>

                    <b-form-textarea
                      name="about_company"
                      v-model="jobDetails.company_info"
                      cols="40"
                      rows="3"
                      max-rows="5"
                      maxlength="1000"
                      style="overflow-y: auto !important"
                      v-on:keyup="getAboutCompanyLength($event.target.value)"
                      class="form-control show-placeholder"
                    ></b-form-textarea>
                  </div>
                </div>
              </div>
              <div class="row" v-if="userData.is_admin">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>Company Website</label>
                    <input
                      type="text"
                      class="form-control show-placeholder input-lg"
                      v-model="jobDetails.company_website"
                    />
                  </div>
                </div>
              </div>

              <div class="row" v-if="userData.is_admin">
                <div class="col-md-12">
                  <div class="form-group">
                    <label
                      >Job application URL
                      <span class="fontSize12">
                        (Direct link for job application)
                      </span>
                    </label>
                    <input
                      type="text"
                      class="form-control show-placeholder input-lg"
                      v-model="jobDetails.job_application_url"
                      :disabled="
                        jobDetails.isExternalJobWithEmailRedirection
                          ? true
                          : false
                      "
                    />
                    <div class="d-inline-flex">
                      <label
                        class="checkbox-container fontSize12 font-italic font-weight-700"
                        style="margin-top: 10px"
                        >Click for external email jobs.
                        <input
                          type="checkbox"
                          @change="chkAttachmentEvent"
                          v-model="jobDetails.isExternalJobWithEmailRedirection"
                          :disabled="
                            jobDetails.job_application_url ? true : false
                          "
                        />
                        <span class="mark"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="main-container" v-if="userData.is_admin">
            <div class="main-container-header d-flex flex-column">
              <label class="font-weight-700 fontSize18 mb-0"
                >Contact Info
              </label>
              <label class="fontSize14">Please add contact person info </label>
            </div>
            <div class="main-container-body">
              <div v-if="userData.is_admin">
                <div class="form-group mt-2">
                  <label>Name</label>
                  <input
                    type="text"
                    class="form-control show-placeholder input-lg"
                    v-model="jobDetails.contact_name"
                  />
                </div>
                <div class="row form-group">
                  <div class="col-md-5">
                    <div class="form-group">
                      <label>Email<span class="text-danger">*</span></label>
                      <input
                        type="text"
                        class="form-control show-placeholder input-lg"
                        v-model="jobDetails.contact_email"
                        :class="{
                          'is-invalid':
                            submitted && $v.jobDetails.contact_email.$invalid
                        }"
                      />
                      <div
                        v-if="
                          submitted && !$v.jobDetails.contact_email.required
                        "
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
                  <div class="col-md-7 pl-md-0">
                    <div class="form-group">
                      <label>Mobile</label>
                      <div class="row">
                        <div style="" class="col-4">
                          <v-select
                            v-model="jobDetails.country_code"
                            label="name"
                            :options="filteredCountry[0].data"
                            @search="fetchCountryValues"
                            @input="onCountrySelected($event)"
                            class="form-control remove-dropdown-icon options-on-search-only"
                            :class="{
                              'is-invalid':
                                submitted && $v.jobDetails.country_code.$invalid
                            }"
                            disabled
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
                        <div style="" class="col-8 pl-0">
                          <input
                            type="text"
                            class="form-control show-placeholder input-lg"
                            v-model="jobDetails.contact_mobile"
                            :class="{
                              'is-invalid':
                                submitted &&
                                $v.jobDetails.contact_mobile.$invalid
                            }"
                          />
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
              </div>
            </div>
          </div>
          <div class="main-container" v-if="isContactInfoVisibleForNonAdmin()">
            <div class="main-container-header d-flex flex-column">
              <label class="font-weight-700 fontSize18 mb-0"
                >Contact Info
              </label>
              <label class="fontSize14">Please add contact person info </label>
            </div>
            <div class="main-container-body">
              <div v-if="!userData.is_admin">
                <!-- <div class="font-weight-700 fontSize16 mt-3">Contact Info</div> -->
                <div class="form-group mt-2" v-if="!userData.first_name">
                  <label>Name</label>
                  <input
                    type="text"
                    class="form-control show-placeholder input-lg"
                    v-model="jobDetails.contact_name"
                  />
                </div>
                <div class="row form-group" v-if="!hasEmail()">
                  <div class="col-md-5">
                    <div class="form-group">
                      <label>Email<span class="text-danger">*</span></label>
                      <input
                        type="text"
                        class="form-control show-placeholder input-lg"
                        v-model="jobDetails.contact_email"
                        :class="{
                          'is-invalid':
                            submitted && $v.jobDetails.contact_email.$invalid
                        }"
                      />
                      <div
                        v-if="
                          submitted && !$v.jobDetails.contact_email.required
                        "
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
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- </fieldset> -->

        <div class="mb-3 mt-4 d-flex p-0">
          <div class="col-4 p-0">
            <div>
              <button
                v-if="jobDetails.is_published"
                type="button"
                class="btn"
                @click="btnJobCloselClick"
              >
                Close Job
              </button>
            </div>
          </div>
          <div class="col-8 d-flex justify-content-end text-right p-0">
            <button type="button" class="btn" @click="btnCancelClick">
              Cancel
            </button>
            <button type="button" class="btn ml-2" @click="saveJob()">
              {{ this.saveButtonText }}
            </button>
            <button
              type="button"
              class="btn ml-2"
              @click="saveAndPublishJobData()"
              v-if="!jobDetails.is_published"
            >
              Publish
            </button>
          </div>
        </div>
        <!-- </form> -->
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

    <modal v-if="showJobSaveModal" @closeModal="hideSaveInfoModel">
      <div slot="body">{{ this.saveMessage }}</div>
    </modal>

    <modal v-if="showJobPublishModal" @closeModal="hidePublishInfoModel">
      <div slot="body">{{ this.publishMessage }}</div>
    </modal>

    <modal v-if="showUploadImageError" @closeModal="hideUploadImageError">
      <div slot="body">{{ this.UploadImageError }}</div>
    </modal>

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
      </b-modal>
    </template>
    <template>
      <b-modal
        :visible="isShowInfo"
        size="md"
        ref="image-modal"
        hide-footer
        hide-header
        :centered="true"
        :modal-class="contactModal"
        @close="closeInfo"
      >
        <div class="d-block text-left">
          {{ helpInfo }}
        </div>
        <div class="d-flex justify-content-center">
          <b-button
            class="mt-3 btn"
            variant="outline-dark"
            block
            @click="closeInfo"
            >Ok</b-button
          >
        </div>
      </b-modal>
    </template>
    <template>
      <b-modal
        :visible="isMandatoryFieldsRemaining"
        size="sm"
        ref="image-modal"
        hide-footer
        hide-header
        :centered="true"
        @close="closeMandatoryField"
      >
        <div class="d-block text-left">Please Fill all mandatory fields</div>
        <div class="d-flex justify-content-center">
          <b-button
            class="mt-3 btn"
            variant="outline-dark"
            block
            @click="closeMandatoryField"
            >Ok</b-button
          >
        </div>
      </b-modal>
    </template>
    <template>
      <b-modal
        id="ErrorModalUser"
        :visible="showJobErrorModalUser"
        @close="hideErrorModel"
        hide-footer
        hide-header
        :centered="true"
        size="md"
      >
        <div class="d-block text-left">{{ this.jobapiUserErrorMessage }}</div>
        <div class="d-flex justify-content-end mt-4">
          <b-button variant="outline-danger" @click="hideErrorModel">
            Cancel
          </b-button>
          <b-button
            class="ml-2 btn"
            variant="outline-dark"
            @click="goToPricingPage"
          >
            Buy Now
          </b-button>
        </div>
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
import JobDropdownComponent from '../common/JobDropdownComponent.vue'
import '../../assets/css/appcolor.css'
// import md5 from 'js-md5'

export default {
  name: 'Createjob',
  mixins: [imageCheck, uploadFileOnS3],
  data() {
    return {
      workTypeOptions: [
        { id: '1', work_location: 'Office' },
        { id: '2', work_location: 'Onsite' },
        { id: '3', work_location: 'Work From Home' }
      ],
      appConstantsNoticePeriod: appConstants.NOTICE_PERIOD,
      jobDetails: {
        id: '',
        company: '',
        company_id: '',
        company_info: '',
        company_website: '',
        job_title: '',
        professional_categories: [],
        sectors: [],
        interests: [],
        softwares: [],
        certificates: [],
        level: '',
        min_exp: '0',
        max_exp: '0',
        employment: '2',
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
        isStrictProfessions: false,
        isStrictSectors: false,
        isExternalJobWithEmailRedirection: false,
        sectors_filter: [],
        professions_filter: [],
        field_of_study: [],
        degree: [],
        mandatory_location: false,
        max_exp_sectors: 0,
        max_exp_prof: 0,
        notice_period: appConstants.NOTICE_PERIOD.DAYS_30,
        isStrictSoftware: false,
        max_exp_software: 0,
        isStrictLanguage: false,
        max_exp_language: 0,
        lang_fluency: 0,

        max_exp_fieldofstudy: 0,
        isStrictFieldOfStudy: false,
        max_exp_certification: 0,
        isStrictCertification: false
      },
      lang_fluency_array: [
        {
          name: 'Beginner',
          id: appConstants.Language_Fluency.BEGINNER
        },
        {
          name: 'Intermediate',
          id: appConstants.Language_Fluency.INTERMEDIATE
        },
        {
          name: 'Fluent',
          id: appConstants.Language_Fluency.FLUENT
        }
      ],
      notice_period: false,
      noticePeroidArray: [
        {
          name: 'Any',
          value: appConstants.NOTICE_PERIOD.ANY
        },
        {
          name: 'Immediate',
          value: appConstants.NOTICE_PERIOD.IMMEDIATE
        },
        {
          name: '15 Days',
          value: appConstants.NOTICE_PERIOD.DAYS_15
        },
        {
          name: '30 Days',
          value: appConstants.NOTICE_PERIOD.DAYS_30
        },
        {
          name: '45 Days',
          value: appConstants.NOTICE_PERIOD.DAYS_45
        },
        {
          name: '60 Days',
          value: appConstants.NOTICE_PERIOD.DAYS_60
        },
        {
          name: '75 Days',
          value: appConstants.NOTICE_PERIOD.DAYS_75
        },
        {
          name: '90 Days',
          value: appConstants.NOTICE_PERIOD.DAYS_90
        }
      ],
      Language_Fluency: appConstants.Language_Fluency,
      notice_period_obj: '',
      newLocation: {
        country: '',
        state: '',
        city: ''
      },
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
      // mainDivClass: 'form-inputs align-items-center',
      mainDivClass: 'align-items-center',
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
      showCloseJobModal: false,
      displayProfessionsAndExp: [],
      displaySectorsAndExp: [],
      certification: '',
      maxNumberOfLocation: 4,
      is_disable: false,
      job_level: appConstants.job_level,
      work_location: appConstants.WORK_LOCATION,
      showCreateCompanyForm: false,
      isShowCompanyTextBox: false,
      companyList: [],
      getFilteredFieldOfStudy: [],
      companyDetails: '',
      displayFilterSector: 'none',
      // isShowStudyFieldDropdown: false,
      isShowProfesssionSectorDropdown: false,
      selected_level_of_study: [],
      selected_field_of_study: [],
      filteredSoftwares: [],
      software: [],
      softwareArray: [],
      isSoftwareLimitExceed: false,
      isAlreadyAdded: false,
      isShowMaxLimitExtendMessage: false,
      isShowAlreadyAddedProfession: false,
      isShowAlreadyAddedSector: false,
      isShowMaxLimitExtendMessageSector: false,
      isShowAlreadyAddedSoftware: false,
      isShowMaxLimitExtendMessageSoftware: false,
      isShowAlreadyAddedLanguage: false,
      isShowMaxLimitExtendMessageLanguage: false,
      isShowMaxLimitExtendMessageField: false,
      isShowAlreadyAddedField: false,
      isShowAlreadyAddedCertificate: false,
      isShowMaxLimitExtendMessageCertificate: false,
      isShowInfo: false,
      helpInfo: '',
      contactModal: ['contactModal'],
      selectedCompany: '',
      isMandatoryFieldsRemaining: false
    }
  },

  validations() {
    return {
      jobDetails: {
        company: { required },
        job_title: { required },

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

        job_description: {
          required: requiredIf(function () {
            return this.publishValidationReq
          })
        },

        contact_email: {
          required: requiredIf(function () {
            if (this.publishValidationReq) {
              if (this.jobDetails.job_application_url.trim() == '') {
                if (!this.hasEmail()) {
                  return true
                } else {
                  return false
                }
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

        work_location: {
          required: requiredIf(function () {
            return this.publishValidationReq
          })
        },
        country_code: {
          required: requiredIf(function () {
            return this.jobDetails.contact_mobile
          })
        },
        field_of_study: {
          required: requiredIf(function () {
            return this.publishValidationReq
          })
        },
        degree: {
          required: requiredIf(function () {
            return this.publishValidationReq
          })
        },
        softwares: {
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
        sectors_filter: {
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
        professions_filter: {
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
        }
      },
      newLocation: {
        country: {
          required: requiredIf(function () {
            return this.publishValidationReq
          })
        },
        state: {
          required: requiredIf(function () {
            return this.publishValidationReq
          })
        },
        city: {
          required: requiredIf(function () {
            return this.publishValidationReq
          })
        }
      }
    }
  },
  components: {
    modal,
    Loading,
    // eslint-disable-next-line vue/no-unused-components
    Multiselect,
    CreateCompany,
    JobDropdownComponent
  },
  watch: {
    getJobDetails: function (val) {
      this.jobDetails = val
      this.jobDetailsSavedCopy = JSON.parse(JSON.stringify(this.jobDetails))
      this.setSaveButtonText()
      this.setLogosrc(this.jobDetails.company_logo)
    },
    interests_objArray: function (val) {
      if (val.length > 0) {
        this.jobDetails.interests = val.map((res) => res.id)
      } else {
        this.jobDetails.interests = []
      }
    }
  },
  computed: {
    ...mapGetters([
      'getJobDetails',
      'getLevelOptions',
      'getEmploymentOptions',
      'getJobToEdit',
      'showJobSaveModal',
      'showJobPublishModal',

      'getInterestOptions',
      'isAdmin',
      'allCompaniesList',
      'userData',
      'allCompanies',
      'getAllFieldOfStudy',
      'showJobErrorModalUser',
      'jobapiUserErrorMessage'
    ]),
    ...mapGetters('dropdownValues', [
      'getLanguages',
      'getLocation',
      'filteredCountry',
      'filteredState',
      'filteredCities',
      'getProfessionOptions',
      'getCitiesFromCountry',
      'getter_software',
      'getter_softwareListNames',
      'getter_allSoftwareList',
      'getSectorOptions',
      'getLevelOfStudy',
      'getter_fieldOfStudy'
    ]),
    calculateMaxExpValueInMinExpDropdown() {
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
    },
    getMaxNoOfVacancy() {
      var array = []
      // j = 0
      for (var i = 1; i <= this.maxnumberOfVacancy; i++) {
        array[i] = i
      }
      return array
    },
    getValidDaysArray() {
      var array = []
      // j = 0
      for (var i = 1; i <= 30; i++) {
        array[i] = i
      }
      return array
    }
  },
  methods: {
    ...mapMutations([
      'setShowJobSaveModal',
      'setShowJobPublishModal',
      'setStateEmpty',
      'setCityEmpty',
      'setJobErrorMsgToFalse',
      'updateShowJobSaveModal'
    ]),
    ...mapMutations('dropdownValues', ['setFieldOfStudy']),
    ...mapActions([
      'saveJobDetails',
      'updateJobDetails',
      'publishJob',
      'fetchProfessionData',
      'fetchLevelData',
      'fetchEmploymentData',
      'fetchSectorData',
      'fetchInterestsData',
      'getJobData',
      'updateAndPublishJob',
      'saveAndPublishJob',
      'closeJob',
      'searchCompanies',
      'saveSelectedCompany'
    ]),
    ...mapActions('dropdownValues', [
      'fetchLanguages',
      'searchContry',
      'searchState',
      'searchCity',
      'fetchLocationFromCityName',
      'action_getSoftwareDetails',
      'action_getSoftwareNameWithID',
      'searchCityFromCountry',
      'action_getFieldOfStudy'
    ]),

    goToJobHomePage() {
      //this.$router.push({ name: 'jobList' })
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
    setCommonComponentData() {
      if (
        this.jobDetails.level == this.job_level.JUNIOR ||
        this.jobDetails.level == this.job_level.INTERMEDIATE ||
        this.jobDetails.level == this.job_level.SENIOR
      ) {
        let professionData = this.$refs.profession.$data
        let sectorData = this.$refs.sector.$data
        if (professionData) {
          this.jobDetails.professional_categories = professionData.array_of_ids
          this.jobDetails.professions_filter =
            professionData.final_array_of_objects
        }
        if (sectorData) {
          this.jobDetails.sectors = sectorData.array_of_ids
          this.jobDetails.sectors_filter = sectorData.final_array_of_objects
        }
      }

      if (this.$refs.software.$data) {
        let softwareData = this.$refs.software.$data
        if (softwareData) {
          this.jobDetails.software = softwareData.array_of_ids
          this.jobDetails.softwares = softwareData.final_array_of_objects
        }
      }
      if (this.$refs.languages.$data) {
        let langaugeData = this.$refs.languages.$data

        if (langaugeData) {
          //json_dataToSave.professional_categories = langaugeData.array_of_ids
          this.jobDetails.languages = langaugeData.final_array_of_objects
        }
      }
    },
    async saveAndPublishJobData() {
      this.setCommonComponentData()
      this.submitted = true
      this.publishValidationReq = true
      this.$v.$touch()

      if (this.$v.jobDetails.$invalid || this.$v.newLocation.$invalid) {
        this.isMandatoryFieldsRemaining = true
        return false
      }

      //this.setCountryStateCity()
      let payload = this.getPayload()
      //console.log('payload', payload)
      if (this.jobDetails.id == '' || this.jobDetails.id == undefined) {
        this.saveJobDetails(payload).then((res) => {
          // console.log('res', res)
          this.publishJob(res.id)
        })
      } else {
        this.updateAndPublishJob(payload)
      }
    },

    saveJob() {
      this.setCommonComponentData()
      this.submitted = true
      this.publishValidationReq = false
      // console.log(JSON.stringify(this.jobDetails))
      if (this.$v.jobDetails.$invalid) {
        this.isMandatoryFieldsRemaining = true
        console.log('Required data')
        return false
      }
      // this.setCountryStateCity()
      this.addOrUpdateData()
    },

    getPayload() {
      // return dataToSave
      let dataToSave = JSON.stringify(this.jobDetails)
      let json_dataToSave = JSON.parse(dataToSave)
      // json_dataToSave.employment = parseInt(this.jobDetails.employment)
      json_dataToSave.min_exp = parseInt(this.jobDetails.min_exp)
      json_dataToSave.max_exp = parseInt(this.jobDetails.max_exp)
      json_dataToSave.vacancy = parseInt(this.jobDetails.vacancy)

      if (!this.userData.is_admin) {
        json_dataToSave['contact_name'] = this.userData.first_name
        let useremail = this.userData.email
        if (!useremail) {
          useremail = this.userData.cv_email
        }
        json_dataToSave['contact_email'] = useremail
      }

      return json_dataToSave
    },
    addOrUpdateData() {
      let payload = this.getPayload()
      //console.log('payload', payload)
      if (this.jobDetails.id == '' || this.jobDetails.id == undefined) {
        this.saveJobDetails(payload).then(() => {
          this.updateShowJobSaveModal()
          this.saveMessage = 'Job details saved successfully'
        })
      } else {
        this.updateJobDetails(payload)
      }
    },
    closeMandatoryField() {
      this.isMandatoryFieldsRemaining = false
    },
    showModal() {
      //this.$refs['cancel-modal'].show()
      this.showCancelModal = true
    },
    hideModal() {
      // this.$refs['cancel-modal'].hide()
      this.showCancelModal = false
    },
    cancel() {
      this.goToJobHomePage()
    },
    btnCancelClick() {
      //this.setCountryStateCity()
      // if (
      //   JSON.stringify(this.jobDetails) ===
      //   JSON.stringify(this.jobDetailsSavedCopy)
      // ) {
      this.cancel()
      // } else {
      //   this.showModal()
      // }
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
      //this.popupMessage = msgTodiaplay;
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

    onCountrySelected(item, index) {
      this.setCountryValue(item, index)
      this.jobDetails.country_code = item.phone_code
    },
    keyDown(e) {
      if (e.keyCode == 38) {
        this.prev().focus()
      }
      if (e.keyCode == 40) {
        this.next().focus()
      }
    },
    setCountryValue(item, index) {
      if (index != 0) {
        return
      }

      if (item == null) {
        this.jobDetails.location[0].country = ''
        this.jobDetails.location[0].country_iso = ''
        this.jobDetails.country_code = ''

        this.updateJobLocationData('', '', '', '', '', index)
      } else {
        this.jobDetails.location[0].country = item.name
        this.jobDetails.location[0].country_iso = item.iso2
        this.jobDetails.country_code = item.phone_code

        this.updateJobLocationData(item.name, item.iso2, '', '', '', index)
      }

      this.setStateEmpty()
      this.state = ''
      this.state_iso = ''

      this.city = ''
      this.setCityEmpty()
    },
    fetchCitiesValues(text) {
      if (
        ((text === undefined || text == '') &&
          this.jobDetails.location[0].country_iso === undefined) ||
        this.jobDetails.location[0].country_iso == ''
      ) {
        return
      } else {
        if (this.jobDetails.location[0].country_iso) {
          let data = {
            country: this.jobDetails.location[0].country_iso,
            state: this.jobDetails.location[0].state_iso,
            city: text
          }
          // this.searchCityFromCountry(data)
          this.searchCity(data)
        } else {
          this.isCountryNotSelected = true
        }
      }
    },
    onCitySelected(item, index) {
      this.setCityValue(item, index)
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
          item.state,
          item.state_iso,
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
    setCityValue(item, index) {
      // this.newLocation = item.name
      this.setCityEmpty()
      if (item != null) {
        this.updateJobLocationData(
          this.jobDetails.location[index].country,
          this.jobDetails.location[index].country_iso,
          this.jobDetails.location[index].state,
          this.jobDetails.location[index].state_iso,
          item.city,
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
      //console.log('data', data)
      if (data == null) {
        this.jobDetails.location[0].country = ''
        this.jobDetails.location[0].country_iso = ''
        this.jobDetails.location[0].state = ''
        this.jobDetails.location[0].state_iso = ''
        this.jobDetails.location[0].city = ''
        // this.jobDetails.location = ''
      } else {
        this.jobDetails.location[0].country = data.country.name
        this.jobDetails.location[0].country_iso = data.country.iso2
        this.jobDetails.location[0].state = data.state.name
        this.jobDetails.location[0].state_iso = data.state.state_code
        this.jobDetails.location[0].city = data.name //data.name = pune && data.city = pune,maharashtra,india
        // this.jobDetails.location = data.displayName
      }
    },
    fetchCountryValues(text) {
      if (text === undefined) {
        return
      }
      this.searchContry(text)
    },

    MinExpChanged() {
      console.log('in min exp changed', this.jobDetails.min_exp)
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
          // console.log('valid image')
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
      }
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
    },
    setFieldOfStudyDropDown(
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
              //console.log('setOptionsObjectTo', setOptionsObjectTo)
              return
            }
          })
        })
      }
    },
    setValueToMultiSelectDropDownSoftware(
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
              //console.log('setOptionsObjectTo', setOptionsObjectTo)
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

      this.newLocation.country = country
      this.newLocation.state = state
      this.newLocation.city = city
    },
    deleteJobLocation(index) {
      this.jobDetails.location.splice(index, 1)
    },

    levelChanged() {
      console.log('in level changed', this.jobDetails.level)
      if (this.jobDetails.level == this.job_level.JUNIOR) {
        // this.isShowStudyFieldDropdown = false
        this.isShowProfesssionSectorDropdown = true
        this.jobDetails.min_exp = '1'
        this.jobDetails.max_exp = '2'
      } else if (this.jobDetails.level == this.job_level.INTERMEDIATE) {
        // this.isShowStudyFieldDropdown = false
        this.isShowProfesssionSectorDropdown = true
        this.jobDetails.min_exp = '3'
        this.jobDetails.max_exp = '5'
      } else if (this.jobDetails.level == this.job_level.SENIOR) {
        // this.isShowStudyFieldDropdown = false
        this.isShowProfesssionSectorDropdown = true
        this.jobDetails.min_exp = '6'
        this.jobDetails.max_exp = '8'
      } else if (this.jobDetails.level == this.job_level.FRESHER) {
        // this.isShowStudyFieldDropdown = true
        this.isShowProfesssionSectorDropdown = false
        this.jobDetails.min_exp = '0'
        this.jobDetails.max_exp = '1'
      } else {
        // this.isShowStudyFieldDropdown = true
        this.isShowProfesssionSectorDropdown = false
        this.jobDetails.min_exp = '0'
        this.jobDetails.max_exp = '0'
      }
    },
    chkAttachmentEvent() {
      this.jobDetails.attachment_description = ''
    },
    openInfo(index) {
      if (index == 0) {
        this.helpInfo =
          'Please list any supporting Document/ Portfolio that you need applying  candidate to append to its application, other than CV.'
      } else if (index == 1) {
        this.helpInfo =
          'Use this tab as an Advance filter to list minimum experience required for any particular profession, if different from required total experience.'
      } else if (index == 2) {
        this.helpInfo =
          'Use this tab as an Advance filter to list minimum experience required for any particular sector, if different from required total experience.'
      }

      this.isShowInfo = true
    },
    closeInfo() {
      this.isShowInfo = false
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
    },
    onSelectCompany(company) {
      //console.log('name', company)
      this.jobDetails.company = company.name
      this.jobDetails.company_id = company.id
      if (company.logo) {
        this.jobDetails.company_logo = company.logo
      } else {
        this.jobDetails.company_logo = ''
      }
    },
    setNoticePeriod() {
      if (this.notice_period) {
        this.jobDetails.notice_period = appConstants.NOTICE_PERIOD.IMMEDIATE
      } else {
        this.jobDetails.notice_period = appConstants.NOTICE_PERIOD.DAYS_30
      }
    },
    OnselectNoticePeriod(e) {
      this.jobDetails.notice_period = e.value
    },
    setCompanyIdToSave(value) {
      this.isShowCompanyTextBox = true
      //console.log('value ', value)
      this.jobDetails.company = value.companyObj.company_name
      this.jobDetails.company_id = value.companyObj.company_id
    },
    openCreateCompanyForm() {
      this.showCreateCompanyForm = true
    },
    closeCreateCompanyForm() {
      this.showCreateCompanyForm = false
    },

    onselectSector(val) {
      if (val) {
        this.jobDetails.sectors.push(val.id)
      } else {
        this.jobDetails.sectors = []
      }
    },
    getExpArray() {
      let arr = []
      for (let i = 1; i < 30; i++) {
        arr.push(i)
      }
      return arr
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
        //console.log('sectors_objArray.exp', this.jobDetails.sectors_filter)
        return
      } else {
        str = this.sectors_objArray[i].id + '_' + e
        this.jobDetails.sectors_filter.push(str)
      }
      //console.log('sectors_objArray.exp', this.jobDetails.sectors_filter)
    },
    openAdvancedFilterSector() {
      if (this.displayFilterSector == 'block') {
        this.displayFilterSector = 'none'
      } else {
        this.displayFilterSector = 'block'
      }
    },

    onSelectLevelOfStudy(val) {
      console.log('value', val)
      if (val) {
        this.jobDetails.field_of_study = []
        let obj = {
          name: val.name,
          experience: 0,
          id: val.id,
          is_mandatory: this.jobDetails.isStrictFieldOfStudy
        }
        this.jobDetails.field_of_study.push(obj)
      } else {
        this.jobDetails.field_of_study = []
      }

      this.selected_field_of_study = []
      this.jobDetails.degree = []
      this.fetchFieldOfStudy()
      // console.log('value', this.jobDetails.field_of_study)
    },
    onSelectFieldOfStudy(val) {
      console.log('value', val)
      if (val) {
        this.jobDetails.degree = []
        let obj = {
          name: val.name,
          id: val.id,
          level_id: val.degree_master_category_id
        }
        this.jobDetails.degree.push(obj)
      } else {
        this.jobDetails.degree = []
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
    },
    getProfessionText(id) {
      //let selected = res
      this.getProfessionOptions.filter((options) => {
        if (options['id'] == id) {
          return
        }
      })
    },
    setAdvancedFilterProfession() {
      var array = this.jobDetails.professions_filter
      let newArr = []
      let availableopt = this.getProfessionOptions

      for (let i = 0; i < array.length; i++) {
        var arr1 = {}

        let obj = array[i].split('_')

        availableopt.filter((options) => {
          if (options['id'] == obj[0]) {
            arr1.name = options.display_string
            arr1.id = options.id
            return
          }
        })

        arr1.exp = obj[1]

        newArr.push(arr1)
      }
      this.displayProfessionsAndExp = newArr
    },
    setAdvancedFilterSectors() {
      var array = this.jobDetails.sectors_filter
      let newArr = []
      let availableopt = this.getSectorOptions

      for (let i = 0; i < array.length; i++) {
        var arr1 = {}

        let obj = array[i].split('_')

        availableopt.filter((options) => {
          if (options['id'] == obj[0]) {
            arr1.name = options.display_string
            arr1.id = options.id
            return
          }
        })

        arr1.exp = obj[1]

        newArr.push(arr1)
      }
      this.displaySectorsAndExp = newArr
    },

    fetchFieldOfStudy() {
      if (this.jobDetails.field_of_study.length > 0) {
        let data = {
          query_string: this.jobDetails.field_of_study[0].id
        }
        this.action_getFieldOfStudy(data)
      } else {
        let data = {
          query_string: ''
        }
        this.action_getFieldOfStudy(data)
      }
    },
    hideErrorModel() {
      this.setJobErrorMsgToFalse(false)
    },
    goToPricingPage() {
      this.setJobErrorMsgToFalse(false)
      this.$router.push({ name: appConstants.routes.JOB_PRICING })
    },
    hasEmail() {
      if (this.userData.cv_email != '' || this.userData.email != '') {
        return true
      } else {
        return false
      }
    },
    isContactInfoVisibleForNonAdmin() {
      if (!this.userData.is_admin) {
        if (!this.userData.first_name || !this.hasEmail()) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    }
  },
  created() {
    if (this.userData.is_admin === false) {
      this.companyList = this.allCompanies.sort()
      if (!this.getSelectedCompany && this.selectedCompany == '') {
        this.saveSelectedCompany(this.companyList[0].id)
        this.selectedCompany = this.companyList[0].name
        this.jobDetails.company = this.companyList[0].name
        this.jobDetails.company_id = this.companyList[0].id
        if (this.companyList[0].logo) {
          this.jobDetails.company_logo = this.companyList[0].logo
        } else {
          this.jobDetails.company_logo = ''
        }
      } else {
        this.selectedCompany = this.getSelectedCompany
      }
    }
    if (this.$route.name == appConstants.routes.UPDATE_JOB) {
      if (this.userData.is_admin === false) {
        this.selectedCompany = this.getJobToEdit.company
      }
      if (
        this.getJobToEdit.notice_period == appConstants.NOTICE_PERIOD.IMMEDIATE
      ) {
        this.notice_period = true
      } else {
        this.notice_period = false
      }
      this.professional_categories_objArray = []
      this.jobDetails.level = this.getJobToEdit.level
      this.jobDetails = this.getJobToEdit
      if (
        this.getJobToEdit.level == this.job_level.INTERN ||
        this.getJobToEdit.level == this.job_level.FRESHER
      ) {
        // this.isShowStudyFieldDropdown = true
        this.isShowProfesssionSectorDropdown = false
      } else {
        this.isShowProfesssionSectorDropdown = true
      }

      this.selected_level_of_study = this.getJobToEdit.field_of_study
      this.selected_field_of_study = this.getJobToEdit.degree
      this.fetchFieldOfStudy()

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
        this.newLocation.country = this.jobDetails.location[0].country
        this.newLocation.state = this.jobDetails.location[0].state
        this.newLocation.city = this.jobDetails.location[0].city
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
    this.setSaveButtonText()
    this.setLogosrc(this.jobDetails.company_logo)
    this.jobDetailsSavedCopy = JSON.parse(JSON.stringify(this.jobDetails))
    this.jobDetails.valid_till =
      this.jobDetails.valid_till == '' || this.jobDetails.valid_till == null
        ? 30
        : this.jobDetails.valid_till
    //let id = this.$route.params.id;
    //this.mainDivClass = `${this.mainDivClass} read-only`

    this.setFieldOfStudy([])
  }
}
</script>

<style scoped>
.job-button {
  width: 98px;
  height: 32px;
  border-radius: 8px;
  background-color: #ffe8d6;
  border: none !important;
  font-size: 14px;
  font-weight: 600;
  color: #000;
}
.job-button:hover {
  background-color: var(--app-primary-color);
  color: #fff;
}
.job-button:active {
  background-color: var(--app-primary-color);
}
.bg-gold {
  background-color: #f5cb39 !important;
  color: #000;
}
.bullets {
  display: list-item;
  margin-left: 20px;
}
/* .form-conatiner {
  margin-top: 20px;
} */
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
input[type='checkbox']:checked ~ {
  background-color: #000;
}
.read-only {
  pointer-events: none;
}
textarea {
  overflow-y: auto !important;
  -ms-overflow-style: auto !important;
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
</style>
