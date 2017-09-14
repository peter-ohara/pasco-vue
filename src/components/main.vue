<template>
 <div class="main">
    <q-card class="search-area">
      <q-input
        v-model="text"
        placeholder="Find a test"
        :loading="loading"/>
    </q-card>
    <div class="content">
      <q-card class="card">
        <div class="card-side">
          <div class="card-icon">
            <p>ES</p>
          </div>
        </div>
        <div class="card-main">
          <p class="card-title">
            CSM 2016 Mid Semester Exam
          </p>
          <p class="duration">1hr</p>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
import {
  QInput,
  QCard} from 'quasar'


export default {
  name: 'hello',
  loading: true,
  components: {
    QInput,
    QCard
  }


}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
@import '~variables'

.search-area
  height 45px
  background white
  input
    height 40px
    padding 5px 10px 0px


.content
  margin-top 20px

.card
  background white
  display flex
  padding 10px


.card-side
  width 20%
  max-width 200px
  min-width 80px

.card-icon
  background-color $info
  border-radius 50px
  height 60px
  width 60px
  p
    line-height 60px
    color white
    font-size 30px


.card-title
  text-align left
</style>
