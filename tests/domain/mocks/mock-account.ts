import { AccountModel } from '@/domain/models'
import { AddAccount, AuthenticationParams } from '@/domain/usecases'

export const mockAddAccountParams = (): AddAccount.Params => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

export const mockAccountModel = (): AccountModel =>
  Object.assign({}, mockAddAccountParams(), { id: 'any_id' })

export const mockAuthenticationParams = (): AuthenticationParams => ({
  email: 'any_email@gmail.com',
  password: 'any_password'
})
