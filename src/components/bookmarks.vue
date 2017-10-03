<template>
  <div class="bookmarks">
    <div class="screen-header">
      <p>Bookmarks</p>
    </div>
    <div class="content">
      <p class="empty-list" v-if="!bookmarks.length">Looks like you have not bookmarked anything yet.<br> <span>Go to the homepage, pick a test and start bookmarking questions you want to revisit</span></p>
      <router-link v-for="bookmark in bookmarks"  v-bind:to="bookmark.url" v-on:click.native="loadPage()">
        <q-card class="card">
          <div class="card-side">
            <div v-bind:class="{ blue: test.quiz_type === 'end_of_sem', green: test.quiz_type === 'mid_sem', orange: test.quiz_type === 'assignment'  }" class="card-icon">
              <p>
                {{ splitCourseCode(test.course_code)[1] }}
                <br>
                {{ splitCourseCode(test.course_code)[2] }}
              </p>
            </div>
          </div>
          <div class="card-main">
            <p class="text card-title">
              {{test.name}}
            </p>
            <p class="text duration">{{test.course_name}}</p>
            <p class="text question-count">{{test.question_count}}Q</p>
          </div>
        </q-card>
      </router-link>
    </div>
  </div>
</template>


<script>
  import {
    QInnerLoading,
    QTransition,
    QOptionGroup,
    QInput,
    QBtn
  } from 'quasar'

  let pageData = {
    components: {
      QInnerLoading,
      QTransition,
      QOptionGroup,
      QInput,
      QBtn
    },
    data () {
      return {
        bookmarks: this.$store.state.bookmarks
      }
    },
    methods: {

    }
  }

  export default pageData
</script>


<style lang="stylus" scoped>
  @import '~variables'

  .bookmarks
    width 100%

  .content
    margin-top 20px
    padding 10px

  .empty-list
    text-align center
    color orange
    span
      color $mid-gray
</style>
