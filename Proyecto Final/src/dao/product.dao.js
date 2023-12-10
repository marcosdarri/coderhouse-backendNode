import ProductModel from "../models/product.model.js";
import { Exception } from "../utils.js";

export default class ProductDao {
  static async get() {
    try {
      // Obtener todos los productos desde la base de datos
      const products = await ProductModel.find({});
      return products;
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los productos" });
    }
  }

  static async getById(pid) {
    const product = await ProductModel.findById(pid);
    if (!product) {
      throw new Exception("No existe el producto 😨", 404);
    }
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

  static async addProduct(productData) {
    try {
      productData.category = productData.category.toLowerCase();

      await ProductModel.create(productData);
    } catch (error) {
      if (error.code === 11000) {
        throw new Exception(
          `Product with code "${productData.code}" already exists. code must be unique`,
          409
        );
      }
      throw new Exception("Product data is not valid", 400);
    }
  }
}
