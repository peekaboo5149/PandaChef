import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

import { goodResponse, badResponse } from '../core/utils/functions'

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
        return badResponse(res, 404, 'Email aleady exist!!')
      }
      if (usernameExist) {
        return badResponse(res, 404, 'Username taken!!')
      }

      await user.save()
      return goodResponse(res, user)
    } catch (error) {
      console.error(error)
      return badResponse(res, 500, 'Internal Server Error')
    }
  }

  async login(req: Request, res: Response) {
    let { username, email, password } = req.body

    try {
      let user

      if (!email) {
        user = await User.findOne({ username })

        if (!user) return NotFound(res)
      } else {
        user = await User.findOne({ email })
        if (!user) return NotFound(res)
      }

      const check = await bcrypt.compare(password, user.password!)

      if (!check)
        return badResponse(res, 400, 'Invalid email/username/password')

      return goodResponse(res, user)
    } catch (error) {
      console.log(error)
      return badResponse(res, 500, 'Intenal server error')
    }
  }
}

const NotFound = (res: Response) => badResponse(res, 404, 'User not found')
