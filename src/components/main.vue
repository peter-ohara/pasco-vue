<template>
 <div class="main">
    <div class="search-area">
      <q-card @click="open" class="search-container">
        <q-input
          v-model="keyword"
          placeholder="Find a test"
          :loading="loading"
          @change="searchTests(keyword)"/>
      </q-card>
    </div>
    <div class="content">
      <q-card v-for="test in tests" class="card">
        <div class="card-side">
          <div v-bind:class="{ blue: test.quiz_type == 'end_of_sem', green: test.quiz_type == 'mid_sem', orange: test.quiz_type == 'assignment',  }" class="card-icon">
            <p v-if="test.quiz_type == 'end_of_sem'">ES</p>
            <p v-if="test.quiz_type == 'mid_sem'">MS</p>
            <p v-if="test.quiz_type == 'assignment'">A</p>
          </div>
        </div>
        <div class="card-main">
          <p class="text card-title">
            {{test.name}}
          </p>
          <p class="text duration">{{test.duration}} hr</p>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
import {
  QInput,
  QCard
} from 'quasar'

var pageData = {
  components: {
    QInput,
    QCard
  },
  data(){
    return{
      name: 'hello',
      loading: true,
      keyword: "",
      tests: [],
      timer: ""
    }
  },
  methods: {
    getTests: function(keyword){
      console.log('get tests')
      var url = 'https://pasco-api-staging.herokuapp.com/quizzes'+(keyword ? '?by_name='+keyword : '')

      this.$http.get(url).then(function(data){
        console.log(data)
        this.loading = false;
        this.tests = data.body.quizzes
      })
    },
    searchTests: function(keyword){
      clearTimeout(this.timer)
      var fxn = this;

      this.timer = setTimeout(function(){
        fxn.getTests(keyword)
      }, 200)
    }
  },
  created(){
    //console.log('page loaded')
    this.getTests()
  }
}

export default pageData


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
@import '~variables'

.search-area
  height 45px
  position fixed
  top 50px
  width 100%
  .search-container
    height 45px
    background white
  input
    height 40px
    padding 5px 10px 0px


.content
  margin-top 120px

.card
  background white
  display flex
  padding 10px
  max-width 600px
  margin 0px auto 10px

.card-side
  width 20%
  max-width 200px
  min-width 80px

.card-icon
  background-color $info
  border-radius 50px
  height 60px
  width 60px
  p
    line-height 60px
    color white
    font-size 22px
    font-weight 100

.text
  text-align left
  margin-bottom 0px

.duration
  color blue

.card-title
  color $dark-gray
  font-size 18px


.blue
  background-color $blue

.orange
  background-color $orange

.green
  background-color $green
</style>
