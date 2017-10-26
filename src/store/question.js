import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const SET_CURRENT_QUESTION = 'setCurrentQuestion'

export default {
  state: {
    currentQuestion: {
      id: 0,
      question_type: 'header',
      title: '',
      content: '',
      question: '',
      choices: ''
    }
  },
  mutations: {
    // we can use the ES2015 computed property name feature
    // to use a constant as the function name
    [SET_CURRENT_QUESTION] (state, payload) {
      state.currentQuestion = payload.questions.find(question => question.id === payload.questionId)
    }
  },
  actions: {
    loadQuestion ({dispatch, commit, state, rootState}, payload) {
      return dispatch('getQuizzesForUser').then(function () {
        return commit('setCurrentQuiz', payload)
      }).then(function () {
        payload.questions = rootState.quiz.currentQuiz.questions
        return commit('setCurrentQuestion', payload)
      }).catch(function (error) {
        console.error(error)
      })
    }
  }
}
