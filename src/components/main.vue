<template>
  <div class="main">
    <div class="search-area">
      <q-search
        class="search-input"
        color="white"
        :inverted="true"
        :debounce="300"
        v-model="keyword"
        placeholder="Search your library"/>
    </div>
    <div class="content">
      <div class="empty-state" v-if="courses.length === 0 && this.$store.state.entities.loadingUserData === false">
          <q-icon class="sentiment" name="sentiment_satisfied"></q-icon>
        <p>Hello {{ this.$store.state.entities.user.name }},<br>
          Your library is empty. Click on the <strong>"Add A Course"</strong> button below to add some courses to your library <br> or check out our <a href="http://bit.ly/2j6Nj6M">getting started guide</a></p>
      </div>

      <router-link v-for="(course, index) in courses" v-bind:to="'course/'+ course.id">
        <q-card  class="card">
          <div class="card-side">
            <div v-bind:style="{backgroundColor: colors[index]}" class="card-icon blue">
              <p>
                {{ splitCourseCode(course.code)[1] }}
                <br>
                {{ splitCourseCode(course.code)[2] }}
              </p>
            </div>
          </div>
          <div class="card-main">
            <p class="text card-title">
              {{course.name}}
            </p>
            <p class="text question-count">{{course.total_quiz_count}} tests</p>

          </div>
        </q-card>
      </router-link>
    </div>

    <router-link v-bind:to="'/store'">
      <div class="footer">
        <q-btn class="button" icon="library_books">Add a course</q-btn>
      </div>
    </router-link>
  </div>
</template>

<script>
  import {
    QSearch,
    QCard,
    QBtn,
    QIcon
  } from 'quasar'

  import randomColor from 'randomcolor'

  let pageData = {
    components: {
      QSearch,
      QCard,
      QBtn,
      QIcon
    },
    data () {
      return {
        loading: true,
        keyword: '',
        timer: '',
        colors: []
      }
    },
    created () {
      this.$store.dispatch('fetchUserData').catch(function (error) {
        console.error('There was an error running action fetchUserData', error)
      })
      for (let count = 0; count < 20; count++) {
        this.colors.push(
          randomColor({
            luminosity: 'dark',
            hue: 'random'
          }))
        console.log('randomColor', randomColor)
      }
      OneSignal.push(function() {
        OneSignal.isPushNotificationsEnabled(function(isEnabled) {
          if (isEnabled)
            console.log("Push notifications are enabled!")
          else {
            setTimeout(myFunction, 3000)
            OneSignal.registerForPushNotifications({
              modalPrompt: true
            })
          }
        })
      })
    },
    computed: {
      courses () {
        if(!this.keyword) return this.$store.getters.courses;

        return this.$store.getters.courses.filter(course =>
          course.code.toLowerCase().includes(this.keyword.toLowerCase()) ||
          course.name.toLowerCase().includes(this.keyword.toLowerCase())
        )
      }
//    filteredQuizzes () {
//      let self = this
//      return this.courses.filter(function (course) {
//        let searchData = (course.code + ' ' + course.name).toUpperCase()
//        return searchData.indexOf(self.keyword.toUpperCase()) !== -1
//      })
//    }
    },
    methods: {
      splitCourseCode: function (courseCode) {
        return courseCode.match(/([a-zA-Z]*)([0-9]*)/)
      }
    }
  }


  export default pageData
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import '~variables'

  .trial-period p
    text-align center
    color orange

  .trial-period
    margin 0 auto 10px

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

  .empty-state
    padding 16px
    margin-top 30px
    width 100%
    text-align center

  .sentiment
    font-size 150px
    color #ccc
    padding 10px

</style>
