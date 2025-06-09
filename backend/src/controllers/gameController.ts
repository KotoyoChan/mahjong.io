import { Response } from 'express'
import { RequestWithPlayer } from '@src/types/RequestWithPlayer.js'
import * as gameService from '@services/gameService.js'

export async function createGame(req: RequestWithPlayer, res: Response): Promise<void> {
  try {
    const { gameName, gamePassword } = req.body

    if (!req.player) {
      res.status(401).json({ error: 'Player ID required' })
      return
    }

    const gameId = await gameService.createGame(gameName, gamePassword, req.player.id)
    res.status(201).json({ gameId })
  } catch (error) {
    console.error('Error creating game:', error)
    res.status(500).json({ error: 'Failed to create game' })
  }
}
