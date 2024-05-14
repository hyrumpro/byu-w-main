import { loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

loadHeaderFooter();

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");

const productListing = new ProductListing("tents", dataSource, listElement);
productListing.init();

document.getElementById("searchForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const query = document.getElementById("searchInput").value;
  fetch(`./json/${query}.json`)
    .then(response => response.json())
    .then(data => {
      localStorage.setItem("searchResults", JSON.stringify(data));
      window.location.href = "product-list.html";
    })
    .catch(error => console.error("Error fetching data:", error));
});



