<template>
  <div class="form-conatiner">
    <div class="user_list">
      <div
        v-infinite-scroll="callToFecthUsersList"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="80"
      >
        <div class="" v-for="(user, counter) in getAllUsersList" :key="counter">
          <div class="row user_row">
            <div class="col-lg-11 col-10 user-data-row">
              <div class="row">
                <div class="col-lg-3 col-6 text-right p-1">
                  <label>First Name :</label>
                </div>
                <div class="col-lg-3 col-6 text-left p-1">
                  <label>{{ user.first_name }}</label>
                </div>
                <div class="col-lg-3 col-6 text-right p-1">
                  <label>User Type :</label>
                </div>
                <div class="col-lg-3 col-6 text-left p-1">
                  <label>{{ user.user_type }}</label>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-3 col-6 text-right p-1">
                  <label>Last Name :</label>
                </div>
                <div class="col-lg-3 col-6 p-1">
                  <label>{{ user.last_name }}</label>
                </div>
                <div class="col-lg-3 col-6 text-right p-1">
                  <label>employee ID :</label>
                </div>
                <div class="col-lg-3 col-6 p-1">
                  <label>{{ user.emp_id }}</label>
                </div>
              </div>
            </div>

            <div class="col-lg-1 col-2">
              <img
                class="cursor-pointer"
                @click="setDataOfEditUser(user)"
                title="Edit user"
                src="../../assets/img/Edit.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import appConstants from '../../appConstants.js'

export default {
  name: 'UsersList',
  data() {
    return {
      currentPage: 0,
      hasMoreUsers: 1,
      busy: false
    }
  },
  components: {},
  computed: {
    ...mapGetters('user', ['getAllUsersList'])
  },
  methods: {
    ...mapMutations('user', ['setEditUser']),
    ...mapActions('user', ['fetchAllUsersData']),
    setDataOfEditUser(data) {
      this.setEditUser(data)
      this.$router.push({ name: appConstants.routes.UPDATE_USER })
    },
    getPageDetails() {
      let pageNumber = this.currentPage + 1
      let postPerPage = 10
      let offset = (pageNumber - 1) * postPerPage
      let data = {
        pageNumber: pageNumber,
        userPerPage: postPerPage,
        offset: offset
      }
      return data
    },
    callToFecthUsersList() {
      if (
        this.currentPage == 0 ||
        (this.currentPage > 0 && this.hasMoreUsers != null)
      ) {
        let data = this.getPageDetails()
        this.busy = true
        this.fetchAllUsersData(data).then((result) => {
          // this.currentPage = data.pageNumber // TODO
          this.currentPage = this.currentPage + 1
          this.busy = false
          //this.hasMoreUsers = result //TODO
        })
      }
    }
  },
  created() {
    this.callToFecthUsersList()
  }
}
</script>

<style scoped>
.user_list .user_row {
  margin: 15px 0px 15px;
  padding: 10px;
}

.user_list .user-data-row {
  border: 1px solid rgb(140, 143, 155);
}
</style>
