import UserService from "../services/users.services.js";

export default class UsersController {
  static async get(query = {}) {
    const users = await UserService.findAll(query);
    return users;
  }

  static async create(data) {
    console.log("Creando el nuevo usuario 👽");
    const user = await UserService.create(data);
    console.log("Usuario creado corretamente 👽");
    return user;
  }

  static async getById(uid) {
    const user = await UserService.findById(uid);
    if (!user) {
      throw new Error(`Id de usuario no fue encontrado ${uid} 😨`);
    }
    return user;
  }

  static async getByEmail(email) {
    const user = await UserService.findByEmail(email);
    if (!user) {
      throw new Error(`Email de usuario no fue encontrado ${email} 😨`);
    }
    return user;
  }

  static async updateById(uid, data) {
    console.log("Actualizando el usuario 👽");
    await UserService.updateById(uid, data);
    console.log("Usuario actualizado corretamente 👽");
  }

  static async updateByEmail(email, data) {
    console.log("Actualizando el usuario 👽");
    await UserService.updateByEmail(email, data);
    console.log("Usuario actualizado corretamente 👽");
  }

  static async deleteById(uid) {
    console.log("Eliminando el usuario 👽");
    await UserService.deleteById(uid);
    console.log("Usuario eliminado corretamente 👽");
  }
}
