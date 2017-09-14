<template>
 <div class="main">
    <div class="top">

    </div>
  </div>
</template>

<script>
import {
  QInput,
  QCard
} from 'quasar'

var pageData = {
  components: {
    QInput,
    QCard
  },
  data(){
    return{

    }
  },
  methods: {
    getTest: function(keyword){
      console.log('get tests')
      var url = 'https://pasco-api-staging.herokuapp.com/quizzes'+(keyword ? '?by_name='+keyword : '')

      this.$http.get(url).then(function(data){
        console.log(data)
        this.loading = false;
        this.tests = data.body.quizzes
      })
    }
  },
  created(){
    //console.log('page loaded')
    this.getTest()
  }
}

export default pageData


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
@import '~variables'

</style>
