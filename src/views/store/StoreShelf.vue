<template>
  <div class="store-shelf">
    <ShelfTitle></ShelfTitle>
    <Scroll
      class="store-shelf-scrool-wrapper"
      :top="0"
      :bottom="scrollBottom"
      @onScroll="onScroll"
      ref="scroll"
    >
      <ShelfSearch></ShelfSearch>
      <ShelfList></ShelfList>
    </Scroll>
    <ShelfFooter></ShelfFooter>
  </div>
</template>

<script>
import ShelfTitle from '@c/shelf/ShelfTitle';
import { storeShelfMixin } from '@/utils/mixin'
import Scroll from '@c/common/Scroll'
import ShelfSearch from '@c/shelf/ShelfSearch'
import ShelfList from '@c/shelf/ShelfList'
import { shelf } from '@/api/store'
import { appendAddToShelf } from '@/utils/store'
import ShelfFooter from '@/components/shelf/ShelfFooter'
export default {
  mixins: [storeShelfMixin],
  props: {},
  components: { ShelfTitle, Scroll, ShelfSearch, ShelfList, ShelfFooter },
  data () {
    return {
      scrollBottom: 0
    };
  },
  
 
  watch: {
    isEditMode (isEditMode) {
      this.scrollBottom = isEditMode ? 48 : 0
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })

    }
  },
  methods: {
    onScroll (offsetY) {
      this.setOffsetY(offsetY)
    },
    getShelfList () {
      shelf().then(response => {
        if (response.status === 200 && response.data && response.data.bookList) {
          this.setShelfList(appendAddToShelf(response.data.bookList))
        }
      })
    }
  },
  mounted () {
    this.getShelfList()
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/global.scss";
.store-shelf {
  width: 100%;
  height: 100%;
  background: white;
  z-index: 100;
  .store-shelf-scrool-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
  }
}
</style>
