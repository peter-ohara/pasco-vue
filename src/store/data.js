import Vue from 'vue'
import Vuex from 'vuex'
import localforage from 'localforage'
import api from '../api'

Vue.use(Vuex)

const FETCH_USER_DATA_REQUEST = 'fetchUserDataRequest'
const FETCH_USER_DATA_SUCCESS = 'fetchUserDataSuccess'
const FETCH_USER_DATA_FAILURE = 'fetchUserDataFailure'
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
    user: {
      name: '',
      email: '',
      programme: '',
      pasco_gold: ''
    },
    loadingUserData: false,
    loadingUserDataError: {}
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
      state.loadingUserData = true
    },
    [FETCH_USER_DATA_SUCCESS] (state, payload) {
      state.loadingUserData = false

      // Clear courses
      state.courses.allIds = []
      state.courses.byId = {}

      state.quizzes.allIds = []
      state.quizzes.byId = {}

      state.questions.allIds = []
      state.questions.byId = {}

      state.user.name = payload.userData.name
      state.user.email = payload.userData.email
      state.user.programme = payload.userData.programme
      state.user.pasco_gold = payload.userData.pasco_gold

      // Add new courses
      payload.userData.courses.forEach(function (course) {
        state.courses.allIds.push(course.id)
        Vue.set(state.courses.byId, course.id, course)

        let quizIds = []
        course.quizzes.forEach(function (quiz) {
          state.quizzes.allIds.push(quiz.id)
          Vue.set(state.quizzes.byId, quiz.id, quiz)

          let questionIds = []
          quiz.questions.forEach(function (question) {
            state.questions.allIds.push(question.id)
            Vue.set(state.questions.byId, question.id, question)

            questionIds.push(question.id)
          })
          quiz.questions = questionIds

          quizIds.push(quiz.id)
        })
        course.quizzes = quizIds

      })
    },
    [FETCH_USER_DATA_FAILURE] (state, payload) {
      state.loadingUserData = false
      state.loadingUserDataError = payload.error
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
