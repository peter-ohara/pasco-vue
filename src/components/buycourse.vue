<template>
  <div class="main store-course">
    <div class="main-details">
      <div class="test-details">
        <p class="course-code">
          {{ course.code }}
        </p>
        <p class="course-name">
          {{ course.name }}
        </p>
      </div>
    </div>
    <div class="content">
      <div class="test-breakdown">
        <div class="total-tests"><span class="test-count">7</span> tests</div>
        <ul class="total-breakdown">
          <li><span class="test-count">4</span> midsems</li>
          <li><span class="test-count">2</span> end of sems</li>
          <li><span class="test-count">1</span> assignment</li>
        </ul>
      </div>
      <div class="test-list">
        <p class="list-title">Tests</p>
        <q-card class="card" v-for="test in tests">
          <div class="card-main">
            <p class="text card-title">
              {{test.name}}
            </p>
            <p class="text duration">{{test.duration}} h</p>
            <p class="text question-count">{{test.question_count}} Q</p>
          </div>
        </q-card>
      </div>
    </div>
    <router-link :to="'/'">
      <div class="footer">
        <q-btn flat class="buy-btn">
          Buy for &nbsp;{{course.price}}
          <span class="price">
            <span class="figure">2</span>
            PG
          </span>
        </q-btn>
      </div>
    </router-link>
  </div>
</template>

<script>
  import {
    QCard,
    QBtn,
    QSearch,
    QCardTitle,
    QCardMain,
    QIcon,
    QCardActions
  } from 'quasar'

  let pageData = {
    components: {
      QCard,
      QBtn,
      QSearch,
      QCardTitle,
      QCardMain,
      QIcon,
      QCardActions
    },
    data () {
      return {
        courseId: this.$route.params.courseId
      }
    },
    computed: {
      course () {
        return this.$store.state.entities.courses
          .byId[this.$route.params.courseId]
      },
      tests () {
        const ids = this.$store.state.entities.quizzes.allIds

        return ids.map((id) => this.$store.state.entities.quizzes.byId[id])
      }
    },
    methods: {
      generateColor () {
        //function not in use at the moment
        return '#' + (Math.random().toString(16) + "000000").substring(2,8)
      }
    },
    created () {
      this.$store.dispatch('fetchUserData').catch(function (error) {
        console.error('There was an error running action fetchUserData', error)
      })
    }
  }

  export default pageData
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" >
  @import '~variables'

  .test-breakdown
    padding 10px
    margin-top 15px

  .test-count
    color $mid-gray

  .total-tests
    font-size: 20px
    .test-count
      font-size: 30px

  .total-breakdown
    overflow: auto
    padding-left 0px
    li
      display: block
      float: left
      width 33.33%

  .main-details
    height 165px
    background $primary
    overflow: auto

  .test-list
    margin-top 20px

  .test-details p
    color white
    text-align: center

  .list-title
    font-size 20px
    padding 10px

  .course
    &-code
      font-size: 40px
      font-weight: 200
      line-height: 40px
      margin-top: 40px

  .store-course
    .buy-btn
      margin: 0px auto
      display: block
      margin-top 7px
    .price
      background: white
      padding 7px 5px
      border-radius 4px
    .figure
      color $primary

</style>
