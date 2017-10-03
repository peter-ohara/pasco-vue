import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '@/main.vue'
import TestOverview from '@/testOverview.vue'
import QuestionsPager from '@/questionsPager.vue'

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
    { path: '/index.html?utm_source=homescreen', component: Main }, // Added for launching from homescreen
    { name: 'main', path: '/', component: Main },
    { name: 'quizOverview', path: '/quiz/:quizId', component: TestOverview },
    { name: 'questionsPager', path: '/quiz/:quizId/question/:questionId', component: QuestionsPager }
  ]
})
