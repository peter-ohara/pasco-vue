<template>
 <div class="main">
   <div class="main store-course">
     <div class="main-details">

       <div class="test-details">
         <div class="row">
           <div class="col-xs-4">
             <img class="school-logo shadow-5" src="../../assets/logo-knust.png" width="80px" height="80px">
           </div>
           <div class="col-xs-8 course-info">
             <p class="course-code">
               {{ course.code }}
             </p>
             <p class="course-name">
               {{ course.name }}
             </p>
         </div>
         </div>
        <div class="row">
          <p class="col-xs-12 is-bought-already" v-if="isBoughtAlready">
            You have purchased this course
          </p>
        </div>
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
     <router-link v-bind:to="{ name: 'course', params: {courseId: course.id} }" v-if="isBoughtAlready">
       <div class="footer">
         <q-btn flat class="buy-btn">View Course</q-btn>
       </div>
     </router-link>
     <div class="footer" @click="buyCourseConfirmation(course)" v-else="isBoughtAlready">
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
  QCardActions,
  Loading,
  Toast,
  Alert
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
    this.$store.state.entities.isStale = true
    self.$store.dispatch('fetchUserData').then(function (userData) {
      Loading.show()
      return self.$http.get('courses/' + self.$route.params.courseId + '?include=quizzes')
    }).then(function (data) {
      Loading.hide()
      self.course = data.body.course
    }).catch(function (error) {
      Loading.hide()
      console.log(error)
    })
  },
  methods: {
    buyCourseConfirmation (course) {
      let self = this
      Alert.create({
        html: 'You are about to purchase <br><strong>' + this.course.code + ' ' + this.course.name +
        '</strong>. <br>This will cost you <strong>' + this.course.price + ' Pasco Gold. </strong>',
        color: 'warning',
        actions: [
          {
            label: 'Cancel',
            handler () {
            }
          },
          {
            label: 'Buy Course',
            handler () {
              self.buyCourse(course)
            }
          }
        ]
      })
    },
    buyCourse (course) {
      let self = this

      Loading.show()
      return this.$http.post('purchases', {course_id: course.id}).then(function (data) {
        this.$store.state.entities.isStale = true
        return self.$store.dispatch('fetchUserData')
      }).then(function (userData) {
        Loading.hide()
        Toast.create({
          html: 'Purchase successful',
          button: {
            label: 'View Course',
            handler () {
              self.$router.push({ name: 'course', params: {courseId: course.id} })
            }
          }
        })
      }).catch(function (error) {
        Loading.hide()
        console.log(error)
        if (error.status === 422 &&
          error.body.user[0] === 'does not have enough pasco gold to purchase this course') {
          Alert.create({
            html: 'Not enough Pasco Gold to purchase this course',
            actions: [
              {
                label: 'Cancel',
                handler () {
                }
              },
              {
                label: 'Buy Pasco Gold',
                handler () {
                  self.$router.push({ name: 'buyPG' })
                }
              }
            ]
          })
        } else {
          Toast.create('There was an error purchasing this course')
        }
        // TODO: Handle network error
        // TODO: Handle not signed in
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
<style lang="stylus" scoped>
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
    margin 0 auto

  .test-details
    max-width 600px !important
    padding 30px
    margin 0 auto

  .test-details p
    color white
    text-align: left
    margin 0 auto

  .list-title
    font-size 20px
    padding 10px

  .course
    &-code
      font-size: 40px
      font-weight: 200
      line-height: 50px
      margin-top: 40px
      vertical-align middle

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

  .school-logo
    float right
    margin-right 20px
    border-radius 2px

  .is-bought-already
    text-align center !important
    padding 10px 0px !important

  .course-info
    padding-left 10px

  .card-main
    padding-left 10px

</style>
