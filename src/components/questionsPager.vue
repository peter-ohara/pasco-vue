<template>
  <div class="main questions" v-touch-swipe.horizontal="swipeHandler">
    <template v-if="quiz">
      <question :question="question($route.params.questionId)"></question>
      <div class="comments-container">
        <q-list>
          <q-collapsible icon="list" label="Explanation">
            <explanation
              class="exp-component"
              :question="question()">
            </explanation>
          </q-collapsible>
          <q-collapsible icon="chat" label="Discussion">
            <comments shortname="pascoapp"
                      :identifier="'question-' + $route.params.questionId"
                      :url="canonicalUrlForQuestion">
            </comments>
          </q-collapsible>
        </q-list>
      </div>


      <div class="footer">
        <router-link v-bind:to="previousQuestionUrl" replace>
          <q-btn class="button prev">Prev</q-btn>
        </router-link>
        <router-link v-bind:to="nextQuestionUrl" replace>
          <q-btn class="button next">Next</q-btn>
        </router-link>
      </div>

    </template>
  </div>
</template>

<script>
  import Question from '@/question.vue'
  import Comments from '@/comments.vue'
  import Explanation from '@/explanation.vue'

  import {
    QBtn,
    Dialog,
    QList,
    QCollapsible,
    TouchSwipe
  } from 'quasar'

  let pageData = {
    components: {
      Question,
      Comments,
      Explanation,
      QBtn,
      QList,
      QCollapsible
    },
    directives: {
      TouchSwipe
    },
    computed: {
      quiz () {
        return this.$store.state.entities.quizzes
          .byId[this.$route.params.quizId]
      },
      canonicalUrlForQuestion () {
        return 'https://app.pascoapp.com/quiz/' + this.$route.params.quizId +
          '/question/' + this.$route.params.questionId
      },
      previousQuestionUrl () {
        let currentQuestionIndex = this.quiz.questions
          .findIndex(questionId => questionId === parseInt(this.$route.params.questionId))

        let previousQuestionIndex

        if (currentQuestionIndex === -1) {
          // no question
          console.log('Question with id' + currentQuestionIndex + ' doesn\'t exist in this quiz')
        } else if (currentQuestionIndex === 0) {
          // first question
          previousQuestionIndex = currentQuestionIndex
        } else {
          previousQuestionIndex = currentQuestionIndex - 1
        }

        return {
          name: 'question',
          params: {
            quizId: this.$route.params.quizId,
            questionId: this.quiz.questions[previousQuestionIndex]
          }
        }
      },
      nextQuestionUrl () {
        let currentQuestionIndex = this.quiz.questions
          .findIndex(questionId => questionId === parseInt(this.$route.params.questionId))

        let nextQuestionIndex

        if (currentQuestionIndex === -1) {
          // no question
          console.log('Question with id' + currentQuestionIndex + ' doesn\'t exist in this quiz')
        } else if (currentQuestionIndex === this.quiz.questions.length - 1) {
          // last question
          nextQuestionIndex = currentQuestionIndex
        } else {
          nextQuestionIndex = currentQuestionIndex + 1
        }

        return {
          name: 'question',
          params: {
            quizId: this.$route.params.quizId,
            questionId: this.quiz.questions[nextQuestionIndex]
          }
        }
      }
    },
    methods: {
      swipeHandler (obj) {
        // console.log(obj.direction) // "right"
        // console.log(obj.duration) // 78
        // console.log(obj.distance.x) // 273
        if (obj.direction === 'right') {
          this.$router.push(this.previousQuestionUrl)
        } else if (obj.direction === 'left') {
          this.$router.push(this.nextQuestionUrl)
        }
      },
      question (questionId) {
        return this.$store.state.entities.questions
          .byId[this.$route.params.questionId]
      },
      getTabUrl (questionId) {
        return '/quiz/' + this.$route.params.quizId + '/question/' + questionId
      },
      getTabLabel (questionId) {
        let question = this.question(questionId)
        return question.question_type === 'header' ? question.title : question.number
      },
      checkTimer () {
        if (this.$store.state.timer.isTimerOn && this.$store.state.timer.timer === '00:00:00') {
          // start timer
          let date = new Date(this.quiz.duration * 60 * 60 * 1000)
          this.$store.dispatch('startTimer', setInterval(() => {
            if (!(date.getHours() + date.getMinutes() + date.getSeconds())) {
              // time is up
              this.timeUpDialog()
              this.clearTimer()
            }
            this.$store.dispatch('setTimer',
              ('0' + date.getHours()).slice(-2) + ' : ' +
              ('0' + date.getMinutes()).slice(-2) + ' : ' +
              ('0' + date.getSeconds()).slice(-2)
            )
            date.setSeconds(date.getSeconds() - 1)
          }, 1000))
        }
      },
      timeUpDialog () {
        Dialog.create({
          title: 'Alert',
          message: 'Your time is up'
        })
      },
      clearTimer () {
        this.$store.dispatch('clearTimer')
      }
    },
    created () {
      console.log('this.$route.params', this.$route.params)
      this.$store.dispatch('fetchUserData').catch(function (error) {
        console.error('There was an error running action fetchUserData', error)
      })
    },
    mounted () {
      this.$store.dispatch('getBookmarks').then(function (bookmarks) {
        console.log('Something wicked this way comes', bookmarks)
      }).catch(error => {
        console.error(error)
      })
      this.checkTimer()
    },
    beforeRouteLeave (to, from, next) {
      // called when the route that renders this component is about to
      // be navigated away from.
      // has access to `this` component instance.

      if (!to.fullPath.startsWith('/bookmark') && this.$store.state.timer.isTimerOn) {
        const answer = window.confirm('You are in the middle of a timed quiz. if you leave, the timer will be reset. Do you still want to leave?')

        if (answer) {
          this.clearTimer()
          next()
        } else {
          next(false)
        }
      } else {
        next()
      }
    }
  }

  export default pageData
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import '~variables'

  .questions
    min-height 300px

    .footer
      position fixed
      bottom 0
      width 100%
      height 50px
      background-color teal
      .button
        color white
        width 50%
        height 50px
        margin-top 0
      .prev
        float left
      .next
        float right

  .tertiary
    background-color $neutral

  .primary
    background-color $primary
    color white

  .comments-container
    max-width 600px
    margin 16px auto 82px
    padding-left: 8px
    padding-right: 8px


</style>
