<template>
  <div class="cls-catalouge form-conatiner">
    <div class="form-container">
      <div class="page-body">
        <div class="form-group">
          <!-- <label>Add Catalogue/ Documents </label>     -->

          <div class="row">
            <template v-if="catalouges.length">
              <div
                class="col-6 col-md-3 catalouge-list"
                v-for="(item, index) in catalouges"
                :key="index"
              >
                <div class="card" style="height: 150px">
                  <img
                    class="catalouge-delete"
                    src="../../../assets/img/Delete_whiteBG.svg"
                    title="Remove Catalogue"
                    @click="removeCatalouge(index, item)"
                  />
                  <label class="m-auto app-primary-text-color w-100">
                    {{ item.name }}
                  </label>
                </div>
              </div>
            </template>
            <div class="col-6 col-md-3 product-list">
              <!--v-if="catalouges.length !== 6"-->
              <div class="card" style="height: 150px">
                <button
                  type="button"
                  class="btn-addCatalouge m-auto"
                  @click="addFiles"
                >
                  <label class="m-auto app-primary-text-color"
                    >+Add New Document</label
                  >
                </button>
              </div>
            </div>
          </div>
          <template class="upload-catalouge-temp">
            <b-modal
              :visible="addCatalouge"
              hide-footer
              hide-header
              ref="catalouge-Modal"
              id="modal-2"
              :no-close-on-backdrop="true"
              :centered="true"
            >
              <div class="d-block" v-if="!isCatalougeCreated">
                <h4 class="mb-4">Upload Catalogue</h4>
                <div class="form-group">
                  <label for="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    v-model="uploadCatalouge.name"
                    class="form-control"
                    maxlength="100"
                    :class="{
                      'is-invalid':
                        submitted && $v.uploadCatalouge.name.$invalid
                    }"
                  />

                  <div
                    v-if="submitted && !$v.uploadCatalouge.name.required"
                    class="invalid-feedback"
                  >
                    Name is required
                  </div>
                  <div
                    v-if="submitted && !$v.uploadCatalouge.name.maxLength"
                    class="invalid-feedback d-block"
                  >
                    Name max 100 characters required
                  </div>
                </div>
                <div class="form-group">
                  <input
                    id="catalougefileInput"
                    accept="application/pdf"
                    @change="previewFile"
                    type="file"
                    style="display: none"
                  />
                  <button
                    v-if="uploadCatalouge.media.name === ''"
                    type="button"
                    onclick="document.getElementById('catalougefileInput').click()"
                    class="btn-addCatalouge fontSize14"
                    @click="s3FileUpload"
                    :class="{
                      'is-invalid':
                        submitted && uploadCatalouge.media.name === ''
                    }"
                  >
                    SELECT PDF
                  </button>
                  <div v-else class="btn-addCatalouge perview">
                    <label class="m-1">{{ uploadCatalouge.media.name }}</label>
                  </div>
                  <div
                    v-if="submitted && uploadCatalouge.media.name === ''"
                    class="invalid-feedback"
                  >
                    Please upload a PDF
                  </div>
                </div>
                <b-button
                  class="mt-2 mr-3 btn"
                  variant="outline-dark"
                  @click="createCatalouge"
                  >Save</b-button
                >
                <b-button
                  class="mt-2 btn"
                  variant="outline-dark"
                  @click="closeModal()"
                  >Cancel</b-button
                >
              </div>
              <!--<div class="d-block text-center" v-else-if="isCatalougeCreated">
          <h4 class="my-4">Congratulations!</h4>
          <p>Catalogue successfully added.</p>
          <b-button class="mt-2" @click="closeSuccessModal()">Ok</b-button>
        </div>
        <div class="d-block text-center" v-else-if="maxImageAlert">
          <p>Unable to upload image. Please try again later.</p>
          <b-button class="mt-2" @click="closeSuccessModal()">Ok</b-button>
        </div>-->
            </b-modal>
          </template>
          <modal v-if="isCatalougeCreated" @closeModal="closeSuccessModal">
            <div slot="body">Catalogue successfully added.</div>
          </modal>
          <modal v-if="maxImageAlert" @closeModal="closeSuccessModal">
            <div slot="body">
              Unable to upload image. Please try again later.
            </div>
          </modal>
          <modal
            v-if="removeCatalougeModal"
            @closeModal="hideRemoveCatalougeModal"
          >
            <div slot="body">{{ modalMessage }}</div>
          </modal>
          <modal
            v-if="showCatalogueModal"
            @closeModal="updateCatalogueModalValues([false, ''])"
          >
            <div slot="body">{{ this.modalCatalogueMessage }}</div>
          </modal>

          <loading
            :active="isLoading"
            :is-full-page="true"
            :enforce-focus="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Loading from 'vue-loading-overlay'
