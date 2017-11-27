import Vue from 'vue'
import VueResource from 'vue-resource'
import router from '../router'
Vue.use(VueResource)

Vue.router = router
Vue.http.interceptors.push(function (request, next) {
  next(function (res) {
    if (res.status === 401 && ['Unauthorized'].indexOf(res.statusText) > -1) {
      // Unauthorized Access

      Vue.auth.logout({
        redirect: {name: 'signIn'}
      })
    } else if (res.status === 500) {
      // System Error

      Vue.router.push({name: 'error-500'})
    }
  })
})

// Vue.http.options.root = 'https://pasco-api-production.herokuapp.com/'
Vue.http.options.root = 'https://pasco-api-staging.herokuapp.com/'
// Vue.http.options.root = 'https://pasco-api-development.herokuapp.com/'
// Vue.http.options.root = 'http://localhost:3000'
const QuizResource = Vue.resource('quizzes{/id}?include=questions')
const UserResource = Vue.resource('auth/user')

export default {
  userTests: function () {
    return UserResource.get()
      .then(function (data) {
        return data.body.user.quizzes
      })
  },
  userData: function () {
    return UserResource.get()
      .then(function (data) {
        return data.body.user
      })
  }
}
