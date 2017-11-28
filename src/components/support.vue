<template>
  <div class="support">
    <div class="screen-header">
      <p>Support</p>
    </div>
    <div class="content">
      <a href="tel:0501359999">
        <q-card class="card">
          <div class="card-side">
            <div class="card-icon blue">
              <q-icon name="call" style="font-size: 2rem;" color="white" />
            </div>
          </div>
          <div class="card-main">
            <p class="text card-title support-title">
              Voice Call
            </p>
            <p class="text question-count">Call our support team</p>
          </div>
        </q-card>
      </a>
      <a onclick="$crisp.push(['do', 'chat:open'])" href="#">
        <q-card class="card">
          <div class="card-side">
            <div class="card-icon blue">
              <q-icon name="forum" style="font-size: 2rem;" color="white" />
            </div>
          </div>
          <div class="card-main">
            <p class="text card-title support-title">
              Live Chat
            </p>
            <p class="text question-count">Chat with our support team Live!</p>
          </div>
        </q-card>
      </a>

    </div>
  </div>
</template>


<script>
  import {
    QCard,
    QIcon,
    QBtn
  } from 'quasar'

  let pageData = {
    components: {
      QCard,
      QIcon,
      QBtn
    },
    data () {
      return {
        loading: true,
        isTimerOn: false,
        keyword: '',
        courses: []
      }
    }
  }

  export default pageData
</script>


<style lang="stylus" scoped>
  @import '~variables'

  .support-title
    padding-top 7px

  .blue
    background-color $blue

</style>
