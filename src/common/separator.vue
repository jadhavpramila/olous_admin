<template>
  <div class="">
    <div @click="$emit('cardClickEvent')">
      <div class="separator-container" :style="styleObject">
        <div class="separator-header">
          <div class="d-flex flex-column">
            <div class="font-weight-700 fontSize18">
              {{ title }}
            </div>
            <div class="fontSize14">{{ sub_title }}</div>
          </div>
        </div>
        <div class="separator-body">
          <slot name="body"> </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/css/appcolor.css'
export default {
  name: 'Separator',
  props: ['title', 'sub_title'],
  data() {
    return {
      styleObject: {
        height: this.component_height
      }
    }
  },
  methods: {
    getHeight() {
      return `height:${this.height}`
    }
  }
}
</script>
<style>
.separator-container {
  width: 100%;
  border-radius: 8px;
  border: 1px solid #d1e2ea;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
.separator-header {
  width: 100%;
  /* height: 50.1px; */
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-image: var(--app-bg-top-gradient);
  padding: 14px;
  /* position: relative; */
  display: flex;
  justify-content: end;
  align-items: center;
  display: -webkit-flex !important;
  -webkit-flex-align: end !important;
  -ms-flex-align: center !important;
  -webkit-align-items: center !important;
  -webkit-justify-content: start !important;
  color: #000;
}

.separator-body {
  padding: 15px;
}

.vs__dropdown-menu {
  z-index: 999;
}
</style>
