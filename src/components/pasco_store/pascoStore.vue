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
              <!--<q-icon class="book-icon" name="library_books"></q-icon>-->
             <!--<img src="~assets/notebook.svg" class="svg course-icon"><-->
              <svg class="svg course-icon" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 viewBox="0 0 58 58" style="enable-background:new 0 0 58 58;" xml:space="preserve">
                <g>
                  <path fill="#FFFFFF" d="M3,43c0.552,0,1-0.447,1-1c0-1.654,1.346-3,3-3s3,1.346,3,3c0,0.553,0.448,1,1,1s1-0.447,1-1c0-2.757-2.243-5-5-5
                    s-5,2.243-5,5C2,42.553,2.448,43,3,43z"/>
                  <path fill="#FFFFFF" d="M3,37c0.552,0,1-0.447,1-1c0-1.654,1.346-3,3-3s3,1.346,3,3c0,0.553,0.448,1,1,1s1-0.447,1-1c0-2.757-2.243-5-5-5
                    s-5,2.243-5,5C2,36.553,2.448,37,3,37z"/>
                  <path fill="#FFFFFF" d="M3,31c0.552,0,1-0.447,1-1c0-1.654,1.346-3,3-3s3,1.346,3,3c0,0.553,0.448,1,1,1s1-0.447,1-1c0-2.757-2.243-5-5-5
                    s-5,2.243-5,5C2,30.553,2.448,31,3,31z"/>
                  <path fill="#FFFFFF" d="M3,25c0.552,0,1-0.447,1-1c0-1.654,1.346-3,3-3s3,1.346,3,3c0,0.553,0.448,1,1,1s1-0.447,1-1c0-2.757-2.243-5-5-5
                    s-5,2.243-5,5C2,24.553,2.448,25,3,25z"/>
                  <path fill="#FFFFFF" d="M4,18c0-1.654,1.346-3,3-3s3,1.346,3,3c0,0.553,0.448,1,1,1s1-0.447,1-1c0-2.757-2.243-5-5-5s-5,2.243-5,5
                    c0,0.553,0.448,1,1,1S4,18.553,4,18z"/>
                  <path fill="#FFFFFF" d="M52.003,0.004H50h-7H19V0H6v7.101C3.721,7.566,2,9.585,2,12c0,0.553,0.448,1,1,1s1-0.447,1-1c0-1.654,1.346-3,3-3
                    s3,1.346,3,3c0,0.553,0.448,1,1,1s1-0.447,1-1c0-2.415-1.721-4.434-4-4.899V2h9v54H8v-4v-3c0-0.553-0.448-1-1-1s-1,0.447-1,1v1.815
                    C4.839,50.401,4,49.302,4,48c0-1.654,1.346-3,3-3s3,1.346,3,3c0,0.553,0.448,1,1,1s1-0.447,1-1c0-2.757-2.243-5-5-5s-5,2.243-5,5
                    c0,2.415,1.721,4.434,4,4.899V58h11h2h24h7h2.003C54.207,58,56,56.207,56,54.004V4C56,1.797,54.207,0.004,52.003,0.004z M19,56
                    V2.004h24V56H19z M45,56V2.004h3V56H45z M54,54.004C54,55.104,53.104,56,52.003,56H50V2.004h2.003C53.104,2.004,54,2.899,54,4
                    V54.004z"/>
                </g>
              </svg>

              <p class="course-code light-paragraph">{{course.code}}</p>
            </q-card-title>
            <q-card-main class="card-bottom">
              <div class="card-title text-truncate ellipsis-3-lines p-card-title course-name">
                {{course.name}}
              </div>
              <div class="test-no">
                <strong>{{course.total_quiz_count}}</strong>  {{ course.total_quiz_count | pluralize('test') }}
              </div>
              <q-card-actions align="end" >
                <q-btn :small="true" flat class="buy-btn"><span class="price text-bold">{{course.price}} PG </span>&nbsp; <span class="buy-text">BUY</span></q-btn>
              </q-card-actions>
            </q-card-main>
          </q-card>
        </router-link>
      </div>
    </div>
    <div class="course-bottom" v-if="!loading">
      <div> We keep adding new courses everyday. Don't see some any of your courses here? Request them so we can upload them ASAP.</div>

      <a href="http://bit.ly/2n6RjZv">
        <q-btn color="primary" class="request-btn">
          Request A Course
        </q-btn>
      </a>

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

  import randomColor from 'randomcolor'

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
      for (let count = 0; count < 20; count++) {
        this.colors.push(
          randomColor({
            luminosity: 'dark',
            hue: 'random',
            format: 'rgba',
            alpha: 8
          }))
        console.log('randomColor', randomColor)
      }
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
    position relative
    //height 190px


  .p-card-title
    display: inline-block
    width 100%
    //height:100%
    font-size 15px

  .course-code
    margin -10px -10px 0px
    text-align: center;
    font-size: 26px;
    padding-top: 32px;
    z-index: 10000;

  .course-name
    margin-top 7px
    height 38px

  .price
    color: $orange
    font-size 13px

  .buy-text
    color: $primary
    font-size 12px
  .course-icon
    position absolute
    width 85px
    height 85px
    opacity: 0.2
    //filter: alpha(opacity=50)
    left 23%
    top 10%

  svg path
    fill: white

  .q-card-title
    padding 0px 5px
    //margin -31px -26px 0px -26px
    height 80px
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

  .test-no
    font-size 12px
    margin-bottom: 10px

  .buy-btn
    border-radius 3px
    background none
    border 1px solid $primary

  .card-bottom
    height 97px


  @media only screen and (min-width: 800px)
    .buy-btn
      border-radius 3px
      background none
      border 1px solid $primary

    .card-bottom
      height 102px

    .course-code
      font-size: 30px;
      padding-top: 30px;
      z-index: 10000;

    .price
      color: $orange
      font-size 14px

    .buy-text
      color: $primary
      font-size 13px

    .course-icon
      position absolute
      width 90px
      height 90px
      opacity: 0.2
      //filter: alpha(opacity=50)
      left 33%
      top 8%

    .course-name
      margin-top 7px
      height 42px

    .p-card-title
      display: inline-block
      width 100%
      //height:100%
      font-size 17px
</style>
