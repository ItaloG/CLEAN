import { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { SurveyModel } from '@/domain/models/survey'
import { AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import { LoadSurveysByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { mockSurveyModel, mockSurveyModels } from '@/domain/test'
import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'

export const mockAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (surveyData: AddSurveyParams): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }

  return new AddSurveyRepositoryStub()
}

export const mockLoadSurveyByIdRepository = (): LoadSurveysByIdRepository => {
  class LoadSurveysByIdRepositoryStub implements LoadSurveysByIdRepository {
    async loadById (id: string): Promise<SurveyModel> {
      return await new Promise(resolve => resolve(mockSurveyModel()))
    }
  }

  return new LoadSurveysByIdRepositoryStub()
}

export const mockLoadSurveysRepository = (): LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll (): Promise<SurveyModel[]> {
      return await new Promise(resolve => resolve(mockSurveyModels()))
    }
  }

  return new LoadSurveysRepositoryStub()
}
