import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

export default class AuthController {
  async register(req: Request, res: Response) {
    let { username, email, password } = req.body

    try {
      const salt = await bcrypt.genSalt(10)
      password = await bcrypt.hash(password, salt)

      /**add database funcs */

      return res.send({
        code: 201,
        success: true,
        message: 'success',
        data: {
          username,
          email,
          password,
        },
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
}
