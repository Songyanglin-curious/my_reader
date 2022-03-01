<template>
  <div class="ebook-reader">
    <div id="read"></div>
    <div
      class="ebook-reader-mask"
      @touchmove="move"
      @touchend="moveEnd"
      @mousedown.left="onMouseEnter"
      @mousemove.left="onMouseMove"
      @mouseup.left="onMouseEnd"
      @click="onMaskClick"
    ></div>
  </div>
</template>

<script>
import Epub from 'epubjs'
import { ebookMixin } from '@/utils/mixin'
import {
  getFontFamily, saveFontFamily,
  getFontSize, saveFontSize,
  getTheme, saveTheme,
  getLocation,
} from '@/utils/localStorage'
import { flatten } from '@/utils/book'
import { getLocalForage } from '@/utils/localForage'
global.ePub = Epub

export default {
  mixins: [ebookMixin],
  methods: {
    onMaskClick (e) {
      if (this.mouseState && (this.mouseState === 2 || this.mouseState === 3)) {
        return
      }
      const offsetX = e.offsetX
      const width = window.innerWidth
      if (offsetX > 0 && offsetX < width * 0.3) {
        this.prevPage()
      } else if (offsetX > 0 && offsetX > width * 0.7) {
        this.nextPage()
      } else {
        this.showTitleAndMenu()
      }
    },
    move (e) {
      let offsetY = 0
      if (this.firstOffsetY) {
        offsetY = e.changedTouches[0].clientY - this.firstOffsetY
        this.setOffsetY(offsetY)
      } else {
        this.firstOffsetY = e.changedTouches[0].clientY
      }
      e.preventDefault()
      e.stopPropagation()
    },
    moveEnd (e) {
      // 手指离开屏幕，对值做还原
      this.setOffsetY(0)
      this.firstOffsetY = null
    },
    onMouseEnter (e) {
      this.mouseState = 1
      // 判断点击时间，来辅助判断是点击还是移动
      this.mouseStartTime = e.timeStamp
      e.preventDefault()
      e.stopPropagation()
    },
    onMouseMove (e) {
      // 鼠标按下后
      if (this.mouseState === 1) {
        this.mouseState = 2
      } else if (this.mouseState === 2) {
        let offsetY = 0
        if (this.firstOffsetY) {
          offsetY = e.clientY - this.firstOffsetY
          this.setOffsetY(offsetY)
        } else {
          this.firstOffsetY = e.clientY
        }
      }
      e.preventDefault()
      e.stopPropagation()
    },
    onMouseEnd (e) {
      if (this.mouseState === 2) {
        this.setOffsetY(0)
        this.firstOffsetY = null
        this.mouseState = 3
      } else {
        this.mouseState = 4
      }
      const time = e.timeStamp - this.mouseStartTime
      if (time < 100) {
        this.mouseState = 4
      }
      e.preventDefault()
      e.stopPropagation()
    },
    prevPage () {
      if (this.rendition) {
        this.rendition.prev().then(() => {
          this.refreshLocation()
        })
        this.hideTitleAndMenu()
      }
    },
    nextPage () {
      if (this.rendition) {
        this.rendition.next().then(() => {
          this.refreshLocation()
        })
        this.hideTitleAndMenu()
      }
    },
    showTitleAndMenu () {
      if (this.menuVisible) {
        this.setSettingVisible(-1)
        this.setFontFamilyVisible(false)
      }
      this.setMenuVisible(!this.menuVisible)
    },

    initfontFamily () {
      let font = getFontFamily(this.fileName)
      if (!font) {
        saveFontFamily(this.fileName, this.defaultFontFamily)
      } else {
        this.rendition.themes.font(font)
        this.setDefaultFontFamily(font)
      }
    },
    initfontSize () {
      let fontSize = getFontSize(this.fileName)
      if (!fontSize) {
        saveFontSize(this.fileName, this.defaultFontSize)
      } else {
        this.rendition.themes.fontSize(fontSize)
        this.setDefaultFontSize(fontSize)
      }
    },
    initTheme () {
      let defaultTheme = getTheme(this.fileName)
      if (!defaultTheme) {
        defaultTheme = this.themeList[0].name
        saveTheme(this.fileName, defaultTheme)
      }
      this.setDefaultTheme(defaultTheme)
      this.themeList.forEach(theme => {
        this.rendition.themes.register(theme.name, theme.style)
      });
      this.rendition.themes.select(defaultTheme)
    },

    initRendition () {
      this.rendition = this.book.renderTo('read', {
        width: window.innerWidth,
        height: window.innerHeight,
        method: 'default'
      })
      //   this.rendition.display().then(() => {
      //     this.initfontFamily()
      //     this.initfontSize()
      //     this.initTheme()
      //     this.initGlobalStyle()
      //   })
      // 定位
      const location = getLocation(this.fileName)
      this.display(location, () => {
        this.initfontFamily()
        this.initfontSize()
        this.initTheme()
        this.initGlobalStyle()
      })

      this.rendition.hooks.content.register(contents => {
        Promise.all([
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`),
        ]).then(() => { })

      })
    },
    initGesture () {
      this.rendition.on('touchstart', event => {
        this.touchStartX = event.changedTouches[0].clientX
        this.touchStartTime = event.timeStamp

      })
      this.rendition.on('touchend', event => {
        this.touchEndX = event.changedTouches[0].clientX
        this.touchEndTime = event.timeStamp
        const offsetX = this.touchEndX - this.touchStartX
        const time = this.touchEndTime - this.touchStartTime
        if (time < 500 && offsetX > 40) {
          this.prevPage()
        } else if (time < 500 && offsetX < -40) {
          this.nextPage()
        } else {
          this.showTitleAndMenu()
        }
        if (event.cancelable) {
          event.preventDefault()
        }
        event.stopPropagation()

      })
    },
    parseBook () {
      // 获取封面
      this.book.loaded.cover.then(cover => {
        this.book.archive.createUrl(cover).then(url => {
          this.setCover(url)
        })
      })
      // 获取标题，作者等信息
      this.book.loaded.metadata.then(metadata => {
        this.setMetadata(metadata)
      })
      // 获取目录
      this.book.loaded.navigation.then(nav => {
        // 一个递归方法 ?这里的处理方法还是不太明白，需要后期好好琢磨
        const navItem = flatten(nav.toc)
        function find (item, level = 0) {
          if (!item.parent) {
            return level
          } else {
            return find(navItem.filter(parentItem => parentItem.id === item.parent[0], ++level))
          }
        }
        navItem.forEach(item => {
          item.level = find(item)
        })

        this.setNavigation(navItem)

      })
    },
    initEpub (url) {

      this.book = new Epub(url)
      this.setCurrentBook(this.book)
      this.initRendition()
      //   this.initGesture()
      this.parseBook()
      this.book.ready.then(() => {
        return this.book.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16))
      }).then(locations => {
        //   初始化
        this.navigation.forEach(nav => {
          nav.pagelist = []
        })
        locations.forEach(item => {
          const loc = item.match(/\[(.*)\]!/)[1]
          this.navigation.forEach(nav => {
            if (nav.href) {
              const href = nav.href.match(/^(.*)\.html$/)[1]
              if (href === loc) {
                nav.pagelist.push(item)
              }
            }
          })
          let currentPage = 1
          this.navigation.forEach((nav, index) => {
            if (index === 0) {
              nav.page = 1
            } else {
              nav.page = currentPage
            }
            currentPage += nav.pagelist.length + 1
          })
        })
        this.setPagelist(locations)
        this.setBookAvailable(true)
        this.refreshLocation()
      })
    }
  },
  mounted () {
    const books = this.$route.params.fileName.split('|')
    const fileName = books[1]
    getLocalForage(fileName, (err, blob) => {
      if (!err && blob) {

        this.setFileName(books.join('/')).then(() => {
          this.initEpub(blob)
        })
        console.log('找到了离线缓存电子书')
      } else {

        this.setFileName(this.$route.params.fileName.split('|').join('/')).then(
          () => {
            const url = `${process.env.VUE_APP_EPUB_URL}/` + this.fileName + '.epub'
            this.initEpub(url)
          })
        console.log('在线获取电子书')
      }
    })

  },

};
</script>

<style scoped lang="scss">
@import "../../assets/styles/global.scss";

.ebook-reader {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .ebook-reader-mask {
    position: absolute;
    z-index: 150;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
