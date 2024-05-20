import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const dataSource = new ExternalServices("tents");

function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart");
  const existingProductIndex = cartItems.findIndex(item => item.Id === product.Id);

  if (existingProductIndex !== -1) {
    cartItems[existingProductIndex].quantity += 1;
  } else {
    product.quantity = 1;
    cartItems.push(product);
  }

  setLocalStorage("so-cart", cartItems);
}


async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
