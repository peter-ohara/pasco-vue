import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '@/main.vue'
import PascoStore from '@/pasco_store/pascoStore.vue'
import StoreCourse from '@/pasco_store/storeCourse.vue'
import BuyPG from '@/pasco_store/buyPG.vue'
import Course from '@/course/course.vue'
import Quiz from '@/quiz.vue'
import QuestionsPager from '@/questionsPager.vue'
import SignIn from '@/signIn.vue'
import SignUp from '@/signUp.vue'
import Bookmarks from '@/bookmarks.vue'
import About from '@/about.vue'
import Support from '@/support.vue'

Vue.use(VueRouter)

/*
 * Uncomment this section and use "load()" if you want
 * to lazy load routes.
function load (component) {
  // '@' is aliased to src/components
  return () => import(`@/${component}.vue`)
}
*/

const router = new VueRouter({
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
      name: 'pascoStore', path: '/store', component: PascoStore, meta: { auth: true }
    },
    {
      name: 'storeCourse', path: '/store/course/:courseId', component: StoreCourse, meta: { auth: true }
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
    },
    {
      name: 'buyPG', path: '/buy_pasco_gold', component: BuyPG, meta: { auth: true }
    },
    {
      name: 'support', path: '/support', component: Support, meta: { auth: true }
    }
  ]
})

router.afterEach((to, from, next) => {
 // console.log(to.name, to.name === "support")
  if((to.name === "support" || to.name === "buyPG") || (to.name === 'signUp' || to.name === 'signIn'))
    $crisp.push(['do', 'chat:show'])
  else
    $crisp.push(['do', 'chat:hide']);
  //next();
})
/*
router.afterEach((to, from, next) => {
  console.log(to.name, to.name === "buyPG")
  to.name === "buyPG" ? $crisp.push(['do', 'chat:show']) : $crisp.push(['do', 'chat:hide']);
  //next();
})
*/

export default router;
