<template>
  <div class="cls-registration form-conatiner">
    <div class="form-container">
      <div class="page-body">
        <!-- Reference 1 -->
        <div
          v-for="(reference_record, index) in $v.referenceData.references.$each
            .$iter"
          :key="index"
        >
          <div class="form-group">
            <label class="fontSize17 app-primary-text-color bold-text pl-0"
              >Reference {{ getRefCount(index) }}</label
            >
          </div>

          <div class="form-group">
            <label>Company</label>
            <input
              type="text"
              class="form-control input-lg"
              v-model="reference_record.client_company.$model"
            />
            <div
              v-if="submitted && !reference_record.client_company.required"
              class="invalid-feedback d-block"
            >
              Company name is required
            </div>
          </div>

          <div class="form-group">
            <label>Nature of work completed</label>
            <input
              type="text"
              class="form-control input-lg"
              v-model="reference_record.nature_of_work_comp.$model"
            />
            <div
              v-if="submitted && !reference_record.nature_of_work_comp.required"
              class="invalid-feedback d-block"
            >
              Nature of work completed is required
            </div>
          </div>

          <div class="form-group">
            <label>Client Name</label>
            <input
              type="text"
              class="form-control input-lg"
              v-model="reference_record.client_name.$model"
            />
            <div
              v-if="submitted && !reference_record.client_name.required"
              class="invalid-feedback d-block"
            >
              Client Name is required
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6 col-md-6">
              <div class="form-group">
                <label>Mobile No.</label>
                <input
                  type="text"
                  class="form-control input-lg"
                  v-model="reference_record.$model.mobile_no"
                />
                <div
                  v-if="submitted && !reference_record.mobile_no.numeric"
                  class="invalid-feedback d-block"
                >
                  Mobile no. is not valid
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-6">
              <div class="form-group">
                <label>Email</label>
                <input
                  type="text"
                  class="form-control input-lg"
                  v-model="reference_record.email.$model"
                />
                <div
                  v-if="submitted && !reference_record.email.required"
                  class="invalid-feedback d-block"
                >
                  Email id is required
                </div>
                <div
                  v-if="submitted && !reference_record.email.email"
                  class="invalid-feedback d-block"
                >
                  Email id is not valid
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- End Reference 1 -->

        <div align="right" style="margin-bottom: 10px">
          <button
            type="button"
            class="btn btn-dark save_btn"
            @click="saveUpdateReferenceData"
          >
            Save
          </button>
        </div>
      </div>
      <modal
        v-if="showReferenceModal"
        @closeModal="updateReferenceModalData([false, ''])"
      >
        <div slot="body">{{ modalReferenceMessage }}</div>
      </modal>
    </div>
  </div>
</template>

<script>
import { required, email, numeric } from 'vuelidate/lib/validators'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import modal from '../../../common/Modal'

export default {
  name: 'References',
  components: {
    modal
  },
  data() {
    return {
      referenceData: {
        references: [
          {
            id: '',
            client_company: '',
            nature_of_work_comp: '',
            client_name: '',
            mobile_no: '',
            email: ''
          },
          {
            id: '',
            client_company: '',
            nature_of_work_comp: '',
            client_name: '',
            mobile_no: '',
            email: ''
          }
        ]
      },
      submitted: false
    }
  },
  validations() {
    return {
      referenceData: {
        references: {
          $each: {
            client_company: { required },
            nature_of_work_comp: { required },
            client_name: { required },
            email: { required, email },
            mobile_no: { numeric }
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters('reference', [
      'getReferenceData',
      'showReferenceModal',
      'modalReferenceMessage'
    ]),
    ...mapGetters('companyData', ['getCurrentCompanyData'])
  },
  methods: {
    ...mapActions('reference', [
      'fetchReferenceData',
      'saveReferenceData',
      'updateReferenceData'
    ]),
    ...mapMutations('reference', ['updateReferenceModalData']),
    saveUpdateReferenceData() {
      this.submitted = true
      if (this.$v.referenceData.$invalid) {
        return false
      }

      var data = {
        company_id: this.getCurrentCompanyData.id,
        references: this.referenceData.references
      }

      if (this.referenceData.references[0].id != '') {
        this.updateReferenceData(data).then(() => {
          this.setReferenceData(this.getReferenceData)
        })
      } else {
        this.saveReferenceData(data).then(() => {
          this.setReferenceData(this.getReferenceData)
        })
      }
    },
    setReferenceData(data) {
      if (data.length == 0) {
        return
      }

      for (var i = 0; i < data.length; i++) {
        this.referenceData.references[i].id = data[i].id

        this.referenceData.references[i].client_company = data[i].client_company

        this.referenceData.references[i].nature_of_work_comp =
          data[i].nature_of_work_comp

        this.referenceData.references[i].client_name = data[i].client_name

        this.referenceData.references[i].mobile_no = data[i].mobile_no

        this.referenceData.references[i].email = data[i].email
      }
    },
    getRefCount(index) {
      return parseInt(index) + 1
    }
  },
  created() {
    this.fetchReferenceData(this.getCurrentCompanyData.id).then(() => {
      this.setReferenceData(this.getReferenceData.references)
    })
  }
}
</script>

<style scoped></style>
