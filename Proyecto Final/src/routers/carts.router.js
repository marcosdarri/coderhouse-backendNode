import { Router } from "express";
import CartsController from "../controllers/carts.controller.js";

const router = Router();

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    let cart = await CartsController.getById(cid);
    /* const products = cart.products.map((e) => {
      return { ...e.product._doc, quantity: e.quantity };
    }); */
    console.log("cart", cart);
    res.render("carts", { cartId: cid, products: cart.products });
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
});

export default router;
