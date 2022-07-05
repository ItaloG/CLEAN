import { DbLoadAnswersBySurvey } from '@/data/usecases'
import { LoadSurveyByIdRepository } from '@/data/protocols'
import { mockSurveyModel, throwError } from '@/tests/domain/mocks'
import { mockLoadSurveyByIdRepository } from '@/tests/data/mocks'
import MockDate from 'mockdate'

type SutTypes = {
  sut: DbLoadAnswersBySurvey
  loadSurveysByIdRepositoryStub: LoadSurveyByIdRepository
}

const makeSut = (): SutTypes => {
  const loadSurveysByIdRepositoryStub = mockLoadSurveyByIdRepository()
  const sut = new DbLoadAnswersBySurvey(loadSurveysByIdRepositoryStub)
  return {
    sut,
    loadSurveysByIdRepositoryStub
  }
}

describe('DbLoadAnswersBySurvey', () => {
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
    await sut.loadAnswers(surveyId)
    expect(loadByIdSpy).toHaveBeenCalledWith(surveyId)
  })

  test('Should return answers on success', async () => {
    const { sut } = makeSut()
    const survey = mockSurveyModel()
    const answers = await sut.loadAnswers(surveyId)
    expect(answers).toEqual([
      survey.answers[0].answer,
      survey.answers[1].answer
    ])
  })

  test('Should return empty array if LoadSurveyByIdRepository returns null', async () => {
    const { sut, loadSurveysByIdRepositoryStub } = makeSut()
    jest.spyOn(loadSurveysByIdRepositoryStub, 'loadById').mockReturnValueOnce(null)
    const answers = await sut.loadAnswers(surveyId)
    expect(answers).toEqual([])
  })

  test('Should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, loadSurveysByIdRepositoryStub } = makeSut()
    jest.spyOn(loadSurveysByIdRepositoryStub, 'loadById').mockImplementationOnce(throwError)
    const promise = sut.loadAnswers(surveyId)
    await expect(promise).rejects.toThrow()
  })
})
