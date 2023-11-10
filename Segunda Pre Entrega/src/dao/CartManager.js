import CartModel from "./models/cart.model.js";
import { Exception } from "../utils.js";

export default class CartManager {
  static get(query = {}) {
    const criteria = {};
    if (query.course) {
      criteria.course = query.course;
    }
    return CartModel.find(criteria).lean();
  }

  static async getById(cid) {
    const cart = await CartModel.findById(cid);
    if (!cart) {
      throw new Exception("No existe el carrito 😨", 404);
    }
    return cart;
  }

  static async create(data) {
    const cart = await CartModel.create(data);
    console.log("Carrito creado correctamente 😁");
    return cart;
  }

  static async updateById(cid, data) {
    const cart = await CartModel.findById(cid);
    if (!cart) {
      throw new Exception("No existe el carrito 😨", 404);
    }
    const criteria = { _id: cid };
    const operation = { $set: data };
    await CartModel.updateOne(criteria, operation);
    console.log("Carrito actualizado correctamente 😁");
  }

  static async deleteById(cid) {
    const cart = await CartModel.findById(cid);
    if (!cart) {
      throw new Exception("No existe el carrito 😨", 404);
    }
    const criteria = { _id: cid };
    await CartModel.deleteOne(criteria);
    console.log("Carrito eliminado correctamente 😑");
  }
}
