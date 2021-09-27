import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

import User from './model/User'

export default class AuthController {
  async register(req: Request, res: Response) {
    let { username, email, password } = req.body

    try {
      const salt = await bcrypt.genSalt(10)
      password = await bcrypt.hash(password, salt)

      const user = new User({
        username,
        email,
        password,
      })

      const emailExist = await User.findOne({ email })
      const usernameExist = await User.findOne({ username })

      if (emailExist) {
        return res.status(404).send({
          code: 404,
          success: false,
          message: 'Email aleady exist!!',
          data: null,
        })
      }
      if (usernameExist) {
        return res.status(404).send({
          code: 404,
          success: false,
          message: 'Username taken!!',
          data: null,
        })
      }

      await user.save()
      return res.send({
        code: 201,
        success: true,
        message: 'success',
        data: user,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).send({
        code: 500,
        success: false,
        message: 'Internal Server Error',
        data: null,
      })
    }
  }

  async login(req: Request, res: Response) {}
}
