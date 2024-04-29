import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItemsString = getLocalStorage("so-cart");
  let cartItems = [];

  if (cartItemsString) {
    if (typeof cartItemsString === "object") {
      cartItems = [cartItemsString];
    } else {
      try {
        cartItems = JSON.parse(cartItemsString);
        if (!Array.isArray(cartItems)) {
          cartItems = [cartItems];
        }
      } catch (error) {
        console.error("Error parsing cart data from localStorage:", error);
      }
    }
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

renderCartContents();


