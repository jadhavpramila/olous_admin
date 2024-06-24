/* eslint-disable no-unused-vars */
import axios from 'axios'
import router from '../../../router/index'
import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import appConstants from '../../../appConstants'

Vue.use(Loading)

const defaultState = () => {
  return {
    allProductaData: [],
    allProductsOfCompany: [],
    companyId: '',
    companyEditProduct: [],
    editProductData: [],
    alerts: {
      showProductAlert: false
    },
    showEditProduct: false,
    showEditService: false,
    showAddProduct: false,
    showAddService: false,
    showDeleteProductIssueModal: '',
    modalDeleteProductIssueMessage: ''
  }
}

const state = defaultState()

const getters = {
  companyProducts: (state) => state.allProductsOfCompany,
  zeroProductCompany: (state) => state.companyId,
  editProductCompany: (state) => state.companyEditProduct,
  getProductData: (state) => state.editProductData,
  showProductAlert: (state) => {
    return state.alerts.showProductAlert
  },
  showEditProduct: (state) => state.showEditProduct,
  showEditService: (state) => state.showEditService,
  showAddProduct: (state) => state.showAddProduct,
  showAddService: (state) => state.showAddService,
  showDeleteProductIssueModal: (state) => state.showDeleteProductIssueModal,
  modalDeleteProductIssueMessage: (state) =>
    state.modalDeleteProductIssueMessage
}

