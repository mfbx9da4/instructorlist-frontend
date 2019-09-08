export const isDev = () =>
  typeof window !== 'undefined' && location.href.indexOf('localhost') > -1
export default isDev
