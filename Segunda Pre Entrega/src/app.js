import express from "express";
import handlebars from "express-handlebars";
import path from "path";
import homerouter from "./routers/homeRouter.js";
import productsRouter from "./routers/products.router.js";
import cartsRouter from "./routers/carts.router.js";
import { __dirname } from "./utils.js";
import productsApiRouter from "./routers/api/products.router.js";
import cartsApiRouter from "./routers/api/carts.router.js";
import sessionApiRouter from "./routers/api/sessions.router.js";

import expressSession from "express-session";
import MongoStore from "connect-mongo";
import { URI } from "./db/mongodb.js";

const app = express();

const SESSION_SECRET = "qBvPkU2X;J1,51Z!~2p[JW.DT|g:4l@";

app.use(
  expressSession({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: URI,
      mongoOptions: {},
      ttl: 3600,
    }),
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

app.use("/", homerouter);
app.use("/products", productsRouter);
app.use("/carts", cartsRouter);

app.use("/api/products", productsApiRouter);
app.use("/api/carts", cartsApiRouter);
app.use("/api", sessionApiRouter);

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
