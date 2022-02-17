<template>
  <div class="store-shelf">
    <ShelfTitle :title="shelfCategory.title" ></ShelfTitle>
    <Scroll
      class="store-shelf-scrool-wrapper"
      :top="0"
      :bottom="scrollBottom"
      @onScroll="onScroll"
      ref="scroll"
      v-if="ifShowList"
    >
      <ShelfList :top="42" :data="shelfCategory.itemList"></ShelfList>
    </Scroll>
    <div class="store-shelf-empty-view" v-else>{{$t('shelf.groupNone')}}</div>
    <ShelfFooter></ShelfFooter>
  </div>
</template>

<script>
import ShelfTitle from '@c/shelf/ShelfTitle';
import { storeShelfMixin } from '@/utils/mixin'
import Scroll from '@c/common/Scroll'
import ShelfList from '@c/shelf/ShelfList'
import ShelfFooter from '@c/shelf/ShelfFooter'

export default {
  mixins: [storeShelfMixin],
  props: {},
  components: { ShelfTitle, Scroll, ShelfList, ShelfFooter },
  data () {
    return {
      scrollBottom: 0
    };
  },
  computed: {
    ifShowList () {
      return this.shelfCategory.itemList && this.shelfCategory.itemList.length > 0
    }
  },

  watch: {
    isEditMode (isEditMode) {
      this.scrollBottom = isEditMode ? 48 : 0
      if (this.ifShowList) {
        this.$nextTick(() => {
          this.$refs.scroll.refresh()
        })
      }


    }
  },
  methods: {
    onScroll (offsetY) {
      this.setOffsetY(offsetY)
    },

  },
  mounted () {
    this.getCategoryList(this.$route.query.title)
    this.setCurrentType(2)
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
  .store-shelf-empty-view {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: px2rem(14);
    color: #333;
    @include center;
  }
}
</style>
