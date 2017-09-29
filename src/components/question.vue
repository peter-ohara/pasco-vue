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
      />
    </div>

    <q-inner-loading :visible="isPageLoading"></q-inner-loading>

  </div>
</template>

<script>
  import {
    QInnerLoading,
    QTransition,
    QOptionGroup
  } from 'quasar'

  let pageData = {
    components: {
      QInnerLoading,
      QTransition,
      QOptionGroup
    },
    props: ['question'],
    data () {
      return {
        answer: ''
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
                value: index
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
      }
    },
    methods: {
      renderMath: function () {
        this.$nextTick(function () {
          // eslint-disable-next-line no-undef,eqeqeq
          if (typeof (katex) != 'undefined') AMfunc(true)
        })
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
    margin-top 16px
    margin-bottom 82px

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
