<template>
  <!-- <div class="navbar fixed-top text-right" v-if="isLoggedIn">
    <div id="navbarCollapse">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item" v-if="isLoggedIn">
          <span @click="logout" class="logout_text">Logout</span>
        </li>
      </ul>
    </div>
  </div> -->
  <div class="fixed-top" style="" v-if="isHeaderVisible()">
    <div class="d-flex flex-row main-header-row justify-content-between">
      <div class="d-flex align-items-center" v-if="userData.is_admin">
        <img
          src="../../assets/img/Olous.svg"
          class="logo-img company-logo-img"
          alt="Olous"
        />
        <span class="ml-2 logo-menu font-weight-600 fontSize18">Olous</span>
      </div>
      <div v-if="!userData.is_admin" class="align-items-center d-flex">
        <div v-if="allCompanies.length > 0">
          <img
            v-if="allCompanies[0].logo"
            :src="setCompanyLogo(allCompanies[0].logo)"
            class="logo-img company-logo-img"
            alt="company_logo"
          />
          <img
            v-else
            src="../../assets/img/Olous.svg"
            class="logo-img company-logo-img"
            alt="company_logo"
          />
          <span class="ml-2 logo-menu font-weight-600 fontSize16">{{
            allCompanies[0].name
          }}</span>
        </div>
        <div v-else>
          <img
            src="../../assets/img/Olous.svg"
            class="logo-img company-logo-img"
            alt="Olous"
          />
          <span class="ml-2 logo-menu font-weight-600 fontSize18">Olous</span>
        </div>
      </div>

      <!-- <div
        class="color-black font-weight-bold hdr-div-back"
        v-if="isBackButtonVisible()"
      >
        <i
          class="fa fa-chevron-left cursor-pointer"
          aria-hidden="true"
          title="Back"
          @click="backClick"
        ></i>
      </div> -->
      <!-- <div class="color-black font-weight-bold hdr-div-pagename">
        {{ setHeaderTitle() }}
      </div> -->
      <!-- <div class="color-black font-weight-bold hdr-div-pagename">
         <p class="manage-bottom">{{ setHeaderTitle() }}</p> 
        <label v-if="isCompanyMenus()" class="lowercase_text app-primary-text-color pl-0">
          <a
            v-if="isCompanyPublished()"
            :href="setUrl()"
            target="_blank"
            class="decoration-[#007bff]"
            style="color: #007bff"
          >
            {{ setUrl() }}</a
          >
        </label>
      </div>-->
      <div class="d-flex align-items-center">
        <!--<div class="" v-if="userData.is_admin">
          <div class="example d-flex align-items-center">
            <span>
              <img src="../../assets/img/admin-search.svg" alt="Search" />
            </span>
            <input
              type="text"
              placeholder="Search here.."
              name="search"
              v-on:keyup="isEnterClicked($event)"
              v-model="searchFor"
            />
          </div>
           <div
          class="text-right d-flex items-end hdr-search-div"
          v-if="isSearchVisible()"
        >
          <i
            class="fa fa-search fa-lg hdr-search cursor-pointer"
            @click="searchClick"
            :title="searchButtonTooltip()"
          ></i>
          <form
            @submit.prevent="searchClick"
            class="hdrtxt-search"
            style="width: 100%"
          >
            <input
              type="text"
              class="form-control input-lg hdrtxt-search"
              width="100px"
              style="min-height: 32px !important"
              v-model="searchFor"
            />
          </form>
        </div> 
        </div>-->
        <div
          class="text-right ml-4 align-items-center d-flex cursor-pointer logout"
          @click="logoutUser"
        >
          <img src="../../assets/img/admin-logout.svg" alt="logout" />
          <!-- <i
            class="fa fa-sign-out cursor-pointer"
            title="Logout"
            aria-hidden="true"
          ></i> -->
          <span class="ml-2 fontSize13 font-weight-300 app-primary-text-color"
            >Logout</span
          >
        </div>
      </div>

      <!-- <div
        style=""
        class="text-right hdr-div-add mr-3"
        v-if="isAddButtonVIsible()"
      >
        <i
          class="fa fa-plus-circle cursor-pointer"
          @click="addClick"
          :title="addButtonTooltip()"
          aria-hidden="true"
        ></i>
      </div> -->

      <div v-if="isCompanyMenus()" class="text-right hdr-div-logout">
        <!-- <div class="row mr-2 color-box" v-if="setStatus()">
          <div class="dot"></div>
          <div>{{ setStatus() }}</div>
        </div> -->
        <PublishUnpublish v-if="userData.is_admin"></PublishUnpublish>
      </div>
    </div>
    <!-- <hr class="mt-2 mb-0" /> -->
  </div>
