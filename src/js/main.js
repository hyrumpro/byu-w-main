import { loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ExternalServices.mjs";
import ProductListing from "./ProductList.mjs";

loadHeaderFooter()
  .then(() => {
    const dataSource = new ProductData("tents");
    const listElement = document.querySelector(".product-list");

    const productListing = new ProductListing("tents", dataSource, listElement);
    productListing.init();
  })
  .catch(error => {
    console.error("Error loading header or footer:", error);
  });

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");

const productListing = new ProductListing("tents", dataSource, listElement);
productListing.init();


