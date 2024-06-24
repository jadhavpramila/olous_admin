/* eslint-disable no-unused-vars */
import axios from 'axios'
import router from '../../../router/index'
import Vue from 'vue'
// Import component
import Loading from 'vue-loading-overlay'
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css'
import appConstants from '../../../appConstants'
import {
  Contacts,
  company,
  company_media,
  Products
} from '../../modelClasses/companyModel'
// Init plugin
Vue.use(Loading)
// let axiosConfig = {
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//     }
// };

const defaultState = () => {
  return {
    allCompanyData: [],
    companyData: [],
    subCategories: [],
    categories: [],
    paymentSuccess: {},
    paymentError: {},
    error: '',
    alerts: {
      showContactAlert: false
    },
    paymentAlert: false,
    slug: true,
    publishMsg: null,
    slugValue: '',
    currentCompanyTabListValue: '',
    singleCompanyPreviewDetails: {},
    currentCompanyId: '',
    currentContactData: '',
    currentCompanyContactData: '',
    currentCompanyProductData: {},
    currentCompanyServiceData: {},
    currentEditProductData: {},
    currentEditServiceData: {}
  }
}

const state = defaultState()
const getters = {
  allCompanies: (state) => state.allCompanyData,
  companyDetails: (state) => state.companyData,
  getSubCategories: (state) => state.subCategories,
  getCategory: (state) => state.categories,
  getError: (state) => state.error,
  getShowContactAlert: (state) => {
    return state.alerts.showContactAlert
  },
  showPaymentAlert: (state) => {
    return state.paymentAlert
  },
  getSlug: (state) => state.slug,
  getPublish: (state) => state.publishMsg,
  // As per new API Slug
  getSlugValue: (state) => state.slugValue,
  getCurrentCompanyTabListValue: (state) => state.currentCompanyTabListValue,
  getSingleCompanyPreviewDetails: (state) => state.singleCompanyPreviewDetails,
  getCurrentCompanyId: (state) => state.currentCompanyId,
  getCurrentContactData: (state) => state.currentContactData,
  getCurrentCompanyContactData: (state) => state.currentCompanyContactData,
  getCurrentCompanyProductData: (state) => state.currentCompanyProductData,
  getCurrentCompanyServiceData: (state) => state.currentCompanyServiceData,
  getCurrentEditProductData: (state) => state.currentEditProductData,
  getCurrentEditServiceData: (state) => state.currentEditServiceData
}

