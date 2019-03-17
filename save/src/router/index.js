import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '../components/recommend/recommend.vue'
import LookingFor from '../components/looking-for/looking-for.vue'
import Community from '../components/community/community.vue'
import Mine from '../components/mine/mine.vue'
import Singer from '../components/singer/singer.vue'
import SingerList from '../components/singer-list/singer-list.vue'
import SingerDetail from '../components/singer-detail/singer-detail.vue'
import MagazineList from '../components/magazine-list/magazine-list.vue'
import MagazineDetail from '../components/magazine-detail/magazine-detail.vue'
import Login from '../components/login/login.vue'
import AlbumDetail from '../components/album-detail/album-detail.vue'
import Search from '../components/search/search.vue'
import SignIn from '../components/signin/signin.vue'
import Avatar from '../components/avatar/avartar.vue'
import Add from '../components/add/add.vue'
import SearchResult from '../components/search-results/search-results.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/search/:keyword',
      component: SearchResult
    },
    {
      path: '/recommend/magazine/:magid',
      component: MagazineDetail
    },
    {
      path: '/recommend/newdist/:distid',
      component: AlbumDetail
    },
    {
      path: '/lookingfor',
      component: LookingFor
    },
    {
      path: '/lookingfor/singers',
      component: Singer,
      children: [
        {
          path: ':cat',
          component: SingerList
        }
      ]
    },
    {
      path: '/lookingfor/singers/:cat/:id',
      component: SingerDetail
    },
    {
      path: '/lookingfor/:mcat',
      component: MagazineList
    },
    {
      path: '/lookingfor/:mcat/:id',
      component: MagazineDetail
    },
    {
      path: '/community',
      component: Community
    },
    {
      path: '/community/add',
      component: Add
    },
    {
      path: '/mine',
      component: Mine
    },
    {
      path: '/mine/login',
      component: Login
    },
    {
      path: '/mine/signin',
      component: SignIn
    },
    {
      path: '/mine/uploadavatar',
      component: Avatar
    }
  ]
})