</template>

<script>
import appConstants from '../../appConstants.js'
import { mapActions } from 'vuex'
import { isServiceBasedCompany } from '../../common/js/IsService.js'
import { mapGetters } from 'vuex'
import PublishUnpublish from '../company/PublishUnpublish'
import '../../assets/css/appcolor.css'

export default {
  name: 'Header',
  components: {
    PublishUnpublish
  },
  data() {
    return {
      searchFor: '',
      dashboardRoute: `/${appConstants.routes.DASHBOARD}`,
      companyRoute: `/${appConstants.routes.COMPANY}`
    }
  },
  computed: {
    ...mapGetters('companyData', ['getCurrentCompanyData']),
    ...mapGetters(['allCompanies', 'userData'])
  },
  watch: {
    // $route(to, from) {
    // },
  },
  methods: {
    ...mapActions(['logout']),
    logoutUser: function () {
      this.logout().then(() => {
        this.$router.go(appConstants.routes.LOGIN)
      })
    },
    setStatus() {
      let status = ''
      if (
        this.getCurrentCompanyData.status ==
        appConstants.company_status.PUBLISHED
      ) {
        status = 'Live'
      } else {
        status = ''
      }
      return status
    },
    addClick() {
      switch (this.$route.name) {
        case appConstants.routes.JOB:
          this.$router.push({ name: appConstants.routes.CREATE_JOB })
          break
        case appConstants.routes.LEAD:
          this.$router.push({ name: appConstants.routes.ADD_LEAD })
          break
        case appConstants.routes.NEWS:
          this.$router.push({ name: appConstants.routes.ADD_NEWS })
          break
        case appConstants.routes.PRICINGLIST:
          this.$router.push({ name: appConstants.routes.ADD_PRICING })
          break
        case appConstants.routes.ADS:
          this.$router.push({ name: appConstants.routes.CREATE_AD })
          break
        case appConstants.routes.HEADLINES:
          this.$router.push({ name: appConstants.routes.ADD_HEADLINE })
          break
        case appConstants.routes.EMPLOYEE:
          this.$router.push({ name: appConstants.routes.ADDEMPLOYEE })
          break
      }
    },
    searchClick() {
      switch (this.$route.name) {
        case appConstants.routes.COMPANYLIST:
          this.emitSearchButtonEvent('search-company')
          break
        case appConstants.routes.JOB:
          this.emitSearchButtonEvent('search-job')
          break
        case appConstants.routes.NEWS:
          this.emitSearchButtonEvent('search-news')
          break
        case appConstants.routes.ADS:
          this.emitSearchButtonEvent('search-ads')
          break
      }
    },
    emitSearchButtonEvent(eventName) {
      this.$eventHub.$emit(eventName, { searchText: this.searchFor })
      this.searchFor = ''
    },
    isAddButtonVIsible() {
      if (
        this.$route.name == appConstants.routes.JOB ||
        this.$route.name == appConstants.routes.LEAD ||
        this.$route.name == appConstants.routes.NEWS ||
        this.$route.name == appConstants.routes.PRICINGLIST ||
        this.$route.name == appConstants.routes.ADS ||
        this.$route.name == appConstants.routes.HEADLINES ||
        this.$route.name == appConstants.routes.EMPLOYEE
      ) {
        return true
      } else {
        return false
      }
    },
    isHeaderVisible() {
      if (
        this.$route.name == appConstants.routes.JOB ||
        this.$route.name == appConstants.routes.JOBDETAILS ||
        this.$route.name == appConstants.routes.CREATE_JOB ||
        this.$route.name == appConstants.routes.UPDATE_JOB
      ) {
        return true
      } else {
        return true
      }
    },
    addButtonTooltip() {
      switch (this.$route.name) {
        case appConstants.routes.JOB:
          return 'Add job'
        case appConstants.routes.LEAD:
          return 'Add Lead'
        case appConstants.routes.NEWS:
          return 'Add news'
        case appConstants.routes.PRICINGLIST:
          return 'Add pricing plan'
        case appConstants.routes.ADS:
          return 'Add Ad'
        case appConstants.routes.HEADLINES:
          return 'Add Headline'
        case appConstants.routes.EMPLOYEE:
          return 'Add Employee'
        default:
          return ''
      }
    },
    isLogoutButtonVisible() {
      // return true
      switch (this.$route.name) {
        case appConstants.routes.REGISTRATION:
          return false
        case appConstants.routes.DESCRIPTION:
          return false
        case appConstants.routes.PRODUCT_VIEW:
          return false
        case appConstants.routes.CATALOGUE:
          return false
        case appConstants.routes.PUBLISH_WEBSITE:
          return false
        case appConstants.routes.COMPANY_DETAILS:
          return false
        case appConstants.routes.COMPANY_STRUCTURE:
          return false
        case appConstants.routes.FINANCIAL_INFO:
          return false
        case appConstants.routes.EXPERIENCE:
          return false
        case appConstants.routes.RESOURCES:
          return false
        case appConstants.routes.COMPLIANCE:
          return false
        case appConstants.routes.REFERENCES:
          return false
        case appConstants.routes.TESTIMONIALANDMEDIA:
          return false
        case appConstants.routes.EMPLOYEE:
          return true
        default:
          return true
      }
    },
    isSearchVisible() {
      if (this.userData.is_admin) {
        if (
          this.$route.name == appConstants.routes.COMPANY ||
          this.$route.name == appConstants.routes.JOB ||
          this.$route.name == appConstants.routes.NEWS ||
          this.$route.name == appConstants.routes.ADS
        ) {
          return true
        } else {
          return true
        }
      } else {
        return false
      }
    },
    searchButtonTooltip() {
      switch (this.$route.name) {
        case appConstants.routes.COMPANY:
          return 'search Companies'
        case appConstants.routes.JOB:
          return 'search job'
        case appConstants.routes.NEWS:
          return 'search news'
        case appConstants.routes.ADS:
          return 'search ads'
        default:
          return ''
      }
    },
    setUrl() {
      return `${appConstants.PORTFOLIO_URL}${this.getCurrentCompanyData.slug}`
    },
    isCompanyPublished() {
      if (
        this.getCurrentCompanyData.status ===
        appConstants.company_status.PUBLISHED
      ) {
        return true
      } else {
        return false
      }
    },
    isCompanyMenus() {
      switch (this.$route.name) {
        case appConstants.routes.REGISTRATION:
        case appConstants.routes.DESCRIPTION:
          return true
        case appConstants.routes.TESTIMONIALANDMEDIA:
          return true
        case appConstants.routes.PRODUCT_VIEW:
        case appConstants.routes.CATALOGUE:
        case appConstants.routes.PUBLISH_WEBSITE:
        case appConstants.routes.COMPANY_DETAILS:
        case appConstants.routes.COMPANY_STRUCTURE:
        case appConstants.routes.FINANCIAL_INFO:
        case appConstants.routes.EXPERIENCE:
        case appConstants.routes.RESOURCES:
        case appConstants.routes.COMPLIANCE:
        case appConstants.routes.REFERENCES:
          return true
        default:
          return false
      }
    },
    setHeaderTitle() {
      switch (this.$route.name) {
        case appConstants.routes.DASHBOARD:
          return ''
        case appConstants.routes.COMPANY:
          return ''
        case appConstants.routes.ASSIGN_TAGS:
          return 'Assign tags'
        case appConstants.routes.JOB:
          return 'Jobs List'
        case appConstants.routes.CREATE_JOB:
          return 'Add Job'
        case appConstants.routes.UPDATE_JOB:
          return 'Update Job'
        case appConstants.routes.LEAD:
          return 'Leads List'
        case appConstants.routes.UPDATE_LEAD:
        case appConstants.routes.ADD_LEAD:
          return 'Lead'
        case appConstants.routes.NEWS:
          return 'News List'
        case appConstants.routes.ADD_NEWS:
        case appConstants.routes.UPDATE_NEWS:
          return 'News'
        case appConstants.routes.MARKETING:
          return 'Marketing'
        case appConstants.routes.REGISTRATION:
          return this.getCurrentCompanyData.name
        case appConstants.routes.DESCRIPTION:
          return this.getCurrentCompanyData.name
        case appConstants.routes.CATALOGUE:
          return this.getCurrentCompanyData.name
        case appConstants.routes.PRODUCT_VIEW:
          return this.getCurrentCompanyData.name
        case appConstants.routes.ENQUERY:
          return 'Enquiries List'
        case appConstants.routes.ENQUERY_DETAILS:
          return 'Enquiry details'
        case appConstants.routes.PRICINGLIST:
          return 'Pricing Plans'
        case appConstants.routes.ADD_PRICING:
        case appConstants.routes.UPDATE_PRICING:
          return 'Pricing Plan Details'
        case appConstants.routes.COMPANY_PRICING:
          return this.getCurrentCompanyData.name
        case appConstants.routes.REPORT:
          return 'Report'
        case appConstants.routes.COMPANY_STRUCTURE:
          return this.getCurrentCompanyData.name
        case appConstants.routes.FINANCIAL_INFO:
          return this.getCurrentCompanyData.name
        case appConstants.routes.EXPERIENCE:
          return this.getCurrentCompanyData.name
        case appConstants.routes.RESOURCES:
          return this.getCurrentCompanyData.name
        case appConstants.routes.COMPLIANCE:
          return this.getCurrentCompanyData.name
        case appConstants.routes.REFERENCES:
          return this.getCurrentCompanyData.name
        case appConstants.routes.PUBLISH_WEBSITE:
          return this.getCurrentCompanyData.name
        case appConstants.routes.COMPANY_DETAILS:
          return this.getCurrentCompanyData.name
        case appConstants.routes.TESTIMONIALANDMEDIA:
          return this.getCurrentCompanyData.name
        case appConstants.routes.ADS:
          return 'Ads List'
        case appConstants.routes.CREATE_AD:
        case appConstants.routes.UPDATE_AD:
          return 'Ad Details'
        case appConstants.routes.HEADLINES:
          return 'Headlines List'
        case appConstants.routes.ADD_HEADLINE:
        case appConstants.routes.UPDATE_HEADLINE:
          return 'Headline'
        case appConstants.routes.EMPLOYEE:
          return 'Employee List'
        case appConstants.routes.ADDEMPLOYEE:
          return 'Employee'
        case appConstants.routes.ANALYTICS:
          return 'Analytics'
        default:
          return ''
      }
    },
    isBackButtonVisible() {
      switch (this.$route.name) {
        case appConstants.routes.EDIT_COMPANY:
        case appConstants.routes.UPDATE_LEAD:
        case appConstants.routes.ADD_LEAD:
        case appConstants.routes.ADD_NEWS:
        case appConstants.routes.UPDATE_NEWS:
        case appConstants.routes.ENQUERY_DETAILS:
        case appConstants.routes.ADD_PRICING:
        case appConstants.routes.UPDATE_PRICING:
        case appConstants.routes.CREATE_AD:
        case appConstants.routes.UPDATE_AD:
        case appConstants.routes.APPLICANTS:
        case appConstants.routes.ADDEMPLOYEE:
        case appConstants.routes.UPDATEEMPLOYEE:
          return true
        default:
          return false
      }
    },
    backClick() {
      switch (this.$route.name) {
        case appConstants.routes.EDIT_COMPANY:
          this.$router.push({ name: appConstants.routes.COMPANY })
          break
        case appConstants.routes.CREATE_JOB:
        case appConstants.routes.UPDATE_JOB:
          this.$router.push({ name: appConstants.routes.JOB })
          break
        case appConstants.routes.UPDATE_LEAD:
        case appConstants.routes.ADD_LEAD:
          this.$router.push({ name: appConstants.routes.LEAD })
          break
        case appConstants.routes.ADD_NEWS:
        case appConstants.routes.UPDATE_NEWS:
          this.$router.push({ name: appConstants.routes.NEWS })
          break
        case appConstants.routes.ENQUERY_DETAILS:
          this.$router.push({ name: appConstants.routes.ENQUERY })
          break
        case appConstants.routes.ADD_PRICING:
        case appConstants.routes.UPDATE_PRICING:
          this.$router.push({ name: appConstants.routes.PRICINGLIST })
          break
        case appConstants.routes.CREATE_AD:
        case appConstants.routes.UPDATE_AD:
          this.$router.push({ name: appConstants.routes.ADS })
          break
        case appConstants.routes.APPLICANTS:
          this.$router.push({ name: appConstants.routes.JOB })
          break
        case appConstants.routes.ADDEMPLOYEE:
          this.$router.push({ name: appConstants.routes.EMPLOYEE })
          break
        case appConstants.routes.UPDATEEMPLOYEE:
          this.$router.push({ name: appConstants.routes.EMPLOYEE })
          break
        default:
          return ''
      }
    },
    getProductViewHeader() {
      if (isServiceBasedCompany(this.getCurrentCompanyData.category)) {
        return 'Services'
      } else {
        return this.getCurrentCompanyData.name
      }
    },
    isEnterClicked(e) {
      if (e.keyCode === 13) {
        console.log('enter clicked')
        this.searchClick()
      }
    },
    setCompanyLogo(logo) {
      let image = `${process.env.VUE_APP_IMGURL}${logo}`
      return image
    }
  }
}
</script>

