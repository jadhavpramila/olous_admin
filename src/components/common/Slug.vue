<template>
  <div class="Slug">
    <div class="form-group">
      <label for="slugName" class="d-flex">
        {{ textbox_label_name }} <span class="text-danger">*</span></label
      >
      <input
        type="text"
        v-model="slug"
        @keydown.space.prevent
        @blur="onBlur($event)"
        @input="makeLower"
        class="form-control"
        :disabled="isDisabled"
      />
      <div>
        <label class="ont-weight-bold lowercase_text app-primary-text-color">{{
          portfolio_url
        }}</label>
        <label
          class="font-weight-bold lowercase_text app-primary-text-color pl-0"
          >{{ this.slug }}</label
        >
      </div>
      <!--<p v-if="!getSlug" :class="invalid - feedback">
        {{ textbox_label_name }} is not available
      </p>-->
      <div v-if="isValidationVisible" :class="isInvalidFeedback">
        {{ textbox_label_name }} is not available
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import appConstants from '../../appConstants.js'
export default {
  name: 'Slug',
  // props: ['textbox_label_name', 'initial_slug_Value'],
  props: {
    textbox_label_name: {
      type: String,
      required: true,
      default: ''
    },
    initial_slug_Value: {
      type: String,
      required: true,
      default: ''
    },
    isDisabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data() {
    return {
      slug: this.initial_slug_Value,
      initial_slug_value_fromParent: this.initial_slug_Value,
      isAvailable: null,
      portfolio_url: appConstants.PORTFOLIO_URL
    }
  },
  computed: {
    ...mapGetters('registration', ['getSlug']),
    isInvalid() {
      if (this.isAvailable === '' || this.isAvailable === null) {
        return ''
      } else if (this.isAvailable) {
        return ''
      } else {
        return 'is-invalid'
      }
    },

    isInvalidFeedback() {
      if (this.isAvailable === '' || this.isAvailable === null) {
        return ''
      } else if (this.isAvailable) {
        return ''
      } else {
        return 'invalid-feedback d-block'
      }
    },

    isValidationVisible() {
      if (this.isAvailable === '' || this.isAvailable === null) {
        return false
      } else if (this.isAvailable) {
        return false
      } else {
        return true
      }
    }
  },
  created() {
    this.setSlug('')
  },
  methods: {
    ...mapActions('registration', ['searchSlug']),
    ...mapMutations('registration', ['setSlug']),

    async onBlur(e) {
      if (e.target.value !== '') {
        if (e.target.value === this.initial_slug_value_fromParent) {
          this.isAvailable = null
        } else {
          await this.searchSlug(e.target.value)
          this.isAvailable = this.getSlug
        }
      } else {
        this.isAvailable = null
      }
      this.$emit('slug_value_changed', {
        slugText: this.slug,
        isSlugAvailable: this.isAvailable
      })
    },
    makeLower(e) {
      this.slug = e.target.value.toLowerCase()
      //this.slug = this.slug.replace(/\s+/g, '').replace(/[^a-zA-Z]/g, '')
      this.slug = this.slug.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '')
    }
  }
}
</script>
