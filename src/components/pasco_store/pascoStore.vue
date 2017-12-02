<template>
  <div class="main store">
    <div class="search-area">
      <q-search
        class="search-input"
        color="white"
        :inverted="true"
        :debounce="300"
        v-model="keyword"
        @change="refreshCourses(keyword)"
        placeholder="Find a course"/>
    </div>
    <div class="content">
      <div class="card-container" >
        <router-link v-for="(course, index) in filteredCourses" v-bind:to="'store/course/'+ course.id">
          <q-card inline class="card">
            <q-card-title v-bind:style="{backgroundColor: colors[index]}" class="text card-title course-code">
              <q-icon class="book-icon" name="library_books"></q-icon>
              {{course.code}}
            </q-card-title>
            <q-card-main class="card-bottom">
              <p class="card-title p-card-title course-name">{{course.name}}</p>
              <div class="test-no">{{course.total_quiz_count}}  {{ course.total_quiz_count | pluralize('test') }}</div>
              <q-card-actions align="end" >
                <q-btn class="buy-btn"><span class="price">{{course.price}} PG </span>&nbsp; BUY</q-btn>
              </q-card-actions>
            </q-card-main>
          </q-card>
        </router-link>
      </div>
    </div>
    <div class="course-bottom" v-if="!loading">
      <div> We keep adding new courses everyday. Don't see some any of your courses here? Request them so we can upload them ASAP.</div>
        <q-btn color="primary" class="request-btn"><a href="http://bit.ly/2n6RjZv">Request A Course</a></q-btn>
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
    QCardActions,
    Loading,
    QSpinnerFacebook
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
        courses: [],
        filteredCourses: [],
        colors: []
      }
    },
    methods: {
      splitCourseCode: function (courseCode) {
        return courseCode.match(/([a-zA-Z]*)([0-9]*)/)
      },
//      generateColor () {
//        return '#' + (Math.random().toString(10) + '000000').substring(2, 8)
//      },
      refreshCourses (keyword) {
        //console.log(this.keyword)
        if(!keyword) this.filteredCourses = this.courses;

        this.filteredCourses = this.courses.filter(course =>
          course.code.toLowerCase().includes(keyword.toLowerCase()) ||
          course.name.toLowerCase().includes(keyword.toLowerCase())
        )
      }
    },
    created () {
      let self = this
      self.loading = true
      this.$store.state.entities.isStale = true
      self.$store.dispatch('fetchUserData').then(function (userData) {
        Loading.show()
        return self.$http.get('courses')
      }).then(function (data) {
        Loading.hide()
        self.loading = false
        console.log(data.body.courses)
        self.courses = data.body.courses;
        self.refreshCourses (self.keyword)
      }).catch(function (error) {
        Loading.hide()
        self.loading = false
        console.log(error)
      })

      //generate 100 colors
      for(let count = 0; count < 100; count ++){
        this.colors.push('#' + (Math.random().toString(10) + '000000').substring(2, 8))
      }
      console.log(this.colors)
    },
    filters: {
      pluralize: function (number, word) {
        return number === 1 ? word : word + 's'
      }
    }
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
    min-height: 150px
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

  .course-code
    margin -10px -10px 0px
    height 60px

  .course-name
    margin-top 10px

  .q-card-title
    padding 0px 5px
    //margin -31px -26px 0px -26px
    height 60px
    //background #0888d8
    color white

  .q-card-main
    padding 0px

  .q-card-actions
    margin -10px -10px

  .course-bottom
    display block
    padding 20px 10px
    width 100%
    max-width 600px
    clear both
    margin 0 auto
    a
      font-size 16px
      width 100% !important

  .request-btn
    margin 8px 0px 50px
    a
      color white

  /*
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
          :-webkit-input-placeholder
            color $tertiary !important

          input:
          :-moz-placeholder
            color $tertiary !important

          input:-ms-input-placeholder
            color $tertiary !important

          input:-moz-placeholder
            color $tertiary !important

  */
</style>
