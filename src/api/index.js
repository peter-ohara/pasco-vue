import Vue from 'vue'
import VueResource from 'vue-resource'
import router from '../router'
Vue.router = router

Vue.use(VueResource)

Vue.http.options.root = 'http://localhost:3000'
Vue.http.interceptors.push(function (request, next) {
  next(function (res) {

    // Unauthorized Access

    if (res.status === 401 && ['Unauthorized'].indexOf(res.statusText) > -1) {
      Vue.auth.logout({
        redirect: {name: 'signIn'}
      })
    }

    // System Error

    else if (res.status === 500) {
      Vue.router.push({name: 'error-500'})
    }
  })
})

Vue.use(require('@websanova/vue-auth'), {
  auth: require('./bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/vue-resource.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  rolesVar: 'type',
  authRedirect: {path: '/signin'},
  forbiddenRedirect: {path: '/403'},
  notFoundRedirect: {path: '/404'},
  registerData: {url: 'auth/register', method: 'POST', redirect: '/signin'},
  loginData: {url: 'auth/login', method: 'POST', redirect: '/', fetchUser: true},
  logoutData: {url: 'auth/logout', method: 'POST', redirect: '/', makeRequest: false},
  oauth1Data: {url: 'auth/login', method: 'POST'},
  fetchData: {url: 'auth/user', method: 'GET', enabled: true},
  refreshData: {url: 'auth/refresh', method: 'GET', enabled: true, interval: 30}
})

const API_ROOT = 'https://pasco-api-staging.herokuapp.com/'
const QuizResource = Vue.resource('quizzes{/id}?include=questions')

export default {
  userTests: function () {
    return QuizResource.get()
      .then(function (data) {
        return data.body.quizzes
      })
  }
}
