import express from 'express'
const router = express.Router()
import { LoginUser, RegisterUser, LogoutUser, updateUser, getMe } from '../controller/Auth.controller.js'
import protectRoutes from '../mw/protectRoutes.js'

router.post('/register', RegisterUser)
router.post('/login', LoginUser)
router.post('/update', protectRoutes, updateUser)
router.get('/logout', LogoutUser)
router.get('/me', protectRoutes, getMe)

export default router