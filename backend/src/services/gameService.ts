import redis from '@config/redis.js'
import { v4 as uuid } from 'uuid'

const GAME_PREFIX = 'game:'

export const createGame = async (gameName: string, gamePassword: string, playerId: string): Promise<string> => {
  const gameId = uuid()
  const gameKey = `${GAME_PREFIX}:${gameId}`

  await redis.hset(`${gameKey}:metadata`, {
    name: gameName,
    password: gamePassword,
    created_at: new Date().toISOString(),
    created_by: playerId
  })

  return gameId
}
