import { sign } from 'jsonwebtoken'
import { Collection, ObjectId } from 'mongodb'
import request from 'supertest'
import { AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import { MongoHelper } from '@/infra/db/mongodb/helper/mongo-helper'
import app from '@/main/config/app'
import env from '@/main/config/env'
import { mockSurveyModel } from '@/domain/test'

let surveyCollection: Collection
let accountCollection: Collection

const generateAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'Italo',
    email: 'italo.pereira@gmail.com',
    password: '123',
    role: 'admin'
  })
  const id = res.insertedId
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne({
    _id: new ObjectId(id)
  }, {
    $set: {
      accessToken
    }
  })

  return accessToken
}

const makeFakeSurveys = (): AddSurveyParams[] => ([{
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }],
  date: new Date()
}, {
  question: 'other_question',
  answers: [{
    image: 'other_image',
    answer: 'other_answer'
  }],
  date: new Date()
}])

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('POST /surveys', () => {
    test('should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send(mockSurveyModel())
        .expect(403)
    })

    test('should return 204 on add survey with valid accessToken', async () => {
      const accessToken = await generateAccessToken()
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send(mockSurveyModel())
        .expect(204)
    })
  })

  describe('GET /surveys', () => {
    test('should return 403 on load surveys without accessToken', async () => {
      await request(app)
        .get('/api/surveys')
        .expect(403)
    })

    test('should return 200 on load surveys with valid accessToken', async () => {
      const accessToken = await generateAccessToken()
      await surveyCollection.insertMany(makeFakeSurveys())
      await request(app)
        .get('/api/surveys')
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })

  describe('PUT /surveys/:surveyId/results', () => {
    test('should return 403 on save survey result without accessToken', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({
          answer: 'any_answer'
        })
        .expect(403)
    })
  })
})
