import Router from 'express'
import { validateCreateUser } from './middlewares/validate'
import AuthController from './auth.controller'

const authRouter = Router()

const controller = new AuthController()

authRouter.route('/signup').post(validateCreateUser, controller.register)

export default authRouter
