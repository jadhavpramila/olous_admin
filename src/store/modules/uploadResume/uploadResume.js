import axios from 'axios'
import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

Vue.use(Loading)

const state = {}

const getters = {}
const mutations = {}

const actions = {
  action_sendMessageInQueue({ commit }, data) {
    let loader = Vue.$loading.show({})

    return new Promise((resolve, reject) => {
      axios
        .post(`/uploadresume/add_zip_file_msg/`, data)
        .then((response) => {
          loader.hide()
          resolve(response.data)
        })
        .catch(function (error) {
          console.log('action_sendMessageInQueue : ' + error)
          loader.hide()
          if (error.response) {
            Vue.notify({
              group: 'error',
              type: 'error',
              text: error.response.data.message
            })
            reject(error.response.data.message)
          } else {
            Vue.notify({
              group: 'error',
              type: 'error',
              text: 'Something went wrong, please try again later'
            })
            reject('Something went wrong, please try again later')
          }
        })
    })
  },
  action_deleteZipfileFromS3({ commit }, s3fileName) {
    let loader = Vue.$loading.show({})

    return new Promise((resolve, reject) => {
      let data = {
        zip_file_name: s3fileName
      }
      axios
        .post(`/uploadresume/delete_zip_file/`, data)
        .then((response) => {
          loader.hide()
          resolve(response)
        })
        .catch(function (error) {
          console.log('action_deleteZipfileFromS3 : ' + error)
          loader.hide()
          if (error.response) {
            reject(error.response.data.message)
          } else {
            reject('Something went wrong, please try again later')
          }
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
