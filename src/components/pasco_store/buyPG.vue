<template>
  <div class="main buyPG">
    <template v-if="this.$store.state.entities.user">
      <div class="main-details">
        <div class="icon"></div>
        <div class="test-details">
          <p class="name">You have {{ this.$store.state.entities.user.pasco_gold }} <span class="orange colored-bg">PG</span> left</p>
          <p class="type-duration">
            Top up your Pasco Gold to purchase more courses from the Pasco store.
          </p>
        </div>
      </div>
      <div class="secondary-details">
        <div class="content">
          <div class="slider-container">
            <q-select
              v-model="price"
              float-label="Amount"
              :options="paymentOptions"
            />
          </div>
          <div class="payload-form">
            <q-btn class="submit-btn mtn" :disable="!price" @click="payWithMTNMobileMoney()">
              <img class="momo-icon" src="~assets/momo.png" alt="icon">
              Pay with MTN Mobile Money
            </q-btn>
            <q-btn class="submit-btn vodafone" :disable="!price" @click="payWithVodafoneCash()">
              <img class="momo-icon" src="~assets/vcash2.png" alt="icon">
              Pay with Vodafone Cash
            </q-btn>
          </div>
          <div class="support-info">
            <p>Need help or have questions?</p>
            <q-btn color="primary" onclick="$crisp.push(['do', 'chat:open'])">Chat With Us Live</q-btn>
          </div>
        </div>

      </div>
    </template>
  </div>
</template>

<script>
import {
  QBtn,
  QSelect,
  QInput,
  Alert,
  Loading
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
    getAmount (price) {
      switch (price) {
        case 1.9:
          return 25
        case 4.9:
          return 80
        case 9.9:
          return 190
        case 19.9:
          return 500
        case 49.9:
          return 2500
      }
    },
    payWithMTNMobileMoney () {
      Loading.show()
      return this.$http.post('gold_purchases', { gold_purchase: { price: this.price, network: 'mtn' } }).then(function (response) {
        Loading.hide()
        this.buyAlert = Alert.create(
          {
            color: 'orange',
            html: 'Your purchase of ' + this.getAmount(this.price) + ' PG has been initiated. <br>Send <strong class="orange"> GHS ' + this.price +
            '</strong> to <strong class="orange">0548780946</strong> to complete the transaction. ' +
            '<br> Please make sure to enter your email,  <br>(<strong class="orange">' + this.$store.state.entities.user.email +
            '</strong>)<br> as the reference (Ref) for the payment. <br>We will credit your Pasco Gold account after a successful transaction. <br> NB: Name of MTN Mobile Money Account is <strong>Isaac Sesi</strong>',
            icon: 'payment',
            enter: 'bounceInLeft',
            leave: 'bounceOutLeft',
            position: 'left',
            actions: [
              {
                label: 'Cancel',
                handler () {
                }
              },
              {
                label: 'PAY NOW',
                handler () {
                  window.open('tel:*170%23')
                }
              }
            ]
          }
        )
      }).catch(function (error) {
        Loading.hide()
        console.log(error)
        alert('Network Error')
        // TODO: Handle network error
      })
    },
    payWithVodafoneCash () {
      Loading.show()
      return this.$http.post('gold_purchases', { gold_purchase: { price: this.price, network: 'vodafone' } }).then(function (response) {
        Loading.hide()
        this.buyAlert = Alert.create(
          {
            color: 'red',
            html: 'Your purchase of ' + this.getAmount(this.price) + ' PG has been initiated. <br>Send <strong class="orange"> GHS ' + this.price +
            '</strong> to <strong class="orange">0503064768</strong> to complete the transaction. ' +
            '<br> Please make sure to enter your email <br>(<strong class="orange">' + this.$store.state.entities.user.email +
            '</strong>)<br> as the reference (Ref) for the payment.<br>We will credit your Pasco Gold account after a successful transaction. <br> NB: Name of Vodafone Cash Account is <strong>Isaac Sesi</strong> ',
            icon: 'payment',
            enter: 'bounceInLeft',
            leave: 'bounceOutLeft',
            position: 'left',
            actions: [
              {
                label: 'Cancel',
                handler () {
                }
              },
              {
                label: 'PAY NOW',
                handler () {
                  window.open('tel:*110%23')
                }
              }
            ]
          }
        )
      }).catch(function (error) {
        Loading.hide()
        console.log(error)
        alert('Network Error')
        // TODO: Handle network error
      })
    }
  },
  created () {
    let self = this
    this.$store.state.entities.isStale = true
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
<style lang="stylus" scoped>
  @import '~variables'

  .momo-icon
    display inline-block
    margin 6px 10px 6px -10px
    width 40px

  .buyPG
    .main-details
      text-align center
      height 150px
      background teal
      p
        color white

    .test-details
      overflow auto

    .name
      font-size 30px
      font-weight 100
      margin-top 30px

    .type-duration
      text-align center


    .secondary-details
      margin: 0 10px

    .section-title
      font-size 30px
      text-align left
    .section-title::after
      content ""
      display block
      width 30px
      height 2px
      background-color $blue
      margin-top 20px

    .section-content
      text-align left

    .section
      padding 0px 10px

  .slider-container
    margin-top 40px
    margin-bottom 20px

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

  .support-info a
    font-weight bold

  .support-info
    padding-top 150px


  .colored-bg
    z-index -100
</style>
