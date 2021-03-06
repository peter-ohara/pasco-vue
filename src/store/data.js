import Vue from 'vue'
import Vuex from 'vuex'
import localforage from 'localforage'
import api from '../api'
import {
  Loading
} from 'quasar'

Vue.use(Vuex)

const FETCH_USER_DATA_REQUEST = 'fetchUserDataRequest'
const FETCH_USER_DATA_SUCCESS = 'fetchUserDataSuccess'
const FETCH_USER_DATA_FAILURE = 'fetchUserDataFailure'
const SET_CURRENT_COURSE = 'setCurrentCourse'
const SET_PROGRESS = 'setProgress'

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
    isStale: true,
    loadingUserData: false,
    loadingUserDataError: {},
    progress: 0
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
      Loading.show()
    },
    [FETCH_USER_DATA_SUCCESS] (state, payload) {
      state.loadingUserData = false
      Loading.hide()
      state.isStale = false

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
      Loading.hide()
      state.loadingUserDataError = payload.error
    },
    [SET_CURRENT_COURSE] (state, payload) {
      state.currentQuiz = state.usersTests.find(quiz => quiz.id === payload.quizId)
    },
    [SET_PROGRESS] (state, payload) {
      state.progress = payload
    }
  },
  actions: {
    fetchUserData ({commit, state}) {
      if (state.isStale) {
        console.log('Fetching userData...')

        commit(FETCH_USER_DATA_REQUEST)

        return api.userData()
          .then(function (userData) {
            console.log('Successfully fetched userData', userData)
            console.log('Saving userData to localForage cache...')

            FS.identify(userData.id, {
              displayName: userData.name,
              email: userData.email
              // TODO: Add your own custom user variables here, details at
              // http://help.fullstory.com/develop-js/setuservars.
            })

            return localforage.setItem(USER_DATA_KEY, userData).then(function (userData) {
              commit(FETCH_USER_DATA_SUCCESS, {userData: userData})
              return userData
            })
          })
      } else {
        console.log('Using userData from memory...')
        return state.user
      }
    },
    //Loading function is now redundant but can be used for other purposes so I've not deleted it
    loading ({commit, state}) {
      setInterval(() => {
        const progress = Math.random();
        commit(SET_PROGRESS, progress)
      }, 1000)

    }
  }
}
