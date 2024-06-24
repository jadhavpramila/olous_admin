<template>
  <div class="cursor-pointer">
    <div v-if="is_to_show_button">
      <div class="square-card-container" :style="styleObject">
        <div class="align-items-center d-flex h-100 justify-content-center">
          <button class="btn px-3 w-auto" @click="$emit('btnCardAddClick')">
            {{ add_button_text }}
          </button>
        </div>
      </div>
    </div>

    <div v-else @click="emitBtnCardArrowClick($event)">
      <div
        class="square-card-container"
        :class="getClass()"
        :style="styleObject"
      >
        <div class="square-card-header">
          <div class="square-card-logo">
            <div v-if="card_logo">
              <img class="logo" :src="card_logo" />
            </div>
            <div v-else>
              <img class="" src="../assets/img/Job-List-Dummy-Logo.svg" />
            </div>
          </div>
          <div class="circle-arrow ml-3">
            <i class="fa fa-arrow-right" aria-hidden="true"></i>
          </div>
        </div>
        <div class="card-body">
          <slot name="body"> </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/css/appcolor.css'
export default {
  name: 'Card',
  props: [
    'is_to_show_button',
    'add_button_text',
    'card_logo',
    'component_height',
    'is_selected'
  ],
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
    },
    getClass() {
      if (this.is_selected) {
        return 'square-card-container-active'
      } else {
        return ''
      }
    },
    emitBtnCardArrowClick(e) {
      e.preventDefault()
      this.$emit('btnCardArrowClick')
    }
  }
}
</script>
<style>
.square-card-container {
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid #d1e2ea;
  background-color: #f4f8fa;
}
.square-card-header {
  /* width: 100%; */
  height: 50.1px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: #d1e2ea;
  /* border: 1px solid#d1e2ea; */
  position: relative;
  display: flex;
  justify-content: end;
  align-items: center;
  display: -webkit-flex !important;
  -webkit-flex-align: end !important;
  -ms-flex-align: center !important;
  -webkit-align-items: center !important;
  -webkit-justify-content: end !important;
}
.square-card-container:hover {
  border: 1px solidvar(--app-primary-color);
}
.square-card-container:hover .square-card-header {
  background-color: var(--app-primary-color);
  margin-left: -1px;
  /* border: 1px solid var(--app-primary-color); */
}
.square-card-container-active {
  border: 1px solidvar(--app-primary-color);
}
.square-card-container-active .square-card-header {
  background-color: var(--app-primary-color);
  margin-left: -1px;
  /* border: 1px solid var(--app-primary-color); */
}
.square-card-logo {
  position: absolute;
  width: 52.8px;
  height: 55.8px;
  border-radius: 8px;
  /* border: solid 1px #1c1c1c; */
  background-color: #fff;
  top: 20px;
  left: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-body {
  padding: 20px !important;
  margin-top: 8px;
}
.circle-arrow {
  border-radius: 50%;
  background-color: #fff;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 14px;
}
.square-card-container:hover .circle-arrow {
  border-radius: 50%;
  background-color: #fff;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.fa {
  font-size: 13px;
  color: #50554b;
}
.square-card-container:hover .fa {
  color: var(--app-primary-color);
}
.square-card-container-active .fa {
  color: var(--app-primary-color);
}
.square-card-container .job_image {
  margin: auto;
  object-fit: contain;
  border-radius: 8px;
  width: 55.8px;
  height: 55.8px;
}
.card-add-button {
  min-width: 130px;
  height: 35px;
  padding: 8px 24px 8px;
  border-radius: 8px;
  background-color: var(--app-primary-color);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}
</style>
