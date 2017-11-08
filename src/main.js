// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
// require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

// Uncomment the following lines if you need IE11/Edge support
// require(`quasar/dist/quasar.ie`)
// require(`quasar/dist/quasar.ie.${__THEME}.css`)

import Vue from 'vue'
import Quasar from 'quasar'
import router from './router'
import VueResource from 'vue-resource'
import store from './store/index'
import VueClipboard from 'vue-clipboard2'
import Vuelidate from 'vuelidate'


Vue.config.productionTip = false
Vue.use(Quasar) // Install Quasar Framework
Vue.use(VueResource) // Install Vue Resource Framework
Vue.use(VueClipboard) // Copying links onclick
Vue.use(Vuelidate) // Form validation

Vue.use(require('@websanova/vue-auth'), {
  auth: require('./auth/bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/vue-resource.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  rolesVar: 'type',
  authRedirect: {path: '/signin'},
  forbiddenRedirect: {path: '/403'},
  notFoundRedirect: {path: '/404'},
  registerData: {url: 'auth/register', method: 'POST', redirect: '/signin'},
  loginData: {url: 'auth/login', method: 'POST', redirect: '/', fetchUser: false},
  logoutData: {url: 'auth/logout', method: 'POST', redirect: '/', makeRequest: false},
  oauth1Data: {url: 'auth/login', method: 'POST'},
  fetchData: {url: 'auth/user', method: 'GET', enabled: true},
  refreshData: {url: 'auth/refresh', method: 'GET', enabled: true, interval: 30}
})

if (__THEME === 'mat') {
  // require('quasar-extras/roboto-font')
}
import 'quasar-extras/material-icons'
// import 'quasar-extras/ionicons'
import 'quasar-extras/fontawesome'
// import 'quasar-extras/animate'

/* eslint-disable no-new */
new Vue({
  store, // inject store to all children
  el: '#q-app',
  router,
  render: h => h(require('./App'))
})
