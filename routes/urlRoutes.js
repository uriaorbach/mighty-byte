import express from "express";
import { urlShortenerMiddleware } from "../middlewares/urlShortenerMiddleware.js";
import {
  handlePostURL,
  handleGetURL,
} from "../controllers/urlShortenerController.js";

const router = express.Router();

router.post("/url", urlShortenerMiddleware, handlePostURL);

router.get("/:shortURL", handleGetURL);

export default router;
