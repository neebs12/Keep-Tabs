const info = (...msg: string[]) => {
  console.log('>', ...msg)
}

const error = (...msg: string[]) => {
  console.error('>', ...msg)
}

export default {
  info, error
}