export default states => {
  if (!Array.isArray(states)) {
    states = []
  }
  return Class => !states.length ? Class : class Connected extends Class {
    __connected = true
  }
}
