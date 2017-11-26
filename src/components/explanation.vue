<template>
  <div class="explanation">
    <div id="explanation-container">
      <p class="no-exp" v-if="!question.explanation">
        We don't have an explanation to for this question at the moment.
        However, you can see what other users are saying about this question in the comments section below
      </p>
      <p>{{question.explanation}}</p>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      question: ''
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~variables'

  .no-exp
    color $secondary
</style>
