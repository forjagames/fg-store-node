import { expect } from "chai";
import { OrderModel } from "../src/models/order.model";

let instance: OrderModel = null;

describe("OrderModel", () => {
  beforeEach(() => {
    instance = new OrderModel();
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
