import Vue from 'vue'
import Vuex from 'vuex'
import localforage from 'localforage'
import api from '../api'

Vue.use(Vuex)

const FETCH_USERS_TESTS_REQUEST = 'fetchUserTestsRequest'
const FETCH_USERS_TESTS_SUCCESS = 'fetchUserTestsSuccess'
const FETCH_USERS_TESTS_FAILURE = 'fetchUserTestsFailure'
const SET_CURRENT_QUIZ = 'setCurrentQuiz'
const SET_CURRENT_QUESTION = 'setCurrentQuestion'
const ADD_BOOKMARK = 'addBookmark'
const SET_BOOKMARKS = 'setBookmarks'
const REMOVE_BOOKMARK = 'removeBookmark'

const USER_TESTS_KEY = 'userTests'

export default new Vuex.Store({
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
    currentQuestion: {
      id: 0,
      question_type: 'header',
      title: '',
      content: '',
      question: '',
      choices: ''
    },
    previousQuestionUrl: '/',
    nextQuestionUrl: '/',
    loadingUsersTests: false,
    loadingTestsError: {},
    bookmarks: {}
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
    [FETCH_USERS_TESTS_FAILURE] (state, payload) {
      state.loadingUsersTests = false
      state.loadingTestsError = payload.error
    },
    [SET_CURRENT_QUIZ] (state, payload) {
      state.currentQuiz = state.usersTests.find(quiz => quiz.id === payload.quizId)
      let questions = state.currentQuiz.questions
      let currentQuestionIndex = questions.findIndex(question => question.id === state.currentQuestion.id)
      if (currentQuestionIndex === -1) {
        // currentQuestion is not actually from this quiz
        // so set it to be the first question under this quiz
        let currentQuestion = questions[0]
        console.log('Setting current question to be', currentQuestion)
        state.currentQuestion = currentQuestion
      } else {
        // currentQuestion has been set correctly
        console.log('Current question has already been set to', state.currentQuestion)
      }
    },
    [SET_CURRENT_QUESTION] (state, payload) {
      let currentQuiz = state.usersTests.find(quiz => quiz.id === payload.quizId)

      if (currentQuiz) {
        state.currentQuiz = currentQuiz

        let questions = state.currentQuiz.questions
        let currentQuestionIndex = questions.findIndex(question => question.id === payload.questionId)

        state.currentQuestion = questions[currentQuestionIndex]
        state.previousQuestionUrl = getPreviousQuestionUrl(currentQuiz.id, currentQuestionIndex, questions)
        state.nextQuestionUrl = getNextQuestionUrl(currentQuiz.id, currentQuestionIndex, questions)
      } else {
        console.error('Quiz with id' + payload.quizId + ' doesn\'t exist in this quiz')
      }
    },
    [ADD_BOOKMARK] (state, payload){
      state.bookmarks[payload.id] = payload
      console.log(state)
      saveToCache('bookmarks', state.bookmarks)
      //console.log(state)
    },
    [REMOVE_BOOKMARK] (state, id){
      delete state.bookmarks[id]
      saveToCache('bookmarks', state.bookmarks)
      //console.log(state)
    },
    [SET_BOOKMARKS] (state, payload){
      state.bookmarks = payload
      //saveToCache('bookmarks', state.bookmarks)
      //console.log(state)
    }
  },
  actions: {
    getUsersTests ({ commit, state }) {
      console.log('Getting tests...')

      commit(FETCH_USERS_TESTS_REQUEST)

      return getFromCache(USER_TESTS_KEY).then(function (userTests) {
        if (userTests) {
          console.log('Commiting cached userTests', userTests)
          commit(FETCH_USERS_TESTS_SUCCESS, { usersTests: userTests })
          return refreshCache()
        } else {
          return fetchNewData().then(function (userTests) {
            console.log('Committing userTests')
            commit(FETCH_USERS_TESTS_SUCCESS, { usersTests: userTests })
            return userTests
          })
        }
      }).catch(function (error) {
        console.error('There was an error getting the new data or saving it to the localforage to cache', error)
        commit(FETCH_USERS_TESTS_FAILURE, { error: error })
      })
    },
    getTestDetails ({ commit, state }, payload) {
      if (state.usersTests.length !== 0) {
        commit(SET_CURRENT_QUIZ, { quizId: payload.quizId })
        return
      }

      console.log('Getting tests...')

      commit(FETCH_USERS_TESTS_REQUEST)

      return getFromCache(USER_TESTS_KEY).then(function (userTests) {
        if (userTests) {
          console.log('Commiting cached userTests', userTests)
          commit(FETCH_USERS_TESTS_SUCCESS, { usersTests: userTests })
          console.log('Setting current quiz', payload)
          commit(SET_CURRENT_QUIZ, { quizId: payload.quizId })
          console.log('Refreshing cache', payload)
          return refreshCache()
        } else {
          return fetchNewData().then(function (userTests) {
            console.log('Committing userTests')
            commit(FETCH_USERS_TESTS_SUCCESS, { usersTests: userTests })
            console.log('Setting current quiz')
            commit(SET_CURRENT_QUIZ, { quizId: payload.quizId })
            return userTests
          })
        }
      }).catch(function (error) {
        console.error('There was an error getting the new data or saving it to the localforage to cache', error)
        commit(FETCH_USERS_TESTS_FAILURE, { error: error })
      })
    },
    getQuestion ({ commit, state }, payload) {
      if (state.usersTests.length !== 0) {
        console.log('Setting current Question', payload)
        commit(SET_CURRENT_QUESTION, { quizId: payload.quizId, questionId: payload.questionId })
        return
      }

      // commit(FETCH_USERS_TESTS_REQUEST)

      return getFromCache(USER_TESTS_KEY).then(function (userTests) {
        if (userTests) {
          console.log('Commiting cached userTests', userTests)
          commit(FETCH_USERS_TESTS_SUCCESS, { usersTests: userTests })
          console.log('Setting current Question', payload)
          commit(SET_CURRENT_QUESTION, { quizId: payload.quizId, questionId: payload.questionId })
          console.log('Refreshing cache', payload)
          return refreshCache()
        } else {
          return fetchNewData().then(function (userTests) {
            console.log('Committing userTests')
            commit(FETCH_USERS_TESTS_SUCCESS, { usersTests: userTests })
            console.log('Setting current question')
            commit(SET_CURRENT_QUESTION, { quizId: payload.quizId, questionId: payload.questionId })
            return userTests
          })
        }
      }).catch(function (error) {
        console.error('There was an error getting the new data or saving it to the localforage to cache', error)
        commit(FETCH_USERS_TESTS_FAILURE, { error: error })
      })
    },
    addBookmark ({commit, state}, payload) {
      console.log(payload)
      commit(ADD_BOOKMARK, payload)
    },
    getBookmarks ({commit, state}, payload) {
      return getFromCache('bookmarks').then(function(data){
        console.log(data)
        if (data) {
          commit(SET_BOOKMARKS, data)
        }
      })
      .catch(error => {
        console.log(error)
      })
    },
    removeBookmark ({commit, state}, payload) {
      console.log(payload)
      commit(REMOVE_BOOKMARK, payload)
    },
  }
})

