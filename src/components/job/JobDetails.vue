<template>
  <div>
    <div class="form-conatiner cls-jobdetails">
      <!-- <div>
        <h1 class="fontSize20 color-black font-weight-bold">Job Details</h1>
      </div> -->
      <div class="col-12 col-md-12">
        <div class="job-details row p-0" v-if="getter_singleJobDetails">
          <div class="d-flex col-2 col-md-1 pl-0 pl-0 py-0 pr-1">
            <div v-if="getter_singleJobDetails.company_logo">
              <img
                class="job_image"
                :src="setCompanyLogo(getter_singleJobDetails.company_logo)"
              />
            </div>

            <div v-else class="d-flex w-75">
              <img class="" src="../../assets/img/Job-List-Dummy-Logo.svg" />
            </div>
          </div>
          <div class="col-8 col-md-5 pl-0 d-md-flex">
            <div class="d-flex flex-column w-100">
              <span class="job-title font-weight-700">
                <!-- <b>Job Title</b> :  -->
                {{ getter_singleJobDetails.job_title }}</span
              >
              <span class="fontSize14 font-weight-500">
                <!-- <b>Company</b> :  -->
                {{ getter_singleJobDetails.company }}
              </span>
              <span
                class="fontSize14 font-weight-400"
                v-if="
                  getter_singleJobDetails.country &&
                  getter_singleJobDetails.city
                "
              >
                {{ getLocation() }}</span
              >
              <small class="fontSize14 font-weight-400"
                >Min {{ getter_singleJobDetails.min_exp }} yrs - Max
                {{ getter_singleJobDetails.max_exp }} yrs |
                {{ setEmployment(getter_singleJobDetails.employment) }} |
                {{ getter_singleJobDetails.vacancy }} Position
              </small>
              <!-- <small
                class="fontSize12 font-light"
                v-if="getter_singleJobDetails.no_of_applicants <= 1"
                >{{ getter_singleJobDetails.no_of_applicants }} Applicant</small
              >
              <small class="fontSize12 font-light" v-else
                >{{
                  getter_singleJobDetails.no_of_applicants
                }}
                Applicants</small
              > -->
            </div>
            <div
              class="d-flex flex-column align-items-md-end justify-content-md-end w-25"
              v-if="getter_singleJobDetails.no_of_applicants > 0"
            >
              <div>
                <h5 class="mb-0" @click="viewJobDetails($event)">
                  <!-- <span
                    class="btn-link fontSize14 font-weight-bold cursor-pointer align-items-center d-flex"
                    data-toggle="collapse"
                    data-target="#uniqueId"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  > -->
                  <span
                    class="cursor-pointer fontSize12 font-weight-700 app-primary-text-color"
                    >Job Details</span
                  >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="10"
                    class="down-arrow"
                  >
                    <path
                      d="M9.211364 7.59931l4.48338-4.867229c.407008-.441854.407008-1.158247 0-1.60046l-.73712-.80023c-.407008-.441854-1.066904-.441854-1.474243 0L7 5.198617 2.51662.33139c-.407008-.441853-1.066904-.441853-1.474243 0l-.737121.80023c-.407008.441854-.407008 1.158248 0 1.600461l4.48338 4.867228L7 10l2.211364-2.40069z"
                    ></path>
                  </svg>
                  <!--  </span>-->
                </h5>
              </div>
            </div>
          </div>
          <div
            class="col-2 col-md-6 d-flex flex-column justify-content-between pr-0"
          >
            <div class="d-flex justify-content-end">
              <div
                v-if="
                  getter_singleJobDetails.no_of_applicants == 0 ||
                  getter_singleJobDetails.no_of_applicants == null
                "
              >
                <img
                  class="cursor-pointer image-icon"
                  @click="setDataOneditJob(getter_singleJobDetails)"
                  title="Edit job"
                  src="../../assets/img/Edit-Job.svg"
                />
              </div>

              <div>
                <img
                  class="cursor-pointer ml-2 image-icon"
                  @click="showDeleteConfirmationModal(getter_singleJobDetails)"
                  src="../../assets/img/Delete-Job.svg"
                  title="Delete job"
                />
              </div>
            </div>

            <div class="d-flex flex-row align-items-end justify-content-end">
              <div class="">
                <!-- <button
                  v-if="
                    getSingleApplicantData &&
                    getSingleApplicantData.applicant_details.cover_note
                  "
                  class="job-btn"
                  @click="viewCoverNote()"
                >
                  Cover Note
                </button> -->
                <!-- <span
                  v-if="
                    getSingleApplicantData &&
                    getSingleApplicantData.applicant_details.attcahment_file
                  "
                  class="fontSize14 font-weight-700 cursor-pointer ml-2"
                  @click="downloadAttachmentPDF(getSingleApplicantData)"
                >
                  <img
                    src="../../assets/img/Attachement-Job.svg"
                    alt="Download"
                    title="Download Attachment"
                    class="image-icon"
                  />
                </span> -->
              </div>

              <!-- <div
                class="d-flex justify-content-between"
                v-if="
                  getSingleApplicantData &&
                  getSingleApplicantData.applicant_details.application_status ==
                    applicationStatus.ACCEPTED
                "
              >
                <span
                  class="fontSize14 font-weight-700 cursor-pointer"
                  @click="copyLink(getSingleApplicantData)"
                >
                  <img
                    src="../../assets/img/Copy-Link-Job.svg"
                    alt="Download"
                    title="Copy Link"
                    class="image-icon"
                  />
                </span>
                <span
                  class="fontSize14 font-weight-700 cursor-pointer mx-1"
                  @click="downloadCVPDF(getSingleApplicantData)"
                >
                  <img
                    src="../../assets/img/Download-Job.svg"
                    alt="Download"
                    title="Download CV"
                    class="image-icon"
                  />
                </span>

                <span
                  class="fontSize14 font-weight-700 cursor-pointer"
                  @click="clickContact()"
                >
                  <img
                    src="../../assets/img/Contact-Job.svg"
                    alt=""
                    title="View Conatct"
                    class="image-icon"
                  />
                </span>
              </div> -->
              <!-- <div
                class="d-flex"
                v-if="
                  getSingleApplicantData &&
                  (getSingleApplicantData.applicant_details
                    .application_status == applicationStatus.OPEN ||
                    getSingleApplicantData.applicant_details
                      .application_status == applicationStatus.UNDER_REVIEW)
                "
              >
                <button
                  class="job-btn d-flex align-items-center justify-content-center w-100"
                  @click="clickAccept(applicationStatus.ACCEPTED)"
                >
                  <img
                    src="../../assets/img/Accept-Application.svg"
                    alt=""
                    class="mr-1"
                  />
                  Accept
                </button>

                <button
                  class="job-btn ml-3 d-flex align-items-center justify-content-center w-100"
                  @click="clickAccept(applicationStatus.REJECTED)"
                >
                  <img
                    src="../../assets/img/Reject-Application.svg"
                    alt=""
                    class="mr-1"
                  />
                  Reject
                </button>
              </div> -->
            </div>
          </div>
        </div>
      </div>
      <div class="position-relative">
        <div class="d-flex" v-if="getter_singleJobDetails.no_of_applicants > 0">
          <div class="pr-md-2 max-width-applicant-column">
            <!-- <Applicant></Applicant> -->
            <div
              class="mb-0 px-2 align-items-center justify-content-between d-flex tab-list"
            >
              <ul class="d-flex pl-0 mb-0 w-100" style="list-style: none">
                <li class="ml-1">
                  <span
                    class="media-tab"
                    @click="clickApplicants"
                    :class="{
                      'media-tab-active':
                        getCurrentJobDetailsButtonValue.isApplicants
                    }"
                  >
                    Applicants
                  </span>
                </li>
                <!-- <li class="ml-2 mr-2">
                  <span
                    type="button"
                    class="job-list-button"
                    @click="clickRecommendations"
                    :class="{
                      'job-list-button-active':
                        getCurrentJobDetailsButtonValue.isRecommendations
                    }"
                  >
                    Recommendations
                  </span>
                </li> -->
              </ul>
              <div class="align-items-center d-flex justify-content-end w-100">
                <span
                  class="pr-0 fontSize12 w-25 text-right mt-1 app-primary-text-color"
                  >Sort By</span
                >
                <!-- <select
                  class="select-sort single-value show-placeholder"
                  name="Vacancy"
                  v-model="applicantsSort"
                  @change="sortBy($event)"
                >
                  <option value="0" default selected>Latest</option>
                  <option
                    v-for="n in sortingOptionsArray"
                    :value="n.value"
                    :key="n.value"
                  >
                    {{ n.label }}
                  </option>
                </select> -->
                <v-select
                  v-model="applicantsSort"
                  label="label"
                  :options="sortingOptionsArray"
                  class="select-sort single-value show-placeholder"
                  @input="sortBy($event)"
                  :clearable="false"
                  :single-line="false"
                  :searchable="false"
                  style="width: 40% !important; margin: 0 !important"
                >
                  <!-- <template #option="{ value, label }">
                    <input type="checkbox" :value="value" />
                    {{
                      label
                    }}:dropdown-should-open="dropdownShouldOpen"applicant-cv-div
                  </template> -->
                </v-select>
              </div>
            </div>
            <div class="applicant-cv-div applicant-container-body border-0">
              <div class="applicants-list">
                <div
                  v-infinite-scroll="getApplicantsList"
                  infinite-scroll-disabled="busy"
                  infinite-scroll-distance="80"
                >
                  <div
                    class="row ml-0"
                    style="
                      column-width: 264.5px !important;
                      column-gap: 20px !important;
                    "
                  >
                    <div
                      v-for="(applicant, index) in getApplicants"
                      :key="index"
                      class="p-0"
                    >
                      <JobCardComponentVue
                        :jobData="applicant"
                        :type="componentDataType.APPLICANT"
                        :uniqueId="getUniqueId(index)"
                        :uniqueIdHeader="getUniqueIdHeader(index)"
                        @applicant_changed="saveSingleApplicant"
                      ></JobCardComponentVue>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="pl-md-1 max-width-report-column">
            <div class="d-flex justify-content-between notice-period">
              <div class="ml-2 d-flex flex-column">
                <span
                  v-if="
                    getSingleApplicantData &&
                    getSingleApplicantData.applicant_details.cover_note
                  "
                  class="text-hover"
                  @click="viewCoverNote()"
                >
                  Cover Note
                </span>
                <span
                  class="fontSize12 font-weight-500"
                  v-if="
                    getSingleApplicantData &&
                    getSingleApplicantData.applicant_details.notice_period !=
                      null
                  "
                >
                  Notice Period :
                  {{
                    setApplicatsNoticePeriod(
                      getSingleApplicantData.applicant_details.notice_period
                    )
                  }}
                </span>
              </div>
              <div class="mr-1">
                <div
                  class="d-flex"
                  v-if="
                    getSingleApplicantData &&
                    (getSingleApplicantData.applicant_details
                      .application_status == applicationStatus.OPEN ||
                      getSingleApplicantData.applicant_details
                        .application_status == applicationStatus.UNDER_REVIEW)
                  "
                >
                  <button
                    class="btn d-flex align-items-center justify-content-center"
                    @click="clickAccept(applicationStatus.ACCEPTED)"
                  >
                    <!-- <img
                      src="../../assets/img/Accept-Application.svg"
                      alt=""
                      class="mr-1"
                    /> -->
                    <!-- <i class="fa fa-check"></i> -->
                    Accept
                  </button>

                  <button
                    class="btn ml-3 d-flex align-items-center justify-content-center"
                    @click="clickAccept(applicationStatus.REJECTED)"
                  >
                    <!-- <img
                      src="../../assets/img/Reject-Application.svg"
                      alt=""
                      class="mr-1"
                    /> -->
                    <!-- <i class="fa fa-times" aria-hidden="true"></i> -->
                    Reject
                  </button>
                </div>
                <div
                  class="d-flex justify-content-between"
                  v-if="
                    getSingleApplicantData &&
                    getSingleApplicantData.applicant_details
                      .application_status == applicationStatus.ACCEPTED
                  "
                >
                  <!-- <span
                    class="fontSize14 font-weight-700 cursor-pointer"
                    @click="copyLink(getSingleApplicantData)"
                  >
                    <img
                      src="../../assets/img/Copy-Link-Job.svg"
                      alt="Download"
                      title="Copy Link"
                      class="image-icon"
                    />
                  </span>
                  <span
                    class="fontSize14 font-weight-700 cursor-pointer mx-1"
                    @click="downloadCVPDF(getSingleApplicantData)"
                  >
                    <img
                      src="../../assets/img/Download-Job.svg"
                      alt="Download"
                      title="Download CV"
                      class="image-icon"
                    />
                  </span> -->
                  <span
                    class="fontSize14 font-weight-700 cursor-pointer mr-2"
                    @click="downloadAttachmentPDF(getSingleApplicantData)"
                  >
                    <img
                      src="../../assets/img/download_attachment_icon.svg"
                      alt="Download"
                      title="Download Attachment"
                      class="image-icon"
                    />
                  </span>

                  <span
                    class="fontSize14 font-weight-700 cursor-pointer"
                    @click="clickContact()"
                  >
                    <img
                      src="../../assets/img/Contact-Job.svg"
                      alt=""
                      title="View Conatct"
                      class="image-icon"
                    />
                  </span>
                </div>
              </div>
            </div>

            <!-- <div class="pl-2">
                <div
                  class="ml-2"
                  v-if="
                    getSingleApplicantData &&
                    getSingleApplicantData.applicant_details.notice_period !=
                      null &&
                    getSingleApplicantData.applicant_details.notice_period == 0
                  "
                >
                  <span class="fontSize12 font-weight-700">
                    Notice Period :
                    {{
                      setApplicatsNoticePeriod(
                        getSingleApplicantData.applicant_details.notice_period
                      )
                    }}
                  </span>
                </div>
              </div> -->
            <div class="applicant-cv-div">
              <div
                class="bg-white rounded-lg ml-2 d-flex flex-column p-3 mr-1"
                style="
                  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                  border: solid 1px #d8d8d8;
                "
              >
                <div class="d-flex flex-column">
                  <div class="d-flex justify-content-between">
                    <span
                      class="app-primary-text-color line-height1 font-weight-700 fontSize15 ml-2 mt-2"
                    >
                      CV Match <br />
                      Report
                    </span>
                    <div v-if="isMatchingPdfReportIsAvailable()">
                      <Donut
                        v-if="getSingleApplicantData"
                        :data="
                          getSingleApplicantData.applicant_details
                            .match_percentage_absolute
                        "
                      ></Donut>
                    </div>
                    <div v-else>
                      <Donut
                        v-if="getSingleApplicantData"
                        :data="
                          getSingleApplicantData.applicant_details
                            .match_percentage
                        "
                      ></Donut>
                    </div>
                  </div>

                  <div
                    v-if="isMatchingPdfReportIsAvailable()"
                    :key="getRandomStr()"
                    class="d-flex justify-content-between"
                  >
                    <div class="d-flex">
                      <div class="legend-size legend-div-green"></div>
                      <div class="fontSize13 ml-1">Best Fit(80-100)</div>
                    </div>

                    <div class="d-flex">
                      <div class="legend-size legend-div-orange"></div>
                      <div class="fontSize13 ml-1">Close Fit(60- 79)</div>
                    </div>

                    <div class="d-flex">
                      <div class="legend-size legend-div-red"></div>
                      <div class="fontSize13 ml-1">Not Fit(below 59)</div>
                    </div>
                  </div>

                  <!-- <span
                    v-if="
                      getSingleApplicantData &&
                      !isMatchingPdfReportIsAvailable()
                    "
                    class="ml-2"
                  >
                    <span
                      class="text-success fontSize14 font-weight-700"
                      v-if="
                        getSingleApplicantData.applicant_details
                          .mandatory_requirements_satisfied == reportType.MATCH
                      "
                      >Candidate fulfils all the must have requirements.
                    </span>
                    <span
                      class="text-red fontSize14 font-weight-700"
                      v-if="
                        getSingleApplicantData.applicant_details
                          .mandatory_requirements_satisfied ==
                        reportType.NOMATCH
                      "
                      >Candidate does not fulfil all the must have requirements.
                    </span>
                  </span> -->
                </div>
                <div
                  v-if="isMatchingPdfReportIsAvailable()"
                  :key="getRandomStr()"
                >
                  <!-- <JobMatchingReport
                    :application_obj="getSingleApplicantData.applicant_details"
                  ></JobMatchingReport> -->
                </div>
                <div
                  v-else
                  v-for="(report, index) in getApplicationReportDetails"
                  :key="index"
                >
                  <ApplicantCVReport :data="report"></ApplicantCVReport>
                </div>
              </div>
              <div
                v-if="isMatchingPdfReportIsAvailable()"
                :key="getRandomStr()"
                class="ml-1"
              >
                <JobMatchingReport
                  :application_obj="getSingleApplicantData.applicant_details"
                ></JobMatchingReport>
              </div>
              <div class="applicant-details" v-if="getSingleApplicantData">
                <div class="d-flex flex-column pt-2">
                  <span
                    class="text-center text-danger"
                    v-if="isShowCvErrorMessage"
                    >CV file not available</span
                  >
                  <div class="" v-if="cvImageList.length > 0" :key="resumeKey">
                    <div
                      class="mb-2 ml-2 mr-1 mt-1"
                      v-for="(image, index) in cvImageList"
                      :key="index"
                    >
                      <img
                        :src="getImages(image)"
                        alt="cvimage"
                        width="100%"
                        height="100%"
                        class="cv-image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="bg-white d-flex flex-column mt-5 p-4 round-corner"
          v-if="
            getter_singleJobDetails.no_of_applicants == 0 ||
            getter_singleJobDetails.no_of_applicants == null
          "
        >
          <div class="d-flex flex-column">
            <h1 class="fontSize14 color-black font-weight-bold">
              Job Description :-
            </h1>
            <p
              class="job-description"
              v-html="
                setJobDescription(getter_singleJobDetails.job_description)
              "
            ></p>
          </div>
          <!-- <div class="d-flex flex-column">
            <h1 class="fontSize14 color-black font-weight-bold">
              Profile Requirment :-
            </h1>
            <p
              class="job-description"
              v-html="setProfileRequirment(getter_singleJobDetails.profile_req)"
            ></p>
          </div> -->

          <div
            class="d-flex flex-column"
            v-if="getter_singleJobDetails.sectors_filter.length > 0"
          >
            <h1 class="fontSize14 color-black font-weight-bold">Sectors :-</h1>
            <p class="job-description">
              {{ getSectorsList(getter_singleJobDetails.sectors_filter) }}
            </p>
          </div>
          <div
            class="d-flex flex-column"
            v-if="getter_singleJobDetails.professions_filter.length > 0"
          >
            <h1 class="fontSize14 color-black font-weight-bold">
              Professions :-
            </h1>
            <p class="job-description">
              {{
                getProfessionsList(getter_singleJobDetails.professions_filter)
              }}
            </p>
          </div>
          <div
            class="d-flex flex-column"
            v-if="getter_singleJobDetails.softwares.length > 0"
          >
            <h1 class="fontSize14 color-black font-weight-bold">
              Softwares :-
            </h1>
            <p class="job-description">
              {{ getSoftwareList(getter_singleJobDetails.softwares) }}
            </p>
          </div>
          <div
            class="d-flex flex-column"
            v-if="getter_singleJobDetails.field_of_study.length > 0"
          >
            <h1 class="fontSize14 color-black font-weight-bold">
              Field Of Study :-
            </h1>
            <p class="job-description">
              {{ getFieldOfStudyList(getter_singleJobDetails.field_of_study) }}
              -
              {{ getDegreeList(getter_singleJobDetails.degree) }}
            </p>
          </div>
        </div>
      </div>
      <!-- <div
        id="uniqueId"
        class="collapse fontSize12 job-description-collapse"
        aria-labelledby="headingOne"
        data-parent="#accordion"
      >
        <div class="d-flex flex-column">
          <h1 class="fontSize14 color-black font-weight-bold">
            Job Description :-
          </h1>
          <p
            class="job-description"
            v-html="setJobDescription(getter_singleJobDetails.job_description)"
          ></p>
        </div>
        <div class="d-flex flex-column">
          <h1 class="fontSize14 color-black font-weight-bold">
            Profile Requirment :-
          </h1>
          <p
            class="job-description"
            v-html="setProfileRequirment(getter_singleJobDetails.profile_req)"
          ></p>
        </div>

        <div
          class="d-flex flex-column"
          v-if="getter_singleJobDetails.sectors.length > 0"
        >
          <h1 class="fontSize14 color-black font-weight-bold">Sectors :-</h1>
          <p class="job-description">{{ sectors }}</p>
        </div>
        <div
          class="d-flex flex-column"
          v-if="getter_singleJobDetails.professional_categories.length > 0"
        >
          <h1 class="fontSize14 color-black font-weight-bold">
            Professions :-
          </h1>
          <p class="job-description">{{ professions }}</p>
        </div>
      </div> -->
    </div>
    <b-modal
      ref="JobDetails"
      hide-footer
      hide-header
      :modal-class="contactModal"
      :centered="true"
      size="lg"
    >
      <div class="d-flex flex-column">
        <h1 class="fontSize14 color-black font-weight-bold">
          Job Description :-
        </h1>
        <p
          class="job-description"
          v-html="setJobDescription(getter_singleJobDetails.job_description)"
        ></p>
      </div>
      <!-- <div class="d-flex flex-column">
        <h1 class="fontSize14 color-black font-weight-bold">
          Profile Requirment :-
        </h1>
        <p
          class="job-description"
          v-html="setProfileRequirment(getter_singleJobDetails.profile_req)"
        ></p>
      </div> -->

      <div
        class="d-flex flex-column"
        v-if="getter_singleJobDetails.sectors_filter.length > 0"
      >
        <h1 class="fontSize14 color-black font-weight-bold">Sectors :-</h1>
        <p class="job-description">
          {{ getSectorsList(getter_singleJobDetails.sectors_filter) }}
        </p>
      </div>
      <div
        class="d-flex flex-column"
        v-if="getter_singleJobDetails.professions_filter.length > 0"
      >
        <h1 class="fontSize14 color-black font-weight-bold">Professions :-</h1>
        <p class="job-description">
          {{ getProfessionsList(getter_singleJobDetails.professions_filter) }}
        </p>
      </div>
      <div
        class="d-flex flex-column"
        v-if="getter_singleJobDetails.softwares.length > 0"
      >
        <h1 class="fontSize14 color-black font-weight-bold">Softwares :-</h1>
        <p class="job-description">
          {{ getSoftwareList(getter_singleJobDetails.softwares) }}
        </p>
      </div>
      <div
        class="d-flex flex-column"
        v-if="getter_singleJobDetails.field_of_study.length > 0"
      >
        <h1 class="fontSize14 color-black font-weight-bold">
          Field Of Study :-
        </h1>
        <p class="job-description">
          {{ getFieldOfStudyList(getter_singleJobDetails.field_of_study) }}
          -
          {{ getDegreeList(getter_singleJobDetails.degree) }}
        </p>
      </div>
      <b-button
        class="mt-3 w-auto btn"
        variant="outline-dark"
        block
        @click="hideJobDetails"
        >Close</b-button
      >
    </b-modal>

    <b-modal
      ref="coverNote"
      hide-footer
      hide-header
      :modal-class="contactModal"
      :centered="true"
    >
      <div class="d-block text-left" v-if="getSingleApplicantData">
        <span
          class="fontSize14 font-weight-400"
          v-html="
            getCoverNote(getSingleApplicantData.applicant_details.cover_note)
          "
        ></span>

        <!-- <iframe
          id="here"
          src="https://forms.olous.app/enquire/"
          style="width: 100%; height: 310px; border: none"
        ></iframe> -->
      </div>
      <b-button class="mt-3 btn" variant="outline-dark" block @click="hideModal"
        >Close</b-button
      >
    </b-modal>
    <b-modal
      ref="resumeUrlmodal"
      hide-footer
      hide-header
      :centered="true"
      :modal-class="contactModal"
    >
      <div class="d-block text-center">
        <span class="fontSize14 font-weight-400">
          Link copied to Clipboard. <br />(This link will be live for 7 days)
        </span>
      </div>
      <div class="d-flex justify-content-center">
        <b-button
          class="mt-3 btn"
          variant="outline-dark"
          block
          @click="hideResumeUrlModal"
          >Ok</b-button
        >
      </div>
    </b-modal>
    <b-modal
      ref="contacts"
      hide-footer
      hide-header
      :modal-class="contactModal"
      :centered="true"
    >
      <div class="d-block text-left">
        <h1 class="fontSize16 font-weight-700">Contacts</h1>
        <div class="d-flex flex-column">
          <a
            :href="`tel:${getUserContactDetails.cv_phone}`"
            class="fontSize14 text-dark text-decoration-none"
            ><img src="../../assets/img/Call.svg" alt="call" />{{
              getUserContactDetails.cv_phone
            }}</a
          >
          <a
            :href="`mailto:${getUserContactDetails.cv_email}`"
            class="fontSize14 text-dark text-decoration-none"
          >
            <img src="../../assets/img/Email.svg" alt="email" />{{
              getUserContactDetails.cv_email
            }}</a
          >
        </div>
      </div>
      <b-button
        class="mt-3 btn"
        variant="outline-dark"
        block
        @click="hideContacts"
        >Close</b-button
      >
    </b-modal>
    <modal v-if="showDeleteModal" @closeModal="hideDeleteConfirmationModal">
      <div slot="body">{{ deleteOrCloseJobMessage }}</div>
      <div slot="footer" class="d-flex">
        <b-button
          class="btn"
          variant="outline-dark"
          @click="hideDeleteConfirmationModal"
        >
          No
        </b-button>
        <b-button class="ml-2 btn" variant="outline-dark" @click="jobdelete">
          Yes
        </b-button>
      </div>
    </modal>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import appConstants from '../../appConstants.js'