const mutations = {
  setCompanies: (state, companies) => {
    state.allCompanyData = []
    state.allCompanyData = companies
  },
  companyDetails: (state, company) => state.allCompanyData.unshift(company),
  setSubcategories: (state, subCategories) => {
    state.subCategories = []
    state.subCategories = subCategories
  },
  setCategory: (state, categories) => {
    state.categories = []
    state.categories = categories
  },
  addFirstCompany(state, company) {
    // console.log(company)
    state.companyData = []
    state.companyData.push(company)
    // state.companyData.unshift(company)
  },
  setError(state, text) {
    //console.log(text)
    state.error = text
  },
  contactUpdated(state) {
    state.alerts.showContactAlert = true
    setTimeout(() => {
      state.alerts.showContactAlert = false
    }, 4000)
  },
  paymentSuccessConfirm: (state, paymentSuccessMsg) =>
    (state.paymentSuccess = paymentSuccessMsg),
  payment_success(state) {
    state.paymentAlert = true
    // setTimeout(() => {
    //   state.alerts.paymentAlert = false;
    // }, 4000);
  },
  make_false(state) {
    state.paymentAlert = false
  },
  setSlug: (state, slug) => (state.slug = slug),
  make_slug_false: (state) => (state.slug = true),
  setPublish: (state, data) => (state.publishMsg = data),
  setPublishFalse: (state) => (state.publishMsg = null),
  removeCompanyFromList: (state, removeCompany) => {
    state.allCompanyData = state.allCompanyData.filter(
      (item) => item.id !== removeCompany.id
    )
  },
  setShowContactAlert(state, value) {
    state.alerts.showContactAlert = value
  },
  replaceCompanyFromList: (state, replaceCompany) => {
    for (var count = 0; count < state.allCompanyData.length; count++) {
      if (state.allCompanyData[count].id == replaceCompany.id) {
        Vue.set(state.allCompanyData, count, replaceCompany)
        break
      }
    }
  },
  updateSavedCompanyData: (state, updatedcompanyData) => {
    if (state.companyData.length > 0) {
      state.companyData = []
      state.companyData.push(updatedcompanyData)
    }
  },
  setSlugValue: (state, data) => {
    state.slugValue = data.slug
  },
  setCurrentCompanyTabListValue: (state, data) => {
    state.currentCompanyTabListValue = data
  },
  setSingleCompanyPreviewDetails: (state, data) => {
    let company_object = {}
    company_object = new company(data)
    state.singleCompanyPreviewDetails = company_object
    let contact = {
      contacts: [],
      company_contacts: []
    }
    state.currentCompanyProductData = company_object.products
    state.currentCompanyServiceData = company_object.services
    if (company_object.contacts.length > 0) {
      for (let index = 0; index < company_object.contacts.length; index++) {
        contact.contacts.push(company_object.contacts[index])
      }
    }
    if (company_object.company_contacts.length > 0) {
      for (
        let index = 0;
        index < company_object.company_contacts.length;
        index++
      ) {
        contact.company_contacts.push(company_object.company_contacts[index])
      }
    }
    state.currentCompanyContactData = contact
    //console.log('contact company.js', contact)
  },
  setCurrentCompanyId: (state, data) => {
    state.currentCompanyId = data
  },
  setCurrentContactData: (state, data) => {
    state.currentContactData = data
  },
  setDeleteSingleUserContact: (state, data) => {
    let objWithIdIndex = state.singleCompanyPreviewDetails.contacts.findIndex(
      (obj) => obj.id === data.contact_id
    )

    if (objWithIdIndex > -1) {
      state.singleCompanyPreviewDetails.contacts.splice(objWithIdIndex, 1)
    }
  },
  setDeletedMediaToProduct: (state, data) => {
    let product = state.currentCompanyProductData.find(
      (c) => c.id === data.product_id
    )
    let media
    if (product) {
      media = product.medias.findIndex((m) => m.id === data.media_id)
    }
    //console.log('set delete media', state.currentCompanyProductData)
    //console.log('media', media)
    if (media > -1) {
      product.medias.splice(media, 1)
    }
  },
  setDeletedMediaToService: (state, data) => {
    let product = state.currentCompanyServiceData.find(
      (c) => c.id === data.product_id
    )
    let media
    if (product) {
      media = product.medias.findIndex((m) => m.id === data.media_id)
    }
    //console.log('set delete media', state.currentCompanyProductData)
    //console.log('media', media)
    if (media > -1) {
      product.medias.splice(media, 1)
    }
  },
  setDeletedProductToCompany: (state, data) => {
    let objWithIdIndex = state.currentCompanyProductData.findIndex(
      (obj) => obj.id === data.product_id
    )

    if (objWithIdIndex > -1) {
      state.currentCompanyProductData.splice(objWithIdIndex, 1)
    }
  },
  setDeletedServiceToCompany: (state, data) => {
    let objWithIdIndex = state.currentCompanyServiceData.findIndex(
      (obj) => obj.id === data.product_id
    )

    if (objWithIdIndex > -1) {
      state.currentCompanyServiceData.splice(objWithIdIndex, 1)
    }
  },
  setSavedUserContact: (state, data) => {
    let con = new Contacts(data)
    state.currentCompanyContactData.contacts.push(con)
  },
  setUpdatedUserContact: (state, data) => {
    var foundIndex = state.currentCompanyContactData.contacts.findIndex(
      (x) => x.id == data.id
    )
    state.currentCompanyContactData.contacts[foundIndex] = data
  },
  setProductSavedProductData: (state, data) => {
    //console.log('data', data)
    state.currentCompanyProductData.push(data)
  },
  setAddedMediaImageInProduct: (state, data) => {
    let product = state.currentCompanyProductData.findIndex(
      (c) => c.id === data.data.product
    )
    if (product > -1) {
      state.currentCompanyProductData.splice(product, 1, data.responseData)
    }
  },
  setAddedMediaImageInService: (state, data) => {
    let service = state.currentCompanyServiceData.findIndex(
      (c) => c.id === data.data.product
    )
    if (service > -1) {
      state.currentCompanyServiceData.splice(service, 1, data.responseData)
    }
  },
  setPrimaryImageInProduct: (state, data) => {
    let product = state.currentCompanyProductData.find(
      (c) => c.id === data.product
    )
    let media_index
    if (product) {
      media_index = product.medias.findIndex((m) => m.id === data.media)
    }
    //console.log('set delete media', state.currentCompanyProductData)
    //console.log('media', media)
    if (media_index > -1) {
      for (let i = 0; i < product.medias.length; i++) {
        if (i == media_index) {
          product.medias[i].is_primary = true
        } else {
          product.medias[i].is_primary = false
        }
      }
    }
  },
  setPrimaryImageInService: (state, data) => {
    let product = state.currentCompanyServiceData.find(
      (c) => c.id === data.product
    )
    let media_index
    if (product) {
      media_index = product.medias.findIndex((m) => m.id === data.media)
    }
    if (media_index > -1) {
      for (let i = 0; i < product.medias.length; i++) {
        if (i == media_index) {
          product.medias[i].is_primary = true
        } else {
          product.medias[i].is_primary = false
        }
      }
    }
  },
  setServiceSavedServiceData: (state, data) => {
    state.currentCompanyServiceData.push(data)
  },
  setEditCurrentProductData: (state, data) => {
    state.currentEditProductData = data
  },
  setEditCurrentServiceData: (state, data) => {
    state.currentEditServiceData = data
  },
  reset_company(state) {
    Object.assign(state, defaultState())
  }
}

