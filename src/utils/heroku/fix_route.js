import config from '@config/app'

export default () => {
  const env = process.env.NODE_ENV || 'development'
  const conf = config[env]
  let apiUrl = ''

  if (conf.api.host.includes('herokuapp.com') ) {
    apiUrl = conf.api.host + '/api/'
  } else {
    apiUrl = conf.api.host + ':' + conf.api.port + '/api/'
  }
  
  return apiUrl
}
