import express from "express";
import handlebars from "express-handlebars";
import path from "path";
import homerouter from "./routers/homeRouter.js";
import productsRouter from "./routers/products.router.js";
import cartsRouter from "./routers/carts.router.js";
import { __dirname } from "./utils.js";
import cartModel from "./dao/models/cart.model.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

app.use("/", homerouter, productsRouter);
app.use("/carts", cartsRouter);

app.use((error, req, res, next) => {
  const message = `Ah ocurrido un error desconocido 😨: ${error.message}`;
  res.status(500).json({ status: "error", message });
});

export default app;

//Probar con este ejemplo:
//Products
//http://localhost:8080/products?limit=4&page=1&category=Ropa
//Carts
//http://localhost:8080/carts/654d5722dc08fa0b96f62bd9
//http://localhost:8080/products?limit=4&page=1&category=Ropa&stock=999
