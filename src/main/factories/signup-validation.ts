import { CompareFieldValidation } from '../../presentation/helpers/validators/compare-field-validaion'
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validaion'
import { ValidationComposite } from '../../presentation/helpers/validators/validaion-composite'
import { Validation } from '../../presentation/helpers/validators/validation'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
  return new ValidationComposite(validations)
}
