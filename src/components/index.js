const resolver = (env) => {
  switch (env) {
    case 'web': return require('./react-web')

    default: {
      throw Error('what are u doing without env?!')
    }
  }
}

export default resolver('web')
