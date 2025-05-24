import express from 'express';
import http from 'http';
import { Server } from "socket.io";
import type { Socket } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

app.get('/', (req, res) => {
    res.send("Hello it's WS server ");
});

io.on('connection', (socket: Socket) => {
    console.log('🟢 New user connected:', socket.id);

    socket.emit('newMessage', {
        message: 'Добро пожаловать!',
        id: socket.id,
        user: { id: 'server', name: 'Server' }
    });
});

const PORT = process.env.PORT || 3009;
server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});