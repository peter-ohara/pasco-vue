<template>
  <div class="main store">
    <div class="search-area">
      <q-search
        class="search-input"
        color="white"
        :inverted="true"
        :debounce="300"
        v-model="keyword"
        placeholder="Find a course"/>
    </div>
    <div class="content">
      <div class="card-container" >
        <router-link v-for="course in courses" v-bind:to="'store/course/'+ course.id">
          <q-card inline class="card">
            <q-card-title class="text card-title">
              <q-icon class="book-icon" name="library_books"></q-icon>
              {{course.code}}
            </q-card-title>
            <q-card-main class="card-bottom">
              <p class="card-title p-card-title">{{course.name}}</p>
              <p class="test-no">{{course.total_quiz_count}}  {{ course.total_quiz_count | pluralize('test') }}</p>
              <q-card-actions align="end" >
                <q-btn class="buy-btn"><span class="price">{{course.price}} PG </span>&nbsp; BUY</q-btn>
              </q-card-actions>
            </q-card-main>
          </q-card>
        </router-link>
      </div>
    </div>
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
        loading: true,
        isTimerOn: false,
        keyword: '',
        courses: []
      }
    },
    methods: {
      splitCourseCode: function (courseCode) {
        return courseCode.match(/([a-zA-Z]*)([0-9]*)/)
      },
      generateColor () {
        // function not in use at the moment
        return '#' + (Math.random().toString(16) + '000000').substring(2, 8)
      }
    },
    created () {
      let self = this
      self.$store.dispatch('fetchUserData').then(function (userData) {
        return self.$http.get('courses')
      }).then(function (data) {
        self.courses = data.body.courses
      }).catch(function (error) {
        console.log(error)
      })
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
  }

  export default pageData
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import '~variables'

  .card-container
    width 100%
    padding 0px 10px
    box-sizing border-box

  a
    width 50%
    box-sizing border-box
    padding 5px
    display block
    float left

  a:nth-child(odd)
    padding-left 0px

  a:nth-child(even)
    padding-right 0px

  .book-icon
    font-size 25px
    padding-right 10px

  .card
    width 100%
    margin 0px 0px 8px
    //height 190px


  .p-card-title
    display: inline-block
    width 100%
    height:100%
    //white-space nowrap
    overflow hidden
    //word-wrap break-word
    //text-overflow ellipsis
    font-size 15px
    margin-bottom 5px



  .q-card-title
    padding 15px 10px
    margin -31px -26px 0px -26px
    height 60px
    background #0888d8
    color white

  .q-card-main
    padding 0px

  .q-card-actions
    margin -10px -10px




  //Had to repeat the .search-area css because the one on the main
  //screen was not being applied to this screen
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

        input:
        :-webkit-input-placeholder /* Chrome/Opera/Safari */
          color $tertiary !important

        input:
        :-moz-placeholder /* Firefox 19+ */
          color $tertiary !important

        input:-ms-input-placeholder /* IE 10+ */
          color $tertiary !important

        input:-moz-placeholder /* Firefox 18- */
          color $tertiary !important

</style>
