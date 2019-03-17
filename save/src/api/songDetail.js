import axios from 'axios'

export function getSongDetail(id) {
  const url = `http://47.107.110.244:4000/song/detail?ids=${id}`
  return axios.get(url)
}