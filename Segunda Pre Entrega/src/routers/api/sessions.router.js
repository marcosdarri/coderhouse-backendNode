import { Router } from "express";
import UserModel from "../../dao/models/user.model.js";
import passport from "passport";
import { createHash } from "../../utils.js";

const router = Router();

router.post(
  "/sessions/register",
  (req, res, next) => {
    // Middleware para modificar el rol antes de la autenticación
    if (
      req.body.password === "adminCod3r123" &&
      req.body.email === "adminCoder@coder.com"
    ) {
      req.body.role = "admin";
    }
    // Llama al siguiente middleware (en este caso, passport.authenticate)
    next();
  },
  passport.authenticate("register", { failureRedirect: "/register" }),
  (req, res) => {
    // Este bloque de código se ejecutará después de la autenticación
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

router.get(
  "/sessions/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/sessions/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/products");
  }
);

export default router;
