import { generateOrderSummary } from "./orderSummary.js";
import { generatePaymentSummary } from "./paymentSummary.js";
import { generateCheckoutHeader } from "./checkoutHeader.js";

export function generateCheckoutPage() {
  generateCheckoutHeader();
  generateOrderSummary();
  generatePaymentSummary();
}

generateCheckoutPage();
