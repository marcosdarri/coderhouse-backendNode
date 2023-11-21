import { Router } from "express";
import UserModel from "../../dao/models/user.model.js";
import passport from "passport";
import { createHash } from "../../utils.js";

const router = Router();

router.post(
  "/sessions/register",
  passport.authenticate("register", { failureRedirect: "/register" }),
  (req, res) => {
    res.redirect("/login");
  }
);

router.post(
  "/sessions/login",
  passport.authenticate("login", { failureRedirect: "/login" }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/products");
  }
);

router.get("/sessions/logout", (req, res) => {
  req.session.destroy((error) => {
    res.redirect("/login");
  });
});

router.post("/sessions/recovery-password", async (req, res) => {
  const { email, newPassword } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(401).send("Correo o contraseña invalidos 😨.");
  }
  await UserModel.updateOne(
    { email },
    { $set: { password: createHash(newPassword) } }
  );
  res.redirect("/login");
});

export default router;
