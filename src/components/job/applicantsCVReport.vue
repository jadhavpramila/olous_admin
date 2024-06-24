<template>
  <div>
    <!-- Profession and Sector -->
    <div
      class="d-flex flex-column profession-sector"
      v-if="
        data.type == applicationReportType.profession_match ||
        data.type == applicationReportType.sector_match
      "
    >
      <div
        v-if="data.type == applicationReportType.profession_match"
        class="mt-2 report-type-header"
      >
        <span class="app-primary-text-color font-weight-700 fontSize14"> Profession </span>
      </div>
      <div
        v-else-if="data.type == applicationReportType.sector_match"
        class="mt-2 report-type-header"
      >
        <span class="app-primary-text-color font-weight-700 fontSize14 mr-2"> Sector </span>
      </div>

      <div class="" v-if="data.isMandatory.length > 0">
        <div v-for="(detail, index) in data.isMandatory" :key="index">
          <div class="bg-light rounded-lg px-2 py-3 mb-3">
            <div class="d-flex justify-content-between">
              <div class="d-flex col-md-11 p-0">
                <div
                  v-if="data.type == applicationReportType.profession_match"
                  class="font-weight-400 app-primary-text-color fontSize12"
                >
                  <div v-if="detail" class="d-flex flex-column line-height15px">
                    <span class="fontSize12 font-weight-700 report-text-hover">
                      <span class="font-weight-700">Q - </span>
                      {{ detail.response.requirement }}</span
                    >
                    <span
                      class="fontSize12 font-weight-400 report-text-hover margintop12px"
                      ><span class="font-weight-700">A - </span
                      >{{ detail.response.result }}</span
                    >
                  </div>
                </div>
                <div
                  v-if="data.type == applicationReportType.sector_match"
                  class="font-weight-400 app-primary-text-color fontSize12"
                >
                  <div v-if="detail" class="d-flex flex-column line-height15px">
                    <span class="fontSize12 font-weight-700 report-text-hover"
                      ><span class="font-weight-700">Q - </span
                      >{{ detail.response.requirement }}</span
                    >
                    <span
                      class="fontSize12 font-weight-400 report-text-hover margintop12px"
                      ><span class="font-weight-700">A - </span
                      >{{ detail.response.result }}</span
                    >
                  </div>
                </div>
              </div>
              <div class="d-flex col-md-1 justify-content-end p-0">
                <span class="mt-n1" v-if="detail.response.matched"
                  ><img src="../../assets/img/Tick-Job.svg" alt="Tick" />
                </span>
                <span class="mt-n1" v-else
                  ><img src="../../assets/img/Close-Job.svg" alt="Close" />
                </span>
              </div>
            </div>

            <div
              class="d-flex justify-content-between margintop12px"
              v-if="detail.response.requirement_currentExp"
            >
              <div
                v-if="detail"
                class="d-flex flex-column col-md-11 p-0 line-height15px"
              >
                <span class="fontSize12 font-weight-700 report-text-hover"
                  ><span class="font-weight-700">Q - </span
                  >{{ detail.response.requirement_currentExp }}</span
                >
                <span
                  class="fontSize12 font-weight-400 report-text-hover margintop12px"
                  ><span class="font-weight-700">A - </span
                  >{{ detail.response.inCurrentExp }}</span
                >
              </div>
              <div class="col-md-1 p-0 d-flex justify-content-end">
                <span class="" v-if="detail.response.isValueInCurrentExp"
                  ><img src="../../assets/img/Tick-Job.svg" alt="Tick" />
                </span>
                <span class="" v-if="!detail.response.isValueInCurrentExp"
                  ><img src="../../assets/img/Close-Job.svg" alt="Close" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="" v-if="data.isNotMandatory.length > 0">
        <div v-for="(detail, index) in data.isNotMandatory" :key="index">
          <div class="bg-light rounded-lg px-2 py-3 mb-3 margintop5px">
            <div class="d-flex justify-content-between">
              <div class="d-flex col-md-11 p-0">
                <div
                  v-if="data.type == applicationReportType.profession_match"
                  class="font-weight-400 app-primary-text-color fontSize12"
                >
                  <div v-if="detail" class="d-flex flex-column line-height15px">
                    <span class="fontSize12 font-weight-700 report-text-hover">
                      <span class="font-weight-700">Q - </span>
                      {{ detail.response.requirement }}</span
                    >
                    <span
                      class="fontSize12 font-weight-400 report-text-hover margintop12px"
                      ><span class="font-weight-700">A - </span
                      >{{ detail.response.result }}</span
                    >
                  </div>
                </div>
                <div
                  v-if="data.type == applicationReportType.sector_match"
                  class="font-weight-400 app-primary-text-color fontSize12"
                >
                  <div v-if="detail" class="d-flex flex-column line-height15px">
                    <span class="fontSize12 font-weight-700 report-text-hover"
                      ><span class="font-weight-700">Q - </span
                      >{{ detail.response.requirement }}</span
                    >
                    <span
                      class="fontSize12 font-weight-400 report-text-hover margintop12px"
                      ><span class="font-weight-700">A - </span
                      >{{ detail.response.result }}</span
                    >
                  </div>
                </div>
              </div>
              <div class="d-flex col-md-1 justify-content-end p-0">
                <span class="mt-n1" v-if="detail.response.matched"
                  ><img src="../../assets/img/Tick-Job.svg" alt="Tick" />
                </span>
                <span class="mt-n1" v-else
                  ><img src="../../assets/img/Close-Job.svg" alt="Close" />
                </span>
              </div>
            </div>

            <div
              class="d-flex justify-content-between margintop12px"
              v-if="detail.response.requirement_currentExp"
            >
              <div
                v-if="detail"
                class="d-flex flex-column col-md-11 p-0 line-height15px"
              >
                <span class="fontSize12 font-weight-700 report-text-hover"
                  ><span class="font-weight-700">Q - </span
                  >{{ detail.response.requirement_currentExp }}</span
                >
                <span
                  class="fontSize12 font-weight-400 report-text-hover margintop12px"
                  ><span class="font-weight-700">A - </span
                  >{{ detail.response.inCurrentExp }}</span
                >
              </div>
              <div class="col-md-1 p-0 d-flex justify-content-end">
                <span class="" v-if="detail.response.isValueInCurrentExp"
                  ><img src="../../assets/img/Tick-Job.svg" alt="Tick" />
                </span>
                <span class="" v-if="!detail.response.isValueInCurrentExp"
                  ><img src="../../assets/img/Close-Job.svg" alt="Close" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Software and Languages -->
    <div
      class="d-flex flex-column software-language"
      v-if="
        data.type == applicationReportType.software_match ||
        data.type == applicationReportType.language_match
      "
    >
      <div
        v-if="data.type == applicationReportType.software_match"
        class="mt-2 report-type-header"
      >
        <span class="app-primary-text-color font-weight-700 fontSize14"> Software </span>
      </div>
      <div
        v-else-if="data.type == applicationReportType.language_match"
        class="mt-2 report-type-header"
      >
        <span class="app-primary-text-color font-weight-700 fontSize14 mr-2">
          Languages
        </span>
      </div>

      <div class="" v-if="data.isMandatory.length > 0">
        <!-- <span class="text-danger font-weight-700 fontSize12 ml-2">
          Must Have
        </span> -->
        <div v-for="(detail, index) in data.isMandatory" :key="index">
          <div class="bg-light rounded-lg px-2 py-3 mb-3">
            <div class="d-flex justify-content-between">
              <div class="d-flex p-0">
                <div
                  v-if="data.type == applicationReportType.software_match"
                  class="font-weight-400 app-primary-text-color fontSize12"
                >
                  <div v-if="detail" class="d-flex flex-column line-height15px">
                    <span class="fontSize12 font-weight-700 report-text-hover">
                      <span class="font-weight-700">Q - </span>
                      {{ detail.response.requirement }}</span
                    >
                    <span
                      class="fontSize12 font-weight-400 report-text-hover margintop12px"
                      ><span class="font-weight-700">A - </span
                      >{{ detail.response.result }}</span
                    >
                  </div>
                </div>
                <div
                  v-if="data.type == applicationReportType.language_match"
                  class="font-weight-400 app-primary-text-color fontSize12"
                >
                  <div v-if="detail" class="d-flex flex-column line-height15px">
                    <span class="fontSize12 font-weight-700 report-text-hover"
                      ><span class="font-weight-700">Q - </span
                      >{{ detail.response.requirement }}</span
                    >
                    <span
                      class="fontSize12 font-weight-400 report-text-hover margintop12px"
                      ><span class="font-weight-700">A - </span
                      >{{ detail.response.result }}</span
                    >
                  </div>
                </div>
              </div>
              <div class="d-flex col-md-1 justify-content-end p-0">
                <span class="mt-n1" v-if="detail.response.matched"
                  ><img src="../../assets/img/Tick-Job.svg" alt="Tick" />
                </span>
                <span class="mt-n1" v-else
                  ><img src="../../assets/img/Close-Job.svg" alt="Close" />
                </span>
              </div>
            </div>

            <div
              class="d-flex justify-content-between margintop12px"
              v-if="detail.response.requirement_currentExp"
            >
              <div
                v-if="detail"
                class="d-flex flex-column col-md-11 p-0 line-height15px"
              >
                <span class="fontSize12 font-weight-700 report-text-hover"
                  ><span class="font-weight-700">Q - </span
                  >{{ detail.response.requirement_currentExp }}</span
                >
                <span
                  class="fontSize12 font-weight-400 report-text-hover margintop12px"
                  ><span class="font-weight-700">A - </span
                  >{{ detail.response.inCurrentExp }}</span
                >
              </div>
              <div class="col-md-1 p-0 d-flex justify-content-end">
                <span class="" v-if="detail.response.isValueInCurrentExp"
                  ><img src="../../assets/img/Tick-Job.svg" alt="Tick" />
                </span>
                <span class="" v-if="!detail.response.isValueInCurrentExp"
                  ><img src="../../assets/img/Close-Job.svg" alt="Close" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="" v-if="data.isNotMandatory.length > 0">
        <div v-for="(detail, index) in data.isNotMandatory" :key="index">
          <div class="bg-light rounded-lg px-2 py-3 mb-3 margintop5px">
            <div class="d-flex justify-content-between">
              <div class="d-flex col-md-11 p-0">
                <div
                  v-if="data.type == applicationReportType.software_match"
                  class="font-weight-400 app-primary-text-color fontSize12"
                >
                  <div v-if="detail" class="d-flex flex-column line-height15px">
                    <span class="fontSize12 font-weight-700 report-text-hover">
                      <span class="font-weight-700">Q - </span>
                      {{ detail.response.requirement }}</span
                    >
                    <span
                      class="fontSize12 font-weight-400 report-text-hover margintop12px"
                      ><span class="font-weight-700">A - </span
                      >{{ detail.response.result }}</span
                    >
                  </div>
                </div>
                <div
                  v-if="data.type == applicationReportType.language_match"
                  class="font-weight-400 app-primary-text-color fontSize12"
                >
                  <div v-if="detail" class="d-flex flex-column line-height15px">
                    <span class="fontSize12 font-weight-700 report-text-hover"
                      ><span class="font-weight-700">Q - </span
                      >{{ detail.response.requirement }}</span
                    >
                    <span
                      class="fontSize12 font-weight-400 report-text-hover margintop12px"
                      ><span class="font-weight-700">A - </span
                      >{{ detail.response.result }}</span
                    >
                  </div>
                </div>
              </div>
              <div class="d-flex col-md-1 justify-content-end p-0">
                <span class="mt-n1" v-if="detail.response.matched"
                  ><img src="../../assets/img/Tick-Job.svg" alt="Tick" />
                </span>
                <span class="mt-n1" v-else
                  ><img src="../../assets/img/Close-Job.svg" alt="Close" />
                </span>
              </div>
            </div>

            <div
              class="d-flex justify-content-between margintop12px"
              v-if="detail.response.requirement_currentExp"
            >
              <div
                v-if="detail"
                class="d-flex flex-column col-md-11 p-0 line-height15px"
              >
                <span class="fontSize12 font-weight-700 report-text-hover"
                  ><span class="font-weight-700">Q - </span
                  >{{ detail.response.requirement_currentExp }}</span
                >
                <span
                  class="fontSize12 font-weight-400 report-text-hover margintop12px"
                  ><span class="font-weight-700">A - </span
                  >{{ detail.response.inCurrentExp }}</span
                >
              </div>
              <div class="col-md-1 p-0 d-flex justify-content-end">
                <span class="" v-if="detail.response.isValueInCurrentExp"
                  ><img src="../../assets/img/Tick-Job.svg" alt="Tick" />
                </span>
                <span class="" v-if="!detail.response.isValueInCurrentExp"
                  ><img src="../../assets/img/Close-Job.svg" alt="Close" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Experience -->
    <div class="" v-if="data.type == applicationReportType.experience_match">
      <div class="mt-2 report-type-header">
        <span class="app-primary-text-color font-weight-700 fontSize14 mr-2">
          Experience
        </span>
      </div>
      <div class="" v-if="data.isMandatory.length > 0">
        <div v-for="(detail, index) in data.isMandatory" :key="index">
          <div class="bg-light rounded-lg px-2 py-3 mb-3">
            <div class="d-flex justify-content-between">
              <div class="d-flex p-0">
                <div
                  v-if="data.type == applicationReportType.experience_match"
                  class="font-weight-400 app-primary-text-color fontSize12"
                >
                  <div v-if="detail" class="d-flex flex-column line-height15px">
                    <span class="fontSize12 font-weight-700 report-text-hover">
                      <span class="font-weight-700">Q - </span>
                      {{ detail.response.requirement }}</span
                    >
                    <span
                      class="fontSize12 font-weight-400 report-text-hover margintop12px"
                      ><span class="font-weight-700">A - </span
                      >{{ detail.response.result }}</span
                    >
                  </div>
                </div>
              </div>
              <div class="d-flex col-md-1 justify-content-end p-0">
                <span class="mt-n1" v-if="detail.response.matched"
                  ><img src="../../assets/img/Tick-Job.svg" alt="Tick" />
                </span>
                <span class="mt-n1" v-else
                  ><img src="../../assets/img/Close-Job.svg" alt="Close" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="" v-if="data.isNotMandatory.length > 0">
        <div v-for="(detail, index) in data.isNotMandatory" :key="index">
          <div class="bg-light rounded-lg px-2 py-3 mb-3 margintop5px">
            <div class="d-flex justify-content-between">
              <div class="d-flex col-md-11 p-0">
                <div
                  v-if="data.type == applicationReportType.experience_match"
                  class="font-weight-400 app-primary-text-color fontSize12"
                >
                  <div v-if="detail" class="d-flex flex-column line-height15px">
                    <span class="fontSize12 font-weight-700 report-text-hover">
                      <span class="font-weight-700">Q - </span>
                      {{ detail.response.requirement }}</span
                    >
                    <span
                      class="fontSize12 font-weight-400 report-text-hover margintop12px"
                      ><span class="font-weight-700">A - </span
                      >{{ detail.response.result }}</span
                    >
                  </div>
                </div>
              </div>
              <div class="d-flex col-md-1 justify-content-end p-0">
                <span class="mt-n1" v-if="detail.response.matched"
                  ><img src="../../assets/img/Tick-Job.svg" alt="Tick" />
                </span>
                <span class="mt-n1" v-else
                  ><img src="../../assets/img/Close-Job.svg" alt="Close" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Location -->
    <div class="" v-if="data.type == applicationReportType.location_match">
      <div class="mt-2 report-type-header">
        <span class="app-primary-text-color font-weight-700 fontSize14 mr-2">
          Location
        </span>
      </div>
      <div class="" v-if="data.isMandatory.length > 0">
        <!-- <span class="text-danger font-weight-700 fontSize12 ml-2">
          Must Have
        </span> -->
        <div v-for="(detail, index) in data.isMandatory" :key="index">
          <div class="bg-light rounded-lg px-2 py-3 mb-3">
            <div class="d-flex justify-content-between">
              <div class="d-flex p-0">
                <div
                  v-if="data.type == applicationReportType.location_match"
                  class="font-weight-400 app-primary-text-color fontSize12"
                >
                  <div v-if="detail" class="d-flex flex-column line-height15px">
                    <span class="fontSize12 font-weight-700 report-text-hover">
                      <span class="font-weight-700">Q - </span>
                      {{ detail.response.requirement }}</span
                    >
                    <span
                      class="fontSize12 font-weight-400 report-text-hover margintop12px"
                      ><span class="font-weight-700">A - </span
                      >{{ detail.response.result }}</span
                    >
                  </div>
                </div>
              </div>
              <div class="d-flex col-md-1 justify-content-end p-0">
                <span class="mt-n1" v-if="detail.response.matched"
                  ><img src="../../assets/img/Tick-Job.svg" alt="Tick" />
                </span>
                <span class="mt-n1" v-else
                  ><img src="../../assets/img/Close-Job.svg" alt="Close" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="" v-if="data.isNotMandatory.length > 0">
        <div v-for="(detail, index) in data.isNotMandatory" :key="index">
          <div class="bg-light rounded-lg px-2 py-3 mb-3 margintop5px">
            <div class="d-flex justify-content-between">
              <div class="d-flex col-md-11 p-0">
                <div
                  v-if="data.type == applicationReportType.location_match"
                  class="font-weight-400 app-primary-text-color fontSize12"
                >
                  <div v-if="detail" class="d-flex flex-column line-height15px">
                    <span class="fontSize12 font-weight-700 report-text-hover">
                      <span class="font-weight-700">Q - </span>
                      {{ detail.response.requirement }}</span
                    >
                    <span
                      class="fontSize12 font-weight-400 report-text-hover margintop12px"
                      ><span class="font-weight-700">A - </span
                      >{{ detail.response.result }}</span
                    >
                  </div>
                </div>
              </div>
              <div class="d-flex col-md-1 justify-content-end p-0">
                <span class="mt-n1" v-if="detail.response.matched"
                  ><img src="../../assets/img/Tick-Job.svg" alt="Tick" />
                </span>
                <span class="mt-n1" v-else
                  ><img src="../../assets/img/Close-Job.svg" alt="Close" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Notice Period -->
    <div class="" v-if="data.type == applicationReportType.notice_period_match">
      <div class="mt-2 report-type-header">
        <span class="app-primary-text-color font-weight-700 fontSize14 mr-2">
          Notice Period
        </span>
      </div>
      <div class="" v-if="data.isMandatory.length > 0">
        <!-- <span class="text-danger font-weight-700 fontSize12 ml-2">
          Must Have
        </span> -->
        <div v-for="(detail, index) in data.isMandatory" :key="index">
          <div class="bg-light rounded-lg px-2 py-3 mb-3">
            <div class="d-flex justify-content-between">
              <div class="d-flex p-0">
                <div
                  v-if="data.type == applicationReportType.notice_period_match"
                  class="font-weight-400 app-primary-text-color fontSize12"
                >
                  <div v-if="detail" class="d-flex flex-column line-height15px">
                    <span class="fontSize12 font-weight-700 report-text-hover">
                      <span class="font-weight-700">Q - </span>
                      {{ detail.response.requirement }}</span
                    >
                    <span
                      class="fontSize12 font-weight-400 report-text-hover margintop12px"
                      ><span class="font-weight-700">A - </span
                      >{{ detail.response.result }}</span
                    >
                  </div>
                </div>
              </div>
              <div class="d-flex col-md-1 justify-content-end p-0">
                <span class="mt-n1" v-if="detail.response.matched"
                  ><img src="../../assets/img/Tick-Job.svg" alt="Tick" />
                </span>
                <span class="mt-n1" v-else
                  ><img src="../../assets/img/Close-Job.svg" alt="Close" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="" v-if="data.isNotMandatory.length > 0">
        <div v-for="(detail, index) in data.isNotMandatory" :key="index">
          <div class="bg-light rounded-lg px-2 py-3 mb-3 margintop5px">
            <div class="d-flex justify-content-between">
              <div class="d-flex col-md-11 p-0">
                <div
                  v-if="data.type == applicationReportType.notice_period_match"
                  class="font-weight-400 app-primary-text-color fontSize12"
                >
                  <div v-if="detail" class="d-flex flex-column line-height15px">
                    <span class="fontSize12 font-weight-700 report-text-hover">
                      <span class="font-weight-700">Q - </span>
                      {{ detail.response.requirement }}</span
                    >
                    <span
                      class="fontSize12 font-weight-400 report-text-hover margintop12px"
                      ><span class="font-weight-700">A - </span
                      >{{ detail.response.result }}</span
                    >
                  </div>
                </div>
              </div>
              <div class="d-flex col-md-1 justify-content-end p-0">
                <span class="mt-n1" v-if="detail.response.matched"
                  ><img src="../../assets/img/Tick-Job.svg" alt="Tick" />
                </span>
                <span class="mt-n1" v-else
                  ><img src="../../assets/img/Close-Job.svg" alt="Close" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Education -->
    <div class="" v-if="data.type == applicationReportType.education_match">
      <div class="mt-2 report-type-header">
        <span class="app-primary-text-color font-weight-700 fontSize14 mr-2">
          Education
        </span>
      </div>
      <div class="" v-if="data.isMandatory.length > 0">
        <div v-for="(detail, index) in data.isMandatory" :key="index">
          <div class="bg-light rounded-lg px-2 py-3 mb-3">
            <div class="d-flex justify-content-between">
              <div class="d-flex p-0">
                <div
                  v-if="data.type == applicationReportType.education_match"
                  class="font-weight-400 app-primary-text-color fontSize12"
                >
                  <div v-if="detail" class="d-flex flex-column line-height15px">
                    <span class="fontSize12 font-weight-700 report-text-hover">
                      <span class="font-weight-700">Q - </span>
                      {{ detail.response.requirement }}</span
                    >
                    <span
                      class="fontSize12 font-weight-400 report-text-hover margintop12px"
                      ><span class="font-weight-700">A - </span
                      >{{ detail.response.result }}</span
                    >
                  </div>
                </div>
              </div>
              <div class="d-flex col-md-1 justify-content-end p-0">
                <span class="mt-n1" v-if="detail.response.matched"
                  ><img src="../../assets/img/Tick-Job.svg" alt="Tick" />
                </span>
                <span class="mt-n1" v-else
                  ><img src="../../assets/img/Close-Job.svg" alt="Close" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="" v-if="data.isNotMandatory.length > 0">
        <div v-for="(detail, index) in data.isNotMandatory" :key="index">
          <div class="bg-light rounded-lg px-2 py-3 mb-3 margintop5px">
            <div class="d-flex justify-content-between">
              <div class="d-flex col-md-11 p-0">
                <div
                  v-if="data.type == applicationReportType.education_match"
                  class="font-weight-400 app-primary-text-color fontSize12"
                >
                  <div v-if="detail" class="d-flex flex-column line-height15px">
                    <span class="fontSize12 font-weight-700 report-text-hover">
                      <span class="font-weight-700">Q - </span>
                      {{ detail.response.requirement }}</span
                    >
                    <span
                      class="fontSize12 font-weight-400 report-text-hover margintop12px"
                      ><span class="font-weight-700">A - </span
                      >{{ detail.response.result }}</span
                    >
                  </div>
                </div>
              </div>
              <div class="d-flex col-md-1 justify-content-end p-0">
                <span class="mt-n1" v-if="detail.response.matched"
                  ><img src="../../assets/img/Tick-Job.svg" alt="Tick" />
                </span>
                <span class="mt-n1" v-else
                  ><img src="../../assets/img/Close-Job.svg" alt="Close" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable no-unused-vars -->
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import appConstants from '../../appConstants.js'
import {
  getProfessionValues,
  getSectorValues
} from '../../common/js/getValuesFromIds.js'

