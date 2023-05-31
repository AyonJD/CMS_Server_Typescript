import express from 'express'
import { createUser, loginUser } from './user.controller'
import { CREATE_USER } from '../../utils/routes'
import { LOGIN_URL } from '../../utils/routes'

const router = express.Router()

router.post(CREATE_USER, createUser)
router.post(LOGIN_URL, loginUser)

export default router
