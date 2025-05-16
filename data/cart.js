import {products} from './products.js';

export const cart = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0
};

export function addToCart(productId) {
    let matchingProduct;

    cart.items.forEach((product) => {
      if (product.product.id === productId) {
        matchingProduct = product;
      }
    });

    if (matchingProduct) {
      matchingProduct.quantity++;
    } else {
      const product = products.find((product) => product.id === productId);
      cart.items.push({
        product,
        quantity: 1
      });
    }

    updateCart();
};

function updateCart() {
    cart.totalQuantity = 0;
    cart.totalPrice = 0;

    cart.items.forEach((item) => {
        cart.totalQuantity += item.quantity;
        cart.totalPrice += item.product.priceCents * item.quantity;
    });

    const cartQuantityElement = document.querySelector('.js-cart-quantity');
    cartQuantityElement.innerHTML = cart.totalQuantity;
}