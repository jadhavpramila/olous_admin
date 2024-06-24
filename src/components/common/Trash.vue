<template>
  <div class="cls_trash">
    <div class="" :style="styleObject">
      <div
        type="button"
        id="fileInputButton"
        @click="trash()"
        class="btn-link cursor-pointer"
      >
        <img
          class="upload-img"
          src="../../assets/img/Trash.svg"
          :title="tooltip"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PreviewImage',
  props: ['id', 'component_height', 'tooltip'],
  data() {
    return {
      styleObject: {
        height: `${this.component_height}px `
      }
    }
  },

  methods: {
    trash() {
      this.$emit('trash_event')
    }
  }
}
</script>

<style scoped></style>
