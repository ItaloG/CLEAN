import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../../protocols'
import { Controller, EmailValidator } from '../singup/sigup-protocols'

export class LoginController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) return await new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))

    if (!httpRequest.body.password) return await new Promise(resolve => resolve(badRequest(new MissingParamError('password'))))

    const isValid = this.emailValidator.isValid(httpRequest.body.email)
    if (!isValid) return badRequest(new InvalidParamError('email'))

    return {
      body: {},
      statusCode: 200
    }
  }
}
