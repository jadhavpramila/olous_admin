<template>
  <div class="Post-view">
    <!--<div class="" :key="post_Data">-->
    <div class="">
      <div>
        <!-- USer details -->
        <div class="py-3" 
        style="display: flex;
                flex-direction: row;
                flex-wrap: wrap;">
          <div class="" style="display: flex;flex-direction: row;align-items: center;">
            <img
              alt=""
              :src= "post_Data.author.profile_image"
              class="w-10 h-10 "
              style="object-fit: cover;object-position: center;border-radius: 9999px;display: inline-block;background-color: rgba(243, 244, 246, var(--tw-bg-opacity));width: 2.5rem;height: 2.5rem;"
            />
            <div class="ml-4">
              <div class="text-lg leading-5">{{post_Data.author.first_name}} {{post_Data.author.last_name}}</div>
              <div class="text-sm">
                {{getUserSubTitle()}}
              </div>
            </div>
          </div>
          <!-- <div class="ml-auto font-light text-sm hidden">1 hr</div> -->
        </div>

        <!-- subtitle -->
        <div class="post-subtitle"  v-if="post_Data.media_type != media_type.TEXT">
          <read-more class="pb-3"
            more-str="read more" :text="getdataInHtML()" link="#" less-str="read less" :max-chars="120"></read-more>
        </div>

        <!-- Text media -->
        <div class="post-subtitle" v-if="post_Data.media_type == media_type.TEXT">
        <read-more class="pb-3" 
          more-str="read more" :text="getdataInHtML()" link="#" less-str="read less" :max-chars="500"></read-more>
        </div>
        <!-- image viewer -->
        <div v-if="post_Data.media_type == media_type.IMAGE && post_Data.numberOfMedias > 1">
          <div>
            <b-carousel
              id="carousel-1"
              v-model="slide"
              :interval="90000"
              controls
              indicators
              background="#ababab"
              style="text-shadow: 1px 1px 2px #333"
              @sliding-start="onSlideStart"
              @sliding-end="onSlideEnd"
            >
              <b-carousel-slide v-for="(media, counter) in post_Data.media" :key="counter"
                :img-src="getImageURL(media.media_details.name)"
              ></b-carousel-slide>
            </b-carousel>
          </div>
        </div>

        <!-- Single image -->
        <div v-if="post_Data.media_type == media_type.IMAGE && post_Data.numberOfMedias == 1" class="single-img-div">
          <img v-if="post_Data.media.length > 0"
          
            :src= "getImageURL(getImageURLFormFirstMedia())"
            class="w-full object-cover h-full"
            style="width: 100%;object-fit: cover;height:100%"
          />
        </div>

        <!-- Video -->
        <div v-if="post_Data.media_type == media_type.VIDEO || post_Data.media_type == media_type.COVER_IMAGE" class="video_div">
          <!--autoplay="autoplay"-->
           <div v-if="showCoverImage"  class="single-img-div " >
            <img  
               
                :src= "getImageURL(post_Data.cover_image)"
                class="w-full object-cover h-full"
                style="width: 100%;object-fit: cover;height:100%"
              />
              <i v-if="post_Data.is_play_video != false" class="fa fa-play-circle  fa-4x cursor-pointer  playIcon" aria-hidden="true" @click="showVideo(post_Data)" ></i>
          </div>

          <div v-view="viewHandler">
            <video autoplay v-if="!showCoverImage" controls="controls" class="ml-0 mr-auto outline-none">
              <source
                :src="getVideoURLFromCoverImageMedia(post_Data)"
                type="video/mp4"
                controlslist="nodownload"
              />
            </video>
          </div>
        </div>

        <!-- cover image Video
        <div v-if="post_Data.media_type == media_type.COVER_IMAGE " class="video_div">
          <video controls="controls" class="ml-0 mr-auto outline-none">
            <source
              :src="getVideoURLFromCoverImageMedia(post_Data)"
              type="video/mp4"
              controlslist="nodownload"
            />
          </video>
        </div> -->

        <!--pdf viewer -->
        <div v-if="post_Data == 1">
          <embed
            class="pdf_view w-full"
            src="https://daifhb63cb3v5.cloudfront.net/media/documents/1613099445550.pdf"
          >
            <noembed>
              <label style="align : center">Not supporting to pdf</label>
            </noembed>
          </embed>
        </div>

        <!-- URL midea -->
        <div v-if="post_Data.media_type == media_type.URL" class="single-img-div">
          <a
              :href="post_Data.url"
              target="_blank"
              class="py-4 text-gray-700 text-xs"
              >
                <img v-if="post_Data.media.length > 0"
                
                  :src= "getImageURL(getImageURLFormFirstMedia())"
                  class="w-full object-cover h-full"
                  style="width: 100%;object-fit: cover;height:100%"
                  
                />
            </a>
        </div>

        <!--post info viewer -->
        <div class="pb-1 mt-4">
         {{post_Data.title}}
        </div>

        <!-- Link -->
        <div>
          <a
            :href="post_Data.url"
            target="_blank"
            class="py-4 text-gray-700 text-xs"
            >{{getHostName()}}</a
          >
        </div>

        <!-- Likes & comments -->
        <div class="flex flex-wrap flex-row" 
              style="display:flex;flex-direction: row;flex-wrap: wrap;">
          <div class="flex flex-row items-center" 
              style="display:flex;flex-direction: row;align-items: center;">
            <div
              class="w-12 h-12 rounded-full bg-transparnat inline-flex items-center justify-center text-gray-900"
              style="width: 3rem;height: 3rem;border-radius: 9999px;background-color: transparent;display: inline-flex;align-items: center;justify-content: center;color: rgba(17, 24, 39, var(--tw-text-opacity))"
            >
              <img
                      class=""
                      src="../../assets/img/Star.svg"
                      title=""
                    />
              <span class="pl-3">{{post_Data.numberOfLikes}}</span>
            </div>

            <div
              class="w-12 h-12 ml-5 rounded-full bg-transparnat inline-flex items-center justify-center text-gray-900"
              style="width: 3rem;height: 3rem;border-radius: 9999px;background-color: transparent;display: inline-flex;align-items: center;justify-content: center;color: rgba(17, 24, 39, var(--tw-text-opacity))"
            >
              <img
                      class=""
                      src="../../assets/img/Comment.svg"
                      title=""
                    />
              <span class="pl-3">{{post_Data.numberOfComments}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import appConstants from '../../appConstants.js'

export default {
  name: 'Posts',
  props: ['post'],
  data() {
    return {
      slide: 0,
      sliding: null,
      selectedTag: [],
      media_type: appConstants.media_Type,
      post_Data :"",
      showCoverImage : false
    }
  },
  computed: {},
  methods: {
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    },
    getHostName(){
      var fullurl = this.post_Data.url
      var j = fullurl.indexOf("://");
      var host = "";
      for (var i = j + 3; i < fullurl.length; i++) {
          if (fullurl.charAt(i) != '/') {
              host = host + "" + fullurl.charAt(i);
          } else {
              break;
          }
      }
      return host
    },
    getImageURL(imageFileNAme){
      if(imageFileNAme.trim() == "")
      {
           return ""
      }
      else
      {
           return  `${process.env.VUE_APP_MEDIA_IMGURL}${imageFileNAme}`
      }
    },
    getVideoURL(videoFileNAme){
      return  `${process.env.VUE_APP_MEDIA_VIDEOURL}${videoFileNAme}`
    },
    getVideoURLFromCoverImageMedia(){

      for(var i = 0 ; i < this.post_Data.media.length; i++){
         if(this.post_Data.media[i].media_details.mediaType == this.media_type.VIDEO){
             return this.getVideoURL(this.post_Data.media[i].media_details.name)
           }
      }
    },
    getdataInHtML(){
      return this.post_Data.content.replace(/\n/g, "<br />")
    },
    showVideo(){
      this.showCoverImage = false;
    },
    getUserSubTitle(){
      if(this.post_Data.author.about == "" ){
        return this.post_Data.author.designation
      }else{
        return this.post_Data.author.about
      }
    },
    viewHandler(e){

      var removeHeaderSpace = 100
      if(e.percentInView == 1 && e.target.rect.top >= removeHeaderSpace)
      {
        this.showCoverImage = false;
      }else{
        this.showCoverImage = true;
      }
     
    },
    // getCoverImageWidth(){
    //   for(var i = 0 ; i < this.post_Data.media.length; i++){
    //      if(this.post_Data.media[i].media_details.mediaType == this.media_type.VIDEO){
    //          return this.getVideoURL(this.post_Data.media[i].media_details.width)
    //        }
    //   }
    // }

    getImageURLFormFirstMedia(){
      if(this.post_Data.media.length > 0){
        return this.post_Data.media[0].media_details.name
      }else{
        return ""
      }

    }
  },
  created() {
    this.post_Data = this.post;
    if(this.post_Data.cover_image.length > 0){
          this.showCoverImage = true;
    }
  }
}
</script>

<style scoped>
.carousel .carousel-inner {
  width: 50% !important;
  height: 300px !important;
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
