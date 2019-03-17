<template>
    <transition name="slide">
        <div class="signin">
            <img src="/static/arrow.png" class="back" @click="back">
            <div class="logo">
                <img src="../m-header/logo@3x.png">
            </div>
            <form class="signin-area">
                <div class="name">
                    <input type="text" tabindex="1" name="username" v-model="username" placeholder="用户名">
                </div>
                <div class="psw">
                    <input type="password" tabindex="2" name="password" v-model="password" placeholder="密码">
                </div>
                <input type="button" value="注册" class="submit" @click="signin">
            </form>
            <h3 class="err" v-show="errState" v-html="errMsg"></h3>
            <div class="signin-bar">
                <p @click="toLogIn">已经注册？，直接登录</p>
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
      username: '',
      password: '',
      errState: false,
      errMsg: ''
    }
  },
  methods: {
    back() {
      this.$router.back()
    },
    toLogIn() {
      this.$router.push({
        path: '/mine/login'
      })
    },
    signin() {
      if (this.username === '' || this.password === '') {
        this.errState = true
        this.errMsg = '用户名或密码为空'
        return
      }
      axios
        .post('http://47.107.110.244:3000/users/signin', qs.stringify({
          username: this.username,
          password: this.password
        }))
        .then((response) => {
          let res = response.data
          if (res.status === '1' && res.msg === '') {
            this.errState = true
            this.errMsg = '用户名已经注册了，换一个吧'
          } else if (res.status === '0') {
            this.$router.push({
              path: '/mine'
            })
            this.setUserName(this.username)
            this.username = ''
            this.password = ''
          }
        })
    },
    ...mapMutations({
      setUserName: 'SET_CURRENTUSERNAME'
    })
  }
}
</script>

<style lang="stylus" scoped>
    @import '../../common/stylus/variable'

    .signin
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
        .err
            text-align center
            line-height 30px
            height 30px
            font-size $font-size-small
            color $color-text-li
        .signin-bar
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
        .signin-area
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