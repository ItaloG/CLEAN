import { setupApp } from '@/main/config/app'
import { Express } from 'express'
import request from 'supertest'
import { noCache } from '@/main/middlewares'

let app: Express

describe('NoCache Middleware', () => {
  beforeAll(async () => {
    app = await setupApp()
  })

  test('Should enable CORS', async () => {
    app.get('/test_no_cors', noCache, (req, res) => {
      res.send()
    })
    await request(app)
      .get('/test_no_cors')
      .expect('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      .expect('pragma', 'no-cache')
      .expect('expires', '0')
      .expect('surrogate-control', 'no-store')
  })
})