function getFromCache (key) {

  return localforage.getItem(key)
}

function saveToCache (key, payload) {
  console.log("Saving to cache", key)
  return localforage.setItem(key, payload)
}

function refreshCache () {
  return api.userTests()
    .then(function (userTests) {
      console.log('Saving item to cache', userTests)
      return localforage.setItem(USER_TESTS_KEY, userTests)
    })
}

function fetchNewData () {
  return api.userTests()
    .then(function (userTests) {
      console.log('Successfully fetched new data', userTests)
      console.log('Saving new data to localForage cache...')
      return localforage.setItem(USER_TESTS_KEY, userTests).then(function (userTests) {
        return userTests
      })
    })
}

function getPreviousQuestionUrl (currentQuizId, currentQuestionIndex, questions) {
  let previousQuestionIndex

  if (currentQuestionIndex === -1) {
    // no question
    console.error('Question with id' + currentQuestionIndex + ' doesn\'t exist in this quiz')
  } else if (currentQuestionIndex === 0) {
    // first question
    previousQuestionIndex = currentQuestionIndex
  } else {
    previousQuestionIndex = currentQuestionIndex - 1
  }

  return '/quiz/' + currentQuizId + '/question/' + questions[previousQuestionIndex].id
}

function getNextQuestionUrl (currentQuizId, currentQuestionIndex, questions) {
  let nextQuestionIndex

  if (currentQuestionIndex === -1) {
    // no question
    console.error('Question with id' + currentQuestionIndex + ' doesn\'t exist in this quiz')
  } else if (currentQuestionIndex === questions.length - 1) {
    // last question
    nextQuestionIndex = currentQuestionIndex
  } else {
    nextQuestionIndex = currentQuestionIndex + 1
  }

  return '/quiz/' + currentQuizId + '/question/' + questions[nextQuestionIndex].id
}
