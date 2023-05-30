import express from 'express'
import { createUser } from './user.controller'

const router = express.Router()

router.post('/create_user', createUser)

export default router
