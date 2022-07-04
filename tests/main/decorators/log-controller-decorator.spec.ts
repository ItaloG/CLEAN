import { LogControllerDecorator } from '@/main/decorators'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { ok, serverError } from '@/presentation/helpers'
import { LogErrorRepository } from '@/data/protocols'
import { mockLogErrorRepository } from '@/tests/data/mocks'

type SutTypes = {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}

const mockServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

const mockController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (request: any): Promise<HttpResponse> {
      return await Promise.resolve(ok(request))
    }
  }

  return new ControllerStub()
}

const makeSut = (): SutTypes => {
  const controllerStub = mockController()
  const logErrorRepositoryStub = mockLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)

  return {
    controllerStub,
    logErrorRepositoryStub,
    sut
  }
}

describe('LogController Decorator', () => {
  test('should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    await sut.handle('any_request')
    expect(handleSpy).toHaveBeenCalledWith('any_request')
  })

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle('any_request')
    expect(httpResponse).toEqual(ok('any_request'))
  })

  test('should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(Promise.resolve(mockServerError()))
    await sut.handle('any_request')
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
