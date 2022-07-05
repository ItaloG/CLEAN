import { SaveSurveyResultController } from '@/presentation/controllers'
import { InvalidParamError } from '@/presentation/errors'
import { serverError, ok, forbidden } from '@/presentation/helpers'
import { SaveSurveyResult , LoadAnswersBySurvey } from '@/domain/usecases'
import { mockLoadAnswersBySurvey, mockSaveSurveyResult } from '@/tests/presentation/mocks'
import { mockSurveyResultModel, throwError } from '@/tests/domain/mocks'
import MockDate from 'mockdate'

const mockRequest = (answer: string = null): SaveSurveyResultController.Request => ({
  surveyId: 'any_survey_id',
  answer,
  accountId: 'any_account_id'
})

type SutTypes = {
  sut: SaveSurveyResultController
  loadAnswerBySurveyStub: LoadAnswersBySurvey
  saveSurveyResultStub: SaveSurveyResult
}

const makeSut = (): SutTypes => {
  const loadAnswerBySurveyStub = mockLoadAnswersBySurvey()
  const saveSurveyResultStub = mockSaveSurveyResult()
  const sut = new SaveSurveyResultController(
    loadAnswerBySurveyStub,
    saveSurveyResultStub
  )

  return {
    sut,
    loadAnswerBySurveyStub,
    saveSurveyResultStub
  }
}

describe('SaveSurveyResult Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call loadAnswerBySurveyStub with correct values', async () => {
    const { sut, loadAnswerBySurveyStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadAnswerBySurveyStub, 'loadAnswers')
    const request = mockRequest()
    await sut.handle(request)
    expect(loadByIdSpy).toHaveBeenCalledWith(request.surveyId)
  })

  test('Should return 403 if loadAnswerBySurveyStub returns null', async () => {
    const { sut, loadAnswerBySurveyStub } = makeSut()
    jest.spyOn(loadAnswerBySurveyStub, 'loadAnswers').mockReturnValueOnce(Promise.resolve([] as string[]))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  test('Should return 500 if LoadAnswersBySurvey throws', async () => {
    const { sut, loadAnswerBySurveyStub } = makeSut()
    jest.spyOn(loadAnswerBySurveyStub, 'loadAnswers').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 403 if an invalid answer is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('answer')))
  })

  test('Should call SaveSurveyResult with correct values', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultStub, 'save')
    const request = mockRequest('any_answer')
    await sut.handle(request)
    expect(saveSpy).toHaveBeenCalledWith({
      surveyId: request.surveyId,
      accountId: request.accountId,
      date: new Date(),
      answer: request.answer
    })
  })

  test('Should return 500 if SaveSurveyResult throws', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    jest.spyOn(saveSurveyResultStub, 'save').mockImplementationOnce(throwError)
    const request = mockRequest('any_answer')
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const request = mockRequest('any_answer')
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok(mockSurveyResultModel()))
  })
})
