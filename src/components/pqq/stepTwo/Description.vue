<template>
  <div class="cls-description form-conatiner">
    <div class="form-container">
      <div class="page-body">
        <div class="row">
          <div class="col-lg-6 row">
            <div class="col-5">
              <UploadImageAndPreview
                v-if="isDataLoaded"
                id="logoImage"
                component_height="150"
                is_logo_image="true"
                :save_image_path_value="path_s3_save_image"
                :read_image_path_value="read_s3_image_url"
                :image_name_value="descriptionData.logo"
                :submitted="false"
                is_object_fit_contain="true"
                upload_button_text="Add Logo"
                required_validation_message="Logo is required"
                @uploadedImage_changed="getUpdatedLogoImage"
              ></UploadImageAndPreview>
            </div>
            <div class="col-7">
              <UploadImageAndPreview
                v-if="isDataLoaded"
                id="coverImage"
                component_height="150"
                is_logo_image="false"
                :save_image_path_value="path_s3_save_image"
                :read_image_path_value="read_s3_image_url"
                :image_name_value="descriptionData.banner_image"
                :submitted="submitted"
                is_object_fit_contain="false"
                upload_button_text="Add Cover Image"
                required_validation_message="Cover image is required"
                @uploadedImage_changed="getUpdatedCoverImage"
              ></UploadImageAndPreview>
            </div>
          </div>
        </div>

        <div class="form-group mt-5">
          <label class="app-primary-text-color">Long Description</label>
          <b-form-textarea
            name="longDesc"
            v-model="descriptionData.longDesc"
            placeholder="Enter Long Description..."
            cols="40"
            rows="7"
            max-rows="15"
            maxlength="1000"
            no-resize
            v-on:keyup="getLongDescriptionLength($event.target.value)"
            class="form-control"
          ></b-form-textarea>
          <div
            style="
              display: flex;

              margin-top: -10px;
              justify-content: space-between;
            "
          >
            <div
              v-if="submitted && !$v.descriptionData.longDesc.required"
              class="invalid-feedback d-block"
              style="width: 100%; margin-right: auto"
            >
              Long Description is required
            </div>

            <div
              v-if="submitted && !$v.descriptionData.longDesc.minLength"
              class="invalid-feedback d-block"
              style="width: 100%"
            >
              Long Description minimum 200 characters required
            </div>

            <div
              v-if="submitted && !$v.descriptionData.longDesc.maxLength"
              class="invalid-feedback d-block"
              style="width: 100%"
            >
              Long Description max 1000 characters required
            </div>

            <div style="width: 100%" class="mb-0 text-right">
              <label>
                {{ remainingLongDescLength }}/{{ longDescTotalLength }}</label
              >
            </div>
          </div>
        </div>

        <div class="form-group row mt-n2">
          <div class="col-md-6">
            <label>Business Turnover</label>
            <v-select
              id="turnOver"
              label="name"
              :searchable="false"
              v-model="descriptionData.turnover"
              :options="getTurnOverOptions"
              placeholder="select"
              :reduce="(turnover) => turnover.id"
              :closeOnSelect="true"
              class="single-value remove-close-btn"
            />
          </div>
          <div class="col-md-6">
            <label>Min.Value of Work</label>
            <v-select
              id="minworkValue"
              label="name"
              v-model="descriptionData.min_work_value"
              :options="getMinWorkOptions"
              placeholder="select"
              :reduce="(turnover) => turnover.id"
              :closeOnSelect="true"
              class="single-value remove-close-btn"
            />
          </div>
        </div>

        <div>
          <div align="right">
            <button
              type="button"
              class="btn btn-dark save_btn mt-2 mb-2"
              @click="btnSave"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
    <modal
      v-if="showDescriptionModal"
      @closeModal="updateDescriptionModalValues([false, ''])"
    >
      <div slot="body">{{ this.modalDescriptionMessage }}</div>
    </modal>
  </div>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import modal from '../../../common/Modal'
import UploadImageAndPreview from '../../common/UploadImageAndPreview'
import appConstants from '../../../appConstants.js'

export default {
  name: 'Description',
  components: {
    UploadImageAndPreview,
    modal
  },
  data() {
    return {
      descriptionData: {
        id: '',
        logo: '', //'7dfe49f0-fc37-11eb-b9ef-47336092d23d.png',
        banner_image: '', // '7dfe49f0-fc37-11eb-b9ef-47336092d23d.png',
        longDesc: '',
        turnover: '',
        min_work_value: ''
      },

      submitted: false,
      remainingLongDescLength: 1000,
      longDescTotalLength: 1000,
      path_s3_save_image: appConstants.PATH_SAVE_IMAGE_ON_S3,
      read_s3_image_url: process.env.VUE_APP_IMGURL,
      isDataLoaded: false
    }
  },
  validations() {
    return {
      descriptionData: {
        banner_image: { required },
        longDesc: {
          required,
          minLength: minLength(200),
          maxLength: maxLength(1000)
        }
      }
    }
  },
  computed: {
    ...mapGetters('dropdownValues', [
      'getTurnOverOptions',
      'getMinWorkOptions'
    ]),
    ...mapGetters('description', [
      'showDescriptionModal',
      'modalDescriptionMessage'
    ]),
    ...mapGetters('companyData', ['getCurrentCompanyData'])
  },
  methods: {
    ...mapActions('dropdownValues', ['fetchTurnover', 'fetchMinWork']),
    ...mapActions('description', [
      'fetchDescriptionData',
      'updateDescriptionData'
    ]),
    ...mapMutations('description', ['updateDescriptionModalValues']),
    getLongDescriptionLength(e) {
      this.remainingLongDescLength = this.longDescTotalLength - e.length
    },
    getUpdatedLogoImage(value) {
      this.descriptionData.logo = value.image_name
    },
    getUpdatedCoverImage(value) {
      this.descriptionData.banner_image = value.image_name
    },
    getDataToSave() {
      var data = {
        id: this.descriptionData.id,
        logo: this.descriptionData.logo,
        banner_image: this.descriptionData.banner_image,
        long_description: this.descriptionData.longDesc,
        turnover: this.descriptionData.turnover,
        min_work_value: this.descriptionData.min_work_value
      }
      return data
    },
    setDescriptionData(data) {
      this.descriptionData.id = data.id
      this.descriptionData.logo = data.logo
      this.descriptionData.banner_image = data.banner_image
      this.descriptionData.longDesc = data.long_description
      this.descriptionData.turnover = data.turnover
      this.descriptionData.min_work_value = data.min_work_value
    },
    btnSave() {
      this.submitted = true
      if (this.$v.descriptionData.$invalid) {
        console.log('Required data')
        return false
      }
      this.updateDescriptionData(this.getDataToSave())
    }
  },
  created() {
    // this.descriptionData.id = 'f4360fae-be63-4c55-a937-06a61f665565'
    this.descriptionData.id = this.getCurrentCompanyData.id
    this.fetchTurnover()
    this.fetchMinWork()

    this.fetchDescriptionData(this.descriptionData.id).then((response) => {
      this.setDescriptionData(response)
      this.getLongDescriptionLength(this.descriptionData.longDesc)
      this.isDataLoaded = true
    })
  }
}
</script>

<style scoped></style>
