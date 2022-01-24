<template>
  <div>
    <EbookReader></EbookReader>
    <EbookTitle></EbookTitle>
    <EbookMenu></EbookMenu>
  </div>
</template>

<script>
import EbookReader from '@c/ebook/EbookReader.vue'
import EbookTitle from '@c/ebook/EbookTitle.vue'
import EbookMenu from '@c/ebook/EbookMenu.vue'
export default {
  props: {},
  components: {
      EbookReader,EbookTitle,EbookMenu
  },
  data() {
    return {

    };
  },
  methods: {

  },
};
</script>

<style scoped lang="scss">

</style>
