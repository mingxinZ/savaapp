import axios from 'axios'

export function getSingerDetail(id) {
  const url = `http://47.107.110.244:4000/artists?id=${id}`
  return axios.get(url)
}