import Vue from 'vue'
import Vuex from 'vuex'
import data from './data'
import bookmarks from './bookmarks'
import timer from './timer'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    entities: data,
    bookmarks: bookmarks,
    timer: timer
  }
})
