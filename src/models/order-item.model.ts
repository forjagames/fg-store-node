import { SerializableModel } from "./base/serializable";

export class OrderItem extends SerializableModel {
  title = "";
  description = "";
  quantity = 1;
  price = 0;
  image = "";

  get total() {
    return this.price * this.quantity;
  }
}
