import { Controller, forbidden, HttpRequest, HttpResponse, InvalidParamError, LoadSurveyBtId, serverError } from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyBtId: LoadSurveyBtId) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const survey = await this.loadSurveyBtId.loadById(httpRequest.params.surveyId)
      if (!survey) return forbidden(new InvalidParamError('surveyId'))
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
