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
        <svg class="coins" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 58 58" style="enable-background:new 0 0 58 58;" xml:space="preserve">
      <g id="XMLID_21_">
        <path id="XMLID_148_" style="fill:#E4AF18;" d="M29,48c-14.359,0-26-2.962-26-6v6.996C3.008,52.032,14.645,55,29,55
          s25.992-2.968,26-6.004V42C55,45.038,43.359,48,29,48"/>
        <path id="XMLID_147_" style="fill:#F4BF1A;" d="M26,37c-14.359,0-26-2.962-26-6v6.996C0.008,41.032,11.645,44,26,44
          s25.992-2.968,26-6.004V31C52,34.038,40.359,37,26,37"/>
        <path id="XMLID_146_" style="fill:#E4AF18;" d="M32,26c-14.359,0-26-2.962-26-6v6.996C6.008,30.032,17.645,33,32,33
          s25.992-2.968,26-6.004V20C58,23.038,46.359,26,32,26"/>
        <path id="XMLID_145_" style="fill:#FFD949;" d="M52,8.13C52,11.167,40.359,14,26,14C11.641,14,0,11.167,0,8.13
          C0,5.092,11.641,3,26,3C40.359,3,52,5.092,52,8.13"/>
        <path id="XMLID_144_" style="fill:#F4BF1A;" d="M26,14C11.641,14,0,11.038,0,8v6.996C0.008,18.032,11.645,21,26,21
          s25.992-2.968,26-6.004V8C52,11.038,40.359,14,26,14"/>
        <path id="XMLID_143_" style="fill:#DCA815;" d="M4,11.074v6.995c0.608,0.224,1.274,0.44,2,0.646v-6.996
          C5.274,11.513,4.608,11.297,4,11.074"/>
        <path id="XMLID_142_" style="fill:#DCA815;" d="M46,11.719v6.996c0.726-0.206,1.392-0.422,2-0.646v-6.995
          C47.392,11.298,46.726,11.513,46,11.719"/>
        <path id="XMLID_141_" style="fill:#DCA815;" d="M9,12.445v6.997c0.64,0.133,1.307,0.259,2,0.378v-6.997
          C10.307,12.704,9.64,12.578,9,12.445"/>
        <path id="XMLID_140_" style="fill:#DCA815;" d="M41,12.823v6.998c0.693-0.12,1.36-0.246,2-0.379v-6.997
          C42.36,12.578,41.693,12.704,41,12.823"/>
        <path id="XMLID_139_" style="fill:#DCA815;" d="M14,13.269v6.998c0.652,0.084,1.317,0.162,2,0.232v-6.998
          C15.317,13.431,14.652,13.352,14,13.269"/>
        <path id="XMLID_138_" style="fill:#DCA815;" d="M36,13.502V20.5c0.683-0.071,1.348-0.149,2-0.232v-6.999
          C37.348,13.354,36.683,13.432,36,13.502"/>
        <path id="XMLID_137_" style="fill:#DCA815;" d="M19,13.759v6.999c0.657,0.046,1.323,0.087,2,0.12v-7
          C20.323,13.845,19.657,13.805,19,13.759"/>
        <path id="XMLID_136_" style="fill:#DCA815;" d="M31,13.878v7c0.677-0.033,1.343-0.074,2-0.12v-6.999
          C32.343,13.805,31.677,13.845,31,13.878"/>
        <path id="XMLID_135_" style="fill:#DCA815;" d="M26,14c-0.335,0-0.668-0.003-1-0.006v7C25.332,20.997,25.665,21,26,21
          s0.668-0.003,1-0.006v-7C26.668,13.997,26.335,14,26,14"/>
        <path id="XMLID_134_" style="fill:#C49214;" d="M10,23.074v6.995c0.608,0.224,1.274,0.44,2,0.646v-6.996
          C11.274,23.513,10.608,23.297,10,23.074"/>
        <path id="XMLID_133_" style="fill:#C49214;" d="M52,23.719v6.996c0.726-0.206,1.392-0.422,2-0.646v-6.995
          C53.392,23.298,52.726,23.513,52,23.719"/>
        <path id="XMLID_132_" style="fill:#C49214;" d="M15,24.445v6.997c0.64,0.133,1.307,0.259,2,0.378v-6.997
          C16.307,24.704,15.64,24.578,15,24.445"/>
        <path id="XMLID_131_" style="fill:#C49214;" d="M47,24.823v6.998c0.693-0.12,1.36-0.246,2-0.379v-6.997
          C48.36,24.578,47.693,24.704,47,24.823"/>
        <path id="XMLID_130_" style="fill:#C49214;" d="M20,25.27v6.998c0.652,0.084,1.317,0.162,2,0.232v-6.998
          C21.317,25.431,20.652,25.353,20,25.27"/>
        <path id="XMLID_129_" style="fill:#C49214;" d="M42,25.501V32.5c0.683-0.071,1.348-0.149,2-0.232V25.27
          C43.348,25.354,42.683,25.432,42,25.501"/>
        <path id="XMLID_128_" style="fill:#C49214;" d="M25,25.759v6.999c0.657,0.046,1.323,0.087,2,0.12v-7
          C26.323,25.845,25.657,25.805,25,25.759"/>
        <path id="XMLID_127_" style="fill:#C49214;" d="M37,25.878v7c0.677-0.033,1.343-0.074,2-0.12v-6.999
          C38.343,25.805,37.677,25.845,37,25.878"/>
        <path id="XMLID_126_" style="fill:#C49214;" d="M32,26c-0.335,0-0.668-0.003-1-0.006v7C31.332,32.997,31.665,33,32,33
          s0.668-0.003,1-0.006v-7C32.668,25.997,32.335,26,32,26"/>
        <path id="XMLID_125_" style="fill:#DCA815;" d="M4,34.074v6.995c0.608,0.224,1.274,0.439,2,0.646v-6.996
          C5.274,34.513,4.608,34.297,4,34.074"/>
        <path id="XMLID_124_" style="fill:#DCA815;" d="M46,34.719v6.996c0.726-0.206,1.392-0.422,2-0.646v-6.995
          C47.392,34.298,46.726,34.513,46,34.719"/>
        <path id="XMLID_123_" style="fill:#DCA815;" d="M9,35.445v6.997c0.64,0.133,1.307,0.259,2,0.378v-6.997
          C10.307,35.704,9.64,35.578,9,35.445"/>
        <path id="XMLID_122_" style="fill:#DCA815;" d="M41,35.823v6.998c0.693-0.12,1.36-0.246,2-0.379v-6.997
          C42.36,35.578,41.693,35.704,41,35.823"/>
        <path id="XMLID_121_" style="fill:#DCA815;" d="M14,36.27v6.998c0.652,0.084,1.317,0.162,2,0.232v-6.998
          C15.317,36.431,14.652,36.353,14,36.27"/>
        <path id="XMLID_120_" style="fill:#DCA815;" d="M36,36.501V43.5c0.683-0.071,1.348-0.149,2-0.232V36.27
          C37.348,36.354,36.683,36.432,36,36.501"/>
        <path id="XMLID_119_" style="fill:#DCA815;" d="M19,36.759v6.999c0.657,0.046,1.323,0.087,2,0.12v-7
          C20.323,36.845,19.657,36.805,19,36.759"/>
        <path id="XMLID_118_" style="fill:#DCA815;" d="M31,36.878v7c0.677-0.033,1.343-0.074,2-0.12v-6.999
          C32.343,36.805,31.677,36.845,31,36.878"/>
        <path id="XMLID_117_" style="fill:#DCA815;" d="M26,37c-0.335,0-0.668-0.003-1-0.006v7C25.332,43.997,25.665,44,26,44
          s0.668-0.003,1-0.006v-7C26.668,36.997,26.335,37,26,37"/>
        <path id="XMLID_116_" style="fill:#C49214;" d="M7,45.074v6.995c0.608,0.224,1.274,0.439,2,0.646v-6.996
          C8.274,45.513,7.608,45.297,7,45.074"/>
        <path id="XMLID_115_" style="fill:#C49214;" d="M49,45.719v6.996c0.726-0.206,1.392-0.422,2-0.646v-6.995
          C50.392,45.298,49.726,45.513,49,45.719"/>
        <path id="XMLID_114_" style="fill:#C49214;" d="M12,46.445v6.997c0.64,0.133,1.307,0.259,2,0.378v-6.997
          C13.307,46.704,12.64,46.578,12,46.445"/>
        <path id="XMLID_113_" style="fill:#C49214;" d="M44,46.823v6.998c0.693-0.12,1.36-0.246,2-0.379v-6.997
          C45.36,46.578,44.693,46.704,44,46.823"/>
        <path id="XMLID_112_" style="fill:#C49214;" d="M17,47.27v6.998c0.652,0.084,1.317,0.162,2,0.232v-6.998
          C18.317,47.431,17.652,47.353,17,47.27"/>
        <path id="XMLID_111_" style="fill:#C49214;" d="M39,47.501V54.5c0.683-0.071,1.348-0.149,2-0.232V47.27
          C40.348,47.354,39.683,47.432,39,47.501"/>
        <path id="XMLID_110_" style="fill:#C49214;" d="M22,47.759v6.999c0.657,0.046,1.323,0.087,2,0.12v-7
          C23.323,47.845,22.657,47.805,22,47.759"/>
        <path id="XMLID_109_" style="fill:#C49214;" d="M34,47.878v7c0.677-0.033,1.343-0.074,2-0.12v-6.999
          C35.343,47.805,34.677,47.845,34,47.878"/>
        <path id="XMLID_108_" style="fill:#C49214;" d="M29,48c-0.335,0-0.668-0.003-1-0.006v7C28.332,54.997,28.665,55,29,55
          s0.668-0.003,1-0.006v-7C29.668,47.997,29.335,48,29,48"/>
        <path id="XMLID_107_" style="fill:#FCC62D;" d="M51.212,39.372C48.372,41.87,38.163,44,26,44c-9.51,0-17.823-1.303-22.356-3.065
          C3.227,41.313,3,41.713,3,42.13C3,45.168,14.641,48,29,48c14.36,0,26-2.832,26-5.87C55,41.083,53.615,40.147,51.212,39.372"/>
        <path id="XMLID_106_" style="fill:#FFD949;" d="M32,33c-13.213,0-24.116-2.515-25.774-5.283C2.347,28.596,0,29.767,0,31.13
          C0,34.167,11.641,37,26,37c14.359,0,26-2.833,26-5.87c0-0.134-0.03-0.265-0.075-0.395C47.156,32.077,40.002,33,32,33"/>
        <path id="XMLID_105_" style="fill:#FCC62D;" d="M50.993,16.549C47.882,18.969,37.874,21,26,21c-7.668,0-14.559-0.848-19.318-2.1
          C6.241,19.29,6,19.7,6,20.13C6,23.168,17.641,26,32,26c14.359,0,26-2.832,26-5.87C58,18.678,55.337,17.443,50.993,16.549"/>
      </g>
      </svg>
        {{ user.pasco_gold }} <span class="currency"> PG</span>
        <span class="pg-balance-text">left</span>
      </q-btn>
      <span class="help">
        <a href="http://bit.ly/2kbevom"   v-if="(this.$route.name === 'signIn' || this.$route.name === 'signUp')">Getting Started</a>
      </span>
      <q-btn ref="target" flat v-if="!(this.$route.name === 'signIn' || this.$route.name === 'signUp')">
        <q-icon name="more_vert"/>
        <!-- Direct child of target -->
        <q-popover ref="popover2" >
          <!--
            The DOM element(s) that make up the popup,
            in this case a list:
          -->
          <q-list class="menu-items" item-separator link>

            <q-item @click="$refs.popover2.close(); $router.push('/')">
              Your library
            </q-item>
            <q-item @click="$refs.popover2.close(); $router.push('/store')">
              Add a course
            </q-item>

            <q-item @click="$refs.popover2.close(); $router.push('/bookmarks')">
              Bookmarks
            </q-item>

            <q-item @click="$refs.popover2.close(); $router.push('/support')">
              Help & support
            </q-item>

            <q-item @click="$refs.popover2.close(); $router.push('/buy_pasco_gold')">
              Buy Pasco Gold
            </q-item>

            <q-item v-if="$auth.check() && this.$route.name === 'main'" @click="logOut()">
              Logout
            </q-item>

            <q-item @click="$refs.popover2.close();">
              <a href="http://bit.ly/2j6Nj6M">Getting Started</a>
            </q-item>

            <q-item @click="$refs.popover2.close();">
              <a href="http://bit.ly/">Give us Feedback</a>
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
      },
      progress () {
        console.log(this.$store.state)
        return this.$store.state.entities.progress
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

  .menu-items
    a
      color #454545
    a:hover
      color #454545
</style>

<style lang="stylus">
  @import '~variables'

  .pg-balance-text
    text-transform lowercase
    font-size 14px
    margin-left 5px
    vertical-align middle
    margin-top 4px

  .coins
    width 20px
    height 20px
    margin-right 5px

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

  .help
    color white
    margin-right 15px
    a
      color white

    a:hover
      color #d7d7d7

    a:active
      color #d7d7d7

  .q-progress
    position:absolute;
    &-track
      opacity: 0;

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

