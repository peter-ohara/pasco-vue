<template>
  <div class="main questions">
    <div class="numbers">
      <div class="numbers-inner">
        <p
          @click="openQuestion(index)"
          v-for="(question, index) in questions"
          v-bind:class="{'current-que': (index+1) === currentQueNum}">{{question.number || 'Hd'}}</p>
      </div>
    </div>
    <div class="progress">
      <div
        v-bind:style="{width: ((currentQueNum/totalQue) * 100)+'%'}"
        class="progress-bar"></div>
    </div>
    <div v-show="currentQue.question_type === 'header'" class="header-container">
      <p v-html="currentQue.title"></p>
      <p v-html="currentQue.content"></p>
    </div>
    <div v-show="currentQue.question_type !== 'header'" class="question-container">
      <p v-html="replaceInputs(currentQue.question)" class="question"></p>
      <ul class="choices-container" v-show="currentQue.choices && currentQue.choices.length > 0">
        <li v-for="(choice, index) in currentQue.choices" class="choices">
          <p class="letter">{{getChoiceLetter(index)}}</p>
          <p class="choice" v-html="choice"></p>
        </li>
      </ul>
    </div>
    <div class="footer">
      <q-btn @click="prevQuestion()" class="button prev">Prev</q-btn>
      <q-btn @click="nextQuestion()" class="button next">Next</q-btn>
    </div>
    <q-inner-loading :visible="isPageLoading"></q-inner-loading>
  </div>
</template>

<script>
import {
  QInput,
  QCard,
  QBtn,
  QInnerLoading,
  QTransition,
  QSpinnerGears
} from 'quasar'

let pageData = {
  components: {
    QInput,
    QCard,
    QBtn,
    QInnerLoading,
    QTransition,
    QSpinnerGears
  },
  data () {
    return {
      id: this.$route.params.id,
      test: {},
      questions: [],
      currentQueNum: 1,
      currentQue: {},
      totalQue: 0
    }
  },
  computed: {
    isPageLoading () {
      return this.$store.state.loadingUsersTests
    }
  },
  methods: {
    runMathJax: function () {
      this.$nextTick(function () {
        // eslint-disable-next-line no-undef,eqeqeq
        if (typeof (katex) != 'undefined') AMfunc(true)
      })
    },
    getChoiceLetter: function (index) {
      return String.fromCharCode(97 + index)
    },
    openQuestion: function (index) {
      this.currentQueNum = index + 1
      this.currentQue = this.questions[index]
      this.runMathJax()
    },
    nextQuestion: function () {
      if (this.currentQueNum < this.totalQue) {
        this.openQuestion(this.currentQueNum)
      }
    },
    prevQuestion: function () {
      if (this.currentQueNum > 1) {
        this.openQuestion(this.currentQueNum - 2)
      }
    },
    escapeRegExp (str) {
      return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1')
    },
    replaceInputs: function (question) {
      return question ? question.replace(new RegExp(this.escapeRegExp('{$a}'), 'g'), '________') : ''
    }
  },
  created () {
    if (this.$store.state.usersTests.length !== 0) {
      this.test = this.$store.state.usersTests.find(quiz => quiz.id === parseInt(this.id))
      this.questions = this.test.questions
      this.totalQue = this.questions.length

      this.currentQue = this.questions[0]
      this.runMathJax()
    } else {
      let self = this
      this.$store.dispatch('getUsersTests').then(function () {
        self.test = self.$store.state.usersTests.find(quiz => quiz.id === parseInt(self.id))
        self.questions = self.test.questions

        self.totalQue = self.questions.length

        // initiate mathjax
        self.currentQue = self.questions[0]
        self.runMathJax()
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


  .header-container
    margin-top 60px
    padding-left 8px
    padding-right 8px
    margin-bottom 82px


  .question-container
    margin-top 60px
    padding-left 8px
    padding-right 8px
    margin-bottom 82px
    .question
      font-size 20px
      text-align left
      padding-bottom 32px

  .choices
    display flex
    margin-top 8px
    padding-left 8px
    padding-right 8px
    border-bottom 1px solid $light-gray
    p
      font-size 20px
    p.choice
      color $mid-gray
      text-align left
    p.letter
      padding 0 25px 0 8px
      color $blue

  .choices-container
    background-color white
    padding 5px 12px
    .choices:nth-last-child(1){
      border-bottom: none;
    }


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
