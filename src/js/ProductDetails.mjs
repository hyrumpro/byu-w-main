function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
  }

  addToCart() {
    setLocalStorage("so-cart", this.product);
  }

  renderProductDetails() {
    const productDetails = document.querySelector(".product-detail");
    productDetails.innerHTML = `
      <h3>${this.product.Name}</h3>
      <p>${this.product.NameWithoutBrand}</p>
      <img
        class="divider"
        src="${this.product.Images.PrimaryLarge}"
        alt="${this.product.Name}"
      />
      <p class="product-card__price">$${this.product.FinalPrice}</p>
      <p class="product__color">${this.product.Colors[0].ColorName}</p>
      <p class="product__description">
        ${this.product.DescriptionHtmlSimple}
      </p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
      </div>
    `;
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }
}
