<template>
  <div class="single-question">

    <div v-if="question.question_type === 'header'" class="header-container">
      <p class="question-content" v-html="question.content"></p>
    </div>

    <div v-if="question.question_type !== 'header'" class="question-container">
      <p v-html="replaceInputs(question.question)" id="questions" class="question question-content"></p>
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
        wrongAnswerAlert: false,
        noAnswerAlert: false,
        imageSize: 0,
        interval: null,
        imageElem: null
        // correctAnswerSound: '../../../assets/ding.wav'
      }
    },
    computed: {
      contentElem () {
        return document.querySelector('.question-content')
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
      this.isThereImage()
    },
    beforeDestroy () {
      this.dismissAlerts()
      console.log("before Destroy")
    },
    updated() {
      //clear any rogue interval
      clearInterval(this.interval)
      this.isThereImage()
    },
    watch: {
      question: function () {
        this.renderMath()
        this.resetChoices()
      }
    },
    methods: {
      isThereImage() {
        this.imageElem = document.querySelector('.question-content img')
        //If Image exists, append loading icon
        if(this.imageElem) {
          this.appendLoadingIcon();
          this.runInterval();
        }
      },
      hasImageLoaded(img) {
        //console.log(img.naturalWidth)
        if (!img.complete) {
          return false;
        }

        if (img.naturalWidth === 0) {
          return false;
        }

        // No other way of checking: assume it’s ok.
        return true;
      },
      appendLoadingIcon () {
        //Create Element
        let span = document.createElement('span');

        //Set class
        span.setAttribute('class', 'icon-wrap')

        //Insert Icon
        span.innerHTML = `<svg v-if="hasImageLoaded(imageElem)" class="icon" style="width:24px;height:24px" viewBox="0 0 24 24">
          <path fill="#000000" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
        </svg>`

        //console.log(this.contentElem)
        //Append element
        this.contentElem.appendChild(span)
        //console.log(this.contentElem)
      },
      removeLoadingIcon () {
        const iconWrap = document.querySelector('.question-content .icon-wrap');
        //console.log(iconWrap, "REMOVE")
        this.contentElem.removeChild(iconWrap);
      },
      runInterval () {
        const self = this
        this.interval = setInterval(function(){
          if(self.hasImageLoaded(self.imageElem) ){
            self.removeLoadingIcon();
            clearInterval(self.interval)
          }
        }, 10)
      },
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
        if (this.noAnswerAlert) this.noAnswerAlert.dismiss()
      },
      checkAnswer: function () {
        this.dismissAlerts()
        if (this.question.answer === '') {
          this.noAnswerAlert = Alert.create(
            {
              color: 'tertiary',
              html: 'Sorry! <br> We don\'t have the answer for this question yet. <br> If you have the answer, help us by posting it in the discussion section below',
              icon: 'sentiment_dissatisfied',
              enter: 'bounceInLeft',
              leave: 'bounceOutLeft',
              position: 'bottom'
            }
          )
          var audio = new Audio('~assets/ding.wav')
          audio.play()
        } else if (this.answer === this.question.answer) {
          this.correctAnswerAlert = Alert.create(
            {
              color: 'positive',
              html: 'Correct! <br> The answer is indeed "' + this.question.answer.toUpperCase() + '"',
              icon: 'sentiment_very_satisfied',
              enter: 'bounceInLeft',
              leave: 'bounceOutLeft',
              position: 'bottom'
            }
          )
        } else {
          this.wrongAnswerAlert = Alert.create(
            {
              color: 'amber',
              html: 'Incorrect: <br> "' + this.answer.toUpperCase() + '" is not the correct answer. <br> No hassle, just try again. <i class="material-icons">mood</i>',
              icon: 'clear',
              enter: 'bounceInLeft',
              leave: 'bounceOutLeft',
              position: 'bottom'
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
<!-- Intentionally unscoped due to selecting .q-* classes that are only available after compilation -->
<style lang="stylus">
  @import '~variables'
/*
  .loading
    display block
    background-image url('~assets/loading-gif.gif')
    background-position center center
*/
  .q-alert-container
    bottom: 50px !important

  .single-question
    min-height 300px
    max-width 600px
    margin 16px auto 32px
    .header-container
      padding-left 8px
      padding-right 8px
      font-size 18px

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
    .question-content
      .icon-wrap
        width 100px
        height 100px
        background #d0d0d0
        display block
        border-radius 5px
      .icon
        margin 35px 35px
        -webkit-animation:spin 1s linear infinite;
        -moz-animation:spin 1s linear infinite;
        animation:spin 1s linear infinite;
      img
        box-shadow 0px 0px 5px 0px #7b7b7b
</style>
