<template>
  <div class="cls-publish">
    <button class="btn btn-dark" @click="publishCompany">
      Publish Company
    </button>

    <modal
      v-if="publish_alert_isShow"
      @closeModal="updatePublishModalValues([false, ''])"
    >
      <div slot="body">{{ publish_alert_message }}</div>
    </modal>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import modal from '../../common/Modal'
export default {
  name: 'PublishCompany',
  components: {
    modal
  },
  props: {
    company_id: {
      type: String,
      required: true,
      default: ''
    }
  },
  computed: {
    ...mapGetters('companyData', [
      'publish_alert_isShow',
      'publish_alert_message'
    ])
  },
  methods: {
    ...mapActions('companyData', ['publishCompany']),
    ...mapMutations('registration', ['updatePublishModalValues']),
    publishCompany() {
      this.publishCompany(this.company_id)
    }
  }
}
</script>

<style scoped></style>
