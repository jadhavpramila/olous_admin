/* eslint-disable no-unused-vars */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import Vuelidate from 'vuelidate'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/assets/css/main.css'
import '@/assets/css/app.css'
//Form Loading
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import infiniteScroll from 'vue-infinite-scroll'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import ReadMore from 'vue-read-more'
import checkView from 'vue-check-view'
import UUID from 'vue-uuid'
import VueAutosuggest from 'vue-autosuggest'
import Notifications from 'vue-notification'

Vue.use(Loading)

axios.defaults.baseURL = process.env.VUE_APP_AXIOSBASEURL

const awsInstance = axios.create({
  baseURL: `${process.env.VUE_APP_IMGURL}`
})

Vue.prototype.$aws = awsInstance

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.prototype.$http = axios
Vue.use(BootstrapVue)
Vue.use(VueAutosuggest)
Vue.use(infiniteScroll)
Vue.use(ReadMore)
Vue.component('v-select', vSelect)
Vue.use(checkView)
Vue.use(UUID)
Vue.use(Notifications)
Vue.prototype.$eventHub = new Vue()

const state = {
  loading: false
}

const app = new Vue({
  data: { state },
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
