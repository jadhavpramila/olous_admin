<template>
  <div>
    <div class="form-conatiner cls-addemployee">
      <div class="leadDetails form-max-width bg-white p-4 border">
        <form enctype="multipart/form-data" class="">
          <div>
            <!--Start contact details-->
            <div class="">
              <label class="app-primary-text-color font-weight-700 fontSize22"
                >Employee details</label
              >
              <div v-if="isShowEmployeeId">
                <label class="app-primary-text-color bold-Font-Weight"
                  >Employee Id - {{ employeeDetail.emp_id }}</label
                >
              </div>
            </div>
            <div class="row form-group">
              <div class="col-md-6">
                <div class="mt-2">
                  <label>First Name</label>
                  <input
                    type="text"
                    class="form-control input-lg"
                    v-model="employeeDetail.first_name"
                    :class="{
                      'is-invalid':
                        submitted && $v.employeeDetail.first_name.$invalid
                    }"
                  />
                  <div
                    v-if="submitted && !$v.employeeDetail.first_name.required"
                    class="invalid-feedback"
                  >
                    First name is required
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mt-2">
                  <label>Last Name</label>
                  <input
                    type="text"
                    class="form-control input-lg"
                    v-model="employeeDetail.last_name"
                    :class="{
                      'is-invalid':
                        submitted && $v.employeeDetail.last_name.$invalid
                    }"
                  />
                  <div
                    v-if="submitted && !$v.employeeDetail.last_name.required"
                    class="invalid-feedback"
                  >
                    Last name is required
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>Email Id</label>
                  <input
                    type="email"
                    class="form-control input-lg"
                    v-model="employeeDetail.email"
                    :class="{
                      'is-invalid':
                        submitted && $v.employeeDetail.email.$invalid
                    }"
                  />

                  <div
                    v-if="submitted && !$v.employeeDetail.email.required"
                    class="invalid-feedback"
                  >
                    Email address required
                  </div>
                  <div
                    v-if="submitted && !$v.employeeDetail.email.email"
                    class="invalid-feedback"
                  >
                    Invalid email address
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    class="form-control input-lg"
                    v-model="employeeDetail.phone"
                    :class="{
                      'is-invalid':
                        submitted && $v.employeeDetail.phone.$invalid
                    }"
                  />
                  <div
                    v-if="submitted && !$v.employeeDetail.phone.numeric"
                    class="invalid-feedback"
                  >
                    Mobile number is invalid
                  </div>
                </div>
              </div>
            </div>
            <div class="row" v-if="!isShowEmployeeId">
              <div class="col-md-6">
                <div class="form-group">
                  <label>Employee Id</label>
                  <v-select
                    v-model="employee_id"
                    label="name"
                    :options="employeeIdList"
                    placeholder="Select employee id"
                    class="form-control single-value show-placeholder remove-close-btn show-dropdown-icon"
                    :reduce="(option) => option.value"
                    :class="{
                      'is-invalid':
                        submitted && $v.employeeDetail.emp_id.$invalid
                    }"
                  ></v-select>
                  <!-- <input
                    type="text"
                    class="form-control input-lg"
                    v-model="employeeDetail.emp_id"
                    :disabled="isShowEmployeeId"
                    :class="{
                      'is-invalid':
                        submitted && $v.employeeDetail.emp_id.$invalid
                    }"
                  /> -->
                  <div
                    v-if="submitted && !$v.employeeDetail.emp_id.required"
                    class="invalid-feedback"
                  >
                    Employee ID is required
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>Number</label>
                  <!-- <input
                    type="password"
                    class="form-control input-lg"
                    v-model="employeeDetail.password"
                    :disabled="isShowEmployeeId"
                    :class="{
                      'is-invalid':
                        submitted && $v.employeeDetail.password.$invalid
                    }"
                  /> -->
                  <v-select
                    v-model="employeeDetail.number"
                    :options="getNumberList()"
                    @input="setEmployeeID($event)"
                    placeholder="Select number to attach employee Id"
                    class="form-control single-value show-placeholder remove-close-btn show-dropdown-icon"
                    :disabled="employee_id ? false : true"
                    :class="{
                      'is-invalid':
                        submitted && $v.employeeDetail.emp_id.$invalid
                    }"
                  ></v-select>
                  <div
                    v-if="submitted && !$v.employeeDetail.emp_id.required"
                    class="invalid-feedback"
                  >
                    Number is required
                  </div>
                </div>
              </div>
            </div>

            <div class="row" v-if="isShowEmployeeId">
              <div class="col-md-6">
                <div class="form-group">
                  <div class="row mt-1">
                    <div class="col-md-8">
                      <b-form-checkbox
                        v-model="
                          employeeDetail.access_permission[
                            accessPermission.ANALYTICS_FULL_ACCESS
                          ]
                        "
                        size="lg"
                        @change="
                          setAccessPermission(
                            accessPermission.ANALYTICS_FULL_ACCESS
                          )
                        "
                      >
                        Analytics Full Access
                      </b-form-checkbox>
                    </div>
                  </div>
                  <div class="row mt-1">
                    <div class="col-md-8">
                      <b-form-checkbox
                        v-model="
                          employeeDetail.access_permission[
                            accessPermission.COMPANY_FULL_ACCESS
                          ]
                        "
                        size="lg"
                        @change="
                          setAccessPermission(
                            accessPermission.COMPANY_FULL_ACCESS
                          )
                        "
                      >
                        Company Full Access
                      </b-form-checkbox>
                    </div>
                  </div>
                  <div class="row mt-1">
                    <div class="col-md-8">
                      <b-form-checkbox
                        v-model="
                          employeeDetail.access_permission[
                            accessPermission.JOB_FULL_ACCESS
                          ]
                        "
                        size="lg"
                        @change="
                          setAccessPermission(accessPermission.JOB_FULL_ACCESS)
                        "
                      >
                        Job Full Access
                      </b-form-checkbox>
                    </div>
                  </div>
                  <div class="row mt-1">
                    <div class="col-md-8">
                      <b-form-checkbox
                        v-model="
                          employeeDetail.access_permission[
                            accessPermission.LEAD_FULL_ACCESS
                          ]
                        "
                        size="lg"
                        @change="
                          setAccessPermission(accessPermission.LEAD_FULL_ACCESS)
                        "
                      >
                        Lead Full Access
                      </b-form-checkbox>
                    </div>
                  </div>
                  <div class="row mt-1">
                    <div class="col-md-8">
                      <b-form-checkbox
                        v-model="
                          employeeDetail.access_permission[
                            accessPermission.ARTICLES_FULL_ACCESS
                          ]
                        "
                        size="lg"
                        @change="
                          setAccessPermission(
                            accessPermission.ARTICLES_FULL_ACCESS
                          )
                        "
                      >
                        Articles Full Access
                      </b-form-checkbox>
                    </div>
                  </div>
                  <div class="row mt-1">
                    <div class="col-md-8">
                      <b-form-checkbox
                        v-model="
                          employeeDetail.access_permission[
                            accessPermission.HEADLINES_FULL_ACCESS
                          ]
                        "
                        size="lg"
                        @change="
                          setAccessPermission(
                            accessPermission.HEADLINES_FULL_ACCESS
                          )
                        "
                      >
                        Headline Full Access
                      </b-form-checkbox>
                    </div>
                  </div>
                  <div class="row mt-1">
                    <div class="col-md-8">
                      <b-form-checkbox
                        v-model="
                          employeeDetail.access_permission[
                            accessPermission.ENQUIRY_FULL_ACCESS
                          ]
                        "
                        size="lg"
                        @change="
                          setAccessPermission(
                            accessPermission.ENQUIRY_FULL_ACCESS
                          )
                        "
                      >
                        Enquiry Full Access
                      </b-form-checkbox>
                    </div>
                  </div>
                  <div class="row mt-1">
                    <div class="col-md-8">
                      <b-form-checkbox
                        v-model="
                          employeeDetail.access_permission[
                            accessPermission.PRICING_FULL_ACCESS
                          ]
                        "
                        size="lg"
                        @change="
                          setAccessPermission(
                            accessPermission.PRICING_FULL_ACCESS
                          )
                        "
                      >
                        Pricing Full Access
                      </b-form-checkbox>
                    </div>
                  </div>
                  <div class="row mt-1">
                    <div class="col-md-8">
                      <b-form-checkbox
                        v-model="
                          employeeDetail.access_permission[
                            accessPermission.REPORT_FULL_ACCESS
                          ]
                        "
                        size="lg"
                        @change="
                          setAccessPermission(
                            accessPermission.REPORT_FULL_ACCESS
                          )
                        "
                      >
                        Report Full Access
                      </b-form-checkbox>
                    </div>
                  </div>
                  <div class="row mt-1">
                    <div class="col-md-8">
                      <b-form-checkbox
                        v-model="
                          employeeDetail.access_permission[
                            accessPermission.SALESPAGE_FULL_ACCESS
                          ]
                        "
                        size="lg"
                        @change="
                          setAccessPermission(
                            accessPermission.SALESPAGE_FULL_ACCESS
                          )
                        "
                      >
                        Sales Full Access
                      </b-form-checkbox>
                    </div>
                  </div>
                  <div class="row mt-1">
                    <div class="col-md-8">
                      <b-form-checkbox
                        v-model="
                          employeeDetail.access_permission[
                            accessPermission.EMPLOYEE_FULL_ACCESS
                          ]
                        "
                        size="lg"
                        @change="
                          setAccessPermission(
                            accessPermission.EMPLOYEE_FULL_ACCESS
                          )
                        "
                      >
                        Employee Full Access
                      </b-form-checkbox>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!--Start Button -->
            <div class="form-group row">
              <div class="ml-auto d-flex mr-0">
                <button type="button" class="btn ml-2" @click="btnCancelClick">
                  Cancel
                </button>
                <button
                  type="button"
                  class="btn ml-2"
                  @click="btnSaveUpdateClick"
                >
                  {{ getSaveButtonText() }}
                </button>
              </div>
            </div>
            <!-- End bitton -->
          </div>
        </form>
      </div>

      <modal v-if="isShowEmployeeModal" @closeModal="hideModal">
        <div slot="body">{{ this.EmployeeModalMessage }}</div>
        <div slot="footer">
          <b-button
            class="ml-2 btn"
            variant="outline-dark"
            @click="goToEmployeeListPage"
          >
            OK
          </b-button>
        </div>
      </modal>

      <modal
        v-if="showAddEmployeeErrorModal"
        @closeModal="updateShowAddEmployeeErrorModal([false, ''])"
      >
        <div slot="body">{{ this.AddEmployeeErrorModalMessage }}</div>
        <div slot="footer">
          <b-button
            class="ml-2 btn"
            variant="outline-dark"
            @click="updateShowAddEmployeeErrorModal([false, ''])"
          >
            OK
          </b-button>
        </div>
      </modal>

      <modal v-if="isShowCancelModal" @closeModal="hideCancelModal">
        <div slot="body">Leave the page without saving?</div>
        <div slot="footer">
          <b-button variant="outline-danger" @click="hideCancelModal">
            Cancel
          </b-button>
          <b-button
            class="ml-2 btn"
            variant="outline-dark"
            @click="goToEmployeeListPage"
          >
            OK
          </b-button>
        </div>
      </modal>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { mapGetters, mapActions, mapMutations } from 'vuex'

