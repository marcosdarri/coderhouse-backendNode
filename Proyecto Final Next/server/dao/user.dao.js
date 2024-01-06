import UserModel from "../models/user.model.js";

export default class UserDao {
  static get(criteria = {}) {
    return UserModel.find(criteria);
  }

  static create(data) {
    return UserModel.create(data);
  }

  static getById(uid) {
    return UserModel.findById(uid);
  }

  static findByEmail(email) {
    return UserModel.findOne(email);
  }

  static updateById(uid, data) {
    return UserModel.updateOne({ _id: uid }, { $set: data });
  }

  static updateByEmail(email, data) {
    return UserModel.updateOne({ email: email }, { $set: data });
  }

  static deleteById(uid) {
    return UserModel.deleteOne({ _id: uid });
  }
}
