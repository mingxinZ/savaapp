<template>
    <div class="recommend" ref="recommend">
        <div class="recommend-content">
          <div class="musicMag">
            <h1>音乐杂志</h1>
            <div class="slider-wrapper" v-if="playlists.length">
              <slider>
                <div v-for='item in playlists' :key='item.id'>
                  <a :href="item.coverImgUrl">
                    <img v-lazy="item.coverImgUrl" class="needsclick" @click.prevent="selectList(item)">
                  </a>
                  <h2>{{ item.name }}</h2>
                </div>
              </slider>
            </div>
          </div>
          <div class="singleSong">
            <h1>潮流新碟</h1>
            <div class="slider-wrapper" v-if="songs.length">
              <slider>
                <div v-for='item in songs' :key='item.id'>
                  <a :href="item.picUrl">
                    <img v-lazy="item.picUrl" class="needsclick" @click.prevent="selectAlbum(item)">
                  </a>
                  <h2>{{ item.name }}</h2>
                </div>
              </slider>
            </div>
          </div>
          <div class="wonderful-lyrics">
            <h1>如诗耳语</h1>
            <div class="lyric-content">
              <div class="lyric-wrap">
                <p v-html="currentContent[0].content"></p>
              </div>
            </div>
            <h3 class="change" @click="change">不喜欢，换一个</h3>
          </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import Loading from '../../base/loading/loading'
import Slider from '../../base/slider/slider'
import { getRecommendPlaylist } from '../../api/getRecommendPlaylist.js'
import { getNewAlbums } from '../../api/getNewAlbums.js'
import { getRecommendLyrics } from '../../api/getRecommendLyrics.js'
import { mapMutations } from 'vuex'
import { shuffle } from '../../common/js/tools.js'

export default {
  data() {
    return {
      playlists: [],
      songs: [],
      lyrics: [],
      currentContent: {}
    }
  },
  created() {
    this._getRecommendPlaylist()
    this._getNewAlbums()
    this._getRecommendLyrics()
  },
  methods: {
    change() {
      const array = shuffle(this.lyrics)
      this.currentContent = array.slice(3, 4)
    },
    selectList(slider) {
      this.$router.push({
        path: `/recommend/magazine/${slider.id}`
      })
      this.setMagazineId(slider.id)
    },
    selectAlbum(album) {
      this.$router.push({
        path: `/recommend/newdist/${album.id}`
      })
      this.setAlibumId(album.id)
    },
    _getRecommendPlaylist() {
      getRecommendPlaylist().then(
        (res) => {
          this.playlists = res.data.playlists
        }
      )
    },
    _getNewAlbums() {
      getNewAlbums().then(
        (res) => {
          this.songs = res.data.albums
        }
      )
    },
    _getRecommendLyrics() {
      getRecommendLyrics().then(
        (res) => {
          this.lyrics = shuffle(res.data.result.list)
          this.currentContent = this.lyrics.slice(3, 4)
          console.log(this.currentContent)
        }
      )
    },
    ...mapMutations({
      setMagazineId: 'SET_MAGAZINEID',
      setAlibumId: 'SET_ALBUMID'
    })
  },
  components: {
    Slider,
    Loading
  }
}
</script>

<style lang="stylus" scoped>
    @import '../../common/stylus/variable'
    .recommend
        width 100%
        position fixed
        top 70px
        height calc(100% - 110px)
        overflow-y scroll
        margin-right -20px
        padding-right 20px
        .recommend-content
          overflow hidden
          margin-left 25px
          margin-right 25px
          h1
            text-align left
            font-size $font-size-medium-x
            margin-top 10px
            margin-bottom 10px
          .singleSong
            margin-top 20px
          .wonderful-lyrics
            margin-top 20px
            margin-bottom 50px
            .change
              text-align center
              margin-top 10px
              height 30px
              line-height 30px
              font-size $font-size-medium
            .lyric-content
              width 99%
              height 200px
              border 1px dotted #ffffff
              margin-top 20px
              position relative
              .lyric-wrap
                width 84%
                height 150px
                position absolute
                top 40px
                left 8%
                overflow hidden
                p
                  font-size $font-size-large
                  color $color-text
                  width 100%
                  position absolute
                  line-height 30px
                  font-weight lighter
</style>