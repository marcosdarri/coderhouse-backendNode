import express from "express";
import cors from "cors";
import path from "path";
import passport from "passport";
import homerouter from "./routers/homeRouter.js";
import productsRouter from "./routers/products.router.js";
import cartsRouter from "./routers/carts.router.js";
import { __dirname } from "./utils.js";
import productsApiRouter from "./routers/api/products.router.js";
import cartsApiRouter from "./routers/api/carts.router.js";
import sessionApiRouter from "./routers/api/sessions.router.js";
import { init as initPassportConfig } from "./config/passport.config.js";
import expressSession from "express-session";
import MongoStore from "connect-mongo";
import { URI } from "./db/mongodb.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const SESSION_SECRET = process.env.SESSION_SECRET;
const COOKIE_SECRET = process.env.COOKIE_SECRET;

app.use(cookieParser(COOKIE_SECRET));
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

// Habilitar CORS
app.use(cors());

// Configurar CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Reemplaza con tu propio dominio
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

initPassportConfig();

app.use(passport.initialize());
app.use(passport.session());

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
