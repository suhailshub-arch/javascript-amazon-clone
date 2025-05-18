import {
  cart,
  addToCart,
  updateCart,
  removeFromCart,
  updateDeliveryOption,
} from "../../data/cart.js";

import * as productsModule from "../../data/products.js";

describe("cart.js", () => {
  let originalCart, setItemSpy, findSpy;

  beforeEach(async () => {
    originalCart = JSON.parse(JSON.stringify(cart));

    setItemSpy = spyOn(localStorage, "setItem").and.callFake(() => {});

    findSpy = spyOn(productsModule.products, "find").and.callFake(() => {
      return {
        id: 1,
        priceCents: 100,
      };
    });
  });

  afterEach(() => {
    Object.assign(cart, JSON.parse(JSON.stringify(originalCart)));
    setItemSpy.calls.reset();
    findSpy.calls.reset();
  });

  describe("Update Cart", () => {
    it("should update the cart total quantity and price", () => {
      cart.items = [{ id: 1, quantity: 3 }];
      updateCart();
      expect(cart.totalQuantity).toBe(3);
      expect(cart.totalPriceCents).toBe(300);
    });

    it("should save the cart to local storage", () => {
      cart.items = [{ id: 1, quantity: 3 }];
      updateCart();
      expect(setItemSpy).toHaveBeenCalledWith("cart", JSON.stringify(cart));
    });
  });

  describe("Add to Cart", () => {
    it("should add a new product to the cart", () => {
      const productId = 1;
      const quantity = 2;
      addToCart(productId, quantity);

      expect(cart.items.length).toBe(1);
      expect(cart.items[0].productId).toBe(productId);
      expect(cart.items[0].quantity).toBe(quantity);
      expect(cart.items[0].deliveryOptionId).toBe(1);
    });

    it("should update the quantity of an existing product in the cart", () => {
      const productId = 1;
      const initialQuantity = 2;
      const additionalQuantity = 3;

      addToCart(productId, initialQuantity);
      addToCart(productId, additionalQuantity);

      expect(cart.items.length).toBe(1);
      expect(cart.items[0].productId).toBe(productId);
      expect(cart.items[0].quantity).toBe(initialQuantity + additionalQuantity);
    });
  });

  describe("Remove from Cart", () => {
    it("should remove a product from the cart", () => {
      const productId = 1;
      const quantity = 2;
      addToCart(productId, quantity);

      removeFromCart(productId);
      expect(cart.items.length).toBe(0);
      expect(cart.totalQuantity).toBe(0);
      expect(cart.totalPriceCents).toBe(0);
    });

    it("should not remove a product that is not in the cart", () => {
      const productId = 1;
      const quantity = 2;
      addToCart(productId, quantity);

      removeFromCart(2);
      expect(cart.items.length).toBe(1);
      expect(cart.items[0].productId).toBe(productId);
      expect(cart.items[0].quantity).toBe(quantity);
      expect(cart.totalQuantity).toBe(quantity);
      expect(cart.totalPriceCents).toBe(quantity * 100);
    });
  });

  describe("Update Delivery Option", () => {
    it("should update the delivery option for a product in the cart", () => {
      const productId = 1;
      const quantity = 2;
      addToCart(productId, quantity);

      const newDeliveryOptionId = 2;
      updateDeliveryOption(productId, newDeliveryOptionId);

      expect(cart.items[0].deliveryOptionId).toBe(newDeliveryOptionId);
    });

    it("should not update the delivery option for a product that is not in the cart", () => {
      const productId = 1;
      const quantity = 2;
      addToCart(productId, quantity);

      const newDeliveryOptionId = 2;
      updateDeliveryOption(2, newDeliveryOptionId);

      expect(cart.items[0].deliveryOptionId).toBe(1);
    });
  });
});
