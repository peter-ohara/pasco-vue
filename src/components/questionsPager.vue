<template>
  <div class="main questions">

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
    methods: { },
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
</style>
