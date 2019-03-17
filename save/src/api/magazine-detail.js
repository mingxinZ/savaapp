import axios from 'axios'

export function getMagazineDetail(id) {
  const url = `http://47.107.110.244:4000/playlist/detail?id=${id}`
  return axios.get(url)
}