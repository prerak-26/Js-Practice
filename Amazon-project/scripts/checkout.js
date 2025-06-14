import { cart, removeCartItem, updateDeliveryOption } from '../data/cart.js';
import { getProduct } from '../data/products.js';
import { formatCentPrice } from './utils/money.js';
import { deliveryOptions, getDeliveryOption } from '../data/deliveryOption.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import printCartQuantity from './utils/cartQuantityHtml.js';

let checkoutHtml = ``;

cart.forEach((cartItem) => {
  let productId = cartItem.productId;
  let matchingProduct = getProduct(productId);

  checkoutHtml += `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date js-delivery-date-${matchingProduct.id}">
              Delivery date: ${getDeliveryDate(cartItem.deliveryOptionId)}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCentPrice(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${createDeliveryOptions(matchingProduct, cartItem)}
              </div>
            </div>
          </div>`;
});

function getDeliveryDate(cartDeliveryOptionId) {
  let selectedDeliveryOption = getDeliveryOption(cartDeliveryOptionId);
  const today = dayjs();
  const deliveryDate = today.add(selectedDeliveryOption.deliveryDays, 'day');
  const dayString = deliveryDate.format('dddd, MMMM D');

  return dayString;
}

function createDeliveryOptions(matchingProduct, cartItem) {
  let deliveryOptionHtml = ``;

  deliveryOptions.forEach((option) => {
    const today = dayjs();
    const deliveryDate = today.add(option.deliveryDays, 'day');
    const dayString = deliveryDate.format('dddd, MMMM D');

    const priceString = !option.priceCents ? `FREE ` : `$${formatCentPrice(option.priceCents)} - `;

    const isChecked = option.id === cartItem.deliveryOptionId;

    deliveryOptionHtml += `<div class="delivery-option js-delivery-option" 
                            data-product-id="${matchingProduct.id}"
                            data-delivery-option-id="${option.id}">
                  <input type="radio"
                    ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${dayString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString}Shipping
                    </div>
                  </div>
                </div>`
  });

  return deliveryOptionHtml;
};

document.querySelector('.js-order-summary').innerHTML = checkoutHtml;

document.querySelectorAll('.js-delete-link').forEach((link) => {

  link.addEventListener('click', () => {
    let productId = link.dataset.productId;
    removeCartItem(productId);
    document.querySelector(`.js-cart-item-container-${productId}`).remove();
    renderPaymentSummary();
  });
});

document.querySelectorAll('.js-delivery-option').forEach((element) => {
  element.addEventListener('change', () => {
    const { productId, deliveryOptionId } = element.dataset;
    updateDeliveryOption(productId, deliveryOptionId);
    document.querySelector(`.js-delivery-date-${productId}`).innerHTML = `Delivery date: ${getDeliveryDate(deliveryOptionId)}`;
    renderPaymentSummary();
  })
})

function renderPaymentSummary() {
  let itemsTotal = 0, shippingCharge = 0, totalBeforeTax = 0, tax = 0, orderTotal = 0;

  cart.forEach((cartItem) => {

    let matchingProduct = getProduct(cartItem.productId);

    let deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

    itemsTotal += cartItem.quantity * matchingProduct.priceCents;
    shippingCharge += deliveryOption.priceCents;
  });

  totalBeforeTax = itemsTotal + shippingCharge;
  tax = totalBeforeTax * 0.1;
  orderTotal = totalBeforeTax + tax;

  const paymentSummaryHTML = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (<span class="js-cart-quantity">${JSON.parse(localStorage.getItem('cartQuantity')) || 0}</span>):</div>
            <div class="payment-summary-money">$${formatCentPrice(itemsTotal)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCentPrice(shippingCharge)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCentPrice(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCentPrice(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCentPrice(orderTotal)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        `;

  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;
};

renderPaymentSummary();

printCartQuantity();