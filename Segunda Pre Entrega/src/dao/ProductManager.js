import ProductModel from "./models/product.model.js";
import { Exception } from "../utils.js";

export default class ProductManager {
  static get(query = {}) {
    const criteria = {};
    if (query.course) {
      criteria.course = query.course;
    }
    return ProductModel.find(criteria).lean();
  }

  static async getById(pid) {
    const product = await ProductModel.findById(pid);
    if (!product) {
      throw new Exception("No existe el producto 😨", 404);
    }
    return product;
  }

  static async create(data) {
    const product = await ProductModel.create(data);
    console.log("Producto creado correctamente 😁");
    return product;
  }

  static async updateById(pid, data) {
    const product = await ProductModel.findById(pid);
    if (!product) {
      throw new Exception("No existe el producto 😨", 404);
    }
    const criteria = { _id: pid };
    const operation = { $set: data };
    await ProductModel.updateOne(criteria, operation);
    console.log("Producto actualizado correctamente 😁");
  }

  static async deleteById(pid) {
    const product = await ProductModel.findById(pid);
    if (!product) {
      throw new Exception("No existe el producto 😨", 404);
    }
    const criteria = { _id: pid };
    await ProductModel.deleteOne(criteria);
    console.log("Producto eliminado correctamente 😑");
  }

  static async productExists(pid) {
    console.log(await ProductModel.findOne({ _id: pid }));
    try {
      return await ProductModel.findOne({ _id: pid });
    } catch (error) {
      return false;
    }
  }
}
