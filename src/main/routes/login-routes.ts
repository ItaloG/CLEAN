import { Router } from 'express'
import { adaptRoute } from '../adapter/express/express-routes-adapter'
import { makeLoginController } from '../factories/conttrollers/login/login-controller-factory'
import { makeSignUpController } from '../factories/conttrollers/signup/signup-controller-factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
