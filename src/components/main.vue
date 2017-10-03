<template>
 <div class="main">
    <div class="search-area">
      <q-search
        class="search-input"
        color="white"
        :inverted="true"
        :debounce="300"
        v-model="keyword"
        placeholder="Find a test"/>
    </div>
    <div class="trial-period">
      <p>Pasco is currently in the trial period till October 31st</p>
    </div>
    <div class="content">
      <router-link v-for="test in filterQuizzes"  v-bind:to="'quiz/'+ test.id" v-on:click.native="loadPage()">
        <q-card class="card">
          <div class="card-side">
            <div v-bind:class="{ blue: test.quiz_type === 'end_of_sem', green: test.quiz_type === 'mid_sem', orange: test.quiz_type === 'assignment'  }" class="card-icon">
              <p>
                {{ splitCourseCode(test.course_code)[1] }}
                <br>
                {{ splitCourseCode(test.course_code)[2] }}
              </p>
            </div>
          </div>
          <div class="card-main">
            <p class="text card-title">
              {{test.name}}
            </p>
            <p class="text duration">{{test.course_name}}</p>
            <p class="text question-count">{{test.question_count}}Q</p>
          </div>
        </q-card>
      </router-link>
    </div>
  </div>
</template>

<script>
import {
  QSearch,
  QCard
} from 'quasar'

let pageData = {
  components: {
    QSearch,
    QCard
  },
  data () {
    return {
      loading: true,
      keyword: '',
      timer: ''
    }
  },
  created () {
    if (this.$store.state.usersTests.length === 0) {
      this.$store.dispatch('getUsersTests')
    }
  },
  computed: {
    tests () {
      return this.$store.state.usersTests
    },
    filterQuizzes () {
      let self = this
      return this.tests.filter(function (test) {
        let searchData = (test.name + ' ' + test.course_name).toUpperCase()
        return searchData.indexOf(self.keyword.toUpperCase()) !== -1
      })
    }
  },
  methods: {
    splitCourseCode: function (courseCode) {
      return courseCode.match(/([a-zA-Z]*)([0-9]*)/)
    },
    loadPage: function () {
    }
  }
}

export default pageData
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
@import '~variables'

.search-area
  max-width 600px
  margin 0 auto 20px
  padding-left 8px
  padding-right 8px

  .search-input
    padding 10px
    width 100%

    .q-if-control
      color: $tertiary !important;
    .q-if-inner
      input
        color: black !important;

      input::-webkit-input-placeholder /* Chrome/Opera/Safari */
        color $tertiary !important

      input::-moz-placeholder  /* Firefox 19+ */
        color $tertiary !important

      input:-ms-input-placeholder  /* IE 10+ */
        color $tertiary !important

      input:-moz-placeholder  /* Firefox 18- */
        color $tertiary !important

.trial-period p
  text-align center
  color orange

.content, .trial-period
  max-width 600px
  margin 0px auto 10px

.card
  background white
  display flex
  padding 10px

.card-side
  width 20%
  max-width 200px
  min-width 80px

.card-icon
  background-color $info
  border-radius 50px
  height 60px
  width 60px
  margin-top 5px
  padding-bottom 15px
  padding-top 15px
  text-align center
  p
    line-height 1.2em
    color white
    font-size 0.8em

.text
  text-align left
  margin-bottom 0px

.question-count
  color $blue
  font-size 15px

.duration
  color $mid-gray

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
