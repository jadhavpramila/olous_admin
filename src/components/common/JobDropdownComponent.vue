<template>
  <div class="cls-customComponent">
    <div class="main-container">
      <div
        class="main-container-header d-flex flex-column"
        v-if="type == application_data_type.profession_match"
      >
        <label class="font-weight-700 fontSize18 mb-0"
          >Profession <span class="text-danger">*</span>
        </label>
        <label class="fontSize14"
          >Please add the profession you want the candidate to have</label
        >
      </div>
      <div
        class="main-container-header d-flex flex-column"
        v-if="type == application_data_type.sector_match"
      >
        <label class="font-weight-700 fontSize18 mb-0"
          >Sector <span class="text-danger">*</span>
        </label>
        <label class="fontSize14"
          >Please add the sector you want the candidate to have</label
        >
      </div>
      <div
        class="main-container-header d-flex flex-column"
        v-if="type == application_data_type.software_match"
      >
        <label class="font-weight-700 fontSize18 mb-0"
          >Software
          <span
            v-if="
              jobLevel == job_level.JUNIOR ||
              jobLevel == job_level.INTERMEDIATE ||
              jobLevel == job_level.SENIOR
            "
            class="text-danger"
            >*</span
          >
        </label>
        <label class="fontSize14"
          >Please add the software you want the candidate to have</label
        >
      </div>
      <div
        class="main-container-header d-flex flex-column"
        v-if="type == application_data_type.language_match"
      >
        <label class="font-weight-700 fontSize18 mb-0">Language </label>
        <label class="fontSize14"
          >Please add the languages you want the candidate to know</label
        >
      </div>
      <!-- <div
        class="main-container-header d-flex flex-column"
        v-if="type == application_data_type.education_match"
      >
        <label class="font-weight-300 fontSize20 text-white"
          >Education
          <span
            v-if="jobLevel == job_level.FRESHER || jobLevel == job_level.INTERN"
            class="text-danger"
            >*</span
          >
        </label>
        <label class="fontSize14 text-white"
          >Highest education qualification of candidate</label
        >
      </div> -->

      <!-- @click="openInfo(1)" -->
      <div class="main-container-body">
        <div class="">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <v-select
                  label="display_string"
                  v-model="vmodel_for_dropdown"
                  :options="arrayData"
                  :placeholder="getPlaceholder(type)"
                  :closeOnSelect="true"
                  class="single-value show-placeholder remove-close-btn show-dropdown-icon form-control"
                  :class="{
                    'is-invalid':
                      submitted && $v.final_array_of_objects.$invalid,
                    'options-on-search-only':
                      type != application_data_type.language_match
                  }"
                />
                <label v-if="type == application_data_type.profession_match"
                  >E.g - Architecture, Civil Engineering, Project Mangagement
                  etc.</label
                >
                <label v-if="type == application_data_type.sector_match"
                  >E.g - Retail, Residential, Commercial</label
                >
                <label v-if="type == application_data_type.software_match"
                  >E.g - MS Office, AutoCAD, Tekla etc</label
                >
                <!-- <select
                  v-if="type == application_data_type.language_match"
                  class="form-control input-lg"
                  name="daysToExpire"
                  v-model="vmodel_for_dropdown"
                  :class="{
                    'is-invalid':
                      submitted && $v.final_array_of_objects.$invalid
                  }"
                >
                  <option value>Select</option>
                  <option
                    v-for="degree in arrayData"
                    :value="degree.id"
                    :key="degree.id"
                  >
                    {{ degree.display_string }}
                  </option>
                </select> -->

                <div
                  v-if="submitted && !$v.final_array_of_objects.required"
                  class="invalid-feedback"
                >
                  <span v-if="type == application_data_type.profession_match">
                    Profession is required</span
                  >
                  <span v-if="type == application_data_type.software_match">
                    Software is required</span
                  >
                  <span v-if="type == application_data_type.sector_match">
                    Sector is required</span
                  >
                </div>
                <div
                  v-if="isShowMaxLimitExtendMessage"
                  class="text-danger fontSize12"
                >
                  <span v-if="type == application_data_type.profession_match">
                    Max 3 Professions are allowed</span
                  >
                  <span v-if="type == application_data_type.sector_match">
                    Max 3 Sector are allowed</span
                  >
                  <span v-if="type == application_data_type.software_match">
                    Max 3 Software are allowed</span
                  >
                  <span v-if="type == application_data_type.language_match">
                    Max 3 Language are allowed</span
                  >
                </div>
                <div
                  v-if="isShowAlreadyAddedProfession"
                  class="text-danger fontSize12"
                >
                  <span v-if="type == application_data_type.profession_match">
                    Profession already added</span
                  >
                  <span v-if="type == application_data_type.sector_match">
                    Sector already added</span
                  >
                  <span v-if="type == application_data_type.software_match">
                    Software is already added</span
                  >
                  <span v-if="type == application_data_type.language_match">
                    Language is already added</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-md-12 w-100">
              <div class="align-items-center d-flex row">
                <div class="col-10">
                  <div class="row">
                    <div class="col-4 pr-0" v-if="isShowExperience">
                      <div class="form-group">
                        <!-- <label> Experience </label> -->
                        <div
                          v-if="type == application_data_type.language_match"
                        >
                          <!-- <select
                            class="form-control select-placeholder"
                            name="exp_profession"
                            v-model="max_exp_prof"
                            :class="{
                              'is-invalid':
                                isAddPressed && $v.max_exp_prof.$invalid
                            }"
                          >
                            <option value="" disabled selected default>
                              Fluency Level
                            </option>

                            <option
                              v-for="value in lang_fluency_array"
                              :value="value.id"
                              :key="value.id"
                            >
                              {{ value.name }}
                            </option>
                          </select> -->
                          <v-select
                            class="form-control single-value show-placeholder remove-close-btn show-dropdown-icon"
                            label="name"
                            placeholder="Fluency level"
                            :options="lang_fluency_array"
                            :reduce="(option) => option.id"
                            v-model="max_exp_prof"
                            :class="{
                              'is-invalid':
                                isAddPressed && $v.max_exp_prof.$invalid
                            }"
                          />
                          <div
                            v-if="isAddPressed && !$v.max_exp_prof.required"
                            class="invalid-feedback"
                          >
                            Fluency level is required
                          </div>
                        </div>
                        <div
                          v-else-if="
                            type == application_data_type.software_match
                          "
                        >
                          <!-- <select
                            class="form-control select-placeholder"
                            name="exp_proficiency"
                            v-model="max_exp_prof"
                            :class="{
                              'is-invalid':
                                isAddPressed && $v.max_exp_prof.$invalid
                            }"
                          >
                            <option value="" disabled selected default>
                              Proficiency
                            </option>

                            <option
                              v-for="value in proficiency_array"
                              :value="value.id"
                              :key="value.id"
                            >
                              {{ value.name }}
                            </option>
                          </select> -->
                          <v-select
                            class="form-control single-value show-placeholder remove-close-btn show-dropdown-icon"
                            label="name"
                            :options="proficiency_array"
                            placeholder="Experience in years"
                            :reduce="(option) => option.id"
                            v-model="max_exp_prof"
                            :class="{
                              'is-invalid':
                                isAddPressed && $v.max_exp_prof.$invalid
                            }"
                          />
                          <div
                            v-if="isAddPressed && !$v.max_exp_prof.required"
                            class="invalid-feedback"
                          >
                            Proficiency is required
                          </div>
                        </div>
                        <div v-else>
                          <!-- <select
                            class="form-control select-placeholder"
                            name="exp_profession"
                            v-model="max_exp_prof"
                            :class="{
                              'is-invalid':
                                isAddPressed && $v.max_exp_prof.$invalid
                            }"
                          >
                            <option value="" disabled selected default>
                              Experience in years
                            </option>
                            <option
                              v-for="n in getExpArray()"
                              :value="n"
                              :key="n"
                            >
                              {{ n }}
                            </option>
                          </select> -->
                          <v-select
                            class="form-control single-value show-placeholder remove-close-btn show-dropdown-icon"
                            placeholder="Experience in years"
                            label="value"
                            :options="getExpArray()"
                            v-model="max_exp_prof"
                            :class="{
                              'is-invalid':
                                isAddPressed && $v.max_exp_prof.$invalid
                            }"
                          />
                          <div
                            v-if="isAddPressed && !$v.max_exp_prof.required"
                            class="invalid-feedback"
                          >
                            Experience is required
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    v-if="isShowMustHave"
                    class="col-2 pr-0"
                    :class="{
                      'col-md-6': type == application_data_type.education_match
                    }"
                  >
                    <div class="form-group">
                      <label
                        class="checkbox-container fontSize12 font-italic font-weight-700"
                        >Must Have
                        <input type="checkbox" v-model="isMustHave" />
                        <span class="mark"></span>
                      </label>
                    </div>
                  </div>
                  <div class="col-4 d-flex">
                    <div class="form-group" v-if="isShowInCurrentExperience">
                      <label
                        class="checkbox-container font-italic fontSize12 font-weight-700"
                        >Should be in current experience
                        <input
                          type="checkbox"
                          v-model="isInCurrentExperience"
                        />
                        <span class="mark"></span>
                      </label>
                    </div>
                    <!-- <img
                    src="../../assets/img/Add-Job.svg"
                    alt="addjob"
                    class="cursor-pointer plus-icon"
                  /> -->
                  </div>
                </div>
                <div class="col-md-2" align="right">
                  <div
                    class="d-flex justify-content-end mt-n3"
                    v-if="type != application_data_type.education_match"
                  >
                    <button class="btn cursor-pointer" @click="addData()">
                      + Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="row"></div> -->
          <hr
            class="border border-1 mt-4"
            v-if="final_array_of_objects.length > 0"
          />
          <div class="row">
            <div class="col-md-12">
              <div v-if="final_array_of_objects.length > 0" class="row">
                <div
                  v-for="(profession, index) in final_array_of_objects"
                  :key="index"
                  class="col-md-8 justify-content-between d-flex mt-2"
                >
                  <div v-if="type == application_data_type.language_match">
                    <span class="bullets fontSize14 font-weight-700"
                      >{{ profession.name }} |
                      {{ getFluencyLevel(profession.experience) }}

                      <span v-if="profession.is_mandatory">| Required </span>
                    </span>
                  </div>
                  <div v-else-if="type == application_data_type.software_match">
                    <span class="bullets fontSize14 font-weight-700"
                      >{{ profession.name }} |
                      {{ getProficiency(profession.experience) }}

                      <span v-if="profession.is_mandatory">| Required </span>
                    </span>
                  </div>
                  <div v-else>
                    <span
                      class="bullets fontSize14 font-weight-700"
                      v-if="profession.experience > 1"
                      >{{ profession.name }} | {{ profession.experience }} Years
                      Experience
                      <span v-if="profession.is_mandatory"> | Required</span>
                      <span v-if="profession.isInCurrentExperience">
                        | Should be in current experience</span
                      >
                    </span>
                    <span
                      class="bullets fontSize14 font-weight-700"
                      v-if="profession.experience == 1"
                      >{{ profession.name }} | {{ profession.experience }} Year
                      Experience

                      <span v-if="profession.is_mandatory">| Required </span>
                      <span v-if="profession.isInCurrentExperience">
                        | Should be in current experience</span
                      >
                    </span>
                    <span
                      class="bullets fontSize14 font-weight-700"
                      v-if="
                        profession.experience == 0 ||
                        profession.experience == undefined
                      "
                      >{{ profession.name }}
                      <span v-if="profession.is_mandatory"> | Required </span>
                      <span v-if="profession.isInCurrentExperience">
                        | Should be in current experience</span
                      >
                    </span>
                  </div>

                  <span
                    class="cursor-pointer"
                    @click="deleteData(profession, index)"
                    ><img src="../../assets/img/Delete.svg" alt="" class="w-75"
                  /></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import appConstants from '../../appConstants.js'
