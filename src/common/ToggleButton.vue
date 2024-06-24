<template>
  <div>
    <div class="toggle_btn">
      <div class="flex flex-row" style="display: flex; flex-direction: row">
        <div>
          <label class="info-label">{{ uncheck_text }}</label>
        </div>
        <div class="ml-1">
          <label class="switch">
            <input
              type="checkbox"
              v-model="stateOfObject"
              @click="toggleState"
            />
            <span class="slider round"></span>
          </label>
        </div>
        <div>
          <label class="info-label">{{ checked_text }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToggleButton',
  props: ['checked_text', 'uncheck_text'],
  data() {
    return {
      stateOfObject: false
    }
  },
  methods: {
    toggleState() {
      this.$emit('state_changed_event', {
        isChecked: !this.stateOfObject
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/* The switch - the box around the slider */
.toggle_btn .switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 28px;
}

/* Hide default HTML checkbox */
.toggle_btn .switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.toggle_btn .slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.toggle_btn .slider:before {
  position: absolute;
  content: '';
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.toggle_btn input:checked + .slider {
  background-color: #2196f3;
}

.toggle_btn input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

.toggle_btn input:checked + .slider:before {
  -webkit-transform: translateX(32px);
  -ms-transform: translateX(32px);
  transform: translateX(32px);
}

/* Rounded sliders */
.toggle_btn .slider.round {
  border-radius: 34px;
}

.toggle_btn .slider.round:before {
  border-radius: 50%;
}

.toggle_btn .info-label {
  margin-top: 6px !important;
}
</style>
