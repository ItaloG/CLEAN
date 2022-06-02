import { CompareFieldValidation } from '../../presentation/helpers/validators/compare-field-validaion'
import { EmailValidation } from '../../presentation/helpers/validators/email-validaion'
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validaion'
import { ValidationComposite } from '../../presentation/helpers/validators/validaion-composite'
import { Validation } from '../../presentation/helpers/validators/validation'
import { EmailValidator } from '../../presentation/protocols/emailValidator'
import { makeSignUpValidation } from './signup-validation'

jest.mock('../../presentation/helpers/validators/validaion-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('Signup Validation ', () => {
  test('should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
