import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { playerMiddleware } from './middleware/playerMiddleware.js'
import gameRoutes from './routes/gameRoutes.js'

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // change for production
    credentials: true // allow cookies to be sent with requests
  }
})

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: 'http://localhost:5173', // change for production
    credentials: true // allow cookies to be sent with requests
  })
)

app.use('/api/', gameRoutes)

const PORT = process.env.PORT || 3000

io.on('connection', (socket) => {
  console.log('A user connected')

  socket.on('disconnect', () => {
    console.log('A user disconnected')
  })
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
