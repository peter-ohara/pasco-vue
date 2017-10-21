<template>
  <div class="single-question">

    <div v-show="question.question_type === 'header'" class="header-container">
      <p v-html="question.content"></p>
    </div>

    <div v-show="question.question_type !== 'header'" class="question-container">
      <p v-html="replaceInputs(question.question)" class="question"></p>
      <q-option-group
        v-show="question.choices && question.choices.length > 0"
        class="choices-container"
        color="blue"
        type="radio"
        v-model="answer"
        :options="choices"
        @change="checkAnswer(answer)"
      />
    </div>

    <q-inner-loading :visible="isPageLoading"></q-inner-loading>

  </div>
</template>

<script>
  import {
    QInnerLoading,
    QTransition,
    QOptionGroup,
    Alert
  } from 'quasar'

  // Don't forget to import the animations you are using
  // Examples:
  import 'quasar-extras/animate/bounceInLeft.css'
  import 'quasar-extras/animate/bounceOutLeft.css'

  let pageData = {
    components: {
      QInnerLoading,
      QTransition,
      QOptionGroup,
      Alert
    },
    props: ['question'],
    data () {
      return {
        answer: '',
        correctAnswerAlert: false,
        wrongAnswerAlert: false
      }
    },
    computed: {
      isPageLoading () {
        return this.$store.state.loadingUsersTests
      },
      choices () {
        if (this.question.question_type === 'mcq') {
          if (this.question.choices && this.question.choices.length > 0) {
            let self = this
            return this.question.choices.map(function (choice, index) {
              return {
                label: '<span class="letter">' + self.getChoiceLetter(index) + '</span><span class="choice">' + choice + '</span>',
                value: self.getChoiceLetter(index)
              }
            })
          }
          return []
        } else {
          return []
        }
      }
    },
    mounted () {
      this.renderMath()
    },
    watch: {
      question: function () {
        this.renderMath()
        this.resetChoices()
      }
    },
    methods: {
      renderMath: function () {
        this.$nextTick(function () {
          // eslint-disable-next-line no-undef,eqeqeq
          if (typeof (katex) != 'undefined') AMfunc(true)
        })
      },
      resetChoices: function () {
        console.log('Resetting choices')
        this.answer = ''
        this.dismissAlerts()
      },
      dismissAlerts () {
        if (this.correctAnswerAlert) this.correctAnswerAlert.dismiss()
        if (this.wrongAnswerAlert) this.wrongAnswerAlert.dismiss()
      },
      checkAnswer: function () {
        this.dismissAlerts()
        if (this.answer === this.question.answer) {
          this.correctAnswerAlert = Alert.create(
            {
              color: 'positive',
              html: 'Correct!  :D The answer is indeed ' + this.question.answer,
              icon: 'thumb_up',
              enter: 'bounceInLeft',
              leave: 'bounceOutLeft',
              position: 'left'
            }
          )
        } else {
          this.wrongAnswerAlert = Alert.create(
            {
              color: 'amber',
              html: 'Sorry, ' + this.answer + ' is not the correct answer. Try again :)',
              icon: 'replay',
              enter: 'bounceInLeft',
              leave: 'bounceOutLeft',
              position: 'left'
            }
          )
        }
      },
      getChoiceLetter: function (index) {
        return String.fromCharCode(97 + index)
      },
      escapeRegExp (str) {
        return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1')
      },
      replaceInputs: function (question) {
        return question ? question.replace(new RegExp(this.escapeRegExp('{$a}'), 'g'), '________') : ''
      }
    }
  }

  export default pageData
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
  @import '~variables'

  .single-question
    min-height 300px
    max-width 600px
    margin 16px auto 32px
    .header-container
      padding-left 8px
      padding-right 8px

    .question-container
      padding-left 8px
      padding-right 8px
      .question
        font-size 20px
        text-align left
        padding-bottom 32px

      .choices-container
        background-color white
        padding 5px 12px
        margin 0 16px
        div:nth-last-child(1) {
          border-bottom: none;
        }

        > div
          display flex
          margin-top 8px
          padding-left 8px
          padding-right 8px
          padding-bottom 8px
          border-bottom 1px solid $light-gray
          .q-option-label
            font-size 20px
            .choice
              color $mid-gray
              text-align left
            .letter
              padding 0 25px 0 8px
              color $blue

</style>
