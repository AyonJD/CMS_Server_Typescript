import express from 'express'
import { createUser, loggedInUser, loginUser } from './user.controller'
import { CREATE_USER } from '../../utils/routes'
import { LOGIN_URL } from '../../utils/routes'
import { LOGGED_IN_USER } from '../../utils/routes'

const router = express.Router()

router.post(CREATE_USER, createUser)
router.post(LOGIN_URL, loginUser)
router.get(LOGGED_IN_USER, loggedInUser)

export default router
