<template>
  <div class="leads-list">
    <div class="form-conatiner cls-employee">
      <div class="d-flex justify-content-end">
        <span class="btn w-25" @click="addClick">Add Employee</span>
      </div>
      <div class="form-max-width">
        <div>
          <div
            class="row lead-card-row ml-0 mr-0"
            v-for="(emp, counter) in getAllEmployeeList"
            :key="counter"
          >
            <div
              class="col-md-10 Lead-card bgGrayLightColor mb-3 border rounded-lg"
            >
              <div class="row">
                <!--<div  @dblclick="viewLead(emp)"
                  class="col-1 lead_image mt-1 mb-1"
                  style="display: flex; flex-direction: row"
                >
                  <img
                    class="imgjob"
                    src="../../assets/img/Job_List_Company.svg"
                  />
                </div>-->
                <div class="col-12 mt-3 mb-3 fon">
                  <div class="row mt-1">
                    <div class="col-md-8">
                      <label class="app-primary-text-color font-weight-bold">
                        {{ emp.first_name }} {{ emp.last_name }} ({{
                          emp.emp_id
                        }})</label
                      >
                    </div>
                  </div>
                  <!-- <div class="row mt-1">
                    <div class="col-md-8">
                      <label class="app-primary-text-color"> </label>
                    </div>
                  </div> -->
                  <div
                    class="row mt-1"
                    v-if="
                      emp.access_permission[
                        accessPermission.ANALYTICS_FULL_ACCESS
                      ]
                    "
                  >
                    <div class="col-md-8">
                      <b-form-checkbox
                        size="lg"
                        v-model="
                          emp.access_permission[
                            accessPermission.ANALYTICS_FULL_ACCESS
                          ]
                        "
                        disabled
                      >
                        Analytics Full Access
                      </b-form-checkbox>

                      <!-- <input
                        type="checkbox"
                        v-model="
                          emp.access_permission[
                            accessPermission.ANALYTICS_FULL_ACCESS
                          ]
                        "
                        class="ml-2"
                      />
                      <label class="app-primary-text-color"> Analytics Full Access</label> -->
                    </div>
                  </div>
                  <div
                    class="row mt-1"
                    v-if="
                      emp.access_permission[
                        accessPermission.COMPANY_FULL_ACCESS
                      ]
                    "
                  >
                    <div class="col-md-8">
                      <b-form-checkbox
                        size="lg"
                        v-model="
                          emp.access_permission[
                            accessPermission.COMPANY_FULL_ACCESS
                          ]
                        "
                        disabled
                      >
                        Company Full Access
                      </b-form-checkbox>
                      <!-- <input
                        type="checkbox"
                        v-model="
                          emp.access_permission[
                            accessPermission.COMPANY_FULL_ACCESS
                          ]
                        "
                        class="ml-2"
                      />
                      <label class="app-primary-text-color"></label> -->
                    </div>
                  </div>
                  <div
                    class="row mt-1"
                    v-if="
                      emp.access_permission[accessPermission.JOB_FULL_ACCESS]
                    "
                  >
                    <div class="col-md-8">
                      <b-form-checkbox
                        size="lg"
                        v-model="
                          emp.access_permission[
                            accessPermission.JOB_FULL_ACCESS
                          ]
                        "
                        disabled
                      >
                        Job Full Access
                      </b-form-checkbox>
                      <!-- <input
                        type="checkbox"
                        v-model="
                          emp.access_permission[
                            accessPermission.JOB_FULL_ACCESS
                          ]
                        "
                        class="ml-2"
                      />
                      <label class="app-primary-text-color"> Job Full Access</label> -->
                    </div>
                  </div>
                  <div
                    class="row mt-1"
                    v-if="
                      emp.access_permission[accessPermission.LEAD_FULL_ACCESS]
                    "
                  >
                    <div class="col-md-8">
                      <b-form-checkbox
                        size="lg"
                        v-model="
                          emp.access_permission[
                            accessPermission.LEAD_FULL_ACCESS
                          ]
                        "
                        disabled
                      >
                        Lead Full Access
                      </b-form-checkbox>
                      <!-- <input
                        type="checkbox"
                        v-model="
                          emp.access_permission[
                            accessPermission.LEAD_FULL_ACCESS
                          ]
                        "
                        class="ml-2"
                      />
                      <label class="app-primary-text-color"> </label> -->
                    </div>
                  </div>
                  <div
                    class="row mt-1"
                    v-if="
                      emp.access_permission[
                        accessPermission.ARTICLES_FULL_ACCESS
                      ]
                    "
                  >
                    <div class="col-md-8">
                      <b-form-checkbox
                        size="lg"
                        v-model="
                          emp.access_permission[
                            accessPermission.ARTICLES_FULL_ACCESS
                          ]
                        "
                        disabled
                      >
                        Articles Full Access
                      </b-form-checkbox>
                      <!-- <input
                        type="checkbox"
                        v-model="
                          emp.access_permission[
                            accessPermission.ARTICLES_FULL_ACCESS
                          ]
                        "
                        class="ml-2"
                      />
                      <label class="app-primary-text-color"> Full Access</label> -->
                    </div>
                  </div>
                  <div
                    class="row mt-1"
                    v-if="
                      emp.access_permission[
                        accessPermission.HEADLINES_FULL_ACCESS
                      ]
                    "
                  >
                    <div class="col-md-8">
                      <b-form-checkbox
                        size="lg"
                        v-model="
                          emp.access_permission[
                            accessPermission.HEADLINES_FULL_ACCESS
                          ]
                        "
                        disabled
                      >
                        Headline Full Access
                      </b-form-checkbox>
                      <!-- <input
                        type="checkbox"
                        v-model="
                          emp.access_permission[
                            accessPermission.HEADLINES_FULL_ACCESS
                          ]
                        "
                        class="ml-2"
                      />
                      <label class="app-primary-text-color">  Full Access</label> -->
                    </div>
                  </div>
                  <div
                    class="row mt-1"
                    v-if="
                      emp.access_permission[
                        accessPermission.ENQUIRY_FULL_ACCESS
                      ]
                    "
                  >
                    <div class="col-md-8">
                      <b-form-checkbox
                        size="lg"
                        v-model="
                          emp.access_permission[
                            accessPermission.ENQUIRY_FULL_ACCESS
                          ]
                        "
                        disabled
                      >
                        Enquiry Full Access
                      </b-form-checkbox>
                    </div>
                  </div>
                  <div
                    class="row mt-1"
                    v-if="
                      emp.access_permission[
                        accessPermission.PRICING_FULL_ACCESS
                      ]
                    "
                  >
                    <div class="col-md-8">
                      <b-form-checkbox
                        size="lg"
                        v-model="
                          emp.access_permission[
                            accessPermission.PRICING_FULL_ACCESS
                          ]
                        "
                        disabled
                      >
                        Pricing Full Access
                      </b-form-checkbox>
                    </div>
                  </div>
                  <div
                    class="row mt-1"
                    v-if="
                      emp.access_permission[accessPermission.REPORT_FULL_ACCESS]
                    "
                  >
                    <div class="col-md-8">
                      <b-form-checkbox
                        size="lg"
                        v-model="
                          emp.access_permission[
                            accessPermission.REPORT_FULL_ACCESS
                          ]
                        "
                        disabled
                      >
                        Report Full Access
                      </b-form-checkbox>
                    </div>
                  </div>
                  <div
                    class="row mt-1"
                    v-if="
                      emp.access_permission[
                        accessPermission.SALESPAGE_FULL_ACCESS
                      ]
                    "
                  >
                    <div class="col-md-8">
                      <b-form-checkbox
                        size="lg"
                        v-model="
                          emp.access_permission[
                            accessPermission.SALESPAGE_FULL_ACCESS
                          ]
                        "
                        disabled
                      >
                        Sales Full Access
                      </b-form-checkbox>
                    </div>
                  </div>
                  <div
                    class="row mt-1"
                    v-if="
                      emp.access_permission[
                        accessPermission.EMPLOYEE_FULL_ACCESS
                      ]
                    "
                  >
                    <div class="col-md-8">
                      <b-form-checkbox
                        size="lg"
                        v-model="
                          emp.access_permission[
                            accessPermission.EMPLOYEE_FULL_ACCESS
                          ]
                        "
                        disabled
                      >
                        Employee Full Access
                      </b-form-checkbox>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-2 row ml-0 mb-3 action-row">
              <div>
                <img
                  class="cursor-pointer"
                  @click="setDataOnEditEmployee(emp)"
                  title="Edit lead"
                  src="../../assets/img/Edit.svg"
                />
              </div>
              <!-- <div>
                <img
                  class="cursor-pointer ml-3"
                  @click="showDeleteConfirmationModal(emp)"
                  src="../../assets/img/Delete.svg"
                  title="Delete lead"
                />
              </div> -->
            </div>
          </div>
        </div>
      </div>
      <modal v-if="showDeleteModal" @closeModal="hideDeleteConfirmationModal">
        <div slot="body">Do you really want to delete this lead?</div>
        <div slot="footer">
          <b-button
            class="btn"
            variant="outline-dark"
            @click="hideDeleteConfirmationModal"
          >
            Cancel
          </b-button>
          <b-button class="ml-2 btn" variant="outline-dark" @click="leadDelete">
            Yes
          </b-button>
        </div>
      </modal>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import appConstants from '../../appConstants.js'
