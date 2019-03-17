export const singer = state => state.singer

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequencelist = state => state.sequencelist

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {}
}

export const singerList = state => state.singerList

export const magazineCat = state => state.magazineCat

export const magazineId = state => state.magazineId

export const albumId = state => state.albumId

export const currentUserName = state => state.currentUserName

export const avatarBaseUrl = state => state.avatarBaseUrl

export const text = state => state.text

export const keyword = state => state.keyword