// eslint-disable-next-line no-unused-vars
import { required, email, numeric, requiredIf } from 'vuelidate/lib/validators'
import '../../assets/css/appcolor.css'
export default {
  name: 'JobDropdownComponent',
  props: [
    'arrayOfObject',
    'filterArray',
    'Type',
    'isShowInCurrentExperience',
    'isShowMustHave',
    'isShowExperience',
    'jobLevel',
    'isPublish',
    'submitted',
    'required_max_exp'
  ],
  data() {
    return {
      vmodel_for_dropdown: [],
      max_exp_prof: '',
      isInCurrentExperience: false,
      isMustHave: false,
      job_level: appConstants.job_level,
      isShowAlreadyAddedProfession: false,
      isShowMaxLimitExtendMessage: false,
      final_array_of_objects: [],
      array_of_ids: [],
      application_data_type: appConstants.APPLICATION_REPORT_TYPE,
      arrayData: '',
      type: 0,
      langaugeFluency: appConstants.Language_Fluency,
      proficiency_enum: appConstants.proficiency_level,
      fieldOfStudyObj: '',
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
      proficiency_array: [
        {
          name: 'Beginner',
          id: appConstants.proficiency_level.BEGINNER
        },
        {
          name: 'Intermediate',
          id: appConstants.proficiency_level.INTERMEDIATE
        },
        {
          name: 'Expert',
          id: appConstants.proficiency_level.EXPERT
        }
      ],
      isAddPressed: false
    }
  },
  watch: {
    // vmodel_for_dropdown: function (val) {
    //   if (val) {
    //     this.fieldOfStudyObj.push(val)
    //     //.map((res) => res)
    //     console.log('vmodel dropdown', this.final_array_of_objects)
    //   } else {
    //     this.fieldOfStudyObj = ''
    //   }
    // }
  },
  computed: {
    ...mapGetters('dropdownValues', ['getProfessionOptions'])
  },
  validations() {
    return {
      // vmodel_for_dropdown: {
      //   required: requiredIf(function () {
      //     if (this.isPublish) {
      //       if (
      //         this.type == this.application_data_type.education_match &&
      //         (this.jobLevel == this.job_level.INTERN ||
      //           this.jobLevel == this.job_level.FRESHER)
      //       ) {
      //         return true
      //       } else {
      //         return false
      //       }
      //     }
      //   })
      // },
      final_array_of_objects: {
        required: requiredIf(function () {
          if (this.isPublish) {
            if (
              (this.type == this.application_data_type.profession_match ||
                this.type == this.application_data_type.software_match ||
                this.type == this.application_data_type.sector_match) &&
              (this.jobLevel == this.job_level.INTERN ||
                this.jobLevel == this.job_level.FRESHER)
            ) {
              return false
            } else if (
              (this.type == this.application_data_type.profession_match ||
                this.type == this.application_data_type.software_match ||
                this.type == this.application_data_type.sector_match) &&
              (this.jobLevel == this.job_level.JUNIOR ||
                this.jobLevel == this.job_level.INTERMEDIATE ||
                this.jobLevel == this.job_level.SENIOR)
            ) {
              return true
            }
            // else {
            //   return false
            // }
          }
        })
      },
      max_exp_prof: {
        required: requiredIf(function () {
          if (
            this.type == this.application_data_type.profession_match ||
            this.type == this.application_data_type.sector_match ||
            this.type == this.application_data_type.software_match ||
            this.type == this.application_data_type.language_match
          ) {
            if (this.vmodel_for_dropdown.display_string) {
              return true
            }
          }

          return false
        })
      }
    }
  },
  methods: {
    getExpArray() {
      let arr = []
      let maxexp = this.required_max_exp
      if (
        this.required_max_exp == undefined ||
        this.required_max_exp == null ||
        this.required_max_exp == ''
      ) {
        maxexp = 40
      }
      for (let i = 1; i <= maxexp; i++) {
        arr.push(i)
      }
      return arr
    },
    addData() {
      // if (type == this.application_data_type.language_match) {
      //   this.setDataForLanguage()
      // } else {

      this.isAddPressed = true
      this.$v.$touch()

      // if (
      //   !this.$v.max_exp_prof.required ||
      //   !this.$v.final_array_of_objects.required
      // ) {
      if (!this.$v.max_exp_prof.required) {
        return false
      } else {
        this.isAddPressed = false
      }

      this.isAlreadyAdded = false
      if (this.vmodel_for_dropdown.display_string) {
        if (
          this.final_array_of_objects.length == 0 ||
          this.final_array_of_objects.length < 3
        ) {
          this.array_of_ids.push(this.vmodel_for_dropdown.id)
          this.final_array_of_objects.map((res) => {
            if (res.id == this.vmodel_for_dropdown.id) {
              this.isAlreadyAdded = true
            } else {
              this.isAlreadyAdded = false
            }
          })
          if (!this.isAlreadyAdded) {
            let displayObj = {
              name: this.vmodel_for_dropdown.display_string,
              experience: this.max_exp_prof,
              id: this.vmodel_for_dropdown.id,
              is_mandatory: this.isMustHave,
              isInCurrentExperience: this.isInCurrentExperience
            }
            this.final_array_of_objects.push(displayObj)
          } else {
            this.isShowAlreadyAddedProfession = true
          }
          this.vmodel_for_dropdown = []
          this.max_exp_prof = ''
          this.isMustHave = false
          this.isInCurrentExperience = false
        } else {
          this.isShowMaxLimitExtendMessage = true
        }
      }
      //}
    },
    // setDataForLanguage() {
    //   if (this.vmodel_for_dropdown) {
    //     if (
    //       this.final_array_of_objects.length == 0 ||
    //       this.final_array_of_objects.length < 3
    //     ) {
    //       this.array_of_ids.push(this.vmodel_for_dropdown)
    //       this.final_array_of_objects.map((res) => {
    //         if (res.id == this.vmodel_for_dropdown) {
    //           this.isAlreadyAdded = true
    //         } else {
    //           this.isAlreadyAdded = false
    //         }
    //       })
    //       if (!this.isAlreadyAdded) {
    //         let displayObj = {
    //           name: '',
    //           experience: this.max_exp_prof,
    //           id: this.vmodel_for_dropdown,
    //           is_mandatory: this.isMustHave,
    //           isInCurrentExperience: this.isInCurrentExperience
    //         }
    //         this.arrayData.filter((options) => {
    //           if (options['id'] == this.vmodel_for_dropdown) {
    //             displayObj.name = options.display_string
    //             return
    //           }
    //         })
    //         this.final_array_of_objects.push(displayObj)
    //         console.log(
    //           'this.final_array_of_objects',
    //           this.final_array_of_objects
    //         )
    //       } else {
    //         this.isShowAlreadyAddedProfession = true
    //       }
    //       this.vmodel_for_dropdown = []
    //       this.max_exp_prof = 0
    //       this.isMustHave = false
    //       this.isInCurrentExperience = false
    //     } else {
    //       this.isShowMaxLimitExtendMessage = true
    //     }
    //   }
    //   console.log('vmodel_for_dropdown')
    // },
    // eslint-disable-next-line no-unused-vars
    deleteData(data, index) {
      //let id = data.id
      for (let i = 0; i < this.final_array_of_objects.length; i++) {
        if (data.id == this.final_array_of_objects[i].id) {
          this.final_array_of_objects.splice(i, 1)
        }
      }
      for (let i = 0; i < this.array_of_ids.length; i++) {
        if (data.id == this.array_of_ids[i]) {
          this.array_of_ids.splice(i, 1)
        }
      }
    },
    getPlaceholder(type) {
      if (type == this.application_data_type.profession_match) {
        return 'Select Profession'
      } else if (type == this.application_data_type.sector_match) {
        return 'Select Sector'
      } else if (type == this.application_data_type.software_match) {
        return 'Select Software'
      } else if (type == this.application_data_type.language_match) {
        return 'Select Language'
      } else if (type == this.application_data_type.education_match) {
        return 'Select Field of Study'
      }
    },
    getFluencyLevel(level) {
      if (level == this.langaugeFluency.FLUENT) {
        return 'Fluent'
      } else if (level == this.langaugeFluency.BEGINNER) {
        return 'Beginner'
      } else if (level == this.langaugeFluency.INTERMEDIATE) {
        return 'Intermediate'
      }
    },
    getProficiency(level) {
      if (level == this.proficiency_enum.EXPERT) {
        return 'Expert'
      } else if (level == this.proficiency_enum.BEGINNER) {
        return 'Beginner'
      } else if (level == this.proficiency_enum.INTERMEDIATE) {
        return 'Intermediate'
      }
    }
  },
  mounted() {
    this.arrayData = this.arrayOfObject
  },
  created() {
    // console.log('ispublish', this.isPublish)
    this.type = this.Type
    if (this.filterArray.length > 0) {
      this.final_array_of_objects = this.filterArray
    } else {
      this.final_array_of_objects = []
    }
    this.arrayData = this.arrayOfObject
  }
}
</script>
<style>
/* .main-container {
  /* border: 1px solid #ccc; */
