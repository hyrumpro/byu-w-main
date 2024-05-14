import { getLocalStorage, setLocalStorage } from "./utils.mjs";


function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const productList = document.querySelector(".product-list");
  const cartFooter = document.querySelector(".cart-footer");
  const cartTotalElement = document.getElementById("cartTotal");
  const cartCountElement = document.querySelector(".cart-count");

  if (cartItems.length === 0) {
    productList.innerHTML = "<p>No items in the cart.</p>";
    cartFooter.classList.add("hide");
    cartCountElement.textContent = "0";
  } else {
    const htmlItems = cartItems.map(cartItemTemplate);
    productList.innerHTML = htmlItems.join("");
    addRemoveListeners();
    cartFooter.classList.remove("hide");
    const total = calculateTotal(cartItems);
    cartTotalElement.textContent = total.toFixed(2);
    cartCountElement.textContent = cartItems.length;
  }
}

function addRemoveListeners() {
  const removeIcons = document.querySelectorAll(".cart-card__remove");
  removeIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      const itemId = icon.dataset.id;
      removeFromCart(itemId);
    });
  });
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors && item.Colors.length > 0 ? item.Colors[0].ColorName : ''}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <span class="cart-card__remove" data-id="${item.Id}">X</span>
  </li>`;

  return newItem;
}

function removeFromCart(itemId) {
  const cartItems = getLocalStorage("so-cart");
  const updatedCartItems = cartItems.filter((item) => item.Id !== itemId);
  setLocalStorage("so-cart", updatedCartItems);
  renderCartContents();
}

function calculateTotal(cartItems) {
  return cartItems.reduce((total, item) => total + item.FinalPrice, 0);
}

renderCartContents();


