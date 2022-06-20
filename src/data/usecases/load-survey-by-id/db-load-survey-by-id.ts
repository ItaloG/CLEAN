import { LoadSurveysByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { SurveyModel } from '@/domain/models/survey'
import { LoadSurveyBtId } from '@/domain/usecases/load-survey-by-id'

export class DbLoadSurveyById implements LoadSurveyBtId {
  constructor (private readonly loadSurveyBtIdRepository: LoadSurveysByIdRepository) {}
  async loadById (id: string): Promise<SurveyModel> {
    await this.loadSurveyBtIdRepository.loadById(id)
    return null
  }
}
