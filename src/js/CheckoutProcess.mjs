import { getLocalStorage, setLocalStorage, clearLocalStorage, alertMessage } from "./utils.mjs";

export default class CheckoutProcess {
  constructor() {
    this.cartItems = getLocalStorage("so-cart");
  }

  calculateSubtotal() {
    return this.cartItems.reduce((total, item) => total + item.FinalPrice * item.quantity, 0);
  }

  calculateShipping() {
    return 10 + (this.cartItems.length - 1) * 2;
  }

  calculateTax(subtotal) {
    return subtotal * 0.06;
  }

  calculateOrderTotal(subtotal, shipping, tax) {
    return subtotal + shipping + tax;
  }

  displayOrderSummary() {
    const subtotal = this.calculateSubtotal();
    const shipping = this.calculateShipping();
    const tax = this.calculateTax(subtotal);
    const orderTotal = this.calculateOrderTotal(subtotal, shipping, tax);

    document.getElementById("subtotal").textContent = subtotal.toFixed(2);
    document.getElementById("shipping").textContent = shipping.toFixed(2);
    document.getElementById("tax").textContent = tax.toFixed(2);
    document.getElementById("orderTotal").textContent = orderTotal.toFixed(2);
  }

  packageItems() {
    return this.cartItems.map(item => ({
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: item.quantity
    }));
  }

  async checkout(form) {
    const formData = new FormData(form);
    const orderData = {
      orderDate: new Date().toISOString(),
      fname: formData.get("fname"),
      lname: formData.get("lname"),
      street: formData.get("street"),
      city: formData.get("city"),
      state: formData.get("state"),
      zip: formData.get("zip"),
      cardNumber: formData.get("cardNumber"),
      expiration: formData.get("expiration"),
      code: formData.get("code"),
      items: this.packageItems(),
      orderTotal: parseFloat(document.getElementById("orderTotal").textContent),
      shipping: parseFloat(document.getElementById("shipping").textContent),
      tax: parseFloat(document.getElementById("tax").textContent)
    };

    console.log("Order Data:", orderData); // Debugging statement

    try {
      const response = await fetch("https://wdd330-backend.onrender.com/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      });

      const responseData = await response.json();
      console.log("Server Response:", responseData);

      if (response.ok) {
        clearLocalStorage("so-cart");
        window.location.href = "success.html";
      } else {
        alertMessage(responseData.cardNumber || "There was an issue with your order. Please try again.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alertMessage("There was an issue with your order. Please try again.");
    }
  }
}

