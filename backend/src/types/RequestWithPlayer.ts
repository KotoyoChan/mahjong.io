import { Request } from 'express'

export type RequestWithPlayer = Request & {
  player?: {
    id: string
  }
}
