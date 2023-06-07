import { RequestHandler } from 'express'
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '../../utils/customResponse'
import { IUserResponse } from './user.interface'
import { UserService } from './user.service'

const createUser: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const userDetails = req.body
    const userResponse: IUserResponse = await UserService.createUserService(
      userDetails
    )

    const { accessToken, result } = userResponse
    res
      .header('Authorization', `Bearer ${accessToken}`)
      .header('Access-Control-Expose-Headers', 'Authorization')
      .json({ message: 'User registered successfully', result })
  } catch (error: any) {
    next(error)
  }
}

const loginUser: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const userDetails = req.body
    const userResponse: IUserResponse = await UserService.loginUserService(
      userDetails
    )

    const { accessToken, result } = userResponse
    res
      .header('Authorization', `Bearer ${accessToken}`)
      .header('Access-Control-Expose-Headers', 'Authorization')
      .json({ message: 'User logged in successfully', result })
  } catch (error: any) {
    next(error)
  }
}

const loggedInUser: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) {
      sendErrorResponse(res, 401, 'Authorization header missing')
      return
    }

    const token = authorizationHeader.split(' ')[1]
    const user = await UserService.loggedInUserService(token)
    sendSuccessResponse(res, user)
  } catch (error: any) {
    next(error)
  }
}

export const UserController = {
  createUser,
  loginUser,
  loggedInUser,
}
