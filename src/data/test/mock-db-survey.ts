import { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { SurveyModel } from '@/domain/models/survey'
import { AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { mockSurveyModel, mockSurveyModels } from '@/domain/test'
import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'

export const mockAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (surveyData: AddSurveyParams): Promise<void> {
      return await Promise.resolve()
    }
  }

  return new AddSurveyRepositoryStub()
}

export const mockLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveysByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (id: string): Promise<SurveyModel> {
      return await Promise.resolve(mockSurveyModel())
    }
  }

  return new LoadSurveysByIdRepositoryStub()
}

export const mockLoadSurveysRepository = (): LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll (accountId: string): Promise<SurveyModel[]> {
      return await Promise.resolve(mockSurveyModels())
    }
  }

  return new LoadSurveysRepositoryStub()
}
