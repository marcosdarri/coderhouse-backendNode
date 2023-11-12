import { Router } from "express";
import ProductManager from "../../dao/ProductManager.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    let result = await ProductManager.get();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;

  try {
    const product = await ProductManager.getById(pid);
    res.status(201).json(product);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
});

router.post("/", async (req, res) => {
  let { title, description, code, price, status, stock, thumbnail, category } =
    req.body;

  let boolStatus = status ? status.toLocaleLowerCase() == "true" : true;

  const productData = {
    title,
    description,
    code,
    price: parseFloat(price),
    status: boolStatus,
    stock: parseInt(stock),
    thumbnail: thumbnail ? thumbnail : "./thumbnail1.webp",
    category,
  };

  try {
    await ProductManager.addProduct(productData);
    res.status(201).json("Product created successfully.");
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
});

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  if (req.body.status && typeof req.body.status == "string") {
    req.body.status = req.body.status.toLocaleLowerCase() == "true";
  }

  try {
    let result = await ProductManager.updateById(pid, { ...req.body });
    res.status(201).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;

  try {
    await ProductManager.deleteById(pid);
    res.status(201).send(`Product with id "${pid}" deleted successfully.`);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
});

export default router;
