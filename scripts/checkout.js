import {cart, removeFromCart, updateCart} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency } from './utils/money.js';

function generateOrderSummary() {
    const headerQuantity = document.querySelector('.js-header-quantity');
    headerQuantity.innerHTML = `
        Checkout (<a class="return-to-home-link" 
            href="amazon.html">${cart.totalQuantity} items</a>)
    `;
    let cartItemGridHTML = ``;

    cart.items.forEach((cartItem) => {

        let matchingProduct;

        products.forEach((product) => {
            if (product.id === cartItem.productId) {
                matchingProduct = product;
            }
        });

        const cartItemHTML = `
            <div class="cart-item-container">
                <div class="delivery-date">
                    Delivery date: Tuesday, June 21
                </div>
                <div class="cart-item-details-grid">
                    <img class="product-image"
                        src="${matchingProduct.image}">
                    <div class="cart-item-details">
                        <div class="product-name">
                            ${matchingProduct.name}
                        </div>
                        <div class="product-price">
                            $${formatCurrency(matchingProduct.priceCents)}
                        </div>
                        <div class="product-quantity">
                            <span>
                            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                            </span>
                            <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                            Update
                            </span>
                            <span class="quantity-update-label js-quantity-update-label-${matchingProduct.id}">
                                <input class="quantity-input js-quantity-input-${matchingProduct.id}" type="number" value="${cartItem.quantity}" min="0">
                                <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">
                                Save
                                </span>
                            </span>
                            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                            Delete
                            </span>
                        </div>
                    </div>
                    <div class="delivery-options">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        <div class="delivery-option">
                            <input type="radio" checked
                                class="delivery-option-input"
                                name="delivery-option-${matchingProduct.id}">
                            <div>
                                <div class="delivery-option-date">
                                    Tuesday, June 21
                                </div>
                                <div class="delivery-option-price">
                                    FREE Shipping
                                </div>
                            </div>
                        </div>
                        <div class="delivery-option">
                            <input type="radio"
                                class="delivery-option-input"
                                name="delivery-option-${matchingProduct.id}">
                            <div>
                                <div class="delivery-option-date">
                                    Wednesday, June 15
                                </div>
                                <div class="delivery-option-price">
                                    $4.99 - Shipping
                                </div>
                            </div>
                        </div>
                        <div class="delivery-option">
                            <input type="radio"
                                class="delivery-option-input"
                                name="delivery-option-${matchingProduct.id}">
                            <div>
                                <div class="delivery-option-date">
                                    Monday, June 13
                                </div>
                                <div class="delivery-option-price">
                                    $9.99 - Shipping
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        cartItemGridHTML += cartItemHTML;
    });

    const orderSummary = document.querySelector('.js-order-summary');
    orderSummary.innerHTML = cartItemGridHTML;

    addDeleteLinkEventListeners();
    addSaveLinkEventListeners();
    addUpdateLinkEventListeners();
}


generateOrderSummary();

function addDeleteLinkEventListeners(){
    document.querySelectorAll('.js-delete-link').forEach((link) => {
        link.addEventListener('click', (event) => {
            const productId = link.dataset.productId
            removeFromCart(productId);
            generateOrderSummary();
        });
    });
}

function addSaveLinkEventListeners(){
    document.querySelectorAll('.save-quantity-link').forEach((link) => {
        link.addEventListener('click', (event) => {
            const productId = link.dataset.productId;
            const quaantityInputElement = document.querySelector(
                `.js-quantity-input-${productId}`
            );

            const updatedQuantity = parseInt(quaantityInputElement.value);
            if (updatedQuantity > 0) {
                const matchingProduct = cart.items.find((item) => {
                    return item.productId === productId;
                });
                console.log(matchingProduct);
                matchingProduct.quantity = updatedQuantity;
                updateCart();
            } else if(updatedQuantity === 0) {
                removeFromCart(productId);
            }else {
                alert('Please enter a valid quantity');
            }

            generateOrderSummary();
        });
    });
}

function addUpdateLinkEventListeners(){
    document.querySelectorAll('.js-update-link').forEach((link) => {
        link.addEventListener('click', (event) => {
            const productId = link.dataset.productId;
            const quantityUpdateInputElement = document.querySelector(
                `.js-quantity-update-label-${productId}`
            );
            if (quantityUpdateInputElement.classList.contains('quantity-update-label-visible')) {
                quantityUpdateInputElement.classList.remove('quantity-update-label-visible');
            } else{
                quantityUpdateInputElement.classList.add('quantity-update-label-visible');
            }   

        });
    });
}



