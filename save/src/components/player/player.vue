<template>
    <div class="player" v-show="playlist.length>0">
        <transition name="full">
            <div class="full-player" v-show="fullScreen">
                <div class="background">
                    <img width="120%" height="120%" :src="currentImage">
                </div>
                <div class="top">
                    <img @click="back" src="/static/downarrow.png" width="8%" height="4%" class="back">
                    <h1 class="title" v-html="currentSong.id.name"></h1>
                    <h2 class="subtitle" v-html="currentSong.id.singer"></h2>
                    <img src="/static/list.png" width="8%" height="4%" class="list-icon">
                </div>
                <div class="middle" ref="lyricList">
                    <div class="lyrics-wrapper">
                        <div class="lyrics" v-if="currentLyric">
                            <p :class="{'current': currentLineNumber === index}" class="text" ref="lyricLine" v-for="(line,index) in currentLyric.lines" :key="index">{{ line.txt }}</p>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="slider">
                        <span class="time time-l">{{ normalizeTime(currentTime) }}</span>
                        <div class="progress-bar-wrapper">
                            <progress-bar :percent="getPercent" @percentChange="onProgressBarChange"></progress-bar>
                        </div>
                        <span class="time time-r">{{ normalizeTime(currentDuration) }}</span>
                    </div>
                    <div class="buttons">
                        <img src="/static/unlike.png" width="10%" height="5%" class="like button">
                        <img @click="prev" src="/static/previous.png" width="18%" height="12%" class="previous button">
                        <img @click="togglePlaying" ref="playing" :src="playingIcon" width="18%" height="12%" class="play button">
                        <img @click="next" src="/static/next.png" width="18%" height="12%" class="next button">
                        <img @click="changeMode" :src="modeIcon" width="10%" height="5%" class="share button">
                    </div>
                </div>
            </div>
        </transition>
        <transition name="bottom">
            <div ref="bottomPlayer" class="bottom-player" v-show="!fullScreen" @click="open">
                <img src="/static/music.png">
            </div>
        </transition>
        <audio :src="currrentUrl" ref="audio" @timeupdate="timeUpdate" @ended="end" autoplay="autoplay"></audio>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import ProgressBar from '../../base/progress-bar/progress-bar'
import Lyric from 'lyric-parser'
import { getLyrics } from '../../api/lyrics.js'
import { playMode } from '../../common/js/config.js'
import { shuffle } from '../../common/js/tools.js'
import { getSongDetail } from '../../api/songDetail.js'
import { getMusicUrl } from '../../api/musicUrl.js'

export default {
  data() {
    return {
      currentTime: 0,
      currentDuration: 0,
      percent: 0,
      currentLyric: null,
      currentLineNumber: 0,
      currentImage: '',
      currrentUrl: ''
    }
  },
  computed: {
    modeIcon() {
      return this.mode === playMode.sequence ? '/static/sequence.png' : this.mode === playMode.loop ? '/static/loop.png' : '/static/random.png'
    },
    playingIcon() {
      return this.playing ? '/static/stop.png' : '/static/play.png'
    },
    getPercent() {
      return this.currentTime / this.currentDuration
    },
    ...mapGetters([
      'fullScreen',
      'playlist',
      'currentSong',
      'playing',
      'currentIndex',
      'mode',
      'sequencelist'
    ])
  },
  watch: {
    currentSong(newSong, oldSong) {
      this._getSongDetail(this.currentSong.id.id)
      this._getMusicUrl(this.currentSong.id.id)
      this._getCurrentLyric(this.currentSong.id.id)
      if (newSong.id.id === oldSong.id.id) {
        return
      }
      if (this.currentLyric) {
        this.currentLyric.stop()
        this.currentTime = 0
        this.currentLineNumber = 0
      }
      this.$refs.lyricList.scrollTo(0, 0, 1000)
      this.$nextTick(() => {
        this.$refs.audio.play()
      })
    },
    playing(newPlaying) {
      this.$nextTick(() => {
        newPlaying ? this.$refs.audio.play() : this.$refs.audio.pause()
      })
    },
    currentLineNumber(newLineNum) {
      if (newLineNum > 5) {
        this.$refs.lyricList.scrollTo(0, newLineNum * 32, 1000)
      }
    }
  },
  methods: {
    changeMode() {
      const mode = (this.mode + 1) % 3
      this.setPlayMode(mode)
      let list = null
      if (this.mode === playMode.random) {
        list = shuffle(this.sequencelist)
      } else {
        list = this.sequencelist
      }
      this.resetCurrentIndex(list)
      this.setPlaylist(list)
    },
    resetCurrentIndex(list) {
      let index = list.findIndex((item) => {
        return item.id.id === this.currentSong.id.id
      })
      this.setCurrentIndex(index)
    },
    back() {
      this.setFullScreen(false)
      if (this.$router.path === '/') {
        this.$refs.bottomPlayer.bottom = '55px'
      }
    },
    open() {
      this.setFullScreen(true)
    },
    end() {
      if (this.mode === playMode.loop) {
        this.loop()
      } else {
        this.next()
      }
    },
    loop() {
      this.$refs.audio.currentTime = 0
      this.$refs.audio.play()
      if (this.currentLyric) {
        this.currentLyric.seek()
      }
    },
    next() {
      if (this.mode === playMode.loop) {
        this.loop()
        return
      }
      let index = this.currentIndex + 1
      if (index === this.playlist.length) {
        index = 0
      }
      this.setCurrentIndex(index)
      if (!this.playing) {
        this.togglePlaying()
      }
    },
    prev() {
      let index = this.currentIndex - 1
      if (index === -1) {
        index = this.playlist.length - 1
      }
      this.setCurrentIndex(index)
      if (!this.playing) {
        this.togglePlaying()
      }
    },
    timeUpdate(e) {
      this.currentTime = e.target.currentTime
      this.currentDuration = e.target.duration
    },
    normalizeTime(time) {
      time = time | 0
      const minutes = time / 60 | 0
      const second = time % 60 | 0
      if (minutes < 10 && second < 10) {
        return `0${minutes}:0${second}`
      } else if (minutes < 10 && second >= 10) {
        return `0${minutes}:${second}`
      } else if (minutes >= 10 && second < 10) {
        return `${minutes}:0${second}`
      } else {
        return `${minutes}:${second}`
      }
    },
    handleLyrics({lineNum, txt}) {
      this.currentLineNumber = lineNum
    },
    ...mapMutations({
      setFullScreen: 'SET_FULLSCREEN',
      setPlayingState: 'SET_PLAYING',
      setCurrentIndex: 'SET_CURRENTINDEX',
      setPlayMode: 'SET_MODE',
      setPlaylist: 'SET_PLAYLIST'
    }),
    _getCurrentLyric(id) {
      getLyrics(id).then(
        (res) => {
          // console.log(res.data)
          console.log(res.data.lrc.lyric)
          this.currentLyric = new Lyric(res.data.lrc.lyric, this.handleLyrics)
          this.currentLyric.play()
          console.log(this.currentLyric)
        }
      )
    },
    _getSongDetail(id) {
      getSongDetail(id).then((res) => {
        // console.log(res.data)
        this.currentImage = res.data.songs[0].al.picUrl
        // console.log(this.currentImage)
      })
    },
    _getMusicUrl(id) {
      getMusicUrl(id).then((res) => {
        console.log(res.data.data[0].url)
        this.currrentUrl = res.data.data[0].url
        // this.setPlayingState(false)
      })
    },
    play() {
      this.$nextTick(() => {
        this.$refs.audio.play()
      })
    },
    togglePlaying() {
      this.setPlayingState(!this.playing)
      if (this.currentLyric) {
        this.currentLyric.togglePlay()
      }
    },
    onProgressBarChange(percent) {
      const currentTime = this.currentDuration * percent
      this.$refs.audio.currentTime = currentTime
      if (!this.playing) {
        this.togglePlaying()
      }
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000)
      }
    }
  },
  components: {
    ProgressBar
  }
}
</script>

