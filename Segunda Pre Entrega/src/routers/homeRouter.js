import { Router } from "express";
import { Exception } from "../utils.js";

const router = Router();

const privateRouter = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
};

const publicRouters = (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/products");
  }
  next();
};

router.get("/", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/register");
  } else {
    return res.redirect("/products");
  }
});

router.get("/login", publicRouters, (req, res) => {
  res.render("login", { title: "Login" });
});

router.get("/register", publicRouters, (req, res) => {
  res.render("register", { title: "Register" });
});

router.get("/recovery-password", publicRouters, (req, res) => {
  res.render("recovery-password", { title: "Recuperar contraseña 😁" });
});

export default router;
