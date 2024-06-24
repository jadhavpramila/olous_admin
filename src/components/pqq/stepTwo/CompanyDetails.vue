<template>
  <div class="cls-companydetails form-conatiner">
    <div class="form-container">
      <div class="page-body">
        <div class="form-group">
          <p><span>Name:</span> {{ companyDetails.name }}</p>
          <p><span>Status:</span> {{ setStatus(companyDetails.status) }}</p>
          <p><span>Slug:</span> {{ companyDetails.slug }}</p>
          <p>
            <span>Created at:</span>
            {{ formateDate(companyDetails.created_at) }}
          </p>
        </div>
        <div class="form-group">
          <LocationWithoutPin
            v-if="isDataLoaded"
            is_label_visible="true"
            is_execute_validation="true"
            :country_value="getCompanyDetailsData.country"
            :state_value="getCompanyDetailsData.state"
            :city_value="getCompanyDetailsData.city"
            :country_iso_value="getCompanyDetailsData.country_iso"
            :state_iso_value="getCompanyDetailsData.state_iso"
            :country_code_value="getCompanyDetailsData.country_code_value"
            @location_changed="getLocationValue($event)"
          ></LocationWithoutPin>
        </div>
        <div class="form-group">
          <input
            class="size"
            type="checkbox"
            :value="companyDetails.is_in_mh"
            v-model="companyDetails.is_in_mh"
            :checked="isChecked()"
            disabled
          />
          <span
            :class="[companyDetails.is_in_mh ? 'green-color' : 'red-color']"
          >
            Is In Maharashtra
          </span>
        </div>
        <div class="form-group">
          <button class="btn btn-dark" @click="companyDetailsSave()">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import appConstants from '../../../appConstants'
import LocationWithoutPin from '../../../components/common/LocationWithoutPin'

export default {
  name: 'CompanyDetails',
  components: {
    LocationWithoutPin
  },
  data() {
    return {
      isDataLoaded: false,
      companyDetails: {
        id: '',
        name: '',
        status: '',
        logo: '',
        slug: '',
        company_type: '',
        banner_image: '',
        website: '',
        country: '',
        country_iso: '',
        state: '',
        state_iso: '',
        city: '',
        is_in_mh: '',
        created_at: '',
        country_code_value: '91',
        city_value: '',
        lat: '',
        lng: ''
      }
    }
  },
  computed: {
    ...mapGetters('companyData', [
      'getCurrentCompanyData',
      'getCompanyDetailsData'
    ])
  },
  methods: {
    ...mapActions('companyData', [
      'fetchCompanyDetailsData',
      'updateCompanyDetailsData'
    ]),
    companyDetailsSave() {
      let temp = {
        country: this.companyDetails.country,
        country_iso: this.companyDetails.country_iso,
        state: this.companyDetails.state,
        state_iso: this.companyDetails.state_iso,
        city: this.companyDetails.city,
        is_in_mh: this.companyDetails.is_in_mh,
        lat: this.companyDetails.lat,
        lng: this.companyDetails.lng
      }
      let obj = {
        id: this.getCurrentCompanyData.id,
        data: temp
      }
      this.updateCompanyDetailsData(obj)
    },
    isChecked() {
      if (this.companyDetails.is_in_mh) {
        return true
      } else {
        return false
      }
    },
    formateDate(date) {
      let tempDate = new Date(date)
      let data = tempDate.toLocaleString()
      return data
    },
    setStatus(data) {
      let status = appConstants.company_status
      return Object.keys(status).find((key) => status[key] === data)
    },

    setCompanyDetailsData(data) {
      this.companyDetails.id = data.id
      this.companyDetails.name = data.name
      this.companyDetails.status = data.status
      this.companyDetails.logo = data.logo
      this.companyDetails.slug = data.slug
      this.companyDetails.company_type = data.company_type
      this.companyDetails.banner_image = data.banner_image
      this.companyDetails.website = data.website
      this.companyDetails.country = data.country
      this.companyDetails.country_iso = data.country_iso
      this.companyDetails.state = data.state
      this.companyDetails.state_iso = data.state_iso
      this.companyDetails.city = data.city
      this.companyDetails.is_in_mh = data.is_in_mh
      this.companyDetails.created_at = data.created_at
      this.isDataLoaded = true
    },
    getLocationValue(value) {
      this.companyDetails.country = value.country
      this.companyDetails.country_iso = value.country_iso
      this.companyDetails.state = value.state
      this.companyDetails.state_iso = value.state_iso
      this.companyDetails.city = value.city
      this.companyDetails.country_code = value.country_code
      this.companyDetails.lat = value.lat
      this.companyDetails.lng = value.lng
      if (
        this.companyDetails.state_iso == 'IN_MH' ||
        this.companyDetails.state_iso == 'MH'
      ) {
        this.companyDetails.is_in_mh = true
      } else {
        this.companyDetails.is_in_mh = false
      }
    }
  },
  watch: {
    getCompanyDetailsData: function (val) {
      // console.log(val)
      this.setCompanyDetailsData(val)
    }
  },
  created() {
    let id = this.getCurrentCompanyData.id
    this.fetchCompanyDetailsData(id).then((data) => {
      this.setCompanyDetailsData(data)
    })
  }
}
</script>
<style scoped>
.green-color {
  font-size: 16px;
  color: green;
}
.red-color {
  font-size: 18px;
  color: red;
}
.size {
  width: 18px;
  height: 18px;
}
</style>
