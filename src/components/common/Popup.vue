<template>
  <div class="popup" v-if="popupVisible">
    <transition name="fade">
      <div class="popup-bg" @click.stop.prevent="hide" v-show="popupVisible"></div>
    </transition>
    <transition name="popup-slide-up">
      <div class="popup-wrapper" v-show="visible">
        <div class="popup-title" v-if="title && title.length > 0">{{title}}</div>
        <div
          class="popup-btn"
          v-for="(item,index) in btn "
          :key="index"
          @click="item.click"
          :class="{'danger': item.type === 'danger'}"
        >{{item.text}}</div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'popup',
  props: {
    title: String,
    btn: Array
  },
  components: {},
  data () {
    return {
      popupVisible: false,
      //为了显示延迟，体现过度动画   
      visible: false,
    };
  },
  methods: {
    show () {
      // 先显示popup，再显示按钮，使得过度动画显示完整
      this.popupVisible = true
    //定时器是为了使得宏任务完成，即popup显示完成后，再显示按钮 使得过度动画流畅   
      setTimeout(() => {
        this.visible = true
      });

    },
    hide () {
      this.visible = false
      setTimeout(() => {
        this.popupVisible = false
      }, 200)

    }
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/global.scss";
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  .popup-bg {
    width: 100%;
    height: 100%;
  }
  .popup-wrapper {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 2000;
    width: 100%;
    background: white;
    .popup-title {
      width: 100%;
      height: px2rem(44);
      border-bottom: solid px2rrem(1) #eee;
      font-size: px2rem(12);
      line-height: px2rem(14);
      padding: px2rem(15);
      box-sizing: border-box;
      color: #999;
      @include center;
    }
    .popup-btn {
      width: 100%;
      height: px2rem(60);
      border-bottom: px2rem(1) solid #eee;
      font-size: px2rem(16);
      color: #666;
      font-weight: bold;
      @include center;
      &.danger {
        color: $color-pink;
      }
    }
  }
}
</style>
