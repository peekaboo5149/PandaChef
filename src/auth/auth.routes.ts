import Router from 'express'
import { validateCreateUser, validateLoginBody } from './middlewares/validate'
import AuthController from './auth.controller'

const authRouter = Router()

const controller = new AuthController()

authRouter.route('/signup').post(validateCreateUser, controller.register)
authRouter.route('/signin').post(validateLoginBody, controller.login)

export default authRouter
