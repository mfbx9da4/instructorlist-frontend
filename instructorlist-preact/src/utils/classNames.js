export const classNames = obj => {
  return Object.entries(obj)
    .filter(e => e[1])
    .map(e => e[0])
    .join(' ')
}

export default classNames
