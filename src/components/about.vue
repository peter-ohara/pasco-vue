<template>
  <div class="about">
    <div class="screen-header">
      <p>About</p>
    </div>
    <div class="content">
      <p>Pasco helps university students prepare better for exams by making it easy for them to access past questions and other course content from their smartphones or PC.</p>
      <p>Pasco is currently is currently in trial mode from now till 31st October 2017 and is being tested with 1st year engineering students in KNUST.</p>
      <p>This trial version is free to use. The paid version will launch on 1st November 2017.</p>
      <p>Pasco is developed by Wires & Bytes.</p>

    </div>
  </div>
</template>


<script>
  import {
    QInnerLoading,
    QTransition,
    QOptionGroup,
    QInput,
    QBtn,
    QCard
  } from 'quasar'

  let pageData = {
    components: {
      QInnerLoading,
      QTransition,
      QOptionGroup,
      QInput,
      QBtn,
      QCard
    },
    computed: {
      bookmarks () {
        //console.log(this.$store.state.bookmarks)
        this.renderMath()
        return this.$store.state.bookmarks
      }
    },
//    data () {
//      return {
//        bookmarks: this.$store.state.bookmarks
//      }
//    },
    methods: {
      splitCourseCode: function (courseCode = "") {
        return courseCode.match(/([a-zA-Z]*)([0-9]*)/)
      },
      renderMath: function () {
        this.$nextTick(function () {
          // eslint-disable-next-line no-undef,eqeqeq
          if (typeof (katex) != 'undefined') AMfunc(true)
        })
      }
    },
    created () {
      this.renderMath()
      this.$store.dispatch('getBookmarks')
    }
  }

  export default pageData
</script>


<style lang="stylus" scoped>
  @import '~variables'

  .content
    padding 15px

</style>
