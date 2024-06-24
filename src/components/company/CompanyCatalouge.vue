<template>
  <div class="cls-catalouge">
    <div class="">
      <div class="">
        <div class="form-group">
          <div class="">
            <!-- <template v-if="catalouges.length">
              <div
                class="col-6 col-md-3 catalouge-list"
                v-for="(item, index) in catalouges"
                :key="index"
              >
                <div class="card" style="height: 150px">
                  <img
                    class="catalouge-delete"
                    src="../../assets/img/Delete_whiteBG.svg"
                    title="Remove Catalogue"
                    @click="removeCatalouge(index, item)"
                  />
                  <label class="m-auto app-primary-text-color">
                    {{ item.name }}
                  </label>
                </div>
              </div>
            </template>
            <div class="col-6 col-md-3 product-list">
              <div class="card" style="height: 150px">
                <button
                  type="button"
                  class="btn-addCatalouge m-auto"
                  @click="addFiles"
                >
                  <label class="m-auto app-primary-text-color">+Add New Document</label>
                </button>
              </div>
            </div> -->
            <div class="">
              <div
                class="row ml-0"
                style="
                  column-width: 250px !important;
                  column-gap: 20px !important;
                "
              >
                <div
                  class="p-0 product-card d-flex justify-content-center align-items-center"
                >
                  <span class="btn" @click="addFiles" style="width: 130px">
                    Add Document
                  </span>
                </div>
                <div
                  class="p-0"
                  v-for="(item, index) in catalouges"
                  :key="index"
                >
                  <div class="card catalog_card">
                    <img
                      class="catalouge-delete"
                      src="../../assets/img/Delete-New.svg"
                      title="Remove Catalogue"
                      @click="removeCatalouge(index, item)"
                    />
                    <span class="m-auto app-primary-text-color">
                      {{ item.name }}
                    </span>
                  </div>
                </div>
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
                <div class="mb-4 font-weight-700 fontSize18">
                  Upload Catalogue
                </div>
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
                    <span class="mx-2"> Click to upload Catalogue</span>
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
                <div class="d-flex justify-content-end">
                  <b-button
                    class="btn mt-2 mr-3"
                    variant="outline-dark"
                    @click="closeModal()"
                    >Cancel</b-button
                  >
                  <b-button
                    class="btn mt-2"
                    variant="outline-dark"
                    @click="createCatalouge"
                    >Save</b-button
                  >
                </div>
              </div>
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
import imageCheck from '../../mixins/imageCheck'
import uploadFileOnS3 from '../../mixins/uploadFileOnS3.js'
import appConstants from '../../appConstants.js'
import modal from '../../common/Modal'

export default {
  name: 'CompanyCatalouge',
  mixins: [imageCheck, uploadFileOnS3],
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
    ...mapGetters('companyData', ['getCurrentCompanyData']),
    ...mapGetters(['getCurrentCompanyId'])
  },
  created() {
    this.companyIdSend = this.getCurrentCompanyId
    this.uploadCatalouge.company = this.getCurrentCompanyId
    this.getAllCatalouges()
  },

  methods: {
    ...mapActions('catalogue', [
      'getAllCatalogueData',
      'deleteCatalogue',
      'addNewCatalogue'
    ]),
    ...mapMutations('catalogue', ['updateCatalogueModalValues']),
    getAllCatalouges() {
      let id = this.companyIdSend
      this.getAllCatalogueData(id).then((response) => {
        this.catalouges = response.data.data
      })
    },
    removeCatalouge(index, item) {
      let data = {
        catalog_id: item.id,
        company_id: this.companyIdSend
      }

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

.catalog_card {
  position: relative;
  width: 250px;
  height: 365px;
  border-radius: 8px;
  /* border: solid 1px #d1e2ea;
  background-color: #f4f8fa; */
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: var(--white);
  margin-bottom: 20px;
}
</style>