/*background-color: #fff;
  height: 100%;
   width: auto; */
/*  border-radius: 8px;
  margin-top: 28px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  min-width: 835px;
  max-width: 950px;
}*/
/*.main-container-header {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-image: var(--app-bg-top-gradient);
  padding: 8px;
  color: #000;
}
.main-container-body {
  padding: 16px;
}
*/
.checkbox-container {
  display: block;
  position: relative;
  padding-left: 36px;
  margin-bottom: 0px;
  cursor: pointer;
  font-size: 12px;
}

/* Hide the default checkbox */
.checkbox-container input {
  visibility: hidden;
  cursor: pointer;
}

/* Create a custom checkbox */
.mark {
  position: absolute;
  top: -2px;
  left: 0;
  border: 2px solid var(--app-primary-color);
  height: 25px;
  width: 25px;
  border-radius: 4px;
  background-color: transparent;
}

.checkbox-container:hover input ~ .mark {
  background-color: transparent;
}

.checkbox-container input:checked ~ .mark {
  background-color: var(--app-primary-color);
}
.vs--open .vs__open-indicator {
  fill: rgb(0 0 0);
  transform: rotate(180deg) scale(0.7) !important;
}
/* Create the mark/indicator (hidden when not checked) */
.mark:after {
  content: '';
  position: absolute;
  display: none;
}

