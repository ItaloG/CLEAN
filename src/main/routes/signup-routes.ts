import { Router } from 'express'
import { adaptRoute } from '../adapter/express-routes-adapter'
import { makeSignUpController } from '../factories/signup'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
}
