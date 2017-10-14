<template>
  <div class="bookmarks">
    <div class="screen-header">
      <p>Bookmarks</p>
    </div>
    <div class="content">
      <p class="empty-list" v-if="!(Object.keys(bookmarks).length)">Looks like you have not bookmarked anything yet.<br> <span>Go to the homepage, pick a test and start bookmarking questions you want to revisit</span></p>
      <router-link
        v-for="bookmark in bookmarks"
        v-bind:to="bookmark.links.quiz.replace('quizzes', 'quiz')+bookmark.links.self.replace('questions', 'question')">
        <q-card class="card">
<!--
          <div class="card-side">
            <div v-bind:class="{ blue: bookmark.quiz_type === 'end_of_sem', green: bookmark.quiz_type === 'mid_sem', orange: bookmark.quiz_type === 'assignment'  }" class="card-icon">
              <p>
                {{ splitCourseCode(bookmark.course_code)[1] }}
                <br>
                {{ splitCourseCode(bookmark.course_code)[2] }}
              </p>
            </div>
          </div>
-->
          <div class="card-main">
            <p class="text card-title" v-html="bookmark.quiz_name"></p>
            <p class="text question" v-html="bookmark.question || bookmark.content"></p>
            <p class="text duration">{{bookmark.question_type}}</p>
            <p class="text question-count"><span v-if="bookmark.number">No.</span> {{bookmark.number}}</p>
          </div>
        </q-card>
      </router-link>
    </div>
  </div>
</template>


<script>
  import {
    QInnerLoading,
    QTransition,
    QOptionGroup,
    QInput,
    QBtn,
    QCard
  } from 'quasar'

  let pageData = {
    components: {
      QInnerLoading,
      QTransition,
      QOptionGroup,
      QInput,
      QBtn,
      QCard
    },
    computed: {
      bookmarks () {
        //console.log(this.$store.state.bookmarks)
        if (this.$store.state.isTimerOn) {
          //If timer is on, get bookmarks that are in the current quiz
          let bookmarks = {};
          const allBookmarks = this.$store.state.bookmarks
          Object.keys(allBookmarks).map((key) => {
            if (allBookmarks[key].quiz_id === this.$store.state.currentQuiz.id) {
              bookmarks[key] = allBookmarks[key]
            }
          })

          console.log("FILTERED", bookmarks)
          this.renderMath()
          return bookmarks
        } else {
          this.renderMath()
          return this.$store.state.bookmarks
        }
      }
    },
//    data () {
//      return {
//        bookmarks: this.$store.state.bookmarks
//      }
//    },
    methods: {
      splitCourseCode: function (courseCode = "") {
        return courseCode.match(/([a-zA-Z]*)([0-9]*)/)
      },
      renderMath: function () {
        this.$nextTick(function () {
          // eslint-disable-next-line no-undef,eqeqeq
          if (typeof (katex) != 'undefined') AMfunc(true)
        })
      }
    },
    created () {
      this.renderMath()
      this.$store.dispatch('getBookmarks')
    },
    beforeRouteLeave (to, from, next) {
      // called when the route that renders this component is about to
      // be navigated away from.
      // has access to `this` component instance.


      if (!to.fullPath.includes("/question") && this.$store.state.isTimerOn) {
        const answer = window.confirm('You are in the middle of a timed quiz. if you leave, the timer will be reset. Do you still want to leave?')

        if (answer) {
          this.$store.dispatch('clearTimer')
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


<style lang="stylus">
  @import '~variables'

  .bookmarks
    width 100%

    .content
      margin-top 0px

    .card
      overflow hidden

    .empty-list
      text-align center
      color orange
      padding 10px
      span
        color $mid-gray

    .card-title, .question
      text-overflow ellipsis
      word-wrap break-word
      overflow hidden !important
      max-height 1.8em
      line-height 1.8em
      -webkit-line-clamp 1
      overflow hidden
      display -webkit-box
      -webkit-box-orient vertical
      font-weight 400
      color $primary

    .question
      color $dark-gray
      font-weight 400
      font-size 15px
      p
        font-size 15px
    .duration
      float left
      font-size 15px

    .question-count
      color $secondary
      font-size 15px
      float left
      margin-left 5px

</style>
