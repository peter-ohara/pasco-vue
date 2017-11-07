<template>
  <q-card class="card">
    <div class="card-side">
      <div v-bind:class="{ blue: quiz.quiz_type === 'end_of_sem', green: quiz.quiz_type === 'mid_sem', orange: quiz.quiz_type === 'assignment'  }"
           class="card-icon">
        <p>
          {{ splitCourseCode(quiz.course_code)[1] }}
          <br>
          {{ splitCourseCode(quiz.course_code)[2] }}
        </p>
      </div>
    </div>
    <div class="card-main">
      <p class="text card-title">
        {{quiz.name}}
      </p>
      <p class="text duration">{{quiz.course_name}}</p>
      <p class="text question-count">{{quiz.question_count}}Q</p>
    </div>
  </q-card>
</template>

<script>
  import {
    QCard
  } from 'quasar'

  let pageData = {
    components: {
      QCard
    },
    props: ['quiz'],
    methods: {
      splitCourseCode: function (courseCode) {
        return courseCode.match(/([a-zA-Z]*)([0-9]*)/)
      }
    }
  }

  export default pageData
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
  @import '~variables'

  .card
    background white
    display flex
    padding 5px 10px

  .card-side
    width 20%
    max-width 200px
    min-width 80px
    margin-top 5px

  .card-icon
    background-color $info
    border-radius 50px
    height 60px
    width 60px
    margin-top 5px
    padding-bottom 15px
    padding-top 15px
    text-align center
    p
      line-height 1.2em
      color white
      font-size 0.8em

  .text
    text-align left
    margin-bottom 0px

  .question-count
    color $blue
    font-size 12px

  .duration
    color $mid-gray

  .card-title
    color $dark-gray
    font-size 18px
    font-weight 300
    margin-top 5px

  .blue
    background-color $blue

  .orange
    background-color $orange

  .green
    background-color $green
</style>
