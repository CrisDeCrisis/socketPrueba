import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server as SocketServer } from 'socket.io';
import { socketConnection } from './sockets/chat.js';

// Inicializaciones
const app = express();
const server = createServer(app);
const io = new SocketServer(server, {
    cors: {
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    },
});

// Configuración del puerto
const PORT = process.env.PORT ?? 4000;

// Middlewares para el manejo de solicitudes HTTP
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
app.use(
    cors({
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    })
);

// Ruta principal para verificar el estado del servidor
app.get('/', (_req, res) => {
    res.send('Hello World');
});

// Manejo de conexiones WebSocket
socketConnection(io);

// Iniciar el servidor
server.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT} 🚀`);
});