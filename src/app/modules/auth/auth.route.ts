import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { UserValidation } from '../user/user.validation'
import { AuthController } from './auth.controller'

const router = express.Router()

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  validateRequest(UserValidation.createUserDetailsZodSchema),
  AuthController.signupUser
)
router.post(
  '/login-user',
  validateRequest(UserValidation.loginUserZodSchema),
  AuthController.loginUser
)
router.get('/me', AuthController.loggedInUser)

export const AuthRoute = router