// import {
//   getProfessionValues,
//   getSectorValues
// } from '../../common/js/getValuesFromIds.js'
//import Applicant from './Applicant-Copy.vue'
import {
  getRandomString,
  copyTextToClipboard
} from '../../common/js/commonFunctions.js'
import modal from '../../common/Modal'
import ApplicantCVReport from '../../components/job/applicantsCVReport.vue'
import Donut from '../common/Donut.vue'
import JobCardComponentVue from './JobComponent/JobCardComponent.vue'
//import Applicant from './Applicant.vue'
import JobMatchingReport from './JobMatchingReport.vue'

export default {
  name: 'JobDetails',
  components: {
    //Applicant,
    modal,
    ApplicantCVReport,
    Donut,
    // Applicant
    JobCardComponentVue,
    JobMatchingReport
  },
  data() {
    return {
      componentDataType: appConstants.component_data_type,
      jobDetails: [],
      companyList: [],
      sectors: '',
      professions: '',
      currentPage: 0,
      hasMoreJobs: 1,
      deleteJobId: '',
      busy: false,
      selectedCompany: '',
      showDeleteModal: false,
      jobId: '',
      isRecommendations: false,
      isApplicants: true,
      cvImageList: [],
      applicationStatus: appConstants.Application_Status,
      isShowCoverNote: false,
      isShowDownLoadCvButton: false,
      isShowCvErrorMessage: false,
      resumeKey: '',
      ApplicantsSortType: appConstants.Applicants_Sort,
      applicantsSort: {
        label: 'Latest',
        value: appConstants.Applicants_Sort.CREATED_DATE
      },
      sortingOptionsArray: [
        {
          label: 'Latest',
          value: appConstants.Applicants_Sort.CREATED_DATE
        },
        {
          label: 'Top Match',
          value: appConstants.Applicants_Sort.TOPMATCH
        },
        {
          label: 'Accepted',
          value: appConstants.Applicants_Sort.ACCEPTED
        },
        {
          label: 'Rejected',
          value: appConstants.Applicants_Sort.REJECTED
        }
      ],
      resumeUrl: '',
      isShow: true,
      contactModal: ['contactModal'],
      variants: [
        'primary',
        'secondary',
        'success',
        'warning',
        'danger',
        'info',
        'light',
        'dark'
      ],
      bodyBgVariant: 'warning',
      deleteOrCloseJobMessage: '',
      reportType: appConstants.Report
    }
  },

  computed: {
    ...mapGetters([
      'getApplicants',
      'getSingleJobDetails',
      'getEmploymentOptions',
      'getCurrentJobDetailsButtonValue',
      'getSingleApplicantData',
      'getCVImageList',
      'getApplicationStatus',
      'getUserContactDetails',
      'getter_singleJobDetails',
      'getResumeUrl',
      'getApplicationReportDetails'
    ])
  },
  methods: {
    ...mapMutations('dropdownValues', ['setSoftwareListwithId']),
    ...mapMutations([
      'setCvImages',
      'setSingleApplicantData',
      'setApplicants',
      'setApplcationReportOfJob'
    ]),
    ...mapActions([
      'fetchApplicants',
      'fetchPDFFile',
      'fetchEmploymentData',
      'saveCurrentJobDetailsButtonValue',
      'saveSingleApplicantData',
      'fetchCvImages',
      'saveApplicationStatus',
      'fetchUserContactDetails',
      'fetchSingleJobDetails',
      'fetchUserResumeUrl',
      'editJob',
      'deleteJob',
      'closeJob',
      'fetchCVReportDetails'
    ]),
    dropdownShouldOpen(VueSelect) {
      return VueSelect.open
    },
    copyLink(data) {
      let id = data.applicant_details.id
      this.fetchUserResumeUrl(id).then(() => {
        this.resumeUrl = this.getResumeUrl.share_url
        let result = copyTextToClipboard(this.resumeUrl)
        if (result) {
          this.$refs['resumeUrlmodal'].show()
        }
      })
    },
    hideResumeUrlModal() {
      this.$refs['resumeUrlmodal'].hide()
    },
    clickContact() {
      this.fetchUserContactDetails(
        this.getSingleApplicantData.applicant_details.applicant
      )
      this.$refs['contacts'].show()
    },
    hideContacts() {
      this.$refs['contacts'].hide()
    },
    clickApplicants() {
      this.currentPage = 0
      this.hasMoreJobs = 1
      this.getCurrentJobDetailsButtonValue.job_id = this.jobId
      this.getCurrentJobDetailsButtonValue.isApplicants = true
      this.getCurrentJobDetailsButtonValue.isRecommendations = false
    },
    clickRecommendations() {
      this.currentPage = 0
      this.hasMoreJobs = 1
      this.getCurrentJobDetailsButtonValue.job_id = this.jobId
      this.getCurrentJobDetailsButtonValue.isApplicants = false
      this.getCurrentJobDetailsButtonValue.isRecommendations = true
    },
    getUniqueId(index) {
      let uniqueId = 'applicant_container' + index
      return uniqueId
    },
    getUniqueIdHeader(index) {
      let uniqueId = 'applicant_container_header' + index
      return uniqueId
    },
    getCoverNote(cover_note) {
      return cover_note.replace(/\n/g, '<br />')
    },
    hideModal() {
      this.$refs['coverNote'].hide()
    },
    viewCoverNote() {
      if (
        this.getSingleApplicantData &&
        this.getSingleApplicantData.applicant_details.cover_note
      ) {
        this.$refs['coverNote'].show()
      }
    },
    viewJobDetails() {
      this.$refs['JobDetails'].show()
    },
    hideJobDetails() {
      this.$refs['JobDetails'].hide()
    },
    setEmployment(type) {
      for (let i = 0; i < this.getEmploymentOptions.length; i++) {
        if (this.getEmploymentOptions[i].id == type) {
          return this.getEmploymentOptions[i].employment_type
        }
      }
    },
    setCompanyLogo(logo) {
      let logoUrl = ''
      // if (logo == '' || logo == null) {
      //   logoUrl = '../../assets/img/Job-List-Dummy-Logo.svg'
      // } else {
      logoUrl = `${process.env.VUE_APP_IMGURL}${logo}`
      //}
      return logoUrl
    },
    setArrow(event) {
      console.log('event', event)
    },
    // async setSectors(sectorArray) {
    //   this.sectors = await getSectorValues(sectorArray)
    // },
    // async setProfessions(professionArray) {
    //   this.professions = await getProfessionValues(professionArray)
    // },
    getSectorsList(sectors) {
      if (sectors.length > 0) {
        var result = sectors
          .map(function (e) {
            return e.name
          })
          .join(', ')

        return result
      }
    },
    getProfessionsList(profession) {
      if (profession.length > 0) {
        var result = profession
          .map(function (e) {
            return e.name
          })
          .join(', ')

        return result
      }
    },
    getSoftwareList(software) {
      if (software.length > 0) {
        var result = software
          .map(function (e) {
            return e.name
          })
          .join(', ')

        return result
      }
    },
    getFieldOfStudyList(field) {
      if (field.length > 0) {
        var result = field
          .map(function (e) {
            return e.name
          })
          .join(', ')

        return result
      }
    },
    getDegreeList(field) {
      if (field.length > 0) {
        var result = field
          .map(function (e) {
            return e.name
          })
          .join(', ')

        return result
      }
    },
    setProfileRequirment(requirment) {
      return requirment.replace(/(\n){1,}/g, '<br />')
    },
    setJobDescription(description) {
      //let desc = description.replace(/(\n){1,}/g, '<br />')
      return description.replace(/(\n){1,}/g, '<br />')
    },
    getPageDetails() {
      let pageNumber = this.currentPage + 1
      let jobPerPage = 10
      let offset = (pageNumber - 1) * jobPerPage
      let data = {
        pageNumber: pageNumber,
        jobPerPage: jobPerPage,
        offset: offset,
        jobId: this.jobId,
        sort: this.applicantsSort.value
      }
      return data
    },
    getApplicantsList() {
      if (
        (this.currentPage == 0 || this.currentPage > 0) &&
        this.hasMoreJobs != null
      ) {
        let data = this.getPageDetails()
        this.busy = true
        // console.log('data', data)
        this.fetchApplicants(data).then((result) => {
          this.currentPage = data.pageNumber
          this.busy = false
          this.hasMoreJobs = result
          if (this.getApplicants.length > 0) {
            this.saveSingleApplicant(this.getApplicants[0])
          }
        })
      }
      // else if (this.applicantsSort.value > 0) {
      //   //this.currentPage = 0
      //   let data = this.getPageDetails()
      //   this.busy = true
      //   // console.log('data', data)
      //   this.fetchApplicants(data).then((result) => {
      //     this.currentPage = data.pageNumber
      //     this.busy = false
      //     this.hasMoreJobs = result
      //     if (this.getApplicants.length > 0) {
      //       this.saveSingleApplicant(this.getApplicants[0])
      //     }
      //   })
      // }
    },
    saveSingleApplicant(data) {
      this.isShowDownLoadCvButton = false
      let obj = ''
      if (data.applicantData) {
        obj = {
          applicant_details: data.applicantData.applicant_details,
          user_details: data.applicantData.user_details
        }
      } else {
        obj = {
          applicant_details: data.applicant_details,
          user_details: data.user_details
        }
      }

      //console.log('data', data)
      this.saveSingleApplicantData(obj).then(() => {
        //check is contains matching report pdf
        this.getCvImages()
        if (this.isMatchingPdfReportIsAvailable()) {
          //do not fetch details for report show pdf report
        } else {
          this.getCVReport()
        }

        this.updateStatus()
      })
    },
    isMatchingPdfReportIsAvailable() {
      if (
        this.getSingleApplicantData == '' ||
        this.getSingleApplicantData == undefined
      ) {
        return false
      }

      if (
        this.getSingleApplicantData.applicant_details == '' ||
        this.getSingleApplicantData.applicant_details == undefined
      ) {
        return false
      }

      if (
        this.getSingleApplicantData.applicant_details.report_images_folder !=
          null &&
        this.getSingleApplicantData.applicant_details.report_images_folder !=
          '' &&
        this.getSingleApplicantData.applicant_details.report_images.length > 0
      ) {
        return true
      } else {
        return false
      }
    },
    getRandomStr() {
      return getRandomString()
    },
    getCVReport() {
      if (this.getSingleApplicantData) {
        this.fetchCVReportDetails(
          this.getSingleApplicantData.applicant_details.id
        )
      }
    },
    updateStatus() {
      if (this.getSingleApplicantData) {
        if (
          this.getSingleApplicantData.applicant_details.application_status ==
          this.applicationStatus.OPEN
        ) {
          let data = {
            application_id: this.getSingleApplicantData.applicant_details.id,
            status: this.applicationStatus.UNDER_REVIEW
          }
          this.saveApplicationStatus(data)
        }
        //console.log(this.getSingleApplicantData)
      }
    },
    clickAccept(type) {
      //  console.log('type', type)
      if (type) {
        let data = {
          application_id: this.getSingleApplicantData.applicant_details.id,
          status: type
        }
        this.saveApplicationStatus(data).then(() => {
          this.isShowDownLoadCvButton = true
          // this.fetchUserContactDetails(
          //   this.getSingleApplicantData.applicant_details.applicant
          // )
        })
      }
    },
    downloadCVPDF(app) {
      // console.log('Applicants list', this.getApplicants)
      this.downloadPDF(this.getPDFURL(app), true, app)
    },
    downloadAttachmentPDF(app) {
      this.downloadPDF(this.getAttachmentURL(app), false, app)
    },
    downloadPDF(fileURL, isCvFile, app) {
      let data = {
        cv_url: fileURL
      }
      console.log('pdf', fileURL)
      this.fetchPDFFile(data)
        .then((result_pdfFile) => {
          var fileURL = window.URL.createObjectURL(result_pdfFile)
          console.log('pdf', fileURL)
          var fURL = document.createElement('a')

          fURL.href = fileURL
          var download_cv_name = this.getDownloadCVName(isCvFile, app)
          fURL.download = download_cv_name
          //fURL.setAttribute('download', download_cv_name)
          // console.log('pdf', fURL)
          document.body.appendChild(fURL)
          //console.log('result_pdfFile', fURL)
          fURL.click()
          document.body.removeChild(fURL)
        })
        .catch(() => {
          this.modalMessage =
            'Facing an issue while downloading file,  please try again after some time'
          this.showModal = true
        })
    },
    getPDFURL(app) {
      var url = ''
      url = `${process.env.VUE_APP_CVURL}${app.applicant_details.applicant_resume}`
      console.log('url', url)
      return url
    },
    getAttachmentURL(app) {
      //console.log('app', app)
      var url = ''
      url = `${process.env.VUE_APP_JOBATTACHMENTURL}${app.applicant_details.attcahment_file}`
      //console.log('getAttachmentURL', url)
      return url
    },
    getDownloadCVName(isCvFile, app) {
      var file_name = this.setApplicantName(app.user_details[0]).replace(
        ' ',
        ''
      )
      if (isCvFile) {
        return `olous_${file_name}_cv.pdf`
      } else {
        return `olous_${file_name}_attachment.pdf`
      }
    },
    setApplicantName(userDetails) {
      let fullName = userDetails.first_name + ' ' + userDetails.last_name
      return fullName
    },
    getImages(image) {
      let imageUrl = `${process.env.VUE_APP_CVURL}${this.cvImageFolder}/${image}`
      return imageUrl
    },
    setApplicatsNoticePeriod(noticeperiod) {
      if (noticeperiod == appConstants.NOTICE_PERIOD.IMMEDIATE) {
        return 'Immediate'
      } else if (noticeperiod == appConstants.NOTICE_PERIOD.DAYS_30) {
        return '30 Days'
      } else if (noticeperiod == appConstants.NOTICE_PERIOD.DAYS_15) {
        return '15 Days'
      } else if (noticeperiod == appConstants.NOTICE_PERIOD.DAYS_45) {
        return '45 Days'
      } else if (noticeperiod == appConstants.NOTICE_PERIOD.DAYS_60) {
        return '60 Days'
      } else if (noticeperiod == appConstants.NOTICE_PERIOD.DAYS_75) {
        return '75 Days'
      } else if (noticeperiod == appConstants.NOTICE_PERIOD.DAYS_90) {
        return '90 Days'
      } else {
        return '30 Days'
      }
    },
    sortBy(sort) {
      // console.log('sort', sort.target.value)
      this.applicantsSort = sort
      this.currentPage = 0
      this.hasMoreJobs = 1
      this.getApplicantsList()
    },
    setDataOneditJob(job) {
      this.setSoftwareListwithId([])
      this.editJob(job)
      this.goToUpdate()
    },
    goToUpdate() {
      this.$router.push({ name: appConstants.routes.UPDATE_JOB })
    },
    showDeleteConfirmationModal(deleteJob) {
      if (
        this.getter_singleJobDetails.is_expired === false &&
        this.getter_singleJobDetails.is_published === true
      ) {
        this.deleteOrCloseJobMessage = 'Do you really want to close job?'
        this.deleteJobId = deleteJob
        //this.$refs['delete-modal'].show()
        this.showDeleteModal = true
      } else {
        this.deleteOrCloseJobMessage = 'Do you really want to delete job?'
        this.deleteJobId = deleteJob
        //this.$refs['delete-modal'].show()
        this.showDeleteModal = true
      }
    },
    hideDeleteConfirmationModal() {
      this.deleteJobId = ''
      //this.$refs['delete-modal'].hide()
      this.showDeleteModal = false
    },
    jobdelete() {
      if (
        this.getter_singleJobDetails.is_expired === false &&
        this.getter_singleJobDetails.is_published === true
      ) {
        this.closeJob(this.deleteJobId.id)
      } else {
        this.deleteJob(this.deleteJobId)
      }
      //this.deleteJob(this.deleteJobId)

      this.$router.push({ name: appConstants.routes.JOB })
      this.hideDeleteConfirmationModal()
    },
    getCvImages() {
      if (this.getSingleApplicantData) {
        if (
          this.getSingleApplicantData.applicant_details.cv_images == null ||
          this.getSingleApplicantData.applicant_details.cv_images.length == 0
        ) {
          if (this.getSingleApplicantData.applicant_details.applicant_resume) {
            let obj = {
              cvFile: this.getSingleApplicantData.applicant_details
                .applicant_resume,
              application_id: this.getSingleApplicantData.applicant_details.id
            }
            try {
              this.fetchCvImages(obj).then(() => {
                this.cvImageList = this.getCVImageList.cv_images
                this.cvImageFolder = this.getCVImageList.cv_images_folder
                this.resumeKey = getRandomString()
                // console.log('resume key', this.resumeKey)
                // console.log('resume key', this.cvImageList)
                // console.log('resume key', this.cvImageFolder)
              })
            } catch (error) {
              console.log('cv not available', error)
            }
          } else {
            this.isShowCvErrorMessage = true
          }
        } else {
          this.cvImageList = this.getSingleApplicantData.applicant_details.cv_images
          this.cvImageFolder = this.getSingleApplicantData.applicant_details.cv_images_folder
        }
      }
    },
    setCurrentJobDetails() {
      if (this.getCurrentJobDetailsButtonValue) {
        this.isApplicants = this.getCurrentJobDetailsButtonValue.isApplicants
        this.isRecommendations = this.getCurrentJobDetailsButtonValue.isRecommendations
        let data = {
          isApplicants: this.isApplicants,
          isRecommendations: this.isRecommendations,
          job_id: this.jobId
        }
        // console.log('button', data)
        this.saveCurrentJobDetailsButtonValue(data)
      } else {
        let data = {
          isApplicants: this.isApplicants,
          isRecommendations: this.isRecommendations,
          job_id: this.jobId
        }
        // console.log('button', data)
        this.saveCurrentJobDetailsButtonValue(data)
      }
    },
    showCheckboxes() {
      var checkboxes = document.getElementById('checkBoxes')

      if (this.isShow) {
        checkboxes.style.display = 'block'
        this.isShow = false
      } else {
        checkboxes.style.display = 'none'
        this.isShow = true
      }
    },
    getLocation() {
      let arr = []
      if (this.getter_singleJobDetails.city != '') {
        arr.push(this.getter_singleJobDetails.city)
      }
      if (this.getter_singleJobDetails.state != '') {
        arr.push(this.getter_singleJobDetails.state)
      }
      if (this.getter_singleJobDetails.country != '') {
        arr.push(this.getter_singleJobDetails.country)
      }
      return arr.join(', ')
    }
  },
  created() {
    if (this.getCVImageList) {
      this.setCvImages([])
    }
    if (this.getSingleApplicantData != '') {
      this.setSingleApplicantData('')
    }
    if (this.getApplicants.length != 0) {
      this.setApplicants([])
    }
    if (this.getApplicationReportDetails.length != 0) {
      this.setApplcationReportOfJob([])
    }
    //this.jobDetails = this.getSingleJobDetails
    let decoded_id = atob(this.$route.params.job_id)
    this.jobId = decoded_id
    if (this.jobId) {
      this.getApplicantsList()
    }
    this.fetchSingleJobDetails(this.jobId).then(() => {
      // this.setSectors(this.getter_singleJobDetails.sectors)
      // this.setProfessions(this.getter_singleJobDetails.professional_categories)
    })

    //this.fetchEmploymentData()
    this.setCurrentJobDetails()
  }
}
</script>
<style scoped>
/* .form-conatiner {
  margin-top: 20px;
} */
.line-height1 {
  line-height: 1;
}
.text-red {
  color: #ff0000;
}
.job-btn {
  border-radius: 8px;
  padding: 0.55rem 10px 0.55rem;
  font-weight: 600;
  line-height: 0;
  height: 32px;
  color: #000;
  border-color: #ffe8d6;
  border: 1px solid #ffe8d6;
  background-color: transparent;
  font-size: 14px;
  background-color: #ffe8d6;
  width: 98px;
}
.job-btn:hover {
  background-color: var(--app-primary-color);
  border-color: var(--app-primary-color);
  border: 1px solid var(--app-primary-color);
  font-weight: 600;
  color: #fff;
}
.text-hover {
  font-size: 12px;
  color: #000;
  cursor: pointer;
  font-family: 'Poppins Bold' !important;
}
.text-hover:hover {
  color: var(--app-primary-color);
}
.bg-warning {
  background-color: #f5cb39 !important;
}
.modal-content {
  background-color: #f5cb39 !important;
}
.notice-period {
  /* height: 48px;
  display: flex;
  align-items: center;*/
  margin-bottom: 18px;
}
.down-arrow {
  fill: rgb(0 0 0) !important;
  transform: scale(0.75) !important;
  margin-left: 5px;
}
#accordion {
  margin-top: -45px !important;
}
.job-list-button {
  background-color: transparent;
  /*border-radius: 8px;
    border: 1px solid #707070; */
  border: none;
  height: 26px;
  width: auto;
  font-size: 14px;
  margin: 0px 0px 0px 0px;
}
.job-list-button-active {
  /* background-color: #ffcf0a;
   border: none !important; */
  color: #fff;
  font-weight: 700;
  font-family: 'Manrope Bold';
  -webkit-font-smoothing: antialiased;
  /* border-bottom: 3px solid #f5cb39; */
  border-right: none;
  border-top: none;
  border-left: none;
}
.job-list-button-active:focus-visible {
  outline: none;
}
button:focus {
  outline: none !important;
}
/*.applicants-tab {
   margin-top: 20px; */
