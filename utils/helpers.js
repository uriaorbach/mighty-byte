import { customAlphabet } from "nanoid";

const getServerBaseURL = function (req) {
  const protocol = req.protocol;
  const host = req.get("host");
  return `${protocol}://${host}`;
};

const generateRandomBytes = function () {
  const alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const nanoidWithCustomAlphabet = customAlphabet(alphabet, 10);
  return nanoidWithCustomAlphabet();
};

export { generateRandomBytes, getServerBaseURL };
