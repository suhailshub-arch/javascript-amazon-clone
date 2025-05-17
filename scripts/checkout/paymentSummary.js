import { cart } from "../../data/cart.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";

export function generatePaymentSummary() {
  let paymentSummaryHTML = "";
  let totalShippingCents = 0;

  cart.items.forEach((cartItem) => {
    const matchingDeliveryOption = deliveryOptions.find((option) => {
      return Number(cartItem.deliveryOptionId) === option.id;
    });
    const deliveryOptionPrice = matchingDeliveryOption.priceCents;
    totalShippingCents += deliveryOptionPrice;
  });
  const totalBeforeTaxCents = cart.totalPriceCents + totalShippingCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalAfterTaxCents = totalBeforeTaxCents + taxCents;

  paymentSummaryHTML += `
        <div class="payment-summary-title">Order Summary</div>

        <div class="payment-summary-row">
        <div>Items ${cart.totalQuantity}:</div>
        <div class="payment-summary-money">$${formatCurrency(
          cart.totalPriceCents
        )}</div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatCurrency(
          totalShippingCents
        )}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(
          totalBeforeTaxCents
        )}</div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatCurrency(
          totalAfterTaxCents
        )}</div>
        </div>

        <button class="place-order-button button-primary">
        Place your order
        </button>
    `;

  const paymentSummaryElement = document.querySelector(".js-payment-summary");
  paymentSummaryElement.innerHTML = paymentSummaryHTML;
};
