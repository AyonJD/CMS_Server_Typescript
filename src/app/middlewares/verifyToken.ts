import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { sendErrorResponse } from '../utils/customResponse'
import config from '../../config'

declare module 'express' {
  interface Request {
    user?: any // Replace `any` with the actual type of `user` if known
  }
}

export default function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const token = req.headers.authorization?.split(' ')[1] || ''
  if (!token) {
    return sendErrorResponse(res, 401, 'Access denied!')
  }

  try {
    const decoded = jwt.verify(token, config.access_token as string)
    req.user = decoded
    next()
  } catch (error) {
    return sendErrorResponse(res, 400, 'Invalid token!')
  }
}
