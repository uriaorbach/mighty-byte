import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import urlRoutes from "./routes/urlRoutes.js";
import { initializeWebSocketServer } from "./websocketServer.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", urlRoutes);

const server = http.createServer(app);
initializeWebSocketServer(server);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
