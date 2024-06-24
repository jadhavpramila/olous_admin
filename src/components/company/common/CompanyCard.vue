<template>
  <div class="companyCard w-100">
    <div class="row mt-2 com_card_wrapper" style="display: block">
      <div class="compDetails mt-3">
        <div class="fill">
          <div>
            <img
              class="compcard_coverimage"
              :src="getImage(company.banner_image)"
            />
          </div>
          <div v-if="company.logo" class="compcard_logo-img-wrapper ml-3 mt-4">
            <img class="compcard_logo-img" :src="getImage(company.logo)" />
          </div>
        </div>
        <div class="compcard_descBlock pl-3 pr-3">
          <template>
            <div>
              <div class="fontSize17 font-weight-bold pt-3 comp-name">
                {{ company.name }}
              </div>
              <!--<div v-if="company.status != 3">-->
              <div v-if="company.status != company_status.PAID">
                <div class="fontSize11 mt-1 comp_desc">
                  {{ company.short_desrciption }}
                </div>
              </div>
              <div v-else>
                <div class="fontSize11 mt-1" style="height: 17px"></div>
              </div>
            </div>
            <div class="row">
              <div class="col-6 col-lg-6 col-md-6">
                <div>
                  <button
                    type="button"
                    class="btn btn-dark btn-custom"
                    @click="onCompanySelection"
                  >
                    Select
                  </button>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import appConstants from '../../../appConstants.js'

export default {
  name: 'CompanyCard',
  props: ['company'],
  data() {
    return {
      company_status: appConstants.company_status
    }
  },
  methods: {
    getImage(banner) {
      if (banner === '' || banner === null) {
        return require(`@/assets/img/DefaultCompanyImage.png`)
      }
      return `${process.env.VUE_APP_IMGURL}${banner}`
    },
    onCompanySelection() {
      this.$emit('companySelected', true)
    }
  }
}
</script>

<style scoped>
.com_card_wrapper {
  padding: 0 20px;
}

.compDetails {
  border-radius: 12px;
  min-height: 340px;
  max-height: 340px;
}

.compcard_descBlock {
  /*height: 30%;*/
  height: 153px;
  background-color: #f2f2f2;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}

.compcard_coverimage {
  opacity: 0.8;
  height: 192px;
  width: 100%;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  object-fit: cover;
}

.compcard_logo-img-wrapper {
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

.compcard_logo-img-wrapper .compcard_logo-img {
  -webkit-box-shadow: inset 0px 0px 3px 0px rgba(0, 0, 0, 0.51);
  -moz-box-shadow: inset 0px 0px 3px 0px rgba(0, 0, 0, 0.51);
  box-shadow: inset 0px 0px 3px 0px rgba(0, 0, 0, 0.51);
}

.comp_desc {
  height: 32px;
}

.comp-name {
  height: 66px;
}
</style>
