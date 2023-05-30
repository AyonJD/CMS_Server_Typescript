import { Request, Response } from 'express'
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '../../utils/customResponse'
import { createUserService } from './user.service'

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userDetails = req.body
    const result = await createUserService(userDetails)
    if (result) {
      sendSuccessResponse(res, result, 'User created successfully')
    }
  } catch (error: any) {
    sendErrorResponse(res, 500, error.message)
  }
}
