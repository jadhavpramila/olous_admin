<template>
  <div class="cls-resources form-conatiner">
    <div class="form-container">
      <div class="page-body row">
        <div class="col-lg-10 col-md-10">
          <div class="form-group" style="display: flex">
            <div style="display: flex; flex-direction: column; flex-grow: 1">
              <label
                class="app-primary-text-color fontSize16 bold-text"
                style="margin-right: 15px"
              >
                Provide Organisation Chart
              </label>
              <div
                v-if="submitted && !$v.resourcesData.org_chart_pdf.required"
                class="invalid-feedback d-block"
              >
                Organisation chart required, please attach.
              </div>
            </div>
            <div style="width: 70px; margin-right: 15px">
              <UploadImage
                v-if="resourcesData.org_chart_pdf === ''"
                id="yearOne"
                component_height="40"
                is_logo_image="false"
                is_upload_pdf="true"
                :save_image_path_value="path_s3_save_pdf"
                is_object_fit_contain="false"
                @uploadedImage_changed="getOrganisationChart"
              ></UploadImage>
              <img
                v-else
                class="attachment-uploaded"
                src="../../../assets/img/Attachment_selected.svg"
              />
            </div>
            <div style="width: 48px">
              <div>
                <!--<img
                  class="cursor-pointer"
                  src="../../assets/img/Trash.svg"
                  title="Trash"
                  style="height: 44px"
                  @click="removeOrganisationChart"
                />-->

                <Trash
                  id="organisationchart"
                  component_height="40"
                  tooltip="Remove attachment"
                  @trash_event="removeOrganisationChart"
                ></Trash>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label class="app-primary-text-color fontSize16 bold-text"
              >State Number of Employees in following categories</label
            >
          </div>

          <!-- Managerial -->
          <div class="row">
            <div class="col-lg-8 col-md-8 col-6">
              <input
                type="text"
                :readonly="true"
                class="form-control input-lg"
                value="Managerial"
              />
            </div>
            <div class="col-lg-4 col-md-4 col-6">
              <!--<v-select
                label="name"
                :searchable="false"
                v-model="resourcesData.managerial_emp_count"
                :options="getNumberOfEmployeeList"
                placeholder="select"
                :reduce="(options) => options.id"
                :closeOnSelect="true"
                class="single-value remove-close-btn"
              />-->
              <input
                type="text"
                class="form-control input-lg show-placeholder"
                placeholder="Count"
                autocomplete="off"
                v-model="resourcesData.managerial_emp_count"
                @input="integerValueOnly($event, category.managerial)"
              />
              <div
                v-if="
                  submitted && !$v.resourcesData.managerial_emp_count.required
                "
                class="invalid-feedback d-block"
              >
                required
              </div>
              <div
                v-if="
                  submitted && !$v.resourcesData.managerial_emp_count.numeric
                "
                class="invalid-feedback d-block"
              >
                Invalid value
              </div>
            </div>
          </div>
          <!-- End Managerial -->

          <!-- Technical -->
          <div class="row">
            <div class="col-lg-8 col-md-8 col-6">
              <input
                type="text"
                :readonly="true"
                class="form-control input-lg"
                value="Technical"
              />
            </div>
            <div class="col-lg-4 col-md-4 col-6">
              <input
                type="text"
                autocomplete="off"
                class="form-control input-lg show-placeholder"
                placeholder="Count"
                v-model="resourcesData.technical_emp_count"
                @input="integerValueOnly($event, category.technical)"
              />
              <div
                v-if="
                  submitted && !$v.resourcesData.technical_emp_count.required
                "
                class="invalid-feedback d-block"
              >
                required
              </div>
              <div
                v-if="
                  submitted && !$v.resourcesData.technical_emp_count.numeric
                "
                class="invalid-feedback d-block"
              >
                Invalid value
              </div>
            </div>
          </div>
          <!-- End Technical -->

          <!-- Operatives -->
          <div class="row">
            <div class="col-lg-8 col-md-8 col-6">
              <input
                type="text"
                :readonly="true"
                class="form-control input-lg"
                value="Operatives"
              />
            </div>
            <div class="col-lg-4 col-md-4 col-6">
              <input
                type="text"
                autocomplete="off"
                class="form-control input-lg show-placeholder"
                placeholder="Count"
                v-model="resourcesData.operatives_emp_count"
                @input="integerValueOnly($event, category.operatives)"
              />
              <div
                v-if="
                  submitted && !$v.resourcesData.operatives_emp_count.required
                "
                class="invalid-feedback d-block"
              >
                required
              </div>
              <div
                v-if="
                  submitted && !$v.resourcesData.operatives_emp_count.numeric
                "
                class="invalid-feedback d-block"
              >
                Invalid value
              </div>
            </div>
          </div>
          <!-- End Operatives -->

          <!-- Quality -->
          <div class="row">
            <div class="col-lg-8 col-md-8 col-6">
              <input
                type="text"
                :readonly="true"
                class="form-control input-lg"
                value="Quality"
              />
            </div>
            <div class="col-lg-4 col-md-4 col-6">
              <input
                type="text"
                autocomplete="off"
                class="form-control input-lg show-placeholder"
                placeholder="Count"
                v-model="resourcesData.quality_emp_count"
                @input="integerValueOnly($event, category.quality)"
              />
              <div
                v-if="submitted && !$v.resourcesData.quality_emp_count.required"
                class="invalid-feedback d-block"
              >
                required
              </div>
              <div
                v-if="submitted && !$v.resourcesData.quality_emp_count.numeric"
                class="invalid-feedback d-block"
              >
                Invalid value
              </div>
            </div>
          </div>
          <!-- End Quality -->

          <!-- Safety -->
          <div class="row">
            <div class="col-lg-8 col-md-8 col-6">
              <input
                type="text"
                :readonly="true"
                class="form-control input-lg"
                value="Safety"
              />
            </div>
            <div class="col-lg-4 col-md-4 col-6">
              <input
                type="text"
                autocomplete="off"
                class="form-control input-lg show-placeholder"
                placeholder="Count"
                v-model="resourcesData.safety_emp_count"
                @input="integerValueOnly($event, category.safety)"
              />
              <div
                v-if="submitted && !$v.resourcesData.safety_emp_count.required"
                class="invalid-feedback d-block"
              >
                required
              </div>
              <div
                v-if="submitted && !$v.resourcesData.safety_emp_count.numeric"
                class="invalid-feedback d-block"
              >
                Invalid value
              </div>
            </div>
          </div>
          <!-- End Safety -->

          <!-- Administrative -->
          <div class="row">
            <div class="col-lg-8 col-md-8 col-6">
              <input
                type="text"
                :readonly="true"
                class="form-control input-lg"
                value="Administrative"
              />
            </div>
            <div class="col-lg-4 col-md-4 col-6">
              <input
                type="text"
                autocomplete="off"
                class="form-control input-lg show-placeholder"
                placeholder="Count"
                v-model="resourcesData.administrative_emp_count"
                @input="integerValueOnly($event, category.administrativ)"
              />
              <div
                v-if="
                  submitted &&
                  !$v.resourcesData.administrative_emp_count.required
                "
                class="invalid-feedback d-block"
              >
                required
              </div>
              <div
                v-if="
                  submitted &&
                  !$v.resourcesData.administrative_emp_count.numeric
                "
                class="invalid-feedback d-block"
              >
                Invalid value
              </div>
            </div>
          </div>
          <!-- End Administrative -->

          <!-- Sub contract list -->
          <div class="form-group mt-2">
            <label
              >Confirm list of works that you generally sub contract.</label
            >

            <div style="display: flex">
              <div style="flex-grow: 1; margin-right: 15px">
                <v-select
                  id="subContract"
                  label="name"
                  :searchable="false"
                  v-model="selected_sub_contract"
                  :options="getWorkList"
                  placeholder="select"
                  :reduce="(options) => options.id"
                  :closeOnSelect="true"
                  class="single-value remove-close-btn"
                />
              </div>
              <div style="height: 40px; margin-top: 3px; padding-left: 0px">
                <button
                  type="button"
                  class="btn btn-dark save_btn"
                  @click="addSubContract"
                >
                  + Add
                </button>
              </div>
            </div>
            <div class="row">
              <div
                class="col-12"
                v-for="(sub_contract, index) in resourcesData.sub_contract_list"
                :key="index"
              >
                <div style="display: flex">
                  <div style="flex-grow: 1; margin-right: 15px">
                    <input
                      type="text"
                      :readonly="true"
                      class="form-control input-lg show-placeholder"
                      :value="getNameOfSubContract(sub_contract)"
                    />
                  </div>
                  <div style="width: 48px; margin-top: 2px">
                    <!--<img
                      class="cursor-pointer year-attachment-uploaded"
                      src="../../assets/img/Trash.svg"
                      title="Trash"
                      @click="removeFromSubContract(sub_contract)"
                    />-->
                    <Trash
                      id="SubContract"
                      component_height="40"
                      tooltip="Remove attachment"
                      @trash_event="removeFromSubContract(sub_contract)"
                    ></Trash>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- End Sub contract list -->

          <!-- Equipment Details header -->
          <!--<div><label>List the machinery & Equipments that you own</label></div>
          <div class="row">
            <div class="col-lg-4 col-md-4">
              <input
                type="text"
                :readonly="true"
                :disabled="true"
                class="form-control input-lg dark-background"
                value="Equipment Brand"
              />

              <v-select
                label="name"
                :searchable="false"
                v-model="equipment_add.equipment_brand"
                :options="getEquipmentBrandList"
                placeholder="select"
                :reduce="(category) => category.id"
                :closeOnSelect="true"
                class="single-value remove-close-btn"
              />
              <div
                v-if="isAddEquipment && equipment_add.equipment_brand == ''"
                class="invalid-feedback d-block"
              >
                Equipment brand is required
              </div>
            </div>

            <div class="col-lg-4 col-md-4">
              <input
                type="text"
                :readonly="true"
                :disabled="true"
                class="form-control input-lg dark-background"
                value="Equipment Type"
              />

              <v-select
                label="name"
                :searchable="false"
                v-model="equipment_add.equipment_type"
                :options="getEquipmentTypeList"
                placeholder="select"
                :reduce="(category) => category.id"
                :closeOnSelect="true"
                class="single-value remove-close-btn"
              />
              <div
                v-if="isAddEquipment && equipment_add.equipment_type == ''"
                class="invalid-feedback d-block"
              >
                Equipment type is required
              </div>
            </div>

            <div class="col-lg-2 col-md-2 header-input">
              <input
                type="text"
                :readonly="true"
                :disabled="true"
                class="form-control input-lg dark-background"
                value="Nos."
              />

              <input
                type="text"
                class="form-control input-lg show-placeholder"
                placeholder="Count"
                autocomplete="off"
                v-model="equipment_add.equip_count"
                @input="integerValueOnly($event, category.equipment)"
              />
              <div
                v-if="isAddEquipment && equipment_add.equip_count == ''"
                class="invalid-feedback d-block"
              >
                required
              </div>
            </div>

            <div align="right" class="col-lg-2 col-md-2">
              <div>
                <button
                  type="button"
                  class="btn btn-dark"
                  style="visibility: hidden; min-width: 100px"
                ></button>
                <button
                  type="button"
                  class="btn btn-dark save_btn"
                  style="margin-top: 10px"
                  @click="addEquipmentDetails"
                >
                  + Add
                </button>
              </div>
            </div>
          </div>

          <div
            class="row"
            v-for="(equipmentData, index) in this.resourcesData.equipment_list"
            :key="index"
          >
            <div class="col-lg-4 col-md-4">
              <input
                type="text"
                :readonly="true"
                class="form-control input-lg"
                :value="getNameOfEquipmentBrand(equipmentData.equipment_brand)"
              />
            </div>

            <div class="col-lg-4 col-md-4">
              <input
                type="text"
                :readonly="true"
                class="form-control input-lg"
                :value="getNameOfEquipmentType(equipmentData.equipment_type)"
              />
            </div>

            <div class="col-lg-2 col-md-2 header-input">
              <input
                type="text"
                :readonly="true"
                class="form-control input-lg"
                v-model="equipmentData.equip_count"
              />
            </div>

            <div align="right" class="col-lg-2 col-md-2">
              <div style="max-width: 70px">
                <Trash
                  id="EquipmentRecord"
                  component_height="40"
                  tooltip="Remove attachment"
                  @trash_event="deleteEquipmentRecord(index)"
                ></Trash>
              </div>
            </div>
            <hr style="width: 75%" class="equipment_seperator_line" />
          </div>-->
          <!-- End Equipment -->

          <div align="right" style="margin-bottom: 10px">
            <button
              type="button"
              class="btn btn-dark save_btn mt-3"
              @click="saveResourcesEquipmentData"
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <modal
        v-if="showResourcesModal"
        @closeModal="updateResourcesModalData([false, ''])"
      >
        <div slot="body">{{ modalResourcesMessage }}</div>
      </modal>

      <modal v-if="showInfoModal" @closeModal="closeInfoModal">
        <div slot="body">{{ modalInfoMessage }}</div>
      </modal>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import modal from '../../../common/Modal'
