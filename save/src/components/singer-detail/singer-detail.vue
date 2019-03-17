<template>
    <transition name="slide">
        <div class="singer-detail">
          <img class="back" src="/static/arrow.png" @click="back">
          <h1 class="title" v-html="title"></h1>
          <div class="bg-image" :style="bgStyle" ref="bgImage">
            <!-- <img class="play" ref="playBtn" src="./play2.png" v-show="songs.length>0"> -->
            <div class="filter" ref="filter"></div>
          </div>
          <div v-show="!songs.length" class="loading">
            <loading></loading>
          </div>
          <div class="songs-list" ref="list">
            <song-list :songs="songs" @selected="selectItem"></song-list>
          </div>
        </div>
    </transition>
</template>

<script>
import { createSong } from '../../common/js/song.js'
import SongList from '../../base/song-list/song-list'
import Loading from '../../base/loading/loading'
import { mapGetters, mapActions } from 'vuex'
import { getSingerDetail } from '../../api/getSingerDetail.js'

export default {
  data() {
    return {
      songs: []
    }
  },
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.picUrl
    },
    bgStyle() {
      return `background-image:url(${this.bgImage})`
    },
    ...mapGetters([
      'singer'
    ])
  },
  watch: {
    singer(newSinger, oldSinger) {
      this._getSingerDetail(newSinger.id)
    }
  },
  created() {
    this.returnBack()
    this._getSingerDetail(this.singer.id)
  },
  methods: {
    returnBack() {
      if (!this.singer.id) {
        this.$router.push({
          path: '/lookingfor/singers'
        })
      }
    },
    normalizeSongs(list) {
      let ret = []
      list.forEach((item) => {
        if (item.id) {
          ret.push(createSong(item))
        }
      })
      return ret
    },
    back() {
      this.$router.back()
    },
    selectItem(song, index) {
      this.selectedSong({
        list: this.songs,
        index
      })
    },
    _getSingerDetail(id) {
      getSingerDetail(id).then(
        (res) => {
          this.songs = this.normalizeSongs(res.data.hotSongs)
        }
      )
    },
    ...mapActions([
      'selectedSong'
    ])
  },
  components: {
    SongList,
    Loading
  }
}
</script>

<style lang="stylus" scoped>
    @import '../../common/stylus/variable'
    @import '../../common/stylus/mixin'

    .singer-detail
        position fixed
        left 0
        right 0
        top 0
        bottom 0
        z-index 900
        background $color-background
        .back
          position absolute
          top 1%
          left 6px
          width 10%
          height 5%
          z-index 100
        .title
          position absolute
          top 1%
          left 10%
          width 80%
          z-index 100
          line-height 40px
          no-wrap()
          text-align center
          color $color-text
          font-size $font-size-large-x
          font-weight 300
          letter-spacing 1px
        .bg-image
          position relative
          width 100%
          background-size cover
          height 40%
          z-index 99
          .play
            width 20%
            position absolute
            right 10%
            bottom -15%
            z-index 100
          .filter
            position absolute
            top 0
            left 0
            width 100%
            height 100%
            background rgba(7, 17, 27, 0.4)
        .loading
          position fixed
          top 45%
          z-index 99
        .songs-list
          width 100%
          background $color-background
          margin-right -20px
          padding-right 20px
          overflow-y scroll
          height calc(70% - 110px)
          position fixed
          top 47%
    .slide-enter-active,.slide-leave-active
        transition all 0.3s
    .slide-enter,.slide-leave-to
        transform translate3d(100%,0,0)
</style>