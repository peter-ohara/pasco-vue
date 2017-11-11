<template>
  <div class="main buyPG">
    <div class="screen-header">
      <p>Buy Pasco Gold</p>
    </div>
    <div class="content">
      <div class="slider-container">
        <q-select
          v-model="payload.amount"
          float-label="Amount"
          :options="paymentOptions"
        />
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
  QInput
} from 'quasar'

let pageData = {
  components: {
    QBtn,
    QSelect,
    QInput
  },
  data () {
    return {
      payload: {
        amount: null,
        network: "",
        number: ""
      },
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
      ],
      paymentOptions: [{
        label: 'GHS 1.9 for <span class="currency">25 PG</span>',
        value: 1.9
      }, {
        label: 'GHS 4.9 for <span class="currency">80 PG</span>',
        value: 4.9
      }, {
        label: 'GHS 9.9 for <span class="currency">190 PG</span>',
        value: 9.9
      }, {
        label: 'GHS 19.9 for <span class="currency">500 PG</span>',
        value: 19.9
      }, {
        label: 'GHS 49.9 for <span class="currency">2500 PG</span>',
        value: 49.9
      }]
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
    background $secondary
    color white

  .content
    margin auto
    padding-right 10px
    padding-left 10px
</style>
