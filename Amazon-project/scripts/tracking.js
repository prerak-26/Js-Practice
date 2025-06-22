import printCartQuantity from "./utils/cartQuantityHtml.js";
import { getProduct } from "../data/products.js";

printCartQuantity();

const url = new URL(window.location.href);
const encodedURL = url.searchParams.get('order');
const decodedURL = decodeURIComponent(encodedURL);
const retriveData = JSON.parse(decodedURL);

const matchingProduct = getProduct(retriveData.id);

let productDataHTML =
  ` <div class="delivery-date">
          Arriving on ${retriveData.date}
        </div>

        <div class="product-info">
          ${matchingProduct.name}
        </div>

        <div class="product-info">
          Quantity: ${retriveData.quantity}
        </div>

        <img class="product-image" src="${matchingProduct.image}">`;

document.querySelector('.js-product-tracking-container').innerHTML = productDataHTML;