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
      <q-btn ref="target" flat>
        <q-icon name="more_vert"/>
        <!-- Direct child of target -->
        <q-popover ref="popover">
          <!--
            The DOM element(s) that make up the popup,
            in this case a list:
          -->
          <q-list item-separator link>

            <q-item to="/bookmarks">
              Bookmarks
            </q-item>

            <a :href="'http://bit.ly/PascoReportIssue'">
              <q-item>
                Report an Issue
              </q-item>
            </a>
             <a :href="'http://bit.ly/PascoFeedback2'">
              <q-item>
                Give Feedback
              </q-item>
            </a>
            <a :href="'http://bit.ly/PascoSupport'">
              <q-item>
                Contact Support
              </q-item>
            </a>
            <q-item to="/about">
              About
            </q-item>
<!--
            <q-item @click="$refs.popover.close()">
              Share
            </q-item>
-->
            <q-item v-if="$auth.check()" @click="logOut()">
              Logout
            </q-item>

      <!--<q-btn flat-->
             <!--v-clipboard:copy="shareUrl"-->
             <!--v-clipboard:success="onCopy"-->
             <!--v-clipboard:error="onError">-->
        <!--<q-icon name="link"/>-->
          </q-list>
        </q-popover>
      </q-btn>
    </q-toolbar>

    <!-- Navigation -->
    <template v-if="this.$route.name === 'question' && quiz">
      <q-tabs slot="navigation" inverted>
        <q-route-tab slot="title"
                     v-bind:to="getTabUrl(questionId)" replace
                     :label="getTabLabel(questionId)"
                     v-for="questionId in quiz.questions"/>
      </q-tabs>
    </template>

    <div v-if="$auth.ready()">
      <router-view></router-view>
    </div>

    <div v-if="!$auth.ready()">
      Loading ...
    </div>

    <q-ajax-bar color="orange" :delay="500"/>

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
    QAjaxBar,
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
      QAjaxBar,
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
      }
    },
    methods: {
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

<style lang="stylus">
  @import '~variables'

  .q-tabs
    font-family 'Montserrat'

  img.logo
    height 24px

  .q-tabs-inverted .q-tabs-head
    background #f0f0f0

  .q-popover .q-item
    color $dark-gray
</style>
