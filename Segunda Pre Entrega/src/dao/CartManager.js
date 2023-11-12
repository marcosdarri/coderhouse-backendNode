import CartModel from "./models/cart.model.js";
import ProductManager from "./ProductManager.js";
import { Exception } from "../utils.js";

export default class CartManager {
  static async get() {
    return CartModel.find();
  }
  static async addCart(cart) {
    const result = await CartModel.create(cart);
    return result;
  }

  static async create(data) {
    const cart = await CartModel.create(data);
    console.log("Carrito creado correctamente 😁");
    return cart;
  }

  static async updateById(cid, products) {
    try {
      const result = await CartModel.updateOne({ _id: cid }, { products });

      if (result.matchedCount == 0) {
        throw new Error();
      }

      return await CartModel.findOne({ _id: cid });
    } catch (error) {
      throw new Exception(`Cart with id "${cid}" not found`);
    }
  }

  static async getById(cid, populate = false) {
    try {
      const cart = await CartModel.findOne({ _id: cid });
      if (populate) {
        return await cart.populate("products.product");
      }

      return cart;
    } catch (error) {
      throw new Exception(`Cart with id "${cid}" not found`, 404);
    }
  }

  static async addProduct(cid, pid, quantity = null) {
    const cart = await CartManager.getById(cid);
    const validProduct = await ProductManager.productExists(pid);

    if (validProduct) {
      const productIndex = cart.products.findIndex(
        (e) => e.product.toString() == pid
      );

      if (productIndex != -1) {
        quantity
          ? (cart.products[productIndex].quantity = quantity)
          : cart.products[productIndex].quantity++;
      } else {
        cart.products.push({
          product: pid,
          quantity: quantity ? quantity : 1,
        });
      }

      let result = await CartManager.updateById(cid, cart.products);
      return result;
    }
  }

  static async deleteProduct(cid, pid) {
    const cart = await CartManager.getById(cid);
    if (!cart) {
      throw new Exception(`Cart with id "${cid}" not found`, 404);
    }
    const productIndex = cart.products.findIndex(
      (e) => e.product && e.product._id.toString() == pid
    );
    if (productIndex != -1) {
      cart.products.splice(productIndex, 1);
      return await CartManager.updateById(cid, cart.products);
    }

    throw new Exception(
      `Product with id "${pid}" not found in cart with id "${cid}"`,
      404
    );
  }
}
