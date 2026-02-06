import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

// Connection Event
wss.on("connection", (socket, request) => {
  const ip = request.socket.remoteAddress;

  socket.on("message", (rawData) => {
    const message = rawData.toString();
    console.log({ rawData });

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN)
        client.send(`Sever Broadcast: ${message}`);
    });
  });

  socket.on("error", (error) => {
    console.error(`Error: ${error.message}: ${ip}`);
  });

  socket.on("close", () => {
    console.log(`Client disconnected: ${ip}`);
  });
});

console.log("WebSocket Server is live at ws://localhost:8080");
