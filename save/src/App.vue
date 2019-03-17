<template>
  <div id="app">
    <m-header></m-header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
    <tab></tab>
  </div>
</template>

<script>
import MHeader from './components/m-header/m-header'
import Tab from './components/tab/tab'
import Player from './components/player/player'

export default {
  components: {
    MHeader,
    Tab,
    Player
  }
}
</script>

<style lang="stylus" rel='stylesheet/stylus' scoped>
  #app
    height 100%
    overflow hidden
</style>
