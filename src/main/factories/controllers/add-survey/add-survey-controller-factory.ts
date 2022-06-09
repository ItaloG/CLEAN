import { AddSurveyController } from '../../../../presentation/controller/survey/add-survey/add-survey-controller'
import { Controller } from '../../../../presentation/protocols'
import { makeDbAddSurvey } from '../../usecases/add-survey/db-add-survey-factory'
import { makeLogControllerDecorator } from '../../usecases/decorator/log-controller-decorator-factory'
import { makeAddSurveyValidation } from './add-survey-validation-factory'

export const makeAddSurveyController = (): Controller => {
  const controller = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())
  return makeLogControllerDecorator(controller)
}
