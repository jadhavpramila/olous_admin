<template>
  <div>
    <!-- <div class="menu-div">
      <div
        @click="goToDashboard"
        class="menu-item"
        :class="{ active: $route.matched[0].path == dashboardRoute }"
      >
        <img
          v-if="$route.matched[0].path == dashboardRoute"
          src="../../assets/img/MenuIcons/Dashboard-AfterClick.svg"
          alt=""
        />
        <img v-else src="../../assets/img/MenuIcons/Dashboard.svg" alt="" />
        <span class="menu-name">Dashboard</span>
      </div>
    </div> -->
    <div
      class="menu-div"
      v-if="
        this.getter_userAccessPermission[
          this.access_permission.ANALYTICS_FULL_ACCESS
        ]
      "
    >
      <div
        @click="goToAnalytics"
        class="menu-item"
        :class="{ active: $route.matched[0].path == analytics }"
      >
        <img
          v-if="$route.matched[0].path == analytics"
          src="../../assets/img/MenuIcons/Analytics-AfterClick.svg"
          alt=""
        />
        <img v-else src="../../assets/img/MenuIcons/Analytics.svg" alt="" />
        <span class="menu-name">Dashboard</span>
      </div>
    </div>
    <!-- <div class="menu-div">
      <div
        @click="goToDashboard"
        class="menu-item"
        :class="{ active: $route.matched[0].path == dashboardRoute }"
      >
        <img
          v-if="$route.matched[0].path == dashboardRoute"
          src="../../assets/img/MenuIcons/Analytics-AfterClick.svg"
          alt=""
        />
        <img v-else src="../../assets/img/MenuIcons/Analytics.svg" alt="" />
        <span class="menu-name">Dashboard</span>
      </div>
    </div> -->

    <div
      class="menu-div"
      v-if="
        !userData.is_admin &&
        this.getter_userAccessPermission[
          this.access_permission.COMPANY_FULL_ACCESS
        ]
      "
    >
      <div
        @click="goToCompanyPage"
        class="menu-item"
        :class="{ active: $route.matched[0].path == companyRoute }"
      >
        <img
          v-if="$route.matched[0].path == companyRoute"
          src="../../assets/img/MenuIcons/Company-AfterClick.svg"
          alt=""
        />
        <img v-else src="../../assets/img/MenuIcons/Company.svg" alt="" />
        <span class="menu-name">Company</span>
      </div>
      <!-- <div
        class="company-sub-menu menu-name ml-0 mt-3"
        v-if="isCompanySubMenuVisibles()"
      >
        <div class="menu-div">
          <div class="main_menu">
            <span class="white-menu-dot"></span>
            <span class="main-menu-name">Business Webpage</span>

            <div class="sub-menu-div first_sub_menu">
              <div @click="goToRegistration" class="menu-item">
                <span class="comp-tab-status" style="">
                  <img
                    :src="
                      getRegistationTabStatusImage(company_tab.REGISTRATION)
                    "
                  />
                </span>
                <span class="sub-menu-name">Primary Details</span>
              </div>
              <hr />
            </div>

            <div class="sub-menu-div">
              <div @click="goToDescription" class="menu-item">
                <span class="comp-tab-status">
                  <img
                    :src="getRegistationTabStatusImage(company_tab.DESCRIPTION)"
                  />
                </span>
                <span class="sub-menu-name">Secondary Details</span>
              </div>
              <hr />
            </div>

            <div class="sub-menu-div">
              <div @click="goToProductView" class="menu-item">
                <span class="comp-tab-status">
                  <img
                    :src="
                      getRegistationTabStatusImage(
                        company_tab.SERVICEANDPRODUCT
                      )
                    "
                  />
                </span>
                <span class="sub-menu-name">Services / Products</span>
              </div>
              <hr />
            </div>

            <div class="sub-menu-div">
              <div @click="goToCatalogue" class="menu-item">
                <span class="comp-tab-status comp-tab-without-status" style="">
                  <img class="" src="../../assets/img/Active_complate.svg" />
                </span>
                <span class="sub-menu-name">Catalogue</span>
              </div>
            </div>

            <div class="sub-menu-div" v-if="false">
              <div
                @click="goToPublishCompanywebsite"
                class="menu-item"
                :class="{ active: $route.name == publishCompanyRoute }"
              >
                <span class="comp-tab-status comp-tab-without-status" style="">
                  <img class="" src="../../assets/img/Active_complate.svg" />
                </span>
                <span class="sub-menu-name">Make Website Live</span>
              </div>
              <hr />
            </div>
            <div class="sub-menu-div">
              <div @click="goToCompanyDetails" class="menu-item">
                <span class="comp-tab-status comp-tab-without-status" style="">
                  <img class="" src="../../assets/img/Active_complate.svg" />
                </span>
                <span class="sub-menu-name">Business Details</span>
              </div>
              <hr />
            </div>
            <div class="sub-menu-div">
              <div @click="goToTestimonialView" class="menu-item">
                <span class="comp-tab-status comp-tab-without-status" style="">
                  <img class="" src="../../assets/img/Active_complate.svg" />
                </span>
                <span class="sub-menu-name">Testimonials & media</span>
              </div>
              <hr />
            </div>
          </div>
        </div>
        <div class="menu-div" v-if="checkIsInIndia()">
          <div class="main_menu">
            <span class="white-menu-dot"></span>
            <span class="main-menu-name">Pre-Qualification</span>

            <div class="sub-menu-div first_sub_menu">
              <div @click="goToCompanyStructure" class="menu-item">
                <span class="comp-tab-status" style="">
                  <img
                    :src="
                      getRegistationTabStatusImage(
                        company_tab.COMPANY_STRUCTURE
                      )
                    "
                  />
                </span>
                <span class="sub-menu-name">Company Structure</span>
              </div>
              <hr />
            </div>

            <div class="sub-menu-div">
              <div @click="goToFinancialInfo" class="menu-item">
                <span class="comp-tab-status" style="">
                  <img
                    :src="
                      getRegistationTabStatusImage(company_tab.FINANCIAL_INFO)
                    "
                  />
                </span>
                <span class="sub-menu-name">Financial Info</span>
              </div>
              <hr />
            </div>

            <div class="sub-menu-div">
              <div @click="goToExperience" class="menu-item">
                <span class="comp-tab-status" style="">
                  <img
                    :src="getRegistationTabStatusImage(company_tab.EXPERIENCE)"
                  />
                </span>
                <span class="sub-menu-name">Experience</span>
              </div>
              <hr />
            </div>

            <div class="sub-menu-div">
              <div @click="goToResources" class="menu-item">
                <span class="comp-tab-status" style="">
                  <img
                    :src="getRegistationTabStatusImage(company_tab.RESOURCES)"
                  />
                </span>
                <span class="sub-menu-name">Resources</span>
              </div>
              <hr />
            </div>

            <div class="sub-menu-div">
              <div @click="goToCompliance" class="menu-item">
                <span class="comp-tab-status" style="">
                  <img
                    :src="getRegistationTabStatusImage(company_tab.COMPLIANCE)"
                  />
                </span>
                <span class="sub-menu-name">Compliance</span>
              </div>
              <hr />
            </div>

            <div class="sub-menu-div">
              <div @click="goToReferences" class="menu-item">
                <span class="comp-tab-status" style="">
                  <img
                    :src="getRegistationTabStatusImage(company_tab.REFERENCES)"
                  />
                </span>
                <span class="sub-menu-name">References</span>
              </div>
            </div>
          </div>
        </div>
        <div class="menu-div">
          <div class="main_menu">
            <span class="white-menu-dot"></span>
            <span class="main-menu-name">Pricing</span>

            <div class="sub-menu-div first_sub_menu">
              <div
                @click="goToCompanyPricing"
                class="menu-item"
                :class="{ active: $route.name == companyPricingRoutename }"
              >
                <span class="sub-menu-name"> Pricing</span>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
    <div
      class="menu-div"
      v-if="
        userData.is_admin &&
        this.getter_userAccessPermission[
          this.access_permission.COMPANY_FULL_ACCESS
        ]
      "
    >
      <div
        @click="goToCompanyListPage"
        class="menu-item"
        :class="{ active: $route.matched[0].path == companyListRoute }"
      >
        <img
          v-if="$route.matched[0].path == companyListRoute"
          src="../../assets/img/MenuIcons/Company-AfterClick.svg"
          alt=""
        />
        <img v-else src="../../assets/img/MenuIcons/Company.svg" alt="" />
        <span class="menu-name">Company</span>
      </div>
    </div>
    <div
      class="menu-div"
      v-if="
        this.getter_userAccessPermission[this.access_permission.JOB_FULL_ACCESS]
      "
    >
      <div
        @click="goToJobsListPage"
        class="menu-item"
        :class="{ active: $route.matched[0].path == jobRoute }"
      >
        <img
          v-if="$route.matched[0].path == jobRoute"
          src="../../assets/img/MenuIcons/Job-AfterClick.svg"
          alt=""
        />
        <img v-else src="../../assets/img/MenuIcons/Job.svg" alt="" />
        <span class="menu-name">Job</span>
      </div>
    </div>
    <div
      class="menu-div"
      v-if="
        this.getter_userAccessPermission[
          this.access_permission.LEAD_FULL_ACCESS
        ]
      "
    >
      <div
        @click="goToLeadsListPage"
        class="menu-item"
        :class="{ active: $route.matched[0].path == leadRoute }"
      >
        <img
          v-if="$route.matched[0].path == leadRoute"
          src="../../assets/img/MenuIcons/Lead-AfterClick.svg"
          alt=""
        />
        <img v-else src="../../assets/img/MenuIcons/Lead.svg" alt="" />
        <span class="menu-name">Enquiry</span>
      </div>
    </div>
    <div
      class="menu-div"
      v-if="
        this.getter_userAccessPermission[
          this.access_permission.JOB_FULL_ACCESS
        ] && !userData.is_admin
      "
    >
      <div
        @click="goToUploadResumePage"
        class="menu-item"
        :class="{ active: $route.matched[0].path == uploadResumeRoute }"
      >
        <img
          v-if="$route.matched[0].path == uploadResumeRoute"
          src="../../assets/img/MenuIcons/resume-small-icon-brown.svg"
          alt=""
        />
        <img
          v-else
          src="../../assets/img/MenuIcons/resume-small-icon-black.svg"
          alt=""
        />
        <span class="menu-name">Upload Resume</span>
      </div>
    </div>
    <div class="menu-div" v-if="false">
      <div
        @click="goToAssignTags"
        class="menu-item"
        :class="{ active: $route.matched[0].path == assignTagsRoute }"
      >
        <span class="menu-name">Assign Tags</span>
      </div>
    </div>
    <div
      class="menu-div"
      v-if="
        this.getter_userAccessPermission[
          this.access_permission.ARTICLES_FULL_ACCESS
        ]
      "
    >
      <div
        @click="goToNewsPage"
        class="menu-item"
        :class="{ active: $route.matched[0].path == newsRoute }"
      >
        <img
          v-if="$route.matched[0].path == newsRoute"
          src="../../assets/img/MenuIcons/Articles-AfterClick.svg"
          alt=""
        />
        <img v-else src="../../assets/img/MenuIcons/Articles.svg" alt="" />
        <span class="menu-name">Articles</span>
      </div>
    </div>
    <div
      class="menu-div"
      v-if="
        this.getter_userAccessPermission[
          this.access_permission.HEADLINES_FULL_ACCESS
        ]
      "
    >
      <div
        @click="goToHeadlinesPage"
        class="menu-item"
        :class="{ active: $route.matched[0].path == headlinesRoute }"
      >
        <img
          v-if="$route.matched[0].path == headlinesRoute"
          src="../../assets/img/MenuIcons/Headlines-AfterClick.svg"
          alt=""
        />
        <img v-else src="../../assets/img/MenuIcons/Headlines.svg" alt="" />
        <span class="menu-name">Headlines</span>
      </div>
    </div>
    <div class="menu-div" v-if="false">
      <div
        @click="goToMarketingPage"
        class="menu-item"
        :class="{ active: $route.matched[0].path == marketingRoute }"
      >
        <span class="menu-name">Marketing</span>
      </div>
    </div>
    <div
      class="menu-div"
      v-if="
        this.getter_userAccessPermission[
          this.access_permission.ENQUIRY_FULL_ACCESS
        ]
      "
    >
      <div
        @click="goToEnqueryPage"
        class="menu-item"
        :class="{ active: $route.matched[0].path == enquerygRoute }"
      >
        <img
          v-if="$route.matched[0].path == enquerygRoute"
          src="../../assets/img/MenuIcons/Enquiry-AfterClick.svg"
          alt=""
        />
        <img v-else src="../../assets/img/MenuIcons/Enquiry.svg" alt="" />
        <span class="menu-name">Direct Enquiry</span>
      </div>
    </div>
    <div
      class="menu-div"
      v-if="
        this.getter_userAccessPermission[
          this.access_permission.PRICING_FULL_ACCESS
        ]
      "
    >
      <div
        @click="goToPricingPage"
        class="menu-item"
        :class="{ active: $route.matched[0].path == pricingRoute }"
      >
        <img
          v-if="$route.matched[0].path == pricingRoute"
          src="../../assets/img/MenuIcons/Pricing-AfterClick.svg"
          alt=""
        />
        <img v-else src="../../assets/img/MenuIcons/Pricing.svg" alt="" />
        <span class="menu-name">Pricing</span>
      </div>
    </div>
    <div
      class="menu-div"
      v-if="
        this.getter_userAccessPermission[
          this.access_permission.EMPLOYEE_FULL_ACCESS
        ]
      "
    >
      <div
        @click="goToEmployeePage"
        class="menu-item"
        :class="{ active: $route.matched[0].path == employeeRoute }"
      >
        <img
          v-if="$route.matched[0].path == employeeRoute"
          src="../../assets/img/MenuIcons/Employee-AfterClick.svg"
          alt=""
        />
        <img v-else src="../../assets/img/MenuIcons/Employee.svg" alt="" />
        <span class="menu-name">Employee</span>
      </div>
    </div>
    <div
      class="menu-div"
      v-if="
        this.getter_userAccessPermission[
          this.access_permission.REPORT_FULL_ACCESS
        ]
      "
    >
      <div
        @click="goToSalesReportPage"
        class="menu-item"
        :class="{ active: $route.matched[0].path == reportRoute }"
      >
        <img
          v-if="$route.matched[0].path == reportRoute"
          src="../../assets/img/MenuIcons/Report-AfterClick.svg"
          alt=""
        />
        <img v-else src="../../assets/img/MenuIcons/Report.svg" alt="" />
        <span class="menu-name">Report</span>
      </div>

      <div v-if="$route.matched[0].path == reportRoute">
        <div class="menu-name">
          <div class="sub-menu-div first_sub_menu">
            <div @click="goToSalesReportPage" class="menu-item">
              <span class="sub-menu-name">Sales Report</span>
            </div>
            <hr />
          </div>
        </div>

        <div class="menu-name">
          <div class="sub-menu-div">
            <div @click="goToPaymentReportPage" class="menu-item">
              <span class="sub-menu-name">Payment Report</span>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </div>
    <div class="menu-div" v-if="false">
      <div
        @click="goToAdsList"
        class="menu-item"
        :class="{ active: $route.matched[0].path == adsRoute }"
      >
        <span class="menu-name">Ads</span>
      </div>
    </div>
    <!-- <div class="menu-div">
      <div @click="logoutUser" class="menu-item">
        <img
          v-if="$route.matched[0].path == dashboardRoute"
          src="../../assets/img/MenuIcons/Logout-AfterClick.svg"
          alt=""
        />
        <img v-else src="../../assets/img/MenuIcons/Logout.svg" alt="" />
        <span class="menu-name">Log Out</span>
      </div>
    </div> -->
  </div>
