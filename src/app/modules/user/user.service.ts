import config from '../../../config'
import {
  ICombinedUser,
  IJwtPayload,
  ILoginUser,
  IUserResponse,
} from './user.interface'
import { userDetailsModel, userModel } from './user.model'
import { getIncrementedUserId } from './user.utils'
import jwt, { TokenExpiredError } from 'jsonwebtoken'

export const createUserService = async (
  userDetails: ICombinedUser
): Promise<IUserResponse | undefined> => {
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
    return { accessToken, result: newUser }
  }

  return undefined
}

export const loginUserService = async (
  userDetails: ILoginUser
): Promise<IUserResponse | undefined> => {
  const { userId, email, password } = userDetails

  if (userId) {
    const user = await userModel
      .findOne({ userId, password: password })
      .select({ password: 0, _id: 0, updatedAt: 0, createdAt: 0, __v: 0 })
    if (user) {
      const accessToken = jwt.sign({ userId }, config.access_token as string, {
        expiresIn: '1d',
      })
      return { accessToken, result: user }
    }
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

    if (user.length > 0) {
      const storedPassword = user[0].additionalDetails[0].password
      const passwordMatch: boolean = storedPassword === password

      if (passwordMatch) {
        const userId = user[0].additionalDetails[0].userId
        const role = user[0].additionalDetails[0].role
        const accessToken = jwt.sign(
          { userId },
          config.access_token as string,
          {
            expiresIn: '1d',
          }
        )
        return { accessToken, result: { userId, role } }
      }
    }
  }

  return undefined
}

export const loggedInUserService = async (
  token: string
): Promise<IUserResponse | undefined> => {
  try {
    const decodedToken = jwt.verify(
      token,
      config.access_token as string
    ) as IJwtPayload

    const userId = decodedToken.userId
    const user = await userModel
      .findOne({ userId })
      .select({ password: 0, _id: 0, updatedAt: 0, createdAt: 0, __v: 0 })

    if (user) {
      return { accessToken: token, result: user }
    }
    return undefined
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return Promise.reject('Token expired')
    } else {
      return Promise.reject('Invalid token')
    }
  }
}
