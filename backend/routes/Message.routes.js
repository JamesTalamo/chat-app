import protectRoutes from '../mw/protectRoutes.js'
import express from 'express'
const router = express.Router()

import { usersForSidebar, getMesseges, sendMessage } from '../controller/Messages.controller.js'



router.get('/users', protectRoutes, usersForSidebar)
router.get('/:id', protectRoutes, getMesseges)

router.post('/send/:id', protectRoutes, sendMessage)

export default router