import modal from '../../common/Modal'
import '../../assets/css/appcolor.css'

export default {
  name: 'EmployeeList',
  components: {
    modal
  },
  data() {
    return {
      currentPage: 0,
      hasMoreJobs: true,
      busy: false,
      accessPermission: appConstants.employee_access_permission,
      deleteLeadId: '',
      showDeleteModal: false
    }
  },
  computed: {
    ...mapGetters('employee', ['getAllEmployeeList'])
  },

  methods: {
    ...mapMutations('lead', ['clearAllPreviousLeadData']),
    ...mapActions('employee', ['fetchAllEmployeeList', 'editEmployee']),
    showErrorNotification(errorMessage) {
      var message = errorMessage
      if (errorMessage == '') {
        message = 'Something went wrong!'
      }
      this.$notify({
        group: 'error',
        type: 'error',
        text: message
      })
    },

    getAllEmployee() {
      // eslint-disable-next-line no-unused-vars
      this.fetchAllEmployeeList().then((result) => {
        //console.log('getAllEmployeeList', this.getAllEmployeeList)
      })
    },
    setDataOnEditEmployee(emp) {
      this.editEmployee(emp)
      this.$router.push({ name: appConstants.routes.UPDATEEMPLOYEE })
    },
    addClick() {
      this.$router.push({ name: appConstants.routes.ADDEMPLOYEE })
    }
  },
  created() {
    this.getAllEmployee()
  }
}
</script>

