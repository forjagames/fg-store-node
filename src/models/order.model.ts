import { SerializableModel } from './base/serializable';
import { OrderItem } from './order-item.model';

export class OrderModel extends SerializableModel {
  id = "";
  price = 0;
  date = new Date();
  items: OrderItem[] = [];

  deserialize(data:any) {
    const result = super.deserialize(data);
    result.items = result.items.map(m => new OrderItem().deserialize(m));
    return result;
  }
}
