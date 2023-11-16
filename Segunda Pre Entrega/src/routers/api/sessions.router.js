import { Router } from "express";
import UserModel from "../../dao/models/user.model.js";

const router = Router();

router.post("/sessions/register", async (req, res) => {
  const { body } = req;
  if (
    body.email == "adminCoder@coder.com" &&
    body.password == "adminCod3r123"
  ) {
    body.role = "admin";
  } else {
    body.role = "user";
  }
  const newUser = await UserModel.create(body);
  res.redirect("/login");
});

router.post("/sessions/login", async (req, res) => {
  const {
    body: { email, password },
  } = req;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(401).send("Correo o contraseña invalidos 😨.");
  }
  const isPassValid = user.password === password;
  if (!isPassValid) {
    return res.status(401).send("Correo o contraseña invalidos 😨.");
  }
  const { first_name, last_name } = user;
  req.session.user = { first_name, last_name, email };
  res.redirect("/products");
});

router.get("/sessions/logout", (req, res) => {
  req.session.destroy((error) => {
    res.redirect("/login");
  });
});

export default router;
