<template>
  <div class="shelf-list">
    <div v-for="item in shelfList" :key="item.id" class="shelf-list-item-wrapper">
      <ShelfItem :data="item" :style="{height:itemHeight}"></ShelfItem>
      <div class="shelf-list-title-wrapper">
          <span class="shelf-item-title title-small">{{item.title}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { storeShelfMixin } from '@/utils/mixin'
import ShelfItem from './ShelfItem'
import { realPx } from '@/utils/utils'
export default {
  mixins: [storeShelfMixin],
  props: {},
  components: { ShelfItem },
  data () {
    return {

    };
  },
  computed: {
    itemHeight () {
      // w / 250 = h / 350
      // h = w / 250 * 350
      return ((window.innerWidth - realPx(120)) / 3) / 250 * 350 + 'px'
    }
  },
  methods: {

  },
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/global.scss";
.shelf-list {
  position: absolute;
  top: px2rem(94);
  left: 0;
  z-index: 100;
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  padding: 0 px2rem(15);
  box-sizing: border-box;
  .shelf-list-item-wrapper {
    flex: 0 0 33.33%;
    width: 33.33%;
    padding: px2rem(15);
    box-sizing: border-box;
    .shelf-list-title-wrapper{
        margin-top: px2rem(10);
    }
  }
}
</style>
