import Vue from 'vue'
import Vuex from 'vuex'
import localforage from 'localforage'

Vue.use(Vuex)

const ADD_BOOKMARK = 'addBookmark'
const SET_BOOKMARKS = 'setBookmarks'
const REMOVE_BOOKMARK = 'removeBookmark'

export default {
  state: {
    bookmarks: {}
  },
  mutations: {
    // we can use the ES2015 computed property name feature
    // to use a constant as the function name
    [ADD_BOOKMARK] (state, payload) {
      Vue.set(state.bookmarks, payload.id, payload)
    },
    [REMOVE_BOOKMARK] (state, id) {
      Vue.delete(state.bookmarks, id)
    },
    [SET_BOOKMARKS] (state, payload) {
      state.bookmarks = payload
    }
  },
  actions: {
    addBookmark ({commit, state}, payload) {
      commit(ADD_BOOKMARK, payload)
      saveToCache('bookmarks', state.bookmarks)
    },
    removeBookmark ({commit, state}, payload) {
      commit(REMOVE_BOOKMARK, payload)
      saveToCache('bookmarks', state.bookmarks)
    },
    getBookmarks ({commit, state}, payload) {
      return getFromCache('bookmarks').then(function (data) {
        if (data) {
          commit(SET_BOOKMARKS, data)
        }
        return data
      })
    }
  }
}

function getFromCache (key) {
  return localforage.getItem(key)
}

function saveToCache (key, payload) {
  return localforage.setItem(key, payload)
}
