import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helper/mongo-helper'
import app from '../config/app'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await (await accountCollection).deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Italo',
        email: 'italo.pereira@gmail.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
