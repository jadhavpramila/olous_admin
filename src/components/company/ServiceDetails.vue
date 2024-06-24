<template>
  <div>
    <div>
      <!-- <ServiceForm v-if="isShowAddService"></ServiceForm>
      <EditServiceForm v-if="isShowEditService"></EditServiceForm> -->
      <div>
        <AddServiceForm
          :isAddNewProduct="true_bool_value"
          v-if="isShowAddService"
          @hide_Product_Form="setVisibility"
        ></AddServiceForm>
      </div>
      <div>
        <AddServiceForm
          :isAddNewProduct="false_bool_value"
          v-if="isShowEditService"
          @hide_Product_Form="setVisibility"
        ></AddServiceForm>
      </div>
    </div>
    <div v-if="isShowServiceList">
      <div class="">
        <div
          class="row ml-0"
          style="column-width: 250px !important; column-gap: 20px !important"
        >
          <div
            class="p-0 service-card d-flex justify-content-center align-items-center"
          >
            <span class="btn w-50" @click="addService"> Add Service </span>
          </div>
          <div
            class="p-0 service-card"
            v-for="(service, counter) in getCurrentCompanyServiceData"
            :key="counter"
          >
            <!-- <div class="service-card">
              <img
                :src="setPrimaryImage(service.medias)"
                alt="service-img"
                class="service-img"
              />
              <span
                class="service-btn cursor-pointer"
                @click="editService(service)"
                >Edit</span
              >
              <div class="service-info">
                <span class="service-title w-100">
                  {{ service.name }}
                </span>
                <div class="d-flex w-auto">
                  <img
                    @click="deleteService(service.id)"
                    src="../../assets/img/Delete.svg"
                    alt="delete"
                    class="w-75"
                  />
                </div>
              </div>
            </div> -->
            <div class="company-card">
              <div class="d-flex company-card-bg-img">
                <img
                  :src="setPrimaryImage(service.medias)"
                  class="bg-img-z-index"
                />
                <div class="company-card-img-overlay"></div>
              </div>

              <div
                class="company-card-body d-flex justify-content-between flex-column h-50"
              >
                <div>
                  <div class="fontSize16 font-weight-bold">
                    {{ service.name }}
                  </div>
                  <div class="fontSize12 font-weight-400 mt-2">
                    {{ setServiceDescription(service.description) }}
                  </div>
                </div>
                <div class="mt-3 d-flex justify-content-between">
                  <img
                    @click="deleteService(service.id)"
                    src="../../assets/img/Delete-New.svg"
                    alt="delete"
                    class="cursor-pointer"
                  />
                  <img
                    @click="editService(service)"
                    src="../../assets/img/Edit-New.svg"
                    alt="edit"
                    class="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal ref="successModal" hide-footer hide-header :centered="true">
      <div class="d-block text-center">
        <h4 class="my-4" style="text-transform: capitalize">
          <!-- User created successfully! -->
          {{ modal_message }}
        </h4>
        <b-button class="btn mt-2" variant="outline-dark" @click="hideModal"
          >Ok</b-button
        >
      </div>
    </b-modal>
    <loading :active="isLoading" :is-full-page="true" />
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import appConstants from '../../appConstants'
import Loading from 'vue-loading-overlay'
import imageCheck from '../../mixins/imageCheck.js'
import uploadFileOnS3 from '../../mixins/uploadFileOnS3.js'
import { mapActions, mapGetters } from 'vuex'
import AddServiceForm from './AddServiceForm.vue'
export default {
  name: 'ServiceDetails',
  mixins: [imageCheck, uploadFileOnS3],
  components: {
    Loading,
    AddServiceForm
  },
  data() {
    return {
      submitted: false,
      isLoading: false,
      imageTypes: appConstants.ACCEPT_IMAGE_TYPE,
      serviceDetails: {
        name: '',
        media_name: '',
        description: '',
        price: 0,
        unit: '',
        currency: '',
        company: '',
        id: '',
        search_keywords: '',
        media_width: 0.0,
        media_height: 0.0
      },
      serviceData: {},
      mediasData: [],
      isAddservice: false,
      service_images: [],
      isShowAddService: false,
      isShowEditService: false,
      isShowServiceList: true,
      service_image: '',
      modal_message: '',
      true_bool_value: true,
      false_bool_value: false
    }
  },
  validations() {
    return {
      serviceDetails: {
        name: {
          required
        },
        description: { required }
      }
    }
  },
  computed: {
    ...mapGetters(['getCurrentCompanyServiceData', 'getCurrentCompanyId'])
  },
  methods: {
    ...mapActions([
      'saveServiceInfoNew',
      'deleteSingleService',
      'deleteSingleMediaProductImage',
      'saveEditCurrentServiceData'
    ]),
    integerValueOnly(e) {
      this.serviceDetails.price = e.target.value
        .replace(/\s+/g, '')
        .replace(/[^0-9]/g, '')
    },
    getServiceImage(media) {
      let img = `${media[0].name}`
      return img
    },
    setPrimaryImage(media) {
      //console.log("media", media);
      for (let i = 0; i < media.length; i++) {
        if (media[i].is_primary == true) {
          // let productImageURL = `${import.meta.env.VITE_APP_COMPANY_IMGURL}${
          //   media[i].name
          // }`;

          return media[i].name
        }
      }
    },
    editService(data) {
      // console.log('data', data)
      // this.serviceDetails = Object.assign({}, data)
      // this.serviceData = data
      // this.mediasData = data.medias
      // let dataToEdit = JSON.parse(JSON.stringify(data))
      this.saveEditCurrentServiceData(data)
      this.isShowServiceList = false
      this.isShowAddService = false
      this.isAddservice = false
      this.isShowEditService = true
    },
    addService() {
      this.serviceData = {}
      this.mediasData = []
      this.isAddservice = true
      this.isShowServiceList = false
      this.isShowAddService = true
      this.isShowEditService = false
    },
    deleteService(id) {
      let obj = {
        product_id: id,
        company_id: this.getCurrentCompanyId
      }
      this.deleteSingleService(obj).then((res) => {
        this.modal_message = 'Service deleted successfully'
        this.showModal()
        console.log('res', res)
      })
    },
    setServiceDescription(description) {
      let maxLength = 50
      if (description.length > maxLength) {
        description = description.slice(0, maxLength) + '...'
      }
      return description
    },
    previewImage() {
      let imageFile = this.$refs.companyLogo.files[0]
      if (!imageFile) {
        return
      }

      this.isLoading = true
      this.checkIsImageValidAndGetHW(
        appConstants.ACCEPT_IMAGE_TYPE,
        appConstants.imageLogoSize.MAX_SIZE,
        appConstants.imageLogoSize.MAX_WIDTH,
        appConstants.imageLogoSize.MAX_HEIGHT,
        imageFile
      ).then((result) => {
        if (result.isValidImage) {
          //console.log('valid image', result)
          this.serviceDetails.media_height = result.height
          this.serviceDetails.media_width = result.width
          this.s3LogoUpload(imageFile)
          this.$refs.companyLogo.value = null
          this.isLoading = false
        } else {
          this.UploadImageError = result.message
          this.showUploadImageError = true
          this.$refs.companyLogo.value = null
          this.isLoading = false
        }
      })
    },
    s3LogoUpload(imageFile) {
      if (imageFile) {
        let imgExt = imageFile.name.substr(imageFile.name.lastIndexOf('.'))
        let fileName = this.$uuid.v1() + imgExt
        this.uploadFileOnS3(
          fileName,
          appConstants.PATH_SAVE_IMAGE_ON_S3,
          imageFile,
          appConstants.IMAGE_CONTENT_TYPE
        )
          .then((data) => {
            this.service_images.push(data.savedFileName)
            this.service_image = data.serverFilePath
            this.serviceDetails.media_name = data.savedFileName
            this.isLoading = false
          })
          .catch((err) => {
            this.UploadImageError = err
            this.showUploadImageError = true
            this.isLoading = false
          })
      }
    },
    removeImage() {
      this.$refs.companyLogo.value = ''
      this.service_image = ''
      // this.jobDetails.company_logo = ''
    },
    saveServiceInfo() {
      this.serviceDetails.company = this.getCurrentCompanyId
      //console.log('this.serviceDetails', this.serviceDetails)
      this.saveServiceInfoNew(this.serviceDetails)
        .then((res) => {
          console.log('result', res)
          this.showModal()
          this.modal_message = 'Service Added Successfully'
        })
        .catch((error) => {
          this.showModal()
          this.modal_message = error
        })
    },
    showModal() {
      this.$refs['successModal'].show()
    },
    hideModal() {
      this.$refs['successModal'].hide()
      this.isShowServiceList = true
      this.isShowAddService = false
    },
    setVisibility(value) {
      this.isShowAddService = false
      this.isShowEditService = false
      this.isShowServiceList = value.cancelled
    }
  },
  mounted() {
    // this.$eventHub.$on('Cancel_Service_Form', this.setVisibility)
    // console.log(
    //   'getCurrentCompanyServiceData',
    //   this.getCurrentCompanyServiceData
    // )
  },
  beforeDestroy() {
    //this.$eventHub.$off('add-company')
    // this.$eventHub.$off('Cancel_Service_Form')
  }
}
</script>
<style>
.company-card {
  width: 250px;
  height: 365px;
  border-radius: 12px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: var(--white);
  color: #000;
}
.company-card:hover {
  background: var(--app-bg-bottom-gradient);
  color: #ffffff;
}
.company-card-bg-img {
  width: 250px;
  height: 179px;
  position: relative;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}
