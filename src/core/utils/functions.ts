import { Response } from 'express'

export const response = (
  res: Response,
  code: number,
  success: boolean,
  message: string,
  data: object | null
): Response => res.status(code).send({ code, success, message, data })

export const goodResponse = (res: Response, data: object) =>
  response(res, 200, true, 'success', data)

export const badResponse = (res: Response, code: number, message: string) =>
  response(res, code, false, message, null)
