import { WebSocketServer } from "ws";
import { config } from "./config";

// Create a WebSocket Server
const wss = new WebSocketServer({ port: config.port });

console.log(`✅ WebSocket server running on ws://localhost:${config.port}`);

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    console.log(`Received: ${message}`);

    // Handle LED control commands
    switch (message.toString()) {
      case "LED_LEFT_ON":
        console.log("Turning Left LED ON");
        break;
      case "LED_LEFT_OFF":
        console.log("Turning Left LED OFF");
        break;
      case "LED_RIGHT_ON":
        console.log("Turning Right LED ON");
        break;
      case "LED_RIGHT_OFF":
        console.log("Turning Right LED OFF");
        break;
      default:
        console.log("Unknown Command");
    }

    // Broadcast received message to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on("close", () => console.log("Client Disconnected"));
});
