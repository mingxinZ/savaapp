<template>
    <div class="song-list">
        <ul>
            <li @click="selectItem(song,index)" v-for="(song,index) in songs" :key="song.id.id" class="item">
                <h2 class="name">{{ song.id.name }}</h2>
                <p class="desc">{{ song.id.singer }} - {{ song.id.album}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  props: {
    songs: {
      type: Array,
      default: null
    }
  },
  methods: {
    selectItem(item, index) {
      this.$emit('selected', item, index)
    }
  }
}
</script>

<style lang="stylus" scoped>
    @import '../../common/stylus/variable'
    @import '../../common/stylus/mixin'
        .song-list
          width 100%
          ul
            margin-bottom 20px
            .item
              display flex
              height 60px
              width 100%
              text-align left
              box-sizing border-box
              justify-content flex-start
              flex-direction column
              padding: 10px 0 5px 30px
              box-shadow: inset 0px -1px 2px -1px $color-text-li
              .name
                no-wrap()
                color $color-text
                font-size  $font-size-large
              .desc
                no-wrap()
                color $color-text-li
                font-size $font-size-small
                margin-top 5px
</style>