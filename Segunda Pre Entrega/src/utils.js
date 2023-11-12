import path from "path";
import { fileURLToPath } from "url";

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

export const __dirname = path.dirname(__filename);
