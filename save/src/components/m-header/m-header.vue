<template>
  <div class="m-header">
    <img src="/static/search.png" class="search" @click="toSearch">
    <div class="icon"></div>
    <img src="./font.png" width="75" height="30" class="font">
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  methods: {
    toSearch() {
      this.$router.push({
        path: '/search'
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .m-header
    position: relative
    height: 54px
    text-align: center
    color: $color-theme
    font-size: 0
    box-shadow inset 0px -2px 2px -1px #c8c7cc
    .icon
      display: inline-block
      vertical-align: top
      margin-top: 13px
      width: 30px
      height: 32px
      margin-right: 9px
      bg-image('logo')
      background-size: 30px 30px
    .font
      margin-top 17px
    .search
      width 25px
      height 25px
      position fixed
      top 15px
      left 15px
</style>