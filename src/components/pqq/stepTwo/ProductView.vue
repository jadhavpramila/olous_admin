<template>
  <div class="cls-ProductView form-conatiner">
    <div class="form-container">
      <div class="page-body">
        <div class="form-group">
          <!-- <b-alert
      v-if="showProductAlert"
      variant="success"
      :show="showProductAlert"
      dismissible
      fade
      >Product added successfully ALert</b-alert>
      <p class="alert alert-success" v-if="showProductAlert">Product added successfully</p>-->
          <div>
            <div class="">
              <!-- <div class="col-lg-4">
          <div
            class="position-fixed d-flex align-items-center left-content-wrapper"
          >
            <LeftContent />
          </div>
        </div> -->

              <div>
                <div
                  class="text-right row align-items-center justify-content-between"
                >
                  <div class="col-6 text-left">
                    <!-- <label v-if="isService">Services</label>
              <label v-else>Products</label> -->
                  </div>
                  <!-- <div class="col-6" v-if="companyProducts.length<= 6"> -->
                  <div class="col-6">
                    <!-- <router-link to="/home" class="btn btn-info btn-outline mr-2"
                >back</router-link
              > -->
                    <!--<div v-if="companyProducts.length < allowTotalNumberOfProducts">-->
                    <div
                      v-if="
                        !showAddService &&
                        !showEditService &&
                        !showAddProduct &&
                        !showEditProduct
                      "
                    >
                      <button
                        @click.prevent="addService(companyData)"
                        class="btn btn-info btn-dark mr-3"
                      >
                        Add Service
                      </button>
                      <button
                        @click.prevent="addProduct(companyData)"
                        class="btn btn-outline-dark"
                      >
                        Add Product
                      </button>
                    </div>
                    <!--</div>-->
                  </div>
                </div>
                <div v-if="showAddProduct">
                  <AddProduct
                    @hideAddProduct="hideAddProduct"
                    :currrentCompanyData="this.currrentCompanyData"
                  ></AddProduct>
                </div>
                <div v-if="showEditProduct">
                  <EditProduct @hideEditProduct="hideEditProduct"></EditProduct>
                </div>
                <div v-if="showAddService">
                  <AddService
                    @hideAddService="hideAddService"
                    :currrentCompanyData="this.currrentCompanyData"
                  ></AddService>
                </div>
                <div v-if="showEditService">
                  <EditService @hideEditService="hideEditService"></EditService>
                </div>

                <div
                  class="row mt-5"
                  v-if="
                    !showAddProduct &&
                    !showEditProduct &&
                    !showAddService &&
                    !showEditService
                  "
                >
                  <div class="col-12 mt-4 text-center" v-if="noProducts">
                    <!-- <div v-if="isService">
                <h3>
                  Currently there are no services added. Please add a service.
                </h3>
                <button
                  @click="addService(companyData)"
                  class="btn btn-dark btn-outline mr-3"
                >
                  Add Service
                </button>
                <router-link to="/home" class="btn btn-info btn-outline"
                  >back</router-link
                >
              </div> -->
                    <!-- <div v-else>
                <h3>
                  Currently there are no products added. Please add a product.
                </h3>
                <button
                  @click="addProduct(companyData)"
                  class="btn btn-dark btn-outline mr-3"
                >
                  Add Product
                </button>
                <router-link to="/home" class="btn btn-info btn-outline"
                  >back</router-link
                >
              </div> -->
                  </div>
                  <div
                    v-else
                    class="col-md-4 product-list mb-3"
                    v-for="(product, counter) in companyProducts"
                    :key="counter"
                  >
                    <div class="card">
                      <div class="card-body">
                        <template>
                          <img
                            :src="product.logosrc"
                            width="100%"
                            height="129px"
                            class="product-card-footer-img-preview"
                          />
                        </template>
                      </div>
                      <div class="product-card-footer px-3">
                        <div
                          v-if="product.product_type == product_type.SERVICES"
                          class="product-card-footer-product-name-label"
                        >
                          Service Name
                        </div>
                        <div
                          v-if="product.product_type == product_type.PRODUCT"
                          class="product-card-footer-product-name-label"
                        >
                          Product Name
                        </div>
                        <div
                          class="product-card-footer-product-name overflow-hidden pt-1"
                        >
                          {{ product.name }}
                        </div>
                        <div v-if="!isService && product.price > 0">
                          <div
                            class="product-card-footer-product-price-label pt-3"
                          >
                            Price
                          </div>
                          <div class="product-card-footer-product-price pt-1">
                            {{ product.price }} {{ product.currency }}
                          </div>
                        </div>
                        <div v-else style="height: 45px">
                          <div
                            class="product-card-footer-product-price-label pt-3"
                            style="visibility: hidden"
                          >
                            Price
                          </div>
                          <div
                            class="product-card-footer-product-price pt-1"
                            style="visibility: hidden"
                          >
                            {{ product.price }} {{ product.currency }}
                          </div>
                        </div>
                        <div
                          class="product-card-footer-product-action-items pt-3 pb-3"
                        >
                          <div class="product-card-footer-product-action-edit">
                            <img
                              src="../../../assets/img/Edit.svg"
                              title="Edit"
                              @click.prevent="editProduct(product)"
                            />
                          </div>
                          <div class="product-action-delete">
                            <img
                              src="../../../assets/img/Delete.svg"
                              title="Delete"
                              @click.prevent="
                                showDeleteModal(
                                  companyData.id,
                                  product.id,
                                  counter
                                )
                              "
                            />
                          </div>
                        </div>
                      </div>
                      <!-- <div class="company-name">
                  <div>
                    <label v-if="isService">Service name</label>
                    <label v-else>Product name</label>
                    <br />
                    <label class="product-name">{{ product.name }}</label>
                    <label v-if="product.price > 0">
                      <label>Price</label>
                      <label class="product-price">{{ product.price }}</label>
                    </label>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <img 
                        class="catalouge-delete"
                        src="../../assets/img/Delete.svg"
                        title="Delete"
                        @click="showDeleteModal(companyData.id, product.id, counter)" 
                        />
                    </div>
                    <div class="col-md-6">
                       <img 
                        class="catalouge-delete"
                        src="../../assets/img/Edit.svg"
                        title="Edit"
                        @click="editProduct(product)" 
                        />                 
                    </div>
                </div>
                <div class="footer-btn-wrapper">
                  </div>
                </div> -->
                    </div>
                    <div class="pl-3 row">
                      <select
                        v-model="product.order"
                        class="form-control w-50 select_order"
                        @change="onOrderChange($event, product)"
                      >
                        <option selected value="-1">select</option>
                        <option
                          v-for="n in companyProducts.length"
                          :value="n"
                          :key="n"
                        >
                          {{ n }}
                        </option>
                        <!-- <option v-for="n in 8" v-if="n >=5" :value="n"> {{n}} </option> -->
                      </select>
                      <label class="mt-2">Select order number</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <template v-if="singleProduct">
            <b-modal
              ref="my-modal"
              size="lg"
              hide-footer
              title="Product Detail"
              :centered="true"
            >
              <div class="row justify-content-center">
                <div class="col-12" v-if="singleProduct.medias.length">
                  <div
                    class="row align-items-center justify-content-center"
                    v-for="(product, counter) in singleProduct.medias"
                    :key="counter"
                  >
                    <div
                      class="col-md-8 justify-content-center"
                      v-if="product.is_primary"
                    >
                      <img :src="getImage(product.name)" class="primary-img" />
                    </div>
                    <div class="col-md-4" v-else>
                      <img :src="getImage(product.name)" class="img-preview" />
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <br />
                  <label for>PRODUCT NAME</label>
                  <br />
                  {{ singleProduct.name }}
                  <br />
                  <br />
                  <label for>PRODUCT DESCRIPTION</label>
                  <br />
                  {{ singleProduct.description }}
                  <br />
                  <br />
                  <label for>SEARCH KEYWORDS</label>
                  <br />
                  {{ singleProduct.search_keywords }}
                  <br />
                  <label for>UNIT</label>
                  {{ singleProduct.unit }}
                  <br />
                  <label for>CURRENCY</label>
                  {{ singleProduct.currency }}
                </div>
                <div class="col-12">
                  <b-button
                    class="mt-3 btn"
                    variant="outline-dark"
                    @click="hideModal()"
                    >Cancel</b-button
                  >
                  <b-button
                    class="mt-3 ml-3 btn"
                    variant="outline-dark"
                    @click="hideModal()"
                    >OK</b-button
                  >
                </div>
              </div>
            </b-modal>
          </template>

          <modal
            v-if="showDeleteConfirmationModal"
            @closeModal="hideDeleteModal"
          >
            <div slot="body">Do you really want to delete this product?</div>
            <div slot="footer">
              <b-button
                class="btn"
                variant="outline-dark"
                @click="hideDeleteModal"
              >
                Cancel
              </b-button>
              <b-button
                class="ml-2 btn"
                variant="outline-dark"
                @click="deleteThisProduct"
              >
                OK
              </b-button>
            </div>
          </modal>
          <!-- <modal
            v-if="isShowCannotDeleteModal"
            @closeModal="isShowCannotDeleteModal = false"
          >
            <div slot="body">Atleast one product required.</div>
          </modal> -->

          <modal
            v-if="showDeleteProductIssueModal"
            @closeModal="updateDeleteProductIssueModal([false, ''])"
          >
            <div slot="body">{{ modalDeleteProductIssueMessage }}</div>
          </modal>
          <!--<template>
      <b-modal ref="delete-modal" hide-footer title="Delete Product">
        <div class="d-block text-center">
          <h4>Do you really want to delete this product?</h4>
        </div>
        <b-button class="mt-3" variant="outline-danger" @click="hideDeleteModal"
          >Cancel</b-button
        >
        <b-button
          class="mt-3 ml-3"
          variant="outline-primary"
          @click="deleteThisProduct"
          >OK</b-button
        >
      </b-modal>
    </template>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import AddProduct from './AddProduct.vue'
