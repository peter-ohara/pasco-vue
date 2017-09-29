<template>
  <div class="main test">
    <div class="main-details">
      <div class="icon"></div>
      <div class="test-details">
        <p class="name">{{ test.course_code }}</p>
        <p class="type-duration">
          {{ test.course_name }}
          <br>
          {{ test.year }} {{ getType(test.quiz_type) }}
          <br>
          {{ test.duration }} {{ test.duration | pluralize('hr') }}
        </p>
      </div>
    </div>
    <div class="secondary-details">
      <div class="section">
        <h2 class="section-title">Instructions</h2>
        <p class="section-content">{{test.instructions}}</p>
      </div>
    </div>
    <img src="~assets/load.svg" class="loading-icon" v-if="isPageLoading" alt="">
    <router-link v-bind:to="firstQuestionUrl">
      <div class="footer">
        <q-btn class="button">Start</q-btn>
      </div>
    </router-link>
  </div>
</template>

<script>
  import {
    QInput,
    QCard,
    QBtn
  } from 'quasar'

  let pageData = {
    components: {
      QInput,
      QCard,
      QBtn
    },
    computed: {
      isPageLoading () {
        return this.$store.state.loadingUsersTests
      },
      test () {
        return this.$store.state.currentQuiz
      },
      firstQuestionUrl () {
        if (this.$store.state.currentQuiz.questions.length > 0) {
          return '/quiz/' + this.$store.state.currentQuiz.id +
            '/question/' + this.$store.state.currentQuiz.questions[0].id
        } else {
          return ''
        }
      }
    },
    methods: {
      getType: function (type) {
        if (type === 'mid_sem') {
          return 'End of Semester'
        } else if (type === 'end_of_sem') {
          return 'Mid Sem'
        } else if (type === 'class_test') {
          return 'Class Test'
        } else if (type === 'assignment') {
          return 'Assignment'
        } else {
          return ''
        }
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
    },
    created () {
      this.$store.dispatch('getTestDetails', {
        quizId: parseInt(this.$route.params.quizId)
      })
    }
  }

  export default pageData
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
  @import '~variables'

  .test
    .main-details
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

    .secondary-details
      margin: 0 10px

    .section-title
      font-size 30px
      text-align left
    .section-title::after
      content ""
      display block
      width 30px
      height 2px
      background-color $blue
      margin-top 20px

    .section-content
      text-align left

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
