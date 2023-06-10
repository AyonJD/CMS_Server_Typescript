import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import {
  ICombinedUser,
  IJwtPayload,
  ILoginUser,
  IUserResponse,
} from './user.interface'
import { userDetailsModel, userModel } from './user.model'
import { getIncrementedUserId } from './user.utils'
import jwt from 'jsonwebtoken'

const createUserService = async (
  userDetails: ICombinedUser
): Promise<IUserResponse> => {
  // Make incrementing userId role based
  const newUserId = await getIncrementedUserId(userDetails.role)

  const { name, email, role, password } = userDetails

  const accessToken = jwt.sign(
    { email, userId: newUserId },
    config.access_token as string,
    {
      expiresIn: '1d',
    }
  )

  const newUserDetails = await userDetailsModel.create({
    id: newUserId,
    name: {
      firstName: name.firstName,
      lastName: name.lastName,
    },
    email,
  })

  if (newUserDetails) {
    const newUser = await userModel.create({
      role,
      password,
      userId: newUserId,
    })

    if (!newUser) {
      throw new ApiError(400, 'Failed to create user')
    }
    return { accessToken, result: newUser }
  }

  throw new ApiError(400, 'Failed to create user')
}

const loginUserService = async (
  userDetails: ILoginUser
): Promise<IUserResponse> => {
  const { userId, email, password } = userDetails
  if (userId) {
    const user = await userModel
      .findOne({ userId })
      .select({ _id: 0, updatedAt: 0, createdAt: 0, __v: 0 })

    if (!user) {
      throw new ApiError(400, 'User not found')
    }

    const storedPassword = user?.password
    const passwordMatch: boolean = storedPassword === password

    if (!passwordMatch) {
      throw new ApiError(400, 'Invalid password')
    }

    const accessToken = jwt.sign({ userId }, config.access_token as string, {
      expiresIn: '1d',
    })
    return { accessToken, result: { userId, role: user.role } }
  }

  if (email) {
    const user = await userDetailsModel.aggregate([
      { $match: { email } },
      {
        $lookup: {
          from: 'users',
          localField: 'id',
          foreignField: 'userId',
          as: 'additionalDetails',
        },
      },
    ])

    if (user.length === 0) {
      throw new ApiError(400, 'User not found')
    }

    const storedPassword = user[0].additionalDetails[0].password
    const passwordMatch: boolean = storedPassword === password

    if (!passwordMatch) {
      throw new ApiError(400, 'Invalid password')
    }

    const userId = user[0].additionalDetails[0].userId
    const role = user[0].additionalDetails[0].role
    const accessToken = jwt.sign({ userId }, config.access_token as string, {
      expiresIn: '1d',
    })
    return { accessToken, result: { userId, role } }
  }

  throw new ApiError(400, 'Invalid request')
}

const loggedInUserService = async (token: string): Promise<IUserResponse> => {
  const decodedToken = jwt.verify(
    token,
    config.access_token as string
  ) as IJwtPayload

  const userId = decodedToken.userId
  const user = await userModel
    .findOne({ userId })
    .select({ password: 0, _id: 0, updatedAt: 0, createdAt: 0, __v: 0 })

  if (!user) {
    throw new ApiError(400, 'User not found')
  }

  return { accessToken: token, result: user }
}

export const UserService = {
  createUserService,
  loginUserService,
  loggedInUserService,
}
