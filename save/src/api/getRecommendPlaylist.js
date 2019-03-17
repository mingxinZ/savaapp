import axios from 'axios'

export function getRecommendPlaylist() {
  const url = `http://47.107.110.244:4000/top/playlist/highquality?limit=10`
  return axios.get(url)
}