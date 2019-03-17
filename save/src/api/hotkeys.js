import axios from 'axios'

export function getHotKeys() {
  const url = `http://47.107.110.244:4000/search/hot`
  return axios.get(url)
}