const actions = {
  fetchSubCategories({ commit }, categoryId) {
    if (Number.isInteger(categoryId)) {
      //console.log('Showing the searchtext here again: ' + categoryId)
      let loader = Vue.$loading.show({})
      return axios
        .get(
          `/search/vendors/companysubcategories/list/?category_id=${categoryId}&page=1&limit=200&offset=0`
        )
        .then(function (response) {
          const result = response.data
          // console.log("Result data: "+ result.data.hits.hits);
          commit('setSubcategories', result.data.hits.hits)
          loader.hide()
        })
        .catch(function (error) {
          //console.log(error.response.data)
          commit('setError', error)
          loader.hide()
        })
    }
  },

  fetchCategories({ commit }) {
    let loader = Vue.$loading.show({})
    return axios
      .get(`/search/vendors/companycategories/list/`)
      .then(function (response) {
        const result = response.data
        commit('setCategory', result.data.hits.hits)
        loader.hide()
      })
      .catch(function (error) {
        console.log(error.response.data)
        commit('setError', error)
        loader.hide()
      })
  },

  searchCompany({ commit }, searchText) {
    console.log('Showing the searchtext here again: ' + searchText)
    let loader = Vue.$loading.show({})
    axios
      .get(`/vendors/adminsearch/?q=${searchText}`)
      .then(function (response) {
        const result = response.data
        // console.log('Result data: ' + result.data)
        commit('setCompanies', result.data)
        // if (result.data.length) {
        //   router.push("/").catch((err) => {
        //     // Ignore the vuex err regarding  navigating to the page they are already on.
        //     if (
        //       err.name !== "NavigationDuplicated" &&
        //       !err.message.includes(
        //         "Avoided redundant navigation to current location"
        //       )
        //     ) {
        //       // But print any other errors to the console
        //       console.log(err);
        //       logError(err);
        //     }
        //   });
        //   loader.hide();
        // } else {
        //   loader.hide();
        // }

        loader.hide()
      })
      .catch(function (error) {
        console.log(error.response.data)
        commit('setError', error)
        loader.hide()
      })
  },

  fetchCompanies({ commit }) {
    const token = localStorage.getItem('token')
    console.log('to check what is happening here', token, this.$store)
    let loader = Vue.$loading.show({})

    // eslint-disable-next-line no-async-promise-executor
    return new Promise((resolve, reject) => {
      axios
        .get(`/vendors/business/preview/`)
        .then(function (response) {
          const result = response.data
          // console.log('Result data: ' + result.data)
          commit('setCompanies', result.data)
          // if (result.data.length) {
          // router.push("/").catch((err) => {
          //   // Ignore the vuex err regarding  navigating to the page they are already on.
          //   if (
          //     err.name !== "NavigationDuplicated" &&
          //     !err.message.includes(
          //       "Avoided redundant navigation to current location"
          //     )
          //   ) {
          //     // But print any other errors to the console
          //     console.log(err);
          //     logError(err);
          //   }
          // });
          //   loader.hide()
          // } else {
          //   router.push({
          //     //name: 'companyName'
          //     name: appConstants.routes.ADD_COMPANY
          //   })
          //   loader.hide()
          // }
          resolve(result.data)
          loader.hide()

          //return response.data.data.next
        })
        .catch(function (error) {
          console.log(error.response.data)
          commit('setError', error)

          loader.hide()
          reject(error)
        })
    })
    // axios
    //   .get(
    //     // "https://content.olous.app/api/v1/vendors/company/all/"
    //     // "http://15.207.209.15/api/v1/vendors/company/all/"
    //     '/vendors/company/allotherthandeleted'
    //   )
    //   .then(function (response) {
    //     const result = response.data
    //     // console.log('Result data: ' + result.data)
    //     commit('setCompanies', result.data)
    //     if (result.data.length) {
    //       // router.push("/").catch((err) => {
    //       //   // Ignore the vuex err regarding  navigating to the page they are already on.
    //       //   if (
    //       //     err.name !== "NavigationDuplicated" &&
    //       //     !err.message.includes(
    //       //       "Avoided redundant navigation to current location"
    //       //     )
    //       //   ) {
    //       //     // But print any other errors to the console
    //       //     console.log(err);
    //       //     logError(err);
    //       //   }
    //       // });
    //       loader.hide()
    //     } else {
    //       router.push({
    //         //name: 'companyName'
    //         name: appConstants.routes.ADD_COMPANY
    //       })
    //       loader.hide()
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log(error.response.data)
    //     commit('setError', error)
    //     // router.push({
    //     //     name: ''
    //     // });
    //     loader.hide()
    //   })
  },
  changeState({ commit }) {
    console.log('false')
    commit('make_false')
  },
  addCompanyDetails({ commit }, data) {
    let loader = Vue.$loading.show({})
    // console.log(axiosConfig);
    // axios.post(`http://13.233.38.158/vendors/company/completeprofile/${data.id}`, data)
    // .then(function (response) {
    //     console.log(response);
    //     commit('companyDetails', response.data);
    //     router.push({
    //         name: 'home'
    //     });
    // })
    // .catch(function (error) {
    //     console.log(error);
    // })
    let id = data.id
    let flag = data.flag
    delete data.id
    delete data.flag
    axios({
      method: 'post',
      // url: `https://content.olous.app/api/v1/vendors/company/completeprofile/${id}`,
      // url: `http://15.207.209.15/api/v1/vendors/company/completeprofile/${id}`,
      url: `/vendors/company/completeprofile/${id}`,
      data
    })
      .then(function (response) {
        console.log(response)
        console.log(flag)
        // commit('companyDetails', response.data);
        const result = response.data
        console.log(result)
        commit('addFirstCompany', result.data)
        if (flag === 'd') {
          router.push({
            //name: 'home'
            name: appConstants.routes.HOME
          })
          loader.hide()
        } else if (flag === 'p') {
          router.push({
            //name: 'addProduct'
            //name: appConstants.routes.HOME
          })
          loader.hide()
        } else {
          router.push({
            //name: 'addService'
          })
          loader.hide()
        }
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
      })
  },
  addCompanyName({ commit }, data) {
    // console.log(axiosConfig);
    let loader = Vue.$loading.show({})
    axios
      .post(
        // "https://content.olous.app/api/v1/vendors/company/",
        // "http://15.207.209.15/api/v1/vendors/company/",
        '/vendors/company/',
        data
      )
      .then(function (response) {
        const result = response.data
        console.log(result.data)
        commit('addFirstCompany', result.data)
        commit('make_slug_false')
        console.log(result.data.order_id)
        // setTimeout(() => {
        //     loader.hide()
        // }, 5000)
        router.push({
          //name: 'payment'
          name: appConstants.routes.PAYMENT
        })
        loader.hide()
      })
      .catch(function (error) {
        console.log(error.response.data.message.name)
        let err = error.response.data.message.name
        commit('setError', err)
        loader.hide()
      })
  },
  markCompanyPaid({ commit }, data) {
    console.log(data.cid)
    let companyId = data.cid
    let response = data
    delete response.cid
    let loader = Vue.$loading.show({})
    // console.log(axiosConfig);
    // let loader = Vue.$loading.show({});
    // var options = {
    //     key: "rzp_test_Pxt0y1PLBSjLJq",
    //     amount: "59900", /// The amount is shown in currency subunits. Actual amount is ₹599.
    //     name: "Olous",
    //     currency: "INR", // Optional. Same as the Order currency
    //     description: "Purchase Description",
    //     image: "https://jolly-volhard-bc2f0b.netlify.com/favicon.ico",
    //     handler:  (response) =>{
    //     console.log("PAYMENT RESPONSE", response);
    //     //commit('paymentSuccessConfirm', response);
    //       //this.verifySignature(response);
    //         loader.hide();
    //         router.push({
    //             name: 'addCompany'
    //         });
    //         console.log(response);
    //     },
    //     prefill: {
    //         name: "jhon Doe",
    //         email: "jhondoe@gmail.com"
    //     },
    //     notes: {
    //         address: "Olous"
    //     },
    //     theme: {
    //         color: "#00ffff"
    //     }
    //   };

    //   console.log(options);
    /*************** Razor pay integration ******************/
    // var rzp1 = new Razorpay({...options, order_id:result.data.order_id});
    // rzp1.open();
    /*************** Razor pay integration ends **************/
    console.log(response, companyId)
    axios
      .post(
        // `https://content.olous.app/api/v1/vendors/verifypayment/${companyId}`,
        // `http://15.207.209.15/api/v1/vendors/verifypayment/${companyId}`,
        `/vendors/verifypayment/${companyId}`,
        response
      )
      .then(function (response) {
        const result = response
        console.log(result)
        commit('payment_success')
        // router.push({
        //   name: "addCompany",
        // });
        loader.hide()
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
      })
  },
  // editSingleCompany({ commit }, data) {
  //     commit('addFirstCompany', data);
  //     router.push({
  //       name: "addCompany",
  //     });
  //     loader.hide();
  //   },
  gotoProduct({ commit }, data) {
    commit('addFirstCompany', data)
    commit('setShowAddProduct', true)
    // router.push({
    //   name: "addProduct",
    // });
  },
  goToService({ commit }, data) {
    commit('addFirstCompany', data)
    commit('setShowAddService', true)
    // router.push({
    //   name: "addService",
    // });
  },
  goToPayment({ commit }, data) {
    commit('addFirstCompany', data)
    router.push({
      // name: 'payment'
      name: appConstants.routes.PAYMENT
    })
  },
  // eslint-disable-next-line no-unused-vars
  completeCompanyProfile({ commit }, data) {
    // commit('addFirstCompany', data)
    // router.push({
    //   //name: 'addCompany'
    //   name: appConstants.routes.ADD_COMPANY
    // })
  },
  editSingleCompany({ commit }, data) {
    commit('addFirstCompany', data)

    //Set setCurrentCompanyData for PQQ
    commit('companyData/setCurrentCompanyData', data, {
      root: true
    })
    router.push({
      name: appConstants.routes.COMPANY
    })
  },
  updateCompanyDetails({ commit }, data) {
    let loader = Vue.$loading.show({})
    let id = data.id
    let flag = data.flag
    delete data.id
    delete data.flag
    axios({
      method: 'patch',
      // url: `https://content.olous.app/api/v1/vendors/company/update/${id}`,
      // url: `http://15.207.209.15/api/v1/vendors/company/update/${id}`,
      url: `/vendors/company/update/${id}`,

      data
    })
      .then(function (response) {
        console.log(response)
        console.log(flag)
        //state.allCompanyData = state.allCompanyData.filter(item => item.id !== response.data.data.id);
        commit('removeCompanyFromList', response.data.data)
        commit('companyDetails', response.data.data)
        commit('updateSavedCompanyData', response.data.data)
        if (flag === 'd') {
          // router.push({
          //   name: "home",
          // });
          loader.hide()
        } else if (flag == 'p') {
          router.push({
            // name: 'addProduct'
          })
          loader.hide()
        } else {
          router.push({
            //name: 'addService'
          })
          loader.hide()
        }
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
      })
  },
  updateCompany({ commit }, data) {
    let loader = Vue.$loading.show({})
    let id = data.id
    delete data.id
    axios({
      method: 'patch',
      // url: `https://content.olous.app/api/v1/vendors/company/update/${id}`,
      // url: `http://15.207.209.15/api/v1/vendors/company/update/${id}`,
      url: `/vendors/company/update/${id}`,
      data
    })
      .then(function (response) {
        console.log(response)
        //state.allCompanyData = state.allCompanyData.filter(item => item.id !== removeCompany.id);
        commit('removeCompanyFromList', response.data.data)
        commit('companyDetails', response.data.data)
        commit('contactUpdated')
        commit('updateSavedCompanyData', response.data.data)
        loader.hide()
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
      })
  },
  deleteCompanyContact({ commit }, payload) {
    console.log(payload)
    let loader = Vue.$loading.show({})
    console.log(payload.contact)
    let id = payload.company.id
    delete payload.company.id
    // let abc = payload.contact.map((res) => {
    //   return axios.delete(
    //     "https://content.olous.app/api/v1/vendors/contact/delete/",
    //     { data: res }
    //   );
    // });
    axios
      .all([
        axios.delete(
          // "https://content.olous.app/api/v1/vendors/contact/delete/",
          // "http://15.207.209.15/api/v1/vendors/contact/delete/",
          '/vendors/contact/delete/',
          { data: payload.contact }
        ),
        axios.patch(
          // `https://content.olous.app/api/v1/vendors/company/update/${id}`,
          // `http://15.207.209.15/api/v1/vendors/company/update/${id}`,
          `/vendors/company/update/${id}`,
          payload.company
        )
      ])
      .then((responseArr) => {
        console.log('product updated: ', responseArr[0].data)
        console.log('media created: ', responseArr[1].data)
        //state.allCompanyData = state.allCompanyData.filter(item => item.id !== responseArr[1].data.data.id);
        commit('removeCompanyFromList', responseArr[1].data.data)
        commit('companyDetails', responseArr[1].data.data)
        commit('contactUpdated')
        commit('updateSavedCompanyData', responseArr[1].data.data)
        loader.hide()
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
      })
  },

  addNewContact({ commit }, payload) {
    console.log(payload)
    let loader = Vue.$loading.show({})
    console.log(payload.newC)
    let id = payload.compnyData.id
    delete payload.compnyData.id
    axios
      .all([
        axios.post(
          // "https://content.olous.app/api/v1/vendors/contact/",
          // "http://15.207.209.15/api/v1/vendors/contact/",
          '/vendors/contact/',
          payload.newC
        ),
        axios.patch(
          // `https://content.olous.app/api/v1/vendors/company/update/${id}`,
          // `http://15.207.209.15/api/v1/vendors/company/update/${id}`,
          `/vendors/company/update/${id}`,
          payload.compnyData
        )
      ])
      .then((responseArr) => {
        console.log('product updated: ', responseArr[0].data)
        console.log('media created: ', responseArr[1].data)
        //state.allCompanyData = state.allCompanyData.filter(item => item.id !== responseArr[1].data.data.id);
        commit('removeCompanyFromList', responseArr[1].data.data)
        commit('companyDetails', responseArr[1].data.data)
        commit('contactUpdated')
        commit('updateSavedCompanyData', responseArr[1].data.data)
        loader.hide()
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
      })
  },

  updateContact({ commit }, payload) {
    console.log(payload)
    let loader = Vue.$loading.show({})
    let id = payload.compnyData.id
    delete payload.compnyData.id
    axios
      .all([
        axios.patch(
          // `https://content.olous.app/api/v1/vendors/contact/update/${id}`,
          // `http://15.207.209.15/api/v1/vendors/contact/update/${id}`,
          `/vendors/contact/update/${id}`,
          { contacts: payload.updateC }
        ),
        axios.patch(
          // `https://content.olous.app/api/v1/vendors/company/update/${id}`,
          // `http://15.207.209.15/api/v1/vendors/company/update/${id}`,
          `/vendors/company/update/${id}`,
          payload.compnyData
        )
      ])
      .then((responseArr) => {
        console.log('product updated: ', responseArr[0].data)
        console.log('media created: ', responseArr[1].data)
        //state.allCompanyData = state.allCompanyData.filter(item => item.id !== responseArr[1].data.data.id);
        commit('removeCompanyFromList', responseArr[1].data.data)
        commit('companyDetails', responseArr[1].data.data)
        commit('contactUpdated')
        commit('updateSavedCompanyData', responseArr[1].data.data)
        loader.hide()
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
      })
  },

  addDeleteContact({ commit }, payload) {
    console.log(payload)
    let loader = Vue.$loading.show({})
    let id = payload.compnyData.id
    delete payload.compnyData.id
    axios
      .all([
        axios.delete(
          // "https://content.olous.app/api/v1/vendors/contact/delete/",
          '/vendors/contact/delete/',
          { data: payload.delC }
        ),
        axios.post(
          // "https://content.olous.app/api/v1/vendors/contact/",
          '/vendors/contact/',
          payload.newC
        ),
        axios.patch(
          // `https://content.olous.app/api/v1/vendors/company/update/${id}`,
          // `http://15.207.209.15/api/v1/vendors/company/update/${id}`,
          `/vendors/company/update/${id}`,
          payload.compnyData
        )
      ])
      .then((responseArr) => {
        console.log('product updated: ', responseArr[0].data)
        console.log('media created: ', responseArr[1].data)
        //state.allCompanyData = state.allCompanyData.filter(item => item.id !== responseArr[2].data.data.id);
        commit('removeCompanyFromList', responseArr[2].data.data)
        commit('companyDetails', responseArr[2].data.data)
        commit('contactUpdated')
        commit('updateSavedCompanyData', responseArr[2].data.data)
        loader.hide()
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
      })
  },

  addUpdateDeleteContact({ commit }, payload) {
    console.log(payload)
    let loader = Vue.$loading.show({})
    let id = payload.compnyData.id
    delete payload.compnyData.id
    axios
      .all([
        axios.patch(
          // `https://content.olous.app/api/v1/vendors/contact/update/${id}`,
          // `http://15.207.209.15/api/v1/vendors/contact/update/${id}`,
          `/vendors/contact/update/${id}`,
          { contacts: payload.updateC }
        ),
        axios.delete(
          // "https://content.olous.app/api/v1/vendors/contact/delete/",
          '/vendors/contact/delete/',
          { data: payload.delC }
        ),
        axios.post(
          // "https://content.olous.app/api/v1/vendors/contact/",
          '/vendors/contact/',
          payload.newC
        )
      ])
      .then(() => {
        axios
          .patch(
            // `https://content.olous.app/api/v1/vendors/company/update/${id}`,
            // `http://15.207.209.15/api/v1/vendors/company/update/${id}`,
            `/vendors/company/update/${id}`,
            payload.compnyData
          )
          .then(function (response) {
            //state.allCompanyData = state.allCompanyData.filter(item => item.id !== removeCompany.id);
            commit('removeCompanyFromList', response.data.data)
            commit('companyDetails', response.data.data)
            commit('contactUpdated')
            commit('updateSavedCompanyData', response.data.data)
            loader.hide()
          })
          .catch(function (error) {
            console.log(error)
            loader.hide()
          })
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
      })
  },

  searchSlug({ commit }, payload) {
    console.log(payload)
    return axios
      .get(
        // `https://content.olous.app/api/v1/vendors/checkslug/?slug=${payload}`
        // `http://15.207.209.15/api/v1/vendors/checkslug/?slug=${payload}`
        `/vendors/checkslug/?slug=${payload}`
      )
      .then(function (response) {
        const result = response.data.data.is_slug_available
        console.log(result)
        commit('setSlug', result)
      })
      .catch(function (error) {
        console.log(error)
      })
  },

  publishCompany({ commit }, payload) {
    let loader = Vue.$loading.show({})
    console.log(payload)
    return new Promise((resolve, reject) => {
      axios
        .post(
          // `https://content.olous.app/api/v1/vendors/company/publish/${payload}`
          // `http://15.207.209.15/api/v1/vendors/company/publish/${payload}`
          `/vendors/company/publish/${payload}`
        )
        .then(function (response) {
          console.log(response.data.message)
          const result = response.data.message
          console.log(result)
          commit('setPublish', result)
          loader.hide()
          resolve()
        })
        .catch(function (error) {
          console.log(error)
          loader.hide()
          console.log('publishCompany : ' + error)
          if (error.response) {
            commit('setPublish', error.response.data.message)
          } else {
            commit('setPublish', 'Something went wrong')
          }

          loader.hide()
          reject()
        })
    })
  },
  changePublishState({ commit }) {
    console.log('false')
    commit('setPublishFalse')
  },
  updateShowContactAlert({ commit }, ShowContactAlertValue) {
    commit('setShowContactAlert', ShowContactAlertValue)
  },

  markAsPaid({ commit }, payload) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .post(`/vendors/company/makelive/`, payload)
        .then(function (response) {
          // commit('removeCompanyFromList', response.data.data)
          // commit('companyDetails', response.data.data)
          commit('replaceCompanyFromList', response.data.data)
          loader.hide()
          resolve()
        })
        .catch(function (error) {
          console.log('markAsPaid : ' + error)
          if (error.response) {
            Vue.notify({
              group: 'error',
              type: 'error',
              text: error.response.data.message
            })
          } else {
            Vue.notify({
              group: 'error',
              type: 'error',
              text: appConstants.API_CATCH_MESSAGE
            })
          }
          loader.hide()
          reject()
        })
    })
  },
  fetchSlugFromCompanyName({ commit }, payload) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .get(`/vendors/business/slug/?company_name=${payload}`)
        .then(function (response) {
          // commit('removeCompanyFromList', response.data.data)
          // commit('companyDetails', response.data.data)
          commit('setSlugValue', response.data.data)
          loader.hide()
          resolve()
        })
        .catch(function (error) {
          console.log('markAsPaid : ' + error)

          loader.hide()
          reject()
        })
    })
  },
  saveCurrentCompanyTabListValue({ commit }, data) {
    {
      commit('setCurrentCompanyTabListValue', data)
    }
  },
  // eslint-disable-next-line no-unused-vars
  createCompanyNew({ commit }, data) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .post(`/vendors/business/register/`, data)
        .then((result) => {
          loader.hide()
          resolve(result.data)
        })
        .catch((error) => {
          loader.hide()
          if (error.response) {
            if (error.response.data.message) {
              loader.hide()
              reject(error.response.data.message)

              return
            }
          }
          loader.hide()
          reject('Something went wrong')
        })
    })
  },
  // eslint-disable-next-line no-unused-vars
  updateBusinessData({ commit }, data) {
    //let company_id = data.company_id
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .post(`/vendors/business/update/details/`, data)
        .then(function (response) {
          loader.hide()
          resolve(response.data)
          //console.log('data company', response.data.data)
          //commit('setSingleCompanyPreviewDetails', response.data.data)
        })
        .catch(function (error) {
          console.log(error)
          if (error.response) {
            if (error.response.data.message) {
              loader.hide()
              reject(error.response.data.message)

              return
            }
          }
          loader.hide()
          reject()
        })
    })
  },
  fetchSingleCompanyPreviewDetails({ commit }, id) {
    console.log('data in api call =', id)
    let loader = Vue.$loading.show({})
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      await axios
        .get(`/vendors/business/preview/${id}/`)
        .then(function (response) {
          commit('setSingleCompanyPreviewDetails', response.data.data)
          loader.hide()
          resolve(response.data.data)
        })
        .catch(function (error) {
          // console.log('updateCompanyDetailsData : ' + error)
          loader.hide()
          reject(error)
        })
    })
  },
  saveCurrentCompanyId({ commit }, id) {
    commit('setCurrentCompanyId', id)
  },
  saveEditCurrentProductData({ commit }, data) {
    commit('setEditCurrentProductData', data)
  },
  saveEditCurrentServiceData({ commit }, data) {
    commit('setEditCurrentServiceData', data)
  },
  saveCompanyUserContact({ commit }, data) {
    //let company_id = data.company_id
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .post(`/vendors/business/create/usercontact/`, data)
        .then(function (response) {
          loader.hide()
          //console.log('response user contact', response.data.data)
          //commit('setSavedUserContact', response.data.data)
          resolve(response.data)
        })
        .catch(function (error) {
          console.log(error)
          if (error.response) {
            if (error.response.data.message) {
              loader.hide()
              reject(error.response.data.message)

              return
            }
          }
          loader.hide()
          reject()
        })
    })
  },
  saveCompanyContacts({ commit }, data) {
    //let company_id = data.company_id
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .patch(`/vendors/business/update/companycontact/`, data)
        .then(function (response) {
          loader.hide()
          // console.log('response user contact', response.data.data)
          resolve(response.data)
        })
        .catch(function (error) {
          console.log(error)
          if (error.response) {
            if (error.response.data.message) {
              loader.hide()
              reject(error.response.data.message)

              return
            }
          }
          loader.hide()
          reject()
        })
    })
  },
  saveCurrentContact({ commit }, data) {
    {
      commit('setCurrentContactData', data)
    }
  },
  updateCompanyUserContact({ commit }, data) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .patch(`/vendors/business/update/usercontact/`, data)
        .then(function (response) {
          loader.hide()
          //console.log('response user contact', response.data.data)
          //commit('setUpdatedUserContact', data)
          resolve(response.data)
        })
        .catch(function (error) {
          console.log(error)
          if (error.response) {
            if (error.response.data.message) {
              loader.hide()
              reject(error.response.data.message)

              return
            }
          }
          loader.hide()
          reject()
        })
    })
  },
  deleteSingleUserContact({ commit }, data) {
    console.log('contact id to delete', data)
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .delete(
          `/vendors/business/delete/contact/${data.company_id}/${data.contact_id}/`,
          data
        )
        .then(function (response) {
          loader.hide()
          console.log('response user contact', response.data.data)
          commit('setDeleteSingleUserContact', data)
          resolve(response.data)
        })
        .catch(function (error) {
          console.log(error)
          if (error.response) {
            if (error.response.data.message) {
              loader.hide()
              reject(error.response.data.message)

              return
            }
          }
          loader.hide()
          reject()
        })
    })
  },
  saveProductInfoNew({ commit }, data) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .post(`/vendors/business/add/product/`, data)
        .then(function (response) {
          loader.hide()
          let Prod = new Products(response.data.data)
          commit('setProductSavedProductData', Prod)
          resolve(response.data)
        })
        .catch(function (error) {
          console.log(error)
          if (error.response) {
            if (error.response.data.message) {
              loader.hide()
              reject(error.response.data.message)

              return
            }
          }
          loader.hide()
          reject()
        })
    })
  },
  saveServiceInfoNew({ commit }, data) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .post(`/vendors/business/add/service/`, data)
        .then(function (response) {
          loader.hide()
          let Prod = new Products(response.data.data)
          commit('setServiceSavedServiceData', Prod)
          resolve(response.data)
        })
        .catch(function (error) {
          console.log(error)
          if (error.response) {
            if (error.response.data.message) {
              loader.hide()
              reject(error.response.data.message)

              return
            }
          }
          loader.hide()
          reject()
        })
    })
  },
  addSingleMediaImage({ commit }, data) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .post(`/vendors/business/add/image/`, data)
        .then(function (response) {
          let obj = {
            data: data,
            responseData: new Products(response.data.data)
          }
          //console.log('response user contact', response.data.data)
          commit('setAddedMediaImageInProduct', obj)
          let mediaNewArray = []
          if (
            response.data.data.medias !== null &&
            response.data.data.medias != undefined &&
            response.data.data.medias.length > 0
          ) {
            for (let media of response.data.data.medias) {
              let singleMedia = new company_media(media)
              mediaNewArray.push(singleMedia)
            }
          } else {
            mediaNewArray = []
          }
          loader.hide()
          resolve(mediaNewArray)
        })
        .catch(function (error) {
          console.log(error)
          if (error.response) {
            if (error.response.data.message) {
              loader.hide()
              reject(error.response.data.message)

              return
            }
          }
          loader.hide()
          reject()
        })
    })
  },
  addSingleMediaImageService({ commit }, data) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .post(`/vendors/business/add/image/`, data)
        .then(function (response) {
          let obj = {
            data: data,
            responseData: new Products(response.data.data)
          }
          //console.log('response user contact', response.data.data)
          commit('setAddedMediaImageInService', obj)
          let mediaNewArray = []
          if (
            response.data.data.medias !== null &&
            response.data.data.medias != undefined &&
            response.data.data.medias.length > 0
          ) {
            for (let media of response.data.data.medias) {
              let singleMedia = new company_media(media)
              mediaNewArray.push(singleMedia)
            }
          } else {
            mediaNewArray = []
          }
          loader.hide()
          resolve(mediaNewArray)
        })
        .catch(function (error) {
          console.log(error)
          if (error.response) {
            if (error.response.data.message) {
              loader.hide()
              reject(error.response.data.message)

              return
            }
          }
          loader.hide()
          reject()
        })
    })
  },
  addSingleMediaVideo({ commit }, data) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .post(`/vendors/business/add/video/`, data)
        .then(function (response) {
          console.log('response user contact', response.data.data)
          let obj = {
            data: data,
            responseData: new Products(response.data.data)
          }
          commit('setAddedMediaImageInProduct', obj)
          //console.log('response user contact', response.data.data)
          // commit('setAddedMediaImageInProduct', obj)
          let mediaNewArray = []
          if (
            response.data.data.medias !== null &&
            response.data.data.medias != undefined &&
            response.data.data.medias.length > 0
          ) {
            for (let media of response.data.data.medias) {
              let singleMedia = new company_media(media)
              mediaNewArray.push(singleMedia)
            }
          } else {
            mediaNewArray = []
          }
          loader.hide()
          resolve(mediaNewArray)
        })
        .catch(function (error) {
          console.log(error)
          if (error.response) {
            if (error.response.data.message) {
              loader.hide()
              reject(error.response.data.message)

              return
            }
          }
          loader.hide()
          reject()
        })
    })
  },
  addSingleMediaVideoService({ commit }, data) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .post(`/vendors/business/add/video/`, data)
        .then(function (response) {
          console.log('response user contact', response.data.data)
          let obj = {
            data: data,
            responseData: new Products(response.data.data)
          }
          commit('setAddedMediaImageInService', obj)
          let mediaNewArray = []
          if (
            response.data.data.medias !== null &&
            response.data.data.medias != undefined &&
            response.data.data.medias.length > 0
          ) {
            for (let media of response.data.data.medias) {
              let singleMedia = new company_media(media)
              mediaNewArray.push(singleMedia)
            }
          } else {
            mediaNewArray = []
          }
          loader.hide()
          resolve(mediaNewArray)
        })
        .catch(function (error) {
          console.log(error)
          if (error.response) {
            if (error.response.data.message) {
              loader.hide()
              reject(error.response.data.message)

              return
            }
          }
          loader.hide()
          reject()
        })
    })
  },
  deleteSingleMediaProductImage({ commit }, data) {
    //console.log('contact id to delete', data)
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .delete(
          `/vendors/business/delete/media/${data.media_id}/${data.product_id}/`,
          data
        )
        .then(function (response) {
          loader.hide()
          //console.log('response user contact', response.data.data)
          commit('setDeletedMediaToProduct', data)
          resolve(response.data)
        })
        .catch(function (error) {
          console.log(error)
          if (error.response) {
            if (error.response.data.message) {
              loader.hide()
              reject(error.response.data.message)

              return
            }
          }
          loader.hide()
          reject()
        })
    })
  },
  deleteSingleMediaServiceImage({ commit }, data) {
    //console.log('contact id to delete', data)
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .delete(
          `/vendors/business/delete/media/${data.media_id}/${data.product_id}/`,
          data
        )
        .then(function (response) {
          loader.hide()
          //console.log('response user contact', response.data.data)
          commit('setDeletedMediaToService', data)
          resolve(response.data)
        })
        .catch(function (error) {
          console.log(error)
          if (error.response) {
            if (error.response.data.message) {
              loader.hide()
              reject(error.response.data.message)

              return
            }
          }
          loader.hide()
          reject()
        })
    })
  },
  deleteSingleProduct({ commit }, data) {
    console.log('contact id to delete', data)
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .delete(
          `/vendors/business/delete/product/${data.product_id}/${data.company_id}/`,
          data
        )
        .then(function (response) {
          loader.hide()
          console.log('response user contact', response.data.data)
          commit('setDeletedProductToCompany', data)
          resolve(response.data)
        })
        .catch(function (error) {
          console.log(error)
          if (error.response) {
            if (error.response.data.message) {
              loader.hide()
              reject(error.response.data.message)

              return
            }
          }
          loader.hide()
          reject()
        })
    })
  },
  deleteSingleService({ commit }, data) {
    console.log('contact id to delete', data)
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .delete(
          `/vendors/business/delete/product/${data.product_id}/${data.company_id}/`,
          data
        )
        .then(function (response) {
          loader.hide()
          console.log('response user contact', response.data.data)
          commit('setDeletedServiceToCompany', data)
          resolve(response.data)
        })
        .catch(function (error) {
          console.log(error)
          if (error.response) {
            if (error.response.data.message) {
              loader.hide()
              reject(error.response.data.message)

              return
            }
          }
          loader.hide()
          reject()
        })
    })
  },
  setImageAsPrimaryImage({ commit }, data) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .post(`/vendors/business/update/primaryimage/`, data)
        .then(function (response) {
          loader.hide()
          console.log('response user contact', response.data.data)
          commit('setPrimaryImageInProduct', data)
          resolve(response.data)
        })
        .catch(function (error) {
          console.log(error)
          if (error.response) {
            if (error.response.data.message) {
              loader.hide()
              reject(error.response.data.message)

              return
            }
          }
          loader.hide()
          reject()
        })
    })
  },
  setImageAsPrimaryImageInService({ commit }, data) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .post(`/vendors/business/update/primaryimage/`, data)
        .then(function (response) {
          loader.hide()
          console.log('response user contact', response.data.data)
          commit('setPrimaryImageInService', data)
          resolve(response.data)
        })
        .catch(function (error) {
          console.log(error)
          if (error.response) {
            if (error.response.data.message) {
              loader.hide()
              reject(error.response.data.message)

              return
            }
          }
          loader.hide()
          reject()
        })
    })
  },
  updateProductDetailsNew({ commit }, data) {
    console.log('data', data)
    let loader = Vue.$loading.show({})
    let id = data.id
    let id1 = data.company
    delete data.media_height
    delete data.media_width
    delete data.media_name
    let productData = data
    console.log('after', data)
    return axios
      .patch(`/vendors/product/update/${id}`, productData)
      .then((firstResponse) => {
        let obj = {
          data: {
            product: data.id
          },
          responseData: new Products(firstResponse.data.data)
        }
        commit('setAddedMediaImageInProduct', obj)
        loader.hide()
        // return axios
        //   .get(`/vendors/company/products/${id1}`)
        //   .then((secondResponse) => {
        //     const result = secondResponse.data
        //     result.data.push(data.company)
        //     // commit('oneCompanyProducts', result.data)
        //     //commit('productAdded')
        //     // setTimeout(() => {
        //     //   commit('setShowEditProduct', false)
        //     // }, 2500)
        //     loader.hide()
        //   })
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
      })
  },
  updateProductServiceDetailsNew({ commit }, data) {
    console.log('data', data)
    let loader = Vue.$loading.show({})
    let id = data.id
    let id1 = data.company
    delete data.media_height
    delete data.media_width
    delete data.media_name
    let productData = data
    console.log('after', data)
    return axios
      .patch(`/vendors/product/update/${id}`, productData)
      .then((firstResponse) => {
        let obj = {
          data: {
            product: data.id
          },
          responseData: new Products(firstResponse.data.data)
        }
        commit('setAddedMediaImageInService', obj)
        loader.hide()
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
      })
  },
  action_getCompaniesData({ commit }) {
    //const $loading = useLoading()
    let loader = Vue.$loading.show({})
    // console.log("action_getCompaniesData", data);
    let apiQuery = `search/vendors/?q=&index[]=post&index[]=headline&index[]=document`

    return new Promise((resolve, reject) => {
      return axios
        .get(apiQuery)
        .then(function (response) {
          // console.log(response.data.data.hits.hits);
          // commit('commit_companiesData', {
          //   data: response.data.data.hits.hits,
          //   query: apiQuery
          // })
          const result = response.data.data.hits.hits
          let newArray = result
            .map((res) => res._source)
            .filter((res) => {
              if (res.name != '') {
                return res
              }
            })
          //console.log('new array', newArray)
          commit('setCompanies', newArray)
          resolve()
          loader.hide()
        })
        .catch(function (error) {
          console.log(error.message)
          // commit('commit_companiesData', {
          //   data: [],
          //   query: ''
          // })
          commit('setCompanies', error)
          reject()
          loader.hide()
        })
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
