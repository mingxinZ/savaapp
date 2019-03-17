import { playMode } from '../common/js/config'

const state = {
  singer: {},
  singerList: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequencelist: [],
  mode: playMode.sequence,
  currentIndex: -1,
  magazineCat: null,
  magazineId: 0,
  albumId: 0,
  currentUserName: '请登录',
  avatarBaseUrl: '/static/icon.png',
  text: '',
  keyword: ''
}

export default state