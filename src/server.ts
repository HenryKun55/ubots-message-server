import cors from "cors";
import express from "express";
import { messageRouter } from "./routes/message.route";
import { faker } from '@faker-js/faker';

import { Server } from "http";
import { Server as IOServer } from "socket.io";

const app = express();
const PORT = 3000;
const http = new Server(app);
const io = new IOServer(http, {
  cors: {
    origin: "*"
  }
});

app.use(cors());
app.use(express.json())
app.use('/messages', messageRouter)

const socketIds: any[] = []

io.on("connect", (socket) => {
  console.log("A user connected: " + socket.id);
  socketIds.push({
    id: socket.id,
    name: faker.person.fullName(),
    avatar: faker.image.avatar()
  })

  io.emit('users', socketIds)

  socket.on('disconnect', function() {
    console.log("A user disconnected: " + socket.id);
    socketIds.splice(socketIds.findIndex(({ id }) => id === socket.id), 1);
    io.emit('users', socketIds)
  });
});

http.listen(PORT, () => console.log(`Server listening on ${PORT}`));

export { http, io };
