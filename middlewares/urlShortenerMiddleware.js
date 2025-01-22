import { generateShortURL } from "../utils/urlGenerator.js";

const urlShortenerMiddleware = function (req, _, next) {
  const originalURL = req.body.url;
  const fullShortenedURL = generateShortURL(originalURL, req);
  req.shortenedURL = fullShortenedURL;
  next();
};

export { urlShortenerMiddleware };
