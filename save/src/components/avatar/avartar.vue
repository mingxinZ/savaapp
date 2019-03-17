<template>
    <transition name="slide">
        <div class="avatar">
            <img src="/static/arrow.png" class="back" @click="back">
            <div class="upload">
                <VimageClip
                    width="300px"
                    height="300px"
                    backgroundColor="#cccccc"
                    :hd="false"
                    :control="true"
                    @imageClipper="handleclip"/>
            </div>
            <h3 class="sure" @click="uploaded">确定是这个头像了</h3>
        </div>
    </transition>
</template>

<script>
import VimageClip from 'vue-imgclip'
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      avatarUrl: ''
    }
  },
  methods: {
    back() {
      this.$router.push('/mine')
    },
    uploaded() {
      this.setAvatarUrl(this.avatarUrl)
      this.$router.push('/mine')
    },
    handleclip(data) {
      this.avatarUrl = data.dataUrl
    //   console.log(this.avatarUrl)
    },
    ...mapMutations({
      setAvatarUrl: 'SET_AVATARBASEURL'
    })
  },
  components: {
    VimageClip
  }
}
</script>

<style lang="stylus" scoped>
    @import '../../common/stylus/variable'

    .avatar
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
        .back
            width 50px
            height 40px
            margin 10px 0 0 5px
        .upload
            position fixed
            top 100px
            width 80%
            left 10%
        .sure
            color $color-text
            // position fixed
            // top 500px
            font-size $font-size-large
            text-align center
            display block
    .slide-enter-active,.slide-leave-active
        transition all 0.3s
    .slide-enter,.slide-leave-to
        transform translate3d(100%,0,0)
</style>