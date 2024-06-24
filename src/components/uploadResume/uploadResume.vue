<template>
  <div>
    <div class="form-conatiner">
      <div v-if="allCompanies.length > 0">
        <div class="fontSize14" style="font-weight: 600">
          Upload bulk resume's from your database
        </div>
        <div class="fontSize14">
          * To upload resume, please create
          <span class="bold-text">zip file</span> of resumes then upload this
          file.<br />
          * System allows for the upload of zip file up to
          <span class="bold-text">75MB</span> in size.
          <br />
          * Please note that the
          <span class="bold-text"
            >upload time for your file may vary based on file size and your
            internet speed</span
          >. Larger files may take longer to upload.
        </div>
        <br />
        <div>
          <div style="width: 300px">
            <InMemoryLoadAndPreviewSingleFile
              ref="ref_InMemoryLoadAndPreviewSingleFile"
              id="1"
              :key="uploadComponentKeyValue"
              upload_button_height="90"
              seleted_image_height="90"
              is_logo_image="false"
              is_object_fit_contain="false"
              upload_button_text="click to upload zip file"
              :file_type="zip_file_type"
              :save_image_path_value="path_save_zip_file_on_s3"
              @media_uploaded="mediaUploadedToS3"
              @inMemoryFile_changed="file_changed"
            ></InMemoryLoadAndPreviewSingleFile>
          </div>
        </div>
        <div>
          <button
            v-if="total_uploaded_file > 0"
            class="company-custom-btn mt-2"
            @click="uploadZipFile"
          >
            Upload File
          </button>
        </div>
        <div class="mt-5">
          <div class="ml-2" style="font-weight: 600">
            How to create .zip file
          </div>
          <div class="mt-3 p-3 app-bg-top-gradient" style="border-radius: 10px">
            <div class="d-flex">
              <button
                class="media-tab fontSize16 font-weight-700 mr-4 w-auto"
                @click="onWindowsClicked"
                :class="{
                  'media-tab-active': isShowWindowsSteps
                }"
              >
                On Windows
              </button>
              <button
                class="media-tab fontSize16 font-weight-700 mr-4"
                @click="onMacOsClicked"
                :class="{
                  'media-tab-active': isShowMacOsSteps
                }"
              >
                On Mac OS
              </button>
            </div>
            <div v-if="isShowWindowsSteps" class="mt-3">
              <div
                v-for="(step, counter) in getWindowsStepToCreateZipFIie()"
                :key="getKey(counter, 'winTitle')"
              >
                <div class="mb-3">
                  <span style="color: #5a5656">{{ counter + 1 }}.</span>
                  <span style="font-weight: 600"> {{ step.title }}:</span>
                  <div
                    v-for="(description, descounter) in step.description"
                    :key="getKey(descounter, 'winDesc')"
                  >
                    <div class="ml-5">
                      <li>
                        {{ description }}
                      </li>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="isShowMacOsSteps" class="mt-3">
              <div
                v-for="(step, counter) in getMacStepToCreateZipFIie()"
                :key="getKey(counter, 'winTitle')"
              >
                <div class="mb-3">
                  <span style="color: #5a5656">{{ counter + 1 }}.</span>
                  <span style="font-weight: 600"> {{ step.title }}:</span>
                  <div
                    v-for="(description, descounter) in step.description"
                    :key="getKey(descounter, 'winDesc')"
                  >
                    <div class="ml-5">
                      <li>
                        {{ description }}
                      </li>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- <b-card no-body>
            <div class="ml-2" style="font-weight: 600">
              How to create zip file
            </div>
            <b-tabs card>
              <b-tab title="On Windows" active>
                <b-card-text
                  ><div class="ml-3">
                    <div
                      v-for="(step, counter) in getWindowsStepToCreateZipFIie()"
                      :key="getKey(counter, 'winTitle')"
                    >
                      <div class="mb-3">
                        <span style="color: #5a5656">{{ counter + 1 }}.</span>
                        <span style="font-weight: 600"> {{ step.title }}:</span>
                        <div
                          v-for="(description, descounter) in step.description"
                          :key="getKey(descounter, 'winDesc')"
                        >
                          <div class="ml-5">
                            <li>
                              {{ description }}
                            </li>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div></b-card-text
                >
              </b-tab>
              <b-tab title="On macOS">
                <b-card-text
                  ><div class="ml-3">
                    <div
                      v-for="(step, counter) in getMacStepToCreateZipFIie()"
                      :key="getKey(counter, 'winTitle')"
                    >
                      <div class="mb-3">
                        <span style="color: #5a5656">{{ counter + 1 }}.</span>
                        <span style="font-weight: 600"> {{ step.title }}:</span>
                        <div
                          v-for="(description, descounter) in step.description"
                          :key="getKey(descounter, 'winDesc')"
                        >
                          <div class="ml-5">
                            <li>
                              {{ description }}
                            </li>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div></b-card-text
                >
              </b-tab>
            </b-tabs>
          </b-card> -->
        </div>
      </div>
      <div v-else>
        <div>You don't have company, please create company first</div>
      </div>
    </div>
    <modal
      v-if="showUploadZipFileErrorModal"
      @closeModal="showUploadZipFileErrorModal = false"
    >
      <div slot="body">{{ errorMessage }}</div>
      <div slot="footer">
        <b-button
          class="ml-2 btn"
          variant="outline-dark"
          @click="showUploadZipFileErrorModal = false"
        >
          Ok
        </b-button>
      </div>
    </modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import InMemoryLoadAndPreviewSingleFile from '../common/InMemoryLoadAndPreviewSingleFile.vue'
