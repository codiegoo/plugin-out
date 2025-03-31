import { Server } from "socket.io";

let connections = {};

export default function handler(req, res) {
  if (!res.socket.server.io) {
    console.log("🔌 Inicializando servidor WebSocket...");

    const io = new Server(res.socket.server, {
      path: "/api/socket",
      cors: {
        origin: "*", // 👈 permite cualquier origen
        methods: ["GET", "POST"]
      }
    });
    
    io.on("connection", (socket) => {
      console.log("🟢 Cliente conectado");

      socket.on("registrar", (nombre) => {
        connections[nombre] = socket;
        console.log(`📡 Registrado: ${nombre}`);
      });

      socket.on("comando", ({ nombre, comando }) => {
        if (connections[nombre]) {
          connections[nombre].emit("comando", comando);
          console.log(`📨 Enviado a ${nombre}: ${comando}`);
        }
      });

      socket.on("disconnect", () => {
        for (const nombre in connections) {
          if (connections[nombre] === socket) {
            delete connections[nombre];
            console.log(`❌ ${nombre} desconectado`);
          }
        }
      });
    });

    res.socket.server.io = io;
    console.log("✅ Socket.IO listo");
  }

  res.end();
}
