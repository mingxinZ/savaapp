<template>
  <mt-tabbar class='mt-tabbar' v-model="selected" fixed>
    <mt-tab-item id="推荐">
      <img slot="icon" src="./recommend.png">
      推荐
    </mt-tab-item>
    <mt-tab-item id="发现">
      <img slot="icon" src="./lookingfor.png">
      发现
    </mt-tab-item>
    <mt-tab-item id="冒泡">
      <img slot="icon" src="./community.png">
      冒泡
    </mt-tab-item>
    <mt-tab-item id="我的">
      <img slot="icon" src="./mine.png">
      我的
    </mt-tab-item>
  </mt-tabbar>
</template>

<script>
export default {
  data() {
    return {
      selected: '推荐'
    }
  },
  watch: {
    selected(newval, oldval) {
      console.log(newval)
      switch (newval) {
        case '推荐':
          this.$router.push({
            path: '/recommend'
          })
          break
        case '发现':
          this.$router.push({
            path: '/lookingfor'
          })
          break
        case '冒泡':
          this.$router.push({
            path: '/community'
          })
          break
        case '我的':
          this.$router.push({
            path: '/mine'
          })
          break
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>