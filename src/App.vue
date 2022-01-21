<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <div class="text">adsadada</div>
    </div>
    <router-view />
  </div>
</template>
<script>
// rem 
document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  let fontSize = window.innerWidth / 10
  fontSize = fontSize > 50 ? 50 : fontSize
  html.style.fontSize = fontSize + 'px'
})
export default {}
</script>

<style lang='scss' scoped>
@import url('./assets/styles/global.scss');
.text{
    font-size: px2rem(10);
}
</style>
