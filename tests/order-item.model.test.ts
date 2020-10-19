import { expect } from "chai";
import { OrderItem } from "../src/models/order-item.model";

let instance: OrderItem = null;

describe("OrderItem", () => {
  beforeEach(() => {
    instance = new OrderItem();
  });

  describe("#constructor", () => {
    it("should work fine", () => {
      expect(instance).to.be.ok;
    });
  });

  describe("#serialize", () => {
    it("should work fine", () => {
      const data = instance.serialize();
      expect(data).to.be.ok;
    });
  });

  describe("#deserialize", () => {
    it("should work fine", () => {
      const data = instance.serialize();
      expect(instance.deserialize(data)).to.be.ok;
    });
  });
});
