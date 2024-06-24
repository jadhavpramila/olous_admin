<template>
  <div class="form-conatiner cls-report">
    <div class="bg-white border p-4 form-max-width">
      <div class="row">
        <div class="col-lg-4 date-row">
          <label>From Date</label>

          <b-form-datepicker
            id="datepicker-From"
            placeholder="date"
            size="sm"
            locale="en"
            v-model="from_date"
            :max="max_date"
            :value-as-date="true"
            :date-format-options="{
              year: 'numeric',
              month: 'short',
              day: '2-digit',
              weekday: 'short'
            }"
          ></b-form-datepicker>
        </div>
        <div class="col-lg-4 date-row">
          <label>To Date</label>
          <b-form-datepicker
            id="datepicker-to"
            placeholder="date"
            size="sm"
            locale="en"
            v-model="to_date"
            :max="max_date"
            :value-as-date="true"
            :date-format-options="{
              year: 'numeric',
              month: 'short',
              day: '2-digit',
              weekday: 'short'
            }"
          ></b-form-datepicker>
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <div class="col-lg-4 button-row">
          <button class="btn w-75" @click="getSalesReport">
            Get Payment Report
          </button>
        </div>
      </div>
    </div>

    <modal v-if="showModal" @closeModal="closeModal">
      <div slot="body">{{ modal_message }}</div>
    </modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import modal from '../../common/Modal'
export default {
  name: 'PaymentReport',
  components: {
    modal
  },
  data() {
    return {
      from_date: new Date(),
      to_date: new Date(),
      max_date: new Date(),

      showModal: false,
      modal_message: ''
    }
  },

  methods: {
    ...mapActions('report', ['fetchPaymentReport']),
    getSalesReport() {
      var from_date_12AM = this.from_date
      from_date_12AM.setHours(0)
      from_date_12AM.setMinutes(0)
      from_date_12AM.setSeconds(0)

      var to_date_12PM = this.to_date
      to_date_12PM.setHours(23)
      to_date_12PM.setMinutes(59)
      to_date_12PM.setSeconds(0)

      var data = {
        from_date: from_date_12AM.toISOString().split('.')[0] + 'Z',
        to_date: to_date_12PM.toISOString().split('.')[0] + 'Z'
      }

      this.fetchPaymentReport(data)
        .then((resultString) => {
          var anchortag = document.createElement('a')
          anchortag.href =
            'data:text/csv;charset=utf-8,' + encodeURI(resultString)
          anchortag.target = '_blank'
          anchortag.download = 'paymentReport.csv'
          anchortag.click()
        })
        .catch((error) => {
          this.showModal = true
          this.modal_message = error
        })
    },
    closeModal() {
      this.showModal = false
      this.modal_message = ''
    }
  }
}
</script>

<style scoped>
.date-row {
  display: flex;
  flex-direction: column;
}

.button-row {
  display: flex;
  align-items: center;
  justify-content: end;
}
</style>
