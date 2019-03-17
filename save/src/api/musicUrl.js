import axios from 'axios'

export function getMusicUrl(id) {
  const url = `http://47.107.110.244:4000/song/url?id=${id}`
  return axios.get(url)
}