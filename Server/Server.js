//Server.js
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const { setupSocketServer } = require("./socketServer");
const { createServer } = require("http");

require("dotenv").config();
// Mongoo подключение
require("./helpers/db/mongodb.js")();

// настройка портов
const port = process.env.PORT;
const { extractSocketId } = require("./middleware/extractSocketId");
const { authenticate } = require("./middleware/authMiddleware");

const app = express();
const server = createServer(app);
const io = setupSocketServer(server);
app.use(cookieParser());


app.use(cors({ origin: "http://localhost:3001", credentials: true }));
app.use(express.json());

app.set("view engine", "html");
module.exports.getIO = function(){
  return io;
}
// Статическая папка
// app.use(express.static(__dirname + "/views/"));
app.options("*", cors());
// Роуты
app.use("/api/events", authenticate, require("./routes/eventRoutes"));
app.use("/api/mail", extractSocketId, authenticate, require("./routes/mailRoutes"));
app.use("/api/user", authenticate, require("./routes/userRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/board", extractSocketId, authenticate, require("./routes/boardRoutes.js"));
app.use("/api/structure", authenticate, require("./routes/structureRoutes.js"));
app.use("/api/privilege", authenticate, require("./routes/privilegeRoutes.js"));

server.listen(3000, () => {
  console.log(`server running at http://localhost:${port}/api`);
});

module.exports = app;