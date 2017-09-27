import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(Vuex)

const API_ROOT = 'https://pasco-api-staging.herokuapp.com/'
const QuizResource = Vue.resource(API_ROOT + 'quizzes{/id}?include=questions')

const FETCH_USERS_TESTS_REQUEST = 'fetchUserTestsRequest'
const FETCH_USERS_TESTS_SUCCESS = 'fetchUserTestsSuccess'
const FETCH_USERS_TESTS_FAILURE = 'fetchUserTestsFailure'

export default new Vuex.Store({
  state: {
    usersTests: [],
    testDetail: {},
    currentQuiz: {},
    loadingUsersTests: false,
    errorLoadingUsersTests: false
  },
  mutations: {
    // we can use the ES2015 computed property name feature
    // to use a constant as the function name
    [FETCH_USERS_TESTS_REQUEST] (state) {
      state.loadingUsersTests = true
    },
    [FETCH_USERS_TESTS_SUCCESS] (state, payload) {
      state.loadingUsersTests = false
      state.usersTests = payload.usersTests
    },
    [FETCH_USERS_TESTS_FAILURE] (state) {
      state.loadingUsersTests = false
      state.loadingUsersTests = true
    }
  },
  actions: {
    getUsersTests ({ commit, state }) {
      console.log('Getting tests...')

      commit(FETCH_USERS_TESTS_REQUEST)
      return QuizResource.get().then(function (data) {
        console.log('Received users tests', data)
        commit(FETCH_USERS_TESTS_SUCCESS, { usersTests: data.body.quizzes })
      }).catch(function (error) {
        console.log('Error receiving users tests', error)
        commit(FETCH_USERS_TESTS_FAILURE)
      })
    }
  }
})
