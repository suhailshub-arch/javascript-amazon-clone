import { generateOrderSummary } from "./orderSummary.js";
import { generatePaymentSummary } from "./paymentSummary.js";

export function generateCheckoutPage() {
  generateOrderSummary();
  generatePaymentSummary();
}
