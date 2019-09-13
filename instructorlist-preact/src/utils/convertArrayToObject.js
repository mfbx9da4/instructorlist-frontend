export function convertArrayToObject(array, key) {
  if (!Array.isArray(array)) throw new Error('First argument must be array')
  return array.reduce((acc, cur) => {
    acc[cur[key]] = cur
    return acc
  }, {})
}
