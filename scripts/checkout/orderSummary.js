import {
  cart,
  removeFromCart,
  updateCart,
  updateDeliveryOption,
} from "../../data/cart.js";
import { products, findProductById } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { generateCheckoutPage } from "./checkout.js";

export function generateOrderSummary() {
  const headerQuantity = document.querySelector(".js-header-quantity");
  headerQuantity.innerHTML = `
        Checkout (<a class="return-to-home-link" 
            href="amazon.html">${cart.totalQuantity} items</a>)
    `;

  const orderSummary = document.querySelector(".js-order-summary");
  let cartItemGridHTML = ``;

  cart.items.forEach((cartItem) => {
    let matchingProduct;

    products.forEach((product) => {
      if (product.id === cartItem.productId) {
        matchingProduct = product;
      }
    });

    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = deliveryOptions.find((option) => {
      return option.id === deliveryOptionId;
    });
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "day");
    const deliveryDateFormatted = deliveryDate.format("dddd, MMMM D");

    const cartItemHTML = `
            <div class="cart-item-container">
                <div class="delivery-date">
                    Delivery date: ${deliveryDateFormatted}
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
                            Quantity: <span class="quantity-label">${
                              cartItem.quantity
                            }</span>
                            </span>
                            <span class="update-quantity-link link-primary js-update-link" data-product-id="${
                              matchingProduct.id
                            }">
                            Update
                            </span>
                            <span class="quantity-update-label js-quantity-update-label-${
                              matchingProduct.id
                            }">
                                <input class="quantity-input js-quantity-input-${
                                  matchingProduct.id
                                }" type="number" value="${
      cartItem.quantity
    }" min="0">
                                <span class="save-quantity-link link-primary js-save-link" data-product-id="${
                                  matchingProduct.id
                                }">
                                Save
                                </span>
                            </span>
                            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
                              matchingProduct.id
                            }">
                            Delete
                            </span>
                        </div>
                    </div>
                    <div class="delivery-options">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        ${generateDeliveryOptionsHTML(
                          matchingProduct,
                          cartItem
                        )}
                    </div>
                </div>
            </div>
        `;
    cartItemGridHTML += cartItemHTML;
  });

  orderSummary.innerHTML = cartItemGridHTML;
  addDeleteLinkEventListeners();
  addSaveLinkEventListeners();
  addUpdateLinkEventListeners();
  addDeliveryOptionRadioEventListeners();
}

function generateDeliveryOptionsHTML(matchingProduct, cartItem) {
  let deliveryOptionsHTML = ``;
  const today = dayjs();

  deliveryOptions.forEach((option) => {
    const deliveryDate = today.add(option.deliveryDays, "day");
    const deliveryDateFormatted = deliveryDate.format("dddd, MMMM D");
    const deliveryPrice =
      option.priceCents === 0
        ? "FREE Shipping"
        : `$${formatCurrency(option.priceCents)} - Shipping`;
    const isChecked = cartItem.deliveryOptionId === option.id ? "checked" : "";
    const deliveryOptionHTML = `
      <div class="delivery-option">
        <input type="radio" ${isChecked}
            class="delivery-option-input js-delivery-option"
            name="delivery-option-${matchingProduct.id}"
            value="${option.id}">
        <div>
          <div class="delivery-option-date">
              ${deliveryDateFormatted}
          </div>
          <div class="delivery-option-price">
              ${deliveryPrice}
          </div>
        </div>
      </div>
    `;
    deliveryOptionsHTML += deliveryOptionHTML;
  });
  return deliveryOptionsHTML;
}

generateOrderSummary();

function addDeleteLinkEventListeners() {
  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      generateCheckoutPage();
    });
  });
}

function addSaveLinkEventListeners() {
  document.querySelectorAll(".save-quantity-link").forEach((link) => {
    link.addEventListener("click", (event) => {
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
      } else if (updatedQuantity === 0) {
        removeFromCart(productId);
      } else {
        alert("Please enter a valid quantity");
      }

      generateCheckoutPage();
    });
  });
}

function addUpdateLinkEventListeners() {
  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      const productId = link.dataset.productId;
      const quantityUpdateInputElement = document.querySelector(
        `.js-quantity-update-label-${productId}`
      );
      if (
        quantityUpdateInputElement.classList.contains(
          "quantity-update-label-visible"
        )
      ) {
        quantityUpdateInputElement.classList.remove(
          "quantity-update-label-visible"
        );
      } else {
        quantityUpdateInputElement.classList.add(
          "quantity-update-label-visible"
        );
      }
    });
  });
}

function addDeliveryOptionRadioEventListeners() {
  document.querySelectorAll(".js-delivery-option").forEach((radio) => {
    radio.addEventListener("click", (event) => {
      const selectedDeliveryOptionId = parseInt(radio.value);
      const productId = radio.name.split("delivery-option-")[1];
      console.log(`Selected product ID: ${productId}`);
      updateDeliveryOption(productId, selectedDeliveryOptionId);
      generateCheckoutPage();
    });
  });
}
