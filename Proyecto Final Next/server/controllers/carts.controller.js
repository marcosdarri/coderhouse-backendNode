import CartsService from "../services/carts.services.js";

export default class CartsController {
  static async create(data) {
    console.log("Creando el nuevo carrito");
    const newCart = await CartsService.create(data);
    console.log("Carrito creado corretamente");
    return newCart;
  }

  static async get(query = {}) {
    const carts = await CartsService.findAll(query);
    return carts;
  }

  static async getById(pid, populate) {
    const cart = await CartsService.findById(pid, populate);
    if (!cart) {
      throw new Error(`Id del carrito no fue encontrado ${pid} 😨`);
    }
    return cart;
  }

  static async updateById(pid, data) {
    console.log("Actualizando el carrito");
    await CartsService.updateById(pid, data);
    console.log("Actualizado el carrito corretamente");
  }

  static async deleteById(pid) {
    console.log("Elimiando el carrito");
    await CartsService.deleteById(pid);
    console.log("Elimiado el carrito corretamente");
  }

  static async addProduct(cid, pid) {
    await CartsService.addProduct(cid, pid);
    console.log("El producto fue agregado correctamente");
  }

  static async deleteProduct(cid, pid) {
    await CartsService.deleteProduct(cid, pid);
    console.log("El producto fue eliminado correctamente");
  }
}
