import { Request, Response, NextFunction } from 'express'
import validator from 'validator'

export const validateCreateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body

  if (!username || !email || !password) return badrequest(res, 'Missing fields')
  else if (shortusername(username))
    return badrequest(
      res,
      'Short username (Username should be of atleast 5 characters)'
    )
  else if (!isEmail(email)) return badrequest(res, 'Invalid Email')
  else if (shortPassword(password))
    return badrequest(
      res,
      'Short Password (Password should be of atleast 5 character)'
    )
  else next()
}

const isEmail = (email: string): boolean => validator.isEmail(email)

const shortPassword = (password: string): boolean => password.length < 5

const shortusername = (username: string): boolean => username.length <= 4

const badrequest = (res: Response, message: string, code?: 400): Response =>
  res.status(400).send({
    code: code,
    status: false,
    messsage: message,
    data: null,
  })
