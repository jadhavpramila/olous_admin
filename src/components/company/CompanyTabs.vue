<template>
  <div>
    <div v-if="allCompanies.length == 0 && !userData.is_admin">
      <createCompany></createCompany>
    </div>
    <div
      v-else-if="allCompanies.length > 0 && isShow"
      class="form-conatiner cls-companytabs mb-4"
    >
      <div class="company-container">
        <div class="d-flex justify-content-between w-100">
          <ul
            class="d-flex pl-0 mb-0 align-items-center justify-content-between w-100"
            style="list-style: none"
          >
            <!-- <li class="cursor-pointer">
              <span
                class="company-tab"
                @click="clickPreview"
                :class="{
                  'company-tab-active': getCurrentCompanyTabListValue.isPreview
                }"
              >
                Preview
              </span>
            </li> -->
            <li class="cursor-pointer">
              <span
                class="company-tab"
                @click="clickDetails"
                :class="{
                  'company-tab-active': getCurrentCompanyTabListValue.isDetails,
                }"
              >
                Details
              </span>
            </li>
            <li class="cursor-pointer">
              <span
                class="company-tab"
                @click="clickContact"
                :class="{
                  'company-tab-active': getCurrentCompanyTabListValue.isContact,
                }"
              >
                Contact
              </span>
            </li>
            <li class="cursor-pointer">
              <span
                class="company-tab"
                @click="clickProduct"
                :class="{
                  'company-tab-active': getCurrentCompanyTabListValue.isProduct,
                }"
              >
                Product
              </span>
            </li>
            <li class="cursor-pointer">
              <span
                class="company-tab"
                @click="clickServices"
                :class="{
                  'company-tab-active': getCurrentCompanyTabListValue.isServices,
                }"
              >
                Services
              </span>
            </li>
            <li class="cursor-pointer">
              <span
                class="company-tab"
                @click="clickCatalogue"
                :class="{
                  'company-tab-active': getCurrentCompanyTabListValue.isCatalogue,
                }"
              >
                Catalogue
              </span>
            </li>
            <li class="cursor-pointer">
              <span
                class="company-tab"
                @click="clickMedia"
                :class="{
                  'company-tab-active': getCurrentCompanyTabListValue.isMedia,
                }"
              >
                Media
              </span>
            </li>
          </ul>
        </div>
        <div class="company-container-body py-3">
          <CompanyDetails
            v-if="
              getCurrentCompanyTabListValue.isDetails && getSingleCompanyPreviewDetails
            "
          ></CompanyDetails>
          <ProductDetails v-if="getCurrentCompanyTabListValue.isProduct"></ProductDetails>
          <ServiceDetails
            v-if="getCurrentCompanyTabListValue.isServices"
          ></ServiceDetails>
          <CompanyMedia
            :companyData="getSingleCompanyPreviewDetails"
            v-if="getCurrentCompanyTabListValue.isMedia"
          ></CompanyMedia>
          <CompanyCatalouge
            :companyData="getSingleCompanyPreviewDetails"
            v-if="getCurrentCompanyTabListValue.isCatalogue"
          ></CompanyCatalouge>
          <CompanyContacts
            :companyData="getSingleCompanyPreviewDetails"
            v-if="getCurrentCompanyTabListValue.isContact"
          ></CompanyContacts>
        </div>
      </div>
    </div>
    <!-- <div v-else-if="userData.is_admin">
      <CompanyList></CompanyList>
    </div> -->
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import CompanyDetails from "./CompanyDetailsNew.vue";
import ProductDetails from "./ProductDetails.vue";
import CompanyMedia from "./CompanyMedia.vue";
import CompanyCatalouge from "./CompanyCatalouge.vue";
import CompanyContacts from "./CompanyContacts.vue";
import createCompany from "../CreateCompany/createCompany.vue";
import ServiceDetails from "./ServiceDetails.vue";
//import CompanyList from './CompanyList.vue'
export default {
  name: "CompanyTabs",
  components: {
    CompanyDetails,
    ProductDetails,
    CompanyMedia,
    CompanyCatalouge,
    CompanyContacts,
    createCompany,
    ServiceDetails,
    // CompanyList
  },
  data() {
    return {
      isPreview: false,
      isDetails: true,
      isProduct: false,
      isServices: false,
      isCatalogue: false,
      isMedia: false,
      isContact: false,
      isShow: false,
    };
  },
  computed: {
    ...mapGetters([
      "getCurrentCompanyTabListValue",
      "getSingleCompanyPreviewDetails",
      "allCompanies",
      "userData",
      "getCurrentCompanyId",
    ]),
  },
  methods: {
    ...mapActions([
      "saveCurrentCompanyTabListValue",
      "fetchSingleCompanyPreviewDetails",
      "saveCurrentCompanyId",
    ]),
    ...mapActions(["fetchCompanies", "searchCompany"]),
    ...mapMutations(["setSingleCompanyPreviewDetails"]),
    setCurrentCompanyTabList() {
      if (this.getCurrentCompanyTabListValue) {
        this.isPreview = this.getCurrentCompanyTabListValue.isPreview;
        this.isDetails = this.getCurrentCompanyTabListValue.isDetails;
        this.isProduct = this.getCurrentCompanyTabListValue.isProduct;
        this.isServices = this.getCurrentCompanyTabListValue.isServices;
        this.isCatalogue = this.getCurrentCompanyTabListValue.isCatalogue;
        this.isMedia = this.getCurrentCompanyTabListValue.isMedia;
        this.isContact = this.getCurrentCompanyTabListValue.isContact;
        let data = {
          isPreview: this.isPreview,
          isDetails: this.isDetails,
          isProduct: this.isProduct,
          isServices: this.isServices,
          isCatalogue: this.isCatalogue,
          isMedia: this.isMedia,
          isContact: this.isContact,
        };
        // console.log('button', data)
        this.saveCurrentCompanyTabListValue(data);
      } else {
        let data = {
          isPreview: this.isPreview,
          isDetails: this.isDetails,
          isProduct: this.isProduct,
          isServices: this.isServices,
          isCatalogue: this.isCatalogue,
          isMedia: this.isMedia,
          isContact: this.isContact,
        };
        // console.log('button', data)
        this.saveCurrentCompanyTabListValue(data);
      }
    },
    clickPreview() {
      this.getCurrentCompanyTabListValue.isPreview = true;
      this.getCurrentCompanyTabListValue.isDetails = false;
      this.getCurrentCompanyTabListValue.isProduct = false;
      this.getCurrentCompanyTabListValue.isServices = false;
      this.getCurrentCompanyTabListValue.isCatalogue = false;
      this.getCurrentCompanyTabListValue.isMedia = false;
      this.getCurrentCompanyTabListValue.isContact = false;
    },
    clickDetails() {
      this.getCurrentCompanyTabListValue.isPreview = false;
      this.getCurrentCompanyTabListValue.isDetails = true;
      this.getCurrentCompanyTabListValue.isProduct = false;
      this.getCurrentCompanyTabListValue.isServices = false;
      this.getCurrentCompanyTabListValue.isCatalogue = false;
      this.getCurrentCompanyTabListValue.isMedia = false;
      this.getCurrentCompanyTabListValue.isContact = false;
    },
    clickProduct() {
      this.getCurrentCompanyTabListValue.isPreview = false;
      this.getCurrentCompanyTabListValue.isDetails = false;
      this.getCurrentCompanyTabListValue.isProduct = true;
      this.getCurrentCompanyTabListValue.isServices = false;
      this.getCurrentCompanyTabListValue.isCatalogue = false;
      this.getCurrentCompanyTabListValue.isMedia = false;
      this.getCurrentCompanyTabListValue.isContact = false;
    },
    clickServices() {
      this.getCurrentCompanyTabListValue.isPreview = false;
      this.getCurrentCompanyTabListValue.isDetails = false;
      this.getCurrentCompanyTabListValue.isProduct = false;
      this.getCurrentCompanyTabListValue.isServices = true;
      this.getCurrentCompanyTabListValue.isCatalogue = false;
      this.getCurrentCompanyTabListValue.isMedia = false;
      this.getCurrentCompanyTabListValue.isContact = false;
    },
    clickCatalogue() {
      this.getCurrentCompanyTabListValue.isPreview = false;
      this.getCurrentCompanyTabListValue.isDetails = false;
      this.getCurrentCompanyTabListValue.isProduct = false;
      this.getCurrentCompanyTabListValue.isServices = false;
      this.getCurrentCompanyTabListValue.isCatalogue = true;
      this.getCurrentCompanyTabListValue.isMedia = false;
      this.getCurrentCompanyTabListValue.isContact = false;
    },
    clickMedia() {
      this.getCurrentCompanyTabListValue.isPreview = false;
      this.getCurrentCompanyTabListValue.isDetails = false;
      this.getCurrentCompanyTabListValue.isProduct = false;
      this.getCurrentCompanyTabListValue.isServices = false;
      this.getCurrentCompanyTabListValue.isCatalogue = false;
      this.getCurrentCompanyTabListValue.isMedia = true;
      this.getCurrentCompanyTabListValue.isContact = false;
    },
    clickContact() {
      this.getCurrentCompanyTabListValue.isPreview = false;
      this.getCurrentCompanyTabListValue.isDetails = false;
      this.getCurrentCompanyTabListValue.isProduct = false;
      this.getCurrentCompanyTabListValue.isServices = false;
      this.getCurrentCompanyTabListValue.isCatalogue = false;
      this.getCurrentCompanyTabListValue.isMedia = false;
      this.getCurrentCompanyTabListValue.isContact = true;
    },
    searchCompanyName(value) {
      //console.log('Searching for company: ' + value.searchText)
      this.searchCompany(value.searchText);
    },
  },
  async created() {
    this.setSingleCompanyPreviewDetails({});
    let company_id = "";
    if (this.userData.is_admin == undefined || this.userData.is_admin === false) {
      // if (this.allCompanies.length > 0) {
      //   company_id = this.allCompanies[0].id
      //   await this.fetchSingleCompanyPreviewDetails(company_id)
      //   this.isShow = true
      //   this.saveCurrentCompanyId(this.allCompanies[0].id)
      // }
      this.fetchCompanies().then(() => {
        //this.getsingleCompanyData()
        if (this.allCompanies.length > 0) {
          company_id = this.allCompanies[0].id;
          this.setSingleCompanyPreviewDetails(this.allCompanies[0]);
          this.isShow = true;
          this.saveCurrentCompanyId(this.allCompanies[0].id);
        }
      });
    } else {
      if (this.allCompanies.length > 0) {
        company_id = this.getCurrentCompanyId;
        await this.fetchSingleCompanyPreviewDetails(company_id).then(() => {
          this.isShow = true;
        });
        //this.saveCurrentCompanyId(this.allCompanies[2].id)
      }
      // else if (this.userData.company_data.length > 0) {
      //   company_id = this.userData.company_data[2].id
      //   await this.fetchSingleCompanyPreviewDetails(company_id)
      //   this.saveCurrentCompanyId(this.userData.company_data[2].id)
      // }
    }

    this.setCurrentCompanyTabList();
    this.$eventHub.$on("search-company", this.searchCompanyName);
  },
  beforeDestroy() {
    //this.$eventHub.$off('add-company')
    this.$eventHub.$off("search-company");
  },
};
</script>
<style>
.company-container {
  height: auto;
  /* box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px #d8d8d8; */
  background-color: #fff;
  border-radius: 8px;
}
.company-tabs {
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  border: solid 1px rgba(0, 0, 0, 0);
  /* background-color: #416c80;
  color: #fff; */
  padding: 4px 0px 4px 0px;
  /* margin-right: 12px; */
}
/* .company-tab {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--app-primary-color);
  height: 32px;
  width: 130px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  margin: 0px 5px 0px 5px; 
  font-family: 'Poppins Regular';
  color: #000;
}
.company-tab-active {
  background-color: var(--app-primary-color);
  border: 1px solid var(--app-primary-color);
  color: #fff;
   border-bottom: 2px solid #fff;
  border-right: none;
  border-top: none;
  border-left: none; 
  padding-bottom: 0px;
  font-family: 'Poppins Bold';
}
.company-tab-active:focus-visible {
  outline: none;
} */
/* .company-container-body {
  padding: 16px;
} */
/* .form-conatiner {
  margin-top: 77px !important;
} */
.nav-tabs {
  border: none !important;
}
.nav {
  background-color: #416c80;
  color: #fff;
}
/* .nav-item {
  color: #fff;
}
.nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
  color: #fff !important;
  background-color: #416c80 !important;
  border: none !important;
}
.nav-item a {
  color: #fff;
}
.nav-item:hover,
.nav-item:active,
.nav-item:focus,
a:hover,
a:active,
a:focus {
  color: #fff !important;
  border: none !important;
}
.nav-tabs .nav-item {
  margin-bottom: 0px !important;
}
.nav-tabs .nav-link {
  border: none;
}
.nav-tabs .nav-item .active {
  border: 2px solid #fff;
} */
</style>
