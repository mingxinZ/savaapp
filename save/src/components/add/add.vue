<template>
    <transition name="slide">
        <div class="add" onresize="document.activeElement.scrollIntoView(true);">
            <div class="title">
                <img src="/static/arrow.png" class="back" @click="back">
                <h1>添加动态</h1>
                <span @click="add">发布</span>
            </div>
            <div class="expandingArea">
                <pre><span v-html="text"></span><br></pre>
                <textarea class="text" name="share" id="share" rows="30" v-model="text" placeholder="说点啥呢" ref="text"></textarea>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import axios from 'axios'
import qs from 'qs'

export default {
  data() {
    return {
      text: ''
    }
  },
  computed: {
    ...mapGetters([
      'currentUserName',
      'avatarBaseUrl'
    ])
  },
  methods: {
    back() {
      this.$router.back()
    },
    add() {
      // if (this.text === '') {
      //   return
      // }
      axios
        .post('http://localhost:3000/shares/add', qs.stringify({
          username: this.currentUserName,
          avatar: this.avatarBaseUrl,
          text: this.text
        }))
        .then(
          (response) => {
            let res = response.data
            if (res.status === '0') {
              console.log('发布成功')
              this.setText(this.text)
              this.text = ''
              this.$router.push({
                path: '/community'
              })
            }
          }
        )
    },
    ...mapMutations({
      setText: 'SET_TEXT'
    })
  }
}
</script>

<style lang="stylus" scoped>
    @import '../../common/stylus/variable'

    .add
        position fixed
        left 0
        right 0
        top 0
        bottom 0
        z-index 900
        background $color-background
        width 100%
        height 100%
        overflow hidden
        .title
            display flex
            height 60px
            width 100%
            align-items center
            box-shadow inset 0px -1px 3px -1px #c8c7cc
            .back
                width 40px
                height 40px
                margin 0px 10px 0 5px
                flex 0 0 40px
            h1
                flex 1
                line-height 60px
                color $color-text
                padding-left 20px
                font-size $font-size-large-x
                text-align center
            span
                flex 0 0 70px
                margin 0px 5px 0 10px
                color $color-text
                font-size $font-size-medium-x
        .expandingArea
            position relative
            // top 10px
            width 100%
            pre
                display block
                visibility hidden
                width 100%
                span
                    display block
                    // width 100%
                    height 100px
            .text
                // position fixed
                // top 60px
                height 100%
                position absolute
                width 90%
                top 0
                left 0
                overflow auto
                word-break break-all
                outline none
                background transparent
                font-size $font-size-large
                color $color-text
                border none
                font-weight lighter
                padding 0px 10px 0
    .slide-enter-active,.slide-leave-active
        transition all 0.3s
    .slide-enter,.slide-leave-to
        transform translate3d(100%,0,0)
</style>