import MessageModel from "./models/message.model.js";
import { Exception } from "../utils.js";

export default class MessageManager {
  static get(query = {}) {
    const criteria = {};
    if (query.course) {
      criteria.course = query.course;
    }
    return MessageModel.find(criteria).lean();
  }

  static async getById(pid) {
    const message = await MessageModel.findById(pid);
    if (!message) {
      throw new Exception("No existe el mensaje 😨", 404);
    }
    return message;
  }

  static async create(data) {
    const message = await MessageModel.create(data);
    console.log("Mensaje creado correctamente 😁");
    return message;
  }

  static async updateById(mid, data) {
    const message = await MessageModel.findById(mid);
    if (!message) {
      throw new Exception("No existe el message 😨", 404);
    }
    const criteria = { _id: mid };
    const operation = { $set: data };
    await MessageModel.updateOne(criteria, operation);
    console.log("Mensaje actualizado correctamente 😁");
  }

  static async deleteById(mid) {
    const message = await MessageModel.findById(mid);
    if (!message) {
      throw new Exception("No existe el mensaje 😨", 404);
    }
    const criteria = { _id: mid };
    await MessageModel.deleteOne(criteria);
    console.log("Mensaje eliminado correctamente 😑");
  }
}
