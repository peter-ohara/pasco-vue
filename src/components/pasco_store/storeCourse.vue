<template>
 <div class="main">
   <div class="main store-course">
     <div class="main-details">
       <div class="test-details">
         <p class="course-code">
           {{ course.code }}
         </p>
         <p class="course-name">
           {{ course.name }}
         </p>
       </div>
     </div>
     <div class="content">
       <div class="test-breakdown">
         <div class="total-tests"><span class="test-count">{{ course.total_quiz_count }}</span> {{ course.total_quiz_count | pluralize('test') }}</div>
         <ul class="total-breakdown">
           <li><span class="test-count">{{ course.mid_sem_count }}</span> {{ course.total_quiz_count | pluralize('midsem') }}</li>
           <li><span class="test-count">{{ course.end_of_sem_count }}</span> {{ course.total_quiz_count | pluralize('end of sem') }}</li>
           <li><span class="test-count">{{ course.assignment_count }}</span> {{ course.total_quiz_count | pluralize('assignment') }}</li>
           <li><span class="test-count">{{ course.class_test_count }}</span> {{ course.total_quiz_count | pluralize('class test') }}</li>
         </ul>
       </div>
       <div class="test-list">
         <p class="list-title">Tests</p>
         <q-card class="card" v-for="quiz in course.quizzes">
           <div class="card-main">
             <p class="text card-title">
               {{quiz.name}}
             </p>
             <p class="text duration">{{quiz.duration}}  {{ quiz.duration | pluralize('hr') }}</p>
             <p class="text question-count">{{quiz.question_count}} Q</p>
           </div>
         </q-card>
       </div>
     </div>
     <div class="footer" @click="this.window.alert('You have purchased this course already')" v-if="isBoughtAlready">
       <q-btn flat class="buy-btn">You own this course</q-btn>
     </div>
     <div class="footer" @click="buyCourse(course)" v-else="isBoughtAlready">
       <q-btn flat class="buy-btn">
         Buy for &nbsp;
         <span class="price">
            <span class="figure">{{course.price}}</span>
            PG
          </span>
       </q-btn>
     </div>
   </div>
  </div>
</template>

<script>
import {
  QCard,
  QBtn,
  QSearch,
  QCardTitle,
  QCardMain,
  QIcon,
  QCardActions
} from 'quasar'

let pageData = {
  components: {
    QCard,
    QBtn,
    QSearch,
    QCardTitle,
    QCardMain,
    QIcon,
    QCardActions
  },
  data () {
    return {
      loading: true,
      keyword: '',
      course: {},
      courseId: this.$route.params.courseId
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

      let message = 'You are about to purchase ' +
        this.course.code + ' ' + this.course.name +
        '. This will cost you ' + this.course.price + ' pasco gold!'
      let confirmation = confirm(message)
      if (confirmation !== true) {
        return
      }

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
    },
    generateColor () {
      // function not in use at the moment
      return '#' + (Math.random().toString(16) + '000000').substring(2, 8)
    }
  },
  filters: {
    pluralize: function (number, word) {
      if (number === 1) {
        return word
      } else {
        return word + 's'
      }
    }
  }
}

export default pageData
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" >
  @import '~variables'

  .test-breakdown
    padding 10px
    margin-top 15px

  .test-count
    color $mid-gray

  .total-tests
    font-size: 20px
    .test-count
      font-size: 30px

  .total-breakdown
    overflow: auto
    padding-left 0px
    li
      display: block
      float: left
      width 33.33%

  .main-details
    height 165px
    background $primary
    overflow: auto

  .test-list
    margin-top 20px

  .test-details p
    color white
    text-align: center

  .list-title
    font-size 20px
    padding 10px

  .course
    &-code
      font-size: 40px
      font-weight: 200
      line-height: 40px
      margin-top: 40px

  .store-course
    .buy-btn
      margin: 0px auto
      display: block
      margin-top 7px
    .price
      background: white
      padding 7px 5px
      border-radius 4px
    .figure
      color $primary

</style>
