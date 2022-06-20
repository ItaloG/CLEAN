import { LoadSurveyBtId, LoadSurveysByIdRepository, SurveyModel } from './db-load-surveys-protocols'

export class DbLoadSurveyById implements LoadSurveyBtId {
  constructor (private readonly loadSurveyBtIdRepository: LoadSurveysByIdRepository) {}
  async loadById (id: string): Promise<SurveyModel> {
    const survey = await this.loadSurveyBtIdRepository.loadById(id)
    return survey
  }
}
