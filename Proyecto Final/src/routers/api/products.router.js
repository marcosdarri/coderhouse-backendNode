import { Router } from "express";
import ProductsController from "../../controllers/products.controller.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    let result = await ProductsController.get();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;

  try {
    const product = await ProductsController.getById(pid);
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
    await ProductsController.addProduct(productData);
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
    await ProductsController.updateById(pid, { ...req.body });
    res.status(201).json("Product updated successfully.");
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;

  try {
    await ProductsController.deleteById(pid);
    res.status(201).send(`Product with id "${pid}" deleted successfully.`);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
});

export default router;
