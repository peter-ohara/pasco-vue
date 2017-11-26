<template>
  <div class="signin-page">
    <div class="signin shadow-10">
      <form v-on:submit.prevent="signIn()">
        <div class="row">
          <div class="top-content">
            <img src="../assets/logo.png" width="70px" height="70px" alt="" class="pasco-logo">
            <p class="text-center login-form-text">Log into your Pasco account</p>
          </div>

        </div>
        <div class="form-group email">
          <p class="error-message">{{ form.error }}</p>
          <q-input
            type="email"
            id="email"
            v-model="form.email"
            @blur="$v.form.email.$touch"
            :error="$v.form.email.$error"
            placeholder="Email"
            :before="[
              {
                icon: 'email'
              }
            ]"
          />
        </div>
        <div class="form-group password">
          <q-input
            type="password"
            id="password"
            v-model="form.password"
            placeholder="Password"
            :before="[
              {
                icon: 'lock'
            }
            ]"
          />
        </div>
        <div class="form-group">
          <q-btn class="submit-btn">
            Sign In
          </q-btn>
          <router-link v-bind:to="'/signup'">
            New to Pasco? Sign up Now
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
  import {
    QInnerLoading,
    QTransition,
    QOptionGroup,
    QInput,
    QBtn
  } from 'quasar'

  import {
    required,
    email
  } from 'vuelidate/lib/validators'

  let pageData = {
    components: {
      QInnerLoading,
      QTransition,
      QOptionGroup,
      QInput,
      QBtn
    },
    validations: {
      form: {
        email: {required, email}
      }
    },
    data () {
      return {
        form: {
          email: '',
          password: '',
          error: ''
        }
      }
    },
    methods: {
      signIn () {
        this.$auth.login({
          body: {
            auth: {
              email: this.form.email,
              password: this.form.password
            }
          },
          error: function () {
            this.form.error = 'Error logging in. Please check your email, password or internet connection'
          }
        })
      }
    }
  }

  export default pageData
</script>

<style lang="stylus" scoped>
  @import '~variables'
  .signin-page
    padding 80px 0px 50px!important
    height calc(100vh - 50px)
    background #2b8a7f
    background -moz-linear-gradient(45deg, #2b8a7f 1%, #1f7d73 22%, #197c71 37%, #2fc3ab 55%, #308d9a 77%, #326a8b 100%)
    background -webkit-linear-gradient(45deg, #2b8a7f 1%,#1f7d73 22%,#197c71 37%,#2fc3ab 55%,#308d9a 77%,#326a8b 100%)
    background linear-gradient(45deg, #2b8a7f 1%,#1f7d73 22%,#197c71 37%,#2fc3ab 55%,#308d9a 77%,#326a8b 100%)
    //filter progid:DXImageTransform.Microsoft.gradient( startColorstr='#2b8a7f', endColorstr='#326a8b',GradientType=1 )

  .top-content
    padding-top 20px
    width 100%

  .pasco-logo
    display block
    margin 0 auto !important


  .login-form-text
    display  block
    text-align center
    padding-top 10px
    font-size 18px

  .signin
    background-color rgba(255,255,255,0.9)
    max-width 400px
    width 80%
    margin 0 auto
    padding 0px 20px 20px

    form
      //margin-top 15vh
      padding 10px
    .form-group
      width 100%
      margin-top 20px
      overflow auto
    .form-group.password
      margin-top 20px
    .submit-btn
      display block
      width 100%
      padding 10px 50px
      color white
      background teal
      margin-bottom 10px
    .form-group.sign-in-with
      position absolute
      bottom 0px
      width 100%
      margin-left -10px
    .signin-google-popup
      height 50px
      background red
      color white
      width 100%

    .error-message
      font-size 13px
      color red
      line-height 1.3em
      text-align center

  //margin 10px
</style>
