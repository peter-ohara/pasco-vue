<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <header>
      <router-link v-bind:to="'/'">
        <img src="~assets/logo3.png" class="logo" alt="">
      </router-link>
    </header>
    <main>
<!--      <img src="~assets/quasar-logo-full.svg" alt="Quasar PWA">-->
      <router-view></router-view>
    </main>
    <q-ajax-bar color="orange" :delay="500" />
  </div>
</template>

<script>
/*
 * Root component
 */
import {
  QIcon,
  QAjaxBar
} from 'quasar'

export default {
  components: {
    QIcon,
    QAjaxBar
  },
  data(){
    return{

    }
  },
  created (){
    //this.isPageLoading = this.$isPageLoading
  }
}
</script>

<style lang="stylus">
  @import '~variables'


  main
    text-align center
    margin-top 0px

  header
    top 0
    width 100%
    height 60px
    background-color $primary
    //box-shadow 0px 2px 20px 1px $neutral
    position fixed
    z-index: 10
    img.logo
      padding 5px 10px
      height 50px
      margin 5px
      float left
.loading-icon
  width 30px
  height 30px
  margin 12px 12px
  animation: spinIt 1.5s infinite linear;

@keyframes spinIt {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(359deg); }
}
</style>
