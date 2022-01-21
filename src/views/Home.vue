<template>
  <div class="home">
    <div id="read"></div>
    
  </div>
</template>

<script>
import Epub from 'epubjs'
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  mounted () {
    // this.book = new Epub('/2013_Book_AndroidOnX86.epub')
    // this.book.renderTo('read', {
    //   width: window.innerWidth,
    //   height: window.innerHeight
    // }).display()
  }
}
</script>
<style scoped lang='scss'>

</style>
