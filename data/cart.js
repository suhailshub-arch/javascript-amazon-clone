import {products} from './products.js';

// export const cart = {
//     items: [],
//     totalQuantity: 0,
//     totalPriceCents: 0
// };

export const cart = {
    items: [
        {
            product :{
                id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                rating: {
                stars: 4.5,
                count: 87
                },
                priceCents: 1090,
                keywords: [
                "socks",
                "sports",
                "apparel"
                ]
            },
            quantity: 2
        },
        {
            product :{
                id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                image: "images/products/intermediate-composite-basketball.jpg",
                name: "Intermediate Size Basketball",
                rating: {
                stars: 4,
                count: 127
                },
                priceCents: 2095,
                keywords: [
                "sports",
                "basketballs"
                ]
            },
            quantity: 1
            },
    ],
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