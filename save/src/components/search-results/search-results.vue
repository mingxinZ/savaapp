<template>
    <div class="search-results">
        <div class="title">
            <img src="/static/arrow.png" @click="back">
            <h1 v-html="currentTitle"></h1>
        </div>
        <div class="loading" v-show="!songs.length > 0">
            <loading></loading>
        </div>
        <div class="song-list">
            <song-list :songs="songs" @selected="selectItem"></song-list>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { getSearchResults } from '../../api/searchresults.js'
import { searchSong } from '../../common/js/song.js'
import SongList from '../../base/song-list/song-list'
import Loading from '../../base/loading/loading'

export default {
  data() {
    return {
      songs: []
    }
  },
  computed: {
    currentTitle() {
      return decodeURIComponent(this.keyword)
    },
    ...mapGetters([
      'keyword'
    ])
  },
  watch: {
    keyword(newKeyword, oldKeyword) {
      this._getSearchResults(newKeyword)
    }
  },
  created() {
    this._getSearchResults(this.keyword)
  },
  methods: {
    back() {
      this.$router.back()
    },
    _getSearchResults(keyword) {
      getSearchResults(keyword).then((res) => {
        // console.log(res.data.result.songs)
        this.songs = this.normalizeSongs(res.data.result.songs)
        console.log(this.songs)
      })
    },
    selectItem(song, index) {
      this.selectedSong({
        list: this.songs,
        index
      })
    },
    normalizeSongs(list) {
      let ret = []
      list.forEach((item) => {
        if (item.id) {
          ret.push(searchSong(item))
        }
      })
      return ret
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

    .search-results
        position fixed
        left 0
        right 0
        top 0
        bottom 0
        z-index 999
        background $color-background
        width 100%
        height 100%
        .title
            display flex
            align-items center
            height 60px
            img
                flex 0 0 40px
                width 40px
                height 40px
                margin 0 10px 0 10px
            h1
                color $color-text
                font-size $font-size-large-x
                text-align left
                no-wrap()
                flex 1
                line-height 60px
                // padding-right 10px
        .loading
            position fixed
            top 150px
        .song-list
            width 100%
            position fixed
            top 70px
            height calc(100% - 70px)
            overflow-y scroll
            margin-right -20px
            padding-right 20px
</style>