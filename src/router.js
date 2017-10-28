import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '@/main.vue'
import Course from '@/course/course.vue'
import Quiz from '@/quiz.vue'
import QuestionsPager from '@/questionsPager.vue'
import SignIn from '@/signIn.vue'
import SignUp from '@/signUp.vue'
import Bookmarks from '@/bookmarks.vue'
import About from '@/about.vue'

Vue.use(VueRouter)

/*
 * Uncomment this section and use "load()" if you want
 * to lazy load routes.
function load (component) {
  // '@' is aliased to src/components
  return () => import(`@/${component}.vue`)
}
*/

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  mode: 'history',
  routes: [
    {
      name: 'signIn', path: '/signin', component: SignIn, meta: { auth: false }
    },
    {
      name: 'signUp', path: '/signup', component: SignUp, meta: { auth: false }
    },
    {
      name: 'about', path: '/about', component: About
    },
    {
      name: 'main', path: '/', component: Main, meta: { auth: true }
    },
    {
      name: 'course', path: '/course/:courseId', component: Course, meta: { auth: true }
    },
    {
      name: 'quiz', path: '/quiz/:quizId', component: Quiz, meta: { auth: true }
    },
    {
      name: 'question', path: '/quiz/:quizId/question/:questionId', component: QuestionsPager, meta: { auth: true }
    },
    {
      name: 'bookmarks', path: '/bookmarks', component: Bookmarks, meta: { auth: true }
    }
  ]
})
