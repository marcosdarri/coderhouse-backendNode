import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { getJSONFromFile, saveJSONToFile } from "../utils.js";

const router = Router();

const path = "./src/products.json";

let products = [];

getJSONFromFile(path, (error, data) => {
  if (error) {
    console.error(
      "Error al obtener JSON desde el archivo de productos:",
      error
    );
  } else {
    products = data;
  }
});

router.get("/products", (req, res) => {
  const { limit } = req.query;

  if (limit && limit < products.length) {
    res.status(200).json(products.slice(0, limit));
  } else {
    res.status(200).json(products);
  }
});

router.get("/products/:productId", (req, res) => {
  const { productId } = req.params;
  const product = products.find((p) => p.id === productId);
  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado!" });
  }
  res.status(200).json(product);
});

router.post("/products", (req, res) => {
  const body = req.body;

  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  } = body;

  if (!title) {
    return res.status(400).json({ message: "El titulo es requerido!" });
  }
  if (!description) {
    return res.status(400).json({ message: "La descripcion es requerida!" });
  }
  if (!code) {
    return res.status(400).json({ message: "El codigo es requerido!" });
  }
  if (!price) {
    return res.status(400).json({ message: "El precio es requerido!" });
  }
  if (!status) {
    return res.status(400).json({ message: "El status es requerido!" });
  }
  if (!stock) {
    return res.status(400).json({ message: "El stock es requerido!" });
  }
  if (!category) {
    return res.status(400).json({ message: "La categoria es requerida!" });
  }

  const newProduct = {
    id: uuidv4(),
    title: title,
    description: description,
    code: code,
    price: price,
    status: status,
    stock: stock,
    category: category,
    thumbnails: thumbnails,
  };

  products.push(newProduct);

  saveJSONToFile("./src/products.json", products);

  res.status(201).json(newProduct);
});

router.put("/products/:productId", (req, res) => {
  const body = req.body;
  const { productId } = req.params;
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  } = body;

  const product = products.find((p) => p.id === productId);
  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado!" });
  }
  if (title) {
    product.title = title;
  }
  if (description) {
    product.description = description;
  }
  if (code) {
    product.code = code;
  }
  if (price) {
    product.price = price;
  }
  if (status) {
    product.status = status;
  }
  if (stock) {
    product.stock = stock;
  }
  if (category) {
    product.category = category;
  }
  if (thumbnails) {
    product.thumbnails = thumbnails;
  }

  saveJSONToFile("./src/products.json", products);

  res.status(200).json({ message: "Producto actualizado correctamente!" });
});

router.delete("/products/:productId", (req, res) => {
  const { productId } = req.params;

  const product = products.find((p) => p.id === productId);
  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado!" });
  }

  products = products.filter((p) => p.id !== productId);

  saveJSONToFile("./src/products.json", products);

  res.status(200).json({ message: "Producto eliminado correctamente!" });
});

export default router;
