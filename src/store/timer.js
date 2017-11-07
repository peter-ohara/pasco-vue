import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const SET_TIMER_VISIBILITY = 'setTimerVisibility'
const SET_TIMER = 'setTimer'
const START_TIMER = 'startTimer'

export default {
  state: {
    isTimerOn: false,
    timer: '00:00:00',
    timerInt: null
  },
  mutations: {
    // we can use the ES2015 computed property name feature
    // to use a constant as the function name
    [SET_TIMER_VISIBILITY] (state, payload) {
      state.isTimerOn = payload
    },
    [SET_TIMER] (state, payload) {
      state.timer = payload
    },
    [START_TIMER] (state, payload) {
      state.timerInt = payload
    }
  },
  actions: {
    setTimerVisibility ({commit, state}, payload) {
      commit(SET_TIMER_VISIBILITY, payload)
    },
    setTimer ({commit, state}, payload) {
      commit(SET_TIMER, payload)
    },
    startTimer ({commit, state}, payload) {
      commit(START_TIMER, payload)
    },
    clearTimer ({commit, state}, payload) {
      clearInterval(state.timerInt)
      commit(SET_TIMER_VISIBILITY, false)
      commit(SET_TIMER, '00:00:00')
    }
  }
}
