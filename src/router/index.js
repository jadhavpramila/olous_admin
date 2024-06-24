import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const DefaultLayout = () => import('../components/layout/DefaultLayout.vue')
const LoginUserLayout = () => import('../components/layout/LoginUserLayout.vue')
const Login = () => import('../components/auth/Login.vue')
import appConstants from '../appConstants'
import Dashboard from '../components/dashboard/Dashboard.vue'
import AssignTags from '../components/AssignTags/AssignTags.vue'
import CompanyTabs from '../components/company/CompanyTabs.vue'
import CompanyList from '../components/company/CompanyList.vue'
import CreateJob from '../components/job/Createjob.vue'
import JobList from '../components/job/Joblist.vue'
import JobDetails from '../components/job/JobDetails.vue'
import LeadsList from '../components/lead/LeadsList.vue'
import LeadForm from '../components/lead/LeadForm.vue'
import LeadDetails from '../components/lead/LeadDetails.vue'
import NewsList from '../components/news/newsList.vue'
import NewsDetails from '../components/news/NewsDetails.vue'
import Marketing from '../components/marketing/Marketing.vue'
import Registration from '../components/pqq/stepOne/Registration.vue'
import Description from '../components/pqq/stepTwo/Description.vue'
import TestimonialAndMedia from '../components/pqq/stepTwo/TestimonialAndMedia.vue'
import ProductView from '../components/pqq/stepTwo/ProductView.vue'
import Catalogue from '../components/pqq/stepTwo/Catalogue.vue'
import EnquiryList from '../components/directEnquiry/EnquiryList.vue'
import EnquiryDetails from '../components/directEnquiry/EnquiryDetails.vue'
import PricingList from '../components/adminPricing/PricingList.vue'
import AddPricing from '../components/adminPricing/AddPricing.vue'
import CompanyPricing from '../components/companyPricing/CompanyPricing.vue'
import SalesReport from '../components/report/SalesReport.vue'
import CompanyStructure from '../components/pqq/stepThree/CompanyStructure.vue'
import FinancialInfo from '../components/pqq/stepThree/FinancialInfo.vue'
import Experience from '../components/pqq/stepThree/Experience.vue'
import Resources from '../components/pqq/stepThree/Resources.vue'
import Compliance from '../components/pqq/stepThree/Compliance.vue'
import References from '../components/pqq/stepThree/References.vue'
import PublishWebsite from '../components/pqq/stepTwo/PublishWebsite.vue'
import CompanyDetails from '../components/pqq/stepTwo/CompanyDetails.vue'
import AdsList from '../components/ads/AdsList.vue'
import CreateAds from '../components/ads/CreateAds.vue'
import PaymentReport from '../components/report/PaymentReport.vue'
import HeadlinesList from '../components/news/HeadlinesList.vue'
import HeadlineDetails from '../components/news/HeadlineDetails.vue'
import Applicants from '../components/job/ApplicantList.vue'
import Analytics from '../components/Analytics/Analytics.vue'
import store from '../store/index.js'
import Employee from '../components/employee/Employee.vue'
import AddEmployee from '../components/employee/AddEmployee.vue'
import SignUp from '../components/auth/Signup.vue'
import Terms from '../components/policy/Terms.vue'
import LeadSuggestions from '../components/lead/LeadSuggestions.vue'
import JobPricing from '../components/job/JobPricing/Pricing.vue'
import { readUserTokenCookie } from '../common/js/UserToken.js'
import UploadResume from '../components/uploadResume/uploadResume.vue'
const routes = [
  { path: '', redirect: `/${appConstants.routes.DASHBOARD}` },
  // {
  //   path: '',
  //   // eslint-disable-next-line no-unused-vars
  //   redirect: (to) => {
  //     // the function receives the target route as the argument
  //     // we return a redirect path/location here.
  //     if (store.getters['isAdmin']) {
  //       return {
  //         path: `/${appConstants.routes.ANALYTICS}`
  //       }
  //     } else {
  //       return {
  //         path: `/${appConstants.routes.COMPANY}`
  //       }
  //     }
  //   }
  // },
  {
    path: `/${appConstants.routes.DASHBOARD}`,
    component: LoginUserLayout,
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: '',
        name: appConstants.routes.DASHBOARD,
        component: Dashboard,
        meta: {
          requireAuth: true
        }
      }
    ]
  },
  {
    path: `/${appConstants.routes.COMPANYLIST}`,
    component: LoginUserLayout,
    meta: {
      requireAuth: true,
      permissionId: appConstants.employee_access_permission.COMPANY_FULL_ACCESS
    },
    children: [
      {
        path: '',
        name: appConstants.routes.COMPANYLIST,
        component: CompanyList,
        meta: {
          requireAuth: true,
          permissionId:
            appConstants.employee_access_permission.COMPANY_FULL_ACCESS
        }
      }
    ]
  },
  {
    path: `/${appConstants.routes.COMPANY}`,
    component: LoginUserLayout,
    meta: {
      requireAuth: true,
      permissionId: appConstants.employee_access_permission.COMPANY_FULL_ACCESS
    },
    children: [
      {
        path: '',
        name: appConstants.routes.COMPANY,
        component: CompanyTabs,
        meta: {
          requireAuth: true,
          permissionId:
            appConstants.employee_access_permission.COMPANY_FULL_ACCESS
        }
      },
      // {
      //   path: appConstants.routes.EDIT_COMPANY,
      //   name: appConstants.routes.EDIT_COMPANY,
      //   component: EditCompany,
      //   meta: {
      //     requireAuth: true
      //   }
      // },
      {
        path: appConstants.routes.REGISTRATION,
        name: appConstants.routes.REGISTRATION,
        component: Registration,
        meta: {
          requireAuth: true,
          permissionId:
            appConstants.employee_access_permission.COMPANY_FULL_ACCESS
        }
      },
      {
        path: appConstants.routes.DESCRIPTION,
        name: appConstants.routes.DESCRIPTION,
        component: Description,
        meta: {
          requireAuth: true,
          permissionId:
            appConstants.employee_access_permission.COMPANY_FULL_ACCESS
        }
      },
      // testimonial and media route
      {
        path: appConstants.routes.TESTIMONIALANDMEDIA,
        name: appConstants.routes.TESTIMONIALANDMEDIA,
        component: TestimonialAndMedia,
        meta: {
          requireAuth: true,
          permissionId:
            appConstants.employee_access_permission.COMPANY_FULL_ACCESS
        }
      },
      {
        path: appConstants.routes.COMPANY_STRUCTURE,
        name: appConstants.routes.COMPANY_STRUCTURE,
        component: CompanyStructure,
        meta: {
          requireAuth: true,
          permissionId:
            appConstants.employee_access_permission.COMPANY_FULL_ACCESS
        }
      },
      {
        path: appConstants.routes.FINANCIAL_INFO,
        name: appConstants.routes.FINANCIAL_INFO,
        component: FinancialInfo,
        meta: {
          requireAuth: true,
          permissionId:
            appConstants.employee_access_permission.COMPANY_FULL_ACCESS
        }
      },
      {
        path: appConstants.routes.EXPERIENCE,
        name: appConstants.routes.EXPERIENCE,
        component: Experience,
        meta: {
          requireAuth: true,
          permissionId:
            appConstants.employee_access_permission.COMPANY_FULL_ACCESS
        }
      },
      {
        path: appConstants.routes.RESOURCES,
        name: appConstants.routes.RESOURCES,
        component: Resources,
        meta: {
          requireAuth: true,
          permissionId:
            appConstants.employee_access_permission.COMPANY_FULL_ACCESS
        }
      },
      {
        path: appConstants.routes.COMPLIANCE,
        name: appConstants.routes.COMPLIANCE,
        component: Compliance,
        meta: {
          requireAuth: true,
          permissionId:
            appConstants.employee_access_permission.COMPANY_FULL_ACCESS
        }
      },
      {
        path: appConstants.routes.REFERENCES,
        name: appConstants.routes.REFERENCES,
        component: References,
        meta: {
          requireAuth: true,
          permissionId:
            appConstants.employee_access_permission.COMPANY_FULL_ACCESS
        }
      },
      {
        path: appConstants.routes.PRODUCT_VIEW,
        name: appConstants.routes.PRODUCT_VIEW,
        component: ProductView,
        meta: {
          requireAuth: true,
          permissionId:
            appConstants.employee_access_permission.COMPANY_FULL_ACCESS
        }
      },
      {
        path: appConstants.routes.CATALOGUE,
        name: appConstants.routes.CATALOGUE,
        component: Catalogue,
        meta: {
          requireAuth: true,
          permissionId:
            appConstants.employee_access_permission.COMPANY_FULL_ACCESS
        }
      },
      {
        path: appConstants.routes.COMPANY_PRICING,
        name: appConstants.routes.COMPANY_PRICING,
        component: CompanyPricing,
        meta: {
          requireAuth: true,
          permissionId:
            appConstants.employee_access_permission.COMPANY_FULL_ACCESS
        }
      },

      {
        path: appConstants.routes.PUBLISH_WEBSITE,
        name: appConstants.routes.PUBLISH_WEBSITE,
        component: PublishWebsite,
        meta: {
          requireAuth: true,
          permissionId:
            appConstants.employee_access_permission.COMPANY_FULL_ACCESS
        }
      },
      {
        path: appConstants.routes.COMPANY_DETAILS,
        name: appConstants.routes.COMPANY_DETAILS,
        component: CompanyDetails,
        meta: {
          requireAuth: true,
          permissionId:
            appConstants.employee_access_permission.COMPANY_FULL_ACCESS
        }
      }
    ]
  },
  {
    path: `/${appConstants.routes.JOB}`,
    component: LoginUserLayout,
    meta: {
      //requireAuth: true,
      permissionId: appConstants.employee_access_permission.JOB_FULL_ACCESS
    },
    children: [
      {
        path: '',
        name: appConstants.routes.JOB,
        component: JobList,
        meta: {
          requireAuth: true,
          permissionId: appConstants.employee_access_permission.JOB_FULL_ACCESS
        }
      },
      {
        path: appConstants.display_routes.JOB_PRICING,
        name: appConstants.routes.JOB_PRICING,
        component: JobPricing,
        meta: {
          requireAuth: true,
          permissionId: appConstants.employee_access_permission.JOB_FULL_ACCESS
        }
      },
      {
        path: appConstants.routes.CREATE_JOB,
        name: appConstants.routes.CREATE_JOB,
        component: CreateJob,
        meta: {
          requireAuth: true,
          permissionId: appConstants.employee_access_permission.JOB_FULL_ACCESS
        }
      },
      {
        path: appConstants.routes.UPDATE_JOB,
        name: appConstants.routes.UPDATE_JOB,
        component: CreateJob,
        meta: {
          requireAuth: true,
          permissionId: appConstants.employee_access_permission.JOB_FULL_ACCESS
        }
      },
      {
        path: `:job_id`,
        name: appConstants.routes.JOBDETAILS,
        component: JobDetails,
        meta: {
          requireAuth: true,
          permissionId: appConstants.employee_access_permission.JOB_FULL_ACCESS
        }
      },

      {
        path: `/${appConstants.routes.APPLICANTS}`,
        name: appConstants.routes.APPLICANTS,
        component: Applicants,
        meta: {
          requireAuth: true,
          permissionId: appConstants.employee_access_permission.JOB_FULL_ACCESS
        }
      }
    ]
  },
  {
    path: `/${appConstants.routes.LEAD}`,
    component: LoginUserLayout,
    meta: {
      //requireAuth: true,
      permissionId: appConstants.employee_access_permission.LEAD_FULL_ACCESS
    },
    children: [
      {
        path: '',
        name: appConstants.routes.LEAD,
        component: LeadsList,
        meta: {
          requireAuth: true,
          permissionId: appConstants.employee_access_permission.LEAD_FULL_ACCESS
        }
      },
      {
        path: appConstants.display_routes.ADD,
        name: appConstants.routes.ADD_LEAD,
        component: LeadForm,
        meta: {
          requireAuth: true,
          permissionId: appConstants.employee_access_permission.LEAD_FULL_ACCESS
        }
      },
      {
        path: `:lead_id`,
        name: appConstants.routes.UPDATE_LEAD,
        component: LeadForm,
        meta: {
          requireAuth: true,
          permissionId: appConstants.employee_access_permission.LEAD_FULL_ACCESS
        }
      },
      {
        path: `${appConstants.display_routes.APPLICANT}/:lead_id`,
        name: appConstants.routes.LEAD_APPLICANTS,
        component: LeadDetails,
        meta: {
          requireAuth: true,
          permissionId: appConstants.employee_access_permission.LEAD_FULL_ACCESS
        }
      },
      {
        path: `${appConstants.display_routes.SUGGESTION}/:lead_id`,
        name: appConstants.routes.LEAD_SUGGESTIONS,
        component: LeadSuggestions,
        meta: {
          requireAuth: true,
          permissionId: appConstants.employee_access_permission.LEAD_FULL_ACCESS
        }
      }
    ]
  },
  {
    path: `/${appConstants.routes.ASSIGN_TAGS}`,
    component: LoginUserLayout,
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: '',
        name: appConstants.routes.ASSIGN_TAGS,
        component: AssignTags,
        meta: {
          requireAuth: true
        }
      }
    ]
  },
  {
    path: `/${appConstants.routes.NEWS}`,
    component: LoginUserLayout,
    meta: {
      //requireAuth: true,
      permissionId: appConstants.employee_access_permission.ARTICLES_FULL_ACCESS
    },
    children: [
      {
        path: '',
        name: appConstants.routes.NEWS,
        component: NewsList,
        meta: {
          requireAuth: true,
          permissionId:
            appConstants.employee_access_permission.ARTICLES_FULL_ACCESS
        }
      },
      {
        path: appConstants.routes.ADD_NEWS,
        name: appConstants.routes.ADD_NEWS,
        component: NewsDetails,
        meta: {
          requireAuth: true,
          permissionId:
            appConstants.employee_access_permission.ARTICLES_FULL_ACCESS
        }
      },
      {
        path: appConstants.routes.UPDATE_NEWS,
        name: appConstants.routes.UPDATE_NEWS,
        component: NewsDetails,
        meta: {
          requireAuth: true,
          permissionId:
            appConstants.employee_access_permission.ARTICLES_FULL_ACCESS
        }
      }
    ]
  },
  {
    path: `/${appConstants.routes.HEADLINES}`,
    component: LoginUserLayout,
    meta: {
      //requireAuth: true,
      permissionId:
        appConstants.employee_access_permission.HEADLINES_FULL_ACCESS
    },
    children: [
      {
        path: '',
        name: appConstants.routes.HEADLINES,
        component: HeadlinesList,
        meta: {
          requireAuth: true,
          permissionId:
            appConstants.employee_access_permission.HEADLINES_FULL_ACCESS
        }
      },
      {
        path: appConstants.routes.ADD_HEADLINE,
        name: appConstants.routes.ADD_HEADLINE,
        component: HeadlineDetails,
        meta: {
          requireAuth: true,
          permissionId:
            appConstants.employee_access_permission.HEADLINES_FULL_ACCESS
        }
      },
      {
        path: appConstants.routes.UPDATE_HEADLINE,
        name: appConstants.routes.UPDATE_HEADLINE,
        component: HeadlineDetails,
        meta: {
          requireAuth: true,
          permissionId:
            appConstants.employee_access_permission.HEADLINES_FULL_ACCESS
        }
      }
    ]
  },
  {
    path: `/${appConstants.routes.MARKETING}`,
    component: LoginUserLayout,
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: '',
        name: appConstants.routes.MARKETING,
        component: Marketing,
        meta: {
          requireAuth: true
        }
      }
    ]
  },
  {
    path: `/${appConstants.routes.ENQUERY}`,
    component: LoginUserLayout,
    meta: {
      //requireAuth: true,
      permissionId: appConstants.employee_access_permission.ENQUIRY_FULL_ACCESS
    },
    children: [
      {
        path: '',
        name: appConstants.routes.ENQUERY,
        component: EnquiryList,
        meta: {
          requireAuth: true,
          permissionId:
            appConstants.employee_access_permission.ENQUIRY_FULL_ACCESS
        }
      },
      {
        path: `/${appConstants.routes.ENQUERY_DETAILS}`,
        name: appConstants.routes.ENQUERY_DETAILS,
        component: EnquiryDetails,
        meta: {
          requireAuth: true,
          permissionId:
            appConstants.employee_access_permission.ENQUIRY_FULL_ACCESS
        }
      }
    ]
  },
  {
    path: `/${appConstants.display_routes.RESUME}`,
    component: LoginUserLayout,
    meta: {
      //requireAuth: true,
      permissionId: appConstants.employee_access_permission.JOB_FULL_ACCESS
    },
    children: [
      {
        path: '',
        name: appConstants.routes.UPLOAD_RESUME_DASHBOARD,
        component: UploadResume,
        meta: {
          requireAuth: true,
          permissionId: appConstants.employee_access_permission.JOB_FULL_ACCESS
        }
      },
      {
        path: appConstants.display_routes.UPLOAD,
        name: appConstants.routes.UPLOAD_RESUME,
        component: UploadResume,
        meta: {
          requireAuth: true,
          permissionId: appConstants.employee_access_permission.JOB_FULL_ACCESS
        }
      }
    ]
  },
  {
    path: `/${appConstants.routes.PRICINGLIST}`,
    component: LoginUserLayout,
    meta: {
      //requireAuth: true,
      permissionId: appConstants.employee_access_permission.PRICING_FULL_ACCESS
    },
    children: [
      {
        path: '',
        name: appConstants.routes.PRICINGLIST,
        component: PricingList,
        meta: {
          requireAuth: true,
          permissionId:
            appConstants.employee_access_permission.PRICING_FULL_ACCESS
        }
      },
      {
        path: appConstants.routes.ADD_PRICING,
        name: appConstants.routes.ADD_PRICING,
        component: AddPricing,
        meta: {
          requireAuth: true,
          permissionId:
            appConstants.employee_access_permission.PRICING_FULL_ACCESS
        }
      },
      {
        path: appConstants.routes.UPDATE_PRICING,
        name: appConstants.routes.UPDATE_PRICING,
        component: AddPricing,
        meta: {
          requireAuth: true,
          permissionId:
            appConstants.employee_access_permission.PRICING_FULL_ACCESS
        }
      }
    ]
  },
  {
    path: `/${appConstants.routes.REPORT}`,
    component: LoginUserLayout,
    meta: {
      requireAuth: true,
      permissionId: appConstants.employee_access_permission.REPORT_FULL_ACCESS
    },
    children: [
      {
        path: appConstants.routes.SALES_REPORT,
        name: appConstants.routes.SALES_REPORT,
        component: SalesReport,
        meta: {
          requireAuth: true,
          permissionId:
            appConstants.employee_access_permission.REPORT_FULL_ACCESS
        }
      },
      {
        path: appConstants.routes.PAYMENT_REPORT,
        name: appConstants.routes.PAYMENT_REPORT,
        component: PaymentReport,
        meta: {
          requireAuth: true,
          permissionId:
            appConstants.employee_access_permission.REPORT_FULL_ACCESS
        }
      }
    ]
  },
  {
    path: `/${appConstants.routes.ADS}`,
    component: LoginUserLayout,
    children: [
      {
        path: '',
        name: appConstants.routes.ADS,
        component: AdsList,
        meta: {
          requireAuth: true
        }
      },
      {
        path: appConstants.routes.CREATE_AD,
        name: appConstants.routes.CREATE_AD,
        component: CreateAds,
        meta: {
          requireAuth: true
        }
      },
      {
        path: appConstants.routes.UPDATE_AD,
        name: appConstants.routes.UPDATE_AD,
        component: CreateAds,
        meta: {
          requireAuth: true
        }
      }
    ]
  },
  {
    path: `/${appConstants.routes.ANALYTICS}`,
    component: LoginUserLayout,
    meta: {
      //requireAuth: true,
      permissionId:
        appConstants.employee_access_permission.ANALYTICS_FULL_ACCESS
    },
    children: [
      {
        path: '',
        name: appConstants.routes.ANALYTICS,
        component: Analytics,
        meta: {
          requireAuth: true,
          permissionId:
            appConstants.employee_access_permission.ANALYTICS_FULL_ACCESS
        }
      }
    ]
  },
  {
    path: `/${appConstants.routes.EMPLOYEE}`,
    component: LoginUserLayout,
    meta: {
      //requireAuth: true,
      permissionId: appConstants.employee_access_permission.EMPLOYEE_FULL_ACCESS
    },
    children: [
      {
        path: '',
        name: appConstants.routes.EMPLOYEE,
        component: Employee,
        meta: {
          requireAuth: true
        }
      },
      {
        path: appConstants.routes.ADDEMPLOYEE,
        name: appConstants.routes.ADDEMPLOYEE,
        component: AddEmployee,
        meta: {
          requireAuth: true
        }
      },
      {
        path: appConstants.routes.UPDATEEMPLOYEE,
        name: appConstants.routes.UPDATEEMPLOYEE,
        component: AddEmployee,
        meta: {
          requireAuth: true
        }
      }
    ]
  },
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: appConstants.routes.LOGIN,
        name: appConstants.routes.LOGIN,
        component: Login
      },
      {
        path: appConstants.routes.SIGNUP,
        name: appConstants.routes.SIGNUP,
        component: SignUp
      },
      {
        path: appConstants.routes.TERMS,
        name: appConstants.routes.TERMS,
        component: Terms
      }
    ]
  },

  { path: '*', redirect: `/${appConstants.routes.DASHBOARD}` }
  // {
  //   path: '*',
  //   // eslint-disable-next-line no-unused-vars
  //   redirect: (to) => {
  //     // the function receives the target route as the argument
  //     // we return a redirect path/location here.
  //     if (store.getters['isAdmin']) {
  //       return {
  //         path: `/${appConstants.routes.ANALYTICS}`
  //       }
  //     } else {
  //       return {
  //         path: `/${appConstants.routes.COMPANY}`
  //       }
  //     }
  //   }
  // }
]

