import { Router } from "express";
import ProductManager from "../../dao/ProductManager.js";

const router = Router();

router.get("/products", async (req, res) => {
  const products = await ProductManager.get();
  res.render("products", { products });
});

export default router;