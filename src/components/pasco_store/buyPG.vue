<template>
  <div class="main buyPG">
    <div class="screen-header">
      <p>Buy Pasco Gold</p>
    </div>
    <div class="content">
      <p class="pg-summary">With Pasco Gold you can buy courses and other content from the Pasco Store. <a href="support">Contact our Support team</a> if you have any inquiries.</p>
      <div class="slider-container">
        <q-select
          v-model="price"
          float-label="Amount"
          :options="paymentOptions"
        />
      </div>
      <div class="payload-form">
        <q-btn class="submit-btn mtn" :disable="!price" @click="payWithMTNMobileMoney()">
          <img src="/assets/mazzuma-icon.jpg" alt="">
          Pay with MTN Mobile Money
        </q-btn>
        <q-btn class="submit-btn vodafone" :disable="!price" @click="payWithVodafoneCash()">
          <img src="/assets/mazzuma-icon.jpg" alt="">
          Pay with Vodafone Cash
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import {
  QBtn,
  QSelect,
  QInput,
  Alert
} from 'quasar'

let pageData = {
  components: {
    QBtn,
    QSelect,
    QInput
  },
  data () {
    return {
      buyAlert: false,
      price: null,
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
  },
  methods: {
    payWithMTNMobileMoney () {
      return this.$http.post('gold_purchases', { gold_purchase: { price: this.price, network: 'mtn' } }).then(function (response) {
        this.buyAlert = Alert.create(
          {
            color: 'primary',
            html: 'Your request has been saved. <br>Send <span class="orange"> GHS ' + this.price +
            '</span> to <span class="orange">0545283528</span> to complete the transaction. ' +
            '<br> Please make sure to enter <br><span class="orange">' + this.$store.state.entities.user.email +
            '</span><br> as the reference (Ref) for the payment.',
            icon: 'sentiment_satisfied',
            enter: 'bounceInLeft',
            leave: 'bounceOutLeft',
            position: 'top-center'
          }
        )
      }).catch(function (error) {
        console.log(error)
        alert('Network Error')
        // TODO: Handle network error
      })
    },
    payWithVodafoneCash () {
      return this.$http.post('gold_purchases', { gold_purchase: { price: this.price, network: 'vodafone' } }).then(function (response) {
        this.buyAlert = Alert.create(
          {
            color: 'primary',
            html: 'Your request has been saved. <br>Send <span class="orange"> GHS ' + this.price +
            '</span> to <span class="orange">0503064768</span> to complete the transaction. ' +
            '<br> Please make sure to enter <br><span class="orange">' + this.$store.state.entities.user.email +
            '</span><br> as the reference (Ref) for the payment.',
            icon: 'sentiment_satisfied',
            enter: 'bounceInLeft',
            leave: 'bounceOutLeft',
            position: 'top-center'
          }
        )
      }).catch(function (error) {
        console.log(error)
        alert('Network Error')
        // TODO: Handle network error
      })
    }
  },
  created () {
    let self = this
    self.$store.dispatch('fetchUserData').then(function (response) {
      console.log(response)
    }).catch(function (error) {
      console.log(error)
    })
  }
}

export default pageData
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
  @import '~variables'

  .buyPG
    .currency
      font-weight bold

  .slider-container
    margin-top 40px
    margin-bottom 40px

  .form-group
    margin-top 50px
    padding 10px 15px 30px
    background $light-gray
    border-radius 5px
    .q-input
      margin-top 70px

  .submit-btn
    margin-top 20px
    width: 100%
    float right
    color white

  .submit-btn.mtn
    background $orange

  .submit-btn.vodafone
      background $red


  .content
    margin auto
    padding-right 10px
    padding-left 10px

  .orange
    color: $orange

  .pg-summary
    padding-top 30px
</style>
