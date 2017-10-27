import Vue from 'vue'
import Vuex from 'vuex'
import data from './data'
import quiz from './quiz'
import question from './question'
import bookmarks from './bookmarks'
import timer from './timer'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    entities: data,
    quiz: quiz,
    question: question,
    bookmarks: bookmarks,
    timer: timer
  }
})
