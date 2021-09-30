import e, { Request, Response, NextFunction } from 'express'
import validator from 'validator'
import { badResponse } from '../../core/utils/functions'

export const validateCreateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body

  if (!username || !email || !password)
    return badResponse(res, 400, 'Missing fields')
  else if (shortusername(username))
    return badResponse(
      res,
      400,
      'Short username (Username should be of atleast 5 characters)'
    )
  else if (!isEmail(email)) return badResponse(res, 400, 'Invalid Email')
  else if (shortPassword(password))
    return badResponse(
      res,
      400,
      'Short Password (Password should be of atleast 5 character)'
    )
  else next()
}

export const validateLoginBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body

  if (!username && !email)
    return badResponse(res, 400, 'Must include username or email')
  const field = <string>(username ?? email)

  if (!password || (password as string).length <= 1)
    return badResponse(res, 400, 'Short Password')

  if (username && email)
    return badResponse(res, 400, 'Only one field is required')

  if (field.length <= 4) return badResponse(res, 400, 'Invalid username/email')

  next()
}

const isEmail = (email: string): boolean => validator.isEmail(email)

const shortPassword = (password: string): boolean => password.length < 5

const shortusername = (username: string): boolean => username.length <= 4
