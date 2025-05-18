import { cart } from "../../data/cart.js";

export function generateCheckoutHeader() {
  const headerQuantity = document.querySelector(".js-header-quantity");
  headerQuantity.innerHTML = `
            Checkout (<a class="return-to-home-link" 
                href="amazon.html">${cart.totalQuantity} items</a>)
        `;
}
