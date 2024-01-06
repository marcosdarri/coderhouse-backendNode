import CartDao from "../dao/cart.dao.js";

export default class CartsService {
  static findAll(filter = {}) {
    return CartDao.get(filter);
  }

  static async create(payload) {
    console.log("Creando un nuevo carrito.");
    const cart = await CartDao.create(payload);
    console.log(`Carrito creado correctamente (${cart._id})`);
    return cart;
  }

  static findById(cid, populate) {
    return CartDao.getById(cid, populate);
  }

  static updateById(cid, payload) {
    return CartDao.updateById(cid, payload);
  }

  static deleteById(cid) {
    return CartDao.deleteById(cid);
  }

  static addProduct(cid, pid) {
    return CartDao.addProduct(cid, pid);
  }

  static deleteProduct(cid, pid) {
    return CartDao.deleteProduct(cid, pid);
  }
}