/* border: 1px solid #c1c1c1;
  border-radius: 8px;
}*/
/*.applicants-list {
   max-height: 550px;
  overflow-y: auto;
}*/
/*.applicant-details {
  margin-top: 20px; */
/* border-left: 1px solid #c1c1c1;
   border-radius: 8px;
}*/
.applicant-cv-div {
  /* width: 100%; */
  max-height: 100vh;
  overflow-y: auto;
}
.applicant-container-body {
  padding: 16px;
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px #d8d8d8;
  background-color: var(--white);
}
.max-width-applicant-column {
  max-width: 592px;
  min-width: 592px;
  margin-top: 34px;
}
.max-width-report-column {
  min-width: 520px;
  margin-top: 34px;
}
.job-title {
  font-size: 16px;
  color: #000;
  /* font-weight: 700; */
}
.job_image {
  object-fit: contain;
  width: 60px;
  height: 60px;
  background: #fff;
  border-radius: 8px;
}
.cv-image {
  height: auto;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.16);
}
.image-icon {
  width: 40px;
  height: 40px;
}
.font-light {
  font-weight: 300 !important;
}

.bg-gold {
  background-color: #f5cb39 !important;
}
.job-description {
  font-size: 12px;
  color: #000;
  font-weight: 500;
  letter-spacing: 0 !important;
}
.job-description-collapse {
  /* display: flex;  background-color: #cbcbcb;
  flex-direction: column; border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;*/
  padding: 16px;
  z-index: 1;
  position: absolute;
  background-color: #f5cb39;
  border-radius: 10px;
  min-width: 540px;
  max-height: 530px;
  right: 52%;
  top: 62px;
  overflow-y: auto;
}
.job-details {
  /* background-color: #f2f2f2;
  padding: 16px;
  display: grid;
  grid-template-columns: 64px 1fr 100px;*/
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 5px 16px 5px 16px;
  width: 1109px;
  /* border-bottom: 1px solid #dcdcdc; */
}
.btn-link {
  color: #333 !important;
}
.btn-link:hover {
  /* color: blue !important; */
  text-decoration: none;
}
.btn-outline-dark:focus,
.btn-outline-dark.focus {
  box-shadow: none !important;
}
.collapsing {
  position: relative;
  height: 0;
  overflow: hidden;
  transition: height -0.35s ease !important;
}
.panel-title {
  position: relative;
}