import { required, maxLength } from 'vuelidate/lib/validators'
import imageCheck from '../../../mixins/imageCheck.js'
import uploadFileOnS3 from '../../../mixins/uploadFileOnS3.js'
import appConstants from '../../../appConstants.js'
import modal from '../../../common/Modal'

export default {
  name: 'Catalouge',
  mixins: [imageCheck, uploadFileOnS3],
  // props: ['companyIdSend'],
  components: {
    Loading,
    modal
  },
  data() {
    return {
      aws: {},
      modalMessage: '',
      removeCatalougeModal: false,
      catalouges: [],
      isLoading: false,
      submitted: false,
      maxImageAlert: false,
      addCatalouge: false,
      isCatalougeCreated: false,
      companyIdSend: '',
      uploadCatalouge: {
        name: '',
        company: this.companyIdSend,
        media: {
          name: '',
          width: 0,
          height: 0,
          video_duration: 0,
          mediaType: 8,
          is_primary: false
        }
      }
    }
  },
  validations: {
    uploadCatalouge: {
      name: { required, maxLength: maxLength(100) }
    }
  },
  computed: {
    ...mapGetters('catalogue', ['showCatalogueModal', 'modalCatalogueMessage']),
    ...mapGetters('companyData', ['getCurrentCompanyData'])
  },
  created() {
    this.companyIdSend = this.getCurrentCompanyData.id
    this.uploadCatalouge.company = this.getCurrentCompanyData.id
    this.getAllCatalouges()
    // this.aws = new AWS.S3({
    //   apiVersion: '2006-03-01',
    //   params: { Bucket: bucketName }
    // })
  },

  methods: {
    ...mapActions('catalogue', [
      'getAllCatalogueData',
      'deleteCatalogue',
      'addNewCatalogue'
    ]),
    ...mapMutations('catalogue', ['updateCatalogueModalValues']),
    getAllCatalouges() {
      // this.isLoading = true
      let id = this.companyIdSend
      // axios
      //   .get(`/vendors/company/catalogs/${id}`)
      //   .then((response) => {
      //     this.catalouges = response.data.data
      //     this.isLoading = false
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //     this.isLoading = false
      //   })
      this.getAllCatalogueData(id).then((response) => {
        this.catalouges = response.data.data
      })
    },
    removeCatalouge(index, item) {
      // this.isLoading = true
      let data = {
        catalog_id: item.id,
        company_id: this.companyIdSend
      }
      // axios
      //   .delete(`/vendors/catalog/delete/`, { data: data })
      //   .then((response) => {
      //     console.log(response)
      //     this.removeCatalougeModal = true
      //     this.modalMessage = 'Catalouge deleted successfully'
      //     this.catalouges.splice(index, 1)
      //     this.isLoading = false
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //     this.removeCatalougeModal = true
      //     this.modalMessage = error
      //     this.isLoading = false
      //   })
      this.deleteCatalogue(data).then(() => {
        this.removeCatalougeModal = true
        this.modalMessage = 'Catalouge deleted successfully'
        this.catalouges.splice(index, 1)
      })
    },
    hideRemoveCatalougeModal() {
      this.removeCatalougeModal = false
    },
    previewFile(e) {
      this.isLoading = true
      let input = e.target

      if (!input.files) {
        return
      }

      var result = this.checkFileTypeValid('.pdf', input.files[0])
      if (result) {
        // let fileDetails = e.target.files
        if (input.files) {
          this.s3FileUpload()
        }
      } else {
        this.isLoading = false
        this.modalMessage = 'Please select .pdf file.'
        this.removeCatalougeModal = true
      }
    },
    addFiles() {
      this.addCatalouge = true
    },
    s3FileUpload() {
      let fileInput = document.getElementById('catalougefileInput')
      let files = document.getElementById('catalougefileInput').files
      console.log(files)
      if (files.length) {
        let file = files[0]
        let fileName = file.name
        let ext = fileName.substr(fileName.lastIndexOf('.'))
        fileName = fileName.substr(0, fileName.lastIndexOf('.'))
        fileName = fileName.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '')
        fileName = `${fileName}${ext}`

        //let filePath = 'media/catalogue/' + fileName
        this.uploadFileOnS3(
          fileName,
          appConstants.PATH_SAVE_PDF_ON_S3,
          file,
          appConstants.PDF_CONTENT_TYPE
        )
          .then((data) => {
            this.uploadCatalouge.media.name = data.savedFileName
            this.isLoading = false
          })
          .catch((err) => {
            this.addCatalouge = false
            this.resetForm()
            this.modalMessage = err
            this.removeCatalougeModal = true
            this.isLoading = false
          })

        // this.aws
        //   .upload(
        //     {
        //       Key: filePath,
        //       Body: file,
        //       ACL: 'public-read',
        //       ContentType: 'application/pdf'
        //     },
        //     (err, data) => {
        //       this.isLoading = false
        //       if (err) {
        //         console.log(err)
        //         // this.imageError = 'Unable to upload PDF. Please try again later.';
        //         this.addCatalouge = false
        //         this.resetForm()
        //         this.modalMessage =
        //           'Unable to upload PDF. Please try again later.'
        //         this.removeCatalougeModal = true
        //       } else if (data) {
        //         // let file = ;
        //         // console.log(file)
        //         // data.key.substr(data.key.lastIndexOf("/")).replace('/','')
        //         // this.previewList.push(data.Location);
        //         // this.updateMediaList(data.Location, fileName, index);
        //         this.uploadCatalouge.media.name = `${fileName}`

        //         console.log(data)
        //         this.maxImageAlert = false
        //       }
        //     }
        //   )
        //   .on('httpUploadProgress', function (progress) {
        //     let uploaded = parseInt((progress.loaded * 100) / progress.total)
        //     // eslint-disable-next-line no-undef
        //     $('progress').attr('value', uploaded)
        //   })
        fileInput.value = ''
      }
    },
    createCatalouge() {
      // this.isLoading = true
      this.submitted = true
      this.$v.uploadCatalouge.$touch()
      if (
        this.$v.uploadCatalouge.$invalid ||
        this.uploadCatalouge.media.name === ''
      ) {
        this.isLoading = false
        return
      }

      let data = this.uploadCatalouge

      // axios
      //   .post(`/vendors/catalog/`, data)
      //   .then((response) => {
      //     console.log(response)
      //     this.catalouges.push(response.data.data)
      //     this.isCatalougeCreated = true

      //     this.isLoading = false
      //     this.addCatalouge = false
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //     this.addCatalouge = false
      //     this.resetForm()
      //     this.modalMessage = error
      //     this.removeCatalougeModal = true
      //     this.isLoading = false
      //   })

      this.addNewCatalogue(data)
        .then((response) => {
          this.catalouges.push(response.data.data)
          this.isCatalougeCreated = true

          this.isLoading = false
          this.addCatalouge = false
        })
        .catch(() => {
          this.addCatalouge = false
          this.resetForm()
        })
    },
    closeModal() {
      this.resetForm()
      this.addCatalouge = false
      // this.$emit('closeModal', false);
    },
    closeSuccessModal() {
      this.closeModal()
    },
    resetForm() {
      let initialformValue = {
        name: '',
        company: this.companyIdSend,
        media: {
          name: '',
          width: 0,
          height: 0,
          video_duration: 0,
          mediaType: 8,
          is_primary: false
        }
      }
      this.submitted = false
      this.uploadCatalouge = initialformValue
      this.isCatalougeCreated = false
    }
  }
}
</script>

<style scoped>
.subscription {
  border: 1px solid gray;
  width: 300px;
  height: 230px;
}
</style>