const actions = {
  addProductDetails({ commit }, data) {
    let loader = Vue.$loading.show({})
    axios
      .post(`/vendors/product/`, data)
      .then(function (response) {
        commit('addProducts', response.data)
        router.push({
          //name: 'home'
          name: appConstants.routes.HOME
        })
        loader.hide()
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
      })
  },

  multipleAddProduct({ commit }, payload) {
    let loader = Vue.$loading.show({})
    let id = payload.p.company
    return axios
      .post(`/vendors/product/`, payload.p)
      .then((firstResponse) => {
        return axios
          .get(`/vendors/company/products/${id}`)
          .then((secondResponse) => {
            const result = secondResponse.data
            result.data.push(payload.c)
            commit('oneCompanyProducts', result.data)
            commit('productAdded')
            setTimeout(() => {
              commit('setShowAddProduct', false)
            }, 1000)

            loader.hide()
          })
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
      })
  },

  oneCompanyProducts({ commit }, data) {
    let loader = Vue.$loading.show({})
    return axios
      .get(`/vendors/company/products/${data.id}`)
      .then(function (response) {
        const result = response.data
        commit('zeroProducts', data)
        return axios
          .get(`/vendors/company/info/${data.id}`)
          .then(function (response) {
            const companyData = response.data.data
            result.data.push(companyData)
            commit('oneCompanyProducts', result.data)
            loader.hide()
          })
          .catch(function (error) {
            console.log('oneCompanyProducts-company/info/ : ' + error)
            loader.hide()
          })
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
      })
  },

  goEditProduct({ commit }, data) {
    commit('editProductId', data.singleProduct)
    commit('editPC', data.company)
    commit('setShowEditProduct', true)
  },

  goEditService({ commit }, data) {
    commit('editProductId', data.singleProduct)
    commit('editPC', data.company)
    commit('setShowEditService', true)
  },
  gotoProductPage({ commit }, data) {
    // commit('addFirstCompany', data) //admin portal code
    commit('setShowAddProduct', true)
  },
  goToServicePage({ commit }, data) {
    // commit('addFirstCompany', data) //admin portal code
    commit('setShowAddService', true)
  },

  createMedia({ commit }, payload) {
    let loader = Vue.$loading.show({})
    let id = payload.pData.id
    let id1 = payload.company.id
    delete payload.pData.id
    return axios
      .all([
        axios.patch(`/vendors/product/update/${id}`, payload.pData),
        axios.post(`/vendors/media/`, payload.media)
      ])
      .then((firstResponse) => {
        return axios
          .get(`/vendors/company/products/${id1}`)
          .then((secondResponse) => {
            const result = secondResponse.data
            result.data.push(payload.company)
            commit('oneCompanyProducts', result.data)
            commit('productAdded')
            setTimeout(() => {
              commit('setShowEditProduct', false)
            }, 2500)
            loader.hide()
          })
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
      })
  },

  editProductDetails({ commit }, data) {
    let loader = Vue.$loading.show({})
    let id = data.pData.id
    let id1 = data.company.id
    delete data.pData.id
    let productData = data.pData
    return axios
      .patch(`/vendors/product/update/${id}`, productData)
      .then((firstResponse) => {
        return axios
          .get(`/vendors/company/products/${id1}`)
          .then((secondResponse) => {
            const result = secondResponse.data
            result.data.push(data.company)
            commit('oneCompanyProducts', result.data)
            commit('productAdded')
            setTimeout(() => {
              commit('setShowEditProduct', false)
            }, 2500)

            loader.hide()
          })
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
      })
  },

  multipleUpdate({ commit }, payload) {
    let loader = Vue.$loading.show({})
    let id = payload.p.id
    let id1 = payload.c.id
    delete payload.p.id

    return axios
      .all([
        axios.delete('/vendors/media/delete/', {
          data: payload.d
        }),
        axios.patch(`/vendors/product/update/${id}`, payload.p),
        axios.post(`/vendors/media/`, payload.m)
      ])
      .then((firstResponse) => {
        return axios
          .get(`/vendors/company/products/${id1}`)
          .then((secondResponse) => {
            const result = secondResponse.data
            result.data.push(payload.c)
            commit('oneCompanyProducts', result.data)
            commit('productAdded')
            setTimeout(() => {
              commit('setShowEditProduct', false)
            }, 2500)
            loader.hide()
          })
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
      })
  },

  deleteProduct({ commit }, payload) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .delete('/vendors/product/delete/', {
          data: payload
        })
        .then(function (response) {
          const result = response.data

          loader.hide()
          resolve()
        })
        .catch(function (error) {
          console.log('deleteProduct : ' + error)
          if (error.response) {
            commit('updateDeleteProductIssueModal', [
              true,
              error.response.data.message
            ])
          } else {
            commit('updateDeleteProductIssueModal', [
              true,
              'Something went wrong'
            ])
          }
          loader.hide()
          reject()
        })
    })
  },

  deleteMedia({ commit }, payload) {
    let loader = Vue.$loading.show({})
    let id = payload.pData.id
    let id1 = payload.company.id
    delete payload.pData.id
    return axios
      .all([
        axios.delete('/vendors/media/delete/', {
          data: payload.media
        }),
        axios.patch(`/vendors/product/update/${id}`, payload.pData)
      ])
      .then((firstResponse) => {
        return axios
          .get(`/vendors/company/products/${id1}`)
          .then((secondResponse) => {
            const result = secondResponse.data
            result.data.push(payload.company)
            commit('oneCompanyProducts', result.data)
            commit('productAdded')
            setTimeout(() => {
              commit('setShowEditProduct', false)
            }, 2500)
            loader.hide()
          })
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
      })
  },

  addDeleteMedia({ commit }, payload) {
    let id = payload.company.id
    let loader = Vue.$loading.show({})
    return axios
      .all([
        axios.delete('/vendors/media/delete/', {
          data: payload.deletedMedia
        }),
        axios.post(`/vendors/media/`, payload.addedMedia)
      ])
      .then((firstResponse) => {
        return axios
          .get(`/vendors/company/products/${id}`)
          .then((secondResponse) => {
            const result = secondResponse.data
            result.data.push(payload.company)
            commit('oneCompanyProducts', result.data)
            commit('productAdded')
            setTimeout(() => {
              commit('setShowEditProduct', false)
            }, 2500)
            loader.hide()
          })
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
      })
  },

  updateMedia({ commit }, payload) {
    let loader = Vue.$loading.show({})
    let id = payload.pData.id
    let id1 = payload.company.id
    delete payload.pData.id
    return axios
      .all([
        axios.patch(`/vendors/media/update/${id}`, { medias: payload.upMData }),
        axios.patch(`/vendors/product/update/${id}`, payload.pData)
      ])
      .then((firstResponse) => {
        return axios
          .get(`/vendors/company/products/${id1}`)
          .then((secondResponse) => {
            const result = secondResponse.data
            result.data.push(payload.company)
            commit('oneCompanyProducts', result.data)
            commit('productAdded')
            setTimeout(() => {
              commit('setShowEditProduct', false)
              commit('setShowEditService', false)
            }, 2500)
            loader.hide()
          })
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
      })
  },

  editServiceMultiple({ commit }, payload) {
    let loader = Vue.$loading.show({})
    let id = payload.s.id
    let id1 = payload.c.id
    delete payload.s.id

    return axios
      .all([
        axios.delete('/vendors/media/delete/', {
          data: payload.d
        }),
        axios.patch(`/vendors/media/update/${id}`, { medias: payload.upMData }),
        axios.patch(`/vendors/product/update/${id}`, payload.s),
        axios.post(`/vendors/media/`, payload.m)
      ])
      .then((firstResponse) => {
        return axios
          .get(`/vendors/company/products/${id1}`)
          .then((secondResponse) => {
            const result = secondResponse.data
            result.data.push(payload.c)
            commit('oneCompanyProducts', result.data)
            commit('productAdded')
            setTimeout(() => {
              commit('setShowEditProduct', false)
              commit('setShowEditService', false)
            }, 2500)
            loader.hide()
          })
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
      })
  },

  serviceAddDeleteM({ commit }, payload) {
    let loader = Vue.$loading.show({})
    let id = payload.s.id
    let id1 = payload.c.id
    delete payload.s.id

    return axios
      .all([
        axios.delete('/vendors/media/delete/', {
          data: payload.d
        }),
        axios.patch(`/vendors/product/update/${id}`, payload.s),
        axios.post(`/vendors/media/`, payload.m)
      ])
      .then((firstResponse) => {
        return axios
          .get(`/vendors/company/products/${id1}`)
          .then((secondResponse) => {
            const result = secondResponse.data
            result.data.push(payload.c)
            commit('oneCompanyProducts', result.data)
            commit('productAdded')
            setTimeout(() => {
              commit('setShowEditService', false)
            }, 2500)
            loader.hide()
          })
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
      })
  },

  serviceAddUpdateM({ commit }, payload) {
    let loader = Vue.$loading.show({})
    let id = payload.s.id
    let id1 = payload.c.id
    delete payload.s.id
    console.log('payload', payload)
    return axios
      .all([
        axios.patch(`/vendors/media/update/${id}`, { medias: payload.upMData }),
        axios.patch(`/vendors/product/update/${id}`, payload.s),
        axios.post(`/vendors/media/`, payload.m)
      ])
      .then((firstResponse) => {
        return axios
          .get(`/vendors/company/products/${id1}`)
          .then((secondResponse) => {
            const result = secondResponse.data
            result.data.push(payload.c)
            commit('oneCompanyProducts', result.data)
            commit('productAdded')
            setTimeout(() => {
              commit('setShowEditProduct', false)
              commit('setShowEditService', false)
            }, 2500)
            loader.hide()
          })
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
      })
  },

  productDeleteUpdateM({ commit }, payload) {
    let loader = Vue.$loading.show({})
    let id = payload.s.id
    let id1 = payload.c.id
    delete payload.s.id

    return axios
      .all([
        axios.patch(`/vendors/media/update/${id}`, { medias: payload.upMData }),
        axios.patch(`/vendors/product/update/${id}`, payload.s),
        axios.delete('/vendors/media/delete/', {
          data: payload.deletedMedia
        })
      ])
      .then((firstResponse) => {
        return axios
          .get(`/vendors/company/products/${id1}`)
          .then((secondResponse) => {
            const result = secondResponse.data
            result.data.push(payload.c)
            commit('oneCompanyProducts', result.data)
            commit('productAdded')
            setTimeout(() => {
              commit('setShowEditProduct', false)
              commit('setShowEditService', false)
            }, 2500)
            loader.hide()
          })
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
      })
  },

  serviceMediaAdded({ commit }, payload) {
    let loader = Vue.$loading.show({})
    let id1 = payload.c.id

    return axios
      .post(`/vendors/media/`, payload.m)
      .then((firstResponse) => {
        return axios
          .get(`/vendors/company/products/${id1}`)
          .then((secondResponse) => {
            const result = secondResponse.data
            result.data.push(payload.c)
            commit('oneCompanyProducts', result.data)
            commit('productAdded')
            setTimeout(() => {
              commit('setShowEditService', false)
            }, 2500)
            loader.hide()
          })
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
      })
  },

  serviceMediaDeleted({ commit }, payload) {
    let loader = Vue.$loading.show({})
    let id1 = payload.c.id

    return axios
      .delete('/vendors/media/delete/', {
        data: payload.d
      })
      .then((firstResponse) => {
        return axios
          .get(`/vendors/company/products/${id1}`)
          .then((secondResponse) => {
            const result = secondResponse.data
            result.data.push(payload.c)
            commit('oneCompanyProducts', result.data)
            commit('productAdded')
            setTimeout(() => {
              commit('setShowEditService', false)
            }, 2500)
            loader.hide()
          })
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
      })
  },

  serviceUpdate({ commit }, payload) {
    let loader = Vue.$loading.show({})
    let id = payload.s.id
    let id1 = payload.c.id
    delete payload.s.id

    return axios
      .patch(
        // `https://content.olous.app/api/v1/vendors/product/update/${id}`,
        // `http://15.207.209.15/api/v1/vendors/product/update/${id}`,
        `/vendors/product/update/${id}`,
        payload.s
      )
      .then((firstResponse) => {
        return axios
          .get(
            // `https://content.olous.app/api/v1/vendors/company/products/${id1}`
            // `http://15.207.209.15/api/v1/vendors/company/products/${id1}`
            `/vendors/company/products/${id1}`
          )
          .then((secondResponse) => {
            const result = secondResponse.data
            result.data.push(payload.c)
            commit('oneCompanyProducts', result.data)
            commit('productAdded')
            setTimeout(() => {
              commit('setShowEditService', false)
            }, 2500)
            loader.hide()
          })
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
      })
  },

  updateProductOrder({ commit }, payload) {
    let loader = Vue.$loading.show({})
    let productId = payload.id
    //delete payload.id;

    return axios
      .patch(`/vendors/product/order/${productId}`, payload)
      .then((firstResponse) => {
        const result = firstResponse.data
        loader.hide()
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
      })
  },
  addService({ commit }, payload) {
    let loader = Vue.$loading.show({})
    let id = payload.p.company
    return axios
      .post(`/vendors/product/`, payload.p)
      .then((firstResponse) => {
        return axios
          .get(`/vendors/company/products/${id}`)
          .then((secondResponse) => {
            const result = secondResponse.data
            result.data.push(payload.c)
            commit('oneCompanyProducts', result.data)
            commit('productAdded')
            setTimeout(() => {
              commit('setShowAddService', false)
            }, 1000)
            loader.hide()
          })
      })
      .catch(function (error) {
        console.log(error)
        loader.hide()
      })
  },

  updateShowEditProduct({ commit }, value) {
    commit('setShowEditProduct', value)
  },
  updateShowEditService({ commit }, value) {
    commit('setShowEditService', value)
  },
  updateShowAddProduct({ commit }, value) {
    commit('setShowAddProduct', value)
  },
  updateShowAddService({ commit }, value) {
    commit('setShowAddService', value)
  }
}

