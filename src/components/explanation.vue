<template>
  <div class="explanation">
    <div id="explanation-container">
      <p class="no-exp" v-if="!question.explanation">
        Sorry. But there is no explanation for this question. You can however view
        explanations from other users in the discussion section below or add your own
      </p>
      <p>{{question.explanation}}</p>
    </div>
  </div>
</template>
<script>
  import {
    QBtn
  } from 'quasar'

  export default {
    props: {
      question: ''
    },
    components: {
      QBtn
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~variables'

  .no-exp
    color $secondary
</style>
