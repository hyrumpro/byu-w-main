// ShoppingCart.mjs
import { renderListWithTemplate } from './utils.mjs';

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }

  renderCartItems() {
    const cartItems = this.getCartItems();
    const cartElement = document.querySelector(this.parentSelector);
    renderListWithTemplate(cartItemTemplate, cartElement, cartItems);
  }

  getCartItems() {
    const cartItems = localStorage.getItem(this.key);
    return cartItems ? JSON.parse(cartItems) : [];
  }

  addToCart(product) {
    const cartItems = this.getCartItems();
    const existingItem = cartItems.find(item => item.Id === product.Id);

    if (existingItem) {
      existingItem.Quantity++;
    } else {
      product.Quantity = 1;
      cartItems.push(product);
    }

    localStorage.setItem(this.key, JSON.stringify(cartItems));
    this.renderCartItems();
  }

  removeFromCart(productId) {
    const cartItems = this.getCartItems();
    const updatedItems = cartItems.filter(item => item.Id !== productId);
    localStorage.setItem(this.key, JSON.stringify(updatedItems));
    this.renderCartItems();
  }

  clearCart() {
    localStorage.removeItem(this.key);
    this.renderCartItems();
  }
}

function cartItemTemplate(item) {
  return `
    <li class="cart-item">
      <img src="${item.Images.PrimarySmall}" alt="Image of ${item.Name}" />
      <div class="cart-item-details">
        <h3 class="cart-item-name">${item.Name}</h3>
        <p class="cart-item-price">$${item.FinalPrice}</p>
        <p class="cart-item-quantity">Quantity: ${item.Quantity}</p>
        <button class="remove-item" data-id="${item.Id}">Remove</button>
      </div>
    </li>
  `;
}