import { required, email, numeric } from 'vuelidate/lib/validators'
import modal from '../../common/Modal'
import appConstants from '../../appConstants.js'

export default {
  name: 'AddEmployee',
  components: {
    modal
  },
  data() {
    return {
      employeeDetail: {
        id: '',
        first_name: '',
        last_name: '',
        emp_id: '',
        phone: '',
        email: '',
        access_permission: {},
        number: null
        //password: ''
      },
      submitted: false,
      saveButtonText: '',
      accessPermission: appConstants.employee_access_permission,
      isShowCancelModal: false,
      isShowEmployeeModal: false,
      employeeDetailsSavedCopy: '',
      employeeIdList: [
        {
          name: 'CP_PP',
          value: 'CP_PP'
        },
        {
          name: 'VAD_S',
          value: 'VAD_S'
        }
      ],
      employee_id: '',
      isShowAddEmployeeModal: false,
      AddEmployeeModalMessage: ''
      //EmployeeModalMessage: ''
    }
  },
  validations() {
    return {
      employeeDetail: {
        first_name: { required },
        last_name: { required },
        emp_id: { required },
        email: { required, email },
        phone: { numeric }

        //password: { required }
      },
      number: { required }
    }
  },

  computed: {
    ...mapGetters('employee', [
      'getEditEmployeeData',
      'EmployeeModalMessage',
      'AddEmployeeErrorModalMessage',
      'showAddEmployeeErrorModal'
    ])
  },

  methods: {
    ...mapMutations('employee', ['updateShowAddEmployeeErrorModal']),
    ...mapActions('employee', [
      'updateEmployeeDetails',
      'action_setAccessPermission',
      'addEmployee'
    ]),
    getNumberList() {
      let arr = []
      for (let i = 1; i < 30; i++) {
        arr.push(i)
      }
      return arr
    },
    setEmployeeID(e) {
      this.employeeDetail.emp_id = ''
      if (this.employee_id) {
        this.employeeDetail.emp_id = this.employee_id + e
      }
      console.log('emp_id', this.employeeDetail.emp_id)
    },
    getSaveButtonText() {
      if (this.employeeDetail.id == '' || this.employeeDetail.id == undefined) {
        return 'Save'
      } else {
        return 'Update'
      }
    },
    btnSaveUpdateClick() {
      this.submitted = true
      if (this.$v.employeeDetail.$invalid) {
        // if (!this.$v.employeeDetail.emp_id.$invalid) {
        //   return true
        // } else {
        console.log('Required data')
        return false
        //}
      }
      this.addOrUpdateEmployee()
    },
    getJsonDataTOSaveEmployee() {
      var employeeData = {
        id: this.employeeDetail.id,
        first_name: this.employeeDetail.first_name,
        last_name: this.employeeDetail.last_name,
        emp_id: this.employeeDetail.emp_id,
        access_permission: this.employeeDetail.access_permission,
        email: this.employeeDetail.email,
        phone: this.employeeDetail.phone,
        password: this.employeeDetail.password
      }

      return employeeData
    },
    addOrUpdateEmployee() {
      var data = this.getJsonDataTOSaveEmployee()
      //console.log('data to save', data)
      if (this.employeeDetail.id == '' || this.employeeDetail.id == undefined) {
        data.user_type = '0'
        this.addEmployee(data).then(() => {
          this.employeeDetailsSavedCopy = JSON.parse(
            JSON.stringify(this.employeeDetail)
          )
          // this.EmployeeModalMessage = data.message
          this.isShowEmployeeModal = true
          this.AddEmployeeErrorModalMessage = true
          this.submitted = false
        })
      } else {
        this.updateEmployeeDetails(data).then(() => {
          this.employeeDetailsSavedCopy = JSON.parse(
            JSON.stringify(this.employeeDetail)
          )
          //this.EmployeeModalMessage = data.message
          this.AddEmployeeErrorModalMessage = true
          this.isShowEmployeeModal = true
        })
      }
    },
    hideModal() {
      this.isShowEmployeeModal = false
    },
    cancel() {
      this.goToEmployeeListPage()
    },
    // hideAddEmployeeModal() {
    //   this.updateShowAddEmployeeErrorModal(false, '')
    // },
    goToEmployeeListPage() {
      this.$router.push({ name: appConstants.routes.EMPLOYEE })
    },
    btnCancelClick() {
      if (JSON.stringify(this.employeeDetail)) {
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
    setAccessPermission(type) {
      let obj
      if (this.employeeDetail.access_permission[type]) {
        obj = {
          emp_id: this.employeeDetail.emp_id,
          role_type: type,
          is_allow_access: false
        }
      } else {
        obj = {
          emp_id: this.employeeDetail.emp_id,
          role_type: type,
          is_allow_access: true
        }
      }
      this.action_setAccessPermission(obj)
    }
  },
  created() {
    if (this.$route.name == appConstants.routes.UPDATEEMPLOYEE) {
      this.employeeDetail = this.getEditEmployeeData
      this.isShowEmployeeId = true
    } else {
      this.isShowEmployeeId = false
    }
  }
}
</script>

<style scoped>
.form-conatiner {
  margin-top: 20px;
}
.chkurgent {
  transform: scale(2);
}
</style>
