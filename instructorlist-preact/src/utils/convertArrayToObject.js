export function convertArrayToObject(array, key) {
  if (!Array.isArray(array)) throw new Error('First argument must be array')
  return array.reduce((prev, acc) => {
    acc[prev[key]] = prev
    return acc
  })
}
