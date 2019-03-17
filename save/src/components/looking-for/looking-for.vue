<template>
    <div class="looking-for">
        <div class="desc">
      <h1>探索</h1>
    </div>
    <!-- <form action="" class="singers-search">
      <input type="text" placeholder="开启你的音乐探索之旅吧">
    </form> -->
    <div class="singer-directory">
      <router-link tag="div" to="/lookingfor/singers">
        <img src="/static/singer.png" width="18" height="18"><h3>歌手分类</h3>
      </router-link>
    </div>
    <div class="tags">
      <ul class="tags-list">
        <ul class="clearfix list1">
            <li @click="selectCat('欧美')"><span>欧美</span></li>
            <li @click="selectCat('华语')"><span>华语</span></li>
        </ul>
        <ul class="clearfix list2">
            <li @click="selectCat('古风')"><span>古风</span></li>
            <li @click="selectCat('民谣')"><span>民谣</span></li>
        </ul>
        <ul class="clearfix list3">
            <li @click="selectCat('流行')"><span>流行</span></li>
            <li @click="selectCat('摇滚')"><span>摇滚</span></li>
        </ul>
        <ul class="clearfix list4">
            <li @click="selectCat('日语')"><span>日语</span></li>
            <li @click="selectCat('轻音乐')"><span>轻音乐</span></li>
        </ul>
        <ul class="clearfix list5">
            <li @click="selectCat('清新')"><span>清新</span></li>
            <li @click="selectCat('学习')"><span>学习</span></li>
        </ul>
        <ul class="clearfix list6">
            <li @click="selectCat('工作')"><span>工作</span></li>
            <li @click="selectCat('浪漫')"><span>浪漫</span></li>
        </ul>
        <ul class="clearfix list7">
            <li @click="selectCat('电子')"><span>电子</span></li>
            <li @click="selectCat('韩语')"><span>韩语</span></li>
        </ul>
        <ul class="clearfix list8">
            <li @click="selectCat('粤语')"><span>粤语</span></li>
            <li @click="selectCat('舞曲')"><span>舞曲</span></li>
        </ul>
        <ul class="clearfix list9">
            <li @click="selectCat('小语种')"><span>小语种</span></li>
            <li @click="selectCat('说唱')"><span>说唱</span></li>
        </ul>
        <ul class="clearfix list10">
            <li @click="selectCat('治愈')"><span>治愈</span></li>
            <li @click="selectCat('爵士')"><span>爵士</span></li>
        </ul>
        <ul class="clearfix list11">
            <li @click="selectCat('乡村')"><span>乡村</span></li>
            <li @click="selectCat('运动')"><span>运动</span></li>
        </ul>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  methods: {
    selectCat(cat) {
      const encodeCat = encodeURIComponent(cat)
      this.$router.push({
        path: `/lookingfor/${encodeCat}`
      })
      this.setMagazineCat(encodeCat)
    },
    ...mapMutations({
      setMagazineCat: 'SET_MAGAZINECAT'
    })
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/variable'
  @import '../../common/stylus/reset'

  .looking-for
    text-align center
    margin-right -20px
    padding-right 20px
    overflow-y scroll
    height calc(100% - 110px)
    position fixed
    top 54px
    width 100%
    .desc
      h1
        text-align center
        color $color-text
        font-size $font-size-large-x
        height 50px
        line-height 50px
        margin-top 20px
        margin-bottom 30px
    .singers-search
      text-align center
      margin-bottom 15px
      input
        width 80%
        height 35px
        font-size $font-size-large
        border-radius 5px
        outline none
        -webkit-appearance none
        border 0
        padding-left 3%
        box-size border-box
        color $color-sub-theme
    .singer-directory
      margin 0 auto 30px
      width 80%
      box-shadow: inset 0px -1px 2px -1px #c8c7cc
      padding-bottom 5px
      img
        margin-right 10px
      h3
        display inline
        font-size $font-size-medium-x
        color $color-theme
        height 20px
        line-height 20px
    .tags
      margin 0 auto
      width 83%
      .tags-list
        margin-bottom 50px
        ul
          margin-bottom 30px
          li
            width 45%
            height 100px
            background linear-gradient(45deg,#12c2e9,#c471ed,#f64f59)
            border-radius 5px
            position relative
            span
              position absolute
              top 13px
              left 10px
              color $color-text
              font-size $font-size-large
              font-weight bold
          li:first-child
            float left
          li:last-child
            float right
        .list1
          li:last-child
            background linear-gradient(45deg,#C6FFDD,#FBD786,#f7797d)
        .list2
          li:first-child
            background linear-gradient(45deg,#2980B9,#6DD5FA,#FFFFFF)
          li:last-child
            background linear-gradient(45deg,#aa4b6b,#6b6b83,#3b8d99)
        .list3
          li:first-child
            background linear-gradient(45deg,#03001e,#7303c0,#ec38bc,#fdeff9)
          li:last-child
            background linear-gradient(45deg,#00F260,#0575E6)
        .list4
          li:first-child
            background linear-gradient(45deg,#73C8A9,#373B44)
          li:last-child
            background linear-gradient(45deg,#ee0979,#ff6a00)
        .list5
          li:first-child
            background linear-gradient(45deg,#215f00,#e4e4d9)
          li:last-child
            background linear-gradient(45deg,#c21500,#ffc500)
        .list6
          li:first-child
            background linear-gradient(45deg,#EFEFBB,#D4D3DD)
          li:last-child
            background linear-gradient(45deg,#DE6262,#FFB88C)
        .list7
          li:first-child
            background linear-gradient(45deg,#4b6cb7,#182848)
          li:last-child
            background linear-gradient(45deg,#FC354C,#0ABFBC)
        .list8
          li:first-child
            background linear-gradient(45deg,#DAE2F8,#D6A4A4)
          li:last-child
            background linear-gradient(45deg,#3D7EAA,#FFE47A)
        .list9
          li:first-child
            background linear-gradient(45deg,#2BC0E4,#EAECC6)
          li:last-child
            background linear-gradient(45deg,#E55D87,#5FC3E4)
        .list10
          li:first-child
            background linear-gradient(45deg,#CC95C0,#DBD4B4,#7AA1D2)
          li:last-child
            background linear-gradient(45deg,#348F50,#56B4D3)
        .list11
          li:first-child
            background linear-gradient(45deg,#ff6e7f,#bfe9ff)
          li:last-child
            background linear-gradient(45deg,#77A1D3,#79CBCA,#E684AE)
</style>