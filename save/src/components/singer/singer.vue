<template>
  <div class="singer">
    <div class="title">
      <img @click="back" src="/static/arrow.png" width="30" height="25">
      <h1>歌手分类</h1>
    </div>
    <div class="singer-directory-list">
      <ul class="chinese list">
        <li @click="selectItem(item)" class="items" v-for="item in chinese" :key="item.id">{{ item.title }}</li>
      </ul>
      <ul class="western list">
        <li @click="selectItem(item)" class="items" v-for="item in western" :key="item.id">{{ item.title }}</li>
      </ul>
      <ul class="japanese list">
        <li @click="selectItem(item)" class="items" v-for="item in japanese" :key="item.id">{{ item.title }}</li>
      </ul>
      <ul class="korean list">
        <li @click="selectItem(item)" class="items" v-for="item in korean" :key="item.id">{{ item.title }}</li>
      </ul>
      <ul class="others list">
        <li @click="selectItem(item)" class="items" v-for="item in others" :key="item.id">{{ item.title }}</li>
      </ul>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      chinese: [
        {
          title: '华语男歌手',
          id: 1001
        },
        {
          title: '华语女歌手',
          id: 1002
        },
        {
          title: '华语乐队/组合',
          id: 1003
        }
      ],
      western: [
        {
          title: '欧美男歌手',
          id: 2001
        },
        {
          title: '欧美女歌手',
          id: 2002
        },
        {
          title: '欧美乐队/组合',
          id: 2003
        }
      ],
      japanese: [
        {
          title: '日本男歌手',
          id: 6001
        },
        {
          title: '日本女歌手',
          id: 6002
        },
        {
          title: '日本乐队/组合',
          id: 6003
        }
      ],
      korean: [
        {
          title: '韩国男歌手',
          id: 7001
        },
        {
          title: '韩国女歌手',
          id: 7002
        },
        {
          title: '韩国乐队/组合',
          id: 7003
        }
      ],
      others: [
        {
          title: '其他男歌手',
          id: 4001
        },
        {
          title: '其他女歌手',
          id: 4002
        },
        {
          title: '其他乐队/组合',
          id: 4003
        }
      ]
    }
  },
  methods: {
    back() {
      this.$router.push({
        path: '/lookingfor'
      })
    },
    selectItem(item) {
      this.$router.push({
        path: `/lookingfor/singers/${item.id}`
      })
      this.setSingerList(item)
    },
    ...mapMutations({
      setSingerList: 'SET_SINGERLIST'
    })
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/variable'
  @import '../../common/stylus/reset'

  .singer
    z-index 180
    position fixed
    left 0
    bottom 0
    top 0
    right 0
    background $color-background
    height 100%
    .title
      box-shadow inset 0px -1px 2px -1px $color-sub-theme
      img
        position absolute
        left 0px
        top 16px
      h1
        font-size $font-size-large
        color $color-theme
        font-weight normal
        height 50px
        line-height 50px
        padding 5px 0px 10px 40px
        box-sizing border-box
    .singer-directory-list
      height calc(100% - 50px)
      overflow-y scroll
      margin-right -20px
      padding-right 20px
      .list
        display flex
        flex-direction column
        height 150px
        margin 30px 0 10px 20px
        .items
          flex 1
          font-size $font-size-medium-x
          color $color-theme
          line-height 50px
          box-shadow inset 0px -1px 2px -1px #c8c7cc
</style>