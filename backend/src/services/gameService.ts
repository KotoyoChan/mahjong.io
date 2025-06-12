import redis from '@config/redis.js'
import { v4 as uuid } from 'uuid'

const GAME_PREFIX = 'game'

type CreateGameParams = {
  gameName: string
  gamePassword: string
  playerId: string
  playerNickname: string
}

type JoinGameParams = {
  gameName: string
  gamePassword: string
  playerId: string
  playerNickname: string
}

export const createGame = async ({ gameName, gamePassword, playerId, playerNickname }: CreateGameParams): Promise<string> => {
  const gameId = uuid()
  const TTL = 24 * 60 * 60 // 24 hours

  await Promise.all([
    redis.setex(`player:${playerId}:nickname`, TTL, playerNickname),
    redis.lpush(`${GAME_PREFIX}:${gameId}:players`, playerId).then(() => redis.expire(`${GAME_PREFIX}:${gameId}:players`, TTL)),
    redis
      .hset(`${GAME_PREFIX}:${gameId}:metadata`, {
        name: gameName,
        password: gamePassword,
        created_at: new Date().toISOString(),
        created_by: playerId
      })
      .then(() => redis.expire(`${GAME_PREFIX}:${gameId}:metadata`, TTL))
  ])

  return gameId
}
