import { orders } from "../data/order.js";
import { getProduct } from "../data/products.js";
import { formatCentPrice } from "./utils/money.js";
import printCartQuantity from "./utils/cartQuantityHtml.js";
import updateCartQuantity from "./utils/cartQuantity.js";
import { addToCart,cart } from "../data/cart.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

printCartQuantity();

let orderHTML = ``;

orders.forEach((order, index) => {
  let orderId = `${order.products[0].productId.toString()}-${index.toString()}`;

  orderHTML += `<div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${dayjs(order.orderTime).format('dddd, MMMM D')}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCentPrice(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${orderId}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${createProductGrid(order.products)}
          </div>
        </div>`;
});

document.querySelector('.js-order-grid').innerHTML = orderHTML;

function createProductGrid(products) {
  let productGridHTML = ``;

  products.forEach((product) => {
    let matchingProduct = getProduct(product.productId);
    let dayString = dayjs(product.estimatedDeliveryTime).format('dddd, MMMM D');
    let urlData = {
      date: dayString,
      quantity: product.quantity,
      id: matchingProduct.id
    }

    let urlString = JSON.stringify(urlData);
    let encodeURL = encodeURIComponent(urlString);

    productGridHTML += `<div class="product-image-container">
              <img src="${matchingProduct.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${dayString}
              </div>
              <div class="product-quantity">
                Quantity: ${product.quantity}
              </div>
              <button class="buy-again-button button-primary js-buy-again-btn" data-product-id="${matchingProduct.id}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message js-buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?order=${encodeURL}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>`;
  });

  return productGridHTML;
}

document.querySelectorAll('.js-buy-again-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    let {productId} = btn.dataset;
    let originalText = btn.innerHTML;
    addToCart(productId);
    updateCartQuantity();
    btn.innerHTML = "✓ Added";
    setTimeout(()=>{
      btn.innerHTML = originalText;
    },2000);
  })
})