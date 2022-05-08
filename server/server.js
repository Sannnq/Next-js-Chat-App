const Socket= require("socket.io");
const server = require("http").createServer();

const io = require("socket.io")(server, {
  cors: {
    origin: "",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log("Utilisateur connecté");
  socket.on('channel',(data)=>{
    io.emit('message', data)
  })
});
server.listen(3000);
