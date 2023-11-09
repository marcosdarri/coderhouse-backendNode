import { Router } from "express";
import productModel from "../dao/models/product.model.js";

const router = Router();

router.get("/products", async (req, res) => {
  const { page = 1, limit = 1 } = req.query;
  const opts = { page, limit };
  const criteria = {};
  const result = await productModel.paginate(criteria, opts);
  //res.status(200).json(buildResponse(result));
  res.render("products", buildResponse(result));
});

const buildResponse = (data) => {
  return {
    status: "success",
    payload: data.docs.map((student) => student.toJSON()),
    totalPages: data.totalPages,
    page: data.page,
    pagingCounter: 1,
    hasPrevPage: data.hasPrevPage,
    hasNextPage: data.hasNextPage,
    prevPage: data.hasPrevPage
      ? `http://localhost:8080/products?limit=${data.limit}&page=${
          data.page - 1
        }`
      : "",
    nextPage: data.hasNextPage
      ? `http://localhost:8080/products?limit=${data.limit}&page=${
          data.page + 1
        }`
      : "",
  };
};

export default router;
