<template>
  <div class="main buyPG">
    <div class="screen-header">
      <p>Buy Pasco Gold</p>
    </div>
    <div class="content">
      <div class="slider-container">
        <p class="selected-amount">
          GHS 25 for <span class="currency">50 PG</span>
        </p>
        <q-slider
          v-model="payload.amount"
          :min="0"
          :max="50"
          :step="10"
          label
          snap/>
      </div>
      <form class="payload-form" action="">
        <div class="form-group">
          <q-select
            v-model="payload.network"
            float-label="Select a network"
            radio
            :options="networks"
          />
          <q-input
            v-model="payload.number"
            float-label="Phone Number"
            placeholder="Phone Number" />
        </div>
        <q-btn class="submit-btn">
          <img src="/assets/mazzuma-icon.jpg" alt="">
          Pay with Mazzuma
        </q-btn>

      </form>
    </div>
  </div>
</template>

<script>
import {
  QBtn,
  QSelect,
  QInput,
  QSlider
} from 'quasar'

let pageData = {
  components: {
    QBtn,
    QSelect,
    QInput,
    QSlider
  },
  data () {
    return {
      payload: {
        amount: 0,
        network: "",
        number: ""
      },
      amount: 0,
      networks: [{
          label: 'MTN',
          value: 'MTN'
        }, {
          label: 'Vodafone',
          value: 'Vodafone'
        }, {
          label: 'Tigo',
          value: 'Tigo'
        }, {
          label: 'Airtel',
          value: 'Airtel'
        }
      ]
    }
  }
}

export default pageData
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" >
  @import '~variables'

  .buyPG
    .currency
      font-weight bold

  .slider-container
    margin-top 40px

  .form-group
    margin-top 50px
    padding 10px 15px 30px
    background $light-gray
    border-radius 5px
    .q-input
      margin-top 70px

  .submit-btn
    margin-top 20px
    float right
    background #d40cd4
    color white
</style>
