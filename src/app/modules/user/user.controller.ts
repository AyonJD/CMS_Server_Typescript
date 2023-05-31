import { Request, Response } from 'express'
import { sendErrorResponse } from '../../utils/customResponse'
import { createUserService } from './user.service'
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
