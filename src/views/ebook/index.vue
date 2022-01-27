<template>
  <div>
    <EbookReader></EbookReader>
    <EbookTitle></EbookTitle>
    <EbookMenu></EbookMenu>
  </div>
</template>

<script>
import { ebookMixin } from '@/utils/mixin'
import EbookReader from '@c/ebook/EbookReader.vue'
import EbookTitle from '@c/ebook/EbookTitle.vue'
import EbookMenu from '@c/ebook/EbookMenu.vue'
import { getReadTime, saveReadTime } from '@/utils/localStorage'
export default {
  mixins: [ebookMixin],
  props: {},
  components: {
    EbookReader, EbookTitle, EbookMenu
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
</style>
