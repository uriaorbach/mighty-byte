import { WebSocketServer } from "ws";
import { nanoid } from "nanoid";

const clients = {};
let pendingMessages = {};

const initializeWebSocketServer = function (server) {
  // Create WebSocket server attached to the HTTP server
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws, req) => {
    const urlParams = new URLSearchParams(req.url.split("?")[1]);
    const clientID = urlParams.get("clientID") || nanoid(); //extract existing ID or generate one
    clients[clientID] = ws;

    if (pendingMessages[clientID]) {
      ws.send(
        JSON.stringify({ type: "pending", messages: pendingMessages[clientID] })
      );
    }

    ws.send(JSON.stringify({ clientID }));

    ws.on("message", (msg) => {
      try {
        const parsedMsg = JSON.parse(msg);
        if (parsedMsg.type === "shortUrlAcknowledge") {
          if (pendingMessages[clientID]) {
            delete pendingMessages[clientID];
          }
        }
      } catch (e) {
        console.error(`something went wrong ${e}`);
      }
    });

    ws.on("close", () => {
      delete clients[clientID];
      console.log("Client disconnected");
    });
  });
};

export { initializeWebSocketServer, clients, pendingMessages };
