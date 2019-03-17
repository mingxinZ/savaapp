<template>
    <div class="loading">
        <img src="./loading.gif" width="24" height="24">
        <p>{{ title }}</p>
    </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'loading...'
    }
  }
}
</script>

<style lang="stylus" scoped>
    @import '../../common/stylus/variable'

    .loading
      width 100%
      text-align center
      p
      line-height 20px
      font-size $font-size-medium
      color $color-text-l
</style>