export default {
  name: 'ApplicantCVReportPage',
  props: {
    data: {}
  },
  data() {
    return {
      value: '',
      applicationReportType: appConstants.APPLICATION_REPORT_TYPE,
      reprtType: appConstants.Report
    }
  },
  computed: {
    ...mapGetters(['getApplicationReportDetails']),
    ...mapGetters('dropdownValues', [
      'getSectorOptions',
      'getProfessionOptions',
      'getter_allSoftwareList'
    ])
  },
  methods: {
    ...mapActions(['fetchProfessionData', 'fetchSectorData']),
    ...mapActions('dropdownValues', ['fetchSoftwareList']),
    getProfessionValuesFromId(pid) {
      let name = this.getProfessionOptions.find((options) => options.id == pid)
      if (name != undefined) {
        return name.display_string
        // console.log('setOptionsObjectTo', name)
      }

      return name
    },
    getSoftwareValuesFromId(pid) {
      let name
      this.getter_allSoftwareList.filter((options) => {
        if (options._source.id == pid) {
          name = options._source.name
          // console.log('setOptionsObjectTo', name)
        }
      })
      return name
    },
    getSectorValuesFromId(sid) {
      let name
      this.getSectorOptions.filter((options) => {
        if (options.id == sid) {
          name = options.display_string
          // console.log('setOptionsObjectTo', name)
        }
      })
      return name
    },
    getMatchScoreInPercentage(score) {
      let percentage = score * 100
      return percentage
    }
  },
  created() {
    // this.fetchProfessionData()
    // this.fetchSectorData()
    //this.fetchSoftwareList()
  }
}
</script>
<style>
.bullets {
  display: list-item;
  margin-left: 24px;
}
.text75 {
  color: #99b507;
}
.text100 {
  color: #359a00;
}
.text40 {
  color: #860404;
}
.report-type-header {
  background-color: #416c80;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 1.5px 2px 1.5px 9px;
  color: #fff;
}
/*.report-text-hover:hover {
   font-weight: 700; 
}*/
</style>
