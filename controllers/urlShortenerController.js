import { clients, pendingMessages } from "../websocketServer.js";
import { urlShortenerMap } from "../utils/urlGenerator.js";

const handlePostURL = function (req, res) {
  const clientID = req.body.clientID;
  const shortenedURL = req.shortenedURL;
  const clientSocket = clients[clientID];
  pendingMessages[clientID] = req.shortenedURL;

  if (clientSocket) {
    clientSocket.send(JSON.stringify({ shortenedURL }));
    res.status(200).send({ message: "Shortened URL sent via WebSocket." });
  } else {
    res.status(500).send("Client WebSocket not found");
  }
};

const handleGetURL = function (req, res) {
  const shortURL = req.params.shortURL;

  // Find the key (original URL) by searching the map's values
  const originalURL = Object.keys(urlShortenerMap).find((key) =>
    urlShortenerMap[key].endsWith(shortURL)
  );
  if (!originalURL) {
    return res.status(404).send({ error: "Short URL not found" });
  }
  const urlAsJson = JSON.stringify({ url: originalURL });
  res.status(200).send(urlAsJson);
};

export { handlePostURL, handleGetURL };