.panel-title::after {
  content: '\f107';
  color: #333;
  top: -2px;
  left: 0px;
  margin-right: 3px;
  position: absolute;
  font-family: 'FontAwesome';
}

.panel-title[aria-expanded='false']::after {
  content: '\f106';
}
.dropdown-menu {
  top: 0px !important;
  left: -60px !important;
}
.dropdown-item.active,
.dropdown-item:active {
  color: #333;
  text-decoration: none;
  background-color: #f2f2f2 !important;
}
.btn-link:hover {
  /* color: blue !important; */
  text-decoration: none;
}
.select-sort {
  border: none !important;
  background-color: transparent !important;
  font-size: 12px !important;
  font-weight: 600;
  color: #fff;
}
.select-sort .vs__open-indicator {
  fill: rgb(0 0 0) !important;
  transform: scale(0.75) !important;
}
.select-sort .vs__dropdown-toggle {
  border: none !important;
}
select:focus-visible {
  outline: none !important;
}

option:hover {
  background-color: #f2f2f2 !important;
}
option:before {
  font-size: 20px !important;
  content: '☐ ' !important;
}
option:checked:before {
  content: '☑ ' !important;
  font-size: 20px !important;
}
/* Dropdown with checkboxes CSS */

.multipleSelection {
  width: 115px;
  background-color: #f5cb39;
}

