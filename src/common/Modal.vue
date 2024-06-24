<template>
  <transition name="fade">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container text-center">
            <div class="modal-header" v-if="$slots.header">
              <slot name="header"> </slot>
              <!--<button @click="$emit('closeModal')" class="btn">
                <i class="fa fa-times" aria-hidden="true"></i>
              </button> -->
            </div>

            <div class="modal-body">
              <slot name="body"> </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                <b-button
                  class="btn"
                  variant="outline-dark"
                  @click="$emit('closeModal')"
                >
                  OK
                </b-button>

                <!--To use button in Model use below button as per requirement and set variant-->
                <!-- <b-button
                  variant="outline-danger"
                  @click="hideModal"
                  >Cancel</b-button
                >
                <b-button
                  class="ml-2"
                  variant="outline-primary"
                  @click="cancel"
                  >OK</b-button
                >-->
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </transition>
</template>

<script>
export default {
  name: 'Modal'
}
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
  padding: 15px;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  max-width: 600px;
  margin: 0px auto;
  padding: 20px 10px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;

  min-height: 150px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}
.modal-header {
  border-bottom: none;
  font-size: 24px;
  font-weight: bold;
  display: inline-block;
  // padding: 0px;
}
.modal-footer {
  border-top: none;
  justify-content: center;
  // padding: 1rem 0.5rem 0.5rem 0rem;
  // padding: 0px;
}
.modal-body {
  //margin: 20px 0;
  // padding: 0px;
  font-size: 21px;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.modal-container {
  background-color: #fff !important;
}
@media only screen and (max-width: 992px) {
  .modal-container {
    max-width: 90vw;
    min-height: 150px;
  }
}
</style>
