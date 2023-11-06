import { Router } from "express";
import MessageManager from "../../dao/MessageManager.js";

const router = Router();

const URL_BASE = "http://localhost:8080/api/messages";

router.get("/messages", async (req, res) => {
  const { query = {} } = req;
  const messages = await MessageManager.get(query);
  res.status(200).json(messages);
});

router.post("/messages", async (req, res) => {
  const { body } = req;
  const newMessage = { ...body };
  console.log("newMessage", body);
  if (Object.keys(newMessage).length === 0) {
    res.status(400).json({ message: "No message provided" });
    return;
  }
  const message = await MessageManager.create(newMessage);
  res.status(201).json(message);
});

export default router;
