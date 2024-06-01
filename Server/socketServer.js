// socketServer.js
const Server = require('socket.io');

let totalConnections = 0; // Инициализируем счетчик подключений

function setupSocketServer(server) {
  const io = Server(server, {
    cors: { origin: 'http://localhost:3001', credentials: true },
    // Удаление connectionStateRecovery, если это не пользовательская опция вашей версии Socket.IO.
  });
  
  io.on('connection', (socket) => {
    totalConnections++; // Увеличиваем счетчик при каждом новом подключении
    // console.log(`a user connected with id: ${socket.id}, total connections: ${totalConnections}`); // Логгируем с новым подключением и общим количеством

    socket.on('disconnect', () => {
      totalConnections--; // Уменьшаем счетчик при отключении
      // console.log(`a user disconnected with id: ${socket.id}, total connections: ${totalConnections}`); // Логгируем при отключении и общем количестве
    });
  });

  return io;
}

module.exports = { setupSocketServer };
