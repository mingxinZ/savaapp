<template>
    <div class="community">
        <div class="community-wrapper">
            <div class="loading" v-show="!shares.length > 0">
                <loading></loading>
            </div>
            <img src="/static/add.png" class="add" @click="add">
            <div class="share-item" v-for="share in shares" :key="share._id">
                <div class="title">
                <img :src="share.usericon" class="avatar">
                <h3 class="name" v-html="share.username"></h3>
                </div>
                <div class="content" v-html="share.usershare"></div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import Loading from '../../base/loading/loading'

export default {
  data() {
    return {
      shares: []
    }
  },
  computed: {
    ...mapGetters([
      'text'
    ])
  },
  watch: {
    text(newText, oldText) {
      axios
        .get('http://47.107.110.244:3000/shares')
        .then((response) => {
          let res = response.data
          if (res.status === '0') {
            console.log(res.result.list)
            this.shares = res.result.list
          }
        })
    }
  },
  created() {
    axios
      .get('http://47.107.110.244:3000/shares')
      .then((response) => {
        let res = response.data
        if (res.status === '0') {
          console.log(res.result.list)
          this.shares = res.result.list
        }
      })
  },
  methods: {
    add() {
      this.$router.push({
        path: '/community/add'
      })
    }
  },
  components: {
    Loading
  }
}
</script>

<style lang="stylus" scoped>
    @import '../../common/stylus/variable'
    @import '../../common/stylus/mixin'

    .community
        width 100%
        height 100%
        position fixed
        top 60px
        // overflow-y scroll
        // margin-right -20px
        // padding-right 20px
        .community-wrapper
            height calc(100% - 90px)
            overflow-y scroll
            margin-right -20px
            padding-right 20px
            .loading
                position fixed
                top 150px
            .add
                position fixed
                bottom 80px
                right 20px
                width 80px
                height 80px
                z-index 180
            .share-item
                width 85%
                margin 0 auto 20px
                box-shadow inset 0px -1px 2px -1px #c8c7cc
                // position absolute
                // left 10%
                padding-bottom 20px
                .title
                    display flex
                    align-items center
                    height 60px
                    .avatar
                        flex 0 0 40px
                        width 40px
                        height 40px
                        border-radius 50%
                    .name
                        line-height 60px
                        no-wrap()
                        flex 1
                        color $color-text
                        font-size $font-size-large
                        letter-spacing 1px
                        font-weight lighter
                        padding-left 10px
                .content
                    margin-top 20px
                    // margin-bottom 20px
                    font-weight lighter
                    color rgba(255,255,255,0.8)
                    font-size $font-size-medium-x
                    letter-spacing 1.2px
                    line-height 30px
</style>