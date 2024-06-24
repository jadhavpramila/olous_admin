const appConstants = {
  WEB_URL: 'https://olous.app/',
  BUSINESS_URL: 'https://admin.olous.app/',

  routes: {
    DASHBOARD: 'dashboard',
    LOGIN: 'login',
    ASSIGN_TAGS: 'assigntags',
    COMPANY: 'company',
    COMPANYLIST: 'companylist',
    EDIT_COMPANY: 'editcompany',
    JOB: 'job',
    CREATE_JOB: 'createjob',
    UPDATE_JOB: 'updatejob',
    JOBDETAILS: 'jobdetails',
    LEAD: 'enquiry',
    ADD_LEAD: 'addlead',
    UPDATE_LEAD: 'updatelead',
    LEAD_APPLICANTS: 'leadApplicants',
    LEAD_SUGGESTIONS: 'leadSuggestions',
    NEWS: 'news',
    ADD_NEWS: 'addnews',
    UPDATE_NEWS: 'updatenews',
    HEADLINES: 'headlines',
    ADD_HEADLINE: 'add_headline',
    UPDATE_HEADLINE: 'update_headline',
    MARKETING: 'marketing',
    ENQUERY: 'directenquiry',
    ENQUERY_DETAILS: 'enquirydetails',
    PRICINGLIST: 'pricinglist',
    ADD_PRICING: 'addpricing',
    UPDATE_PRICING: 'updatepricing',
    REPORT: 'report',
    SALES_REPORT: 'sales',
    PAYMENT_REPORT: 'payment',
    ADS: 'ads',
    CREATE_AD: 'createad',
    UPDATE_AD: 'updated',
    APPLICANTS: 'applicants',
    EMPLOYEE: 'employee',
    ADDEMPLOYEE: 'addemployee',
    UPDATEEMPLOYEE: 'updateemployee',

    // pqq(company sub menu)
    REGISTRATION: 'registration',
    DESCRIPTION: 'description',
    PRODUCT_VIEW: 'productview',
    CATALOGUE: 'catalogue',
    TESTIMONIALANDMEDIA: 'testmonial',

    COMPANY_STRUCTURE: 'companystructure',
    FINANCIAL_INFO: 'financialinfo',
    EXPERIENCE: 'experience',
    RESOURCES: 'resources',
    COMPLIANCE: 'compliance',
    REFERENCES: 'references',

    COMPANY_PRICING: 'pricing',
    PUBLISH_WEBSITE: 'publishwebsite',
    GENERATE_REPORT: 'pqqreport',
    COMPANY_DETAILS: 'companydetails',
    ANALYTICS: 'analytics',
    DASHBOARDCOMPANY: 'company',
    SIGNUP: 'signup',
    TERMS: 'terms',
    JOB_PRICING: 'jobpricing',
    UPLOAD_RESUME_DASHBOARD: 'upload_resume_dashboard',
    UPLOAD_RESUME: 'upload_resume'
    //End pqq
  },

  display_routes: {
    ADD: 'add',
    APPLICANT: 'applicants',
    JOB_PRICING: 'pricing',
    SUGGESTION: 'suggestions',
    RESUME: 'resume',
    DASHBOARD: 'dashboard',
    UPLOAD: 'upload'
  },

  API_status: {
    SUCCESS: 'success',
    ERROR: 'error'
  },

  //used for slug
  PORTFOLIO_URL: 'https://olous.app/business/',

  //Allow max number of product / service to add
  ALLOW_TOTAL_NUMBER_OF_PRODUCTS: 6,
  ALLOW_TOTAL_NUMBER_OF_IMAGES_IN_PRODUCTS: 10,
  ALLOW_TOTAL_NUMBER_OF_VIDEOS_IN_PRODUCTS: 1,
  ALLOW_TOTAL_NUMBER_OF_FILES_IN_AD: 6,

  //types of images allowed to save in application
  ACCEPT_IMAGE_TYPE: '.png,.jpeg,.jpg',
  ACCEPT_VIDEO_TYPE: '.mp4',
  ACCEPT_ZIP_TYPE: '.zip',

  //Cookies name
  USER_TOKEN: process.env.VUE_APP_USER_TOKEN_NAME,

  //Max limit of logo image
  imageLogoSize: {
    MAX_SIZE: 512000, //500kb in binary bytes //in bytes vadsoft 3.48kb 353 x 143
    MAX_WIDTH: 1080,
    MAX_HEIGHT: 1080
  },

  //Max limit for image
  imageSize: {
    MAX_SIZE: 512000, //500 KB = 512000 Bytes(in binary)
    MAX_WIDTH: 2000,
    MAX_HEIGHT: 2000
  },

  leadStatus: {
    OPEN: 1,
    APPROVED: 2,
    REJECTED: 3,
    EXPIRED: 4
  },
  contact_type: {
    USER: 0,
    COMPANY: 1
  },
  //Path to store file on s3
  PATH_SAVE_IMAGE_ON_S3: 'media/products/', // To save company ralated images
  PATH_SAVE_PRODUCT_VIDEO_ON_S3: 'media/product/video/',
  PATH_SAVE_NEW_IMAGES_ON_S3: 'media/headlines/', //headline
  PATH_SAVE_COMPNAY_IMAGE_ON_S3: 'media/',
  PATH_SAVE_PDF_ON_S3: 'media/catalogue/', //company related pdf
  PATH_SAVE_EXCEL_ON_S3: 'media/marketing/', //marketing
  PATH_SAVE_MEDIA_IMAGES_ON_S3: 'media/images/', //Save POST/Ads images
  PATH_SAVE_MEDIA_VIDEOS_ON_S3: 'media/video/', ////Save POST/Ads videos
  PATH_SAVE_TESTING_FILE: 'media/testing/', //temp bucket created for testing
  PATH_SAVE_COMPANY_RESUME_ZIPFILE_URL: 'company_resume_zipfile/', //

  PDF_CONTENT_TYPE: 'application/pdf',
  IMAGE_CONTENT_TYPE: 'image',
  VIDEO_CONTENT_TYPE: 'video',
  ZIP_CONTENT_TYPE: ['application/zip', 'application/x-zip-compressed'],

  API_CATCH_MESSAGE: 'something went wrong!',

  media_Type: {
    IMAGE: 0,
    VIDEO: 1,
    FILE: 2,
    COVER_IMAGE: 3,
    VIDEOPORTFOLIO: 4,
    TEXT: 5,
    URL: 6
  },
  media_type_enum: {
    IMAGE: 7,
    VIDEO: 9
  },
  media_stored_at: {
    MEDIA_IMAGES: 0, //media/images
    MEDIA_VIDEO: 1, //media/video
    MEDIA_DOCUMENTS: 2, //media/docuemnts
    MEDIA_COVERIMAGES: 3, //media/images
    MEDIA_VIDEOPORTFOLIO: 4, //media/video
    // TEXT: 5,
    // URL: 6,
    MEDIA_PRODUCT: 7, //media/product
    MEDIA_CATALOGUE: 8, //media/catalogue
    MEDIA_PRODUCT_VIDEO: 9 //media/product/video/
  },
  job_level: {
    INTERN: 1,
    FRESHER: 2,
    JUNIOR: 3,
    INTERMEDIATE: 4,
    SENIOR: 5
  },

  company_status: {
    UNLISTED: 0,
    OPEN: 1,
    COMPLETED: 2,
    PAID: 3,
    PUBLISHED: 4,
    UNPUBLISHED: 5
  },

  companyTabs: {
    //ENUM value is same as emun value in backend code
    REGISTRATION: 1,
    DESCRIPTION: 2,
    SERVICEANDPRODUCT: 3,
    CATALOGUE: 4,
    COMPANY_STRUCTURE: 5,
    FINANCIAL_INFO: 6,
    EXPERIENCE: 7,
    RESOURCES: 8,
    COMPLIANCE: 9,
    REFERENCES: 10,
    //Added for assign active complete image in front end
    BUSINESSDETAILS: 11
  },

  call_to_action: {
    WEBSITE: 1,
    ENQUIRY: 2
  },

  call_to_action_btn_text: {
    LEARN_MORE: 'Learn More',
    CONTACT_US: 'Contact Us',
    SHOP: 'Shop',
    BOOK_NOW: 'Book Now',
    ORDER_NOW: 'Order Now',
    ENQUIRE: 'Enquire'
  },
  WORK_LOCATION: {
    ONSITE: 2,
    OFFICE: 1,
    REMOTE: 3
  },
  upload_file_type: {
    IMAGE: 1,
    VIDEO: 2,
    PDF: 3,
    ZIP: 4
  },

  PRODUCT_TYPE: {
    PRODUCT: 1,
    SERVICES: 2,
    TUTORIAL: 3
  },

  category: {
    CONTRACTOR: 2
  },

  country_iso: {
    INDIA: 'IN'
  },
  employee_access_permission: {
    ANALYTICS_FULL_ACCESS: 1,
    COMPANY_FULL_ACCESS: 2,
    JOB_FULL_ACCESS: 3,
    LEAD_FULL_ACCESS: 4,
    ARTICLES_FULL_ACCESS: 5,
    HEADLINES_FULL_ACCESS: 6,
    ENQUIRY_FULL_ACCESS: 7,
    PRICING_FULL_ACCESS: 8,
    REPORT_FULL_ACCESS: 9,
    SALESPAGE_FULL_ACCESS: 10,
    EMPLOYEE_FULL_ACCESS: 11
  },
  job_type: {
    ALL: 0,
    LIVE: 1,
    EXPIRED: 2,
    EXTERNAL: 3,
    DRAFT: 4,
    OTHER_COMPANIES: 5
  },
  Application_Status: {
    OPEN: 1,
    ACCEPTED: 2,
    REJECTED: 3,
    UNDER_REVIEW: 4,
    INTERVIEW_REQUESTED: 5,
    INTERVIEW_SCHEDULED: 6
  },
  Applicants_Sort: {
    CREATED_DATE: 0,
    TOPMATCH: 1,
    ACCEPTED: 2,
    REJECTED: 3
  },
  NOTICE_PERIOD: {
    ANY: 0,
    IMMEDIATE: 1,
    DAYS_15: 2,
    DAYS_30: 3,
    DAYS_45: 4,
    DAYS_60: 5,
    DAYS_75: 6,
    DAYS_90: 7
  },
  callback_url: {
    BUSINESS: 'business'
  },
  APPLICATION_REPORT_TYPE: {
    experience_match: 3,
    location_match: 5,
    software_match: 6,
    profession_match: 1,
    sector_match: 2,
    language_match: 7,
    certification_match: 8,
    education_match: 9,
    notice_period_match: 4
  },
  Report: {
    NA: 1,
    MATCH: 2,
    NOMATCH: 3,
    PARTIALMATCH: 4
  },
  Language_Fluency: {
    BEGINNER: 1,
    INTERMEDIATE: 2,
    FLUENT: 3
  },
  proficiency_level: {
    BEGINNER: 1,
    INTERMEDIATE: 2,
    EXPERT: 3
  },
  component_data_type: {
    JOB: 1,
    APPLICANT: 2,
    LEAD: 3,
    EMPLOYEE: 4
  },

  lead_filter_type: {
    OPEN: 1,
    APPROVED: 2,
    REJECTED: 3,
    EXPIRED: 4
  },
  CONTACT_TYPE: {
    USER: 0,
    COMPANY: 1
  },
  lead_application_status: {
    OPEN: 1,
    ACCEPTED: 2,
    REJECTED: 3,
    UNDER_REVIEW: 4,
    PAID: 5,
    INTERVIEW_REQUESTED: 6,
    INTERVIEW_SCHEDULED: 7
  },

  lead_application_sort_type: {
    CREATED_DATE: 0,
    PAID: 1,
    ACCEPTED: 2,
    REJECTED: 3
  },

  compType: [
    { id: 1, name: 'Service' },
    { id: 2, name: 'Product' },
    { id: 3, name: 'Mixed' }
  ],

  currency: [
    { id: 1, name: 'INR' },
    { id: 2, name: 'USD' },
    { id: 3, name: 'Pound' },
    { id: 4, name: 'Euro' }
  ],

  // min_work_options: [
  //   { id: 1, name: 'Upto One Lakh' },
  //   { id: 2, name: '1 To 5 Lakhs' },
  //   { id: 3, name: '5 To 10 Lakhs' },
  //   { id: 4, name: '10 To 20 Lakhs' },
  //   { id: 5, name: '20 To 50 Lakhs' },
  //   { id: 6, name: '50 To 1 Cr' },
  //   { id: 7, name: '1 To 5 Cr' },
  //   { id: 8, name: '5 Cr+' }
  // ],
  unit: [
    { name: 'Square Feet', id: '1' },
    { name: 'Square Meter', id: '2' },
    { name: 'Running Feet', id: '3' },
    { name: 'Running Meter', id: '4' },
    { name: 'Cubic Feet', id: '5' },
    { name: 'Cubic Meter', id: '6' },
    { name: 'Tonne', id: '7' },
    { name: 'Metric Tonne', id: '8' },
    { name: 'Kilogram', id: '9' },
    { name: 'Litre', id: '10' },
    { name: 'Number', id: '11' },
    { name: 'Box', id: '12' },
    { name: 'Bundle', id: '13' },
    { name: 'Roll', id: '14' },
    { name: 'Lot', id: '15' }
  ],

  // lead_project_type: [
  //   { id: 1, value: 'Residential' },
  //   { id: 2, value: 'Commercial' },
  //   { id: 3, value: 'Industrial' }
  // ],

  // lead_appx_area: [
  //   { id: 1, value: '1-2 Lakh (Sqft)' },
  //   { id: 2, value: '2-5 Lakh (Sqft)' },
  //   { id: 3, value: '5-10 Lakh (Sqft)' },
  //   { id: 4, value: '> 10 lakh (Sqft)' }
  // ],

  // company_turnover_options: [
  //   { id: 1, name: 'Under 1 Cr.' },
  //   { id: 2, name: '1 to 5 Cr.' },
  //   { id: 3, name: '5 to 10 Cr.' },
  //   { id: 4, name: '10 to 20 Cr.' },
  //   { id: 5, name: '20 to 30 Cr.' },
  //   { id: 6, name: '30+ Cr.' }
  // ],

  // contractor_should_have_done: [
  //   { id: 1, value: 'High Rise' },
  //   { id: 2, value: 'Commercial' },
  //   { id: 3, value: 'Industrial' }
  // ],

  lead_applied_as: {
    USER: 1,
    COMPANY: 2
  },

  lead_type_of_contract: {
    TURNKEY: 1,
    WITH_MATERIAL: 2,
    ONLY_LABOUR: 3
  },

  OTPEnums: {
    FORGOT_PWD_OTP: 0,
    EMAIL_VERIFICATION_OTP: 1,
    PHONE_VERIFICATION_OTP: 2,
    LOGIN_OTP: 3,
    PRICING_PHONE_VERIFICATION_OTP: 4
  },

  price_unit: {
    LAKH: 1,
    CRORE: 2
  },
  price_unit_obj: [
    { id: 1, value: 'LAKH' },
    { id: 2, value: 'CRORE' }
  ],
  pricing_plan_job: {
    FREE: 'j_free',
    PREMIUM: 'j_premium',
    BASIC: 'j_basic'
  },
  pricing_plan_duration: {
    YEARLY: 0,
    HALF_YEARLY: 1,
    QUATERLY: 2,
    MONTHLY: 3
  }
}

export default Object.freeze(appConstants)
