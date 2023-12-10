import { Router } from "express";
import UsersController from "../../controllers/users.controller.js";
import passport from "passport";
import { createHash, tokenGenerator, isValidPassword } from "../../utils.js";

const router = Router();

router.post(
  "/sessions/register",
  async (req, res, next) => {
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

router.post("/sessions/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ message: "Correo o contraseña invaldos 😨" });
  }
  const user = await UsersController.getByEmail({ email });
  if (!user) {
    return res.status(401).json({ message: "Correo o contraseña invaldos 😨" });
  }
  const validPassword = isValidPassword(password, user);
  if (!validPassword) {
    return res.status(401).json({ message: "Correo o contraseña invaldos 😨" });
  }
  const token = tokenGenerator(user);
  res
    .cookie("access_token", token, {
      maxAge: 1000 * 60 * 30,
      httpOnly: true,
      signed: true,
    })
    .status(200);

  req.session.user = user;
  res.redirect("/products");
});

router.get("/sessions/logout", (req, res) => {
  req.session.destroy((error) => {
    res.redirect("/login");
  });
});

router.post("/sessions/recovery-password", async (req, res) => {
  const { email, newPassword } = req.body;
  const user = await UsersController.getByEmail({ email });
  if (!user) {
    return res.status(401).send("Correo o contraseña invalidos 😨.");
  }
  await UsersController.updateByEmail(
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
