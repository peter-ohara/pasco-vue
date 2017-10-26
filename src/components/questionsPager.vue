<template>
  <div class="main questions">

    <div class="bookmark-area">
      <q-btn
        class="bookmark-btn"
        v-bind:class="{tertiary: !isBookmarked, primary: isBookmarked}"
        icon="star"
        @click="toggleBookmark()"
        small
      >
        Bookmark
      </q-btn>
    </div>

    <question :question="currentQuestion"></question>

    <comments class="comments-container"
              shortname="pascoapp" :identifier="'question-' + $route.params.questionId" :url="currentQuestionUrl">
    </comments>

    <div class="footer">
      <router-link v-bind:to="previousQuestionUrl" replace>
        <q-btn class="button prev">Prev</q-btn>
      </router-link>
      <router-link v-bind:to="nextQuestionUrl" replace>
        <q-btn class="button next">Next</q-btn>
      </router-link>
    </div>

  </div>
</template>

<script>
  import Question from '@/question.vue'
  import Comments from '@/comments.vue'

  import {
    QBtn,
    Dialog
  } from 'quasar'

  let pageData = {
    components: {
      Question,
      Comments,
      QBtn
    },
    computed: {
      isPageLoading () {
        return this.$store.state.quiz.loadingUsersQuizzes
      },
      currentQuiz () {
        return this.$store.state.quiz.currentQuiz
      },
      currentQuestionUrl () {
        return 'https://app.pascoapp.com/' + this.$route.path
      },
      currentQuestion () {
        return this.$store.state.question.currentQuestion
      },
      previousQuestionUrl () {
        if (this.$store.state.quiz.currentQuiz.id === 0) {
          return ''
        } else {
          let currentQuestionIndex = this.$store.state.quiz.currentQuiz.questions
            .findIndex(question => question.id === parseInt(this.$route.params.questionId))

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

          return '/quiz/' + this.$store.state.quiz.currentQuiz.id + '/question/' +
            this.$store.state.quiz.currentQuiz.questions[previousQuestionIndex].id
        }
      },
      nextQuestionUrl () {
        if (this.$store.state.quiz.currentQuiz.id === 0) {
          // currentQuiz hasn'y been loaded yet
          return ''
        } else {
          let currentQuestionIndex = this.$store.state.quiz.currentQuiz.questions
            .findIndex(question => question.id === parseInt(this.$route.params.questionId))

          let nextQuestionIndex

          if (currentQuestionIndex === -1) {
            // no question
            console.log('Question with id' + currentQuestionIndex + ' doesn\'t exist in this quiz')
          } else if (currentQuestionIndex === this.$store.state.quiz.currentQuiz.questions.length - 1) {
            // last question
            nextQuestionIndex = currentQuestionIndex
          } else {
            nextQuestionIndex = currentQuestionIndex + 1
          }

          return '/quiz/' + this.$store.state.quiz.currentQuiz.id + '/question/' +
            this.$store.state.quiz.currentQuiz.questions[nextQuestionIndex].id
        }
      },
      isBookmarked () {
        return this.$store.state.bookmarks.bookmarks
          .hasOwnProperty(this.currentQuestion.id)
      }
    },
    methods: {
      toggleBookmark () {
        if (this.isBookmarked) {
          this.$store.dispatch('removeBookmark', this.currentQuestion.id)
        } else {
          this.$store.dispatch('addBookmark', this.currentQuestion)
        }
      },
      checkTimer () {
        if (this.$store.state.timer.isTimerOn && this.$store.state.timer.timer === '00:00:00') {
          // start timer
          let date = new Date(this.$store.state.quiz.currentQuiz.duration * 60 * 60 * 1000)
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
      let payload = {
        quizId: parseInt(this.$route.params.quizId),
        questionId: parseInt(this.$route.params.questionId)
      }
      this.$store.dispatch('loadQuestion', payload)
    },
    watch: {
      '$route' (to, from) {
        // react to route changes...
        let payload = {
          quizId: parseInt(this.$route.params.quizId),
          questionId: parseInt(this.$route.params.questionId)
        }
        this.$store.dispatch('loadQuestion', payload)
      }
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
<style lang="stylus">
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

  .bookmark-area
    margin 10px
    overflow auto

  .bookmark-btn
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
