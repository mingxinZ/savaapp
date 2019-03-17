import * as types from './mutation-types'

const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [types.SET_PLAYING](state, flag) {
    state.playing = flag
  },
  [types.SET_FULLSCREEN](state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST](state, list) {
    state.playlist = list
  },
  [types.SET_SEQUENCELIST](state, list) {
    state.sequencelist = list
  },
  [types.SET_MODE](state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENTINDEX](state, index) {
    state.currentIndex = index
  },
  [types.SET_SINGERLIST](state, singerList) {
    state.singerList = singerList
  },
  [types.SET_MAGAZINECAT](state, magazinecat) {
    state.magazineCat = magazinecat
  },
  [types.SET_MAGAZINEID](state, magazineId) {
    state.magazineId = magazineId
  },
  [types.SET_ALBUMID](state, albumId) {
    state.albumId = albumId
  },
  [types.SET_CURRENTUSERNAME](state, userName) {
    state.currentUserName = userName
  },
  [types.SET_AVATARBASEURL](state, url) {
    state.avatarBaseUrl = url
  },
  [types.SET_TEXT](state, text) {
    state.text = text
  },
  [types.SET_KEYWORD](state, keyword) {
    state.keyword = keyword
  }
}

export default mutations