import Vue from 'vue'
import Vuex from 'vuex'
import localforage from 'localforage'
import api from '../api'

Vue.use(Vuex)

const FETCH_USER_DATA_REQUEST = 'fetchUserRequest'
const FETCH_USER_DATA_SUCCESS = 'fetchUserSuccess'
const FETCH_USER_DATA_FAILURE = 'fetchUserFailure'
const SET_CURRENT_COURSE = 'setCurrentCourse'

const USER_DATA_KEY = 'pascoUser'

export default {
  state: {
    courses: {
      byId: {},
      allIds: []
    },
    quizzes: {
      byId: {},
      allIds: []
    },
    questions: {
      byId: {},
      allIds: []
    },
    loadingUser: false,
    loadingUserError: {}
  },
  getters: {
    courses: state => {
      return state.courses.allIds.map(courseId => state.courses.byId[courseId])
    }
  },
  mutations: {
    // we can use the ES2015 computed property name feature
    // to use a constant as the function name
    [FETCH_USER_DATA_REQUEST] (state) {
      state.loadingUser = true
    },
    [FETCH_USER_DATA_SUCCESS] (state, payload) {
      state.loadingUser = false

      // Clear courses
      state.courses.allIds = []
      state.courses.byId = {}

      state.quizzes.allIds = []
      state.quizzes.byId = {}

      state.questions.allIds = []
      state.questions.byId = {}

      // Add new courses
      payload.userData.courses.forEach(function (course) {
        state.courses.allIds.push(course.id)
        Vue.set(state.courses.byId, course.id, course)

        course.quizzes.forEach(function (quiz) {
          state.quizzes.allIds.push(quiz.id)
          Vue.set(state.quizzes.byId, quiz.id, quiz)

          quiz.questions.forEach(function (question) {
            state.questions.allIds.push(question.id)
            Vue.set(state.questions.byId, question.id, question)
          })
        })
      })
    },
    [FETCH_USER_DATA_FAILURE] (state, payload) {
      state.loadingUser = false
      state.loadingUserError = payload.error
    },
    [SET_CURRENT_COURSE] (state, payload) {
      state.currentQuiz = state.usersTests.find(quiz => quiz.id === payload.quizId)
    }
  },
  actions: {
    fetchUserData ({commit, state, rootState}) {
      console.log('Fetching userData...')

      commit(FETCH_USER_DATA_REQUEST)

      return api.userData()
        .then(function (userData) {
          console.log('Successfully fetched userData', userData)
          console.log('Saving userData to localForage cache...')
          return localforage.setItem(USER_DATA_KEY, userData).then(function (userData) {
            commit(FETCH_USER_DATA_SUCCESS, {userData: userData})
            return userData
          })
        })
    }
  }
}
