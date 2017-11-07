<template>
  <div class="main test">
    <template v-if="quiz">
      <div class="main-details">
        <div class="icon"></div>
        <div class="test-details">
          <p class="name">{{ quiz.code }}</p>
          <p class="type-duration">
            {{ quiz.course_name }}
            <br>
            {{ quiz.year }} {{ getType(quiz.quiz_type) }}
            <br>
            {{ quiz.duration }} {{ quiz.duration | pluralize('hr') }}
          </p>
        </div>
      </div>
      <div class="secondary-details">
        <div class="section timer">
          <q-item tag="label">
            <q-item-main>
              <q-item-tile label>Timer</q-item-tile>
            </q-item-main>
            <q-item-side right>
              <q-toggle v-model="isTimerOn"/>
            </q-item-side>
          </q-item>
        </div>
        <div class="section">
          <h2 class="section-title">Instructions</h2>
          <p class="section-content">{{quiz.instructions}}</p>
        </div>
      </div>
      <router-link :to="questionUrl">
        <div class="footer">
          <q-btn class="button">Start</q-btn>
        </div>
      </router-link>
    </template>
  </div>
</template>

<script>
  import {
    QCard,
    QBtn,
    QToggle,
    QItem,
    QItemMain,
    QItemTile,
    QItemSide
  } from 'quasar'

  let pageData = {
    components: {
      QCard,
      QBtn,
      QToggle,
      QItem,
      QItemMain,
      QItemTile,
      QItemSide
    },
    data () {
      return {
        isTimerOn: false
      }
    },
    computed: {
      isPageLoading () {
        return this.$store.state.quiz.loadingUsersQuizzes
      },
      quiz () {
        return this.$store.state.entities.quizzes
          .byId[this.$route.params.quizId]
      },
      questionUrl () {
        return {
          name: 'question',
          params: {
            quizId: this.$route.params.quizId,
            questionId: this.quiz.questions[0]
          }
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
      this.$store.dispatch('fetchUserData').catch(function (error) {
        console.error('There was an error running action fetchUserData', error)
      })
    },
    watch: {
      isTimerOn: function () {
        this.$store.dispatch('setTimerVisibility', this.isTimerOn)
      }
    }
  }

  export default pageData
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
  @import '~variables'

  .test
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

    .section
      padding 0px 10px

    .timer
      background $light-gray
      margin-top 20px
      border-radius 30px
</style>
