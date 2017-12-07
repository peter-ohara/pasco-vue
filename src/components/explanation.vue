<template>
  <div class="explanation">
    <div id="explanation-container">
      <p v-html="question.explanation"></p>
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
