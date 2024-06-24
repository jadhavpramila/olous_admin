<template>
  <div>
    <div class="">
      <!-- <div class="imageBlock fill"> -->
      <div class="company-card">
        <div
          class="align-items-center d-flex justify-content-center company-card-bg-img"
        >
          <img
            v-if="company.banner_image"
            :src="getImage(company.banner_image)"
            class="bg-img-width"
          />
          <img
            v-else
            src="../../../assets/img/Default-Image.svg"
            class="bg-img-z-index"
          />
          <div class="company-card-img-overlay"></div>
        </div>

        <div v-if="company.logo" class="company-card-logo-img">
          <img class="logo-img" :src="getImage(company.logo)" />
        </div>
        <div v-else class="company-card-logo-img">
          <span class="fontSize16 font-weight-bold app-secondary-text-color">{{
            setShortFormCompany(company.name)
          }}</span>
        </div>

        <div class="company-card-body">
          <div class="fontSize16 font-weight-bold height-50">
            {{ company.name }}
          </div>
          <!--<div v-if="company.status != 3">-->
          <div>
            <div class="fontSize12 font-weight-700 height-50 break-all">
              {{ setCompanyDescription(company.short_desrciption) }}
            </div>
            <div class="mt-1 height-50">
              <span class="break-all fontSize12 font-weight-400"
                >{{ portfolio_url }}<span>{{ company.slug }}</span></span
              >
            </div>
          </div>
          <div class="mt-1 w-100">
            <button
              @click="editCompany()"
              class="btn w-100 app-bg-color-secondary border-0 app-primary-text-color"
            >
              Edit
            </button>
          </div>
        </div>
      </div>

      <!-- <div class="descBlock p-3">
       
        <template>
          <div>
            <div class="fontSize17 font-weight-bold">
              {{ company.name }}
            </div>
            <div>
              <div class="fontSize14">
                {{ company.short_desrciption }}
              </div>
              <div class="company-slug mt-1">
                <span
                  >{{ portfolio_url }}<span>{{ company.slug }}</span></span
                >
              </div>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-6 col-lg-6 col-md-6">
              <div>
                <button @click="editCompany()" class="company-btn">Edit</button>
              </div>
            </div>

           if paid show publish button 
             <div
              v-if="company.status == company_status.PAID"
              class="col-6 col-lg-6 col-md-6 text-right"
            >
              <div>
                <button
                  @click="publishComp(company.id, counter)"
                  class="btn btn-dark btn-custom"
                >
                  PUBLISH
                </button>
              </div>
            </div> 
          </div>
        </template>
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import appConstants from '../../../appConstants.js'
import { getUserNameInitials } from '../../../common/js/commonFunctions.js'
export default {
  name: 'CompanyCardWithEditButton',
  created() {},
  data() {
    return {
      portfolio_url: appConstants.PORTFOLIO_URL
    }
  },
  props: { company: {} },
  methods: {
    ...mapActions(['saveCurrentCompanyId', 'editSingleCompany']),
    getImage(banner) {
      // if (banner === '' || banner === null) {
      //   return require(`@/assets/img/Default-Image.svg`)
      // }
      return `${process.env.VUE_APP_IMGURL}${banner}`
    },

    editCompany() {
      console.log('company id is : ' + this.company.id)
      this.saveCurrentCompanyId(this.company.id)
      this.editSingleCompany(this.company)

      // this.$emit('editCompany', { comp_data: companyData })
    },
    setCompanyDescription(description) {
      let maxLength = 50
      if (description.length > maxLength) {
        description = description.slice(0, maxLength) + '...'
      }
      return description
    },
    setShortFormCompany(name) {
      let nameArray
      let nameInitial
      if (name != null) {
        nameArray = name.split(' ')
        if (nameArray.length >= 2) {
          nameInitial = getUserNameInitials(nameArray[0], nameArray[1])
        } else {
          nameInitial =
            nameArray[0].trim().charAt(0).toUpperCase() +
            nameArray[0].trim().charAt(1).toUpperCase()
        }
      }
      return nameInitial
    }
  }
}
</script>

<style lang="scss" scoped>
.break-all {
  word-break: break-all;
}
.height-50 {
  height: 50px;
}
.company-card {
  width: 295px;
  height: 425.5px;
  border-radius: 12px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: var(--white);
  color: #000;
}
.company-card:hover {
  background: var(--app-bg-bottom-gradient);
  color: #ffffff;
}
.company-card-bg-img {
  width: 295px;
  height: 179px;
  position: relative;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}
.bg-img-z-index {
  z-index: 111;
}
.bg-img-width {
  z-index: 111;
  width: 295px;
  height: 179px;
}
.company-card-img-overlay {
  width: 295px;
  height: 179px;
  position: absolute;
  top: 0;
  background: var(--app-bg-top-gradient);
  z-index: 11;
  opacity: 0.7;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border-bottom: 0.5px solid var(--app-secondary-color);
}
.company-card-logo-img {
  width: 67px;
  height: 67px;
  border-radius: 8px;
  border: solid 1px #707070;
  background-color: var(--white);
  position: absolute;
  top: 34%;
  left: 7%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 111;
}
.logo-img {
  border-radius: 8px;
}
.company-card-body {
  margin-top: 30px;
  padding: 16px;
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

// .logo-img-wrapper .logo-img {
//   -webkit-box-shadow: inset 0px 0px 3px 0px rgba(0, 0, 0, 0.51);
//   -moz-box-shadow: inset 0px 0px 3px 0px rgba(0, 0, 0, 0.51);
//   box-shadow: inset 0px 0px 3px 0px rgba(0, 0, 0, 0.51);
// }
</style>
