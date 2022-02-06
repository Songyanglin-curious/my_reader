export function px2rem(px) {
    const ratio = 375 / 10
    return px / ratio
  }
  
  //获取真实尺寸的工具方法， 500 APP.vue限制
  export function realPx(px) {
    const maxWidth = window.innerWidth > 500 ? 500 : window.innerWidth
    return px * (maxWidth / 375)
  }