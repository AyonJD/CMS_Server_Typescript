import httpStatus from 'http-status'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { sendSuccessResponse } from '../../utils/customResponse'
import catchAsync from '../../../shared/catchAsync'
import ApiError from '../../../errors/ApiError'

const signupUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body
  const user = await AuthService.signupUser(userData)

  const { accessToken, data } = user
  res
    .header('Authorization', `Bearer ${accessToken}`)
    .header('Access-Control-Expose-Headers', 'Authorization')
    .json({
      message: 'User created successfully',
      data,
      success: true,
      statusCode: httpStatus.CREATED,
    })
})

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body
  const user = await AuthService.loginUser(userData)

  const { accessToken, data } = user
  res
    .header('Authorization', `Bearer ${accessToken}`)
    .header('Access-Control-Expose-Headers', 'Authorization')
    .json({
      message: 'User logged in successfully',
      data,
      success: true,
      statusCode: httpStatus.OK,
    })
})

const loggedInUser = catchAsync(async (req: Request, res: Response) => {
  const authorizationHeader = req.headers.authorization
  if (!authorizationHeader) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please provide a token')
  }

  const token = authorizationHeader.split(' ')[1]
  const user = await AuthService.loggedInUser(token as string)

  const responseData = {
    data: user,
    message: 'User retrieved successfully',
  }
  sendSuccessResponse(res, responseData)
})

export const AuthController = {
  signupUser,
  loginUser,
  loggedInUser,
}
