import { useCookies } from "@vueuse/integrations/useCookies"
import { v4 as uuid } from "uuid"

export default () => {
  const { get, set } = useCookies(["mahjongio-player-id"])

  let playerId = get("mahjongio-player-id")

  if (!playerId) {
    playerId = uuid()
    set("mahjongio-player-id", playerId, { maxAge: 60 * 60 * 24 }) // 1 day
  }

  return { playerId }
}
