import axios from 'axios'

export function getAlbumDetail(id) {
  const url = `http://47.107.110.244:4000/album?id=${id}`
  return axios.get(url)
}