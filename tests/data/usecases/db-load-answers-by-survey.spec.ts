import { DbLoadAnswersBySurvey } from '@/data/usecases'
import { LoadAnswersBySurveyRepository } from '@/data/protocols'
import { mockSurveyModel, throwError } from '@/tests/domain/mocks'
import { mockLoadAnswersBySurveyRepository } from '@/tests/data/mocks'
import MockDate from 'mockdate'

type SutTypes = {
  sut: DbLoadAnswersBySurvey
  loadAnswersBySurveyRepositoryStub: LoadAnswersBySurveyRepository
}

const makeSut = (): SutTypes => {
  const loadAnswersBySurveyRepositoryStub = mockLoadAnswersBySurveyRepository()
  const sut = new DbLoadAnswersBySurvey(loadAnswersBySurveyRepositoryStub)
  return {
    sut,
    loadAnswersBySurveyRepositoryStub
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

  test('Should call LoadAnswersBySurveyRepository', async () => {
    const { sut, loadAnswersBySurveyRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadAnswersBySurveyRepositoryStub, 'loadAnswers')
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

  test('Should return empty array if LoadAnswersBySurveyRepository  returns null', async () => {
    const { sut, loadAnswersBySurveyRepositoryStub } = makeSut()
    jest.spyOn(loadAnswersBySurveyRepositoryStub, 'loadAnswers').mockReturnValueOnce(Promise.resolve([] as string[]))
    const answers = await sut.loadAnswers(surveyId)
    expect(answers).toEqual([])
  })

  test('Should throw if LoadAnswersBySurveyRepository  throws', async () => {
    const { sut, loadAnswersBySurveyRepositoryStub } = makeSut()
    jest.spyOn(loadAnswersBySurveyRepositoryStub, 'loadAnswers').mockImplementationOnce(throwError)
    const promise = sut.loadAnswers(surveyId)
    await expect(promise).rejects.toThrow()
  })
})
