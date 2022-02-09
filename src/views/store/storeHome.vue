<template>
  <div class="store-home">
    <SearchBar></SearchBar>
    <Scroll :top="scrollTop" @onScroll="onScroll" ref="scroll">
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
    </Scroll>
    <FlapCard :data='random'></FlapCard>
  </div>
</template>

<script>
import SearchBar from '@c/home/searchBar'
import Scroll from '@c/common/Scroll'
import { storeHomeMixin } from '@/utils/mixin'
import FlapCard from '@/components/home/FlapCard'
import {home} from '@/api/store'
export default {
  mixins: [storeHomeMixin],
  components: { SearchBar, Scroll ,FlapCard},
  data () {
    return {
      scrollTop: 94,
      random:null
    };
  },
  methods: {
    onScroll (offsetY) {
      this.setOffsetY(offsetY)
      if(offsetY > 0){
          this.scrollTop = 52
      }else{
          this.scrollTop = 94
      }
      this.$refs.scroll.refresh()
    }
  },
  mounted(){
      home().then(res =>{
          if(res && res.status === 200){
              const data = res.data
              const radomIndex = Math.floor(Math.random()*data.random.length)
              this.random = data.random[radomIndex]
          }
          
      })
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/global.scss";
.store-home {
  width: 100%;
  height: 100%;
}
</style>
