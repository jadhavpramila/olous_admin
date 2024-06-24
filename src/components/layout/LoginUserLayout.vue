<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <Header />
      </div>
      <div class="row margin-top-for-layout">
        <div class="">
          <div
            class="fixedPosition d-flex left-content-wrapper menu-min-height"
          >
            <LeftContent />
          </div>
        </div>
        <div class="container-fluid p-0 margin-left-siderbar-width">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './Header'
import LeftContent from './LeftContent.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'LoginUserLayout',
  components: {
    Header,
    LeftContent
  },
  data() {
    return {
      //isLeftMenuVisible: false
    }
  },
  computed: {
    ...mapGetters(['allCompanies', 'userData'])
  },
  methods: {
    // isLeftMenuVisible() {
    //   if (
    //     this.userData.is_admin == undefined ||
    //     this.userData.is_admin === false
    //   ) {
    //     if (this.allCompanies.length > 0) {
    //       return true
    //     } else {
    //       return false
    //     }
    //   } else {
    //     return true
    //   }
    // }
  },
  created() {}
}
</script>
<style>
.margin-left-siderbar-width {
  margin-left: 197px;
}
.margin-top-for-layout {
  margin-top: 66px;
}
@media only screen and (max-width: 768px) {
  .margin-left-siderbar-width {
    margin-left: 20px;
  }
  /* .margin-top-for-layout {
    margin-top: 0px;
  } */
}
</style>
