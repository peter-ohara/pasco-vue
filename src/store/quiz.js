import Vue from 'vue'
import Vuex from 'vuex'
import localforage from 'localforage'
import api from '../api'

Vue.use(Vuex)

const FETCH_USERS_QUIZZES_REQUEST = 'fetchUserTestsRequest'
const FETCH_USERS_QUIZZES_SUCCESS = 'fetchUserTestsSuccess'
const FETCH_USERS_QUIZZES_FAILURE = 'fetchUserTestsFailure'
const SET_CURRENT_QUIZ = 'setCurrentQuiz'

const USERS_QUIZZES_KEY = 'userTests'

export default {
  state: {
    usersTests: [],
    currentQuiz: {
      id: 0,
      course_code: '',
      course_name: '',
      name: '',
      quiz_type: '',
      year: '',
      duration: '',
      instructions: '',
      questions: []
    },
    loadingUsersQuizzes: false,
    loadingQuizzesError: {}
  },
  mutations: {
    // we can use the ES2015 computed property name feature
    // to use a constant as the function name
    [FETCH_USERS_QUIZZES_REQUEST] (state) {
      state.loadingUsersQuizzes = true
    },
    [FETCH_USERS_QUIZZES_SUCCESS] (state, payload) {
      state.loadingUsersQuizzes = false
      state.usersTests = payload.usersTests
    },
    [FETCH_USERS_QUIZZES_FAILURE] (state, payload) {
      state.loadingUsersQuizzes = false
      state.loadingQuizzesError = payload.error
    },
    [SET_CURRENT_QUIZ] (state, payload) {
      state.currentQuiz = state.usersTests.find(quiz => quiz.id === payload.quizId)
    }
  },
  actions: {
    getQuizzesForUser ({commit, state, rootState}) {
      console.log('Getting quizzes...')

      if (state.usersTests.length !== 0) {
        console.log('Quizzes already in memory (Vuex store). Skipping getFromCache() and fetchNewData()...')
        return
      }

      commit(FETCH_USERS_QUIZZES_REQUEST)

      return getFromCache(USERS_QUIZZES_KEY).then(function (usersQuizzes) {
        if (usersQuizzes) {
          console.log('Committing cached usersQuizzes', usersQuizzes)
          commit(FETCH_USERS_QUIZZES_SUCCESS, {usersTests: usersQuizzes})
          return refreshCache()
        } else {
          return fetchNewData().then(function (userTests) {
            console.log('Committing usersQuizzes')
            commit(FETCH_USERS_QUIZZES_SUCCESS, {usersTests: userTests})
            return userTests
          })
        }
      })
    },
    loadQuiz ({dispatch, commit, state, rootState}, payload) {
      return dispatch('getQuizzesForUser').then(function () {
        return commit('setCurrentQuiz', payload)
      }).catch(function (error) {
        console.error(error)
      })
    }
  }
}

function getFromCache (key) {
  return localforage.getItem(key)
}

function refreshCache () {
  return api.userTests()
    .then(function (usersQuizzes) {
      console.log('Saving item to cache', usersQuizzes)
      return localforage.setItem(USERS_QUIZZES_KEY, usersQuizzes)
    })
}

function fetchNewData () {
  return api.userTests()
    .then(function (usersQuizzes) {
      console.log('Successfully fetched new data', usersQuizzes)
      console.log('Saving new data to localForage cache...')
      return localforage.setItem(USERS_QUIZZES_KEY, usersQuizzes).then(function (usersQuizzes) {
        return usersQuizzes
      })
    })
}
