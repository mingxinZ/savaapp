import axios from 'axios'

export function getNewAlbums() {
  const url = `http://47.107.110.244:4000/top/album?offset=0&limit=10`
  return axios.get(url)
}