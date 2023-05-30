import { ICombinedUser, IUser } from './user.interface'
import { userDetailsModel, userModel } from './user.model'
import { getIncrementedUserId } from './user.utils'

export const createUserService = async (
  userDetails: ICombinedUser
): Promise<IUser | undefined> => {
  // Make incrementing userId role based
  const newUserId = await getIncrementedUserId(userDetails.role)

  const { name, email } = userDetails
  const newUserDetails = await userDetailsModel.create({
    id: newUserId,
    name: {
      firstName: name.firstName,
      lastName: name.lastName,
    },
    email,
  })

  if (newUserDetails) {
    const { role, password } = userDetails
    const newUser = await userModel.create({
      role,
      password,
      userId: newUserId,
    })
    return newUser
  }

  return undefined
}
