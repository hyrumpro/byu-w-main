import CheckoutProcess from "./CheckoutProcess.mjs";
import { alertMessage } from "./utils.mjs";


const checkoutProcess = new CheckoutProcess();
checkoutProcess.displayOrderSummary();

document.getElementById("checkoutForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  if (validateForm()) {
    await checkoutProcess.checkout(e.target);
  }
});

document.getElementById("checkoutForm").addEventListener("input", (e) => {
  clearErrorMessage(e.target);
});

document.getElementById("checkoutForm").addEventListener("reset", () => {
  clearAllErrorMessages();
});

function validateForm() {
  const form = document.getElementById("checkoutForm");
  const cardNumber = form.cardNumber.value;
  const expiration = form.expiration.value;
  const code = form.code.value;
  let isValid = true;

  // Clear previous error messages
  clearAllErrorMessages();

  // Validate credit card number
  if (!validateCardNumber(cardNumber)) {
    showErrorMessage("cardNumberError", "Invalid credit card number.");
    isValid = false;
  }

  // Validate expiration date
  if (!validateExpirationDate(expiration)) {
    showErrorMessage("expirationError", "Invalid expiration date. Use MM/YY format.");
    isValid = false;
  }

  // Validate security code
  if (!validateSecurityCode(code)) {
    showErrorMessage("codeError", "Invalid security code.");
    isValid = false;
  }

  return isValid;
}

function validateCardNumber(number) {
  // Allow the specific number "1234123412341234" to pass without validation
  if (number === "1234123412341234") {
    return true;
  }

  const regex = new RegExp("^[0-9]{13,19}$");
  if (!regex.test(number)) return false;
  return luhnCheck(number);
}

function luhnCheck(val) {
  let sum = 0;
  let shouldDouble = false;
  for (let i = val.length - 1; i >= 0; i--) {
    let digit = parseInt(val.charAt(i));
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return (sum % 10) === 0;
}

function validateExpirationDate(date) {
  const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
  if (!regex.test(date)) return false;

  const [month, year] = date.split("/").map(Number);
  const now = new Date();
  const currentYear = now.getFullYear() % 100; // Get last two digits of the current year
  const currentMonth = now.getMonth() + 1; // Months are zero-based

  if (year > currentYear || (year === currentYear && month >= currentMonth)) {
    return true;
  }
  return false;
}

function validateSecurityCode(code) {
  const regex = new RegExp("^[0-9]{3,4}$");
  return regex.test(code);
}

function showErrorMessage(elementId, message) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
  errorElement.style.display = "block";
}

function clearErrorMessage(inputElement) {
  const errorElement = inputElement.nextElementSibling;
  if (errorElement && errorElement.classList.contains("error-message")) {
    errorElement.textContent = "";
    errorElement.style.display = "none";
  }
}

function clearAllErrorMessages() {
  document.querySelectorAll(".error-message").forEach(el => {
    el.textContent = "";
    el.style.display = "none";
  });
}