.bg-img-z-index {
  z-index: 111;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}
.company-card-img-overlay {
  width: 250px;
  height: 179px;
  position: absolute;
  top: 0;
  background: var(--app-bg-top-gradient);
  z-index: 11;
  opacity: 0.7;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}
.company-card-logo-img {
  width: 67px;
  height: 67px;
  border-radius: 8px;
  border: solid 1px #707070;
  background-color: var(--white);
  position: absolute;
  top: 34%;
  left: 7%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 111;
}
.company-card-body {
  padding: 16px;
}
.upload-service-image {
  display: block;
  background: #fff;
  width: 188px;
  height: 200px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 12px;
  color: #000;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: solid 1px #d1e2ea;
  background-color: #f4f8fa;
  margin-top: 26px;
}
.service-card {
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: var(--white);
  position: relative;
  width: 250px;
  height: 365px;
  border-radius: 8px;
  /* border: solid 1px #d1e2ea;
  background-color: #f4f8fa; */
  margin-bottom: 20px;
}
.service-title {
  font-size: 14px;
  font-weight: 600;
  color: #000;
  line-height: 15px;
  overflow: hidden;
}
.service-info {
  bottom: 0;
  position: absolute;
  height: 60px;
  width: 250px;
  background-color: #f4f8facc;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  display: flex;
  padding: 6px 10px;
  justify-content: space-between;
}
.service-btn {
  top: 10px;
  right: 10px;
  position: absolute;
  background-color: #ffe8d6;
  height: 22px;
  width: 50px;
  font-size: 12px;
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 4px;
  font-weight: 600;
}
.service-img {
  object-fit: cover;
  border-radius: 8px;
  height: 100%;
  width: 100%;
}
.service-img-preview {
  position: relative;
  background: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  border-radius: 9px;
  width: 188px;
  height: 200px;
}
.remove-service-img {
  position: absolute;
  top: -10px; /* on change, change #fileInputButton margin-top:  */
  right: -10px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  font-weight: 500;
  font-size: 10px;
  width: 24px;
  height: 24px;
  padding: 3px;
  line-height: 1.2;
  border-radius: 50%;
  z-index: 2;
}
</style>