<style lang="stylus" scoped>
    @import '../../common/stylus/variable'
    @import '../../common/stylus/mixin'

    .player
        .full-enter-active, .full-leave-active
            transition all 0.4s
            .top, .bottom
                transition all 0.4s cubic-bezier(0.56, 0.18, 0.82, 0.91)
        .full-enter, .full-leave-to
            opacity 0
            .top
                transform translate3d(0, -100px, 0)
            .bottom
                transform translate3d(0, 100px, 0)
        .full-player
            position fixed
            left 0
            right 0
            top 0
            bottom 0
            z-index 999
            background-color $color-background
            .background
                position absolute
                top 0
                bottom 0
                left 0
                right 0
                z-index -1
                opacity 0.6
                filter blur(10px)
                img
                    position absolute
                    top -10%
                    left -10%
            .top
                .back
                    position absolute
                    top 3%
                    left 3%
                .list-icon
                    position absolute
                    top 3%
                    right 3%
                .title
                    width 80%
                    text-align center
                    height 40px
                    line-height 40px
                    font-size $font-size-large
                    color $color-text
                    margin-top 3%
                    no-wrap()
                    white-space nowrap
                    margin 0 auto
                .subtitle
                    width 100%
                    text-align center
                    height 30px
                    line-height 20px
                    font-size $font-size-medium
                    color $color-text
                    font-weight 400
                    no-wrap()
            .middle
                position fixed
                top 100px
                bottom 160px
                overflow-y scroll
                width 100%
                height calc(100% - 250px)
                margin-right -20px
                padding-right 20px
                .lyrics-wrapper
                    width 80%
                    margin 0 auto
                    text-align center
                    .text
                        line-height 32px
                        color $color-text-li
                        font-size $font-size-medium
                        white-space nowrap
                        vertical-align top
                    .current
                        color $color-text
                        font-weight 500
                        font-size $font-size-medium-x
            .bottom
                position fixed
                bottom 50px
                width 100%
                .slider
                    display flex
                    margin 0 auto
                    width 80%
                    align-items center
                    .time
                        color $color-text-li
                        font-size $font-size-small
                        flex 0 0 30px
                        width 30px
                        line-height 30px
                    .time-r
                        text-align right
                    .time-l
                        text-align left
                    .progress-bar-wrapper
                        flex 1
                        padding-left 8px
                        padding-right 3px
                .buttons
                    display flex
                    flex-direction row
                    width 100%
                    justify-content space-around
                    padding-left 5px
                    padding-right 5px
                    box-sizing border-box
                    .button
                        flex none
                        padding 5px
                        box-sizing border-box
                    .like,.share
                        margin-top 5%
        .bottom-player
            position fixed
            top 15px
            right 15px
            height 20px
            width 20px
            z-index 1000
            img
              height 25px
              width 25px
</style>