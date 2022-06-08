import { SignUpController } from '../../../../presentation/controller/singup/signup-controller'
import { Controller } from '../../../../presentation/protocols'
import { makeDbAddAccount } from '../../usecases/add-account/db-add-account-factory'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory'
import { makeLogControllerDecorator } from '../../usecases/decoretor/log-controller-decorator-factory'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
