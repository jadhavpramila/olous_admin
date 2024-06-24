import axios from 'axios'
import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

Vue.use(Loading)
// let token =
//   'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAwNzEyNjE2LCJqdGkiOiI5NjUzZGE1ZWZlNDg0YWVmYTdmMzcxYmQyNTg4NzNkZCIsInVzZXJfaWQiOiJZV1U0T1dRMFl6VXROamt4TWkwME0yTTNMV0UyWldVdE5tWTNOREJpWVdWbU9ERTRJREl3TWpBdE1Ea3RNaklnTVRJNk5URTZNemt1TURrMU5qZ3kifQ.748ke5Bzu-S3vhyPGG_g-W18K0WA6c0wffLHp2wSQ0k'
// let axiosConfig = {
//   headers: {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${token}`
//   }
// }

const defaultState = () => {
  return {
    slug: true
  }
}

const state = defaultState()
const getters = {
  //getSlug: (state) => state.slug
}

const mutations = {
  // setSlug: (state, slugValue) => {
  //   state.slug = slugValue
  // }
}

const actions = {
  // eslint-disable-next-line no-unused-vars
  createCompany({ commit }, data) {
    let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      axios
        .post(
          `https://api.dev.olous.app/api/v1/olous_emp_users/register_vendor/`,
          data
        )
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
  // createCompanyNew({ commit }, data) {
  //   let loader = Vue.$loading.show({})
  //   return new Promise((resolve, reject) => {
  //     axios
  //       .post(`/vendors/business/register/`, data)
  //       .then((result) => {
  //         loader.hide()
  //         resolve(result.data)
  //       })
  //       .catch((error) => {
  //         loader.hide()
  //         if (error.response) {
  //           if (error.response.data.message) {
  //             loader.hide()
  //             reject(error.response.data.message)

  //             return
  //           }
  //         }
  //         loader.hide()
  //         reject('Something went wrong')
  //       })
  //   })
  // },
  // eslint-disable-next-line no-unused-vars
  fetchIndianCities({ commit }, cityStartWith) {
    // let loader = Vue.$loading.show({});
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://api.dev.olous.app/api/v1/search/vendors/indiancities/?q=${cityStartWith}`
        )
        .then((result) => {
          // loader.hide();
          resolve(result.data)
          //console.loader(commit);
        })
        .catch((error) => {
          // loader.hide();
          reject(error)
        })
    })
  },

  // eslint-disable-next-line no-unused-vars
  fetchCitiesOfCountry({ commit }, data) {
    var cityStartWith = data.cityStartWith
    var countryName = data.countryName
    var stateName = data.stateName
    // let loader = Vue.$loading.show({});
    return new Promise((resolve, reject) => {
      axios
        .get(
          `/search/maps/cities/?q=${cityStartWith}&country=${countryName}&state=${stateName}`
        )
        .then((result) => {
          // loader.hide();
          resolve(result.data)
          //console.loader(commit);
        })
        .catch((error) => {
          // loader.hide();
          reject(error)
        })
    })
  }

  // eslint-disable-next-line no-unused-vars
  // checkIsSlugAvailable({ commit }, payload) {
  //   let loader = Vue.$loading.show({});
  //   return new Promise((resolve, reject) => {
  //     axios
  //       .get(`/vendors/checkslug/?slug=${payload}`)
  //       .then((result) => {
  //         loader.hide();
  //         resolve(result.data);
  //       })
  //       .catch((error) => {
  //         loader.hide();
  //         reject(error);
  //       });
  //   });
  // },
}

export default {
  state,
  getters,
  actions,
  mutations
}
