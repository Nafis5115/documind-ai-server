import express from "express";
import { getAiAnswer } from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/ai-reply", getAiAnswer);

export default router;
