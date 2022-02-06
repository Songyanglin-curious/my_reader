<template>
  <div class="store-home">
      <SearchBar></SearchBar>
  </div>
</template>

<script>
import SearchBar from '@c/home/searchBar'
export default {
  props: {},
  components: {SearchBar},
  data() {
    return {

    };
  },
  methods: {

  },
};
</script>

<style scoped lang="scss">
@import '../../assets/styles/global.scss';
.store-home{
    width: 100%;
    height: 100%;
}
</style>