const router = new VueRouter({
  mode: 'history',
  routes,

  scrollBehavior() {
    window.scrollTo(0, 0)
  }
})
let loader = null
function hideLoader() {
  if (loader) {
    loader.hide()
    loader = null
  }
}

function showLoader() {
  hideLoader()
  loader = Vue.$loading.show()
}
//let accessPermission = store.getters['getter_employeeAccessPermission']
//let permissionArray = accessPermission.access_permission
//OLD CODE
// router.beforeEach(async (to, from, next) => {
//   if (to.name) {
//     showLoader()
//   }

//   if (to.matched.some((record) => record.meta.requireAuth)) {
//     let userToken = readUserTokenCookie()
//     if (userToken != '' && userToken == store.state.login.token) {
//       if (to.meta.permissionId != undefined && to.meta.permissionId != null) {
//         let accessPermission = store.getters['getter_userAccessPermission']
//         if (accessPermission[to.meta.permissionId]) {
//           next()
//         } else {
//           next({ path: `/${appConstants.routes.DASHBOARD}` })
//         }
//       } else {
//         next()
//       }
//     } else {
//       if (userToken == '') {
//         if (store.state.user != '') {
//           store.dispatch('logout')
//         }
//         next(`/${appConstants.routes.LOGIN}`)
//         return
//       } else {
//         //if token in cookie and vuex did not match , logout user and move to home page
//         await store
//           .dispatch('getUserDataFromToken', userToken)
//           .then(() => {
//             next(`/`)
//             return
//           })
//           .catch(() => {
//             store.dispatch('logout')
//             next(`/${appConstants.routes.LOGIN}`)
//             return
//           })
//       }
//     }
//   } else {
//     next()
//     return
//   }

