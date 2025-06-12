import { Response, NextFunction } from 'express'
import { RequestWithPlayer } from '../types/RequestWithPlayer.js'

export const playerMiddleware = (req: RequestWithPlayer, res: Response, next: NextFunction) => {
  const playerId = req.cookies['mahjongio-player-id']

  if (!playerId) {
    res.status(400).json({ error: 'Player ID is required' })
    return
  }

  // 🔄 This line resets the cookie expiration to 24 hours from NOW
  res.cookie('mahjongio-player-id', playerId, {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours from this moment
    httpOnly: false,
    sameSite: 'lax'
  })

  req.player = { id: playerId }
  next()
}
