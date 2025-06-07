import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // change for production
  },
});

const PORT = process.env.PORT || 3000;

app.route("/").get((req, res) => {
  res.send("Hello, World!");
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