import appConstants from '../../appConstants'
import modal from '../../common/Modal.vue'
import deleteFileONS3 from '../../mixins/uploadFileOnS3.js'
import { getRandomString } from '../../common/js/commonFunctions.js'
import '../../assets/css/appcolor.css'

export default {
  name: 'UploadResume',
  components: {
    InMemoryLoadAndPreviewSingleFile,
    modal
  },
  mixins: [deleteFileONS3],
  computed: {
    ...mapGetters(['allCompanies', 'userData'])
  },
  data() {
    return {
      total_uploaded_file: 0,
      showUploadZipFileErrorModal: false,
      errorMessage: '',
      uploadComponentKeyValue: '',
      zip_file_type: appConstants.upload_file_type.ZIP,
      path_save_zip_file_on_s3:
        appConstants.PATH_SAVE_COMPANY_RESUME_ZIPFILE_URL,
      isShowWindowsSteps: true,
      isShowMacOsSteps: false
    }
  },
  methods: {
    ...mapActions('uploadresume', [
      'action_sendMessageInQueue',
      'action_deleteZipfileFromS3'
    ]),
    file_changed(value) {
      this.total_uploaded_file = value.file_count
    },
    setRandomStr() {
      this.uploadComponentKeyValue = getRandomString()
    },
    mediaUploadedToS3(value) {
      console.log('mediaUploadedToS3')
      console.log(value)

      let payload = {
        zip_file_name: value['image_name'],
        company_id: this.allCompanies[0]['id'],
        job_id: '',
        user_id: '  '
      }

      this.action_sendMessageInQueue(payload)
        .then(() => {
          this.setRandomStr()
          this.total_uploaded_file = 0
          //reload the component to unselect selected file

          this.showUploadZipFileErrorModal = true
          this.errorMessage = 'file uploaded successfully'
        })
        .catch((error) => {
          this.showUploadZipFileErrorModal = true
          this.errorMessage = error
          this.action_deleteZipfileFromS3(payload['zip_file_name'])
        })
    },
    uploadZipFile() {
      if (this.allCompanies.length > 0) {
        this.$refs['ref_InMemoryLoadAndPreviewSingleFile'].btnUploadFile()
      } else {
        this.showUploadZipFileErrorModal = true
        this.errorMessage =
          "You don't have company, please create company first"
      }
    },
    getKey(count, textvalue) {
      let res = `${count}_${textvalue}`
      return res
    },
    onWindowsClicked() {
      this.isShowMacOsSteps = false
      this.isShowWindowsSteps = true
    },
    onMacOsClicked() {
      this.isShowWindowsSteps = false
      this.isShowMacOsSteps = true
    },
    getWindowsStepToCreateZipFIie() {
      let data = [
        {
          title: 'Locate the Files ',
          description: ['Select the location where resumes are located.']
        },
        {
          title: 'Select the Items',
          description: [
            "Select the resumes you want to include in the zip file. You can select multiple resume by holding down the 'CTRL' key while clicking on them."
          ]
        },
        {
          title: 'Right-Click and Choose "Send To":',
          description: [
            'Right-click on the selected resumes. This will open a context menu',
            'Hover over the "Send to" option in the context menu, and a sub-menu will appear.'
          ]
        },
        {
          title: 'Select "Compressed (zipped) Folder"',
          description: [
            'In the “Send to” sub-menu, select “Compressed (zipped) Folder.” This action will create a new zip folder in the same location.'
          ]
        },
        {
          title: 'Rename the Zip File (Optional)',
          description: [
            'You can rename zip file by right-clicking on it and choosing "Rename."'
          ]
        }
      ]

      return data
    },
    getMacStepToCreateZipFIie() {
      let data = [
        {
          title: 'Locate the Files ',
          description: ['Select the location where resumes are located.']
        },
        {
          title: 'Select the Items',
          description: [
            'Select the resumes you want to include in the zip file. You can select multiple items by holding down the Command (⌘) key while clicking on them.'
          ]
        },
        {
          title: 'Open the "File" Menu:',
          description: [
            'After selecting the resumes, go to the "File" menu in the menu bar at the top of the screen.'
          ]
        },
        {
          title: 'Choose "Compress" or "Create Archive"',
          description: [
            'In the “File” menu, you should see an option like “Compress [X] Items” or “Create Archive.” The “[X]” will be replaced with the number of items you have selected. Click on this option.'
          ]
        },
        {
          title: 'Rename the Zip File (Optional)',
          description: [
            'You can rename zip file by right-clicking on it and choosing "Rename.'
          ]
        }
      ]

      return data
    }
  },
  created() {}
}
</script>

<style>
/* .card-header {
  padding: 10px;
}
.nav {
  background-color: transparent;
}
.nav-tabs .nav-link.active {
  background-color: transparent !important;
  color: var(--app-secondary-text-color) !important;
  padding: 10px 2px 2px 2px !important;
  border-bottom: 2px solid var(--app-border-color-focus) !important;
  border-top: 0;
  border-left: 0;
  border-right: 0;
}
.nav-link {
  padding: 10px 2px 2px 2px !important;
}
.nav-item {
  margin-left: 22px;
  color: var(--app-primary-text-color) !important;
}
.nav-item a {
  color: var(--app-primary-text-color) !important;
} */
</style>
