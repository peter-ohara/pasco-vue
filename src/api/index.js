import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

const API_ROOT = 'https://pasco-api-staging.herokuapp.com/'
const QuizResource = Vue.resource(API_ROOT + 'quizzes{/id}?include=questions')

export default {
  userTests: function () {
    return QuizResource.get()
      .then(function (data) {
        return data.body.quizzes
      })
  }
}
