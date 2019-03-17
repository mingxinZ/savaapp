<template>
    <div class="magazine-list">
        <div class="title">
            <img @click="back" src="/static/arrow.png" width="30" height="25">
            <h1>{{ currentTitle }}</h1>
        </div>
        <div class="loading" v-show="!currentCat.length > 0">
            <loading></loading>
        </div>
        <div class="musicMagazine-list-content">
            <ul class="list-content">
                <li @click="selectMagazine(magazineitem)" class="list-item" v-for="magazineitem in currentCat" :key="magazineitem.id">
                    <img v-lazy="magazineitem.coverImgUrl">
                    <div class="description">
                        <h2 class="magazine-title">{{ magazineitem.name }}</h2>
                        <h4 class="creator">收集者：{{ magazineitem.creator.nickname }}</h4>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { getMagazineList } from '../../api/magazine-list.js'
import { mapGetters, mapMutations } from 'vuex'
import Loading from '../../base/loading/loading'

export default {
  data() {
    return {
      currentCat: []
    }
  },
  computed: {
    currentTitle() {
      return decodeURIComponent(this.magazineCat)
    },
    ...mapGetters([
      'magazineCat'
    ])
  },
  watch: {
    magazineCat(newCat, oldCat) {
      this._getMagazineList(newCat)
    }
  },
  created() {
    this._getMagazineList(this.magazineCat)
  },
  methods: {
    selectMagazine(magazineitem) {
      this.$router.push({
        path: `/lookingfor/${this.magazineCat}/${magazineitem.id}`
      })
      this.setMagazineId(magazineitem.id)
    },
    back() {
      this.$router.push({
        path: '/lookingfor'
      })
    },
    _getMagazineList(cat) {
      getMagazineList(cat).then(
        (res) => {
          console.log(res.data.playlists)
          this.currentCat = res.data.playlists
        }
      )
    },
    ...mapMutations({
      setMagazineId: 'SET_MAGAZINEID'
    })
  },
  components: {
    Loading
  }
}
</script>

<style lang="stylus" scoped>
    @import '../../common/stylus/variable'
    @import '../../common/stylus/mixin'

    .magazine-list
        position fixed
        left 0
        bottom 0
        top 0
        right 0
        background $color-background
        height 100%
        z-index 180
        width 100%
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
        .loading
            position fixed
            top 150px
        .musicMagazine-list-content
            width 100%
            height calc(100% - 60px)
            overflow-y scroll
            position fixed
            top 60px
            margin-right -20px
            padding-right 20px
            .list-content
                .list-item
                    display flex
                    align-items center
                    height 90px
                    img
                        flex 0 0 70px
                        width 70px
                        height 70px
                        border-radius 5px
                        margin-left 10px
                    .description
                        flex 1
                        padding-left 20px
                        padding-top 20px
                        margin-left 5px
                        box-sizing border-box
                        display flex
                        flex-direction column
                        box-shadow inset 0px -1px 2px -1px #c8c7cc
                        .magazine-title
                            flex 0 0 30px
                            font-size $font-size-medium
                            color $color-text
                            line-height 15px
                        .creator
                            flex 0 0 20px
                            font-size $font-size-small-s
                            color $color-text-li
                            line-height 10px
</style>