import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");

const productListing = new ProductListing("tents", dataSource, listElement);
productListing.init();




