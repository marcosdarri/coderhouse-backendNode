import { Router } from "express";
import CartManager from "../dao/CartManager.js";

const router = Router();

router.get("/carts", async (req, res) => {
  const carts = await CartManager.get();
  res.render("carts", { carts });
});

router.get("/carts/:cid", async (req, res) => {
  const cid = req.params.cid;
  const carts = await CartManager.getById(cid);
  console.log(carts);
  res.render("carts", { carts });
});

export default router;
