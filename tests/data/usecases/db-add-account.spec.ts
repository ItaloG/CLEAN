import { DbAddAccount } from '@/data/usecases'
import { CheckAccountByEmailRepository, Hasher, AddAccountRepository } from '@/data/protocols'
import { mockAddAccountParams, throwError } from '@/tests/domain/mocks'
import { mockAddAccountRepository, mockCheckAccountByEmailRepository, mockHasher } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbAddAccount
  hasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
  checkAccountByEmailRepositoryStub: CheckAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const hasherStub = mockHasher()
  const checkAccountByEmailRepositoryStub = mockCheckAccountByEmailRepository()
  const addAccountRepositoryStub = mockAddAccountRepository()
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub, checkAccountByEmailRepositoryStub)
  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
    checkAccountByEmailRepositoryStub
  }
}

describe('DbAddAccount UseCase', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut()
    const encryptSpy = jest.spyOn(hasherStub, 'hash')
    const addAccountParams = mockAddAccountParams()
    await sut.add(addAccountParams)
    expect(encryptSpy).toHaveBeenCalledWith(addAccountParams.password)
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addAccountParams = mockAddAccountParams()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(addAccountParams)
    expect(addSpy).toHaveBeenCalledWith({
      name: addAccountParams.name,
      email: addAccountParams.email,
      password: addAccountParams.password
    })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return true on success', async () => {
    const { sut } = makeSut()
    const addAccountParams = mockAddAccountParams()
    const isValid = await sut.add(addAccountParams)
    expect(isValid).toBe(true)
  })

  test('Should return false if AddAccountRepository returns false', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(Promise.resolve(false))
    const isValid = await sut.add(mockAddAccountParams())
    expect(isValid).toBe(false)
  })

  test('Should return false if CheckAccountByEmailRepository returns true', async () => {
    const { sut, checkAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(checkAccountByEmailRepositoryStub, 'checkByEmail').mockReturnValueOnce(Promise.resolve(true))
    const isValid = await sut.add(mockAddAccountParams())
    expect(isValid).toBe(false)
  })

  test('Should call CheckAccountByEmailRepository with correct email', async () => {
    const { sut, checkAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(checkAccountByEmailRepositoryStub, 'checkByEmail')
    const addAccountParams = mockAddAccountParams()
    await sut.add(addAccountParams)
    expect(loadSpy).toHaveBeenCalledWith(addAccountParams.email)
  })
})
