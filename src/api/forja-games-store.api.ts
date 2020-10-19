import { OrderModel } from "../models/order.model";
import { ForjaGamesAPI } from "./forja-games.api";

export class ForjaGamesStoreAPI {
  static async getOrder(id: string): Promise<OrderModel> {
    const data = await ForjaGamesAPI.get(`order/${id}`);
    return new OrderModel().deserialize(data);
  }

  static async createOrder(model: OrderModel) {
    await ForjaGamesAPI.post("order", model.serialize());
  }
}
