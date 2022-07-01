import { AddAccount, AddAccountParams , Authentication, AuthenticationParams , LoadAccountByToken } from '@/domain/usecases'
import { AccountModel , AuthenticationModel } from '@/domain/models'
import { mockAccountModel } from '@/../tests/domain/mocks'

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountParams): Promise<AccountModel> {
      return await Promise.resolve(mockAccountModel())
    }
  }
  return new AddAccountStub()
}

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authentication: AuthenticationParams): Promise<AuthenticationModel> {
      return { accessToken: 'any_token', name: 'any_name' }
    }
  }
  return new AuthenticationStub()
}

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (accessToken: string, role?: string): Promise<AccountModel> {
      const account = mockAccountModel()
      return await Promise.resolve(account)
    }
  }

  return new LoadAccountByTokenStub()
}
