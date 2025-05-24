import express from 'express';
import http from 'http';
import {Server} from "socket.io";
import type {Socket} from "socket.io";

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


const messages = [
    {message: "Hello", id: "12312eadsawr", user: {id: "123edasasd", name: "Pawel"}},
    {message: "Hello", id: "1231asdcx2eadzxsawr", user: {id: "123123edasasdq2asd", name: "Vika"}}
]

const users = new Map()


io.on('connection', (socket: Socket) => {
    users.set(socket, {name: {id: new Date().getTime().toString(), name: 'anonym'}});

    socket.on('disconnect', () => {
        users.delete(socket);
    })

    socket.on("client-name-send", (name: string) => {
        if(typeof name !== "string" || name.trim().length === 0 ) {
            return
        }
        const user = users.get(socket)
        user.name = name
    })

    socket.on('client-message-sent', (message: string) => {
        if (typeof message !== 'string') {
            return
        }

        const user = users.get(socket)

        let messageItem = {
            message, id: '123412' + new Date().getTime(), user: {id: user.id, name: user.name}
        }
        messages.push(messageItem)


        io.emit("new-message-sent", messageItem);

    });
    socket.emit('init-messages-published', messages)
});

const PORT = process.env.PORT || 3009;
server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});