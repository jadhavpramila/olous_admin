<template>
  <div class="cls-experience form-conatiner">
    <div class="form-container">
      <div class="page-body row">
        <div class="col-lg-10">
          <div class="form-group">
            <label class="app-primary-text-color fontSize16"
              >State the number of projects executed in the following Contract
              Sum brackets in last 3 years</label
            >
          </div>
          <!-- first row-->
          <div
            class="row"
            v-for="(experience_record, index) in $v.experienceData
              .experience_list.$each.$iter"
            :key="index"
          >
            <div class="col-lg-3 col-md-3 col-4">
              <input
                type="text"
                :readonly="true"
                tabindex="-1"
                class="form-control input-lg disbaled-text-black"
                :value="experience_record.$model.from_display_value"
              />
            </div>
            <div class="mt-auto mb-auto" style="width: 15px">
              <label class="to-lable">To</label>
            </div>
            <div class="col-lg-5 col-md-5 col-4">
              <input
                type="text"
                :readonly="true"
                tabindex="-1"
                class="form-control input-lg"
                :value="experience_record.$model.to_displau_value"
              />
            </div>
            <div class="col-3 col-left-padding col-right-padding">
              <v-select
                label="name"
                :searchable="false"
                v-model="experience_record.count.$model"
                :options="getNumberList"
                placeholder="select"
                :reduce="(options) => options.id"
                :closeOnSelect="true"
                class="single-value remove-close-btn"
              />
              <div
                v-if="submitted && !experience_record.count.required"
                class="invalid-feedback d-block"
              >
                required
              </div>
            </div>
          </div>
          <!-- End first row-->

          <div class="form-group" style="margin-top: 30px">
            <label class="app-primary-text-color fontSize16"
              >State your experience in following sectors in terms of volume of
              works done out of 100% in last 3 years</label
            >
          </div>

          <!-- Residential -->
          <div
            class="row"
            v-for="(sector_record, index) in $v.experienceData.sectors_list
              .$each.$iter"
            :key="getSectorIndex(index)"
          >
            <div class="col-lg-8 col-md-8 col-6 right-space">
              <input
                type="text"
                :readonly="true"
                tabindex="-1"
                class="form-control input-lg"
                :value="sector_record.$model.sector_name"
              />
            </div>
            <!-- below div added to adjust lenght with upper part-->
            <div style="width: 15px"></div>
            <div class="col-lg-3 col-md-3 col-5">
              <v-select
                label="name"
                :searchable="false"
                v-model="sector_record.value.$model"
                :options="getPercentageList"
                placeholder="select"
                :reduce="(options) => options.id"
                :closeOnSelect="true"
                class="single-value remove-close-btn"
              />
              <div
                v-if="submitted && !sector_record.value.required"
                class="invalid-feedback d-block"
              >
                required
              </div>
            </div>
          </div>
          <!-- End Residential -->

          <div class="row">
            <!-- To adjust with upper right align-->
            <div style="width: 15px"></div>
            <div align="right" style="margin-bottom: 10px" class="col-11">
              <button
                type="button"
                class="btn btn-dark save_btn"
                @click="saveExperience"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <modal
        v-if="showExperienceModal"
        @closeModal="updateExperienceModalData([false, ''])"
      >
        <div slot="body">{{ modalExperienceMessage }}</div>
      </modal>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import modal from '../../../common/Modal'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'Experience',
  components: {
    modal
  },
  data() {
    return {
      experienceData: {
        id: '',
        experience_list: [],
        sectors_list: []
      },
      submitted: false,
      sectors: {
        residential: 'Residential',
        commercial: 'Commercial',
        retail: 'Retail',
        hospitality: 'Hospitality',
        healthcare: 'Healthcare',
        industrialManufacturing: 'Industrial Manufacturing',
        industrialWarehouse: 'Industrial Warehouse',
        dataCentres: 'Data Centres',
        education: 'Education',
        sciencePharma: 'Science & Pharma',
        leisureSports: 'Leisure & Sports'
      }
    }
  },
  validations() {
    return {
      experienceData: {
        experience_list: {
          $each: {
            count: { required }
          }
        },
        sectors_list: {
          $each: {
            value: { required }
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters('dropdownValues', ['getNumberList', 'getPercentageList']),
    ...mapGetters('experience', [
      'getExperienceData',
      'showExperienceModal',
      'modalExperienceMessage'
    ]),
    ...mapGetters('companyData', ['getCurrentCompanyData'])
  },
  methods: {
    ...mapActions('dropdownValues', [
      'fetchNumberList',
      'fetchNumberPercentage'
    ]),
    ...mapActions('experience', ['fetchExperienceData', 'SaveExperienceData']),
    ...mapMutations('experience', ['updateExperienceModalData']),
    getSectorIndex(index) {
      return `sector${index}`
    },
    getSectorValue(SectorName) {
      let sector_item = this.experienceData.sectors_list.filter(
        (sector) => sector.sector_name == SectorName
      )

      if (sector_item.length > 0) {
        let result = sector_item[0].value === '' ? null : sector_item[0].value
        return result
      } else {
        return null
      }
    },
    saveExperience() {
      this.submitted = true
      if (this.$v.experienceData.$invalid) {
        return false
      }

      let new_experience = this.experienceData.experience_list.filter((res) => {
        return !res.id
      })

      let update_experience = this.experienceData.experience_list.filter(
        (res) => {
          return res.id
        }
      )

      var data = {
        company_id: this.getCurrentCompanyData.id,

        id: this.experienceData.id,

        add_experience_count: {
          company_id: this.getCurrentCompanyData.id,
          experience_list: new_experience
        },

        update_experience_count: {
          company_id: this.getCurrentCompanyData.id,
          experience_list: update_experience
        },

        residential_work: this.getSectorValue(this.sectors.residential),
        commercial_work: this.getSectorValue(this.sectors.commercial),

        retail_work: this.getSectorValue(this.sectors.retail),

        hospitality_work: this.getSectorValue(this.sectors.hospitality),

        healthcare_work: this.getSectorValue(this.sectors.healthcare),
        ind_manufacturing_work: this.getSectorValue(
          this.sectors.industrialManufacturing
        ),

        ind_warehouse_work: this.getSectorValue(
          this.sectors.industrialWarehouse
        ),

        data_centres_work: this.getSectorValue(this.sectors.dataCentres),

        education_work: this.getSectorValue(this.sectors.education),

        science_pharma_work: this.getSectorValue(this.sectors.sciencePharma),

        leisure_sports_work: this.getSectorValue(this.sectors.leisureSports)
      }

      this.SaveExperienceData(data).then(() => {
        this.setExperienceData(this.getExperienceData)
      })
    },
    setExperienceData(data) {
      //Set Experience count data
      if (data.experience.length > 0) {
        for (let saved_item of data.experience) {
          for (let item of this.experienceData.experience_list) {
            if (
              saved_item.from_amount == item.from_amount &&
              saved_item.to_amount == item.to_amount
            ) {
              item.id = saved_item.id
              item.currency = saved_item.currency
              item.count = saved_item.count == null ? '' : saved_item.count
            }
          }
        }
      }

      if (data.pqq.length == 0) {
        return
      }
      var db_data = data.pqq[0]

      this.experienceData.id = db_data.id

      //Set sector count data
      for (let sector_item of this.experienceData.sectors_list) {
        switch (sector_item.sector_name) {
          case this.sectors.residential:
            sector_item.value =
              db_data.residential_work == null ? '' : db_data.residential_work
            break

          case this.sectors.commercial:
            sector_item.value =
              db_data.commercial_work == null ? '' : db_data.commercial_work
            break

          case this.sectors.retail:
            sector_item.value =
              db_data.retail_work == null ? '' : db_data.retail_work
            break

          case this.sectors.hospitality:
            sector_item.value =
              db_data.hospitality_work == null ? '' : db_data.hospitality_work
            break

          case this.sectors.healthcare:
            sector_item.value =
              db_data.healthcare_work == null ? '' : db_data.healthcare_work
            break

          case this.sectors.industrialManufacturing:
            sector_item.value =
              db_data.ind_manufacturing_work == null
                ? ''
                : db_data.ind_manufacturing_work
            break

          case this.sectors.industrialWarehouse:
            sector_item.value =
              db_data.ind_warehouse_work == null
                ? ''
                : db_data.ind_warehouse_work
            break

          case this.sectors.dataCentres:
            sector_item.value =
              db_data.data_centres_work == null ? '' : db_data.data_centres_work
            break

          case this.sectors.education:
            sector_item.value =
              db_data.education_work == null ? '' : db_data.education_work
            break

          case this.sectors.sciencePharma:
            sector_item.value =
              db_data.science_pharma_work == null
                ? ''
                : db_data.science_pharma_work
            break

          case this.sectors.leisureSports:
            sector_item.value =
              db_data.leisure_sports_work == null
                ? ''
                : db_data.leisure_sports_work
            break
        }
      }
    },
    createExperienceList() {
      var experience_initial_data = [
        {
          id: '',
          from_amount: 1000000000,
          from_display_value: '100 Cr',
          to_amount: 10000000000,
          to_displau_value: '100+ Cr',
          currency: 1,
          count: ''
        },
        {
          id: '',
          from_amount: 500000000,
          from_display_value: '50 Cr',
          to_amount: 1000000000,
          to_displau_value: '100 Cr',
          currency: 1,
          count: ''
        },
        {
          id: '',
          from_amount: 250000000,
          from_display_value: '25 Cr',
          to_amount: 500000000,
          to_displau_value: '50 Cr',
          currency: 1,
          count: ''
        },
        {
          id: '',
          from_amount: 100000000,
          from_display_value: '10 Cr',
          to_amount: 250000000,
          to_displau_value: '25 Cr',
          currency: 1,
          count: ''
        },
        {
          id: '',
          from_amount: 50000000,
          from_display_value: '5 Cr',
          to_amount: 100000000,
          to_displau_value: '10 Cr',
          currency: 1,
          count: ''
        },
        {
          id: '',
          from_amount: 10000000,
          from_display_value: '1 Cr',
          to_amount: 50000000,
          to_displau_value: '5 Cr',
          currency: 1,
          count: ''
        },
        {
          id: '',
          from_amount: 5000000,
          from_display_value: '50 lakh',
          to_amount: 10000000,
          to_displau_value: '1 Cr',
          currency: 1,
          count: ''
        },
        {
          id: '',
          from_amount: 1000000,
          from_display_value: '10 lakh',
          to_amount: 5000000,
          to_displau_value: '50 lakhs',
          currency: 1,
          count: ''
        },
        {
          id: '',
          from_amount: 100000,
          from_display_value: '1 lakh',
          to_amount: 1000000,
          to_displau_value: '10 lakhs',
          currency: 1,
          count: ''
        }
      ]
      this.experienceData.experience_list = experience_initial_data

      var sector_initial_data = [
        {
          id: '',
          sector_name: this.sectors.residential,
          value: ''
        },
        {
          id: '',
          sector_name: this.sectors.commercial,
          value: ''
        },
        {
          id: '',
          sector_name: this.sectors.retail,
          value: ''
        },
        {
          id: '',
          sector_name: this.sectors.hospitality,
          value: ''
        },
        {
          id: '',
          sector_name: this.sectors.healthcare,
          value: ''
        },
        {
          id: '',
          sector_name: this.sectors.industrialManufacturing,
          value: ''
        },
        {
          id: '',
          sector_name: this.sectors.industrialWarehouse,
          value: ''
        },
        {
          id: '',
          sector_name: this.sectors.dataCentres,
          value: ''
        },
        {
          id: '',
          sector_name: this.sectors.education,
          value: ''
        },
        {
          id: '',
          sector_name: this.sectors.sciencePharma,
          value: ''
        },
        {
          id: '',
          sector_name: this.sectors.leisureSports,
          value: ''
        }
      ]

      this.experienceData.sectors_list = sector_initial_data
    }
  },
  created() {
    this.createExperienceList()
    this.fetchNumberList({ fromNumber: 0, toNumber: 100 })
    this.fetchNumberPercentage()
    this.fetchExperienceData(this.getCurrentCompanyData.id).then(() => {
      this.setExperienceData(this.getExperienceData)
    })
  }
}
</script>

<style scoped>
.to-lable {
  padding: 0px !important;
}
</style>
