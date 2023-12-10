import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);

export class Exception extends Error {
  constructor(message, status) {
    super(message);
    this.statusCode = status;
  }
}

export const getLinkToPage = (req, page) => {
  let currentLink = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  if (req.query.page) {
    return currentLink.replace(`page=${req.query.page}`, `page=${page}`);
  }

  if (Object.keys(req.query).length !== 0) {
    return currentLink + `&page=${page}`;
  }

  return currentLink + `?page=${page}`;
};

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (password, user) =>
  bcrypt.compareSync(password, user.password);

export const __dirname = path.dirname(__filename);

export const JWT_SECRET = process.env.JWT_SECRET;

export const tokenGenerator = (user) => {
  const { _id: id, first_name, last_name, email, role } = user;
  const payload = {
    id,
    first_name,
    last_name,
    email,
    role,
  };
  return JWT.sign(payload, JWT_SECRET, { expiresIn: "30m" });
};

export const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    JWT.verify(token, JWT_SECRET, (error, payload) => {
      if (error) {
        return reject(error);
      }
      resolve(payload);
    });
  });
};

export const authPolicies = (roles) => (req, res, next) => {
  if (roles.includes("user")) {
    return next();
  }
  const { role } = req.user;
  if (!roles.includes(role)) {
    return res
      .status(403)
      .json({ message: "No tienes permiso para estar aquí 😨" });
  }
  next();
};
