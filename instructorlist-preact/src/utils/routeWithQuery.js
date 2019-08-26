export function routeWithQuery(newPath) {
  if (history.pushState) {
    let path = window.location.protocol + '//' + window.location.host + newPath
    window.history.pushState({ path }, '', path)
  }
}
