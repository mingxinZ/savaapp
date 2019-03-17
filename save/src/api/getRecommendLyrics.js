import axios from 'axios'

export function getRecommendLyrics() {
  const url = 'http://47.107.110.244:3000/lyrics'
  return axios.get(url)
}