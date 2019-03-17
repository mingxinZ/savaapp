import axios from 'axios'

export function getLyrics(id) {
  const url = `http://47.107.110.244:4000/lyric?id=${id}`
  return axios.get(url)
}