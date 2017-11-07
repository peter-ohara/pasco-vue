<template>
  <div class="signin">
    <form v-on:submit.prevent="signIn()">
      <div class="form-group email">
        {{ form.error }}
        <q-input
          type="email"
          id="email"
          v-model="form.email"
          @blur="$v.form.email.$touch"
          :error="$v.form.email.$error"
          placeholder="Email"
        />
      </div>
      <div class="form-group password">
        <q-input
          type="password"
          id="password"
          v-model="form.password"
          placeholder="Password"
        />
      </div>
      <div class="form-group">
        <router-link v-bind:to="'/signup'">
          Sign Up
        </router-link>
        <q-btn class="submit-btn">
          Sign In
        </q-btn>
      </div>
    </form>
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
            this.form.error = 'Incorrect username or password'
          }
        })
      }
    }
  }

  export default pageData
</script>


<style lang="stylus">
  @import '~variables'

  .signin
    width 100%
    form
      margin-top 15vh
      padding 10px
    .form-group
      width 100%
      margin-top 20px
      overflow auto
    .form-group.password
      margin-top 50px
    .submit-btn
      padding 10px 50px
      color white
      background teal
      float right
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

  //margin 10px
</style>
