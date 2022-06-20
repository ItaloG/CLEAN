import { SurveyModel } from '@/domain/models/survey'

export interface LoadSurveyBtId {
  loadById: (id: string) => Promise<SurveyModel>
}
