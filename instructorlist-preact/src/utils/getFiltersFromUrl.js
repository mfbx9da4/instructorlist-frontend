import { getUrlQueryParameters } from './getUrlQueryParameters'

export function getFiltersFromUrl(url) {
  let params = getUrlQueryParameters(url)
  let out = {}
  if (params.i) {
    try {
      out = JSON.parse(params.i)
    } catch (e) {
      console.error('Failed to parse query filters')
    }
  }
  return out
}
