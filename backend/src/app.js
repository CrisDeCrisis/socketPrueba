import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server as SocketServer } from 'socket.io';

// Initializations
const app = express();
const server = createServer(app);
const io = new SocketServer(server);

// Settings
const PORT = process.env.PORT ?? 4000;

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Routes
app.get('/', (_req, res) => {
    res.send('Hello World');
});

// Websockets
io.on('connection', (socket) => {
    console.log('New connection', socket.id);
    socket.on('message', (data) => {
        console.log(data);
        io.sockets.emit('message', data);
    });
});

// Starting the server
server.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT} 🚀`);
});