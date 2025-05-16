import {products} from './products.js';

export const cart = {
    items: [],
    totalQuantity: 0,
    totalPriceCents: 0
};

export function addToCart(productId, quantity) {
    let matchingProduct;

    cart.items.forEach((product) => {
      if (product.product.id === productId) {
        matchingProduct = product;
      }
    });

    if (matchingProduct) {
      matchingProduct.quantity += quantity;
    } else {
      const product = products.find((product) => product.id === productId);
      cart.items.push({
        product,
        quantity
      });
    }

    updateCart();
};

function updateCart() {
    cart.totalQuantity = 0;
    cart.totalPriceCents = 0;

    cart.items.forEach((item) => {
        cart.totalQuantity += item.quantity;
        cart.totalPriceCents += item.product.priceCents * item.quantity;
    });

    const cartQuantityElement = document.querySelector('.js-cart-quantity');
    cartQuantityElement.innerHTML = cart.totalQuantity;

    console.log('Cart updated:', cart);
}