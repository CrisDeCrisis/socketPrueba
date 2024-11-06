const prevMessages = [];

export const socketConnection = (io) => {
    io.on('connection', (socket) => {
        console.log('New connection!', socket.id);

        // Enviar mensajes previos al nuevo cliente
        socket.emit('get-message', prevMessages);

        // Manejo de desconexión de clientes
        socket.on('disconnect', () => {
            console.log('User disconnected!');
        });

        // Manejo de nuevos mensajes recibidos
        socket.on('new-message', (newMessage) => {
            prevMessages.push(newMessage);
            io.sockets.emit('new-message', prevMessages);
        });
    });
};