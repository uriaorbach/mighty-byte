import { getServerBaseURL, generateRandomBytes } from "./helpers.js";

const urlShortenerMap = {};

const isAlreadyMapped = function (shortURL) {
  return Object.values(urlShortenerMap).includes(shortURL);
};

const generateShortURL = function (originalURL, req) {
  const serverBaseURL = getServerBaseURL(req);
  let shortURL;
  let fullShortenedURL;

  if (urlShortenerMap[originalURL]) {
    return urlShortenerMap[originalURL];
  }

  do {
    shortURL = generateRandomBytes();
    fullShortenedURL = `${serverBaseURL}/${shortURL}`;
  } while (isAlreadyMapped(fullShortenedURL));

  urlShortenerMap[originalURL] = fullShortenedURL;
  return fullShortenedURL;
};

export { generateShortURL, urlShortenerMap };
