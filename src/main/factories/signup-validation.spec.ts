import { CompareFieldValidation } from '../../presentation/helpers/validators/compare-field-validaion'
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validaion'
import { ValidationComposite } from '../../presentation/helpers/validators/validaion-composite'
import { Validation } from '../../presentation/helpers/validators/validation'
import { makeSignUpValidation } from './signup-validation'

jest.mock('../../presentation/helpers/validators/validaion-composite')

describe('Signup Validation ', () => {
  test('should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
