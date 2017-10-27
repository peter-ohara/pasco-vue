<template>
 <div class="main">
    <div class="trial-period">
    </div>
    <div class="content">
      <template v-if="course">
        <quiz-item  v-for="quizId in course.quizzes" :quiz-id="quizId">
        </quiz-item>
      </template>
    </div>
  </div>
</template>

<script>
import {
  QSearch,
  QCard
} from 'quasar'

import quizItem from './quizItem.vue'

let pageData = {
  components: {
    QSearch,
    QCard,
    quizItem
  },
  data () {
    return {
      loading: true,
      keyword: '',
      timer: ''
    }
  },
  created () {
    this.$store.dispatch('fetchUserData').catch(function (error) {
      console.error('There was an error running action fetchUserData', error)
    })
  },
  computed: {
    course () {
      return this.$store.state.entities.courses
        .byId[this.$route.params.courseId]
    }
  }
}

export default pageData
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
@import '~variables'

.search-area
  max-width 600px
  margin 0 auto 20px
  padding-left 8px
  padding-right 8px

  .search-input
    padding 10px
    width 100%

    .q-if-control
      color: $tertiary !important;
    .q-if-inner
      input
        color: black !important;

      input::-webkit-input-placeholder /* Chrome/Opera/Safari */
        color $tertiary !important

      input::-moz-placeholder  /* Firefox 19+ */
        color $tertiary !important

      input:-ms-input-placeholder  /* IE 10+ */
        color $tertiary !important

      input:-moz-placeholder  /* Firefox 18- */
        color $tertiary !important

.trial-period p
  text-align center
  color orange

.content, .trial-period
  max-width 600px
  margin 0px auto 10px

</style>
