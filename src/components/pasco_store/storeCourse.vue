<template>
 <div class="main">
    <div class="content" v-if="course">
      <div class="main-details">
        <div class="icon"></div>
        <div class="test-details">
          <p class="name">{{ course.code }}</p>
          <p class="type-duration">
            {{ course.name }}
          </p>
        </div>
      </div>

      <quiz-item  v-for="quiz in course.quizzes" :quiz="quiz"></quiz-item>

      <div class="footer" @click="this.window.alert('You have purchased this course already')" v-if="isBoughtAlready">
        <q-btn class="button" icon="shop">You own this course</q-btn>
      </div>
      <div class="footer" @click="buyCourse(course)" v-else="isBoughtAlready">
        <q-btn class="button" icon="shop">Buy for 10 Pasco Gold</q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import {
  QSearch,
  QCard,
  QBtn
} from 'quasar'

import quizItem from './quizItem.vue'

let pageData = {
  components: {
    QSearch,
    QCard,
    QBtn,
    quizItem
  },
  data () {
    return {
      loading: true,
      keyword: '',
      course: {}
    }
  },
  computed: {
    isBoughtAlready () {
      return this.$store.state.entities.courses.byId
        .hasOwnProperty(this.$route.params.courseId)
    }
  },
  created () {
    let self = this
    self.$store.dispatch('fetchUserData').then(function (userData) {
      return self.$http.get('courses/' + self.$route.params.courseId + '?include=quizzes')
    }).then(function (data) {
      self.course = data.body.course
    }).catch(function (error) {
      console.log(error)
    })
  },
  methods: {
    buyCourse (course) {
      let self = this

      return this.$http.post('purchases', {course_id: course.id}).then(function (data) {
        return self.$store.dispatch('fetchUserData')
      }).then(function (userData) {
        alert('You have successfully purchased this course. Go to the main screen to see it.')
      }).catch(function (error) {
        console.log(error)
        alert('There was an error purchasing this course.')
        // TODO: Handle not enough pascoGold
        // TODO: Handle network error
        // TODO: Handle not sighned in
      })
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

.content
  max-width 600px
  margin 0px auto 10px

  .main-details
    text-align center
    height 150px
    background teal
    p
      color white

  .test-details
    overflow auto

  .name
    font-size 30px
    font-weight 100
    margin-top 30px

  .type-duration
    text-align center

  .vertical-bar
    background-color white
    width 2px
    height 20px
    display inline-block
    margin 5px 10px -4px

.footer
  position fixed
  bottom 0
  width 100%
  height 50px
  background-color teal
  .button
    color white
    width 100%
    height 50px
    margin-top 0
</style>
