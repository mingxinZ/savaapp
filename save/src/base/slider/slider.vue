<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BetterScroll from 'better-scroll'
import { addClass } from '../../common/js/dom.js'
import { setTimeout } from 'timers'

export default {
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  mounted() {
    setTimeout(() => {
      this._setSliderWidth()
      this._initSlider()
    }, 20)
    window.addEventListener('resize', () => {
      if (!this.slider) {
        return
      }
      this._setSliderWidth(true)
      this.slider.refresh()
    })
  },
  methods: {
    _setSliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children
      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item')
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      if (this.loop && !isResize) {
        width += sliderWidth * 2
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initSlider() {
      this.slider = new BetterScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: true,
          threshold: 0.3,
          easing: {
            style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            fn: function(t) {
              return t * (2 - t)
            }
          }
        },
        click: true
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/variable'
  .slider
    min-height 1px
    // max-height 120px
    margin-top 20px
    .slider-group
      position relative
      overflow hidden
      white-space nowrap
      .slider-item
        float left
        box-sizing border-box
        overflow hidden
        text-align center
        height 300px
        a
          display block
          width 100%
          overflow hidden
          text-decoration none
        img
          display block
          width 100%
          height 250px
        h2
          height 50px
          line-height 50px
          font-size $font-size-medium
          text-align left
      .slider-background
        width 80%
        height 250px
        background-color #cccccc
        overflow hidden
        p
          font-size: $font-size-small
</style>
