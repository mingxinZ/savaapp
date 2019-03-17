import axios from 'axios'

export function getMagazineList(cat) {
  const url = `http://47.107.110.244:4000/top/playlist?limit=50&cat=${cat}`
  return axios.get(url)
}