import { LoadSurveysByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { SurveyModel } from '@/domain/models/survey'
import { DbLoadSurveyById } from './db-load-survey-by-id'
import MockDate from 'mockdate'

const makeFakeSurvey = (): SurveyModel => (
  {
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    date: new Date()
  }
)

const makeLoadSurveysByIdRepository = (): LoadSurveysByIdRepository => {
  class LoadSurveysByIdRepositoryStub implements LoadSurveysByIdRepository {
    async loadById (id: string): Promise<SurveyModel> {
      return await new Promise(resolve => resolve(makeFakeSurvey()))
    }
  }

  return new LoadSurveysByIdRepositoryStub()
}

type SutTypes = {
  sut: DbLoadSurveyById
  loadSurveysByIdRepositoryStub: LoadSurveysByIdRepository
}

const makeSut = (): SutTypes => {
  const loadSurveysByIdRepositoryStub = makeLoadSurveysByIdRepository()
  const sut = new DbLoadSurveyById(loadSurveysByIdRepositoryStub)
  return {
    sut,
    loadSurveysByIdRepositoryStub
  }
}

describe('DbLoadSurveys', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveysByIdRepository with correct id', async () => {
    const { sut, loadSurveysByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveysByIdRepositoryStub, 'loadById')
    await sut.loadById('any_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })
})
