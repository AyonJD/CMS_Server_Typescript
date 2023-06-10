import express from 'express'
import { CREATE_USER } from '../../utils/routes'
import { LOGIN_URL } from '../../utils/routes'
import { LOGGED_IN_USER } from '../../utils/routes'
import { UserController } from './user.controller'
import validateRequest from '../../middlewares/validateRequest'
import { UserValidation } from './user.validation'

const router = express.Router()

router.post(
  CREATE_USER,
  validateRequest(UserValidation.createUserZodSchema),
  validateRequest(UserValidation.createUserDetailsZodSchema),
  UserController.createUser
)
router.post(
  LOGIN_URL,
  validateRequest(UserValidation.loginUserZodSchema),
  UserController.loginUser
)
router.get(LOGGED_IN_USER, UserController.loggedInUser)

export const UserRoute = router
