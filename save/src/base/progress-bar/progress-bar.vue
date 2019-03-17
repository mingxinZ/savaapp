<template>
    <div class="progress-bar" ref="bar" @click="progressClick">
        <div class="bar-inner">
            <div class="progress-btn-wrapper" ref="progressBtn"
              @touchstart.prevent="progressBtnTouchStart"
              @touchmove.prevent="progressBtnTouchMove"
              @touchend.prevent="progressBtnTouchEnd">
              <div class="progress-btn"></div>
            </div>
            <div class="progress" ref="progress"></div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  watch: {
    percent(newpercent) {
      if (newpercent >= 0 && !this.touch.initiated) {
        const barWidth = this.$refs.bar.clientWidth
        const progressWidth = barWidth * newpercent
        this.$refs.progress.style.width = progressWidth + 'px'
        this.$refs.progressBtn.style.left = progressWidth + 'px'
      }
    }
  },
  created() {
    this.touch = {}
  },
  methods: {
    progressBtnTouchStart(e) {
      this.touch.initiated = true
      this.touch.startX = e.touches[0].pageX
      this.touch.left = this.$refs.progress.clientWidth
    },
    progressBtnTouchMove(e) {
      if (!this.touch.initiated) {
        return
      }
      const deltaX = e.touches[0].pageX - this.touch.startX
      const offsetWidth = Math.min(this.$refs.bar.clientWidth, Math.max(0, deltaX + this.touch.left))
      this.$refs.progressBtn.style.left = offsetWidth + 'px'
      this.$refs.progress.style.width = offsetWidth + 'px'
    },
    progressBtnTouchEnd(e) {
      this.touch.initiated = false
      this.trigglePercent()
    },
    progressClick(e) {
      const offsetWidth = e.offsetX
      this.$refs.progress.style.width = offsetWidth + 'px'
      this.$refs.progressBtn.style.left = offsetWidth + 'px'
      this.trigglePercent()
    },
    trigglePercent() {
      const barWidth = this.$refs.bar.clientWidth
      const percent = this.$refs.progress.clientWidth / barWidth
      this.$emit('percentChange', percent)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/variable'

  .progress-bar
    .bar-inner
      height 4px
      position relative
      background $color-text-l
      .progress-btn-wrapper
        position absolute
        height 10px
        top -6px
        left 1px
        .progress-btn
          position relative
          width 15px
          height 15px
          background $color-theme
          border-radius 50%
          box-shadow $color-theme-dialog 0px 0px 20px
          left 0px
          top 0px
      .progress
        position absolute
        height 100%
        background $color-text
</style>