<template>
  <div class="main questions">

    <div class="numbers">
      <div class="numbers-inner">
        <router-link v-for="(question, index) in currentQuiz.questions"
          v-bind:to="'/quiz/'+ currentQuiz.id + '/question/'+ question.id">
          <p v-bind:class="{ 'current-que': question.id === currentQuestion.id }"
             class="button prev">
            {{question.number || 'Hd'}}
          </p>
        </router-link>
      </div>
    </div>

    <question :question="currentQuestion" :question-url="whatsappShareUrl"></question>

    <div class="footer">
      <router-link v-bind:to="previousQuestionUrl">
        <q-btn class="button prev">Prev</q-btn>
      </router-link>
      <router-link v-bind:to="nextQuestionUrl">
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
      },
      whatsappShareUrl () {
        return 'whatsapp://send?text=Checkout this past question ' +
          location.host + '/#/quiz/' + this.currentQuiz.id + '/question/' + this.currentQuestion.id
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
    margin-top 60px
    .numbers
      height 45px
      width 100%
      overflow auto
      overflow-y:hidden
      position fixed
      z-index 10
      background-color white
      p
        float left
        padding 5px
        border-radius 30px
        width 35px
        height 35px
        margin 5px
        color $dark-gray
      .current-que
        background-color $blue
        color white
    .numbers::-webkit-scrollbar {
      height: 3px;
      background-color: $white;
    }
    .numbers::-webkit-scrollbar-thumb {
      background-color: $dark-gray;
    }
    .numbers-inner
      display flex
      width auto
      position absolute
      background-color white

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