import EditProduct from './EditProduct.vue'
import AddService from './AddService'
import EditService from './EditService'
// import { ALLOW_TOTAL_NUMBER_OF_PRODUCTS } from '../../appConstant'
import appConstants from '../../../appConstants.js'
import modal from '../../../common/Modal'
import { isServiceBasedCompany } from '../../../common/js/IsService.js'

export default {
  name: 'ProductView',
  // props: ['currrentCompanyData'],
  components: {
    AddProduct,
    EditProduct,
    AddService,
    EditService,
    modal
  },
  data() {
    return {
      logosrc: '',
      logosrc1: '',
      noProducts: false,
      showProduct: false,
      noProductsCompany: '',
      singleProduct: '',
      companyData: '',
      deleteCompanyId: '',
      deleteProductId: '',
      deleteProductIndex: 0,
      isService: false,
      product_type: appConstants.PRODUCT_TYPE,
      is_showService: true,
      is_showProduct: true,
      //showAddProduct : false,
      //showEditProduct : false,
      //showAddService : false,
      //showEditService : false,
      allowTotalNumberOfProducts: appConstants.ALLOW_TOTAL_NUMBER_OF_PRODUCTS,
      showDeleteConfirmationModal: false,
      currrentCompanyData: '',
      isShowCannotDeleteModal: false
    }
  },
  computed: {
    ...mapGetters('product', [
      'companyProducts',
      'zeroProductCompany',
      'showProductAlert',
      'showEditProduct',
      'showEditService',
      'showAddProduct',
      'showAddService',
      'showDeleteProductIssueModal',
      'modalDeleteProductIssueMessage'
    ]),
    ...mapGetters('companyData', ['getCurrentCompanyData'])
  },
  created() {
    // this.allowTotalNumberOfProducts = ALLOW_TOTAL_NUMBER_OF_PRODUCTS

    // var currrentCompanyID = 'f4360fae-be63-4c55-a937-06a61f665565'
    this.currrentCompanyData = this.getCurrentCompanyData
    this.productResetState()
    this.setProduct(this.currrentCompanyData).then(() => {
      this.getAllProductData()
    })
  },

  methods: {
    ...mapActions('product', [
      'gotoProductPage',
      'goEditProduct',
      'deleteProduct',
      'goEditService',
      'goToServicePage',
      'oneCompanyProducts',
      'updateProductOrder'
    ]),
    ...mapMutations('product', [
      'productResetState',
      'updateDeleteProductIssueModal'
    ]),
    ...mapActions('companyData', [
      'fetchUpdatedCompanyDataSetToCurrentCompanyState'
    ]),
    getAllProductData() {
      this.companyData = this.companyProducts.pop()

      // if (
      //   this.companyData.category == 1 ||
      //   this.companyData.category == 2 ||
      //   this.companyData.category == 3
      // ) {
      //   this.isService = true
      // } else {
      //   this.isService = false
      // }

      if (isServiceBasedCompany(this.companyData.category)) {
        this.isService = true
      } else {
        this.isService = false
      }

      if (this.companyProducts.length) {
        this.noProducts = false
        this.companyProducts.map((res) => {
          if (res.medias.length) {
            res.medias.map((res1, j) => {
              if (res1.is_primary) {
                // res.logosrc = `https://olous-dev.s3.ap-south-1.amazonaws.com/media/products/${res.medias[j].name}`;
                // res.logosrc = `https://olous.s3.ap-south-1.amazonaws.com/media/products/${res.medias[j].name}`;
                //res.logosrc = `https://daifhb63cb3v5.cloudfront.net/media/products/${res.medias[j].name}`;

                res.logosrc = `${process.env.VUE_APP_IMGURL}${res.medias[j].name}`
              }
            })
          } else {
            res.logosrc = 'https://dummyimage.com/100x100'
          }
        })
      } else {
        this.noProducts = true
        this.noProductsCompany = this.zeroProductCompany
      }
    },
    addProduct(company) {
      this.is_showService = false
      this.gotoProductPage(company)
      //this.showAddProduct = true;
    },
    addService(company) {
      this.is_showProduct = false
      this.goToServicePage(company)
      //this.showAddService = true;
    },

    editProduct(product) {
      let payload = {
        singleProduct: product,
        company: this.companyData
      }
      if (product.product_type == this.product_type.SERVICES) {
        this.goEditService(payload)
        //this.showEditService = true;
      } else {
        this.goEditProduct(payload)
        //this.showEditProduct = true;
      }
    },
    showModal(product) {
      this.showProduct = true
      this.singleProduct = product
      this.$nextTick(() => {
        this.$refs['my-modal'].show()
      })
    },

    showDeleteModal(company, product, index) {
      //if it is a single product & company is published do not allow to delete this product
      // if (
      //   this.companyProducts.length == 1 &&
      //   this.getCurrentCompanyData.status ==
      //     appConstants.company_status.PUBLISHED
      // ) {
      //   this.isShowCannotDeleteModal = true
      //   return
      // }

      this.$nextTick(() => {
        //this.$refs['delete-modal'].show()
        this.showDeleteConfirmationModal = true
      })
      this.deleteCompanyId = company
      ;(this.deleteProductId = product), (this.deleteProductIndex = index)
    },

    deleteThisProduct() {
      let data = {
        product_id: this.deleteProductId,
        company_id: this.deleteCompanyId
      }
      this.deleteProduct(data)
        .then(() => {
          this.setCurrentCompanyState()

          this.companyProducts.splice(this.deleteProductIndex, 1)
          if (!this.companyProducts.length) {
            this.noProducts = true
          }
        })
        .catch(() => {
          this.setCurrentCompanyState()
        })

      this.showDeleteConfirmationModal = false
    },

    hideModal() {
      this.$refs['my-modal'].hide()
    },

    hideDeleteModal() {
      //this.$refs['delete-modal'].hide()
      this.showDeleteConfirmationModal = false
    },

    getImage(banner) {
      // return `https://olous-dev.s3.ap-south-1.amazonaws.com/media/products/${banner}`;
      // return `https://daifhb63cb3v5.cloudfront.net/media/products/${banner}`;

      return `${process.env.VUE_APP_IMGURL}${banner}`
    },
    async setProduct(company) {
      await this.oneCompanyProducts(company)
    },
    hideAddProduct(value) {
      //this.showAddProduct = false;
      if (value.reloadPage) {
        this.getAllProductData()
        this.setCurrentCompanyState()
      }
    },
    hideAddService(value) {
      //this.showAddService = false;
      if (value.reloadPage) {
        this.getAllProductData()
        this.setCurrentCompanyState()
      }
    },
    hideEditService(value) {
      //this.showEditService = false;
      if (value.reloadPage) {
        this.getAllProductData()
        this.setCurrentCompanyState()
      }
    },
    hideEditProduct(value) {
      //this.showEditProduct = false;
      if (value.reloadPage) {
        this.getAllProductData()
        this.setCurrentCompanyState()
      }
    },

    setCurrentCompanyState() {
      //After any product/service add or delete get updated tab-status execute below API
      this.fetchUpdatedCompanyDataSetToCurrentCompanyState(
        this.getCurrentCompanyData.id
      )
    },
    onOrderChange(e, orderchangedProduct) {
      //console.log(chnagedProduct.order);
      this.updateProductOrder(orderchangedProduct)
    }
  }
}
</script>

<style scoped></style>
