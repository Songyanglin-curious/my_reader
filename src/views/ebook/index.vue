<template>
  <div class="ebook" ref="ebook">
    <!-- <EbookHeader></EbookHeader> -->
    <EbookReader></EbookReader>
    <EbookTitle></EbookTitle>
    <EbookMenu></EbookMenu>
    <EbookBookmark></EbookBookmark>
    <EbookFooter></EbookFooter>
  </div>
</template>

<script>
import { ebookMixin } from '@/utils/mixin'
import EbookReader from '@c/ebook/EbookReader.vue'
import EbookTitle from '@c/ebook/EbookTitle.vue'
import EbookMenu from '@c/ebook/EbookMenu.vue'
import EbookBookmark from '@c/ebook/EbookBookmark.vue'
import EbookHeader from '@c/ebook/EbookHeader.vue'
import EbookFooter from '@c/ebook/EbookFooter.vue'

import { getReadTime, saveReadTime } from '@/utils/localStorage'
export default {
  mixins: [ebookMixin],
  props: {},
  components: {
    EbookReader, EbookTitle, EbookMenu, EbookBookmark,EbookHeader,EbookFooter
  },
  data () {
    return {

    };
  },
  methods: {
    startLoopReadTime () {
      let readTime = getReadTime(this.fileName)
      if (!readTime) {
        readTime = 0
      }
      this.task = setInterval(() => {
        readTime++
        if (readTime % 30 === 0) {
          saveReadTime(this.fileName, readTime)
        }
      }, 1000)
    },
    move (value) {
      this.$refs.ebook.style.top = value + 'px'
    },
    restore () {
      this.$refs.ebook.style.top = 0
      this.$refs.ebook.style.transition = 'all .2s linear'
    //   console.log('复原')
      setTimeout(() => {
        this.$refs.ebook.style.transition = ''
      }, 200)
    }
  },
  watch: {
    offsetY (v) {
      if (!this.menuVisible && !this.bookAvailable) {
        return
      }
      if (v > 0) {
        this.move(v)
      } else if (v === 0) {
        this.restore()
      }

    }
  },
  mounted () {
    this.startLoopReadTime()
  },
  beforeDestroy () {
    if (this.task) {
      clearInterval(this.task)
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/global.scss";
.ebook {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
