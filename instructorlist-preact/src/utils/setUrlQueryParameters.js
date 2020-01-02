export function setUrlQueryParameters(urlInput, paramsObject) {
  const url = urlInput.split('?')[0]
  const items = []
  for (const key in paramsObject) {
    items.push(`${key}=${paramsObject[key]}`)
  }
  return `${url}?${items.join('&')}`
}
