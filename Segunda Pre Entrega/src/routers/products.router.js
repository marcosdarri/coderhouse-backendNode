import { Router } from "express";
import productModel from "../dao/models/product.model.js";

const router = Router();

router.get("/products", async (req, res) => {
  const { page = 1, limit = 10, category, stock, sort } = req.query;
  const opts = { page, limit };
  const criteria = {};
  if (category) {
    criteria.category = category;
  }
  if (stock) {
    criteria.stock = stock;
  }

  const result = await productModel.paginate(criteria, opts);
  console.log("result", result);
  if (sort) {
    if (sort === "asc") ordenAscendente(result.docs);
    if (sort === "desc") ordenDescendente(result.docs);
  }

  res.render("products", buildResponse({ ...result, category, stock }));
});

const buildResponse = (data) => {
  return {
    status: "success",
    payload: data.docs.map((product) => product.toJSON()),
    totalPages: data.totalPages,
    page: data.page,
    pagingCounter: 1,
    hasPrevPage: data.hasPrevPage,
    hasNextPage: data.hasNextPage,
    prevPage: data.prevPage,
    nextPage: data.nextPage,
    prevLink: data.hasPrevPage
      ? `http://localhost:8080/products?limit=${data.limit}&page=${
          data.prevPage
        }${data.category ? `&category=${data.category}` : ""}`
      : "",
    nextLink: data.hasNextPage
      ? `http://localhost:8080/products?limit=${data.limit}&page=${
          data.nextPage
        }${data.category ? `&category=${data.category}` : ""}`
      : "",
  };
};

const ordenAscendente = (array) => {
  return array.sort((a, b) => a.title.localeCompare(b.title));
};

const ordenDescendente = (array) => {
  return array.sort((a, b) => b.title.localeCompare(a.title));
};

export default router;
