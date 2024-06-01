// middleware/updatesSubscribe.js
exports.emitUpdateToOthers = (event, message) => (socketServer) => (req, res, next) => {
    const sendUpdateToOthers = async () => {
      try {
        const senderSocketId = req.socketId; // Assuming socketId is added to the request
  
        const sockets = await socketServer.fetchSockets();
        for (const socket of sockets) {
            if (socket.id !== senderSocketId) { // Filter out the sender's socket
                await socket.emit(event, { message });
            }
        }
        next();
      } catch (error) {
        res.status(500).json({ message: `Error in ${event}: ${error.message}`, valid: false });
      }
    }
    sendUpdateToOthers();
  };
  