//   // if (to.matched.some((record) => record.meta.requireAuth)) {
//   //   if (localStorage.getItem('olous_admin_token') || '') {
//   //     if (
//   //       to.meta.permissionId != undefined &&
//   //       to.meta.permissionId != null &&
//   //       permissionArray[to.meta.permissionId]
//   //     ) {
//   //       next()
//   //       return
//   //     } else {
//   //       if (from.name != null && from.name == appConstants.routes.LOGIN) {
//   //         next()
//   //         return
//   //       } else {
//   //         next({ path: `/${appConstants.routes.DASHBOARD}` })
//   //       }
//   //     }
//   //   }
//   //   next(`/${appConstants.routes.LOGIN}`)
//   // } else {
//   //   next()
//   // }
// })
//NEW CODE
router.beforeEach(async (to, from, next) => {
  if (to.name) {
    showLoader()
  }
  if (to.matched.some((record) => record.meta.requireAuth)) {
    //console.log('Step -1 required auth')
    let userToken = readUserTokenCookie()
    //console.log('step 2 - user token', userToken)
    if (userToken != '' && userToken == store.state.login.token) {
      //console.log('step 3 - token matched')
      if (to.meta.permissionId != undefined && to.meta.permissionId != null) {
        let accessPermission = store.getters['getter_userAccessPermission']
        if (accessPermission[to.meta.permissionId]) {
          next()
        } else {
          next({ path: `/${appConstants.routes.DASHBOARD}` })
        }
      } else {
        next()
      }
    } else {
      //console.log('step 4 - if token not matched')
      if (userToken == '') {
        //console.log('step 5 - token empty')
        if (store.state.user != '') {
          //console.log('step 6 - for logout user')
          store.dispatch('logout')
        }
        next(`/${appConstants.routes.LOGIN}`)
        return
      } else {
        //if token in cookie and vuex did not match , logout user and move to next page
        await store
          .dispatch('getUserDataFromToken', userToken)
          .then(() => {
            next(``)
            return
          })
          .catch(() => {
            store.dispatch('logout')
            next(`/${appConstants.routes.LOGIN}`)
            return
          })
      }
    }

    if (userToken != '') {
      next()
      return
    }
    next(`/${appConstants.routes.LOGIN}`)
  } else {
    next()
  }
})

router.afterEach(() => {
  hideLoader()
})

export default router
