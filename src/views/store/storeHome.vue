<template>
  <div class="store-home">
    <SearchBar></SearchBar>
    <Scroll :top="scrollTop" @onScroll="onScroll" ref="scroll">
      <div class="banner-wrapper">
          <div class="banner-img" :style="{backgroundImage: `url('${banner}')`}"></div>
          <GuessYouLike :data="guessYouLike"></GuessYouLike>
          <Recommend :data="recommend" class="recommend"></Recommend>
          <Featured :data="featured" :titleText="$t('home.featured')" :btnText="$t('home.seeAll')" class="featured"></Featured>
          <!-- 分类 -->
          <div class="category-list-wrapper" v-for="(item,index) in categoryList" :key="index">
              <CategoryBook :data="item"></CategoryBook>
          </div>
          <!-- 所有分类 -->
          <Category :data="categories" class="categories"></Category>
      </div>
    </Scroll>
    <FlapCard :data='random'></FlapCard>
    
  </div>
</template>

<script>
import SearchBar from '@c/home/searchBar'
import Scroll from '@c/common/Scroll'
import GuessYouLike from '@c/home/GuessYouLike'
import Featured from '@c/home/Featured'
import Recommend from '@c/home/Recommend'
import CategoryBook from '@c/home/CategoryBook'
import Category from '@c/home/Category'
import { storeHomeMixin } from '@/utils/mixin'
import FlapCard from '@/components/home/FlapCard'
import {home} from '@/api/store'
export default {
  mixins: [storeHomeMixin],
  components: { SearchBar, Scroll ,FlapCard,GuessYouLike,Recommend,Featured,CategoryBook,Category},
  data () {
    return {
      scrollTop: 94,
      random:null,
      banner: null,
      guessYouLike: null,
      recommend: null,
      featured:null,
      categoryList: null,
      categories: null,
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
              this.banner = data.banner
              this.guessYouLike = data.guessYouLike
              this.recommend = data.recommend
              this.featured = data.featured
              this.categoryList = data.categoryList
              this.categories = data.categories
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
  .banner-wrapper{
      padding: px2rem(10);
      box-sizing: border-box;
      width: 100%;
      .banner-img{
          width: 100%;
          height: px2rem(150);
          background-repeat: no-repeat;
          background-size: 100% 100%;
      }
      .recommend{
          margin-top: px2rem(20)
      }
      .featured{
          margin-top: px2rem(20)
      }
      .category-list-wrapper{
          margin-top: px2rem(20)
      }
      .categories{
          margin-top: px2rem(20)
      }
  }
}
</style>
