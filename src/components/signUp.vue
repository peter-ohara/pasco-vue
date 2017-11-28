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
        <!--
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
         -->
        <div class="form-group programme">
          <q-select
            filter
            separator
            autofocus-filter
            v-model="form.programme"
            :options="form.options"
            id="programme"
            @blur="$v.form.programme.$touch"
            :error="$v.form.programme.$error"
            placeholder="Your Programme"
            float-label="Your Programme"
            filter-placeholder="Search programmes"
            :before="[
              {
                icon: 'school'
            }
            ]"
          />
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
          <q-btn type="submit" class="submit-btn">
            Sign Up
          </q-btn>
          <router-link v-bind:to="'/signin'">
            Already have an account? Sign in
          </router-link>
        </div>
      </form>
      <div class="terms">
        <p>By signing up, you agree to our <a href="http://www.pascoapp.com/terms">terms and conditions.</a></p>
      </div>
    </div>
  </div>
</template>

<!--
<template>
  <div class="signin">
    <form v-on:submit.prevent="signUp()">
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
    QBtn,
    QField,
    QSelect
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
      QBtn,
      QField,
      QSelect
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
          password: '',
          options: [
            {
              label: 'BSc Agriculture',
              value: 'BSc Agriculture'
            },
            {
              label: 'BSc Natural Resources Management',
              value: 'BSc Natural Resources Management'
            },
            {
              label: 'BSc Post Harvest Technology',
              value: 'BSc Post Harvest Technology'
            },
            {
              label: 'BSc Dairy and Meat Science and Technology',
              value: 'BSc Dairy and Meat Science and Technology'
            },
            {
              label: 'BSc Landscape Design and Management',
              value: 'BSc Landscape Design and Management'
            },
            {
              label: 'BSc Agricultural Biotechnology',
              value: 'BSc Agricultural Biotechnology'
            },
            {
              label: 'BSc Agribusiness Management',
              value: 'BSc Agribusiness Management'
            },
            {
              label: 'BSc Forest Resources Technology',
              value: 'BSc Forest Resources Technology'
            },
            {
              label: 'BSc Aquaculture & Water Resources Management',
              value: 'BSc Aquaculture & Water Resources Management'
            },
            {
              label: 'BA Economics',
              value: 'BA Economics'
            },
            {
              label: 'BA Geography and Rural Development',
              value: 'BA Geography and Rural Development'
            },
            {
              label: 'BA Sociology',
              value: 'BA Sociology'
            },
            {
              label: 'BA Social Work',
              value: 'BA Social Work'
            },
            {
              label: 'BA Religious Studies',
              value: 'BA Religious Studies'
            },
            {
              label: 'BA History',
              value: 'BA History'
            },
            {
              label: 'BA Political Studies',
              value: 'BA Political Studies'
            },
            {
              label: 'BA French',
              value: 'BA French'
            },
            {
              label: 'BA Akan',
              value: 'BA Akan'
            },
            {
              label: 'BA Culture and Tourism',
              value: 'BA Culture and Tourism'
            },
            {
              label: 'BA English',
              value: 'BA English'
            },
            {
              label: 'BSc. Business Administration',
              value: 'BSc. Business Administration'
            },
            {
              label: 'LLB',
              value: 'LLB'
            },
            {
              label: 'BSc Agricultural Engineering',
              value: 'BSc Agricultural Engineering'
            },
            {
              label: 'BSc Chemical Engineering',
              value: 'BSc Chemical Engineering'
            },
            {
              label: 'BSc Civil Engineering',
              value: 'BSc Civil Engineering'
            },
            {
              label: 'BSc Geomatic Engineering',
              value: 'BSc Geomatic Engineering'
            },
            {
              label: 'BSc Materials Engineering',
              value: 'BSc Materials Engineering'
            },
            {
              label: 'BSc Mechanical Engineering',
              value: 'BSc Mechanical Engineering'
            },
            {
              label: 'BSc Electrical & Electronic Engineering',
              value: 'BSc Electrical & Electronic Engineering'
            },
            {
              label: 'BSc Computer Engineering',
              value: 'BSc Computer Engineering'
            },
            {
              label: 'BSc Aerospace Engineering',
              value: 'BSc Aerospace Engineering'
            },
            {
              label: 'BSc Petroleum Engineering',
              value: 'BSc Petroleum Engineering'
            },
            {
              label: 'BSc Telecommunication Engineering',
              value: 'BSc Telecommunication Engineering'
            },
            {
              label: 'BSc Geological Engineering',
              value: 'BSc Geological Engineering'
            },
            {
              label: 'BSc Biomedical Engineering',
              value: 'BSc Biomedical Engineering'
            },
            {
              label: 'BSc Petrochemical Engineering',
              value: 'BSc Petrochemical Engineering'
            },
            {
              label: 'BSc Metallurgical Engineering',
              value: 'BSc Metallurgical Engineering'
            },
            {
              label: 'BSc Architecture',
              value: 'BSc Architecture'
            },
            {
              label: 'BSc Construction Technology & Management',
              value: 'BSc Construction Technology & Management'
            },
            {
              label: 'BSc Quantity Surveying & Construction Economics',
              value: 'BSc Quantity Surveying & Construction Economics'
            },
            {
              label: 'BSc Development Planning',
              value: 'BSc Development Planning'
            },
            {
              label: 'BSc Human Settlement Planning',
              value: 'BSc Human Settlement Planning'
            },
            {
              label: 'BSc Land Economy',
              value: 'BSc Land Economy'
            },
            {
              label: 'BSc Real Estate',
              value: 'BSc Real Estate'
            },
            {
              label: 'BFA Painting and Sculpture',
              value: 'BFA Painting and Sculpture'
            },
            {
              label: 'BA Communication Design',
              value: 'BA Communication Design'
            },
            {
              label: 'BA Industrial Art',
              value: 'BA Industrial Art'
            },
            {
              label: 'BA Integrated Rural Art and Industry',
              value: 'BA Integrated Rural Art and Industry'
            },
            {
              label: 'BA Publishing Studies ',
              value: 'BA Publishing Studies '
            },
            {
              label: 'BSc Biochemistry',
              value: 'BSc Biochemistry'
            },
            {
              label: 'BSc Food Science and Technology',
              value: 'BSc Food Science and Technology'
            },
            {
              label: 'BSc Biological Sciences',
              value: 'BSc Biological Sciences'
            },
            {
              label: 'BSc Environmental Science',
              value: 'BSc Environmental Science'
            },
            {
              label: 'BSc Chemistry',
              value: 'BSc Chemistry'
            },
            {
              label: 'BSc Computer Science',
              value: 'BSc Computer Science'
            },
            {
              label: 'BSc Mathematics',
              value: 'BSc Mathematics'
            },
            {
              label: 'BSc Statistics',
              value: 'BSc Statistics'
            },
            {
              label: 'BSc Physics',
              value: 'BSc Physics'
            },
            {
              label: 'BSc Actuarial Science',
              value: 'BSc Actuarial Science'
            },
            {
              label: 'Doctor of Optometry',
              value: 'Doctor of Optometry'
            },
            {
              label: 'BSc Meteorology and Climate Science',
              value: 'BSc Meteorology and Climate Science'
            },
            {
              label: 'Doctor of Pharmacy',
              value: 'Doctor of Pharmacy'
            },
            {
              label: 'BSc Herbal Medicine',
              value: 'BSc Herbal Medicine'
            },
            {
              label: 'BSc Human Biology ',
              value: 'BSc Human Biology '
            },
            {
              label: 'BSc Medical Laboratory Technology',
              value: 'BSc Medical Laboratory Technology'
            },
            {
              label: 'BSc Sports and Exercise Science',
              value: 'BSc Sports and Exercise Science'
            },
            {
              label: 'BSc Nursing',
              value: 'BSc Nursing'
            },
            {
              label: 'BSc Midwifery',
              value: 'BSc Midwifery'
            },
            {
              label: 'BSc Emergency Nursing',
              value: 'BSc Emergency Nursing'
            },
            {
              label: 'BSc BDS Dental Surgery ',
              value: 'BSc BDS Dental Surgery '
            },
            {
              label: 'Doctor of Veterinary Medicine',
              value: 'Doctor of Veterinary Medicine'
            },
            {
              label: 'BSc Sonography',
              value: 'BSc Sonography'
            },
            {
              label: 'BSc Disability & Rehabilitation Studies',
              value: 'BSc Disability & Rehabilitation Studies'
            }
          ]
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
          success: function (response) {
            this.signIn()
          },
          error: function (error) {
            // TODO: Handle email already taken error
          }
        })
      },
      signIn () {
        this.$auth.login({
          body: {
            auth: {
              email: this.form.email,
              password: this.form.password
            }
          },
          error: function () {
            // TODO: Handle errors
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
    padding 50px 0px 20px!important
    height calc(100vh - 50px)
    background #2b8a7f
    background -moz-linear-gradient(45deg, #2b8a7f 1%, #1f7d73 22%, #197c71 37%, #2fc3ab 55%, #308d9a 77%, #326a8b 100%)
    background -webkit-linear-gradient(45deg, #2b8a7f 1%,#1f7d73 22%,#197c71 37%,#2fc3ab 55%,#308d9a 77%,#326a8b 100%)
    background linear-gradient(45deg, #2b8a7f 1%,#1f7d73 22%,#197c71 37%,#2fc3ab 55%,#308d9a 77%,#326a8b 100%)
  //filter progid:DXImageTransform.Microsoft.gradient( startColorstr='#2b8a7f', endColorstr='#326a8b',GradientType=1 )

  @media only screen and (max-width: 1023px)
    .signin-page
      min-height 100%
      height 100%

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

     .layout-page
        min-height 100vh !important
     .terms
      padding 10px
      p
        font-size 12px
  //margin 10px

</style>
