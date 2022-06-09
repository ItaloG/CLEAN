import { Collection } from 'mongodb'
import { AddSurveyModel } from '../../../../domain/usecases/add-survey'
import { MongoHelper } from '../helper/mongo-helper'
import { SurveyMongoRepository } from './survey-mongo-repository'

let surveyCollection: Collection

const makeFakeSurvey = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }, {
    answer: 'other_answer'
  }]
})

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository()
}

describe('Name of the group', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('should create an survey on success', async () => {
    const sut = makeSut()
    await sut.add(makeFakeSurvey())
    const survey = await surveyCollection.findOne({ question: 'any_question' })
    expect(survey).toBeTruthy()
  })
})