import appConstants from '../../../appConstants.js'
import UploadImage from '../../common/UploadImage'
import { required, numeric } from 'vuelidate/lib/validators'
import Trash from '../../common/Trash'

export default {
  name: 'Resources',
  components: {
    modal,
    UploadImage,
    Trash
  },
  data() {
    return {
      resourcesData: {
        id: '',
        org_chart_pdf: '',
        managerial_emp_count: '',
        technical_emp_count: '',
        operatives_emp_count: '',
        quality_emp_count: '',
        safety_emp_count: '',
        administrative_emp_count: '',
        sub_contract_list: [],
        equipment_list: []
      },
      path_s3_save_pdf: appConstants.PATH_SAVE_PDF_ON_S3,
      submitted: false,
      selected_sub_contract: '',
      equipment_add: {
        id: '',
        equipment_brand: '',
        equipment_type: '',
        equip_count: ''
      },
      isAddEquipment: false,
      showInfoModal: false,
      modalInfoMessage: '',
      category: {
        managerial: 1,
        technical: 2,
        operatives: 3,
        quality: 4,
        safety: 5,
        administrativ: 6,
        equipment: 7
      },
      equipmentToDelete: []
    }
  },
  validations() {
    return {
      resourcesData: {
        org_chart_pdf: { required },
        managerial_emp_count: { required, numeric },
        technical_emp_count: { required, numeric },
        operatives_emp_count: { required, numeric },
        quality_emp_count: { required, numeric },
        safety_emp_count: { required, numeric },
        administrative_emp_count: { required, numeric }
      }
    }
  },
  computed: {
    ...mapGetters('dropdownValues', [
      'getWorkList',
      'getEquipmentBrandList',
      'getEquipmentTypeList',
      'getNumberList'
    ]),
    ...mapGetters('companyData', ['getCurrentCompanyData']),
    ...mapGetters('resources', [
      'getResourcesData',
      'showResourcesModal',
      'modalResourcesMessage'
    ])
  },
  methods: {
    ...mapActions('dropdownValues', [
      'fetchWorkList',
      'fetchEquipmentBrandList',
      'fetchEquipmentTypeList',
      'fetchNumberList'
    ]),
    ...mapActions('resources', ['fetchResourcesData', 'SaveResourcesData']),
    ...mapMutations('resources', ['updateResourcesModalData']),
    getOrganisationChart(value) {
      this.resourcesData.org_chart_pdf = value.image_name
    },
    getFileKeyTodelete(fileName) {
      return `${this.path_s3_save_pdf}${fileName}`
    },
    removeOrganisationChart() {
      this.resourcesData.org_chart_pdf = ''
    },
    closeInfoModal() {
      this.showInfoModal = false
      this.modalInfoMessage = ''
    },
    addSubContract() {
      if (this.selected_sub_contract != '') {
        var is_already_addded = false

        for (let i = 0; i < this.resourcesData.sub_contract_list.length; i++) {
          if (
            this.resourcesData.sub_contract_list[i] ==
            this.selected_sub_contract
          ) {
            is_already_addded = true
          }
        }

        if (!is_already_addded) {
          this.resourcesData.sub_contract_list.push(this.selected_sub_contract)
        }

        this.selected_sub_contract = ''
      }
    },
    removeFromSubContract(value) {
      for (
        var index = 0;
        index < this.resourcesData.sub_contract_list.length;
        index++
      ) {
        if (this.resourcesData.sub_contract_list[index] == value) {
          this.resourcesData.sub_contract_list.splice(index, 1)
        }
      }
    },
    addEquipmentDetails() {
      if (
        this.equipment_add.equipment_brand == '' ||
        this.equipment_add.equipment_type == '' ||
        this.equipment_add.equip_count == ''
      ) {
        this.isAddEquipment = true
        return
      }

      this.isAddEquipment = false
      var new_equipment_details = {
        id: '',
        equipment_brand: this.equipment_add.equipment_brand,
        equipment_type: this.equipment_add.equipment_type,
        equip_count: this.equipment_add.equip_count
      }

      var addRecord = true
      for (
        var index = 0;
        index < this.resourcesData.equipment_list.length;
        index++
      ) {
        if (
          this.resourcesData.equipment_list[index].equipment_brand ==
            this.equipment_add.equipment_brand &&
          this.resourcesData.equipment_list[index].equipment_type ==
            this.equipment_add.equipment_type
        ) {
          this.showInfoModal = true
          this.modalInfoMessage = 'Record already added'
          this.isAddEquipment = false
          addRecord = false
        }
      }
      if (addRecord) {
        this.resourcesData.equipment_list.push(new_equipment_details)
      }
      this.equipment_add.equipment_brand = ''
      this.equipment_add.equipment_type = ''
      this.equipment_add.equip_count = ''
    },
    getNameOfSubContract(value) {
      for (var index = 0; index < this.getWorkList.length; index++) {
        if (value == this.getWorkList[index].id) {
          return this.getWorkList[index].name
        }
      }
    },
    getNameOfEquipmentBrand(value) {
      for (var index = 0; index < this.getEquipmentBrandList.length; index++) {
        if (value == this.getEquipmentBrandList[index].id) {
          return this.getEquipmentBrandList[index].name
        }
      }
    },
    getNameOfEquipmentType(value) {
      for (var index = 0; index < this.getEquipmentTypeList.length; index++) {
        if (value == this.getEquipmentTypeList[index].id) {
          return this.getEquipmentTypeList[index].name
        }
      }
    },
    deleteEquipmentRecord(index) {
      if (this.resourcesData.equipment_list[index].id != '') {
        this.equipmentToDelete.push(this.resourcesData.equipment_list[index].id)
      }
      this.resourcesData.equipment_list.splice(index, 1)
    },
    saveResourcesEquipmentData() {
      this.selected_sub_contract = ''

      this.submitted = true
      if (this.$v.resourcesData.$invalid) {
        return false
      }

      let new_equipment = this.resourcesData.equipment_list.filter((res) => {
        return !res.id
      })

      var resource_data_to_save = {
        company_id: this.getCurrentCompanyData.id,
        id: this.resourcesData.id,
        org_chart_pdf: this.resourcesData.org_chart_pdf,

        managerial_emp_count:
          this.resourcesData.managerial_emp_count === ''
            ? null
            : this.resourcesData.managerial_emp_count,

        technical_emp_count:
          this.resourcesData.technical_emp_count === ''
            ? null
            : this.resourcesData.technical_emp_count,

        operatives_emp_count:
          this.resourcesData.operatives_emp_count === ''
            ? null
            : this.resourcesData.operatives_emp_count,

        quality_emp_count:
          this.resourcesData.quality_emp_count === ''
            ? null
            : this.resourcesData.quality_emp_count,

        safety_emp_count:
          this.resourcesData.safety_emp_count === ''
            ? null
            : this.resourcesData.safety_emp_count,

        administrative_emp_count:
          this.resourcesData.administrative_emp_count === ''
            ? null
            : this.resourcesData.administrative_emp_count,

        sub_contract_list: this.resourcesData.sub_contract_list,

        add_equipments: {
          company_id: this.getCurrentCompanyData.id,
          equipments: new_equipment
        },

        del_equipments: {
          company_id: this.getCurrentCompanyData.id,
          equipment_ids: this.equipmentToDelete
        }
      }

      this.SaveResourcesData(resource_data_to_save).then(() => {
        this.setResourcesData(this.getResourcesData)
      })
    },
    integerValueOnly(e, category) {
      let res = e.target.value.replace(/[^0-9]/g, '')
      switch (category) {
        case this.category.managerial:
          this.resourcesData.managerial_emp_count = res
          break
        case this.category.technical:
          this.resourcesData.technical_emp_count = res
          break
        case this.category.operatives:
          this.resourcesData.operatives_emp_count = res
          break
        case this.category.quality:
          this.resourcesData.quality_emp_count = res
          break
        case this.category.safety:
          this.resourcesData.safety_emp_count = res
          break
        case this.category.administrativ:
          this.resourcesData.administrative_emp_count = res
          break
        case this.category.equipment:
          this.equipment_add.equip_count = res
          break
      }
    },
    setResourcesData(data) {
      if (data.pqq.length > 0) {
        let res_data = data.pqq[0]

        this.resourcesData.id = res_data.id
        this.resourcesData.org_chart_pdf = res_data.org_chart_pdf

        this.resourcesData.managerial_emp_count =
          res_data.managerial_emp_count == null
            ? ''
            : res_data.managerial_emp_count

        this.resourcesData.technical_emp_count =
          res_data.technical_emp_count == null
            ? ''
            : res_data.technical_emp_count

        this.resourcesData.operatives_emp_count =
          res_data.operatives_emp_count == null
            ? ''
            : res_data.operatives_emp_count

        this.resourcesData.quality_emp_count =
          res_data.quality_emp_count == null ? '' : res_data.quality_emp_count

        this.resourcesData.safety_emp_count =
          res_data.safety_emp_count == null ? '' : res_data.safety_emp_count

        this.resourcesData.administrative_emp_count =
          res_data.administrative_emp_count == null
            ? ''
            : res_data.administrative_emp_count

        this.resourcesData.sub_contract_list = res_data.sub_contract_list
      }

      this.resourcesData.equipment_list = []

      if (data.equipments.length > 0) {
        for (let i = 0; i < data.equipments.length; i++) {
          let temp = data.equipments[i]
          var db_equipment_details = {
            id: temp.id,
            equipment_brand: temp.equipment_brand,
            equipment_type: temp.equipment_type,
            equip_count: temp.equip_count
          }
          this.resourcesData.equipment_list.push(db_equipment_details)
        }
      }
    }
  },
  created() {
    this.fetchWorkList()
    this.fetchEquipmentBrandList()
    this.fetchEquipmentTypeList()
    this.fetchNumberList({ fromNumber: 1, toNumber: 50 })
    this.fetchResourcesData(this.getCurrentCompanyData.id).then(() => {
      this.setResourcesData(this.getResourcesData)
    })
  }
}
</script>

<style scoped>
.sub-work_list-card {
  display: flex;
  background-color: #f2f2f2;
  justify-content: space-between;
  padding: 5px;
  border-radius: 5px;
  min-height: 30px;
  margin-bottom: 5px;
  font-weight: 500;
}
</style>