<style scoped>
.btnSearchjob {
  margin-top: 5px;
}
.form-conatiner {
  margin-top: 20px;
}
/* .actioncolumn {
  background-color: ;
} */

.job-card .job_image {
  margin: auto;
  object-fit: fill;
}

.job-card {
  cursor: pointer;
  border-radius: 8px;
}

.status-row {
  display: flex;
  flex-direction: row-reverse;
}
.lead-status {
  height: 25px;
  padding: 0;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 0px;
  border-bottom-left-radius: 8px;
  border-top-right-radius: 8px;
  text-transform: capitalize;
  /* float: right;*/
  margin-right: -15px;
  margin-top: -16px;
  background-color: #a5a1a1;
  font-weight: bold;
}
.action-row {
  display: flex;
  justify-content: flex-start;
}

.cursor-pointer {
  cursor: pointer;
}
.custom-control-input:checked ~ .custom-control-label::before {
  color: #fff;
  border-color: #000000 !important;
  background-color: #000000 !important;
}
.checkbox-text {
  color: #767676 !important;
}
.add-button {
  width: 150px;
  height: 35px;
  padding: 8px 24px 8px;
  border-radius: 8px;
  background-color: var(--app-primary-color);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
@media only screen and (max-width: 992px) {
  .job-card .job_image .imgjob {
    transform: scale(2);
    margin-left: 10px;
  }

  .page-header {
    margin-top: -60px !important;
  }

  .action-row {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
