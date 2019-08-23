/*
  Cloned from preact router so we can match routing for SSR requests
*/

// @ts-ignore
const EMPTY = {}
// @ts-ignore

// @ts-ignore
export function assign(obj, props) {
  // @ts-ignore
  // eslint-disable-next-line guard-for-in
  // @ts-ignore
  for (let i in props) {
    // @ts-ignore
    obj[i] = props[i]
    // @ts-ignore
  }
  // @ts-ignore
  return obj
  // @ts-ignore
}
// @ts-ignore

// @ts-ignore
export function exec(url, route, opts) {
  // @ts-ignore
  let reg = /(?:\?([^#]*))?(#.*)?$/,
    // @ts-ignore
    c = url.match(reg),
    // @ts-ignore
    matches = {},
    // @ts-ignore
    ret
  // @ts-ignore
  if (c && c[1]) {
    // @ts-ignore
    let p = c[1].split('&')
    // @ts-ignore
    for (let i = 0; i < p.length; i++) {
      // @ts-ignore
      let r = p[i].split('=')
      // @ts-ignore
      matches[decodeURIComponent(r[0])] = decodeURIComponent(
        // @ts-ignore
        r.slice(1).join('='),
        // @ts-ignore
      )
      // @ts-ignore
    }
    // @ts-ignore
  }
  // @ts-ignore
  url = segmentize(url.replace(reg, ''))
  // @ts-ignore
  route = segmentize(route || '')
  // @ts-ignore
  let max = Math.max(url.length, route.length)
  // @ts-ignore
  for (let i = 0; i < max; i++) {
    // @ts-ignore
    if (route[i] && route[i].charAt(0) === ':') {
      // @ts-ignore
      let param = route[i].replace(/(^\:|[+*?]+$)/g, ''),
        // @ts-ignore
        flags = (route[i].match(/[+*?]+$/) || EMPTY)[0] || '',
        // @ts-ignore
        plus = ~flags.indexOf('+'),
        // @ts-ignore
        star = ~flags.indexOf('*'),
        // @ts-ignore
        val = url[i] || ''
      // @ts-ignore
      if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
        // @ts-ignore
        ret = false
        // @ts-ignore
        break
        // @ts-ignore
      }
      // @ts-ignore
      matches[param] = decodeURIComponent(val)
      // @ts-ignore
      if (plus || star) {
        // @ts-ignore
        matches[param] = url
          // @ts-ignore
          .slice(i)
          // @ts-ignore
          .map(decodeURIComponent)
          // @ts-ignore
          .join('/')
        // @ts-ignore
        break
        // @ts-ignore
      }
      // @ts-ignore
    } else if (route[i] !== url[i]) {
      // @ts-ignore
      ret = false
      // @ts-ignore
      break
      // @ts-ignore
    }
    // @ts-ignore
  }
  // @ts-ignore
  if (opts.default !== true && ret === false) return false
  // @ts-ignore
  return matches
  // @ts-ignore
}
// @ts-ignore

// @ts-ignore
export function pathRankSort(a, b) {
  // @ts-ignore
  return a.rank < b.rank ? 1 : a.rank > b.rank ? -1 : a.index - b.index
  // @ts-ignore
}
// @ts-ignore

// @ts-ignore
// filter out VNodes without attributes (which are unrankeable), and add `index`/`rank` properties to be used in sorting.
// @ts-ignore
export function prepareVNodeForRanking(vnode, index) {
  // @ts-ignore
  vnode.index = index
  // @ts-ignore
  vnode.rank = rankChild(vnode)
  // @ts-ignore
  return vnode.attributes
  // @ts-ignore
}
// @ts-ignore

// @ts-ignore
export function segmentize(url) {
  // @ts-ignore
  return url.replace(/(^\/+|\/+$)/g, '').split('/')
  // @ts-ignore
}
// @ts-ignore

// @ts-ignore
export function rankSegment(segment) {
  // @ts-ignore
  return segment.charAt(0) == ':'
    ? // @ts-ignore
      1 + '*+?'.indexOf(segment.charAt(segment.length - 1)) || 4
    : // @ts-ignore
      5
  // @ts-ignore
}
// @ts-ignore

// @ts-ignore
export function rank(path) {
  // @ts-ignore
  return (
    segmentize(path)
      // @ts-ignore
      .map(rankSegment)
      // @ts-ignore
      .join('')
  )
  // @ts-ignore
}
// @ts-ignore

// @ts-ignore
function rankChild(vnode) {
  // @ts-ignore
  return vnode.attributes.default ? 0 : rank(vnode.attributes.path)
  // @ts-ignore
}
