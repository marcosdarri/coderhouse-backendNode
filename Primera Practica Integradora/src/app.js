import express from "express";
import handlebars from "express-handlebars";
import path from "path";

import homeRouter from "./routers/home.router.js";
import productsApiRouter from "./routers/api/products.router.js";
import productsViewRouter from "./routers/views/products.router.js";

import messagesApiRouter from "./routers/api/messages.router.js";
import messagesViewRouter from "./routers/views/messages.router.js";

import { __dirname } from "./utils.js";

const app = express();

/* const PORT = 8080; */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.use("/", homeRouter, messagesViewRouter, productsViewRouter);
app.use("/api", messagesApiRouter);
app.use("/api", productsApiRouter);

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

app.use((error, req, res, next) => {
  const message = `😨 Ah ocurrido un error desconocido: ${error.message}`;
  console.log(message);
  res.status(500).json({ status: "error", message });
});

export default app;
