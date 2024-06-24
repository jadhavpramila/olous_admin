<template>
  <div id="app">
    {{ this.$root.loading }}
    <div class="overlay" v-if="$root.loading">
      <b-spinner class="m-5" label="Busy"></b-spinner>
    </div>
    <router-view />
    <notifications group="error" position="bottom right" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { BSpinner } from 'bootstrap-vue'
export default {
  name: 'App',
  components: {
    BSpinner
  },
  computed: {
    ...mapGetters(['userData'])
  },
  methods: {
    ...mapActions(['action_getEmployeeAccessPermission'])
  },
  created() {
    //console.log(this.$root.state.loading)
    if (
      this.userData != '' &&
      this.userData != null &&
      this.userData != undefined
    ) {
      this.action_getEmployeeAccessPermission()
    }
  }
}
</script>
<style scoped>
@font-face {
  font-family: 'Manrope Regular';
  src: local('Manrope Regular'),
    url(./assets/fonts/Manrope-Regular.ttf) format('truetype');
}
@font-face {
  font-family: 'Manrope Medium';
  src: local('Manrope Medium'),
    url(./assets/fonts/Manrope-Medium.ttf) format('truetype');
}

@font-face {
  font-family: 'Manrope Bold';
  src: local('Manrope Bold'),
    url(./assets/fonts/Manrope-Bold.ttf) format('truetype');
}
</style>
