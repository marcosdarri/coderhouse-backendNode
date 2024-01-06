import UserDao from "../dao/user.dao.js";

export default class UsersService {
  static findAll(filter = {}) {
    return UserDao.get(filter);
  }

  static async create(payload) {
    console.log("Creando un nuevo usuario.");
    const user = await UserDao.create(payload);
    console.log(`Usuario creado correctamente (${user._id})`);
    return user;
  }

  static findById(uid) {
    return UserDao.getById(uid);
  }

  static findByEmail(uid) {
    return UserDao.findByEmail(uid);
  }

  static updateById(uid, payload) {
    return UserDao.updateById(uid, payload);
  }

  static updateByEmail(email, payload) {
    return UserDao.updateByEmail(email, payload);
  }

  static deleteById(uid) {
    return UserDao.deleteById(uid);
  }
}
