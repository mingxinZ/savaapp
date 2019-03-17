<template>
    <div class="mine">
      <div class="user">
        <img :src="avatarBaseUrl" class="user-icon" @click="uploadAvatar">
        <h1 class="login-begin" @click="loginBegin" v-html="currentUserName"></h1>
      </div>
      <ul class="mine-list">
        <li class="like">我的收藏</li>
        <li class="activitions">我的动态</li>
        <li class="exit" @click="exit">退出登录</li>
      </ul>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import axios from 'axios'
import qs from 'qs'

export default {
  computed: {
    ...mapGetters([
      'currentUserName',
      'avatarBaseUrl'
    ])
  },
  watch: {
    avatarBaseUrl(newUrl, oldUrl) {
      if (this.currentUserName !== '') {
        axios
          .post('http://47.107.110.244:3000/users/avatar', qs.stringify({
            username: this.currentUserName,
            avatarurl: newUrl
          }))
          .then(
            (response) => {
              let res = response.data
              if (res.status === '0') {
                console.log('上传成功')
              }
            }
          )
      }
    }
  },
  methods: {
    uploadAvatar() {
      this.$router.push({
        path: '/mine/uploadavatar'
      })
    },
    loginBegin() {
      this.$router.push({
        path: '/mine/login'
      })
    },
    exit() {
      this.setUserName('请登录')
      this.setAvatarUrl('/static/icon.png')
    },
    ...mapMutations({
      setUserName: 'SET_CURRENTUSERNAME',
      setAvatarUrl: 'SET_AVATARBASEURL'
    })
  }
}
</script>

<style lang="stylus" scoped>
    @import '../../common/stylus/variable'

    .mine
        .user
            display flex
            align-items center
            box-shadow inset 0px -2px 2px -1px #c8c7cc
            width 80%
            height 150px
            overflow hidden
            margin 0 auto
            .user-icon
                flex 0 0 100px
                height 100px
                border-radius 50%
                margin-left 10px
            .login-begin
                flex 1
                font-size $font-size-large-x
                text-align center
                font-weight lighter
                color rgba(255,255,255,0.9)
        .mine-list
            margin-top 50px
            li
                width 90%
                height 80px
                line-height 80px
                font-size $font-size-large-x
                box-shadow inset 0px -1px 2px -1px #c8c7cc
                margin 0 auto
                font-weight lighter
                padding-left 10px
                color rgba(255,255,255,0.8)
</style>