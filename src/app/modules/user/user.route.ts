import express from 'express'
import { createUser } from './user.controller'
import { CREATE_USER } from '../../utils/routes'

const router = express.Router()

router.post(CREATE_USER, createUser)

export default router
