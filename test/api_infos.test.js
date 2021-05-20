import request from 'supertest'
import config from '@config/app'
import labels from '@config/labels'

const conf = config['development']

var app

beforeAll(() => app = require('../src/core/express')({conf, labels}))

describe('Api infos endpoints', () => {

  test('get root redirect', async (done) => {
    const res = await request(app).get('/')
    expect(res.status).toBe(302)
    done()
  })

  test('get info', async (done) => {
    const res = await request(app).get('/api/v1/info')
    expect(res.status).toBe(200)
    //expect(response.body.message).toBe('pass!')
    done()
  })

  test('get version', async (done) => {
    const res = await request(app).get('/api/v1/version')
    expect(res.status).toBe(200)
    //expect(response.body.message).toBe('pass!')
    done()
  })

})

// afterEach(() => app.close())