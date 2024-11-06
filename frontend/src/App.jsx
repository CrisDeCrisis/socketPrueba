import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

// Conectar al servidor de Socket.IO
const socket = io('http://localhost:4000');

const App = () => {
  // Estado para almacenar los mensajes
  const [messages, setMessages] = useState([]);

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const message = formData.get('message');

    // Enviar el nuevo mensaje al servidor
    socket.emit('new-message', message);

    // Resetear el formulario
    e.target.reset();
  };

  // Efecto para manejar la conexión al servidor
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    // Limpiar el efecto al desmontar el componente
    return () => {
      socket.disconnect();
    };
  }, []);

  // Efecto para manejar la recepción de nuevos mensajes
  useEffect(() => {
    socket.on('new-message', (newMessages) => {
      setMessages(newMessages);
    });

    socket.on('get-message', (newMessages) => {
      setMessages(newMessages);
    });

    // Limpiar el efecto al desmontar el componente
    return () => {
      socket.off('new-message');
      socket.off('get-message');
    };
  }, []);

  return (
    <section className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
      <article className="bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-md">
        <ul className="mb-4">
          {/* Mostrar la lista de mensajes */}
          {messages.map((message, index) => (
            <li key={index} className="bg-gray-700 p-2 rounded mb-2">
              {message}
            </li>
          ))}
        </ul>
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            name="message"
            className="flex-1 p-2 rounded-l-lg bg-gray-700 text-white focus:outline-none"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 rounded-r-lg hover:bg-blue-700 focus:outline-none"
          >
            Send
          </button>
        </form>
      </article>
    </section>
  );
};

export default App;