const mutations = {
  addProducts: (state, product) => (state.allProductaData = product),
  oneCompanyProducts: (state, products) => {
    state.allProductsOfCompany = products
  },
  zeroProducts: (state, company) => (state.companyId = company),
  editProductId: (state, productData) =>
    (state.editProductData[0] = productData),
  editPC: (state, company) => (state.companyEditProduct = company),
  productAdded(state) {
    state.alerts.showProductAlert = true
    setTimeout(() => {
      state.alerts.showProductAlert = false
      // router.push({
      //   name: "viewProducts",
      // });
    }, 2000)
  },
  setShowEditProduct(state, showEditProductValue) {
    if (state.showEditProduct !== showEditProductValue) {
      state.showEditProduct = showEditProductValue
    }
  },
  setShowEditService(state, showEditServiceValue) {
    if (state.showEditService !== showEditServiceValue) {
      state.showEditService = showEditServiceValue
    }
  },
  setShowAddProduct(state, showAddProductValue) {
    if (state.showAddProduct !== showAddProductValue) {
      state.showAddProduct = showAddProductValue
    }
  },
  setShowAddService(state, showAddServiceValue) {
    if (state.showAddService !== showAddServiceValue) {
      state.showAddService = showAddServiceValue
    }
  },
  productResetState(state) {
    Object.assign(state, defaultState())
  },
  updateDeleteProductIssueModal: (state, [value, message]) => {
    state.showDeleteProductIssueModal = value
    if (value == false) {
      state.modalDeleteProductIssueMessage = ''
    } else {
      state.modalDeleteProductIssueMessage = message
      setTimeout(() => {
        state.showDeleteProductIssueModal = false
        state.modalDeleteProductIssueMessage = ''
      }, 2500)
    }
  },
  reset(state) {
    Object.assign(state, defaultState())
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
