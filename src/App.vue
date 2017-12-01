<template>
  <!-- Don't drop "q-app" class -->
  <q-layout ref="layout" id="q-app" reveal>

    <!-- Header -->
    <q-toolbar slot="header">
      <q-btn flat v-go-back="'/'">
        <img src="~assets/logo3.png" class="logo" alt="">
      </q-btn>
      <q-toolbar-title>
        {{ pageTitle }}
      </q-toolbar-title>
      <q-btn flat v-if="isTimerOn">
        {{currentTime}}
        <q-popover ref="popover">
          <q-item @click="clearTimer">
            Stop Timer
          </q-item>
        </q-popover>
      </q-btn>
      <q-btn flat v-if="this.$route.name === 'question'" @click="toggleBookmark()">
        <q-icon name="bookmark" v-if="isBookmarked"/>
        <q-icon name="bookmark_border" v-else/>
      </q-btn>
      <q-btn flat class="pg-balance" flat v-if="isStore" @click="$router.push({ name: 'buyPG'})">
        {{ user.pasco_gold }} <span class="currency">PG</span>
      </q-btn>
      <q-btn ref="target" flat v-if="this.$route.name !== 'signIn'">
        <q-icon name="more_vert"/>
        <!-- Direct child of target -->
        <q-popover ref="popover2">
          <!--
            The DOM element(s) that make up the popup,
            in this case a list:
          -->
          <q-list item-separator link>

            <q-item @click="$refs.popover2.close(); $router.push('/')">
              Your Library
            </q-item>

            <q-item @click="$refs.popover2.close(); $router.push('/bookmarks')">
              Bookmarks
            </q-item>

            <q-item @click="$refs.popover2.close(); $router.push('/support')">
              Help & Support
            </q-item>

            <q-item @click="$refs.popover2.close(); $router.push('/buy_pasco_gold')">
              Buy Pasco Gold
            </q-item>

            <q-item v-if="$auth.check() && this.$route.name === 'main'" @click="logOut()">
              Logout
            </q-item>

            <q-item @click="$refs.popover2.close();">
              <a href="http://bit.ly/PascoFeedback2">Give us Feedback</a>
            </q-item>

          </q-list>
        </q-popover>
      </q-btn>
    </q-toolbar>

    <!-- Navigation -->
    <template v-if="this.$route.name === 'question' && quiz">
      <q-tabs slot="navigation" class="question-numbers" inverted>
        <q-route-tab slot="title"
                     v-bind:to="getTabUrl(questionId)" replace
                     :label="getTabLabel(questionId)"
                     v-for="questionId in quiz.questions"/>
      </q-tabs>
    </template>

    <div v-if="$auth.ready()">
      <router-view></router-view>
    </div>

    <div class="preloader" v-if="!$auth.ready()">
      <img src="~assets/loading-gif.gif">
      <p>Loading...</p>
    </div>

  </q-layout>
</template>

<script>
  /*
   * Root component
   */
  import {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QTabs,
    QRouteTab,
    QBtn,
    QIcon,
    Toast,
    GoBack,
    QList,
    QItem,
    openURL,
    QPopover
  } from 'quasar'

  export default {
    components: {
      QLayout,
      QToolbar,
      QToolbarTitle,
      QRouteTab,
      QTabs,
      QBtn,
      QIcon,
      QList,
      QItem,
      openURL,
      QPopover
    },
    directives: {
      GoBack
    },
    computed: {
      pageTitle () {
        switch (this.$route.name) {
          case 'course':
            let course = this.$store.state.entities.courses
              .byId[this.$route.params.courseId]
            if (course) {
              return course.code + ' ' + course.name
            } else {
              return ''
            }
          default:
            return ''
        }
      },
      user () {
        return this.$store.state.entities.user
      },
      quiz () {
        return this.$store.state.entities.quizzes
          .byId[this.$route.params.quizId]
      },
      shareUrl () {
        return location.href
      },
      isTimerOn () {
        return this.$store.state.timer.isTimerOn
      },
      currentTime () {
        return this.$store.state.timer.timer
      },
      isStore () {
        return this.$route.name === 'pascoStore' || this.$route.name === 'storeCourse'
      },
      isBookmarked () {
        return this.$store.state.bookmarks.bookmarks
          .hasOwnProperty(this.$route.params.questionId)
      }
    },
    methods: {
      toggleBookmark () {
        let self = this
        if (this.isBookmarked) {
          this.$store.dispatch('removeBookmark', this.$route.params.questionId)
          Toast.create({
            html: 'Bookmark removed',
            button: {
              label: 'Undo',
              handler () {
                self.toggleBookmark()
              }
            }
          })
        } else {
          this.$store.dispatch('addBookmark', this.question(this.$route.params.questionId))
          Toast.create({
            html: 'Bookmark added',
            button: {
              label: 'View Bookmarks',
              handler () {
                self.$router.push({ name: 'bookmarks' })
              }
            }
          })
        }
      },
      question (questionId) {
        return this.$store.state.entities.questions
          .byId[questionId]
      },
      getTabUrl (questionId) {
        return '/quiz/' + this.$route.params.quizId + '/question/' + questionId
      },
      getTabLabel (questionId) {
        let question = this.question(questionId)
        return question.question_type === 'header' ? question.title : question.number
      },
      onCopy (e) {
        Toast.create(e.text + ' copied!')
      },
      onError (e) {
        Toast.create('Failed to copy link')
      },
      clearTimer () {
        this.$store.dispatch('clearTimer')
      },
      logOut () {
        this.$auth.logout({
          success: function () {
            console.log('logged out')
          },
          error: function () {
            console.log('error logging out')
          },
          redirect: {name: 'signIn'}
        })
        // TODO: Invalidate vuex store
        // TODO: Invalidate quizzes in localforage
        this.$refs.popover.close()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~variables'

  .q-tabs
    font-family 'Montserrat'
    background-color $neutral
    margin-top: -1px

  img.logo
    height 24px

  .q-tabs-inverted .q-tabs-head
    background #f0f0f0

  .q-popover .q-item
    color $dark-gray

  .pg-balance
    font-size 20px
    text-decoration none
    color white

  .currency
    color $orange
    font-size 15px
    margin-top 3px
    margin-left 3px

</style>

<style lang="stylus">
  @import '~variables'

  .preloader
    width 120px
    height 120px
    position absolute
    left 50%
    top 50%
    margin -120px 0 0 -60px

  .preloader
    img
      width 100px
      height 84px
    p
      text-align center
      font-size 16px


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