.selectBox {
  position: relative;
  font-size: 12px !important;
}

.selectBox select {
  width: 100%;
  font-weight: bold;
}

.overSelect {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

#checkBoxes {
  display: none;
  position: absolute;
  z-index: 1;
  background-color: #f5cb39;
  border-radius: 10px;
  padding: 10px;
  width: 115px;
}

#checkBoxes label {
  display: block;
  font-size: 12px;
  color: #fff;
}

#checkBoxes label:hover {
  background-color: #000;
}
.tab-list {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background: var(--app-bg-top-gradient);
  /* border: solid 1px #416c80;
  background-color: #416c80; */
  height: 39px;
}

.legend-size {
  width: 15px;
  height: 15px;
}
.legend-div-red {
  background-color: #f70000;
}

.legend-div-orange {
  background-color: #dd7e00;
}

.legend-div-green {
  background-color: #346b00;
}
@media only screen and (max-width: 992px) {
  /* .job-details {
      background-color: #ffcf0a2e;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 10px;
     display: grid;
    grid-template-columns: 40px 1fr 100px;
    border: solid 0.5px #707070;
  }*/
  .job_image {
    object-fit: contain;
    width: 40px;
    height: 40px;
    background: #fff;
    border-radius: 8px;
  }
  .job-title {
    font-size: 14px;
    color: #000;
    font-weight: 700;
    font-family: 'Manrope Bold';
    -webkit-font-smoothing: antialiased;
  }
  .company-name {
    font-size: 14px;
    color: #000;
    font-weight: 500;
  }
  .fontSize14 {
    font-size: 12px;
  }
  .applicants-list {
    max-height: 250px;
    overflow: auto;
  }
}
</style>
