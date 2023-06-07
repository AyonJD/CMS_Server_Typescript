import express from 'express'
import { CREATE_USER } from '../../utils/routes'
import { LOGIN_URL } from '../../utils/routes'
import { LOGGED_IN_USER } from '../../utils/routes'
import { UserController } from './user.controller'

const router = express.Router()

router.post(CREATE_USER, UserController.createUser)
router.post(LOGIN_URL, UserController.loginUser)
router.get(LOGGED_IN_USER, UserController.loggedInUser)

export const UserRoute = router
