<template>
  <div class="form-inputs left-menu-main-div w-100">
    <!-- <div class="flex-column d-flex align-items-center">
      <img src="../../assets/img/Olous.svg" class="logo-img" alt="Olous" />
      <span class="logo-menu">Olous</span>
    </div> -->
    <!-- <p class="mb-5 logo-description highlight-text fontSize16andHalf">
      Empowering Design, Construction & Real Estate
    </p>
    <p
      class="mb-5 mobile-logo-description smallView-text fontSize16andHalf menu-left-padding"
    >
      Design | Construction App
    </p> -->
    <div class="highlight-text left-menu-scroll" style="overflow-y: auto">
      <Menu></Menu>
    </div>
    <!-- <div class="smallView-text mobileView-menu">
      <Slide :closeOnNavigation="true">
        <Menu></Menu>
      </Slide>
    </div> -->
    <!-- <div class="position-fixed footer-links">
      <router-link to="/terms" class="btn btn-outline-white">Terms</router-link>
      <router-link to="/privacy" class="btn btn-outline-white ml-2">Privacy</router-link>
      <router-link to="/about" class="btn btn-outline-white ml-2">About</router-link>
    </div> -->
  </div>
</template>

<script>
import { Slide } from 'vue-burger-menu'
import Menu from './Menu'
import { mapGetters } from 'vuex'
export default {
  name: 'LeftContent',
  components: {
    Slide,
    Menu // Register your componentform-inputs
  },
  data() {
    return {
      isOpenMenu: false
    }
  },
  computed: {
    ...mapGetters('companyData', ['getCurrentCompanyData'])
  },
  methods: {}
}
</script>

<style scoped>
h1 {
  font-size: 40px;
}
.form-inputs p.logo-description {
  font-size: 16.5px;
  margin-top: 21px;
  margin-bottom: 80px;
  color: #f2f2f2;
  padding-left: 36px;
  /* font-weight: 500; */
}
.form-inputs p.mobile-logo-description {
  font-size: 16.5px;
}
.form-inputs {
  max-width: 500px;
  margin: 20px 0px 0px 0px !important;
}
.form-inputs p {
  font-size: 28px;
  font-weight: 300;
  opacity: 0.8;
}
.menu-item {
  cursor: pointer;
}

.logo-menu {
  font-size: 20px;
  /* margin-left: 5px; */
  font-weight: bolder;
}

.menu-left-padding {
  padding-left: 36px;
}
.logo-img {
  width: 54px;
}
@media only screen and (max-width: 600px) {
  .logo-img {
    width: 30px;
  }
  .logo-menu {
    font-size: 14px;
    /* margin-left: 5px; */
    font-weight: bolder;
  }
}
</style>
