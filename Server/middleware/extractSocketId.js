exports.extractSocketId = (req, res, next) => {
    // Пример получения socketId от клиента, предполагается, что клиент отправит его в каком-то заголовке, например `X-Socket-ID`.
    const socketId = req.headers['x-socket-id'];
    if (socketId) {
        req.socketId = socketId;
    } else {
        return res.status(400).json({ message: 'Socket ID is missing from the request' });
    }
    next();
  };