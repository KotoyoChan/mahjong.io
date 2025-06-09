import { Response, NextFunction } from 'express'
import { RequestWithPlayer } from '../types/RequestWithPlayer.js'

export const playerMiddleware = (req: RequestWithPlayer, res: Response, next: NextFunction) => {
  const playerId = req.cookies['mahjongio-player-id']

  console.log('playerId', playerId)

  if (!playerId) {
    res.status(400).json({ error: 'Player ID is required' })
    return
  }

  req.player = { id: playerId }
  next()
}
