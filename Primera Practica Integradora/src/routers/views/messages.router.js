import { Router } from "express";
import MessageManager from "../../dao/MessageManager.js";

const router = Router();

router.get("/messages", async (req, res) => {
  let messages = await MessageManager.get();
  messages = messages.reverse();
  res.render("messages", { messages });
});

export default router;
