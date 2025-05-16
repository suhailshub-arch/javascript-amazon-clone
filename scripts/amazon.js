import { products } from "../data/products.js";
import { cart, addToCart } from "../data/cart.js";
import { formatCurrency } from "./utils/money.js";

let productHTML = "";

products.forEach((product) => {
  productHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class="js-product-quantity-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
            data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `;
});

document.querySelector(".js-product-grid").innerHTML = productHTML;
document.querySelector(".js-cart-quantity").innerHTML = cart.totalQuantity;

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    const productQuantitySelector = document.querySelector(
      `.js-product-quantity-${productId}`
    );
    const productQuantity = Number(
      productQuantitySelector.options[productQuantitySelector.selectedIndex]
        .value
    );

    addToCart(productId, productQuantity);
    document.querySelector(".js-cart-quantity").innerHTML = cart.totalQuantity;

    const addedToCartImage = document.querySelector(
      `.js-added-to-cart-${productId}`
    );
    addedToCartImage.classList.add("js-added-to-cart-visible");

    const timeOutMessages = {};

    if (timeOutMessages[productId]) {
      clearTimeout(timeOutMessages[productId]);
    }

    const timeoutID = setTimeout(() => {
      addedToCartImage.classList.remove("js-added-to-cart-visible");
      addedToCartImage.classList.add("js-added-to-cart-hidden");
      setTimeout(() => {
        addedToCartImage.classList.remove("js-added-to-cart-hidden");
      }, 200);
    }, 2000);

    timeOutMessages[productId] = timeoutID;
  });
});
