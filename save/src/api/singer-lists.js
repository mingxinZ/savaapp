import axios from 'axios'

export function getSingerList(id) {
  const url = `http://47.107.110.244:4000/artist/list?cat=${id}&limit=50`
  return axios.get(url)
}