import axios from 'axios'

export function getSearchSuggests(param) {
  const url = `http://47.107.110.244:4000/search/suggest?keywords=${param}&type=mobile`
  return axios.get(url)
}