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
      <div class="support-div">
        <p class="support-text"> Or chat with us live below</p>
      </div>
    </div>
  </div>
</template>


<script>
  import {
    QCard,
    QIcon
  } from 'quasar'

  let pageData = {
    components: {
      QCard,
      QIcon
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

  .support-div
    padding 15px 10px
    text-align center

  .support-text
      font-size 18px !important

  .support-title
    padding-top 7px

</style>