<style scoped>
.company-logo-img {
  width: 35px;
  height: 35px;
}
.main-header-row {
  margin-left: 30px;
  margin-right: 30px;
  /* padding-top: 10px;
  padding-bottom: 10px; */
}
/* Search Bar  */
.example {
  min-width: 400px;
  max-width: 400px;
}
.example input[type='text'] {
  padding-top: 1px;
  padding-left: 4px;
  padding-right: 4px;
  padding-bottom: 4px;
  border: 1px solid #416c80;
  float: left;
  /* width: 80%; font-size: 14px;  padding: 4px; color: white;*/
  background-color: #416c80 !important;
  background: #416c80 !important ;
  border-top-right-radius: 4px !important;
  border-bottom-right-radius: 4px !important;
  border-radius: 0px;
  height: 30px;
  width: 100%;
  color: #fff;
}
.example input[type='text']::placeholder {
  color: #fff;
  font-size: 12px !important;
  font-family: 'Poppins Light' !important;
}
.example input[type='text']:focus-visible {
  outline: none;
}
.example input[type='text']:focus {
  outline: none;
}
.example span {
  float: left;
  /* width: 20%;
  padding: 10px; */
  background: #416c80;
  background-color: #416c80;
  color: white;
  font-size: 14px;
  border: 1px solid #416c80;
  border-left: none;
  cursor: pointer;
  height: 30px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  padding-right: 2px;
  padding-left: 12px;
  display: flex;
  align-items: center;
}

