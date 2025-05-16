import {products} from './products.js';

export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
    cart = {
        items: [
            {
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 3
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
}

function saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


export function addToCart(productId, quantity) {
    const matchingProduct =  cart.items.find((item) => {
                    return item.productId === productId;
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

export function updateCart() {
    cart.totalQuantity = 0;
    cart.totalPriceCents = 0;

    cart.items.forEach((item) => {
        cart.totalQuantity += item.quantity;
        cart.totalPriceCents += item.priceCents * item.quantity;
    });

    console.log('Cart updated:', cart);

    saveToLocalStorage();
}

export function removeFromCart(productId){
    let newCart = [];
    newCart = cart.items.filter((item) => {
        return item.productId !== productId;
    })

    cart.items = newCart;
    updateCart();
}