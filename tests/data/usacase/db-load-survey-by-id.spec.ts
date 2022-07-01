import { DbLoadSurveyById } from '@/data/usecases'
import { LoadSurveyByIdRepository } from '@/data/protocols'
import { mockSurveyModel, throwError } from '@/../tests/domain/mocks'
import { mockLoadSurveyByIdRepository } from '@/../tests/data/mocks'
import MockDate from 'mockdate'

type SutTypes = {
  sut: DbLoadSurveyById
  loadSurveysByIdRepositoryStub: LoadSurveyByIdRepository
}

const makeSut = (): SutTypes => {
  const loadSurveysByIdRepositoryStub = mockLoadSurveyByIdRepository()
  const sut = new DbLoadSurveyById(loadSurveysByIdRepositoryStub)
  return {
    sut,
    loadSurveysByIdRepositoryStub
  }
}

describe('DbLoadSurveyById UseCase', () => {
  const surveyId = 'any_id'
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveyByIdRepository', async () => {
    const { sut, loadSurveysByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveysByIdRepositoryStub, 'loadById')
    await sut.loadById(surveyId)
    expect(loadByIdSpy).toHaveBeenCalledWith(surveyId)
  })

  test('Should return a Survey on success', async () => {
    const { sut } = makeSut()
    const survey = await sut.loadById(surveyId)
    expect(survey).toEqual(mockSurveyModel())
  })

  test('Should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, loadSurveysByIdRepositoryStub } = makeSut()
    jest.spyOn(loadSurveysByIdRepositoryStub, 'loadById').mockImplementationOnce(throwError)
    const promise = sut.loadById(surveyId)
    await expect(promise).rejects.toThrow()
  })
})
