import config from '../../../config'
import { ICombinedUser, IUserResponse } from './user.interface'
import { userDetailsModel, userModel } from './user.model'
import { getIncrementedUserId } from './user.utils'
import jwt from 'jsonwebtoken'

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

// export const loginUserService = async (
//   userDetails: ILoginUser
// ): Promise<IUser> => {
//   const { role, password } = userDetails
// }
