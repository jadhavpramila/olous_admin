<template>
  <div class="form-conatiner">
    <div class="AssignTags">
      <div
        class="flex flex-row-reverse"
        style="display: flex; flex-direction: row-reverse"
      >
        <ToggleButton
          uncheck_text="All posts"
          checked_text="Untagged posts"
          @state_changed_event="onPostFilterChanged"
        ></ToggleButton>
      </div>
      <div
        v-infinite-scroll="callToFecthPostList"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="80"
      >
        <div
          class=""
          v-for="(post_data, counter) in getAllPostsList"
          :key="counter"
        >
          <div class="" :key="counter">
            <div class="row">
              <div class="col-lg-7 col-12">
                <Posts :post="post_data"></Posts>
              </div>

              <div class="col-lg-5 col-12">
                <div class="vertical-line" style="" v-if="false"></div>

                <div class="mt-4 ml-2 tag-div">
                  <div>
                    <v-select
                      multiple
                      label="display_string"
                      v-model="post_data.tags"
                      :options="interestOptions"
                      placeholder="Select tags"
                      :reduce="(interest) => interest.id"
                      :closeOnSelect="false"
                    />
                  </div>
                  <!-- <div>
                    <multiselect
                      :multiple="true"
                      :searchable="true"
                      track-by="name"
                      label="name"
                      v-model="selectedTag"
                      :options="tagOptions"
                      :close-on-select="false"
                      placeholder="Select tags"
                    ></multiselect> 

                   
                  </div>
                  <div>
                    <b-form-textarea
                      name="job_description"
                      cols="40"
                      rows="7"
                      max-rows="15"
                      maxlength="1000"
                      no-resize
                      placeholder="Enter Tags"
                      class="form-control"
                    ></b-form-textarea>
                  </div> -->
                  <div>
                    <button
                      type="button"
                      class="btn btn-dark btn-custom block"
                      style="float: right"
                      @click="AssignTagsTOPost(post_data.uid, post_data.tags)"
                    >
                      Assign tags
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <hr class="mt-2" />
          </div>
        </div>
      </div>
    </div>
    <modal
      v-if="showAssignTagModal"
      @closeModal="updateAssignTagModal([false, ''])"
    >
      <div slot="body">{{ this.assignTagMessage }}</div>
    </modal>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Posts from './Posts'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import modal from '../../common/Modal.vue'
import ToggleButton from '../../common/ToggleButton'

export default {
  name: 'AssignTags',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Multiselect,
    Posts,
    modal,
    ToggleButton
  },
  data() {
    return {
      currentPage: 0,
      hasMorePosts: 1,
      busy: false,
      interestOptions: [],
      modalMessage: '',
      showModal: false,
      showUnTaggedRecords: false
    }
  },
  computed: {
    ...mapGetters('assignTags', [
      'getAllPostsList',
      'getInterestOptions',
      'showAssignTagModal',
      'assignTagMessage'
    ])
  },
  methods: {
    ...mapMutations('assignTags', [
      'clearAllPreviousAssignTagData',
      'updateAssignTagModal'
    ]),
    ...mapActions('assignTags', [
      'fetchAllPostList',
      'fetchInterestsData',
      'savePostTags',
      'clearPostList'
    ]),

    getPageDetails() {
      let pageNumber = this.currentPage + 1
      let postPerPage = 10
      // let offset = (pageNumber - 1) * userPerPage
      let data = {
        pageNumber: pageNumber,
        postPerPage: postPerPage,
        untaggedRecords: this.showUnTaggedRecords
      }
      return data
    },
    callToFecthPostList() {
      if (
        this.currentPage == 0 ||
        (this.currentPage > 0 && this.hasMorePosts != null)
      ) {
        let data = this.getPageDetails()
        this.busy = true
        this.fetchAllPostList(data).then((result) => {
          this.currentPage = this.currentPage + 1
          this.busy = false
          this.hasMorePosts = result
        })
      }
    },
    AssignTagsTOPost(post_id, post_tags) {
      let reqData = {
        id: post_id,
        tags: post_tags
      }
      // eslint-disable-next-line no-unused-vars
      this.savePostTags(reqData).then((result) => {
        // this.modalMessage = 'Tags assigned successfully'
        // this.showModal = true
      })
    },
    onPostFilterChanged(value) {
      this.showUnTaggedRecords = value.isChecked
      this.currentPage = 0
      this.hasMorePosts = 1
      this.busy = false
      // this.modalMessage = ''
      // this.showModal = false
      this.clearPostList()
      this.callToFecthPostList()
    }
  },
  created() {
    this.clearAllPreviousAssignTagData()
    this.fetchInterestsData()
    this.interestOptions = this.getInterestOptions
    this.clearPostList()
    this.callToFecthPostList()
    if (this.interestOptions.length > 0) {
      for (var count = 0; count < this.interestOptions.length; count++) {
        this.interestOptions[count].display_string = `#${this.interestOptions[
          count
        ].display_string.replaceAll(' ', '')}`
      }
    }
  }
}
</script>

<style scoped>
.form-conatiner {
  max-width: 1100px;
}
.carousel .carousel-inner {
  width: 50% !important;
  height: 300px !important;
}
.AssignTags .vs--searchable .vs__dropdown-toggle {
  border-width: 1px !important;
  border-style: solid !important;
  border-color: #c4c4c4 !important;
}
div.vertical-line {
  width: 1px; /* Line width */
  background-color: rgba(0, 0, 0, 0.1); /* Line color */
  height: 80%; /* Override in-line if you want specific height. */
  float: left; /* Causes the line to float to left of content. 
        You can instead use position:absolute or display:inline-block
        if this fits better with your design */
  margin-top: 10%;
  margin-bottom: 10%;
}
</style>