/* form.example button:hover {
  background: #0b7dda;
} */

.example::after {
  content: '';
  clear: both;
  display: table;
}
.example .fa {
  color: #fff;
  font-weight: 100;
}
.logout {
  color: #fff;
}
.logout .fa {
  color: #fff;
}
.logout:hover .fa {
  color: var(--app-primary-color);
}
.logout:hover span {
  color: var(--app-primary-color);
}
/* .nav-item {
  padding: 2px;
  margin-left: 7px;
} */
span {
  cursor: pointer;
  text-decoration: none;
  background-color: transparent;
}
.manage-bottom {
  margin-bottom: -12px !important;
}
.dot {
  align-self: center;
  width: 15px;
  height: 15px;
  margin-right: 10px;
  border-radius: 50%;
  background: #ff0000;
}

.dot:after {
  content: '';
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #ff0000;
  display: block;
  animation: pulse 2s ease 0s infinite;
}

@keyframes pulse {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  80% {
    opacity: 0;
    transform: scale(2.5);
  }
  100% {
    opacity: 0;
    transform: scale(3);
  }
}

@keyframes pulse2 {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  30% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(2.5);
  }
}

@media only screen and (max-width: 768px) {
  .example {
    min-width: 200px;
    max-width: 200px;
  }
}
</style>
