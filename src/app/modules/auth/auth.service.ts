import httpStatus from 'http-status'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { userDetailsModel, userModel } from '../user/user.model'
import jwt from 'jsonwebtoken'
import { getIncrementedUserId } from '../../helpers/generateUserId'
import { IJwtPayload, ILoginUser, IUserResponse } from './auth.interface'
import { ICombinedUser, IUser } from '../user/user.interface'

const signupUser = async (
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
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    return { accessToken, data: { role: newUser.role } }
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
}

const loginUser = async (userDetails: ILoginUser): Promise<IUserResponse> => {
  const { userId, email, password } = userDetails
  if (userId) {
    const user = await userModel
      .findOne({ userId })
      .select({ _id: 0, updatedAt: 0, createdAt: 0, __v: 0 })

    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User not found')
    }

    const storedPassword = user?.password
    const passwordMatch: boolean = storedPassword === password

    if (!passwordMatch) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid password')
    }

    const accessToken = jwt.sign({ userId }, config.access_token as string, {
      expiresIn: '1d',
    })
    return { accessToken, data: { role: user.role } }
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
      throw new ApiError(httpStatus.BAD_REQUEST, 'User not found')
    }

    const storedPassword = user[0].additionalDetails[0].password
    const passwordMatch: boolean = storedPassword === password

    if (!passwordMatch) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid password')
    }

    const userId = user[0].additionalDetails[0].userId
    const role = user[0].additionalDetails[0].role
    const accessToken = jwt.sign({ userId }, config.access_token as string, {
      expiresIn: '1d',
    })
    return { accessToken, data: { userId, role } }
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid request')
}

const loggedInUser = async (token: string): Promise<IUser> => {
  const decodedToken = jwt.verify(
    token,
    config.access_token as string
  ) as IJwtPayload

  const email = decodedToken.email
  const user = await userModel
    .findOne({ email })
    .select({ password: 0, updatedAt: 0, createdAt: 0, __v: 0 })
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found')

  return user
}

export const AuthService = {
  signupUser,
  loginUser,
  loggedInUser,
}
