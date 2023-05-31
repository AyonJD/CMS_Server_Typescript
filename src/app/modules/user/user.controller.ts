import { Request, Response } from 'express'
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '../../utils/customResponse'
import {
  createUserService,
  loggedInUserService,
  loginUserService,
} from './user.service'
import { IUserResponse } from './user.interface'

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userDetails = req.body
    const userResponse: IUserResponse | undefined = await createUserService(
      userDetails
    )

    if (userResponse) {
      const { accessToken, result } = userResponse
      res
        .header('Authorization', `Bearer ${accessToken}`)
        .header('Access-Control-Expose-Headers', 'Authorization')
        .json({ message: 'User registered successfully', result })
    } else {
      sendErrorResponse(res, 500, 'Failed to create user.')
    }
  } catch (error: any) {
    sendErrorResponse(res, 500, error.message)
  }
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userDetails = req.body
    const userResponse: IUserResponse | undefined = await loginUserService(
      userDetails
    )

    if (userResponse) {
      const { accessToken, result } = userResponse
      res
        .header('Authorization', `Bearer ${accessToken}`)
        .header('Access-Control-Expose-Headers', 'Authorization')
        .json({ message: 'User logged in successfully', result })
    } else {
      sendErrorResponse(res, 500, 'Failed to login user.')
    }
  } catch (error: any) {
    sendErrorResponse(res, 500, error.message)
  }
}

export const loggedInUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) {
      sendErrorResponse(res, 401, 'Authorization header missing')
      return
    }

    const token = authorizationHeader.split(' ')[1]
    const user = await loggedInUserService(token)
    if (user) {
      sendSuccessResponse(res, user)
    }
  } catch (error: any) {
    sendErrorResponse(res, 500, error.message)
  }
}
