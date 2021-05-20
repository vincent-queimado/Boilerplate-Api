import fs from 'fs'
import http from 'http'
import https from 'https'
import colorTxt from 'ansi-colors'
import logger from '@services/logging/winston/logger'

export default (app, env) => {
  const host = env.conf.server.host
  const port = process.env.PORT || normalizePort(env.conf.server.port)
  let server = null
  let options = null

  if(process.env.NODE_ENV && process.env.NODE_ENV !== 'development'){
    
    try {
      options = {
        key: fs.readFileSync('./src/providers/ssl/privkey.pem'),
        cert: fs.readFileSync('./src/providers/ssl/cert.pem'),
        ca: fs.readFileSync('./src/providers/ssl/chain.pem')
      }
    } catch (err) {
      console.log("SSL certificate is not found!")
      console.log(err)
    }

    server = https.createServer(options, app)
  } else {
    server = http.createServer(app)
  }
  

  server.listen(port, host)
  server.on('error', onError)
  server.on('listening', onListening)

  function onListening () { 
    console.log(colorTxt.cyanBright(env.labels.TXT_HTTP_SERVER_UP + " on host " + colorTxt.white(host) + " at the port " + colorTxt.white(port))) 
    logger.info(env.labels.TXT_HTTP_SERVER_UP + " on host " + host + " at the port " + port)
  }

  function normalizePort (val) {
    let port = parseInt(val, 10)
    if (isNaN(port)) { return val }
    if (port >= 0) { return port }
    return false
  }

  function onError (error) {
    if (error.syscall !== 'listen') {
      throw error
    }

    let bind = typeof serverPort === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port

    switch (error.code) {
      case 'EACCES':
        console.log(colorTxt.red('** ' + bind + ' ' + env.labels.TXT_ERR_HOST_EACCES))
        process.exit(1)
        break
      case 'EADDRINUSE':
        console.log(colorTxt.red('** ' + bind + ' ' + env.labels.TXT_ERR_HOST_EADDRINUSE))
        process.exit(1)
        break
      default:
        throw error
    }
  }

  return server
  
}
