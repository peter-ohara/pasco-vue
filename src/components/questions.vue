<template>
  <div class="main questions">
    <div class="numbers">
      <div class="numbers-inner">
        <p
          @click="openQuestion(index)"
          v-for="(number, index) in (new Array(totalQue))"
          v-bind:class="{'current-que': (index+1) === currentQueNum}">{{index + 1}}</p>
      </div>
    </div>
    <div class="progress">
      <div
        v-bind:style="{width: ((currentQueNum/totalQue) * 100)+'%'}"
        class="progress-bar"></div>
    </div>
    <div class="question-container">
      <div class="number">
        <p>Question No: <span>{{currentQue.number}}</span></p>
      </div>
      <div class="question">
        <p v-html="currentQue.question">Question is unavailable. Please move to the next questions</p>
      </div>
    </div>
    <div v-if="true" class="answer-container">
      <ul class="choices-container">
        <li v-for="(choice, index) in currentQue.choices" class="choices">
          <p class="letter">{{getChoiceLetter(index)}}</p>
          <p class="choice">{{choice}}</p>
        </li>
      </ul>
    </div>
    <div class="footer">
      <q-btn @click="prevQuestion()" class="button prev">Prev</q-btn>
      <q-btn @click="nextQuestion()" class="button next">Next</q-btn>
    </div>
  </div>
</template>

<script>
import {
  QInput,
  QCard,
  QBtn
} from 'quasar'

var pageData = {
  components: {
    QInput,
    QCard,
    QBtn
  },
  data(){
    return{
      id: this.$route.params.id,
      test: {},
      questions: [],
      currentQueNum: 1,
      currentQue: {},
      totalQue: 0
    }
  },
  methods: {
    getQuestions: function(){
      console.log('get test')
      var url = 'https://pasco-api-staging.herokuapp.com/quizzes/'+this.id+'?include=questions';

      this.$http.get(url).then(function(data){
        console.log(data)
        this.loading = false;
        this.test = data.body.quiz
        this.questions = data.body.quiz.questions;
        this.totalQue = this.questions.length

        //initiate mathjax
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
      })
    },
    getChoiceLetter: function(index){
      return String.fromCharCode(97 + index);
    },
    openQuestion: function(index){
      this.currentQueNum = index + 1;
      this.currentQue = this.questions[index];
      //console.log(this.currentQue)
    },
    nextQuestion: function(){
      //console.log(this.currentQueNum, this.totalQue)
      if(this.currentQueNum < this.totalQue)
        this.openQuestion(this.currentQueNum)
    },
    prevQuestion: function(){
      //console.log(this.currentQueNum, this.totalQue)
      if(this.currentQueNum > 1)
        this.openQuestion(this.currentQueNum - 2)
    }
  },
  created(){
    //console.log('page loaded')
    this.getQuestions()
  }
}

export default pageData
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
@import '~variables'

.questions
  margin-top 60px
  .numbers
    height 45px
    width 100%
    overflow auto
    overflow-y:hidden
    position fixed
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
  .progress
    width 100%
    height 2px
    position fixed
    top 105px
    .progress-bar
      background $orange
      height 100%
      width 0%


  .question-container
    margin-top 60px
    padding 10px
    p
      font-size 20px
      text-align left
  .number
    color $mid-gray
    span
      color $orange

  .answer-container
    padding 10px

  .choices-container
    background-color white
    padding 5px 12px

  .choices
    display block
    //background-color $mid-gray
    display flex
    margin-top 10px
    padding 10px
    border-bottom 1px solid $light-gray
    p
      font-size 20px
    p.choice
      color $mid-gray
      text-align left
    p.letter
      padding 0px 25px 0px 10px
      color $blue

  .footer
    position fixed
    bottom 0px
    width 100%
    height 50px
    background-color teal
    .button
      color white
      margin-top 10px
      width 50%
      height 50px
      margin-top 0px
    .prev
      float left
    .next
      float right
</style>
