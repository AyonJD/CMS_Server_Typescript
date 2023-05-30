import { userModel } from './user.model'

export const getIncrementedUserId = async (role: string): Promise<string> => {
  const lastUser = await userModel.findOne({ role }).sort({ userId: -1 }).lean()

  const lastUserId = lastUser?.userId || ''

  const match = lastUserId.match(/(\d+)$/)
  const lastNumber = match ? parseInt(match[1]) : 0
  const newNumber = lastNumber + 1
  const newId = `${role.split(' ')[0].toUpperCase()}${newNumber
    .toString()
    .padStart(4, '0')}`

  return newId
}
