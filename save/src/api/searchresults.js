import axios from 'axios'

export function getSearchResults(keyword) {
  const url = `http://47.107.110.244:4000/search?keywords=${keyword}`
  return axios.get(url)
}