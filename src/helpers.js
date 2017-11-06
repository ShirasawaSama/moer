export function startsWith (str = '', start = '') {
  str = String(str)
  start = String(start)
  return str.substr(0, start.length) === start
}
export function endsWith (str = '', end = '') {
  str = String(str)
  end = String(end)
  return str.substr(str.length - end.length) === end
}
