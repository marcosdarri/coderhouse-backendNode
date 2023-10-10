import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { getJSONFromFile, saveJSONToFile } from "./../utils.js";

const router = Router();

const path = "./src/carts.json";

let carts = [];

getJSONFromFile(path, (error, data) => {
  if (error) {
    console.error('Error al obtener JSON desde el archivo de carts:', error);
  } else {
    carts = data;
  }
});

//Creates a new cart
router.post("/carts", (req, res) => {
  const body = req.body;

  console.log("body", body);

  const { products } = body;

  if (!products) {
    return res
      .status(400)
      .json({ message: "Debes agregar un producto al carrito!" });
  }

  const newCart = {
    id: uuidv4(),
    products: products,
  };

  carts.push(newCart);

  saveJSONToFile(path, products);

  res.status(201).json(newCart);
});

//Returns an existing cart
router.get("/carts/:cid", (req, res) => {
  const { cid } = req.params;
  const cart = carts.find((c) => c.id === cid);
  if (!cart) {
    return res.status(404).json({ message: "Carrito no encontrado!" });
  }
  res.status(200).json(cart.products);
});

//Adds one product to an existing cart
router.post("/carts/:cid/products/:pid", (req, res) => {
  const { cid, pid } = req.params;

  const cart = carts.find((c) => c.id === cid);

  if (!cart) {
    return res.status(404).json({ message: "Carrito no encontrado!" });
  }

  const product = cart.products.find((p) => p.id === pid);

  if (!product) {
    cart.products.push({
      id: pid,
      quantity: 1,
    });
  } else {
    product.quantity += 1;
  }

  saveJSONToFile(path, products);

  res.status(201).json(cart);
});

export default router;
