import {
  SaveSurveyResult,
  SaveSurveyResultModel,
  SaveSurveyResultRepository,
  SurveyResultModel
} from './db-save-load-survey-result-protocols'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository
  ) {}

  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    const survey = await this.saveSurveyResultRepository.save(data)
    return survey
  }
}
