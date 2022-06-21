import {
  Controller,
  forbidden,
  HttpRequest,
  HttpResponse,
  InvalidParamError,
  LoadSurveyBtId,
  SaveSurveyResult,
  serverError
} from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyBtId: LoadSurveyBtId,
    private readonly saveSurveyResult: SaveSurveyResult
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const { answer } = httpRequest.body
      const { accountId } = httpRequest

      const survey = await this.loadSurveyBtId.loadById(surveyId)
      if (survey) {
        const answers = survey.answers.map((a) => a.answer)
        if (!answers.includes(answer)) { return forbidden(new InvalidParamError('answer')) }
        await this.saveSurveyResult.save({
          accountId,
          answer,
          surveyId,
          date: new Date()
        })
      } else {
        return forbidden(new InvalidParamError('surveyId'))
      }
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
