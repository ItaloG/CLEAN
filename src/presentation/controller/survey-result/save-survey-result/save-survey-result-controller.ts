import { Controller, HttpRequest, HttpResponse, LoadSurveyBtId } from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyBtId: LoadSurveyBtId) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadSurveyBtId.loadById(httpRequest.params.surveyId)
    return null
  }
}
