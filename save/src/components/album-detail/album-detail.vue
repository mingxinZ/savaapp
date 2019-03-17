<template>
    <transition name="slide">
        <div class="magazine-detail">
            <!-- <div class="loading" v-show="currentAlbum">
                <loading></loading>
            </div> -->
            <img class="back" src="/static/arrow.png" @click="back">
            <h1 class="title" v-html="currentAlbum.name"></h1>
            <div class="bg-image" :style="bgStyle" ref="bgImage">
                <img class="play" ref="playBtn" src="/static/play.png" v-show="currentAlbum.length > 0">
                <div class="filter" ref="filter"></div>
            </div>
            <div class="content-wrapper">
                <div class="description" v-html="currentAlbum.description"></div>
                <div class="magazine-songs">
                  <song-list :songs="songs" @selected="selectItem"></song-list>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { getAlbumDetail } from '../../api/getAlbumDetail.js'
import { createSong } from '../../common/js/song.js'
import Loading from '../../base/loading/loading'
import SongList from '../../base/song-list/song-list'

export default {
  data() {
    return {
      currentAlbum: [],
      songs: []
    }
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.currentAlbum.blurPicUrl})`
    },
    ...mapGetters([
      'albumId'
    ])
  },
  watch: {
    albumId(newId, oldId) {
      this._getAlbumDetail(newId)
    }
  },
  created() {
    this._getAlbumDetail(this.albumId)
  },
  methods: {
    back() {
      this.$router.back()
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
    selectItem(song, index) {
      this.selectedSong({
        list: this.songs,
        index
      })
    },
    _getAlbumDetail(id) {
      getAlbumDetail(id).then(
        (res) => {
          this.currentAlbum = res.data.album
          this.songs = this.normalizeSongs(res.data.songs)
        }
      )
    },
    ...mapActions([
      'selectedSong'
    ])
  },
  components: {
    Loading,
    SongList
  }
}
</script>

<style lang="stylus" scoped>
    @import '../../common/stylus/variable'
    @import '../../common/stylus/mixin'

    .magazine-detail
        position fixed
        z-index 990
        left 0
        bottom 0
        top 0
        right 0
        background $color-background
        height 100%
        width 100%
        .loading
            position fixed
            top 200px
        .back
            position absolute
            top 1%
            left 6px
            width 10%
            height 4%
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
            font-size $font-size-medium-x
            font-weight 300
            letter-spacing 1px
        .bg-image
            position relative
            width 100%
            background-size cover
            height 35%
            .play
                width 20%
                position absolute
                right 10%
                bottom -15%
                z-index 18
            .filter
                position absolute
                top 0
                left 0
                width 100%
                height 100%
                background rgba(7, 17, 27, 0.4)
        .content-wrapper
            width 100%
            height 65%
            overflow-y scroll
            margin-right -10px
            padding-right 10px
            .description
                width 100%
                font-size $font-size-medium-x
                line-height 30px
                padding 35px 20px 20px 20px
                letter-spacing 0.8px
                box-sizing border-box
    .slide-enter-active,.slide-leave-active
        transition all 0.3s
    .slide-enter,.slide-leave-to
        transform translate3d(100%,0,0)
</style>