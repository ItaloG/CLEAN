import { SignUpController } from './signup-controller'
import {
  AddAccount,
  Authentication,
  Validation,
  HttpRequest,
  serverError,
  ServerError,
  forbidden,
  EmailInUseError,
  ok,
  MissingParamError,
  badRequest
} from './singup-controller-protocols'
import { mockValidation } from '@/validation/test'
import { mockAuthentication, mockAddAccount } from '@/presentation/test'

type SutTypes = {
  sut: SignUpController
  addAccountStub: AddAccount
  authenticationStub: Authentication
  validationStub: Validation
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    email: 'any_mail@mail.com',
    name: 'any_name',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

const makeSut = (): SutTypes => {
  const addAccontStub = mockAddAccount()
  const authenticationStub = mockAuthentication()
  const validationStub = mockValidation()
  const sut = new SignUpController(
    addAccontStub,
    validationStub,
    authenticationStub
  )

  return {
    sut,
    addAccountStub: addAccontStub,
    authenticationStub,
    validationStub
  }
}

describe('SigUp Controller', () => {
  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub: addAccontStub } = makeSut()
    jest.spyOn(addAccontStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((_resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub: addAccontStub } = makeSut()
    const addSpy = jest.spyOn(addAccontStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_mail@mail.com',
      password: 'any_password'
    })
  })

  test('Should return 403 if AddAccount returns null', async () => {
    const { sut, addAccountStub: addAccontStub } = makeSut()
    jest
      .spyOn(addAccontStub, 'add')
      .mockReturnValueOnce(new Promise((resolve) => resolve(null)))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok({ accessToken: 'any_token' }))
  })

  test('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(makeFakeRequest())
    expect(authSpy).toHaveBeenCalledWith({
      email: 'any_mail@mail.com',
      password: 'any_password'
    })
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(async () => {
      return await new Promise((_resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
