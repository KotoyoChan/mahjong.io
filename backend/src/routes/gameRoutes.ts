import { Router } from 'express'
import { createGame } from '@controllers/gameController.js'
import { playerMiddleware } from '@src/middleware/playerMiddleware.js'

const router = Router()

router.post('/create', playerMiddleware, createGame)

export default router
