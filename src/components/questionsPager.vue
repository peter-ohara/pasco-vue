<template>
  <div class="main questions">
    <div class="bookmark-area">
      <q-btn
        class="bookmark-btn"
        v-bind:class="{tertiary: !isBookmarked, primary: isBookmarked}"
        icon="star"
        @click="editBookmark()"
        small
        >
        Bookmark
      </q-btn>
    </div>
    <question :question="currentQuestion"></question>

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

  import {
    QBtn
  } from 'quasar'

  let pageData = {
    components: {
      Question,
      QBtn
    },
    computed: {
      isPageLoading () {
        return this.$store.state.loadingUsersTests
      },
      currentQuiz () {
        return this.$store.state.currentQuiz
      },
      currentQuestion () {
        return this.$store.state.currentQuestion
      },
      previousQuestionUrl () {
        return this.$store.state.previousQuestionUrl
      },
      nextQuestionUrl () {
        return this.$store.state.nextQuestionUrl
      }
    },
    data () {
      return{
        isBookmarked: false
      }
    },
    methods: {
      editBookmark () {
        this.isBookmarked = !this.isBookmarked

        //If bookmark removed
        if(!this.isBookmarked){
          this.$store.dispatch('removeBookmark', this.currentQuestion.id)
        } else{
          //console.log("Bookmark pay load before dispatch", this.currentQuestion);
          const question = this.currentQuestion;
          question.quiz_name = this.currentQuiz.name
          this.$store.dispatch('addBookmark', this.currentQuestion)
        }
      },
      checkBookmark () {
        this.isBookmarked = this.currentQuestion.id in this.$store.state.bookmarks
      },
      checkTimer () {
        if (this.$store.state.isTimerOn) {
          //start timer
          let date = new Date(this.$store.state.currentQuiz.duration*60*60*1000)
          setInterval(() => {
            this.$store.dispatch("setTimer", ('0'+date.getHours()).slice(-2) + " : "+ ('0'+date.getMinutes()).slice(-2) + " : "+ ('0'+date.getSeconds()).slice(-2))
            date.setSeconds(date.getSeconds() - 1)
          }, 1000)

        }
      }
    },
    created () {
      this.$store.dispatch('getQuestion', {
        quizId: parseInt(this.$route.params.quizId),
        questionId: parseInt(this.$route.params.questionId)
      })
    },
    watch: {
      '$route' (to, from) {
        // react to route changes...
        this.$store.dispatch('getQuestion', {
          quizId: parseInt(this.$route.params.quizId),
          questionId: parseInt(this.$route.params.questionId)
        })

        this.checkBookmark()
      }
    },
    mounted () {
      const self = this
      this.$store.dispatch('getBookmarks').then(function(){
        self.checkBookmark()
      })
      this.checkTimer()
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
</style>
