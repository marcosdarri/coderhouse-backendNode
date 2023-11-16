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

router.get("/products", privateRouter, (req, res) => {
  try {
    res.render("products", { title: "Products", user: req.session.user });
  } catch (error) {
    throw new Exception("User information was not found");
  }
});

router.get("/login", publicRouters, (req, res) => {
  res.render("login", { title: "Login" });
});

router.get("/register", publicRouters, (req, res) => {
  res.render("register", { title: "Register" });
});

export default router;
