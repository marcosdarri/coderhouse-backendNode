import ProductsService from "../services/products.services.js";

export default class ProductsController {
  static async create(data) {
    console.log("Creando el nuevo producto");
    const newProduct = await ProductsService.create(data);
    console.log("Producto creado corretamente");
    return newProduct;
  }

  static async get(query = {}) {
    const products = await ProductsService.findAll(query);
    return products;
  }

  static async getById(pid) {
    const product = await ProductsService.findById(pid);
    if (!product) {
      throw new Error(`Id del producto no fue encontrado ${pid} 😨`);
    }
    return product;
  }

  static async updateById(pid, data) {
    console.log("Actualizando el producto");
    await ProductsService.updateById(pid, data);
    console.log("Actualizado el producto corretamente");
  }

  static async deleteById(pid) {
    console.log("Elimiando el producto");
    await ProductsService.deleteById(pid);
    console.log("Elimiado el producto corretamente");
  }

  static async productExists(pid) {
    await ProductsService.productExists(pid);
  }

  static async addProduct(productData) {
    console.log("Agregando el producto");
    await ProductsService.addProduct(productData);
    console.log("Producto agregado corretamente");
  }
}
