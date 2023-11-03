import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { getJSONFromFile, saveJSONToFile } from "../utils.js";

const router = Router();

const path = "./src/carts.json";

let carts = [];

getJSONFromFile(path, (error, data) => {
  if (error) {
    console.error("Error al obtener JSON desde el archivo de carts:", error);
  } else {
    carts = data;
  }
});

const sumProducts = (products) =>
  products.reduce((accumulator, product) => {
    const existingProduct = accumulator.find((p) => p.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      accumulator.push({ id: product.id, quantity: 1 });
    }

    return accumulator;
  }, []);

//Creates a new cart
router.post("/carts", (req, res) => {
  const body = req.body;

  console.log("body", body);

  let { products } = body;

  if (!products) {
    return res
      .status(400)
      .json({ message: "Debes agregar un producto al carrito!" });
  }

  products = sumProducts(products);

  const newCart = {
    id: uuidv4(),
    products: products,
  };

  carts.push(newCart);

  saveJSONToFile(path, carts);

  res.status(201).json(newCart);
});

//Returns an existing cart
router.get("/carts/:cid", (req, res) => {
  const { cid } = req.params;
  let cart = carts.find((c) => c.id === cid);
  if (!cart) {
    return res.status(404).json({ message: "Carrito no encontrado!" });
  }
  res.status(200).json(cart);
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

  saveJSONToFile(path, carts);

  res.status(201).json(cart);
});

export default router;
