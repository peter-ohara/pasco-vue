<template>
  <div class="signin">
    <div class="header">
      <p>Sign In</p>
    </div>
    <form>
      <div class="form-group email">
        <q-input
          id="email"
          v-model="form.email"
          @blur="$v.form.email.$touch"
          :error="$v.form.email.$error"
          placeholder="Email"
        />
      </div>
      <div class="form-group password">
        <q-input
          id="password"
          v-model="form.password"
          placeholder="Password"
        />
      </div>
      <div class="form-group submit">
        <q-btn class="submit-btn">
          Sign In
        </q-btn>
      </div>
      <div class="form-group sign-in-with">
<!--        <button class="signin-google">Sign in with Google (redirect)</button><br>-->
        <q-btn @click="signinGoogle()" class="signin-google-popup">Sign in with Google</q-btn>
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
    Toast,
    QBtn
  } from 'quasar'

  import {
    required,
    email
  } from 'vuelidate/lib/validators'

  import Auth from '../auth'

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
        email: { required, email  }
      }
    },
    data () {
      return {
        form: {
          email: "",
          password: ""
        }
      }
    },
    methods: {
      signinGoogle() {
        // Show the Lock Widget and save the user's JWT on a successful login
        Auth.login()
      }
    }
  }

  export default pageData
</script>


<style lang="stylus">
  @import '~variables'

  .signin
    width 100%
    .header
      height 60px
      background teal
      font-size 30px
      color white
      padding 20px 15px
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
