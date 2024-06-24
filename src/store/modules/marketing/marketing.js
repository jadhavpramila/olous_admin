import axios from 'axios'
import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

Vue.use(Loading)

const defaultState = () => {
  return {
    alerts: {
      showMarketingModal: false,
      marketingModalMessage: ''
    }
  }
}

const state = defaultState()
const getters = {
  showMarketingModal: (state) => state.alerts.showMarketingModal,
  marketingModalMessage: (state) => state.alerts.marketingModalMessage
}
const mutations = {
  reset(state) {
    Object.assign(state, defaultState())
  },
  updateShowMarketingModal(state, [value, message]) {
    state.alerts.showMarketingModal = value
    if (value == false) {
      state.alerts.marketingModalMessage = ''
    } else {
      state.alerts.marketingModalMessage = message
      setTimeout(() => {
        state.alerts.showMarketingModal = false
        state.alerts.marketingModalMessage = ''
      }, 3000)
    }
  },

  clearAllPreviousMarketingData(state) {
    state.alerts.showMarketingModal = false
    state.alerts.marketingModalMessage = ''
  }
}

const actions = {
  sendMarketingTemplate({ commit }, data) {
    let loader = Vue.$loading.show({})
    const formData = new FormData()
    formData.append('file', data.file)
    let template_id = data.template_id

    return (
      axios
        .post(
          `${process.env.VUE_APP_ADMINBASEURL}/fire_marketing_emails/?template_id=${template_id}`,
          formData
        )
        // .post(
        //   `https://content.olous.app/api/v1${process.env.VUE_APP_ADMINBASEURL}/fire_marketing_emails/?template_id=${template_id}`,
        //   formData
        // )
        .then((response) => {
          console.log(response.data)
          commit('updateShowMarketingModal', [true, 'Email sent successfully'])
          loader.hide()
        })
        .catch(function (error) {
          commit('updateShowMarketingModal', [
            true,
            'Error while sending an email'
          ])
          console.log(error)
          loader.hide()
        })
    )
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