</template>

<script>
import appConstants from '../../appConstants.js'
import { mapGetters, mapActions } from 'vuex'
const active_complete = require('../../assets/img/Active_complate.svg')
const active_incomplete = require('../../assets/img/Active_Incomplete.svg')
const inactive_complete = require('../../assets/img/Inactive_complete.svg')
const inactive_incomplete = require('../../assets/img/Inactive_incomplate.svg')

export default {
  name: 'Menu',
  data() {
    return {
      dashboardRoute: `/${appConstants.routes.DASHBOARD}`,
      assignTagsRoute: `/${appConstants.routes.ASSIGN_TAGS}`,
      companyRoute: `/${appConstants.routes.COMPANY}`,
      companyListRoute: `/${appConstants.routes.COMPANYLIST}`,
      jobRoute: `/${appConstants.routes.JOB}`,
      leadRoute: `/${appConstants.routes.LEAD}`,
      newsRoute: `/${appConstants.routes.NEWS}`,
      headlinesRoute: `/${appConstants.routes.HEADLINES}`,
      marketingRoute: `/${appConstants.routes.MARKETING}`,
      enquerygRoute: `/${appConstants.routes.ENQUERY}`,
      pricingRoute: `/${appConstants.routes.PRICINGLIST}`,
      reportRoute: `/${appConstants.routes.REPORT}`,

      analytics: `/${appConstants.routes.ANALYTICS}`,

      employeeRoute: `/${appConstants.routes.EMPLOYEE}`,

      adsRoute: `/${appConstants.routes.ADS}`,

      registrationRoutename: appConstants.routes.REGISTRATION,
      descriptionRoutename: appConstants.routes.DESCRIPTION,
      productViewRoutename: appConstants.routes.PRODUCT_VIEW,
      testimonialViewRoutename: appConstants.routes.TESTIMONIALANDMEDIA,
      catalogueRoutename: appConstants.routes.CATALOGUE,
      companyPricingRoutename: appConstants.routes.COMPANY_PRICING,
      CompanyStructureRoute: appConstants.routes.COMPANY_STRUCTURE,
      FInancialInfoRoute: appConstants.routes.FINANCIAL_INFO,
      experienceRoute: appConstants.routes.EXPERIENCE,
      resourcesRoute: appConstants.routes.RESOURCES,
      complianceRoute: appConstants.routes.COMPLIANCE,
      referencesRoute: appConstants.routes.REFERENCES,

      publishCompanyRoute: appConstants.routes.PUBLISH_WEBSITE,
      companyDetailsRoute: appConstants.routes.COMPANY_DETAILS,
      company_tab: appConstants.companyTabs,

      salesReportRouteName: appConstants.routes.SALES_REPORT,
      PaymentReportRouteName: appConstants.routes.PAYMENT_REPORT,
      companyRouteName: appConstants.routes.COMPANY,

      enum_country_iso: appConstants.country_iso,
      access_permission: appConstants.employee_access_permission,
      uploadResumeRoute: `/${appConstants.display_routes.RESUME}`
    }
  },
  computed: {
    ...mapGetters('companyData', [
      'getCurrentCompanyData',
      'getCompanyTabStatus'
    ]),
    ...mapGetters('registration', ['getRegistrationData']),
    ...mapGetters(['getter_userAccessPermission', 'userData'])
  },
  methods: {
    ...mapActions(['logout']),
    logoutUser: function () {
      this.logout().then(() => {
        this.$router.go(appConstants.routes.LOGIN)
      })
    },
    checkIsInIndia() {
      // console.log(this.getRegistrationData.country_iso)
      if (
        this.getRegistrationData.country_iso === this.enum_country_iso.INDIA
      ) {
        return true
      } else {
        return false
      }
    },
    goToAnalytics() {
      // if (this.$route.name == this.registrationRoutename) {
      //   console.log(this.$route.name)
      // }
      if (this.$route.name != appConstants.routes.ANALYTICS) {
        this.$router.push({ name: appConstants.routes.ANALYTICS })
      }
    },
    goToDashboard() {
      if (this.$route.name == this.registrationRoutename) {
        console.log(this.$route.name)
      }
      if (this.$route.name != appConstants.routes.DASHBOARD) {
        this.$router.push({ name: appConstants.routes.DASHBOARD })
      }
    },
    goToAssignTags() {
      if (this.$route.name != appConstants.routes.ASSIGN_TAGS) {
        this.$router.push({ name: appConstants.routes.ASSIGN_TAGS })
      }
    },
    goToCompanyPage() {
      if (this.$route.name != appConstants.routes.COMPANY) {
        this.$router.push({ name: appConstants.routes.COMPANY })
      }
    },
    goToCompanyListPage() {
      if (this.$route.name != appConstants.routes.COMPANYLIST) {
        this.$router.push({ name: appConstants.routes.COMPANYLIST })
      }
    },
    goToJobsListPage() {
      if (this.$route.name != appConstants.routes.JOB) {
        this.$router.push({ name: appConstants.routes.JOB })
      }
    },
    goToUploadResumePage() {
      if (this.$route.name != appConstants.routes.UPLOAD_RESUME) {
        this.$router.push({ name: appConstants.routes.UPLOAD_RESUME })
      }
    },
    goToLeadsListPage() {
      if (this.$route.name != appConstants.routes.LEAD) {
        this.$router.push({ name: appConstants.routes.LEAD })
      }
    },
    goToNewsPage() {
      if (this.$route.name != appConstants.routes.NEWS) {
        this.$router.push({ name: appConstants.routes.NEWS })
      }
    },
    goToHeadlinesPage() {
      if (this.$route.name != appConstants.routes.HEADLINES) {
        this.$router.push({ name: appConstants.routes.HEADLINES })
      }
    },
    goToMarketingPage() {
      if (this.$route.name != appConstants.routes.MARKETING) {
        this.$router.push({ name: appConstants.routes.MARKETING })
      }
    },
    goToRegistration() {
      if (this.$route.name != appConstants.routes.REGISTRATION) {
        this.$router.push({ name: appConstants.routes.REGISTRATION })
      }
    },
    goToDescription() {
      if (this.$route.name != appConstants.routes.DESCRIPTION) {
        this.$router.push({ name: appConstants.routes.DESCRIPTION })
      }
    },
    goToProductView() {
      if (this.$route.name != appConstants.routes.PRODUCT_VIEW) {
        this.$router.push({ name: appConstants.routes.PRODUCT_VIEW })
      }
    },
    goToTestimonialView() {
      if (this.$route.name != appConstants.routes.TESTIMONIALANDMEDIA) {
        this.$router.push({ name: appConstants.routes.TESTIMONIALANDMEDIA })
      }
    },
    goToCatalogue() {
      if (this.$route.name != appConstants.routes.CATALOGUE) {
        this.$router.push({ name: appConstants.routes.CATALOGUE })
      }
    },
    goToPublishCompanywebsite() {
      if (this.$route.name != appConstants.routes.PUBLISH_WEBSITE) {
        this.$router.push({ name: appConstants.routes.PUBLISH_WEBSITE })
      }
    },
    goToCompanyDetails() {
      if (this.$route.name != appConstants.routes.COMPANY_DETAILS) {
        this.$router.push({ name: appConstants.routes.COMPANY_DETAILS })
      }
    },
    goToCompanyStructure() {
      if (this.$route.name != appConstants.routes.COMPANY_STRUCTURE) {
        this.$router.push({ name: appConstants.routes.COMPANY_STRUCTURE })
      }
    },
    goToFinancialInfo() {
      if (this.$route.name != appConstants.routes.FINANCIAL_INFO) {
        this.$router.push({ name: appConstants.routes.FINANCIAL_INFO })
      }
    },
    goToExperience() {
      if (this.$route.name != appConstants.routes.EXPERIENCE) {
        this.$router.push({ name: appConstants.routes.EXPERIENCE })
      }
    },
    goToResources() {
      if (this.$route.name != appConstants.routes.RESOURCES) {
        this.$router.push({ name: appConstants.routes.RESOURCES })
      }
    },
    goToCompliance() {
      if (this.$route.name != appConstants.routes.COMPLIANCE) {
        this.$router.push({ name: appConstants.routes.COMPLIANCE })
      }
    },
    goToReferences() {
      if (this.$route.name != appConstants.routes.REFERENCES) {
        this.$router.push({ name: appConstants.routes.REFERENCES })
      }
    },
    goToEnqueryPage() {
      if (this.$route.name != appConstants.routes.ENQUERY) {
        this.$router.push({ name: appConstants.routes.ENQUERY })
      }
    },
    goToPricingPage() {
      if (this.$route.name != appConstants.routes.PRICINGLIST) {
        this.$router.push({ name: appConstants.routes.PRICINGLIST })
      }
    },
    goToEmployeePage() {
      if (this.$route.name != appConstants.routes.EMPLOYEE) {
        this.$router.push({ name: appConstants.routes.EMPLOYEE })
      }
    },
    goToCompanyPricing() {
      if (this.$route.name != appConstants.routes.COMPANY_PRICING) {
        this.$router.push({ name: appConstants.routes.COMPANY_PRICING })
      }
    },
    goToSalesReportPage() {
      if (this.$route.name != appConstants.routes.SALES_REPORT) {
        this.$router.push({ name: appConstants.routes.SALES_REPORT })
      }
    },
    goToPaymentReportPage() {
      if (this.$route.name != appConstants.routes.PAYMENT_REPORT) {
        this.$router.push({ name: appConstants.routes.PAYMENT_REPORT })
      }
    },
    goToAdsList() {
      if (this.$route.name != appConstants.routes.ADS) {
        this.$router.push({ name: appConstants.routes.ADS })
      }
    },

    isCompanySubMenuVisibles() {
      if (this.userData.is_admin) {
        if (
          !(
            this.$route.matched[0].path == this.companyRoute &&
            this.$route.name != this.companyRouteName
          ) ||
          this.getCurrentCompanyData == ''
        ) {
          return false
        } else {
          return true
        }
      } else {
        false
      }
    },
    getRegistationTabStatusImage(tabIndex) {
      //FirstCheck is active tab & get tab status
      var is_active_tab = false
      var tab_status = false

      switch (tabIndex) {
        case appConstants.companyTabs.REGISTRATION:
          is_active_tab = this.$route.name == appConstants.routes.REGISTRATION

          break
        case appConstants.companyTabs.DESCRIPTION:
          is_active_tab = this.$route.name == appConstants.routes.DESCRIPTION
          break
        case appConstants.companyTabs.SERVICEANDPRODUCT:
          is_active_tab = this.$route.name == appConstants.routes.PRODUCT_VIEW
          break
        case appConstants.companyTabs.TESTIMONIALANDMEDIA:
          is_active_tab =
            this.$route.name == appConstants.routes.TESTIMONIALANDMEDIA
          break
        case appConstants.companyTabs.CATALOGUE:
          is_active_tab = this.$route.name == appConstants.routes.CATALOGUE
          break
        case appConstants.companyTabs.COMPANY_STRUCTURE:
          is_active_tab =
            this.$route.name == appConstants.routes.COMPANY_STRUCTURE
          break
        case appConstants.companyTabs.FINANCIAL_INFO:
          is_active_tab = this.$route.name == appConstants.routes.FINANCIAL_INFO
          break
        case appConstants.companyTabs.EXPERIENCE:
          is_active_tab = this.$route.name == appConstants.routes.EXPERIENCE
          break
        case appConstants.companyTabs.RESOURCES:
          is_active_tab = this.$route.name == appConstants.routes.RESOURCES
          break
        case appConstants.companyTabs.COMPLIANCE:
          is_active_tab = this.$route.name == appConstants.routes.COMPLIANCE
          break
        case appConstants.companyTabs.REFERENCES:
          is_active_tab = this.$route.name == appConstants.routes.REFERENCES
          break
        default:
          is_active_tab = false
      }

      tab_status = this.getCompanyTabStatus(tabIndex)

      if (is_active_tab) {
        //Active tab
        if (tab_status) {
          return active_complete
        } else {
          return active_incomplete
        }
      } else {
        //Inactive tab
        if (tab_status) {
          return inactive_complete
        } else {
          return inactive_incomplete
        }
      }
    }
  },
  created() {}
}
</script>

<style scoped>
h1 {
  font-size: 40px;
}
.form-inputs p.description {
  font-size: 16px;
  font-weight: 500;
}
.form-inputs {
  max-width: 500px;
  margin: 0px 0px 0px 0px !important;
}
.menu-item {
  cursor: pointer;
  color: #000;
  color: #000;
  height: 25px;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 6px;
}
.menu-div {
  margin-bottom: 18px;
  width: 100%;
}

.comp-tab-status {
  margin-right: 6px;
}

.comp-tab-without-status img {
  visibility: hidden;
}
</style>
