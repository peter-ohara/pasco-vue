<template>
  <div class="signin-page">
    <div class="signin shadow-10">
      <form v-on:submit.prevent="signUp()">
        <div class="row">
          <div class="top-content">
            <img src="../assets/logo.png" width="70px" height="70px" alt="" class="pasco-logo">
            <p class="text-center login-form-text">Create a Pasco account</p>
          </div>

        </div>
        <div class="form-group name">
          <p class="error-message">{{ form.error }}</p>
          <q-input
            type="text"
            id="name"
            v-model="form.name"
            @blur="$v.form.name.$touch"
            :error="$v.form.name.$error"
            placeholder="Name"
            :before="[
              {
                icon: 'person'
            }
            ]"
          />
        </div>

        <div class="form-group programme">
          <q-input
            type="text"
            id="programme"
            v-model="form.programme"
            @blur="$v.form.programme.$touch"
            :error="$v.form.programme.$error"
            placeholder="Programme"
            :before="[
              {
                icon: 'school'
            }
            ]"
          />
        </div>

        <div class="form-group email">
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
            Sign Up
          </q-btn>
          <router-link v-bind:to="'/signin'">
            Already have an account? Sign in
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<!--
<template>
  <div class="signin">
    <form v-on:submit.prevent="signUp()">
      {{ form.error }}
      <div class="form-group name">
        <q-input
          type="text"
          id="name"
          v-model="form.name"
          @blur="$v.form.name.$touch"
          :error="$v.form.name.$error"
          placeholder="Name"
        />
      </div>
      <div class="form-group programme">
        <q-input
          type="text"
          id="programme"
          v-model="form.programme"
          @blur="$v.form.programme.$touch"
          :error="$v.form.programme.$error"
          placeholder="Programme"
        />
      </div>
      <div class="form-group email">
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
        <router-link v-bind:to="'/signin'">
          Sign In
        </router-link>
        <q-btn class="submit-btn">
          Sign Up
        </q-btn>
      </div>
    </form>
  </div>
</template>
-->

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
        name: {required},
        programme: {required},
        email: {required, email}
      }
    },
    data () {
      return {
        form: {
          name: '',
          programme: '',
          email: '',
          password: ''
        }
      }
    },
    methods: {
      signUp () {
        this.$auth.register({
          body: {
            user: {
              name: this.form.name,
              programme: this.form.programme,
              email: this.form.email,
              password: this.form.password
            }
          },
          error: function () {
            this.form.error = 'This email already exists. If you own this account, please sign in'
          }
        })
      }
    }
  }

  export default pageData
</script>


<style lang="stylus" scoped>
  @import '~variables'

  /*
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
*/
  .signin-page
    padding 80px 0px 50px!important
    height 100vh
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
