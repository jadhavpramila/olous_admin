<template>
  <div class="">
    <div class="">
      <!-- <div class="container-fluid company-list form-conatiner mt-3"> -->
      <!-- <div class="col-lg-4 fixed-menu">
        <div
          class="fixedPosition d-flex align-items-center left-content-wrapper"
        >
          <LeftContent />
        </div>
      </div> -->
      <div class="mt-3">
        <!-- <Header /> -->
        <!-- <div
          class="text-right page-header row align-items-center justify-content-between"
        >
          <div class="text-left">
            <h3>Edit Product</h3>
          </div>
          <div class="col-6">
            <router-link to="/home" class="btn btn-info btn-outline mr-2"
              >back</router-link
            >
          </div>
        </div> -->
        <div class="">
          <div class="text-left">
            <h3>Edit Product</h3>
          </div>
          <form enctype="multipart/form-data" @submit.prevent="editProduct">
            <div class="form-inputs align-items-center">
              <div class="form-group">
                <label>Name</label>
                <input
                  type="text"
                  class="form-control input-lg"
                  v-model="productDetail.name"
                  @change="productUpdated"
                  placeholder="product name"
                  :class="{
                    'is-invalid': submitted && $v.productDetail.name.$invalid
                  }"
                />
                <div
                  v-if="submitted && !$v.productDetail.name.required"
                  class="invalid-feedback"
                >
                  Product name is required
                </div>
              </div>
              <div class="form-group">
                <label class="contact-msg"
                  >Description (Max 1000 characters)</label
                >
                <b-form-textarea
                  name="short_desc"
                  v-model="productDetail.description"
                  cols="40"
                  rows="1"
                  max-rows="10"
                  maxlength="1000"
                  no-resize
                  v-on:keyup="getDescLength($event.target.value)"
                  class="form-control"
                  @change="productUpdated"
                  :class="{
                    'is-invalid':
                      submitted && $v.productDetail.description.$invalid
                  }"
                ></b-form-textarea>
                <pre class="mb-0 text-right remainig-text">
                  {{ remainingDescLength }}/1000</pre
                >
                <div
                  v-if="submitted && !$v.productDetail.description.required"
                  class="invalid-feedback"
                >
                  Product description is required
                </div>
              </div>
              <div class="row mt-n2">
                <div class="form-group m-b col-md-4">
                  <label>Price (Optional)</label>
                  <input
                    type="text"
                    class="form-control input-lg"
                    v-model="productDetail.price"
                    v-on:keyup="getPrice($event.target.value)"
                    @keydown.space.prevent
                    @input="integerValueOnly"
                    placeholder="product price"
                  />
                </div>
                <div class="form-group m-b col-md-4" v-if="hasPrice">
                  <label>Units</label>
                  <select
                    class="form-control input-lg"
                    name="unit"
                    @change="productUpdated"
                    v-model="productDetail.unit"
                    :class="{
                      'is-invalid': submitted && $v.productDetail.unit.$invalid
                    }"
                  >
                    <option value>Select units</option>
                    <option value="1">Square Feet</option>
                    <option value="2">Square Meter</option>
                    <option value="3">Running Feet</option>
                    <option value="4">Running Meter</option>
                    <option value="5">Cubic Feet</option>
                    <option value="6">Cubic Meter</option>
                    <option value="7">Tonne</option>
                    <option value="8">Metric Tonne</option>
                    <option value="9">Kilogram</option>
                    <option value="10">Litre</option>
                    <option value="11">Number</option>
                    <option value="12">Box</option>
                    <option value="13">Bundle</option>
                    <option value="14">Roll</option>
                    <option value="15">Lot</option>
                  </select>
                  <div
                    v-if="submitted && !$v.productDetail.unit.required"
                    class="invalid-feedback"
                  >
                    unit is required
                  </div>
                </div>
                <div class="form-group m-b col-md-4" v-if="hasPrice">
                  <label>Currency</label>
                  <select
                    class="form-control input-lg"
                    name="category"
                    @change="productUpdated"
                    v-model="productDetail.currency"
                    :class="{
                      'is-invalid':
                        submitted && $v.productDetail.currency.$invalid
                    }"
                  >
                    <option value>Select Currency</option>
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                  <div
                    v-if="submitted && !$v.productDetail.currency.required"
                    class="invalid-feedback"
                  >
                    currency is required
                  </div>
                </div>
              </div>
              <!-- <div class="row col-md-12">
                <div class="form-group m-b col-md-6" v-cloak>
                  <label>Primary Image</label>
                  <input
                    id="primaryFile"
                    accept="image/*"
                    ref="primary"
                    @change="previewPrimary"
                    type="file"
                    style="display:none"
                  />
                  <button
                    type="button"
                    id="fileInputButton"
                    onclick="document.getElementById('primaryFile').click()"
                    class="btn btn-link"
                    v-if="this.primaryName == ''"
                  >
                    Add
                  </button>
                  <div
                    class="logo-preview"
                    :class="{ 'is-invalid': primaryImage }"
                  >
                    <button
                      type="button"
                      v-if="primarySrc"
                      @click="removePrimary"
                      class="btn btn-link mt-2 remove-logo"
                    >
                      X
                    </button>
                    <img
                      v-if="primarySrc"
                      :src="primarySrc"
                      class="img-preview"
                    />
                  </div>
                  <div v-if="primaryImage" class="invalid-feedback">
                    primary image is required
                  </div>
                </div>
                <div class="form-group m-b col-md-6" v-cloak>
                  <label>Product Images (upto 2)</label>
                  <input
                    id="fileInput"
                    accept="image/*"
                    multiple
                    @change="previewFile"
                    type="file"
                    style="display:none"
                  />
                  <button
                    type="button"
                    id="fileInputButton"
                    onclick="document.getElementById('fileInput').click()"
                    class="btn btn-link"
                  >
                    Add
                  </button>
                </div>
              </div>-->
              <!-- <div class="row align-items-center mt-2 form-group">
                <div class="col-2">
                  <label>Image</label>
                </div>
                <div class="col-10" v-cloak>
                  <label>Upto 3 Images</label>
                  <input
                    id="fileInput"
                    accept="image/*"
                    multiple
                    @change="previewFile"
                    type="file"
                    style="display:none"
                  />
                  <button
                    type="button"
                    id="fileInputButton"
                    onclick="document.getElementById('fileInput').click()"
                    class="btn btn-link"
                  >Add</button>
                </div>
              </div>-->
              <div class="">
                <div class="form-group mb-n1">
                  <label class="contact-msg"
                    >Product Images (Upto 3 Images) (Mark Primary image with
                    tick)</label
                  >
                </div>
                <!-- <template v-if="previewList.length"> -->
                <template>
                  <div class="row">
                    <div
                      class="col-md-4 mt-2"
                      v-for="(item, index) in previewList"
                      :key="index"
                    >
                      <div class="product_card_edit">
                        <div class="product_card_edit_image_div">
                          <img
                            :src="item.logosrc"
                            class="img-fluid product_card_edit_image"
                          />
                        </div>
                        <div class="product_card_edit_action p-3">
                          <div class="row">
                            <div class="col-9 pl-3">
                              <input
                                :checked="item.is_primary === true"
                                type="radio"
                                name="primary"
                                id
                                @input="makePrimary(item, index)"
                              />
                              Mark as Primary
                            </div>
                            <div class="col-3 pl-3">
                              <img
                                src="../../../assets/img/Delete.svg"
                                title="Delete"
                                @click.prevent="removeImage(item, index)"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      class="col-md-4 mt-2 add-product-img"
                      v-if="previewList.length < 3"
                      v-cloak
                    >
                      <input
                        id="fileInput"
                        :accept="imageTypes"
                        multiple
                        @change="previewFile($event, previewList.length)"
                        type="file"
                        style="display: none"
                      />
                      <button
                        type="button"
                        id="fileInputButton"
                        onclick="document.getElementById('fileInput').click()"
                        class="btn btn-link"
                      >
                        Add Image
                      </button>
                    </div>
                  </div>
                  <!-- <div
                    class="col-4 mt-2 img-preview-wrapper"
                    v-for="(item, index) in previewList"
                    v-bind:key="index"
                  >
                    <button
                      type="button"
                      @click="removeImage(item, index)"
                      class="btn btn-link remove-logo"
                      title="Remove Image"
                    >
                      X
                    </button>
                    <input
                      :checked="item.is_primary === true"
                      type="radio"
                      name="primary"
                      id
                      @input="makePrimary(item, index)"
                    />
                    Mark as Primary
                    <div v-if="item.logosrc" class="img-preview">
                      <img :src="item.logosrc" class="img-fluid" />
                    </div>
                  </div> -->
                </template>
              </div>
              <div v-if="submitted && primaryImage" class="image-error ml-2">
                atleast 1 product image is required
              </div>
              <div class="row mt-2">
                <!-- <template v-if="previewList.length">
                  <div v-for="(item, index) in previewList" v-bind:key="index">
                    <div class="row mt-2">
                      <div class="col-3 ml-5 mt-3">
                        <button
                          type="button"
                          @click="removeImage(index)"
                          class="btn btn-link remove-logo"
                          title="Remove Image"
                        >X</button>
                        <input
                          :checked="item.is_primary == true"
                          type="radio"
                          name="primary"
                          id
                          @input="makePrimary(index)"
                        />
                        Mark as Primary
                        <div v-if="item.logosrc">
                          <img :src="item.logosrc" class="img-fluid" />
                        </div>
                         <div v-else>
                          <img :src="item.name"  class="img-fluid" />
                        </div>
                      </div>
                    </div>
                  </div>
                </template>-->
                <!-- <template v-if="editPreviewList.length">
                  <div
                    v-for="(item, index) in editPreviewList"
                    v-bind:key="`preview-${index}`"
                  >
                    <div v-if="!item.is_primary">
                      <div class="row mt-2 ml-4 justify-content-center">
                        <div class="col-3 ml-5 mt-3">
                          <button
                            type="button"
                            @click="removeEditImage(index)"
                            class="btn btn-link remove-logo"
                            title="Remove Image"
                          >
                            X
                          </button>
                          <img :src="item.logosrc" class="img-fluid" />
                        </div>
                      </div>
                    </div>
                  </div>
                </template>-->
              </div>

              <!-- <div class="form-group m-b mt-2">
                <label for="location">Add Key Search Words</label>
                <span class="ml-3">{{ remainingLength }}</span>
                <input
                  type="text"
                  class="form-control"
                  maxlength="256"
                  v-model.trim="productDetail.word"
                  v-on:keyup="getLength($event.target.value)"
                  placeholder="search word"
                  :class="{
                    'is-invalid': submitted && $v.productDetail.word.$error,
                  }"
                />
                <label class="mb-0">Add comma seperated word</label>
                <div
                  v-if="submitted && !$v.productDetail.word.required"
                  class="invalid-feedback"
                >
                  search keyword required
                </div>
              </div> -->
              <div class="form-group text-right">
                <button
                  type="button"
                  @click.prevent="showModal"
                  class="btn btn-dark btn-custom mr-2"
                >
                  Cancel
                </button>
                <button class="btn btn-dark btn-custom">Update</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <modal v-if="showCancelModal" @closeModal="hideModal">
      <div slot="body">Leave the page without saving?</div>
      <div slot="footer">
        <b-button class="btn" variant="outline-dark" @click.prevent="hideModal">
          Cancel
        </b-button>
        <b-button
          class="ml-2 btn"
          variant="outline-dark"
          @click.prevent="cancel"
        >
          OK
        </b-button>
      </div>
    </modal>
    <!--<template>
      <b-modal ref="my-modal" hide-footer>
        <div class="d-block text-center">
          <h4>Leave the page without saving?</h4>
        </div>
        <b-button
          class="mt-3"
          variant="outline-danger"
          @click.prevent="hideModal"
          >Cancel</b-button
        >
        <b-button
          class="mt-3 ml-3"
          variant="outline-primary"
          @click.prevent="cancel"
          >OK</b-button
        >
      </b-modal>
    </template>-->
    <modal v-if="showProductAlert" @closeModal="saveModalClose">
      <div slot="body">Product details updated successfully</div>
    </modal>
    <!--<template>
      <b-modal
        :visible="showProductAlert"
        ok-only
        ref="product-Modal"
        id="modal-1"
        title="Edit Product Details"
        @ok="saveModalClose"
        @close="saveModalClose"
      >
        <p class="my-4 text-center">Product details updated successfully</p>
      </b-modal>
    </template>-->
    <modal v-if="maxImageAlert" @closeModal="hideImageModal">
      <div slot="body">
        <pre style="white-space: pre-wrap">{{ imageError }}</pre>
      </div>
    </modal>
    <!--<template>
      <b-modal
        :visible="maxImageAlert"
        hide-footer
        hide-header
        ref="image-Modal"
        id="modal-2"
        title="Product Images"
      >
        <div class="d-block text-center">
          <p class="my-4">{{ imageError }}</p>
        </div>
        <b-button class="mt-3" @click.prevent="hideImageModal">Ok</b-button>
      </b-modal>
    </template>
    <template>
      <b-modal
        :visible="maxImageAlert"
        hide-footer
        hide-header
        ref="image-Modal"
        id="modal-2"
      >
        <div class="d-block">
          <pre class="my-4">{{ imageError }}</pre>
          <b-button class="mt-2 float-right" @click.prevent="hideImageModal"
            >Ok</b-button
          >
        </div>
      </b-modal>
    </template>-->
    <loading :active="isLoading" :is-full-page="true" />
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import { mapGetters, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import md5 from 'js-md5'
import appConstants from '../../../appConstants.js'
import imageCheck from '../../../mixins/imageCheck.js'
import uploadFileOnS3 from '../../../mixins/uploadFileOnS3.js'
import modal from '../../../common/Modal'

export default {
  name: 'EditProduct',
  mixins: [imageCheck, uploadFileOnS3],
  components: {
    Loading,
    modal
  },
  data() {
    return {
      isLoading: false,
      imageError: '',
      searchTotalLength: 256,
      remainingLength: 256,
      descTotalLength: 1000,
      remainingDescLength: 1000,
      previewList: [],
      editPreviewList: [],
      deletedMedia: [],
      addProductLimit: true,
      hasPrice: false,
      mediaAdded: false,
      idProductUpdated: false,
      primaryFile: '',
      primarySrc: '',
      primaryName: '',
      companyData: '',
      primaryImage: false,
      isPrimary: false,
      isImageAdding: false,
      updatedMedia: [],
      files: [],
      medias: [],
      maxImageAlert: false,
      productDetail: {
        name: '',
        description: '',
        price: '',
        unit: '',
        currency: '',
        word: ''
      },
      submitted: false,
      imageTypes: appConstants.ACCEPT_IMAGE_TYPE,
      showCancelModal: false
    }
  },
  computed: {
    ...mapGetters('product', [
      'getProductData',
      'editProductCompany',
      'showProductAlert'
    ])
  },
  created() {
    // if (
    //   this.getProductData[0] == undefined ||
    //   this.editProductCompany[0] == undefined
    // ) {
    //   this.$router.push("/home");
    // }
    this.companyData = this.editProductCompany
    this.productDetail.name = this.getProductData[0].name
    this.primarySrc = this.getProductData[0].logosrc
    this.primaryName = this.getProductData[0].logosrc
    this.isPrimary = true
    this.productDetail.description = this.getProductData[0].description
    if (
      this.getProductData[0].price !== null &&
      this.getProductData[0].price !== 0
    ) {
      this.hasPrice = true
      this.productDetail.price = this.getProductData[0].price
      this.productDetail.unit = this.getProductData[0].unit
      this.productDetail.currency = this.getProductData[0].currency
    }
    this.productDetail.word = this.getProductData[0].search_keywords
    this.remainingLength =
      this.searchTotalLength - this.getProductData[0].search_keywords.length
    this.remainingDescLength =
      this.descTotalLength - this.getProductData[0].description.length
    if (this.getProductData[0].medias.length) {
      this.previewList = this.getProductData[0].medias
      this.previewList.map((res) => {
        // res.logosrc = `https://olous-dev.s3.ap-south-1.amazonaws.com/media/products/${res.name}`;
        // res.logosrc = `https://olous.s3.ap-south-1.amazonaws.com/media/products/${res.name}`;
        //res.logosrc = `https://daifhb63cb3v5.cloudfront.net/media/products/${res.name}`;

        res.logosrc = `${process.env.VUE_APP_IMGURL}${res.name}`
      })

      let checkIsPrimary = this.previewList.map((res) => {
        return res.is_primary
      })
      console.log(checkIsPrimary)
      console.log(checkIsPrimary.indexOf(true))
      if (checkIsPrimary.indexOf(true) === -1) {
        //this.previewList[0].is_primary = true;
        this.makePrimary(this.previewList[0], 0)
        //this.productUpdated = true;
      }
    }
  },
  validations() {
    console.log(this.hasPrice)
    if (this.hasPrice) {
      return {
        productDetail: {
          name: {
            required
          },
          description: {
            required
          },
          // word: { required, maxLength: maxLength(256) },
          unit: {
            required
          },
          currency: {
            required
          }
        }
      }
    } else {
      return {
        productDetail: {
          name: {
            required
          },
          description: {
            required
          }
          //word: { required, maxLength: maxLength(256) },
        }
      }
    }
  },
  methods: {
    ...mapActions('product', [
      'editProductDetails',
      'createMedia',
      'multipleUpdate',
      'deleteMedia',
      'addDeleteMedia',
      'updateMedia',
      'serviceAddUpdateM',
      'editServiceMultiple',
      'productDeleteUpdateM',
      'updateShowEditProduct'
    ]),
    showModal() {
      //this.$refs['my-modal'].show()
      this.showCancelModal = true
    },
    hideModal() {
      //this.$refs['my-modal'].hide()
      this.showCancelModal = false
    },
    cancel() {
      //this.$router.push("/home");
      this.updateShowEditProduct(false)
      //this.hideEditProduct(false);
    },
    productUpdated() {
      console.log(true)
      this.idProductUpdated = true
    },
    getLength(e) {
      console.log(e.length)
      this.idProductUpdated = true
      this.remainingLength = this.searchTotalLength - e.length
    },
    getDescLength(e) {
      this.remainingDescLength = this.descTotalLength - e.length
    },
    hideImageModal() {
      //this.$refs['image-Modal'].hide()
      this.maxImageAlert = false
    },
    deleteProduct(counter) {
      if (this.productDetail.products.length === 1) {
        return
      }
      this.productDetail.products.splice(counter, 1)
    },
    getPrice(event) {
      console.log(event.length)
      if (event.length >= 2) {
        this.hasPrice = true
        this.idProductUpdated = true
      } else {
        this.hasPrice = false
      }
      console.log(this.hasPrice)
    },
    integerValueOnly(e) {
      this.productDetail.price = e.target.value
        .replace(/\s+/g, '')
        .replace(/[^0-9]/g, '')
    },
    addImage(event) {
      console.log(event)
      this.isImageAdding = true
    },
    async previewFile(e, fileIndex) {
      let input = e.target
      let userSelectedFileCount = input.files.length
      let maxCount = userSelectedFileCount + this.previewList.length
      if (userSelectedFileCount > 3 || maxCount > 3) {
        this.imageError = 'Upto 3 Product images are allowed'
        this.maxImageAlert = true
        return
      }

      // if (input.files) {
      //   this.mediaAdded = true
      //   this.primaryImage = false
      //   this.s3ImgUpload(fileIndex)
      // }
      var validImages = []
      var invalidImageIndex = []
      var index
      for (index = 0; index < input.files.length; index++) {
        await this.checkIsImageValid(
          appConstants.ACCEPT_IMAGE_TYPE,
          appConstants.imageSize.MAX_SIZE,
          appConstants.imageSize.MAX_WIDTH,
          appConstants.imageSize.MAX_HEIGHT,
          input.files[index]
        ).then((result) => {
          if (result.isValidImage) {
            validImages.push(input.files[index])
          } else {
            invalidImageIndex.push({
              index: index,
              InvalidMesage: result.message
            })
          }
        })
      }

      if (invalidImageIndex.length > 0) {
        var errorMessage = ''
        //if user has selected only one image then show error for only that image other wise display all valid image rules
        if (userSelectedFileCount == 1 && invalidImageIndex.length == 1) {
          errorMessage = invalidImageIndex[0].InvalidMesage
        } else {
          //show error message to user
          var validationRules = this.getAllImageValidationRule(
            appConstants.ACCEPT_IMAGE_TYPE,
            appConstants.imageSize.MAX_SIZE,
            appConstants.imageSize.MAX_WIDTH,
            appConstants.imageSize.MAX_HEIGHT
          )
          var message = `${invalidImageIndex.length} out of ${userSelectedFileCount} files could not be uploaded.`
          errorMessage = `${message}\n${validationRules}`
          this.maxImageAlert = true
        }
        this.imageError = errorMessage
        this.maxImageAlert = true
      }

      if (validImages.length) {
        this.mediaAdded = true
        this.primaryImage = false
        this.s3ImgUpload(fileIndex, validImages)
      } else {
        let fileInput = document.getElementById('fileInput')
        fileInput.value = ''
      }
    },
    updateMediaList(file, fileName, index) {
      let primary = true
      if (index === 0) {
        primary = true
      } else {
        primary = false
      }
      let fileDetails = {
        name: '',
        height: 0,
        width: 0,
        logosrc: file,
        video_duration: 0,
        mediaType: 7,
        is_primary: primary
      }
      fileDetails.name = fileName
      if (this.previewList.length === 1) {
        this.makePrimary(this.previewList[0], 0)
      }
      this.previewList.push(fileDetails)
      var image = new Image()
      image.src = file
      // this.previewList.push(e.target.result);
      image.onload = () => {
        fileDetails.height = image.height
        fileDetails.width = image.width
        this.medias.push(fileDetails)
      }
      console.log(this.medias)
    },
    previewPrimary() {
      this.primaryFile = this.$refs.primary.files[0]
      console.log(this.primaryFile)
      if (!this.primaryFile || this.primaryFile.type.indexOf('image/') === -1) {
        return
      }
      this.primaryName = this.primaryFile.name
      let abc = md5(this.primaryName)
      this.mediaAdded = true
      this.primaryName = this.primaryName.substr(
        this.primaryName.lastIndexOf('.')
      )
      this.primaryName =
        abc + this.getProductData[0].id + '-pdt' + this.primaryName
      this.isPrimary = true
      this.primaryImage = false
      let reader = new FileReader()
      this.s3PrimaryUpload()
      console.log(this.primaryName)
      reader.onload = (e) => {
        let fileDetails = {
          name: '',
          height: 0,
          width: 0,
          video_duration: 0,
          mediaType: 7,
          is_primary: true
        }
        this.primarySrc = e.target.result
        fileDetails.name = this.primaryName
        fileDetails.is_primary = true
        var image = new Image()
        image.src = e.target.result
        image.onload = () => {
          fileDetails.height = image.height
          fileDetails.width = image.width
          // this.medias.push(fileDetails);
        }
      }
      reader.readAsDataURL(this.primaryFile)
    },
    removePrimary() {
      this.$refs.primary.value = ''
      this.primaryFile = ''
      this.primarySrc = null
      this.primaryName = ''
      this.isPrimary = false
      let abc = this.medias.splice(
        this.medias.findIndex((e) => e.is_primary === true),
        1
      )
      console.log(abc)
      this.deletedMedia.push(abc[0])
    },
    removeImage(item, i) {
      let abc = this.previewList.splice(i, 1)

      let del = abc.filter((res) => {
        return res.id
      })

      if (del.length) {
        this.deletedMedia.push(del[0])
      } else {
        this.mediaAdded = false
      }
      console.log(item.is_primary && this.previewList.length >= 1)
      if (item.is_primary && this.previewList.length >= 1) {
        this.previewList[0].is_primary = true
      }
    },
    makePrimary(item, i) {
      this.updatedMedia = []
      // console.log(item, i)
      this.previewList.map((res, j, arr) => {
        console.log(j === i)
        if (i === j) {
          arr[j].is_primary = true
        } else {
          arr[j].is_primary = false
        }
      })
      if (item.id) {
        this.updatedMedia.push(item)
      }
      console.log(this.updatedMedia.length)
    },
    removeEditImage(i) {
      console.log(this.editPreviewList, i)
      let abc = this.editPreviewList.splice(i, 1)
      // this.medias.splice(i, 1);
      this.deletedMedia.push(abc[0])
      // console.log(this.medias);
      // console.log(this.deletedMedia);
    },
    addFile(e) {
      let droppedFiles = e.dataTransfer.files
      if (!droppedFiles) {
        return
      }
      ;[...droppedFiles].forEach((f) => {
        this.files.push(f)
      })
    },
    removeFile(file) {
      this.files = this.files.filter((f) => {
        return f != file
      })
    },
    s3PrimaryUpload() {
      if (this.primaryFile) {
        // let fileName = this.primaryFile.name
        // fileName = fileName.substr(fileName.lastIndexOf('.'))
        console.log(this.primaryName)
        // fileName = this.getProductData[0].id + '-primary' + fileName
        let filePath = 'media/products/' + this.primaryName
        // let fileUrl =
        //   'https://' + bucketRegion + '.amazonaws.com/olous-dev/' + filePath
        s3.upload(
          { Key: filePath, Body: this.primaryFile, ACL: 'public-read' },
          // eslint-disable-next-line no-unused-vars
          function (err, data) {
            if (err) {
              console.log(err)
            }
          }
        ).on('httpUploadProgress', function (progress) {
          let uploaded = parseInt((progress.loaded * 100) / progress.total)
          // eslint-disable-next-line no-undef
          $('progress').attr('value', uploaded)
        })
      }
    },
    s3ImgUpload(index, files) {
      this.isLoading = true
      let fileInput = document.getElementById('fileInput')
      //let files = document.getElementById('fileInput').files
      console.log(files)
      if (files) {
        for (let i = 0; i < files.length; i++) {
          let file = files[i]
          let fileName = file.name
          let abc = md5(fileName)
          fileName = fileName.substr(fileName.lastIndexOf('.'))
          fileName = abc + this.getProductData[0].id + '-pdt' + fileName
          //let filePath = 'media/products/' + fileName
          this.uploadFileOnS3(
            fileName,
            appConstants.PATH_SAVE_IMAGE_ON_S3,
            files[i],
            appConstants.IMAGE_CONTENT_TYPE
          )
            .then((data) => {
              this.updateMediaList(
                data.serverFilePath,
                data.savedFileName,
                index
              )
              this.isLoading = false
            })
            .catch((err) => {
              this.imageError = err
              this.maxImageAlert = true
              this.isLoading = false
            })
          // s3.upload(
          //   {
          //     Key: filePath,
          //     Body: file,
          //     ACL: 'public-read',
          //     ContentType: 'image'
          //   },
          //   (err, data) => {
          //     this.isLoading = false
          //     if (err) {
          //       console.log(err)
          //       this.imageError =
          //         'Unable to upload image. Please try again later.'
          //       this.maxImageAlert = true
          //     } else if (data) {
          //       console.log(data)
          //       // let file = ;
          //       // console.log(file)
          //       // data.key.substr(data.key.lastIndexOf("/")).replace('/','')
          //       //this.previewList.push(data.Location);
          //       this.updateMediaList(data.Location, fileName, index)
          //       //this.maxImageAlert = false
          //     }
          //   }
          // ).on('httpUploadProgress', function (progress) {
          //   let uploaded = parseInt((progress.loaded * 100) / progress.total)
          //   // eslint-disable-next-line no-undef
          //   $('progress').attr('value', uploaded)
          // })
        }
      }
      fileInput.value = ''
    },

    editProduct() {
      this.submitted = true
      this.$v.productDetail.$touch()
      if (this.$v.productDetail.$invalid && this.previewList.length == 0) {
        this.primaryImage = true
        return
      } else if (this.previewList.length == 0) {
        this.primaryImage = true
        return
      } else if (this.$v.productDetail.$invalid) {
        return
      }

      if (
        this.productDetail.price == '' ||
        this.productDetail.price == undefined
      ) {
        this.productDetail.price = 0
      }
      let newMedia = this.previewList.filter((res) => {
        return !res.id
      })

      let addedMedia = {
        product_id: this.getProductData[0].id,
        medias: newMedia
      }

      let uMedia = this.previewList.filter((res) => {
        return res.id
      })

      let deleteMedia = []
      this.deletedMedia.map((res) => {
        deleteMedia.push(res.id)
      })

      let mDData = {
        product_id: this.getProductData[0].id,
        media_ids: deleteMedia
      }

      let productData = {
        id: this.getProductData[0].id,
        name: this.productDetail.name,
        description: this.productDetail.description,
        price: this.productDetail.price,
        unit: this.productDetail.unit,
        currency: this.productDetail.currency,
        search_keywords: this.productDetail.word
      }
      if (productData.price === '' || productData.price === 0) {
        delete productData.unit
        delete productData.currency
      }

      if (
        newMedia.length &&
        this.deletedMedia.length &&
        this.idProductUpdated
      ) {
        // let addedMedia = this.previewList.filter((res) => {
        //   return !res.id;
        // });
        // let mdata = {
        //   product_id: this.getProductData[0].id,
        //   medias: addedMedia,
        // };
        if (
          this.productDetail.price == '' ||
          this.productDetail.price == undefined
        ) {
          this.productDetail.price = 0
        }
        let data = {
          id: this.getProductData[0].id,
          name: this.productDetail.name,
          description: this.productDetail.description,
          price: this.productDetail.price,
          unit: this.productDetail.unit,
          currency: this.productDetail.currency,
          search_keywords: this.productDetail.word
        }

        if (data.price === '' || data.price === 0) {
          delete data.unit
          delete data.currency
        }

        console.log(deleteMedia)

        let payLoad = {
          p: data,
          m: addedMedia,
          d: mDData,
          c: this.companyData
        }
        this.multipleUpdate(payLoad).then(() => {
          this.hideEditProduct(true)
        })
      } else if (newMedia.length && uMedia.length && this.deletedMedia.length) {
        console.log('media added, deleted, updated')
        let payLoad = {
          s: productData,
          m: addedMedia,
          d: mDData,
          upMData: uMedia,
          c: this.companyData
        }
        this.editServiceMultiple(payLoad).then(() => {
          this.hideEditProduct(true)
        })
      } else if (newMedia.length && this.deletedMedia.length) {
        console.log('media added & deleted')

        let deleteMedia = []
        this.deletedMedia.map((res) => {
          deleteMedia.push(res.id)
        })

        let dData = {
          product_id: this.getProductData[0].id,
          media_ids: deleteMedia
        }

        let payload = {
          addedMedia: addedMedia,
          deletedMedia: dData,
          company: this.companyData
        }
        this.addDeleteMedia(payload).then(() => {
          this.hideEditProduct(true)
        })
      } else if (newMedia.length && uMedia.length) {
        console.log('media added and updated')
        let payLoad2 = {
          s: productData,
          m: addedMedia,
          upMData: uMedia,
          c: this.companyData
        }
        this.serviceAddUpdateM(payLoad2).then(() => {
          this.hideEditProduct(true)
        })
      } else if (this.deletedMedia.length && uMedia.length) {
        console.log('media deleted and updated')
        let deleteMedia = []
        this.deletedMedia.map((res) => {
          deleteMedia.push(res.id)
        })

        let dData = {
          product_id: this.getProductData[0].id,
          media_ids: deleteMedia
        }
        let payLoad2 = {
          s: productData,
          deletedMedia: dData,
          upMData: uMedia,
          c: this.companyData
        }
        this.productDeleteUpdateM(payLoad2).then(() => {
          this.hideEditProduct(true)
        })
      } else if (this.updatedMedia.length) {
        console.log('media updated')
        console.log(this.updatedMedia)
        let updateMData = {
          pData: productData,
          upMData: uMedia,
          company: this.companyData
        }
        this.updateMedia(updateMData).then(() => {
          this.hideEditProduct(true)
        })
      } else if (newMedia.length) {
        console.log('media added')

        // let addedMedia = this.previewList.filter((res) => {
        //   return !res.id;
        // });
        // console.log(addedMedia);
        // let data = {
        //   product_id: this.getProductData[0].id,
        //   medias: addedMedia,
        // };
        let payload = {
          pData: productData,
          media: addedMedia,
          company: this.companyData
        }
        this.createMedia(payload).then(() => {
          this.hideEditProduct(true)
        })
      } else if (this.deletedMedia.length) {
        console.log('media deleted')
        let deleteMedia = []
        this.deletedMedia.map((res) => {
          deleteMedia.push(res.id)
        })
        let deleteMData = {
          product_id: this.getProductData[0].id,
          media_ids: deleteMedia
        }
        let payload = {
          pData: productData,
          media: deleteMData,
          company: this.companyData
        }
        this.deleteMedia(payload).then(() => {
          this.hideEditProduct(true)
        })
      } else if (this.idProductUpdated) {
        console.log('product updated')
        let payload = {
          pData: productData,
          company: this.companyData
        }
        this.editProductDetails(payload).then(() => {
          this.hideEditProduct(true)
        })
      } else {
        console.log('no action')
        let payload = {
          pData: productData,
          company: this.companyData
        }
        this.editProductDetails(payload).then(() => {
          this.hideEditProduct(true)
        })
      }
    },
    hideEditProduct(reloadPage) {
      this.$emit('hideEditProduct', { reloadPage: reloadPage })
    },
    saveModalClose() {
      this.updateShowEditProduct(false)
    }
  }
}
</script>

<style scoped>
.img-preview-wrapper {
  background: #f1f1f1;
  padding: 5px 14px 14px;
  margin: 0 10px;
  border-radius: 16px;
  position: relative;
}
.img-preview {
  max-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}
.img-preview img {
  max-height: 200px;
}

#fileInputButton {
  width: 100%;
  height: 100%;
  margin-top: 0px;
  border-radius: 4px;
}

.image-error {
  color: #dc3545;
}

.contact-msg {
  display: inline;
  text-transform: none;
}
</style>
