<template>
  <div>
    <div>
      <ProductFormVue
        :isAddNewProduct="true_bool_value"
        v-if="isShowAddProduct"
        @hide_Product_Form="setVisibility"
      ></ProductFormVue>
    </div>
    <div>
      <ProductFormVue
        :isAddNewProduct="false_bool_value"
        v-if="isShowEditProduct"
        @hide_Product_Form="setVisibility"
      ></ProductFormVue>
    </div>
    <div v-if="isShowProductList">
      <div class="">
        <div
          class="row ml-0"
          style="column-width: 250px !important; column-gap: 20px !important"
        >
          <div
            class="p-0 product-card d-flex justify-content-center align-items-center"
          >
            <span class="btn w-50" @click="addProduct"> Add Product </span>
          </div>
          <div
            class="p-0 product-card"
            v-for="(product, counter) in getCurrentCompanyProductData"
            :key="counter"
          >
            <!-- <div class="product-card">
              <img
                :src="setPrimaryImage(product.medias)"
                alt="product-img"
                class="product-img"
              />
              <span
                class="product-btn cursor-pointer"
                @click="editProduct(product)"
                >Edit</span
              >
              <div class="product-info">
                <span class="product-title w-100">
                  {{ product.name }}
                </span>
                <div class="d-flex w-auto">
                 
                </div>
              </div>
            </div> -->
            <div class="company-card">
              <div class="d-flex company-card-bg-img">
                <img
                  :src="setPrimaryImage(product.medias)"
                  class="bg-img-z-index"
                />
                <div class="company-card-img-overlay"></div>
              </div>

              <div
                class="company-card-body d-flex justify-content-between flex-column h-50"
              >
                <div>
                  <div class="fontSize16 font-weight-bold">
                    {{ product.name }}
                  </div>
                  <div class="fontSize12 font-weight-400 mt-2">
                    {{ setProductDescription(product.description) }}
                  </div>
                </div>
                <div class="mt-3 d-flex justify-content-between">
                  <img
                    @click="deleteProduct(product.id)"
                    src="../../assets/img/Delete-New.svg"
                    alt="delete"
                    class="cursor-pointer"
                  />
                  <img
                    @click="editProduct(product)"
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
    <b-modal ref="mediaModal" hide-footer hide-header :centered="true">
      <div class="d-flex flex-column align-items-center justify-content-center">
        <h4 class="my-4" style="text-transform: capitalize">
          {{ modal_message }}
        </h4>
        <b-button
          class="mt-2 btn"
          variant="outline-dark"
          @click="hideMediaModal"
          >Ok</b-button
        >
      </div>
    </b-modal>
    <b-modal ref="successModal" hide-footer hide-header :centered="true">
      <div
        class="d-flex flex-column align-items-center justify-content-center text-center"
      >
        <h4 class="my-4" style="text-transform: capitalize">
          {{ modal_message }}
        </h4>
        <b-button class="mt-2 btn" variant="outline-dark" @click="hideModal"
          >Ok</b-button
        >
      </div>
    </b-modal>
    <loading :active="isLoading" :is-full-page="true" />
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { required } from 'vuelidate/lib/validators'
import appConstants from '../../appConstants'
import Loading from 'vue-loading-overlay'
import imageCheck from '../../mixins/imageCheck.js'
import uploadFileOnS3 from '../../mixins/uploadFileOnS3.js'
import { mapActions, mapGetters } from 'vuex'
import ProductFormVue from './AddProductForm.vue'
export default {
  name: 'ProductDetails',
  mixins: [imageCheck, uploadFileOnS3],
  components: {
    Loading,
    ProductFormVue
  },
  data() {
    return {
      submitted: false,
      isLoading: false,
      imageTypes: appConstants.ACCEPT_IMAGE_TYPE,
      // productDetails: {
      //   name: '',
      //   media_name: '',
      //   description: '',
      //   price: 0,
      //   unit: '',
      //   currency: '',
      //   company: '',
      //   id: '',
      //   search_keywords: '',
      //   media_width: 0.0,
      //   media_height: 0.0,
      //   isPrimary: true
      // },
      productData: {},
      mediasData: {},
      product_images: [],
      isShowAddProduct: false,
      isShowEditProduct: false,
      isShowProductList: true,
      product_image: '',
      modal_message: '',
      isShowNotAllowMessage: false,
      isAllowMultipleImage: false,
      isAddproduct: false,
      true_bool_value: true,
      false_bool_value: false
    }
  },
  // validations() {
  //   return {
  //     productDetails: {
  //       name: {
  //         required
  //       },
  //       description: { required },
  //       media_name: { required }
  //     }
  //   }
  // },
  computed: {
    ...mapGetters(['getCurrentCompanyProductData', 'getCurrentCompanyId'])
  },
  methods: {
    ...mapActions([
      'saveProductInfoNew',
      'deleteSingleMediaProductImage',
      'deleteSingleProduct'
    ]),
    ...mapActions(['saveEditCurrentProductData']),

    getProductImage(media) {
      let img = `${process.env.VUE_APP_IMGURL}${media[0].name}`
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
    editProduct(data) {
      //console.log('data', data)
      //  this.isAddproduct = false
      //  this.productData = data
      // this.mediasData = data.medias

      // let dataToEdit = JSON.parse(JSON.stringify(data))
      this.saveEditCurrentProductData(data)
      // this.productDetails = Object.assign({}, data)
      // this.product_images = this.productDetails.medias
      this.isAllowMultipleImage = true
      this.isShowProductList = false
      this.isShowAddProduct = false
      this.isShowEditProduct = true
    },

    addProduct() {
      this.isAddproduct = true
      this.productData = {}
      this.mediasData = []
      this.isAllowMultipleImage = false
      this.isShowProductList = false
      this.isShowEditProduct = false
      this.isShowAddProduct = true
    },

    deleteProduct(id) {
      let obj = {
        product_id: id,
        company_id: this.getCurrentCompanyId
      }
      this.deleteSingleProduct(obj).then((res) => {
        console.log('res', res)
        this.modal_message = 'Product deleted successfully'
        this.showModal()
      })
    },
    setProductDescription(description) {
      let maxLength = 50
      if (description.length > maxLength) {
        description = description.slice(0, maxLength) + '...'
      }
      return description
    },

    showModal() {
      this.$refs['successModal'].show()
    },
    hideModal() {
      this.$refs['successModal'].hide()
      this.isShowProductList = true
      this.isShowAddProduct = false
    },
    hideMediaModal() {
      this.$refs['mediaModal'].hide()
    },
    showDeleteMediaModal() {
      this.$refs['mediaModal'].show()
    },
    setVisibility(value) {
      this.isShowAddProduct = false
      this.isShowEditProduct = false
      this.isShowProductList = value.cancelled
    }
  },
  mounted() {
    // this.$eventHub.$on('Cancel_Product_Form', this.setVisibility)
    // console.log(
    //   'getCurrentCompanyProductData',
    //   this.getCurrentCompanyProductData
    // )
    // if (this.productDetails.id) {
    //   for (let index = 0; index < this.productDetails.medias.length; index++) {
    //     this.product_images.push(this.productDetails.medias[index].name)
    //   }
    //   this.isAllowMultipleImage = true
    // } else {
    //   this.isAllowMultipleImage = false
    // }
  },
  beforeDestroy() {
    this.saveEditCurrentProductData({})
    //this.$eventHub.$off('add-company')
    // this.$eventHub.$off('Cancel_Product_Form')
  }
}
</script>
<style>
.height-50 {
  height: 50px;
}
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
  object-fit: cover;
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
.upload-product-image {
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
.product-card {
  position: relative;
  width: 250px;
  height: 365px;
  border-radius: 8px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: var(--white);
  /* border: solid 1px #d1e2ea;
  background-color: #f4f8fa; */
  margin-bottom: 20px;
}
.product-title {
  font-size: 12px;
  font-weight: 600;
  color: #000;
  line-height: 15px;
  overflow: hidden;
}
.product-info {
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
  /*align-items: center; */
}
.product-btn {
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
.product-img {
  object-fit: cover;
  border-radius: 8px;
  height: 100%;
  width: 100%;
}
.product-img-preview {
  position: relative;
  background: var(--app-bg-top-gradient);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  margin-top: 26px;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
  /* border: 1px solid var(--app-primary-color); */
  width: 188px;
  height: 200px;
}
.product-img-preview .img-preview {
  object-fit: cover;
  height: 100%;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
}
.img-preview {
  position: relative;
}
.product-image-overlay {
  /* background-color: #0009; */
  border-bottom-left-radius: 9px;
  border-bottom-right-radius: 9px;
  bottom: 0;
  height: 50px;
  width: 188px;
  color: var(--app-primary-text-color);
  display: flex;
  /* justify-content: center;*/
  align-items: center;
}
.remove-product-img {
  position: absolute;
  /*  top: -15px; on change, change #fileInputButton margin-top:  background-color: var(--app-primary-color); 
   right: -15px; */
  color: #fff;

  font-weight: 500;
  font-size: 10px;
  width: 40px;
  height: 40px;
  padding: 3px;
  line-height: 1.2;
  border-radius: 50%;
  z-index: 2;
}
</style>
