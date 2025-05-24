import express from 'express';
import http from 'http';
import { Server } from "socket.io";
import type { Socket } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.send("Hello it's WS server ");
});

io.on('connection', (socket:Socket) => {
    console.log('a user connected');
});

server.listen(3009, () => {
    console.log('listening on *:3009');
});