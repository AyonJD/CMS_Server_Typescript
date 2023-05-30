import { Model } from 'mongoose'

export interface IUser {
  id: string
  role: string
  password: string
  userId: string // Referance
}

// For using static methods in model:
export interface IUserModel extends Model<IUser> {
  findUserById(id: string): Promise<IUser>
}