/* Show the mark when checked */
.checkbox-container input:checked ~ .mark:after {
  display: block;
}

/* Style the mark/indicator */
.checkbox-container .mark:after {
  left: 7px;
  top: 1px;
  width: 8px;
  height: 15px;
  border: solid white;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}
.form-group {
  margin-bottom: 10px;
}
/*.form-control {
  font-size: 16px; on change this value change this value also .multiselect__placeholder
  line-height: 16px;
  letter-spacing: 0.125px;
   background-color: #f2f2f2;
  box-sizing: border-box;
  box-shadow: none;
  width: 100%;
  border: 0;*/
/*border-bottom: 1px solid rgb(140, 143, 155);*/
/* border-width: 1px;
  border-style: solid;
  border-color: #c4c4c4;
  border: none !important;*/
/* border: 0.5px solid #d1e2ea;
  border-radius: 8px !important;
  padding: 5px 12px 5px;
  font-weight: 700;
  transition: all 0.2s cubic-bezier(0.2, 0.91, 0.85, 0.96) 0s;
  margin-bottom: 10px;
  margin-top: 2px;
  color: #000;
  min-height: 40px; on change this value change this value also app.css .newsDetails .Images_btn */
/* height: auto;
} */

.form-control:disabled {
  opacity: 0.5;
}
/* .job-btn {
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
 padding: 7px 24px 7px 24px;
  width: 98px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
} */
/* .select-placeholder {
  color: #707070 !important;
  opacity: 0.7 !important;
  font-weight: 500 !important;
} */
select:required:invalid {
  color: #707070 !important;
}
/*select option {
  color: #000 !important;
}
 select option[value='0'][disabled][default] {
  display: block;
  color: #707070 !important;
}
select option:first-child {
  color: #707070 !important;
}
select.empty {
  color: #707070 !important;
}
 Hidden placeholder
select option[disabled]:first-child {
  display: block;
  color: #707070 !important;
} */
</style>
