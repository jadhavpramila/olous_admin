<template>
  <div class="cls-companyMain" v-if="allCompanies.length > 0">
    <CompanyList></CompanyList>
  </div>
  <div
    v-else-if="userData.is_admin == undefined || userData.is_admin === false"
  >
    <createCompany></createCompany>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
// eslint-disable-next-line no-unused-vars
import appConstants from '../../appConstants.js'
// eslint-disable-next-line no-unused-vars
import { required, requiredIf } from 'vuelidate/lib/validators'
import CompanyList from './CompanyList.vue'
import createCompany from '../CreateCompany/createCompany.vue'

export default {
  name: 'CompanyMain',
  components: { CompanyList, createCompany },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['allCompanies', 'userData'])
    // eslint-disable-next-line vue/return-in-computed-property
  },

  methods: {
    ...mapActions(['fetchCompanies', 'searchCompany']),
    ...mapMutations('companyData', ['setCurrentCompanyData']),

    searchCompanyName(value) {
      //console.log('Searching for company: ' + value.searchText)
      this.searchCompany(value.searchText)
    }
    // eslint-disable-next-line no-dupe-keys
  },

  created() {
    this.setCurrentCompanyData('')
    // console.log('Checking admin: ', this.userData)

    if (
      this.userData.is_admin == undefined ||
      this.userData.is_admin === false
    ) {
      this.fetchCompanies()
    }
    // this.$eventHub.$on('add-company', this.goToAddNewCompany)
    this.$eventHub.$on('search-company', this.searchCompanyName)
  },
  beforeDestroy() {
    //this.$eventHub.$off('add-company')
    this.$eventHub.$off('search-company')
  }
}
</script>

<style scoped>
/**** styles for dashboard cards ****/
.card-list-wrapper {
  padding: 0 20px;
}
.card {
  margin: 18px auto;
  border: 0;
  box-shadow: 0px 1px 20px rgba(23, 26, 29, 0.035);
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.1);
}

.company-name {
  padding-bottom: 9px;
}
.company-name span {
  display: block;
  font-size: 22px;
  font-weight: 500;
  line-height: 1.1;
}

.company-slug {
  margin-top: 2px;
  display: block;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.1;
}

.card-header {
  background-color: transparent;
  padding: 0 20px;
  margin-bottom: 10px;
  border: 0;
}
.card label {
  display: block;
  font-size: 10px;
  margin: 0;
  padding: 0;
  font-weight: 700;
  font-family: 'Manrope Bold';
  -webkit-font-smoothing: antialiased;
  letter-spacing: 0.05rem;
  opacity: 0.65;
}

.card-body {
  padding: 0 20px;
}

.card-header .button-wrapper {
  padding-bottom: 9px;
}

.cover-img {
  position: relative;
  max-width: 500px;
  max-height: 250px;
  min-height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.cover-img-wrapper {
  max-height: 250px;
  min-height: 250px;
  overflow: hidden;
}

.cover-img:after {
  content: '';
  background: rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  bottom: 0;
  right: 0;
}

.logo-img-wrapper {
  max-width: 50px;
  max-height: 50px;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 9px;
  left: 9px;
  border: 3px #ffffff solid;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  z-index: 4;
  background-color: #f8f9fa;
  overflow: hidden;
}

.logo-img-wrapper .logo-img {
  -webkit-box-shadow: inset 0px 0px 3px 0px rgba(0, 0, 0, 0.51);
  -moz-box-shadow: inset 0px 0px 3px 0px rgba(0, 0, 0, 0.51);
  box-shadow: inset 0px 0px 3px 0px rgba(0, 0, 0, 0.51);
}
.edit-btn-wrapper {
  position: absolute;
  top: 8px;
  right: 8px;
  /* width: 90px; */
  height: 32px;
  overflow: hidden;
  min-width: 32px;
  min-height: 32px;
  background: rgba(0, 0, 0, 0.85);
  border-radius: 27px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  z-index: 3;
  transition: width 0.3s ease-in-out;
  cursor: pointer;
  padding: 5px 12px;
  /* padding-left: 28px; */
}

/* .edit-btn-wrapper:hover {
} */
.edit-btn-wrapper:hover .btn-copy {
  opacity: 1;
}
.btn-copy {
  min-width: 40px;
  transition: opacity 0.25s ease-in-out;
  transition-delay: 0.05s;
  color: #fff;
}

.btn.btn-icon {
  text-transform: uppercase;
  font-weight: bold;
  font-size: 10px;
  text-align: center;
  letter-spacing: 0.025rem;
  margin: 0;
  padding: 0;
  text-align: right;
  line-height: 1;
}
.btn-icon span {
  display: inline-block;
}

.btn-icon .edit-icon {
  color: #fff;
  min-width: 23px;
  min-height: 32px;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  left: 0;
  top: 0;
  font-size: 14px;
  font-weight: 300;
  display: flex;
}

.footer-btn-wrapper {
  display: flex;
  justify-content: space-around;
  padding: 0 10px 15px;
}
.footer-btn-wrapper .btn {
  max-width: 48%;
  flex: 0 0 48%;
}
.incomplete-profile {
  background-color: #ff7d7d;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
  color: #111111;
  z-index: 2;
  margin-top: 16px;
  margin-left: 15px;
  margin-right: 15px;
  /* border-top-left-radius: 15px;
  border-top-right-radius: 15px; */
  border-radius: 15px;
}
.incomplete-profile .footer-btn-wrapper .btn {
  max-width: 100%;
  flex: 0 0 100%;
}
/*.incomplete-profile .company-name span,
.incomplete-profile p {
   text-shadow: 0 0px 2px rgb(105 1 11); 
}*/

/* Mark as paid modal css start */
.applydiscount {
  margin-top: auto;
  margin-bottom: auto;
  background: #e2e2e2;
  border: none;
  max-width: 125px;
  width: 100%;
  height: 40px;
  border-radius: 5px;
  color: #000000;
  font-size: 20px;
  flex-shrink: 0;
  margin-top: 5px;
}

.body-second-row {
  margin-top: 10px;
}

.discount-div {
  display: flex;
}

.buy-btn {
  height: 35px;
  border-radius: 5px;
  width: 100%;
  max-width: 130px;
  font-size: 15px;
}

.pricing-plans-row {
  border: solid 1px #000000;
  padding-top: 25px;
  padding-bottom: 25px;
}

/***************** Mobile style*******************/
@media only screen and (max-width: 992px) {
  .applydiscount {
    max-width: 80px !important;
  }

  .final-price-row {
    font-size: 18px;
  }

  .discount-input {
    font-size: 16px !important;
  }

  .cancel-btn {
    margin-top: 5px;
  }
}

/* END Mark as paid Modal css start */
</style>
