<template>
<div class="main test">
  <div class="main-details">
    <div class="icon"></div>
    <div class="test-details">
      <p class="name">{{getName(test.name)}}</p>
      <p class="type-duration" v-if="test.duration" >
        {{test.year+" "+getType(test.quiz_type)}}
        <span class="vertical-bar"></span>{{test.duration + ' h'}}
      </p>
    </div>
  </div>
  <div class="secondary-details">
    <div class="section">
      <h2 class="section-title">Instructions</h2>
      <p class="section-content">{{test.instructions}}</p>
    </div>
  </div>
  <img src="~assets/load.svg" class="loading-icon" v-if="isPageLoading" alt="">
  <router-link v-bind:to="'/questions/'+ test.id">
    <div class="footer">
      <q-btn class="button">Start</q-btn>
    </div>
  </router-link>
</div>
</template>

<script>
import {
  QInput,
  QCard,
  QBtn
} from 'quasar'

var pageData = {
  components: {
    QInput,
    QCard,
    QBtn
  },
  data(){
    return{
      id: this.$route.params.id,
      test: {
        id: 0,
        name: "",
        quiz_type: "",
        year: "",
        duration: ""
      },
      isPageLoading: true
    }
  },
  methods: {
    getTest: function(){
      console.log('get test')
      var url = 'https://pasco-api-staging.herokuapp.com/quizzes/'+this.id

      this.$http.get(url).then(function(data){
        console.log(data)
        this.loading = false;
        this.test = data.body.quiz;
        this.isPageLoading = false
      })
    },
    getName: function(name){
      var arr = name.split(" ");
      delete arr[arr.length - 1];
      return arr.join(" ");
    },
    getType: function(type){
      if(type == "end_of_sem")
        return "End of Semester"
      else if(type == "mid_sem")
        return "Mid Sem"
      else
        return ""
    }
  },
  created(){
    //console.log('page loaded')
    this.$isPageLoading = true;
    this.getTest()
  }
}

export default pageData


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
@import '~variables'

.test
  .main-details
    height 150px
    background teal
    margin-top 59px
    p
      color white

  .test-details
    overflow auto

  .name
    font-size 30px
    font-weight 100
    margin-top 50px

  .type-duration
    text-align center

  .vertical-bar
    background-color white
    width 2px
    height 20px
    display inline-block
    margin 5px 10px -4px

  .secondary-details
    margin: 0px 10px

  .section-title
    font-size 30px
    text-align left
  .section-title::after
    content ""
    display block
    width 30px
    height 2px
    background-color $blue
    margin-top 20px

  .section-content
    text-align left

  .footer
    position fixed
    bottom 0px
    width 100%
    height 50px
    background-color teal
    .button
      color white
      margin-top 10px
      width 100%
      height 50px
      margin-top 0px
</style>
