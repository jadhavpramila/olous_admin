<template>
  <div class="form-conatiner">
    <div class="addUser">
      <div class="form-group">
        <label>First Name</label>
        <input
          type="text"
          class="form-control input-lg"
          v-model="userData.first_name"
          :class="{
            'is-invalid': submitted && $v.userData.first_name.$invalid
          }"
        />
        <div
          v-if="submitted && !$v.userData.first_name.required"
          class="invalid-feedback"
        >
          First name is required
        </div>
      </div>
      <div class="form-group">
        <label>Last Name</label>
        <input
          type="text"
          class="form-control input-lg"
          v-model="userData.last_name"
          :class="{
            'is-invalid': submitted && $v.userData.last_name.$invalid
          }"
        />
        <div
          v-if="submitted && !$v.userData.last_name.required"
          class="invalid-feedback"
        >
          Last name is required
        </div>
      </div>
      <div class="form-group">
        <label>User Type</label>
        <select
          class="form-control input-lg"
          name="user-type"
          v-model="userData.user_type"
          :class="{
            'is-invalid': submitted && $v.userData.user_type.$invalid
          }"
        >
          <option value>Select</option>
          <option
            v-for="item in getUserTypeOptions"
            :value="item.id"
            :key="item.id"
          >
            {{ item.name }}
          </option>
        </select>
        <div
          v-if="submitted && !$v.userData.user_type.required"
          class="invalid-feedback"
        >
          User type is required
        </div>
      </div>
      <div class="form-group">
        <label>Employee ID</label>
        <input
          type="text"
          class="form-control input-lg"
          v-model="userData.emp_id"
          :class="{
            'is-invalid': submitted && $v.userData.emp_id.$invalid
          }"
        />
        <div
          v-if="submitted && !$v.userData.emp_id.required"
          class="invalid-feedback"
        >
          Employee ID is required
        </div>
      </div>
      <div class="form-group">
        <label>Password</label>
        <input
          type="text"
          class="form-control input-lg"
          v-model="userData.password"
          :class="{
            'is-invalid': submitted && $v.userData.password.$invalid
          }"
        />
        <div
          v-if="submitted && !$v.userData.password.required"
          class="invalid-feedback"
        >
          Password is required
        </div>
      </div>
      <div class="form-group mt-n3 float-right">
        <button
          type="button"
          class="btn btn-dark btn-custom"
          @click="btnCancelClick"
        >
          Cancel
        </button>
        <button
          type="button"
          class="btn btn-dark btn-custom ml-2"
          @click="saveUser"
        >
          {{ this.saveButtonText }}
        </button>
      </div>
    </div>
    <modal
      id="saveMessage"
      v-if="showUserSaveModal"
      @closeModal="hideSaveInfoModel"
    >
      <div v-if="userData.id == ''" slot="body">{{ this.saveMessage }}</div>
      <div v-else slot="body">{{ this.updateMessage }}</div>
      <!--<div slot="body">{{ this.updateMessage }}</div>-->
    </modal>
    <modal
      id="ErrorModalUser"
      v-if="showErrorModalUser"
      @closeModal="hideErrorModel"
    >
      <div slot="body">{{ this.apiUserErrorMessage }}</div>
    </modal>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import appConstants from '../../appConstants.js'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import modal from '../../common/Modal.vue'

export default {
  name: 'AddUser',
  data() {
    return {
      userData: {
        id: '',
        first_name: '',
        last_name: '',
        user_type: '',
        emp_id: '',
        password: ''
      },
      //saveButtonText: 'Add User',
      submitted: false,
      saveMessage: 'User created successfully',
      updateMessage: 'User updated successfully'
    }
  },
  components: {
    modal
  },
  computed: {
    ...mapGetters('user', [
      'getUserTypeOptions',
      'showUserSaveModal',
      'showErrorModalUser',
      'apiUserErrorMessage',
      'getEditUser'
    ]),
    saveButtonText() {
      if (this.userData.id == '' || this.userData.id == undefined) {
        return 'Add user'
      } else {
        return 'Update user'
      }
    }
  },
  validations() {
    return {
      userData: {
        first_name: { required },
        last_name: { required },
        user_type: { required },
        emp_id: { required },
        password: { required }
      }
    }
  },
  methods: {
    ...mapMutations('user', ['setShowUserSaveModal', 'setShowErrorModalUser']),
    ...mapActions('user', [
      'saveUserData',
      'updateUserData',
      'fetchUserTypeData'
    ]),
    btnCancelClick() {
      this.goToUserList()
    },
    saveUser() {
      this.submitted = true
      if (this.$v.userData.$invalid) {
        return true
      }
      if (this.userData.id == '') {
        this.saveUserData(this.userData)
      } else {
        this.updateUserData(this.userData)
      }
    },
    goToUserList() {
      this.$router.push({ name: appConstants.routes.USER })
    },
    hideSaveInfoModel() {
      this.setShowUserSaveModal(false)
      this.goToUserList()
    },
    hideErrorModel() {
      this.setShowErrorModalUser(false)
    }
  },
  created() {
    if (this.$route.name == appConstants.routes.UPDATE_USER) {
      this.userData = this.getEditUser
    }
    this.fetchUserTypeData()
  }
}
</script>

<style scoped></style>
