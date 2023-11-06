import { Router } from "express";
import ProductManager from "../../dao/ProductManager.js";
import { uploader } from "../../utils.js";

const router = Router();

const URL_BASE = "http://localhost:8080/api/products";

router.get("/products", async (req, res) => {
  const { query = {} } = req;
  const products = await ProductManager.get(query);
  res.status(200).json(products);
});

router.get("/products/:pid", async (req, res) => {
  try {
    const {
      params: { pid },
    } = req;
    const product = await ProductManager.getById(pid);
    res.status(200).json(product);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

router.post("/products", uploader.single("thumbnail"), async (req, res) => {
  const { body, file } = req;
  const newProduct = { ...body };
  if (file) {
    newProduct.thumbnail = `${URL_BASE}/${file.filename}`;
  }
  const product = await ProductManager.create(newProduct);
  res.status(201).json(product);
});

router.put("/products/:pid", async (req, res) => {
  try {
    const {
      params: { pid },
      body,
    } = req;
    await ProductManager.updateById(pid, body);
    res.status(204).end();
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

router.delete("/products/:pid", async (req, res) => {
  try {
    const {
      params: { pid },
    } = req;
    await ProductManager.deleteById(pid);
    res.status(204).end();
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

export default router;
