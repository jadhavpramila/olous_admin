<template>
  <div class="leads-list">
    <div class="form-conatiner">
      <div>
        <div class="form-group m-b">
          <label>Enquiry company name</label>
          <input
            type="text"
            class="form-control input-lg"
            v-model="getEnqueryDetails.enquiry_company_name"
          />
        </div>
        <div class="form-group m-b">
          <label>Category</label>
          <select
            v-model="getEnqueryDetails.category"
            class="form-control input-lg"
            name="company_category"
          >
            <option value>Select Category</option>
            <option
              v-for="item in getCategoryOptions"
              :value="item.id"
              :key="item.id"
            >
              {{ item.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <!-- <pre class="language-json"><code>{{ multiSelectoptions  }}</code></pre> -->
          <label>Sub category</label>
          <v-select
            multiple
            label="name"
            v-model="getEnqueryDetails.sub_category"
            :options="getSubcategoryOptions"
            placeholder="select"
            :reduce="(subCategory) => subCategory.id"
            :closeOnSelect="true"
          />
        </div>
        <div class="form-group mt-n1">
          <label>Place your requirement</label>
          <b-form-textarea
            name="lead-requirment"
            v-model="getEnqueryDetails.requirement"
            cols="40"
            rows="7"
            max-rows="15"
            maxlength="1000"
            no-resize
            class="form-control"
          ></b-form-textarea>
        </div>
        <!--start location-->
        <div class="form-group mt-1">
          <label class="app-primary-text-color bold-Font-Weight"
            >Work Location</label
          >
          <div class="row">
            <div class="col-lg-3">
              <label>Country</label>
              <input
                type="text"
                class="form-control input-lg"
                v-model="getEnqueryDetails.country"
              />
            </div>
            <div class="col-lg-3">
              <label>State</label>
              <input
                type="text"
                class="form-control input-lg"
                v-model="getEnqueryDetails.state"
              />
            </div>
            <div class="col-lg-3">
              <label>City</label>
              <input
                type="text"
                class="form-control input-lg"
                v-model="getEnqueryDetails.city"
              />
            </div>
            <div class="col-lg-3">
              <label>Pincode</label>
              <input
                type="text"
                class="form-control input-lg"
                v-model="getEnqueryDetails.pin"
                placeholder="Enter pincode"
              />
            </div>
          </div>
        </div>
        <!--End Location-->
        <!--start work value-->
        <div class="form-group">
          <label
            >Value of Works
            <span class="fontSize12 ml-1"
              >(This will help to chanelise your request to the right
              company)</span
            ></label
          >
          <select
            class="form-control input-lg"
            v-model="getEnqueryDetails.min_work_value"
            name="emp_strength"
          >
            <option
              v-for="item in min_work_options"
              :value="item.id"
              :key="item.id"
            >
              {{ item.value }}
            </option>
          </select>
        </div>
        <!--End work value-->
        <!--Start contact details-->
        <div class="mt-1">
          <label class="app-primary-text-color bold-Font-Weight"
            >Contact details</label
          >
        </div>
        <div class="row form-group">
          <div class="col-md-6">
            <div class="mt-2">
              <label>Name</label>
              <input
                type="text"
                class="form-control input-lg"
                v-model="getEnqueryDetails.contact_name"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="mt-2">
              <label>Company Name</label>
              <input
                type="text"
                class="form-control input-lg"
                v-model="getEnqueryDetails.company_name"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Email</label>
              <input
                type="text"
                class="form-control input-lg"
                v-model="getEnqueryDetails.email"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label>Mobile</label>
              <div class="row">
                <div style="" class="col-3 pr-2 ml-2 mr-n2">
                  <input
                    type="text"
                    class="form-control input-lg"
                    disabled="disabled"
                    v-model="getEnqueryDetails.country_code"
                  />
                </div>
                <div style="" class="col-9">
                  <input
                    type="text"
                    class="form-control input-lg"
                    v-model="getEnqueryDetails.phone"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--End contact details-->
        <!-- start urgent -->
        <div class="form-group ml-2 mt-2">
          <input
            type="checkbox"
            class="chkurgent"
            name="urgent"
            v-model="getEnqueryDetails.urgent"
          />
          <label
            for="urgent"
            class="app-primary-text-color bold-Font-Weight ml-2"
          >
            Urgent
          </label>
          <label class="fontSize12 ml-1">(Please tick only if urgent)</label>
        </div>
        <!-- End urgent -->

        <!--Start Button -->
        <div class="form-group row mt-n3">
          <div class="ml-auto mr-0">
            <button type="button" class="btn mr-3" @click="btnBackClick">
              Back
            </button>
          </div>
        </div>
        <!-- End bitton -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import appConstants from '../../appConstants.js'
export default {
  name: 'EnquiryDetails',
  data() {
    return {
      min_work_options: [
        { id: '1', value: 'Upto One Lakh' },
        { id: '2', value: '1 To 5 Lakhs' },
        { id: '3', value: '5 To 10 Lakhs' },
        { id: '4', value: '10 To 20 Lakhs' },
        { id: '5', value: '20 To 50 Lakhs' },
        { id: '6', value: '50 To 1 Cr' },
        { id: '7', value: '1 To 5 Cr' },
        { id: '8', value: '5 Cr+' }
      ]
    }
  },
  computed: {
    ...mapGetters('enquery', ['getEnqueryDetails']),
    ...mapGetters('dropdownValues', [
      'getCategoryOptions',
      'getSubcategoryOptions'
    ])
  },
  methods: {
    ...mapActions('dropdownValues', [
      'fetchCategoryData',
      'fetchSubCategories'
    ]),
    fetchSubCategoryAsPerCategory() {
      this.getEnqueryDetails.subCategory = []
      if (
        this.getEnqueryDetails.category != undefined &&
        this.getEnqueryDetails.category != null &&
        this.getEnqueryDetails.category != ''
      ) {
        this.fetchSubCategories(this.getEnqueryDetails.category)
      }
    },
    btnBackClick() {
      this.$router.push({ name: appConstants.routes.ENQUERY })
    }
  },
  created() {
    this.fetchCategoryData()
    this.fetchSubCategoryAsPerCategory()
  }
}
</script>

<style scoped>
.heading-div {
  display: flex;
  flex-direction: row-reverse;
}
.seperator-div {
  width: 30px;
  flex: none;
}
</style>
