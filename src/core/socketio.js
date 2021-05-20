import socketio from 'socket.io'
import colorTxt from 'ansi-colors'
import log from '@services/logging/winston/logger'

export default (server, env) => {
  let io = socketio(env.conf.socketio.port)
  // let users = {}

  io.on('connection', (client) => {
    
    client.on("user_join", (data) => {
      console.log("User " + data.user_name + " joined!")
    });

    client.on('user_message', (msg) =>{
      console.log('message: ' + msg)
    })
  })

  console.log(colorTxt.cyanBright(env.labels.TXT_SOCKETIO_UP + " on port " + colorTxt.white(env.conf.socketio.port)) )
  log.info(env.labels.TXT_SOCKETIO_UP + " on port " + env.conf.socketio.port)
}
