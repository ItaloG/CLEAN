import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../../protocols'
import { Controller, EmailValidator } from '../singup/sigup-protocols'

export class LoginController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body

    if (!email) return await new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))

    if (!password) return await new Promise(resolve => resolve(badRequest(new MissingParamError('password'))))

    const isValid = this.emailValidator.isValid(email)
    if (!isValid) return badRequest(new InvalidParamError('email'))

    return {
      body: {},
      statusCode: 200
    }
  }
}
