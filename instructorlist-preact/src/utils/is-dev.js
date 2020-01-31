export const isDev = () =>
  typeof window !== 'undefined' &&
  (location.href.indexOf('localhost') > -1 ||
    location.href.indexOf('0.0.0.0') > -1)
export default isDev
