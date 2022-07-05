import { AddSurvey , LoadAnswersBySurvey , LoadSurveys, CheckSurveyById } from '@/domain/usecases'
import { mockSurveyModels } from '@/tests/domain/mocks'

export const mockAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add (data: AddSurvey.Params): Promise<void> {
      return await Promise.resolve()
    }
  }
  return new AddSurveyStub()
}

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (accountId: string): Promise<LoadSurveys.Result> {
      return await Promise.resolve(mockSurveyModels())
    }
  }

  return new LoadSurveysStub()
}

export const mockLoadAnswersBySurvey = (): LoadAnswersBySurvey => {
  class LoadAnswersBySurveyStub implements LoadAnswersBySurvey {
    async loadAnswers (id: string): Promise<LoadAnswersBySurvey.Result> {
      return await Promise.resolve(['any_answer', 'other_answer'])
    }
  }

  return new LoadAnswersBySurveyStub()
}

export const mockCheckSurveyById = (): CheckSurveyById => {
  class CheckSurveyByIdStub implements CheckSurveyById {
    async checkById (id: string): Promise<boolean> {
      return true
    }
  }

  return new CheckSurveyByIdStub()
}
