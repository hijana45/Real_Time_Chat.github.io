// --- server/server.js ---
const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("🟢 New client connected");

  ws.on("message", (message) => {
    console.log("📩 Received:", message.toString());
    // broadcast message to everyone
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on("close", () => console.log("🔴 Client disconnected"));
});

const PORT = 8080;
server.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
