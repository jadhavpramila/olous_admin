<template>
  <div class="marketing">
    <div class="form-conatiner">
      <!--<div>
        <input
          type="radio"
          id="template1"
          name="templates"
          :value="1"
          v-model="marktingData.selected_template"
        />

        <label>Template 1 </label>
        <br />
        <input
          type="radio"
          id="template1"
          name="templates"
          :value="2"
          v-model="marktingData.selected_template"
        />
        <label>Template 2</label>
        <br />
        <input
          type="radio"
          id="template1"
          name="templates"
          :value="3"
          v-model="marktingData.selected_template"
        />
        <label>Template 3 </label>
      </div>-->
      <input
        id="dataFile"
        :accept="imageTypes"
        ref="marketingFile"
        @change="onFileSelected()"
        type="file"
      />
      <div>
        <div
          :class="{
            'is-invalid': submitted && $v.marktingData.selected_file.$invalid
          }"
        ></div>
        <div
          v-if="submitted && !$v.marktingData.selected_file.$required"
          class="invalid-feedback mb-2"
        >
          Required CSV file
        </div>
      </div>
      <div class="mt-4">
        <button
          type="button"
          style="margin-top: 5px"
          class="btn btn-dark"
          @click="sendMarketingEmail(index)"
        >
          Send Email
        </button>
      </div>
    </div>
    <modal
      v-if="showMarketingModal"
      @closeModal="updateShowMarketingModal([false, ''])"
    >
      <div slot="body">{{ marketingModalMessage }}</div>
    </modal>

    <modal v-if="showErrorModal" @closeModal="showErrorModal = false">
      <div slot="body">{{ erorModalMessage }}</div>
    </modal>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import uploadFileOnS3 from '../../mixins/uploadFileOnS3.js'
import modal from '../../common/Modal.vue'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'Marketing',
  mixins: [uploadFileOnS3],
  components: {
    modal
  },
  data() {
    return {
      marktingData: {
        selected_file: '',
        selected_template: 'aaa'
      },
      showErrorModal: false,
      erorModalMessage: '',
      submitted: false,
      imageTypes: '.csv'
    }
  },
  validations() {
    return {
      marktingData: {
        selected_file: { required },
        selected_template: { required }
      }
    }
  },
  computed: {
    ...mapGetters('marketing', ['showMarketingModal', 'marketingModalMessage'])
  },
  methods: {
    ...mapMutations('marketing', [
      'updateShowMarketingModal',
      'clearAllPreviousMarketingData'
    ]),
    ...mapActions('marketing', ['sendMarketingTemplate']),
    onFileSelected() {
      let marketingFile = this.$refs.marketingFile.files[0]
      if (!marketingFile) {
        this.marktingData.selected_file = ''
      } else {
        this.marktingData.selected_file = marketingFile
      }
    },
    sendMarketingEmail() {
      this.submitted = true
      if (this.$v.marktingData.$invalid) {
        console.log('Required data')
        return false
      }

      let imgExt = this.marktingData.selected_file.name.substr(
        this.marktingData.selected_file.name.lastIndexOf('.')
      )

      if (imgExt == '.csv') {
        var data = {
          file: this.marktingData.selected_file,
          template_id: this.marktingData.selected_template
        }

        this.sendMarketingTemplate(data)
      } else {
        this.showErrorModal = true
        this.erorModalMessage = "Please select 'CSV' file"
      }
    }
  },
  created() {
    this.clearAllPreviousMarketingData()
  }
}
</script>

<style lang="scss" scoped></style>
