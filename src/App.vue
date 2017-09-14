<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <header>
      <img src="~assets/logo3.png" alt="">
    </header>
    <main>
<!--      <img src="~assets/quasar-logo-full.svg" alt="Quasar PWA">-->
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
/*
 * Root component
 */
export default {}
</script>

<style lang="stylus">
  @import '~variables'

  main
    text-align center
    margin-top 0px

  header
    margin 0
    height 60px
    background-color $primary
    box-shadow 0px 2px 20px 1px $neutral
    img
      padding 5px 10px
      height 50px
      margin 5px
</style>
