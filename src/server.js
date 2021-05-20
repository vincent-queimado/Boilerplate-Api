import settings from '@core/settings'
import express from '@core/express'
import http from '@core/http'
import socketio from '@core/socketio'

const main = async() => {
    console.log('loading app..')
    // *** LOAD SETTINGS ***
    let env = await settings()

    // *** LOAD EXPRESS APP ***
    let app = await express(env)

    // *** LOAD HTTP SERVER ***
    let server = await http(app, env)

    // *** LOAD SOCKETIO ***
    await socketio(server, env)
}

main()
