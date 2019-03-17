<template>
    <transition name="slide">
        <div class="login">
            <img src="/static/arrow.png" class="back" @click="back">
            <div class="logo">
                <img src="../m-header/logo@3x.png">
            </div>
            <form class="login-area">
                <div class="name">
                    <input type="text" tabindex="1" name="username" v-model="username" placeholder="用户名">
                </div>
                <div class="psw">
                    <input type="password" tabindex="2" name="password" v-model="password" placeholder="密码">
                </div>
                <input type="button" value="登录" class="submit" @click="login">
            </form>
            <h3 class="err" v-show="errState">用户名或密码错误</h3>
            <div class="login-bar">
                <p @click="toSignIn">尚未注册？，请注册</p>
            </div>
        </div>
    </transition>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      errState: false,
      username: '',
      password: ''
    }
  },
  watch: {
    username(newName, oldName) {
      console.log(newName)
    }
  },
  methods: {
    login() {
      if (this.username === '' || this.userPwd === '') {
        this.errState = true
        return
      }
      axios
        .post('http://localhost:3000/users/login', qs.stringify({
          username: this.username,
          password: this.password
        }))
        .then(
          (response) => {
            let res = response.data
            if (res.status === '1') {
              this.errState = true
            } else if (res.result.list.length === 0) {
              this.errState = true
            } else {
              this.errState = false
              this.$router.push({
                path: '/mine'
              })
              this.setUserName(res.result.list[0].username)
              this.setAvatarUrl(res.result.list[0].usericon)
              this.username = ''
              this.password = ''
            }
          }
        )
    },
    toSignIn() {
      this.$router.push({
        path: '/mine/signin'
      })
    },
    back() {
      this.$router.back()
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

    .login
        position fixed
        left 0
        right 0
        top 0
        bottom 0
        z-index 900
        background $color-background
        width 100%
        height 100%
        overflow-y scroll
        .back
            width 10%
            margin 10px 0 0 10px
        .logo
            text-align center
            width 100%
            margin-top 50px
            img
                width 40%
        .login-bar
            margin-top 30px
            width 80%
            position fixed
            bottom 65px
            p
                text-align right
                font-size $font-size-medium
            h1
                font-size $font-size-large-x
                text-align center
        .err
            text-align center
            line-height 30px
            height 30px
            font-size $font-size-small
            color $color-text-li
        .login-area
            margin-top 50px
            font-size $font-size-large
            text-align center
            position relative
            .submit
                background #ffffff
                width 70%
                height 50px
                position absolute
                top 200px
                left 15%
                font-size $font-size-large-x
                color rgba(0,0,0,0.8)
            .name
                position absolute
                border-bottom 1px solid $color-text-li
                width 70%
                left 15%
                height 30px
                top 30px
                input
                    border none
                    outline none
                    height 30px
                    background transparent
                    border none
                    color $color-text
                    font-size $font-size-large
                    width 100%
            .psw
                position absolute
                border-bottom 1px solid $color-text-li
                width 70%
                left 15%
                top 120px
                height 30px
                input
                    border none
                    outline none
                    height 30px
                    background transparent
                    color $color-text
                    font-size $font-size-large
                    width 100%
                    padding-left 0
    .slide-enter-active,.slide-leave-active
        transition all 0.3s
    .slide-enter,.slide-leave-to
        transform translate3d(100%,0,0)
</style>