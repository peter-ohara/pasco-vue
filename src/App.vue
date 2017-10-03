<template>
  <!-- Don't drop "q-app" class -->
  <q-layout ref="layout" id="q-app" reveal>

    <!-- Header -->
    <q-toolbar slot="header">
      <q-btn flat v-go-back="'/'">
        <img src="~assets/logo3.png" class="logo" alt="">
      </q-btn>
      <q-toolbar-title>
      </q-toolbar-title>
      <q-btn ref="target" flat>
        <q-icon name="more_vert"/>
        <!-- Direct child of target -->
        <q-popover ref="popover">
          <!--
            The DOM element(s) that make up the popup,
            in this case a list:
          -->
          <q-list item-separator link>
<!--
            <router-link v-bind:to="'/signin'">
              <q-item>
                Sign In
              </q-item>
            </router-link>
            <q-item @click="$refs.popover.close()">
              Sign Up
            </q-item>
-->
            <a :href="'http://bit.ly/PascoReportIssue'">
              <q-item>
                Report an Issue
              </q-item>
            </a>
             <a :href="'http://bit.ly/PascoFeedback'">
              <q-item>
                Give Feedback
              </q-item>
            </a>
             <a :href="'http://bit.ly/PascoSupport'">
              <q-item>
                Contact Support
              </q-item>
            </a>
<!--
            <q-item @click="$refs.popover.close()">
              Share
            </q-item>
-->

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
    <q-tabs slot="navigation" v-if="this.$route.name === 'questionsPager'" inverted>
      <q-route-tab slot="title"
                   v-bind:to="getTabUrl(question)" replace
                   :label="getTabLabel(question)"
                   v-for="(question, index) in currentQuiz.questions"/>
    </q-tabs>

    <router-view></router-view>

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
      currentQuiz () {
        return this.$store.state.currentQuiz
      },
      shareUrl () {
        return location.href
      }
    },
    methods: {
      onCopy (e) {
        Toast.create(e.text + ' copied!')
      },
      onError (e) {
        Toast.create('Failed to copy link')
      },
      getTabUrl (question) {
        return '/quiz/' + this.currentQuiz.id + '/question/' + question.id
      },
      getTabLabel (question) {
        return question.question_type === 'header' ? question.title : question.number
      }
    }
  }
</script>

<style lang="stylus">
  @import '~variables'

  img.logo
  //padding 5px 10px
    height 24px

  .q-tabs-inverted .q-tabs-head
    background #f0f0f0

  .q-popover .q-item
    color $dark-gray
</style>
