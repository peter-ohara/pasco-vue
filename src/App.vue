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

      <q-btn flat @click="shareUrl()">
        <q-icon name="share"/>
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
    QPopover,
    QAjaxBar,
    GoBack,
    openURL
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
      QPopover,
      QAjaxBar,
      openURL
    },
    directives: {
      GoBack
    },
    computed: {
      currentQuiz () {
        return this.$store.state.currentQuiz
      }
    },
    methods: {
      shareUrl () {
        let url = 'whatsapp://send?text= Checkout the pasco app' + location.href
        openURL(url)
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
</style>
