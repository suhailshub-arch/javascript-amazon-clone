import {products} from './products.js';

// export const cart = {
//     items: [],
//     totalQuantity: 0,
//     totalPriceCents: 0
// };

// -------------------------------- TESTING --------------------------------
// This is a test cart object to simulate the cart functionality

export const cart = {
    items: [
        {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 5
        },
        {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1
            },
    ],
    totalQuantity: 0,
    totalPriceCents: 0
};

updateCart();
// ----------------------------------------------------------------

export function addToCart(productId, quantity) {
    let matchingProduct;

    cart.items.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });

    if (matchingProduct) {
      matchingProduct.quantity += quantity;
    } else {
      const product = products.find((product) => product.id === productId);
      cart.items.push({
        productId: product.id,
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
        cart.totalPriceCents += item.priceCents * item.quantity;
    });

    console.log('Cart updated:', cart);
}

export function removeFromCart(productId){
    let newCart = [];
    newCart = cart.items.filter((item) => {
        return item.productId !== productId;
    })

    cart.items = newCart;
    updateCart();
}