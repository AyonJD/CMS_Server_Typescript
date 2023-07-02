import { IUser } from '../user/user.interface'

// For login------------
export interface ILoginUser {
  userId?: string
  email?: string
  password: string
}

// For sending response-------------
export interface IUserResponse {
  accessToken: string
  data: Partial<IUser>
}

// For jwt payload-------------
export interface IJwtPayload {
  userId: string
  email?: string
}
