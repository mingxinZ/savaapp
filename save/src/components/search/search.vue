<template>
    <transition name="slide">
        <div class="search">
            <div class="search-bar">
                <img src="/static/arrow.png" class="back" @click="back">
                <input type="text" v-model="query" placeholder="请输入您搜索的歌曲、歌手、专辑..." class="search-input">
                <span @click="search">搜索</span>
                <img src="/static/search-icon.png" class="search-icon">
            </div>
            <div class="suggest-results" v-show="searchSuggests.length > 0">
                <ul class="suggest-list">
                    <li class="suggest-item" v-for="(item, index) in searchSuggests" :key="index" @click="selectSuggestion(item)">
                        <img src="/static/search.png">
                        <h3 class="suggest-content">{{ item.keyword }}</h3>
                    </li>
                </ul>
            </div>
            <div class="search-history clearfix">
                <div class="title">
                  <h2>搜索历史</h2>
                  <img src="/static/delete.png" class="clear" @click="clear">
                </div>
                <ul class="list">
                    <li class="item" v-for="(item,index) in searchHistory" :key="index" v-html="item" @click="selectItem(item)"></li>
                </ul>
            </div>
            <div class="hot-keys clearfix">
                <h2 class="title">热门搜索</h2>
                <ul class="list">
                    <li class="item" v-for="(item,index) in hotKeys" :key="index" @click="selectHot(item)">{{ item.first }}</li>
                </ul>
            </div>
        </div>
    </transition>
</template>

<script>
import { getHotKeys } from '../../api/hotkeys.js'
import { getSearchSuggests } from '../../api/searchSuggest.js'
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      query: '',
      hotKeys: [],
      searchSuggests: [],
      searchHistory: []
    }
  },
  watch: {
    query(newQuery, oldQuery) {
      this._getSearchSuggests(newQuery)
      if (newQuery === '') {
        this.searchSuggests = []
      }
    }
  },
  created() {
    this._getHotKeys()
  },
  methods: {
    clear() {
      this.searchHistory = ''
    },
    search() {
      this.searchHistory.push(this.param)
      const encodeQuery = encodeURIComponent(this.query)
      this.setKeyword(encodeQuery)
      this.$router.push({
        path: `/search/${encodeQuery}`
      })
    },
    selectSuggestion(suggestion) {
      this.searchHistory.push(suggestion.keyword)
      const encodeQuery = encodeURIComponent(suggestion.keyword)
      this.setKeyword(encodeQuery)
      this.$router.push({
        path: `/search/${encodeQuery}`
      })
    },
    selectItem(item) {
      const encodeQuery = encodeURIComponent(item)
      this.setKeyword(encodeQuery)
      this.$router.push({
        path: `/search/${encodeQuery}`
      })
    },
    selectHot(item) {
      const encodeQuery = encodeURIComponent(item.first)
      this.setKeyword(encodeQuery)
      this.$router.push({
        path: `/search/${encodeQuery}`
      })
    },
    back() {
      this.$router.back()
    },
    _getHotKeys() {
      getHotKeys().then(
        (res) => {
          this.hotKeys = res.data.result.hots.slice(0, 6)
        }
      )
    },
    _getSearchSuggests(param) {
      getSearchSuggests(param).then(
        (res) => {
          this.searchSuggests = res.data.result.allMatch
        }
      )
    },
    ...mapMutations({
      setKeyword: 'SET_KEYWORD'
    })
  }
}
</script>

<style lang="stylus" scoped>
    @import '../../common/stylus/variable'
    @import '../../common/stylus/reset'

    .search
        position fixed
        left 0
        right 0
        top 0
        bottom 0
        z-index 999
        background $color-background
        width 100%
        height 100%
        overflow hidden
        .search-bar
            display flex
            height 60px
            width 100%
            align-items center
            box-shadow inset 0px -1px 3px -1px #c8c7cc
            .back
                width 30px
                height 30px
                margin 0px 10px 0 5px
                flex 0 0 30px
            .search-input
                flex 1
                height 25px
                border-radius 5px
                border 0
                outline none
                color $color-highlight-background
                padding-left 22px
                font-size $font-size-small
            span
                flex 0 0 60px
                margin 0px 5px 0 10px
                color $color-text-li
                font-size $font-size-small
            .search-icon
                position absolute
                height 18px
                width 18px
                left 50px
                top 22px
        .suggest-results
            position fixed
            top 60px
            width 100%
            z-index 1111
            background  $color-background
            .suggest-list
                width 100%
                .suggest-item
                    box-shadow inset 0px -1px 2px -1px #c8c7cc
                    display flex
                    align-items center
                    height 50px
                    img
                        flex 0 0 15px
                        width 15px
                        height 15px
                        margin 0 10px
                    .suggest-content
                        flex 1
                        line-height 50px
                        height 50px
                        color $color-text-li
                        font-size $font-size-medium-x
        .search-history
            margin-top 20px
            position relative
            .title
                height 40px
                display flex
                align-items center
                h2
                    padding-left 20px
                    line-height 40px
                    flex 1
                    color $color-theme
                    font-size $font-size-large
                .clear
                    flex 0 0 30px
                    width 30px
                    height 30px
                    padding-right 10px
            .list
                margin 20px 0 0 15px
                .item
                    float left
                    margin 5px 5px
                    background $color-theme
                    color $color-background
                    padding 0 5px
                    border-radius 5px
                    height 40px
                    line-height 40px
                    font-size $font-size-medium-x
                    font-weight 400
                    letter-spacing 1px
        .hot-keys
            margin-top 20px
            .title
                padding-left 20px
                line-height 40px
                height 40px
                color $color-theme
                font-size $font-size-large
            .list
                margin 20px 0 0 15px
                .item
                    float left
                    margin 5px 5px
                    background $color-theme
                    color $color-background
                    padding 0 5px
                    border-radius 5px
                    height 40px
                    line-height 40px
                    font-size $font-size-medium-x
                    font-weight 400
                    letter-spacing 1px
    .slide-enter-active,.slide-leave-active
        transition all 0.3s
    .slide-enter,.slide-leave-to
        transform translate3d(100%,0,0)
</style>