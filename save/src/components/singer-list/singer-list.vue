<template>
    <div class="singers-list">
      <div class="title">
        <img @click="back" src="/static/arrow.png" width="30" height="25">
        <h1>{{ singerList.title }}</h1>
      </div>
      <div v-show="!currentSingerList" class="loading">
        <loading></loading>
      </div>
      <div class="singers-list-content">
        <ul class="list-content">
          <li @click="selectItem(singer)" class="list-item" v-for="singer in currentSingerList" :key="singer.id">
            <img v-lazy="singer.img1v1Url">
            <h3>{{ singer.name }}</h3>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import { getSingerList } from '../../api/singer-lists.js'
import Loading from '../../base/loading/loading'

export default {
  data() {
    return {
      currentSingerList: null
    }
  },
  computed: {
    ...mapGetters([
      'singerList'
    ])
  },
  created() {
    this._getSingerList(this.singerList.id)
  },
  methods: {
    back() {
      this.$router.push({
        path: '/lookingfor/singers'
      })
    },
    _getSingerList(id) {
      getSingerList(id).then((res) => {
        this.currentSingerList = res.data.artists
        console.log(this.currentSingerList)
      })
    },
    selectItem(singer) {
      this.$router.push({
        path: `/lookingfor/singers/${this.singerList.id}/${singer.id}`
      })
      console.log(this.singerList.id)
      this.setSinger(singer)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  components: {
    Loading
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/variable'
  @import '../../common/stylus/reset'

  .singers-list
    z-index 900
    position fixed
    left 0
    bottom 0
    top 0
    right 0
    background $color-background
    height 100%
    .title
      box-shadow inset 0px -1px 2px -1px $color-sub-theme
      img
        position absolute
        left 0px
        top 16px
      h1
        font-size $font-size-large
        color $color-theme
        font-weight normal
        height 50px
        line-height 50px
        padding 5px 0px 10px 40px
        box-sizing border-box
    .loading
      position fixed
      top 150px
    .singers-list-content
      height calc(100% - 50px)
      overflow-y scroll
      margin-right -20px
      padding-right 20px
      .list-content
        margin-top 10px
        .list-item
          display flex
          flex-direction row
          align-items center
          height 60px
          padding-left 20px
          img
            width 50px
            height 50px
            flex 0 0 50px
            border-radius 5px
          h3
            padding-left 20px
            flex 1
            box-shadow inset 0px -1px 2px -1px #c8c7cc
            box-sizing border-box
            height 60px
            line-height 60px
            margin-left 5px
</style>